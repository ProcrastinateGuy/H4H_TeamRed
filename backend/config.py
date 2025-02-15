import os

# Default upload directory, can be overridden with an environment variable
UPLOAD_DIRECTORY = os.getenv("UPLOAD_DIRECTORY", "uploads")

# Ensure the upload directory exists
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)