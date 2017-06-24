export const loadImage = (imgBase64, onload) => {
  const img = new Image()
  img.src = imgBase64
  img.onload = onload
  return img
}
