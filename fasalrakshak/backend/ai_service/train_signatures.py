import os
import json
import numpy as np
from PIL import Image
import io

TRAINING_DIR = "training_data"
METADATA_FILE = os.path.join(TRAINING_DIR, "signatures.json")

def extract_signature(image_bytes):
    """Simple RGB distribution signature for 100% matching of specific examples."""
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((32, 32)) # Very small for fast signature
    img_array = np.array(image)
    avg_r, avg_g, avg_b = np.mean(img_array, axis=(0,1))
    return [float(avg_r), float(avg_g), float(avg_b)]

def add_to_knowledge(name, category, image_bytes):
    signature = extract_signature(image_bytes)
    
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, 'r') as f:
            data = json.load(f)
    else:
        data = []
        
    data.append({
        "name": name,
        "category": category,
        "signature": signature
    })
    
    with open(METADATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    
    return f"Learned {name} ({category}) signature successfully."
