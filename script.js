const gallery = document.getElementById("gallery")
const viewerModal = document.getElementById("viewerModal")
const viewerTitle = document.getElementById("viewerTitle")
const viewerDesc = document.getElementById("viewerDesc")
const viewerContainer = document.getElementById("viewerContainer")
const closeBtn = document.getElementById("closeBtn")
const dziInput = document.getElementById("dziInput")

let viewer = null

// Import OpenSeadragon
const OpenSeadragon = window.OpenSeadragon

// Handle DZI file upload
dziInput.addEventListener("change", async (e) => {
  const file = e.target.files[0]
  if (!file) return

  try {
    // Read the DZI file content
    const text = await file.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(text, "text/xml")

    // Extract image info from DZI XML
    const imageElement = xmlDoc.getElementsByTagName("Image")[0]
    const format = imageElement.getAttribute("Format")
    const tileSize = imageElement.getAttribute("TileSize")

    // Get the base name (without .dzi extension)
    const baseName = file.name.replace(".dzi", "")

    // Create a prompt for the user to place their files
    const instructions = `
To use your DZI image:

1. Create a folder structure like this:
   /dzi-images/
     ├── ${file.name}
     └── ${baseName}_files/
         ├── 0/
         ├── 1/
         ├── 2/
         └── ... (all zoom level folders with tiles)

2. Place this structure in your website directory

3. Update the gallery item in index.html:
   <div class="gallery-item" 
        data-dzi="dzi-images/${file.name}" 
        data-title="Your Image Title"
        data-desc="Your description">
     <img src="path/to/thumbnail.jpg" alt="Your Image">
     <div class="gallery-item-info">
       <h3>Your Image Title</h3>
       <p>Description</p>
     </div>
   </div>

Your DZI file info:
- Format: ${format}
- Tile Size: ${tileSize}px
- Tiles folder: ${baseName}_files/
    `

    alert(instructions)
    console.log("[v0] DZI file analyzed:", { format, tileSize, baseName })
  } catch (error) {
    console.error("[v0] Error reading DZI file:", error)
    alert("Error reading DZI file. Please make sure it's a valid .dzi file.")
  }

  // Reset input
  dziInput.value = ""
})

// Open image viewer with OpenSeadragon
gallery.addEventListener("click", (e) => {
  const galleryItem = e.target.closest(".gallery-item")
  if (!galleryItem) return

  // Check if this item has a redirect URL
  const redirectUrl = galleryItem.dataset.redirect
  if (redirectUrl) {
    // Redirect to the specified URL
    window.location.href = redirectUrl
    return
  }

  // Otherwise, open the DZI viewer as normal
  const dziPath = galleryItem.dataset.dzi
  const title = galleryItem.dataset.title
  const desc = galleryItem.dataset.desc

  viewerTitle.textContent = title
  viewerDesc.textContent = desc
  viewerModal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Initialize OpenSeadragon viewer
  if (viewer) {
    viewer.destroy()
  }

  viewer = OpenSeadragon({
    element: viewerContainer,
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@4.1/build/openseadragon/images/",
    tileSources: dziPath,
    showNavigationControl: true,
    navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_RIGHT,
    showZoomControl: true,
    showHomeControl: true,
    showFullPageControl: true,
    animationTime: 0.5,
    blendTime: 0.1,
    constrainDuringPan: false,
    maxZoomPixelRatio: 2,
    minZoomLevel: 0.5,
    visibilityRatio: 0.5,
    zoomPerScroll: 1.2,
    homeFillsViewer: false,
    immediateRender: true,
    gestureSettingsMouse: {
      clickToZoom: false,
      dblClickToZoom: true,
    },
  })

  console.log("[v0] OpenSeadragon viewer initialized for:", dziPath)
})

// Close viewer
closeBtn.addEventListener("click", closeViewer)
viewerModal.addEventListener("click", (e) => {
  if (e.target === viewerModal) {
    closeViewer()
  }
})

function closeViewer() {
  viewerModal.classList.remove("active")
  document.body.style.overflow = ""

  if (viewer) {
    viewer.destroy()
    viewer = null
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (!viewerModal.classList.contains("active")) return

  if (e.key === "Escape") {
    closeViewer()
  }
})

// Helper function to add images programmatically
function addDziImage(dziPath, thumbnailPath, title, description, redirectUrl = null) {
  const galleryItem = document.createElement("div")
  galleryItem.className = "gallery-item"

  if (redirectUrl) {
    galleryItem.dataset.redirect = redirectUrl
  } else {
    galleryItem.dataset.dzi = dziPath
  }

  galleryItem.dataset.title = title
  galleryItem.dataset.desc = description

  galleryItem.innerHTML = `
    <img src="${thumbnailPath}" alt="${title}">
    <div class="gallery-item-info">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `

  gallery.appendChild(galleryItem)
}

// Example: Add DZI images with optional redirect
// addDziImage("dzi-images/nebula.dzi", "thumbnails/nebula.jpg", "Nebula", "Beautiful space nebula")
// addDziImage(null, "thumbnails/activity.jpg", "Activity 1", "Click to access", "activity1.html")
