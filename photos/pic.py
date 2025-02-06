
from PIL import Image, ImageDraw, ImageFont

# List of file names
file_names = [
    "placeholder"
]

# Create placeholders for each file name
for file_name in file_names:
    # Create a blank image with white background
    img = Image.new('RGB', (200, 200), color = (255, 255, 255))
    
    # Initialize the drawing context
    d = ImageDraw.Draw(img)
    
    # Define the text and font
    text = file_name
    font = ImageFont.load_default()
    
    # Calculate the bounding box of the text to be added
    bbox = d.textbbox((0, 0), text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    # Calculate X, Y position of the text
    x = (img.width - text_width) / 2
    y = (img.height - text_height) / 2
    
    # Add text to image
    d.text((x, y), text, fill=(0, 0, 0), font=font)
    
    # Save the image with the corresponding file name ending with .jpg
    img.save(f"{file_name}.jpg")

print("Placeholders for mug shots have been created successfully.")
