# Lyric Match - Backend Service

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Node.js backend powering the Lyric Match game. Integrates with Google Gemini AI for lyric generation and Last.fm for song data.

## 🛠 Technologies
- Node.js v18+
- Express.js
- Google Gemini API
- Last.fm API
- CORS

## ⚙️ Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/lyric-match-backend.git
cd lyric-match-backend
```

### 2. Install Dependencies
```bash
npm install express dotenv axios cors
```

### 3. Configure Environment
Create `.env` file:
```env
PORT=8080
GEMINI_API_KEY="your_gemini_api_key"
LASTFM_API_KEY="your_lastfm_api_key"
```

### 4. Start Server
```bash
npm start
```
**API Base URL:** `http://localhost:8080`

## 📡 API Endpoints
| Endpoint           | Method | Request Body                          | Response                              |
|--------------------|--------|---------------------------------------|---------------------------------------|
| `/generate-lyric`  | GET    | -                                     | `{ lyric: string, song: string }`     |
| `/check-answer`    | POST   | `{ userGuess: string, song: string }` | `{ correct: boolean, song: string }`  |

## 🚀 Deployment
1. **Render Setup**
   - Add environment variables:
     - `GEMINI_API_KEY`
     - `LASTFM_API_KEY`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Verify Deployment**
```bash
curl https://your-backend-url/generate-lyric
```

## 🚨 Troubleshooting
- **400 Errors**: Verify API keys in `.env`
- **CORS Issues**: Ensure frontend URL is allowed
- **Empty Responses**: Check Last.fm API status

## 📄 License
MIT License - See [LICENSE](LICENSE) for details
