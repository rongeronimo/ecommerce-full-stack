import { assets } from "../assets/frontend_assets/assets"

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> 
                <div>
                    <img className='mb-5 w-32' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>
                        GET IN TOUCH
                    </p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-243-535-5325</li>
                        <li>contactuser@zovatto.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-4 text-sm text-center'>Copyright 2026@zovatto.com - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
