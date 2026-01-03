// frontend/src/App.jsx
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start recording voice
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioBlob(blob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  // Send to backend for detection
  const analyzeVoice = async () => {
    if (!audioBlob) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', audioBlob, 'voice.wav');

    try {
      const response = await fetch('http://localhost:8000/api/detect-voice', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setResult(data.detection);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎤 AuthVoice - Voice Authentication</h1>
        <p>Detect deepfake voices in real-time</p>
      </header>

      <div className="card">
        <h2>Step 1: Record Your Voice</h2>
        <div className="recording-controls">
          {!isRecording ? (
            <button onClick={startRecording} className="btn-primary">
              🎤 Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} className="btn-danger">
              ⏹ Stop Recording
            </button>
          )}
        </div>
        {audioBlob && (
          <div className="audio-preview">
            <p>✓ Voice recorded ({(audioBlob.size / 1024).toFixed(2)} KB)</p>
            <audio controls src={URL.createObjectURL(audioBlob)} />
          </div>
        )}
      </div>

      <div className="card">
        <h2>Step 2: Analyze Voice</h2>
        <button 
          onClick={analyzeVoice} 
          disabled={!audioBlob || loading}
          className="btn-primary"
        >
          {loading ? '🔍 Analyzing...' : '🔍 Analyze Voice'}
        </button>
      </div>

      {result && (
        <div className="card result-card">
          <h2>📊 Detection Result</h2>
          
          <div className={`status-badge ${result.is_real ? 'real' : 'fake'}`}>
            {result.is_real ? '✅ REAL VOICE' : '❌ DEEPFAKE DETECTED'}
          </div>

          <div className="result-details">
            <div className="metric">
              <span className="label">Confidence</span>
              <span className="value">{(result.confidence * 100).toFixed(1)}%</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="metric">
              <span className="label">Risk Level</span>
              <span className={`risk-${result.risk_level.toLowerCase()}`}>
                {result.risk_level}
              </span>
            </div>

            <div className="metric">
              <span className="label">Prediction Score</span>
              <span className="value">{(result.prediction_score * 100).toFixed(2)}%</span>
            </div>
          </div>

          <div className="recommendation">
            {result.is_real ? (
              <p>✅ Voice verified as authentic. Safe to proceed with transaction.</p>
            ) : (
              <p>⚠️ Potential deepfake detected. Enable additional 2FA or manual review.</p>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <p>AuthVoice - Protecting Against Voice Fraud in 2026</p>
      </footer>
    </div>
  );
}

export default App;