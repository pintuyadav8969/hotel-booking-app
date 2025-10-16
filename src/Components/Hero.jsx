import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [destination, setDestination] = useState('')
  const [availability, setAvailability] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (!destination.trim()) {
      alert('Please enter a destination first!')
      return
    }

    const found = cities.some(
      (city) => city.toLowerCase() === destination.toLowerCase()
    )
    setAvailability(found)
    setShowResult(true)

    // Auto-hide modal after 3s
    setTimeout(() => setShowResult(false), 2000)
  }

  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center min-h-screen'>

      {/* Hotel Notification Card */}
      {showResult && (
        <>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black/40 z-40"></div>

          {/* Notification Card */}
          <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50
            w-11/12 md:w-3/4 max-w-lg bg-white rounded-2xl shadow-lg p-6
            transition-all duration-500 ease-out animate-fadeIn
            ${availability ? 'text-green-700' : 'text-red-600'}
          `}>
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="text-4xl md:mt-1">
                {availability ? '🏨' : ''}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {availability
                    ? `Good news! Hotels are available in ${destination}`
                    : `Sorry! No hotels available in ${destination}`}
                </h2>
                <p className="text-gray-600 mt-1">
                  {availability
                    ? 'Explore the rooms, check-in options, and book your perfect stay today.'
                    : 'Try searching for nearby cities or check back later for availability.'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero Content */}
      <p className='bg-[#49B9ff]/50 px-3.5 py-1 rounded-full mt-20'>
        The Ultimate Hotel Experience
      </p>

      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>
        Discover your perfect gateway Destination
      </h1>

      <p className='max-w-130 mt-2 text-sm md:text-base text-white/90'>
        Unparalleled luxury and comfort await at the world's most exclusive hotels
        and resorts. Start your journey today.
      </p>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'
      >
        {/* Destination input */}
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            list='destinations'
            id="destinationInput"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full"
            placeholder="Type your destination"
            required
          />

          <datalist id='destinations'>
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check in */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input id="checkIn" type="date" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
        </div>

        {/* Check out */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input id="checkOut" type="date" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
        </div>

        {/* Guests */}
        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <label htmlFor="guests">Guests</label>
          <input min={1} max={4} id="guests" type="number" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16" placeholder="0" />
        </div>

        {/* Search button */}
        <button
          type="submit"
          className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1 hover:bg-gray-800 transition'
        >
          <img src={assets.searchIcon} alt="" className='h-7' />
          <span>Search</span>
        </button>
      </form>
    </div>
  )
}

export default Hero;
