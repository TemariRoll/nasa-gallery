#!/usr/bin/env python3
"""
Convert TIFF images to DZI (Deep Zoom Image) format
Requires: pip install pyvips
"""

import pyvips
import sys
import os

def convert_to_dzi(input_path, output_dir="dzi-images"):
    """
    Convert a TIFF image to DZI format with tiles
    
    Args:
        input_path: Path to input TIFF file
        output_dir: Directory to save DZI output
    """
    try:
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Get base filename without extension
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_path = os.path.join(output_dir, base_name)
        
        print(f"Loading image: {input_path}")
        image = pyvips.Image.new_from_file(input_path)
        
        print(f"Image size: {image.width} x {image.height}")
        print(f"Converting to DZI format...")
        
        # Convert to DZI with optimal settings
        image.dzsave(
            output_path,
            tile_size=256,      # Standard tile size
            overlap=1,          # 1 pixel overlap between tiles
            depth="onepixel",   # Generate all zoom levels
            suffix=".jpg[Q=85]" # JPEG with 85% quality
        )
        
        print(f"✓ Conversion complete!")
        print(f"  DZI file: {output_path}.dzi")
        print(f"  Tiles folder: {output_path}_files/")
        
        # Generate thumbnail
        print("Generating thumbnail...")
        thumb = image.thumbnail_image(300, height=300, crop="centre")
        thumb_path = os.path.join(output_dir, f"{base_name}-thumb.jpg")
        thumb.write_to_file(thumb_path)
        print(f"  Thumbnail: {thumb_path}")
        
        return True
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_to_dzi.py <input.tiff> [output_dir]")
        print("Example: python convert_to_dzi.py nasa-image.tiff dzi-images")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "dzi-images"
    
    if not os.path.exists(input_file):
        print(f"Error: File not found: {input_file}")
        sys.exit(1)
    
    success = convert_to_dzi(input_file, output_dir)
    sys.exit(0 if success else 1)
