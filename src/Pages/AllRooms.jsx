import React, { useState } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../Components/StarRating';

const CheckBox = ({ label, selected = false, onchange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onchange(e.target.checked, label)}
        className="accent-black"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(""); // single price selection

  const priceRanges = ["0 to 100", "100 to 200", "200 to 250", "250 to 300", "300 to 400"];

  // Filter rooms
  const filteredRooms = roomsDummyData.filter((room) => {
    if (!selectedPrice) return true;
    const [min, max] = selectedPrice.split(" to ").map(Number);
    return room.pricePerNight >= min && room.pricePerNight <= max;
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      
      {/* Rooms List */}
      <div className="flex-1 transition-all duration-500">
        <div className="flex flex-col items-start text-left mb-6">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        {/* No Rooms Message */}
        {filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 w-full">
            <div className="bg-blue-50 border border-blue-300 rounded-lg shadow-lg p-6 max-w-xs w-full text-center transition-all duration-500 ease-in-out">
              <p className="text-base md:text-lg text-blue-600 leading-relaxed">
                Try selecting a different price range or click{" "}
                <span
                  className="font-semibold underline cursor-pointer"
                  onClick={() => setSelectedPrice('')}
                >
                  "All"
                </span>{" "}
                to see all available rooms.
              </p>
            </div>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0 transition-all duration-500"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Room Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              />

              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-3xl font-playfair cursor-pointer hover:text-blue-600 transition-colors duration-300"
                >
                  {room.hotel.name}
                </p>
                <div className="flex items-center">
                  <StarRating />
                  <p className="ml-2">200+ reviews</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>

                {/* Room Amenities */}
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/76 transition-all duration-300 hover:bg-[#E0E0FF]">
                      <img src={facilityIcons[item]} alt="item" className="w-5 h-5" />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Room price */}
                <p className="text-xl font-medium text-gray-700">${room.pricePerNight} /night</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filters */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16 transition-all duration-500">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 cursor-pointer`}
          onClick={() => setOpenFilters(!openFilters)}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs">
            <span className="lg:hidden">{openFilters ? "HIDE" : "SHOW"}</span>
            <span
              className="hidden lg:block underline text-sm"
              onClick={() => setSelectedPrice('')}
            >
              CLEAR
            </span>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-700 ${openFilters ? 'h-auto' : 'h-0 lg:h-auto'}`}>
          {/* All Button */}
          <div className="px-5 pt-5 pb-3">
            <button
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-md font-medium mb-3 hover:bg-gray-300 transition-all"
              onClick={() => setSelectedPrice('')}
            >
              All
            </button>
          </div>

          {/* Price Ranges */}
          <div className="px-5 pt-0 pb-7">
            <p className="font-medium text-gray-800 pb-2">Price Range ($)</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={range}
                selected={selectedPrice === range}
                onchange={(checked, label) => {
                  if (checked) setSelectedPrice(label);
                  else setSelectedPrice('');
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
