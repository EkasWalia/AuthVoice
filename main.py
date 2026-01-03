# backend/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from voice_detector import VoiceAuthenticator

app = FastAPI(title="AuthVoice API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

authenticator = VoiceAuthenticator()

@app.post("/api/detect-voice")
async def detect_voice(file: UploadFile = File(...)):
    """
    Upload voice audio and detect if it's real or deepfake
    """
    try:
        # Save uploaded file
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as f:
            contents = await file.read()
            f.write(contents)
        
        # Detect deepfake
        result = authenticator.detect_deepfake(file_path)
        
        # Cleanup
        os.remove(file_path)
        
        return JSONResponse({
            'status': 'success',
            'detection': result,
            'timestamp': str(pd.Timestamp.now()),
            'model_version': '1.0'
        })
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/register-voice")
async def register_voice(user_id: str, file: UploadFile = File(...)):
    """
    Register user's voice print for 2FA biometric authentication
    """
    try:
        file_path = f"voices/{user_id}_enrollment.wav"
        with open(file_path, "wb") as f:
            contents = await file.read()
            f.write(contents)
        
        # Extract and store voice profile
        features = authenticator.extract_mfcc_features(file_path)
        # In real app: Store in database with user_id
        
        return JSONResponse({
            'status': 'success',
            'message': f'Voice registered for user {user_id}',
            'features_stored': len(features)
        })
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/health")
def health_check():
    return {'status': 'AuthVoice API running', 'version': '1.0'}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
