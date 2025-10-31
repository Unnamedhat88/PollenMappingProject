from flask import request, jsonify
from config import app,db
from models import Flower
from PIL import Image
import numpy as np
import tensorflow as tf

import tensorflow.keras.models as models
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# model = models.load_model(dir_h5)


# Load the pre-trained model
model = tf.keras.models.load_model("final_model_25_8_class_unknown4_10earlyStop.h5")

# Define a method to preprocess the image for the model
def preprocess_image(image_path):
    try:
        # Load the image and resize to the model's expected input size
        #image = Image.open(image_path).convert("RGB")
        # image = image.resize((224, 224,3))  # Adjust to your model's input size if different
        # image_array = np.array(image) / 255.0  # Normalize the image
        # image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension


        img_path = image_path
        IMAGE_SIZE=(224,224)
        img = load_img(img_path, target_size=IMAGE_SIZE) # Load and resize the image
        img_array = img_to_array(img) # Convert image to NumPy array
        img_array = img_array / 255. # Rescale the image

        img_array = np.expand_dims(img_array, axis=0)

        
        return img_array
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")

# Fetch method to get the database
#fetch method to get the database
@app.route("/flowers", methods=['GET'])
def get_flowers():
    flowers=Flower.query.all()
    json_flowers= list(map(lambda x : x.to_json(), flowers))
    return jsonify({"flowers": json_flowers})

#to append to the database
@app.route("/create_flower_instance", methods=["POST"])
def create_flower_instance():
    try :
        imagefile=request.files["imagefile"]
        imagepath="./images_folder/"+imagefile.filename
        imagefile.save(imagepath)
        print(f"Image saved at: {imagepath}")

        longitude = request.form.get('longitude')
        latitude = request.form.get('latitude')

     

        #===========MODEL HERE===================================================
    

        # Preprocess the image for the model
        processed_image = preprocess_image(imagepath)

        # Predict the flower type using the model
        predictions = model.predict(processed_image)
        predicted_class = np.argmax(predictions, axis=1)[0]

        # Map the predicted class index to the flower name
        class_names = ["Bougainville","Hydrangeas","Lagerstroemia Indica", "Orchid","Others","Tulip","Pine Tree","Sakura"]  # Update with your actual class names
        name = class_names[predicted_class] if predicted_class < len(class_names) else "Unknown"

         #===========================================================================


        new_flower=Flower(name=name,longitude=longitude, latitude=latitude)

        try:
            db.session.add(new_flower)
            db.session.commit()
            print(f"Added flower: {name} at ({longitude}, {latitude})")
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "flower added to map, flower detected :"+name }),201
    
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    

if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)