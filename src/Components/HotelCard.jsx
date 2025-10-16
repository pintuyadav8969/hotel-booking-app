import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={'/rooms/' + room._id}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className='relative max-w-70 w-full rounded-2xl overflow-hidden bg-white 
      text-gray-600 shadow-md border border-transparent 
      transition-all duration-300 ease-out
      hover:-translate-y-2 hover:shadow-xl hover:border-gray-100'
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          className="w-full h-48 object-cover transition-all duration-300 ease-out hover:brightness-105"
        />
      </div>

      {/* Best Seller Badge */}
      {index % 2 === 0 && (
        <p className='px-3 py-1 absolute top-3 left-3 text-xs 
        bg-white/90 backdrop-blur-sm text-gray-800 font-medium rounded-full shadow-sm'>
          Best Seller
        </p>
      )}

      {/* Content */}
      <div className='p-4 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='font-playfair text-xl font-medium text-gray-800'>
            {room.hotel.name}
          </p>
          <div className='flex items-center gap-1 text-yellow-500'>
            <img src={assets.starIconFilled} alt="star-icon" className='w-4 h-4' /> 4.5
          </div>
        </div>

        <div className='flex items-center gap-1 text-sm mt-1 text-gray-500'>
          <img
            src={assets.locationIcon}
            alt="location-icon"
            className="w-4 h-4 opacity-80"
          />
          <span className='truncate'>{room.hotel.address}</span>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <p>
            <span className='text-xl text-gray-800 font-semibold'>
              ${room.pricePerNight}
            </span>
            <span className='text-sm text-gray-500'> /night</span>
          </p>
          <button
            className='px-4 py-2 text-sm font-medium border 
            border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800
            transition-all duration-200'
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard;
