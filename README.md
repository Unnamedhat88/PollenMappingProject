# Pollen Mapping System – Crowdsourced Plant Image Classifier

A full-stack web platform that visualizes pollen-affected areas using crowdsourced plant images.  
Built to help users—especially those with allergies—adjust daily routes based on real-time pollen activity.

---

## Overview
This project integrates computer vision, GIS visualization, and scalable web architecture.  
User-uploaded plant photos are classified by a fine-tuned CNN model, and results are reflected dynamically on a map.

The system bridges **frontend (React.js)**, **backend (Flask)**, and **ML model (MobileNetV2)** through a clean API pipeline.

---

## Technical Highlights

### Machine Learning
- Model: **MobileNetV2**, fine-tuned on 7 plant species + “Others” category  
- Tools: TensorFlow, Keras, NumPy, Matplotlib, Pillow, Pickle  

### Backend
- **Flask** REST API for model inference and database access  
- **SQLAlchemy** ORM for data management  
- Manages flower metadata and geographic tagging of classified images  

### Frontend
- **React.js** interface with **Leaflet** for map rendering  
- **Exif-js** for extracting GPS and metadata from uploaded images  
- Responsive design for both web and mobile  

---

## System Architecture
- **Frontend:** Displays pollen map and handles image uploads  
- **Backend:** Hosts model, processes requests, and updates pollen data  
- **Databases:**  
  - Flower database (Latin name, bloom period, pollen radius, allergy risk)  
  - Location database (coordinates and recognized species)  

---

## Results and Impact 
- Demonstrated potential for public health and environmental monitoring  
- Created a scalable architecture for future expansion to weather- and wind-aware pollen prediction  

---

## Future Work
- Expand model classes and training data  
- Integrate environmental factors such as wind, pollen size, and humidity  
- Optimize inference latency for real-time deployment  

---

## Team
Developed collaboratively under the guidance of **Ritsumeikan University** and **Universitas Dinamika**

**Team Members**
- Anjal Shrestha  
- Brandon Pratama Kwee  
- CHEN Dong Fang  
- Abigail Excelsis Deo  
- M. Haris M.K.A  

---

