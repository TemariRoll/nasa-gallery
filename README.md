# NASA Image Gallery with DZI Support

A web-based gallery for viewing large NASA images using Deep Zoom Image (DZI) format with OpenSeadragon.

## Features

- **Deep Zoom Support**: View extremely large images (30,000+ tiles) smoothly
- **Pan & Zoom**: Drag to pan, scroll to zoom, double-click to zoom in
- **Responsive Design**: Works on desktop and mobile devices
- **Space-themed UI**: Beautiful dark theme perfect for astronomy images

## How to Use Your DZI Images

### 1. Prepare Your Files

Your DZI structure should look like this:
\`\`\`
/dzi-images/
  ├── image1.dzi
  ├── image1_files/
  │   ├── 0/
  │   │   └── 0_0.jpg
  │   ├── 1/
  │   │   ├── 0_0.jpg
  │   │   └── 0_1.jpg
  │   ├── 2/
  │   └── ... (more zoom levels)
  ├── image2.dzi
  └── image2_files/
      └── ... (tiles)
\`\`\`

### 2. Add Images to Gallery

Edit `index.html` and add gallery items:

\`\`\`html
<div class="gallery-item" 
     data-dzi="dzi-images/your-image.dzi" 
     data-title="Your Image Title"
     data-desc="Description of your image">
  <img src="thumbnails/your-image-thumb.jpg" alt="Your Image Title">
  <div class="gallery-item-info">
    <h3>Your Image Title</h3>
    <p>Brief description</p>
  </div>
</div>
\`\`\`

### 3. Create Thumbnails

Create thumbnail images (300x300px recommended) for the gallery grid view.

### 4. Deploy

Place all files on a web server. The gallery will load tiles on-demand as users zoom and pan.

## Converting TIFF to DZI

If you have TIFF files, convert them to DZI format using:

**Python (recommended):**
\`\`\`bash
pip install pyvips
python convert_to_dzi.py your-image.tiff
\`\`\`

**ImageMagick:**
\`\`\`bash
convert your-image.tiff -define dzi:tile-size=256 output.dzi
\`\`\`

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Credits

Built with [OpenSeadragon](https://openseadragon.github.io/) - the leading web-based viewer for high-resolution zoomable images.
