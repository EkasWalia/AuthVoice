AuthVoice – Deepfake Voice Detection API

AuthVoice is a prototype system that analyzes a short voice sample and tells whether it sounds like a **real human recording** or a likely **AI‑generated / manipulated** voice. It’s designed as an extra security layer for calls, fintech, and support flows.[web:92][web:96]

✨ Features

- REST **API** built with FastAPI (`/api/detect-voice`).[web:105]
- Accepts an uploaded audio file (`.wav`).[web:101]
- Extracts MFCC and other audio features to characterize the voice signal.[web:92][web:96]
- Runs the features through a neural‑network classifier (TensorFlow/Keras).[web:94][web:100]
- Returns a JSON verdict:
  - `is_real` – True/False  
  - `confidence` – model confidence  
  - `risk_level` – e.g. `SAFE`, `SUSPICIOUS`, `DEEPFAKE`  

This is a **hackathon MVP**, not a production‑grade detector. Real‑world deployment requires larger datasets and robust training.[web:94][web:100]

 🧱 Tech Stack

- **Backend:** Python, FastAPI, Uvicorn[web:105]
- **ML / Audio:** TensorFlow / Keras, Librosa, NumPy, scikit‑learn[web:92][web:96]
- **Interface for testing:** FastAPI Swagger UI (`/docs`)

 📂 Project Structure

```text
AuthVoice/
└── Backend/
    ├── main.py            # FastAPI app, API endpoints
    ├── voice_detector.py  # Feature extraction + deepfake classifier
    └── venv/              # Python virtual environment (local)
```

 🚀 Getting Started (Local)

 1. Clone the repo

```bash
git clone https://github.com/<your-username>/AuthVoice.git
cd AuthVoice/Backend
```

### 2. Create and activate virtual env (macOS / Linux)

```bash
python3 -m venv venv
source venv/bin/activate
```

On Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

 3. Install dependencies

```bash
pip install fastapi uvicorn librosa numpy scikit-learn tensorflow python-multipart
```

▶️ Run the API

From the `Backend` folder with the venv activated:

```bash
uvicorn main:app --reload --port 8000
```

- API root: `http://127.0.0.1:8000/`  
- Swagger UI: `http://127.0.0.1:8000/docs`

🧪 Testing the Endpoint

### Option 1 – Swagger UI

1. Open `http://127.0.0.1:8000/docs` in a browser.[web:105]  
2. Find `POST /api/detect-voice`.  
3. Click **Try it out** → upload a `.wav` file → **Execute**.  
4. Response example:

```json
{
  "status": "success",
  "detection": {
    "is_real": true,
    "confidence": 0.91,
    "risk_level": "SAFE",
    "prediction_score": 0.91
  },
  "timestamp": "..."
}
```

### Option 2 – curl

```bash
curl -X POST "http://127.0.0.1:8000/api/detect-voice" \
  -F "file=@real_sample.wav"
```

Replace `real_sample.wav` with a path to your own audio file.[web:101]

 🧠 How It Works (High Level)

1. **Upload audio** – user sends a short `.wav` voice clip.[web:101][web:105]  
2. **Feature extraction** – `voice_detector.py` uses Librosa to compute:
   - MFCCs  
   - Energy, zero‑crossing rate, spectral centroid[web:92][web:96]  
3. **Classification** – features are normalized and passed to a small neural network that outputs a probability of “real vs fake”.[web:94][web:98][web:100]  
4. **Decision logic** – probability is converted into `is_real`, `confidence`, and a human‑readable `risk_level`.

🔒 Intended Use Cases (Concept)

- Extra security for **high‑risk voice flows** (limit changes, large payments).[web:52][web:61]
- Flagging **AI‑cloned scam calls** and replayed recordings.[web:98][web:100]
- Verifying suspicious **voice notes** or “leaked audio” clips.[web:92][web:96]

⚠️ Disclaimer

This is a **prototype research project**, not a production‑ready security product.  
Detection performance depends heavily on training data, recording quality, and the types of AI models used to generate fake audio.[web:92][web:96][web:100]

 📜 License (MIT)


MIT License

Copyright (c) 2026 Ekas Walia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
