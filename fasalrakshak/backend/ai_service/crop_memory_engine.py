import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image
import io
import os
import json
from sklearn.metrics.pairwise import cosine_similarity

# Constants
EMBEDDING_MODEL_URL = "https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/feature_vector/4"
MEMORY_FILE = os.path.join("training_data", "crop_memory.json")

# Load Global Model once
embedding_model = None

def get_model():
    global embedding_model
    if embedding_model is None:
        print("Loading MobileNet Feature Extractor...")
        embedding_model = hub.KerasLayer(EMBEDDING_MODEL_URL)
    return embedding_model

def extract_embedding(image_bytes):
    """Extracts a 1280-dimensional feature vector from an image."""
    model = get_model()
    
    # Preprocess Image
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0).astype(np.float32)
    
    # Build Embedding
    embedding = model(img_array)
    return embedding.numpy().tolist()[0]

def save_crop_to_memory(name, image_bytes):
    embedding = extract_embedding(image_bytes)
    
    if os.path.exists(MEMORY_FILE):
        with open(MEMORY_FILE, 'r') as f:
            memory = json.load(f)
    else:
        memory = []
        
    memory.append({
        "name": name,
        "embedding": embedding,
        "createdAt": tf.timestamp().numpy()
    })
    
    # Ensure dir exists
    os.makedirs(os.path.dirname(MEMORY_FILE), exist_ok=True)
    with open(MEMORY_FILE, 'w') as f:
        json.dump(memory, f)
    
    return f"Success: AI has successfully memorized '{name}'."

def detect_saved_crop(image_bytes, threshold=0.85):
    if not os.path.exists(MEMORY_FILE):
        return None
        
    with open(MEMORY_FILE, 'r') as f:
        memory = json.load(f)
        
    if not memory:
        return None
        
    current_embedding = np.array(extract_embedding(image_bytes)).reshape(1, -1)
    
    best_match = None
    max_sim = -1
    
    for item in memory:
        saved_embedding = np.array(item['embedding']).reshape(1, -1)
        sim = cosine_similarity(current_embedding, saved_embedding)[0][0]
        
        if sim > max_sim:
            max_sim = sim
            best_match = item['name']
            
    if max_sim >= threshold:
        return {"name": best_match, "confidence": float(max_sim)}
    
    return None
