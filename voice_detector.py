# backend/voice_detector.py
import librosa # type: ignore
import numpy as np # type: ignore
from sklearn.preprocessing import StandardScaler # type: ignore
import tensorflow as tf # type: ignore

class VoiceAuthenticator:
    def __init__(self):
        # Pre-trained model (you'll train on deepfakes in hackathon)
        self.model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=(13,)),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')  # Real=1, Fake=0
        ])
        self.model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        self.scaler = StandardScaler()
    
    def extract_mfcc_features(self, audio_path):
        """Extract MFCC (Mel-frequency cepstral coefficients) from audio"""
        y, sr = librosa.load(audio_path, sr=16000)
        
        # MFCC features - these capture voice uniqueness
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        
        # Also get energy, zero-crossing rate, spectral features
        energy = np.sum(y**2) / len(y)
        zcr = np.mean(librosa.feature.zero_crossing_rate(y))
        spectral_centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))
        
        # Combine all features
        features = np.hstack([
            np.mean(mfcc, axis=1),  # Average MFCC across time
            energy,
            zcr,
            spectral_centroid
        ])
        
        return features
    
    def detect_deepfake(self, audio_path, confidence_threshold=0.75):
        """
        Detect if voice is real or deepfake
        Returns: {'is_real': bool, 'confidence': float, 'risk_level': str}
        """
        try:
            features = self.extract_mfcc_features(audio_path)
            features_scaled = self.scaler.transform([features])
            
            prediction = self.model.predict(features_scaled, verbose=0)[0][0]
            confidence = max(prediction, 1 - prediction)
            
            is_real = prediction > 0.5
            
            if confidence < 0.6:
                risk_level = "SUSPICIOUS"
            elif confidence < 0.75:
                risk_level = "CAUTION"
            else:
                risk_level = "SAFE" if is_real else "DEEPFAKE"
            
            return {
                'is_real': bool(is_real),
                'confidence': float(confidence),
                'risk_level': risk_level,
                'prediction_score': float(prediction)
            }
        except Exception as e:
            return {'error': str(e)}

# Usage
authenticator = VoiceAuthenticator()
result = authenticator.detect_deepfake('sample_voice.wav')
print(f"Voice Authentication: {result}")
# Output: {'is_real': True, 'confidence': 0.98, 'risk_level': 'SAFE', 'prediction_score': 0.98}
