import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const HotelReg = ({ room, checkIn, checkOut, guests, setBookings, closeModal, userData, bookingId, isEditMode = false }) => {
  const [name, setName] = useState(userData?.name || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [city, setCity] = useState(userData?.city || '');
  const [guestCount, setGuestCount] = useState(guests || 1);
  const [price, setPrice] = useState(room.pricePerNight * (guests || 1));
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setPrice(room.pricePerNight * guestCount);
  }, [guestCount, room.pricePerNight]);

  const handleRegister = (e) => {
    e.preventDefault();

    const newBooking = {
      _id: bookingId || Date.now(),
      room,
      roomImage: room.images[0],
      hotel: room.hotel,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests: guestCount,
      user: { name, phone, email, city },
      totalPrice: price,
    };

    if (isEditMode) {
      setBookings(newBooking);
    } else {
      setBookings(prev => {
        const updated = [...prev, newBooking];
        localStorage.setItem('userBookings', JSON.stringify(updated));
        return updated;
      });
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      closeModal();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      {/* Booking Form Modal */}
      <form onSubmit={handleRegister} className="flex flex-col md:flex-row bg-white rounded-xl max-w-4xl w-full animate-slideFromTop shadow-2xl">
        <img src={assets.regImage} alt="reg" className="w-1/2 rounded-l-xl hidden md:block object-cover" />
        <div className="relative flex flex-col md:w-1/2 p-8 md:p-10">
          <img src={assets.closeIcon} alt="close" onClick={closeModal} className="absolute top-4 right-4 h-4 w-4 cursor-pointer" />
          <p className="text-2xl font-semibold mt-6">{isEditMode ? 'Update Registration Hotel Booking' : 'Registration Hotel Booking Details'}</p>

          {/* Input Fields */}
          <div className="w-full mt-4">
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="border border-gray-200 rounded w-full px-3 py-2 mt-1" />
          </div>
          <div className="w-full mt-4">
            <label>Phone</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="border border-gray-200 rounded w-full px-3 py-2 mt-1" />
          </div>
          <div className="w-full mt-4">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border border-gray-200 rounded w-full px-3 py-2 mt-1" />
          </div>
          <div className="w-full mt-4">
            <label>City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="border border-gray-200 rounded w-full px-3 py-2 mt-1" />
          </div>
          <div className="w-full mt-4">
            <label>Guests</label>
            <input type="number" value={guestCount} onChange={e => setGuestCount(Number(e.target.value))} required min={1} className="border border-gray-200 rounded w-full px-3 py-2 mt-1" />
          </div>
          <div className="w-full mt-4">
            <label>Total Price</label>
            <input type="text" value={`₹${price}`} disabled className="border border-gray-200 bg-gray-100 rounded w-full px-3 py-2 mt-1" />
          </div>

          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded mt-6">
            {isEditMode ? 'Save Changes' : 'Confirm Booking'}
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {showSuccess && (
  <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/30">
    <div className="bg-green-100 border border-green-500 text-green-700 px-8 py-6 rounded-2xl shadow-2xl text-2xl font-semibold flex flex-col items-center gap-3 animate-slideFromTopSmooth">
      ✅ Booking Confirmed!
      <span className="text-lg mt-2">We’ll see you soon 🏨</span>
    </div>
  </div>
)}

<style jsx>{`
  @keyframes slideFromTopSmooth {
    0% {
      transform: translateY(-300%) scale(0.7);
      opacity: 0;
    }
    50% {
      transform: translateY(20%) scale(1.1);
      opacity: 1;
    }
    70% {
      transform: translateY(-10%) scale(0.95);
    }
    90% {
      transform: translateY(5%) scale(1.02);
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  .animate-slideFromTopSmooth {
    animation: slideFromTopSmooth 1s cubic-bezier(0.25, 1.25, 0.5, 1) forwards;
  }
`}</style>

    </div>
  );
};

export default HotelReg;
