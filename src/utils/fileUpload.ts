const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/alexispavon010/auto/upload'

export const fileUpload = async (file: any) => {

  if (!file) return null;

  const formData = new FormData();

  formData.append('upload_preset', 'prueba')
  formData.append('file', file)

  try {
    const response = await fetch(CLOUDINARY_URL, {
      // headers: {
      //   'Content-Type': 'video/mp4'
      // },
      method: 'POST',
      body: formData
    })
    if (!response.ok) throw new Error('Error uploading file')
    const res = await response.json()
    return res.secure_url

  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }

}