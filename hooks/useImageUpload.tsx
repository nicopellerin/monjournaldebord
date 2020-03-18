import { useState, useEffect } from 'react'
import axios from 'axios'

export const useImageUpload = (immediate, action?) => {
  const [imageName, setImageName] = useState('')
  const [imageError, setImageError] = useState('')
  const [loader, setLoader] = useState('')
  const [imageURL, setImageURL] = useState('')

  const handleImageUpload = async e => {
    const file = e.target.files[0]

    if (file.size > 1000000 * 3) {
      return setImageError('Oupsss! Veuillez choisir une image de moins de 3MB')
    }

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'monjournaldebord')

    setImageName(file.name)

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        data,
        {
          onUploadProgress: progressEvent => {
            setLoader(
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                '%'
            )
          },
        }
      )
      action ? action(res.data.secure_url) : setImageURL(res.data.secure_url)
    } catch (err) {
      setImageError('Une erreur est survenue. Veuillez réessayer!')
    }
  }

  useEffect(() => {
    if (loader === 100 + '%') {
      setLoader(imageName)
    }
  }, [loader])

  useEffect(() => {
    if (immediate) {
      e => handleImageUpload(e)
    }
  }, [handleImageUpload, immediate])

  return { handleImageUpload, imageName, imageError, imageURL, loader }
}
