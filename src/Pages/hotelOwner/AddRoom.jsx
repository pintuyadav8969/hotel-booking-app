import React, { useState } from "react";
import Title from "../../Components/Title";

const plans = [
  {
    name: "Silver",
    price: "₹ 49,999",
    images: [
      "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
      "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=",
    ],
    facilities: ["Accommodation", "Transportation", "Safety"],
  },
  {
    name: "Gold",
    price: "₹ 99,999",
    images: [
      "https://img.freepik.com/premium-photo/indian-hindu-veg-thali-also-known-as-food-platter-is-complete-lunch-dinner-meal-closeup-selective-focus_466689-9082.jpg?w=2000",
      "https://blog.dineout-cdn.co.in/blog/wp-content/uploads/2018/05/Kolkata-Blog-Banner-1030x538.png",
    ],
    facilities: ["Accommodation", "Transportation", "Safety", "Dining", "Sightseeing"],
  },
  {
    name: "Lux",
    price: "₹ 1,49,999",
    images: [
      "https://images.trvl-media.com/lodging/20000000/19830000/19822700/19822661/d2de78e7.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      "https://hotelxtoronto.com/_novaimg/4906918-1481330_0_0_2200_1200_2200_1200.rc.jpg",
    ],
    facilities: ["Accommodation", "Transportation", "Safety", "Dining", "Sightseeing", "Insurance", "Budgeting"],
  },
];

const AddRoom = ({ bookings, setBookings }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookingIndex, setSelectedBookingIndex] = useState(null);
  const [detailPlanIndex, setDetailPlanIndex] = useState(null);

  const openModal = (bookingIndex) => {
    setSelectedBookingIndex(bookingIndex);
    setDetailPlanIndex(null);
    setModalOpen(true);
  };

  const handleBookNow = (planIndex) => {
    const updated = [...bookings];
    updated[selectedBookingIndex].isPaid = true;
    setBookings(updated);
    localStorage.setItem("userBookings", JSON.stringify(updated));
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <Title
        align="left"
        font="outfit"
        title="Booking Control Panel"
        subTitle="Complete the payment for each booking."
      />

      {/* Dashboard Table */}
      <div className="overflow-x-auto rounded border border-gray-300 mt-4 shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left">User Name</th>
              <th className="py-2 px-3 text-left">Room</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Complete Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition-colors">
                <td className="py-2 px-3">{b.user.name}</td>
                <td className="py-2 px-3">{b.room.roomType}</td>
                <td className="py-2 px-3">{b.totalPrice}</td>
                <td
                  className={`py-2 px-3 font-medium ${
                    b.isPaid ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {b.isPaid ? "Completed" : "Pending"}
                </td>
                <td className="py-2 px-3">
                  {!b.isPaid && (
                    <button
                      onClick={() => openModal(i)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300"
                    >
                      Done Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Full Page Modal */}
     {modalOpen && (
  <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-x-auto p-4">
    <div className="relative w-full max-w-4xl h-full mt-10">
      <div className="bg-white rounded-2xl shadow-2xl p-6 animate-slideDown relative">
        {/* Close button */}
        <button
          onClick={() => setDetailPlanIndex(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ✖
        </button>

        {/* Choose Plan */}
        {detailPlanIndex === null && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center animate-fadeInDown">
              Choose a Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, idx) => {
                let bgGradient = "bg-white";
                if (plan.name === "Silver") bgGradient = "bg-gradient-to-r from-gray-300 to-gray-200";
                else if (plan.name === "Gold") bgGradient = "bg-gradient-to-r from-yellow-400 to-yellow-300";
                else if (plan.name === "Lux") bgGradient = "bg-gradient-to-r from-orange-500 to-orange-400";

                return (
                  <div
                    key={idx}
                    className={`${bgGradient} border rounded-2xl  flex flex-col shadow-4xl hover:shadow-5xl transition-all duration-800 transform hover:scale-105 animate-fadeIn`}
                    style={{ minHeight: "220px" }} 
                  >
                    <h3 className="font-bold text-2xl text-center mb-2">{plan.name}</h3>
                    <p className="text-center font-semibold text-xl mb-3">{plan.price}</p>

                    {/* Description */}
                    <p className="text-gray-800 text-sm text-center mb-4">
                      Enjoy a premium experience with the {plan.name} package including exclusive facilities and comfort for your stay.
                    </p>

                    {/* Facilities */}
                    <ul className="list-disc pl-5 text-gray-700 mb-4 flex-1 space-y-1">
                      {plan.facilities.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <button
                        onClick={() => handleBookNow(idx)}
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-medium hover:scale-105 transform transition-all duration-300 shadow-md"
                      >
                        Book Now
                      </button>
                      <button
                        onClick={() => setDetailPlanIndex(idx)}
                        className="bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
                      >
                        Get Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Get Details Overlay */}
        {detailPlanIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-lg w-full transform scale-95 animate-scaleUp">
              <h3 className="text-2xl font-bold mb-4 text-center">{plans[detailPlanIndex].name} Plan Details</h3>

              <img
                src={plans[detailPlanIndex].images[0]}
                alt={plans[detailPlanIndex].name}
                className="w-full h-56 md:h-64 object-cover rounded-lg shadow-lg mb-4"
              />

              {plans[detailPlanIndex].images.slice(1).length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {plans[detailPlanIndex].images.slice(1).map((img, i) => (
                    <img key={i} src={img} alt={i} className="w-full h-28 md:h-32 object-cover rounded-lg shadow-sm" />
                  ))}
                </div>
              )}

              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                {plans[detailPlanIndex].facilities.map((f, i) => <li key={i}>{f}</li>)}
              </ul>

              <p className="text-gray-600 text-sm text-center mb-4">
                This plan provides all the listed facilities along with premium customer support and special offers during your stay.
              </p>

              <button
                onClick={() => setDetailPlanIndex(null)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

<style jsx>{`
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.4s ease-out; }

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInDown { animation: fadeInDown 0.5s ease-out; }

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slideDown { animation: slideDown 0.4s ease-out; }

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scaleUp { animation: scaleUp 0.5s ease-out forwards; }
`}</style>

    </div>
  );
};

export default AddRoom;
