import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl, currency } from '../config'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)

  // Fetch the list on mount, and again whenever refreshKey changes
  useEffect(() => {
    let ignore = false

    const fetchList = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/list')
        if (ignore) return
        if (response.data.success) {
          setList(response.data.products || [])
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    fetchList()

    return () => {
      ignore = true
    }
  }, [refreshKey])

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        setRefreshKey(prev => prev + 1) // triggers the effect to refetch
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <p className='mb-2'>List of All Products</p>
      <div className='flex flex-col gap-2'>

        {/* Table header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product list */}
        {
          list.map((item) => (
            <div
              key={item._id}
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm'
            >
              <img className='w-12' src={item.image?.[0]} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p
                onClick={() => removeProduct(item._id)}
                className='text-right md:text-center cursor-pointer text-lg'
              >
                X
              </p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List