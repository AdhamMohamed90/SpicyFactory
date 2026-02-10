🔑 keyGarden - Custom Password Generator
Python GUI Platform

A modern password generator built with Python and CustomTkinter.

✨ Features
Auto Generate - Strong, high-length passwords
Text-Based - Generate from user text
Passphrase - Memorable word combinations
Batch Export - Multiple passwords to file
🚀 Installation
# Install CustomTkinter
git clone https://github.com/OmarCode-1/KeyGarden.git

# change the directory
cd KeyGarden

# make a virtual environment
python -m venv .venv
source .venv/bin/activate

# install the reqs
python -m pip install -r requirements.txt

# change the mode of the program if you using linux
chmod +x main.py

# run the program
python main.py
📁 Files
main.py                # Main application
requirements.txt       # Reqs you need it to run the program
passwords.txt          # Export file
🎮 How to Use
Run the application:

python main.py
Four Options:
Auto Generate - Click button for random password
Text-Based - Enter text, click "Generate from Text"
Passphrase - Click "Generate Passphrase"
Batch - Enter number, click "Generate & Save Batch"
🔧 Requirements.txt
Create file with:

customtkinter >= 5.2.2
CTkMessagebox >= 2.7
pyperclip >= 1.11.0
cryptography >= 46.0.4
🛠️ Setup Steps
Install Python 3.8+
Install Requirements: pip install -r requirements.txt
Run: python main.py
Use the GUI buttons
📝 Notes
Passwords saved to passwords.txt
Copy buttons available for each password
Customize themes in code
⚠️ Troubleshooting
Module error: Run pip install -r requirements.txt
GUI issues: Check Python version (3.13+)
Save errors: Check folder permissions
Tool created by Omar Ibrahim • © 2026

Stay secure!
