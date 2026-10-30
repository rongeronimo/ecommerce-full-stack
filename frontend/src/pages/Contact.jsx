import { assets } from "../assets/assets/frontend_assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"


const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Boutique</p>
          <p className='text-gray-500'>Zovatto S.r.l. Via della Spiga <br /> 12 20121 Milano (MI) Italy </p>
          <p className='text-gray-500'>Tel: +39 02 555 0192 <br /> Email: contactuser@zovatto.com</p>
          <p className='font-semibold text-xl text-gray-600'>Join the Atelier</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <p className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</p>
        </div>
      </div>

      <NewsletterBox />
      
    </div>
  )
}

export default Contact
