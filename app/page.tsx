import React from 'react'
import Image from "next/image"
import SearchBar from '@/components/SearchBar'
import HeroCarousel from '@/components/HeroCarousel'

const Home = () => {
  return (
    <>
    <section className='px-6 md:px-20 py-24 border-t-2 border-red-500'>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='small-text'>
            Smart Shopping Starts Here:
            <Image src='/assets/icons/arrow-right.svg'
            alt='Right Arrow' 
            width={16}
            height={16}/>
          </p>

          <h1 className='head-text'>
            Unleash The Power Of Price
            <span className='text-primary'>Wise</span>
          </h1>

          <p className='mt-6'>
            Powerful, self-serve product and growth
            analytics to help you convert, engage, and
            retain more.
          </p>

          <SearchBar/>

        </div>

      <HeroCarousel/>

      </div>
    </section>
    

    <section className='trending-section'>
    <h2 className='section-text'>Trending</h2>
      <div className='flex flex-wrap gap-x-8 gap-y-16'>
        {['Apple-Iphone-15','Books','Sneakers','Shirts'].map(
          (prod)=>(
            <div>
              {prod}
             </div> 
          )
        )}
      </div>
    </section>

    </>
  )
}

export default Home