import ColorThief from 'colorthief';

export async function extractColors(imageUrl) {
  try {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Enable CORS
    img.src = imageUrl;
    await img.decode(); // Ensure image is loaded

    const dominantColor = colorThief.getColor(img);
    const palette = colorThief.getPalette(img, 5); // Get a palette of the dominant colors

    return {
      dominantColor: `rgb(${dominantColor.join(',')})`,
      palette: palette.map(color=> `rgb(${color.join(',')})`),
    };
  } catch (error) {
    console.error('Error extracting colors:', error);
    return null;
  }
}