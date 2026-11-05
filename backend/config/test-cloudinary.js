import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

const cfg = cloudinary.config()
console.log('cloud_name:', JSON.stringify(cfg.cloud_name), 'api_key:', cfg.api_key)

try {
  console.log('ping:', await cloudinary.api.ping())
} catch (e) {
  console.log('ping failed:', e)
}

try {
  const r = await cloudinary.uploader.upload(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
  )
  console.log('upload ok:', r.secure_url)
} catch (e) {
  console.log('upload failed:', e)
}