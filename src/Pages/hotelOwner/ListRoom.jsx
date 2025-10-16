import React, { useEffect, useState } from 'react';
import Title from '../../Components/Title';


const ListRoom = ({ bookings }) => {
  const [localBookings, setLocalBookings] = useState([]);

  // Sync local state with props (AddRoom changes)
  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  return <>
    <div className="animate-fadeIn">
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View all bookings and their completion status."
      />

      <div className="overflow-x-auto rounded border border-gray-300 mt-4 shadow-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left">User Name</th>
              <th className="py-2 px-3 text-left">Room</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Ablebale</th>
            </tr>
          </thead>
          <tbody>
            {localBookings.map((b, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition-all">
                <td className="py-2 px-3">{b.user.name}</td>
                <td className="py-2 px-3">{b.room.roomType}</td>
                <td className="py-2 px-3">${b.totalPrice}</td>
                <td className="py-2 px-3 font-medium">
                  {/* Read-only toggle indicator */}
                  <div
                    className="relative w-10 h-5 rounded-full transition-colors duration-300 cursor-not-allowed"
                    style={{ backgroundColor: b.isPaid ? '#34D399' : '#D1D5DB' }}
                  >
                    <div
                      className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transform transition-transform duration-300"
                      style={{ transform: b.isPaid ? 'translateX(1.25rem)' : 'translateX(0)' }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
            {localBookings.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
    
  </>
};

export default ListRoom;
