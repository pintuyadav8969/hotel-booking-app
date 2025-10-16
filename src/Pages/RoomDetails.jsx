import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, roomsDummyData } from '../assets/assets';
import StarRating from '../Components/StarRating';
import HotelReg from '../Components/HotelReg';

const RoomDetails = ({ bookings, setBookings }) => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const selectedRoom = roomsDummyData.find(r => r._id === id);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id]);

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    const conflict = bookings.find(
      (b) => b.room._id === room._id && b.checkInDate === checkIn
    );

    if (conflict) {
      setAvailabilityStatus('notAvailable');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2600);
      return;
    }

    setAvailabilityStatus('available');
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setModalOpen(true);
    }, 2400);
  };

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 relative">
        {/*  Room Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{' '}
            <span className="font-inter text-sm text-gray-500">
              ({room.roomType})
            </span>
          </h1>
          <p className="font-inter text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/*  Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* 📍 Address */}
        <div className="flex items-center gap-1 mt-2 text-gray-500">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Room"
                onClick={() => setMainImage(img)}
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer transition-all duration-300 ${
                  mainImage === img
                    ? 'outline-4 outline-orange-500 scale-105'
                    : 'hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🧾 Check Availability Form */}
        <form
          onSubmit={handleCheckAvailability}
          className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-2xl p-6 rounded-2xl mx-auto mt-16 max-w-6xl border border-gray-100"
        >
          <div className="flex w-full flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col flex-1 min-w-[160px]">
              <label className="font-semibold mb-1 text-gray-800">Check-In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-[160px]">
              <label className="font-semibold mb-1 text-gray-800">Check-Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-[120px]">
              <label className="font-semibold mb-1 text-gray-800">Guests</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min={1}
                className="rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 text-white rounded-xl px-8 py-6  mt-10 md:mt-0 to-blue-600 hover:to-pink-600 transition-all shadow-lg shadow-orange-300"
            >
              Check Availability Book Now
            </button>
          </div>
        </form>

        {/*  Smooth Top Popup */}
        {showPopup && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
            <div
              className={`relative bg-white rounded-2xl shadow-2xl px-10 py-6 border-t-4 ${
                availabilityStatus === 'available'
                  ? 'border-green-400'
                  : 'border-red-400'
              } backdrop-blur-lg bg-opacity-90 w-[90vw] sm:w-[420px]`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    availabilityStatus === 'available'
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                  } animate-bounce`}
                >
                  <span
                    className={`text-3xl font-bold ${
                      availabilityStatus === 'available'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {availabilityStatus === 'available' ? '✓' : '✕'}
                  </span>
                </div>
                <h2
                  className={`mt-3 text-xl font-semibold ${
                    availabilityStatus === 'available'
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {availabilityStatus === 'available'
                    ? 'Room Available!'
                    : 'Not Available!'}
                </h2>
                <p className="text-gray-600 text-sm mt-1 text-center">
                  {availabilityStatus === 'available'
                    ? 'You can continue to book this room'
                    : 'Sorry, this date is already booked'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 🪟 Booking Modal */}
        {modalOpen && (
          <HotelReg
            room={room}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            setBookings={setBookings}
            closeModal={() => setModalOpen(false)}
          />
        )}

        {/* 🎬 Animations */}
        <style jsx>{`
          @keyframes slideDown {
            0% {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
            50% {
              opacity: 1;
              transform: translate(-50%, 8px);
            }
            100% {
              transform: translate(-50%, 0);
              opacity: 1;
            }
          }
          .animate-slideDown {
            animation: slideDown 0.6s ease-out;
          }
        `}</style>
      </div>
    )
  );
};

export default RoomDetails;
