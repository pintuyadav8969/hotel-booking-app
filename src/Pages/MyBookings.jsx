import React, { useState, useEffect } from 'react';
import HotelReg from '../Components/HotelReg';
import emptyCartVideo from '../assets/emptyCartVideo.mp4';

const MyBookings = ({ bookings, setBookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  // Load bookings from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userBookings') || '[]');
    setBookings(stored);
  }, []);

  // Show video if empty
  useEffect(() => {
    setShowVideo(bookings.length === 0);
  }, [bookings]);

  // Delete
  const handleDelete = (id) => {
    const updated = bookings.filter((b) => b._id !== id);
    setBookings(updated);
    localStorage.setItem('userBookings', JSON.stringify(updated));
  };

  // Update
  const handleUpdateBooking = (updatedBooking) => {
    const newBookings = [...bookings];
    newBookings[editIndex] = {
      ...newBookings[editIndex],
      user: updatedBooking.user,
      guests: updatedBooking.guests,
      checkInDate: updatedBooking.checkInDate,
      checkOutDate: updatedBooking.checkOutDate,
    };

    setBookings(newBookings);
    localStorage.setItem('userBookings', JSON.stringify(newBookings));

    setEditIndex(null);
    setShowUpdatePopup(true);
    setTimeout(() => setShowUpdatePopup(false), 3500);
  };

  return (
    <div className="py-28 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32 space-y-6 relative ">

      {/* 🧳 Empty State */}
     {showVideo && (
        <div className="absolute h-100 p-20 inset-0 mt-10 flex flex-col items-center justify-center bg-gradient-to-br from-green-200  z-10 animate-fadeIn">
          <video
            autoPlay
            muted
            loop
            className="w-80 h-80 md:w-96 md:h-96 rounded-full shadow-2xl border-4 border-amber-500 animate-float"
          >
            <source src={emptyCartVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-amber-800 text-5xl mt-6 font-bold animate-pulse text-center">
          🏨 You have no hotel bookings yet...
          </p>
         </div>
        )}

      {/* 🏨 Booking List (Row Layout) */}
      <div className="space-y-6">
        {bookings.map((b, index) => (
          <div
            key={b._id}
            className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-gray-200 shadow-lg rounded-xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fadeInUp"
          >
            {/* 🏨 Left: Image + Hotel Info */}
            <div
              className="flex items-center gap-5 w-full md:w-1/3 cursor-pointer"
              onClick={() => setSelectedBooking(b)}
            >
              <img
                src={b.roomImage}
                alt="room"
                className="w-28 h-28 md:w-36 md:h-28 rounded-xl object-cover shadow-md"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">{b.hotel.name}</p>
                <p className="text-sm text-gray-500">{b.room.roomType}</p>
                <p className="text-indigo-600 font-medium mt-1">₹{b.totalPrice}</p>
              </div>
            </div>

            {/* 📅 Middle: Booking Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-sm text-gray-600 w-full md:w-1/2">
              <p><span className="font-semibold text-gray-800">Check-In:</span> {b.checkInDate}</p>
              <p><span className="font-semibold text-gray-800">Check-Out:</span> {b.checkOutDate}</p>
              <p><span className="font-semibold text-gray-800">Guests:</span> {b.guests}</p>
              <p><span className="font-semibold text-gray-800">Name:</span> {b.user.name}</p>
              <p><span className="font-semibold text-gray-800">Phone:</span> {b.user.phone}</p>
              <p><span className="font-semibold text-gray-800">City:</span> {b.user.city}</p>
            </div>

            {/* ⚙️ Right: Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-2 md:w-1/6 justify-end w-full">
              <button
                onClick={() => setEditIndex(index)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all font-medium"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(b._id)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🪟 Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 md:p-10 max-w-lg w-full relative shadow-2xl animate-popupGlow">
            <button
              className="absolute top-3 right-3 text-gray-500 text-xl font-bold"
              onClick={() => setSelectedBooking(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedBooking.hotel.name}</h2>
            <img
              src={selectedBooking.roomImage}
              alt="room"
              className="w-full h-48 md:h-60 object-cover rounded mb-4"
            />
            <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
              <p><strong>Room Type:</strong> {selectedBooking.room.roomType}</p>
              <p><strong>Check-In:</strong> {selectedBooking.checkInDate}</p>
              <p><strong>Check-Out:</strong> {selectedBooking.checkOutDate}</p>
              <p><strong>Guests:</strong> {selectedBooking.guests}</p>
              <p><strong>Name:</strong> {selectedBooking.user.name}</p>
              <p><strong>Phone:</strong> {selectedBooking.user.phone}</p>
              <p><strong>Email:</strong> {selectedBooking.user.email}</p>
              <p><strong>City:</strong> {selectedBooking.user.city}</p>
            </div>
          </div>
        </div>
      )}

      {/* ✏️ Update Modal */}
      {editIndex !== null && (
        <HotelReg
          room={bookings[editIndex].room}
          checkIn={bookings[editIndex].checkInDate}
          checkOut={bookings[editIndex].checkOutDate}
          guests={bookings[editIndex].guests}
          userData={bookings[editIndex].user}
          setBookings={handleUpdateBooking}
          closeModal={() => setEditIndex(null)}
          isEditMode={true}
        />
      )}

      {/* ✅ Smooth “Booking Updated” Popup */}
      {showUpdatePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100] animate-fadeIn">
          <div className="bg-white/90 border-4 border-blue-400 rounded-3xl shadow-2xl p-10 text-center w-11/12 md:w-1/2 lg:w-1/3 animate-popupGlow">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-blue-100 border-4 border-blue-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-blue-600 text-4xl font-bold">✓</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Booking Updated!</h2>
            <p className="text-gray-700 text-lg mb-4">Your booking details have been updated successfully ✨</p>
          </div>
        </div>
      )}

      {/* ✨ Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        @keyframes popupGlow {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-popupGlow { animation: popupGlow 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default MyBookings;
