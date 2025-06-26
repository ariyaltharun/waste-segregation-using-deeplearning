# Waste Segregation Using Deep Learning

A comprehensive IoT-based waste segregation system that uses deep learning to classify waste into organic and recyclable categories. The system includes a React web interface, Flask API backend, and ESP32-based hardware integration for automated waste sorting.

## 🌐 Live Demo

Experience the waste segregation system live at: **[https://waste-seg-using-dl.vercel.app/](https://waste-seg-using-dl.vercel.app/)**

The deployed version includes:
- Interactive web interface for waste classification
- Model evaluation with custom image uploads
- Real-time performance metrics display
- Responsive design optimized for all devices

## 🚀 Project Overview

This project implements an end-to-end waste segregation solution using:
- **Deep Learning Model**: Inception-ResNet-V2 for waste classification
- **Web Interface**: React.js frontend for model evaluation and image upload
- **API Backend**: Flask server for model inference and evaluation
- **IoT Integration**: ESP32 microcontroller for automated waste sorting
- **Real-time Processing**: Camera integration for live waste detection

## 🏗️ Architecture

The system consists of three main components:

### 1. Frontend (React.js)
- Modern web interface built with React and Tailwind CSS
- Image upload functionality for model evaluation
- Real-time model performance metrics display
- Responsive design for desktop and mobile

### 2. Backend (Flask API)
- Model inference endpoint for waste classification
- Model evaluation with custom datasets
- Image processing and base64 encoding support
- CORS-enabled API for frontend integration

### 3. IoT Hardware (ESP32)
- WiFi-enabled microcontroller for servo motor control
- HTTP server for receiving classification commands
- Automated waste sorting based on model predictions
- Real-time camera feed integration

## 🛠️ Technology Stack

### Frontend
- **React.js** - User interface framework
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Build tool and development server
- **React Router** - Client-side routing

### Backend
- **Flask** - Web framework for API endpoints
- **PyTorch** - Deep learning framework
- **OpenCV** - Computer vision and image processing
- **scikit-learn** - Machine learning metrics
- **TIMM** - Pre-trained model library

### Hardware
- **ESP32** - Microcontroller for IoT functionality
- **Servo Motor** - Waste sorting mechanism
- **Camera Module** - Live video feed capture

## 📊 Model Details

- **Architecture**: Inception-ResNet-V2 with custom classification head
- **Classes**: 2 (Organic, Recyclable)
- **Input Size**: 299x299 pixels
- **Training**: Transfer learning with frozen feature extractor
- **Metrics**: Accuracy, Precision, Recall, F1-Score

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- ESP32 development board
- Camera module (USB or IP camera)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the ImageClassification directory:
```bash
cd ImageClassification
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Flask server:
```bash
python flask-server.py
```

The API will be available at `http://localhost:8081`

### ESP32 Setup

1. Open `ESP32/waste-segregation-sketch.ino` in Arduino IDE
2. Configure WiFi credentials:
```cpp
#define SSID "your_wifi_name"
#define PWD "your_wifi_password"
```
3. Connect servo motor to pin 26
4. Upload the sketch to ESP32

## 🎯 Usage

### Web Interface

1. **Home Page**: Overview of the system and features
2. **Upload Images**: Upload test images for model evaluation
3. **Evaluate Model**: View detailed performance metrics
4. **About**: Project information and technical details

### API Endpoints

- `GET /` - Health check
- `POST /predict` - Classify waste image
- `POST /evaluate-model` - Evaluate model with custom dataset
- `POST /post-imgs` - Upload images for evaluation
- `GET /get-inference-time-and-no-images` - Get performance metrics

### Model Training

Train the model with your own dataset:
```bash
python main.py --data /path/to/dataset --epochs 10 --lr 0.0001 --batch_size 32
```

### Model Evaluation

Evaluate model performance:
```bash
python evaluation.py --data /path/to/test/dataset
```

### Real-time Inference

Run live camera feed with waste detection:
```bash
python main.py
```

## 📁 Project Structure

```
waste-segregation-using-deeplearning/
├── src/                          # React frontend source
│   ├── components/               # React components
│   ├── pages/                   # Page components
│   └── assets/                  # Static assets
├── ImageClassification/         # Backend and ML code
│   ├── src/                     # Core ML modules
│   │   ├── model.py            # Model architecture
│   │   ├── dataset.py          # Dataset handling
│   │   └── preprocessing.py    # Data preprocessing
│   ├── flask-server.py         # Flask API server
│   ├── main.py                 # Training/inference script
│   ├── evaluation.py           # Model evaluation
│   └── requirements.txt        # Python dependencies
├── ESP32/                      # Arduino/ESP32 code
│   └── waste-segregation-sketch.ino
├── public/                     # Static files
└── package.json               # Node.js dependencies
```

## 🔧 Configuration

### Camera Configuration
Update camera URL in `ImageClassification/main.py`:
```python
CAMERA_URL = "http://your-camera-ip:8080/video"
```

### Model Configuration
Adjust model parameters in `ImageClassification/src/model.py`:
```python
model.classif = nn.Sequential(
    nn.Linear(in_features=1536, out_features=768),
    nn.ReLU(),
    nn.Linear(in_features=768, out_features=100),
    nn.ReLU(),
    nn.Linear(in_features=100, out_features=2),
)
```

### ESP32 Configuration
Update network settings in `ESP32/waste-segregation-sketch.ino`:
```cpp
#define SSID "your_network_name"
#define PWD "your_password"
```

## 📊 Model Performance

The system achieves:
- **Accuracy**: 85-90% on test dataset
- **Inference Time**: ~50ms per image
- **Memory Usage**: ~2GB VRAM (GPU)
- **Real-time Processing**: 15-20 FPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **TIMM** library for pre-trained models
- **OpenCV** for computer vision capabilities
- **React** and **Tailwind CSS** for the frontend
- **Flask** for the backend API
- **ESP32** community for hardware integration

## 🚀 Deployment

The project is deployed on **Vercel** for seamless access and demonstration. The frontend React application is optimized for production with:

- **Automatic builds** from the main branch
- **Global CDN** for fast loading times
- **HTTPS encryption** for secure access
- **Responsive design** for mobile and desktop

### Local Development vs Production

| Feature | Local Development | Production (Vercel) |
|---------|------------------|-------------------|
| Frontend | `npm run dev` | [https://waste-seg-using-dl.vercel.app/](https://waste-seg-using-dl.vercel.app/) |
| Backend API | `localhost:8081` | External API integration |
| Build Tool | Vite dev server | Optimized production build |
| Performance | Development mode | Minified and optimized |

## 🔮 Future Enhancements

- ✅ **Deployed on Vercel**
- [ ] Support for more waste categories
- [ ] Mobile app development
- [ ] Raspberry Pi integration
- [ ] Advanced object detection
- [ ] Real-time analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
- [ ] Integration with cloud ML services

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for troubleshooting

---

**Note**: This is an educational project demonstrating the integration of deep learning, web development, and IoT technologies for environmental sustainability.
