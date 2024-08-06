# Crop Sage - Agricultural AI Assistant

Welcome to Crop Sage, an innovative web application designed to revolutionize the agricultural industry by leveraging advanced AI technologies. Our project integrates Falcon-7B-instruct, a fine-tuned language model, to provide intelligent responses to agricultural queries and a CNN model for plant disease detection.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)

## Introduction

Crop Sage aims to empower farmers and agricultural experts by providing them with an AI-powered assistant capable of answering questions related to crop management and diagnosing plant diseases from images. This project was developed by Team Crop Sage, combining our passion for technology and agriculture to create a valuable tool for the farming community.

## Features

- **Intelligent Chatbot**: Ask questions related to agriculture and get precise answers powered by Falcon-7B-instruct.
- **Plant Disease Detection**: Upload images of plants and receive a diagnosis of potential diseases using our CNN model.
- **User Authentication**: Secure sign-up and login functionality.
- **Streamlit Integration**: Easily accessible image upload feature for plant disease detection.

## Demo

Check out our live demo:

- **Application URL**: [Your Deployed URL Here]

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Zaimr49/CropSage.git
   cd CropSage
Create and activate a virtual environment:

sh
Copy code
python -m venv env
source env/bin/activate  # On Windows, use `env\Scripts\activate`
Install the required packages:

sh
Copy code
pip install -r requirements.txt
Run the application:

sh
Copy code
streamlit run main.py

## Usage

Sign Up / Login: Create an account or log in using your credentials.
Chat with the AI: Use the chat interface to ask questions about agriculture.
Plant Disease Detection: Navigate to the disease detection page and upload images of plants to receive a diagnosis.

## Technologies

Languages: Python
Frameworks: Streamlit, Flask
AI Models: Falcon-7B-instruct (fine-tuned), CNN for image classification
Libraries: transformers, peft, bitsandbytes, trl, torch, OpenCV
Deployment: Streamlit Cloud

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Thank you for checking out Crop Sage! We hope our application makes a positive impact on the agricultural community.
