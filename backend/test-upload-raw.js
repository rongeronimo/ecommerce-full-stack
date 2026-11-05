import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'

const timestamp = Math.floor(Date.now() / 1000)
const signature = cloudinary.utils.api_sign_request(
  { timestamp },
  process.env.CLOUDINARY_SECRET_KEY
)

const form = new FormData()
form.append('file', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')
form.append('api_key', process.env.CLOUDINARY_API_KEY)
form.append('timestamp', timestamp)
form.append('signature', signature)

const res = await fetch(
  `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
  { method: 'POST', body: form }
)
console.log('status:', res.status)
console.log('server header:', res.headers.get('server'))
console.log('body:', (await res.text()).slice(0, 800))