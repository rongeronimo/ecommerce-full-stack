import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";

const Orders = () => {

  const { currency, orders } = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {orders.length === 0 && (
          <p className='py-10 text-gray-500'>You have no orders yet.</p>
        )}

        {orders.map((order) => {
          const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          const { deliveryInfo } = order;

          return (
            <div key={order.id} className='border-b text-gray-700 flex flex-col'>

              {/* Order header */}
              <div className='py-4 border-t flex flex-col sm:flex-row sm:justify-between gap-2 text-sm'>
                <div>
                  <p>Order #{order.id}</p>
                  <p>Date: <span className='text-gray-400'>{order.date}</span></p>
                  <p>Payment: <span className='text-gray-400 uppercase'>{order.paymentMethod}</span></p>
                </div>
                {deliveryInfo && (
                  <div className='sm:text-right text-gray-500'>
                    <p className='text-gray-700'>{deliveryInfo.firstName} {deliveryInfo.lastName}</p>
                    <p>{deliveryInfo.street}</p>
                    <p>{deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zipcode}</p>
                    <p>{deliveryInfo.country}</p>
                  </div>
                )}
              </div>

              {/* Items */}
              {order.items.map((item) => (
                <div key={`${item._id}-${item.size}`} className='py-4 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div className='flex items-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item.image} alt={item.name} />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                        <p className='text-lg'>{currency}{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>{order.status}</p>
                    </div>
                    <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                  </div>
                </div>
              ))}

              {/* Order total */}
              <p className='py-4 border-t text-right font-medium'>
                Total: {currency}{total}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Orders