from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import cv2
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
# Get the directory of the current script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define folder paths relative to the script's directory
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
OUTPUT_FOLDER = os.path.join(BASE_DIR, 'output')

# Create the directories if they don't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)

# Configure the app with the folder paths
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER


def simulate_colorization(image):
    """
    Simulates SAR image colorization by applying a false color mapping.
    """
    return cv2.applyColorMap(image, cv2.COLORMAP_JET)


@app.route('/process-image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Read the uploaded image as grayscale
    img = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        return jsonify({'error': 'Invalid image file'}), 400

    # Simulate colorization
    colorized_img = simulate_colorization(img)

    # Save the output image
    output_filename = f"colorized_{filename}"
    output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
    cv2.imwrite(output_path, colorized_img)

    return jsonify({'output_url': f"/download/{output_filename}"})


@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(app.config['OUTPUT_FOLDER'], filename)
    if os.path.exists(file_path):
        return send_file(file_path, mimetype='image/png')
    return jsonify({'error': 'File not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
