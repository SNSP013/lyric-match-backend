const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const LASTFM_API_KEY = process.env.LASTFM_API_KEY; 

async function getRandomSong() {
    try {
        const response = await axios.get(
            `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LASTFM_API_KEY}&format=json`
        );
        const songs = response.data.tracks.track;
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        return randomSong.name; 
    } catch (error) {
        console.error("Error fetching random song:", error);
        return "Shape of You"; 
    }
}

app.get("/", (req, res) => {
    res.send("🎵 Lyric Match Backend is Running! 🚀");
});

app.get("/generate-lyric", async (req, res) => {
    try {
        const song = await getRandomSong();
        console.log("Random Song Selected:", song);

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Generate 2-4 lines of lyrics from the song "${song}". Do NOT include the title.`
                            }
                        ]
                    }
                ]
            }
        );

        console.log("Gemini API Response:", response.data);

        const candidate = response.data.candidates[0];
        console.log("Content object:", candidate.content);

        if (candidate && candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            const generatedText = candidate.content.parts[0].text;
            if (generatedText) {
                console.log("Generated Lyric:", generatedText);
                res.json({ lyric: generatedText, song }); 
            } else {
                console.error("No text found in parts");
                res.status(500).json({ error: "No lyrics generated" });
            }
        } else {
            console.error("Invalid response structure");
            res.status(500).json({ error: "Invalid response from API" });
        }
    } catch (error) {
        console.error("Error in /generate-lyric:", error.response ? error.response.data : error);
        res.status(500).json({ error: "Error generating lyrics" });
    }
});

app.post("/check-answer", (req, res) => {
    const { userGuess, song } = req.body;
    res.json({ correct: userGuess.toLowerCase() === song.toLowerCase(), song });
});

app.listen(8080, () => console.log("Server running on port 8080"));
