
# 🌈 **SAR Image Colorization with AI** 🌍

Welcome to the **SAR Image Colorization** project! 🎨  
This project aims to bring life to Synthetic Aperture Radar (SAR) images using AI-based techniques. We utilize deep learning models to colorize grayscale SAR images, making them more visually informative and easier to interpret. 🚀

### 🚀 **Key Features**:
- 🎨 **Colorization of SAR images** using AI models
- 🌍 **Enhances visual clarity** and interpretation of satellite images
- 💻 **Simple and easy-to-follow setup** for anyone to get started
- 🖼️ **Generates vibrant and meaningful colored images**

---

## 🛠️ **Installation & Setup**:

### 1. **Clone the repository:**
First, clone the repository to your local machine.
```bash
git clone https://github.com/Sahilgiri49/SAR-vision.git
cd SAR-vision
```

### 2. **Install Dependencies:**
Ensure you have Python 3.7+ installed. You can create a virtual environment to keep dependencies isolated.
```bash
python -m venv sar-env
source sar-env/bin/activate   # For Linux/MacOS
sar-env\Scriptsctivate      # For Windows
```

Now, install the necessary libraries.
```bash
pip install -r requirements.txt
```

---

## 🖼️ **How to Colorize SAR Images**:

### 1. **Prepare your SAR Image**: 📸  
Make sure you have a grayscale SAR image in `.png` or `.jpg` format.

### 2. **Run the Colorization Script**:  
After setting up the environment, use the following command to run the colorization process:
```bash
python colorize_sar.py --input_path path_to_your_image --output_path path_to_save_colored_image
```

### 3. **View the Output**:  
Your colorized SAR image will be saved in the output path you specified. Open it to see the results! 🎨👀

---

## ⚡ **Example**:

Here’s an example of how you would run the colorization process for a sample image:
```bash
python colorize_sar.py --input_path ./images/sample_sar_image.jpg --output_path ./output/colorized_image.jpg
```

---

## 📄 **Project Structure**:
```plaintext
SAR-vision/
│
├── colorize_sar.py         # Main script to colorize SAR image
├── requirements.txt        # Python dependencies
├── README.md               # Project documentation
└── images/                 # Folder to store your input SAR images
└── output/                 # Folder to store your colorized images
```

---

## 📝 **Contributing**:
Feel free to contribute to this project! 🛠️  
If you find any bugs or have feature suggestions, please open an issue or submit a pull request.

---

## ✨ **License**:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

🌟 **Hope this project helps you in visualizing SAR images in an enhanced way!** 🌟
