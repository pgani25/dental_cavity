# 🦷 Dental Cavity Detection Web App

This is a full-stack web application that detects **dental cavities** from uploaded teeth images using a YOLOv8 model. The app allows users to input patient details, upload an image, and receive a real-time analysis report including the number of cavities detected and a processed image with bounding boxes.

---

## ✅ Features

- Upload patient name, age, and teeth image
- Preview the image before submission
- Detect cavities using a YOLOv8 model
- Display cavity count and annotated result image
- Full-stack app (Node.js backend + Python model + HTML/CSS/JS frontend)

## 📁 Project Structure
🌐 Frontend Overview

The frontend consists of static HTML, CSS, and JS:

### 1. `index.html`
- Contains:
  - Patient **Name** and **Age** input fields
  - File upload input for teeth image
  - Real-time image **preview**
  - Submit button that triggers detection

### 2. `report.html`
- Displays the result after detection:
  - Patient name and age
  - Processed image with cavity annotations
  - Count of cavities detected

### 3. `style.css`
- Provides:
  - Clean and modern layout
  - Form container styling
  - Responsive preview and button styles

### 4. `script.js`
- Controls:
  - Form submission with patient details and image
  - Sends data using `fetch()` to the backend
  - Displays image preview before uploading
  - Redirects user to `report.html` with query parameters after successful detection

⚙️ Backend Overview

The backend runs on **Node.js + Express**, with a Python script handling :

### 1. `app.js`
- Express server that:
  - Accepts POST requests to `/upload`
  - Handles multipart form data using `multer`
  - Spawns a Python child process to run `detect.py`
  - Sends the JSON output from the Python script to the frontend

### 2. `detect.py`
- Loads the YOLOv8 model from the `model/` folder
- Performs object detection on the uploaded image
- Counts the number of bounding boxes for the "cavity" class
- Saves an annotated image in `output/` folder
- Returns JSON like:
```json
{
  "cavity_count": 5,
  "output_image": "output/result.jpg"
}

🚀 How to Run the App
📌 Prerequisites:
Python 3.x with:

ultralytics, opencv-python, etc.

Node.js (v16+ recommended)

Trained yolov8.pt model

🧠 Step-by-Step:
1. Install Backend Dependencies
cd backend
npm install

2. Install Python Dependencies

pip install ultralytics opencv-python
Make sure your detect.py uses the correct path to your YOLOv8 model.

3. Start the Server
node app.js
It should run at: http://localhost:5000

4. Launch Frontend
Just open frontend/index.html in a browser (no need for a server).

🧪 Sample JSON Output from Backend

{
  "cavity_count": 3,
  "output_image": "output/result.jpg"
}
📎 Notes
Avoid uploading large images to reduce response time.

Ensure uploads/ and output/ folders have write permission.

node_modules/ should be excluded from ZIP if sharing.

 Author
P Ganesh – AI Cavity Detection App (2025)

📦 License
This project is for educational/demo purposes only. Not intended for clinical use.
