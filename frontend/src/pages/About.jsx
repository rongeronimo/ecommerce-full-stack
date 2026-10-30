import { assets } from "../assets/assets/frontend_assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'ZOVATTO'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Zovatto, your premier destination for curated, high-quality products designed to elevate your everyday life. Founded with a simple mission to blend style, functionality, and affordability, we continuously scour the globe to bring you an exclusive collection that speaks to your unique taste. We believe that shopping should be more than just a transaction—it should be an inspiring experience built on trust, seamless service, and exceptional value.</p>
          <p>At the heart of Zovatto is a passionate team dedicated to delivering excellence straight to your doorstep. We take immense pride in our meticulous quality standards, sustainable sourcing practices, and a customer-first philosophy that keeps your satisfaction at the center of everything we do. Whether you are discovering us for the first time or shopping your favorite essentials, we are thrilled to accompany you on your journey toward a more inspired lifestyle.</p>
          <b className='text-gray-800'>The Vision</b>
          <p>At Zovatto, we are fueled by a simple yet powerful belief: everyone deserves access to products that enhance their lifestyle without compromise. We wake up every day motivated to eliminate the compromise between premium quality and accessible pricing. By focusing on smart curation, reliable manufacturing, and a genuinely customer-first mentality, we push the boundaries of retail to deliver a shopping experience that continuously inspires your everyday routines.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'SARTORIAL'} text2={'LUXURY'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>La Dolce Vita:</b>
          <p className='text-gray-600'>To wear Zovatto is to embrace the spirit of the sweet life. Our brand stands at the intersection of bold self-expression and classic Mediterranean grace. We choose to do things differently by prioritizing sustainable, slow-fashion practices, ensuring that your garments are built to transcend seasons. When you style with us, you are investing in unmatched versatility, rich textile history, and an undeniable confidence.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Sprezzatura:</b>
          <p className='text-gray-600'>True Italian style is defined by a sense of effortless elegance, an artful sophistication that never looks like it is trying too hard. At Zovatto, we design our garments to fall into place naturally, offering flawless fits and fluid silhouettes that move gracefully with you. By merging relaxed comfort with high-fashion tailoring, we give you the freedom to express a timeless, understated confidence every single day.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Moda Pronta:</b>
          <p className='text-gray-600'>Modern luxury should seamlessly adapt to your lifestyle, moving effortlessly from our digital atelier straight to your wardrobe. At Zovatto, we have reimagined the luxury fashion experience by ensuring that premium Italian design is entirely accessible at your fingertips, complete with fast worldwide shipping and stress-free boutique returns. We handle the logistical complexities behind the scenes so that curated, runway-level sophistication arrives gracefully at your doorstep without the traditional wait.</p>
        </div>
      </div>
      
      <NewsletterBox />
    </div>
  )
}

export default About
