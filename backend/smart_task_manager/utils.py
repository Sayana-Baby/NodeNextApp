import os
import cloudinary
import cloudinary.uploader
import time

def generate_cloudinary_signature():
    """
    Generates a secure signature for direct uploads to Cloudinary.
    
    This function configures Cloudinary with credentials from environment
    variables and creates a signature for a dictionary of parameters.
    The signature is valid for a short period, enhancing security.

    Returns:
        dict: A dictionary containing the signature and timestamp required
              by the Cloudinary upload widget.
    """
    # Configure Cloudinary using environment variables
    cloudinary.config(
        cloud_name=os.environ.get('CLOUDINARY_CLOUD_NAME'),
        api_key=os.environ.get('CLOUDINARY_API_KEY'),
        api_secret=os.environ.get('CLOUDINARY_API_SECRET'),
        secure=True
    )

    # Prepare parameters for signing.
    # The timestamp is crucial for making the signature time-sensitive.
    params_to_sign = {
        'timestamp': int(time.time())
        # You can add other upload parameters here if needed, for example:
        # 'eager': 'w_400,h_300,c_pad|w_260,h_200,c_crop',
        # 'public_id': 'unique_public_id'
    }

    # Generate the signature using the Cloudinary utility function.
    # This uses your API secret to create the signature, but the secret is never exposed.
    signature = cloudinary.utils.api_sign_request(
        params_to_sign,
        os.environ.get('CLOUDINARY_API_SECRET')
    )

    return {
        "signature": signature,
        "timestamp": params_to_sign['timestamp'],
        "api_key": os.environ.get('CLOUDINARY_API_KEY')
    }
