import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

# FasalRakshak AI Model Training Script
# ------------------------------------------------------------------
# Yeh script aapke 'model/raw/color' folder me rakhi hui saari crop 
# aur bimari ki images ka use karke ek real-world AI model train karega.
# Note: Isko chalane ke liye ek acche GPU ki jarurat pad sakti hai 
# kyu ki data bohot bada hai (50,000+ images).
# ------------------------------------------------------------------

# 1. Dataset Path
# Make sure your folders are inside: model/raw/color/CROP___DISEASE/
DATA_DIR = os.path.join("..", "model", "raw", "color")

# 2. Hyperparameters
IMG_SIZE = (224, 224) # MobileNetV2 standard size
BATCH_SIZE = 32
EPOCHS = 10           # Aap ise bada sakte hain jaise 20-50, achhi training ke liye
LEARNING_RATE = 0.001

def build_model(num_classes):
    """
    Ek base model banayenge MobileNetV2 ka use karke (Pre-trained on ImageNet).
    Isse training jaldi hoti hai (Transfer Learning).
    """
    base_model = MobileNetV2(
        weights='imagenet', 
        include_top=False, 
        input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)
    )
    
    # Freeze the base model layers (taaki pre-trained weights change na ho)
    base_model.trainable = False
    
    # Custom layers specifically farmers ki fasal ke liye
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.5)(x) # Overfitting se bachane ke liye
    predictions = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
    # Compile the model
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def main():
    if not os.path.exists(DATA_DIR):
        print(f"Error: Dataset folder nahi mila yaha: {DATA_DIR}")
        print("Kripya check karein ki 'model/raw/color' me saari images maujud hai.")
        return

    print("==================================================")
    print("🌾 FasalRakshak AI Training Shuru ho rahi hai 🌾")
    print("==================================================")
    
    # 3. Data Augmentation (Data ko alag alag angle se dekhne ki capability badhana)
    datagen = ImageDataGenerator(
        rescale=1./255,           # Normalizing pixel values
        rotation_range=20,        # Rotate images
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        validation_split=0.2      # 80% Training ke liye, 20% validation/testing ke liye
    )

    print("Training Dataset load kiya ja raha hai...")
    train_generator = datagen.flow_from_directory(
        DATA_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    print("Validation Dataset load kiya ja raha hai...")
    validation_generator = datagen.flow_from_directory(
        DATA_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    num_classes = train_generator.num_classes
    print(f"Total Fasal & Bimari ki categories mili: {num_classes}")

    # 4. Model Build karna
    model = build_model(num_classes)
    model.summary()

    # 5. Callbacks se best model save karna (Jab accuracy sabse jyada ho)
    checkpoint = ModelCheckpoint(
        "fasalrakshak_ai_model.keras", 
        monitor='val_accuracy', 
        save_best_only=True, 
        mode='max', 
        verbose=1
    )
    
    early_stopping = EarlyStopping(
        monitor='val_loss', 
        patience=3, 
        restore_best_weights=True
    )

    # 6. Training process start
    print("\nTraining Model... (Isme samay lag sakta hai)")
    history = model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=validation_generator,
        callbacks=[checkpoint, early_stopping]
    )

    print("\n✅ Training Complete!")
    print("Aapki AI model file 'fasalrakshak_ai_model.keras' ke naam se save ho gayi hai.")
    print("Aap is file ka use kisi bhi python server (FastAPI/Flask) me predictions ke liye kar sakte hain.")

if __name__ == "__main__":
    main()
