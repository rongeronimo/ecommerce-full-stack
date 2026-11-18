import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'

const SIZES = ["S", "M", "L", "XL", "XXL"]
const EMPTY_IMAGES = [false, false, false, false]

const Add = ({ token }) => {

  const [images, setImages] = useState(EMPTY_IMAGES)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const handleImageChange = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      setImages(prev => prev.map((img, i) => (i === index ? file : img)))
    }
    // Clear input so picking the same file again after removing it still works
    e.target.value = ''
  }

  const removeImage = (index) => {
    setImages(prev => prev.map((img, i) => (i === index ? false : img)))
  }

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])
  }

  const resetForm = () => {
    setImages(EMPTY_IMAGES)
    setName('')
    setDescription('')
    setPrice('')
    setCategory('Men')
    setSubCategory('Topwear')
    setBestSeller(false)
    setSizes([])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))

      images.forEach((image, index) => {
        image && formData.append(`image${index + 1}`, image)
      })

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        resetForm()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {images.map((image, index) => (
            <div key={index} className='relative'>
              <label htmlFor={`image${index + 1}`}>
                <img
                  className='w-40 cursor-pointer'
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
                <input
                  onChange={(e) => handleImageChange(index, e)}
                  type="file"
                  id={`image${index + 1}`}
                  accept="image/*"
                  hidden
                />
              </label>
              {image && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label="Remove image"
                  className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-black text-white text-xs leading-none cursor-pointer'
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter name' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Enter description' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Subcategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Headwear">Headwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='100' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {SIZES.map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p className={`${sizes.includes(size) ? "bg-[#DCC8E5]" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Best Seller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'>Add</button>
    </form>
  )
}

export default Add