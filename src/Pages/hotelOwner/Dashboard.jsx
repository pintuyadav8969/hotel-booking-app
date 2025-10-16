import React from 'react';
import { assets } from '../../assets/assets';
import Title from '../../Components/Title';

const Dashboard = ({ bookings }) => {
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div>
      <Title
        align='left'
        font='outfit'
        title='Dashboard'
        subTitle='Monitor bookings and revenue here.'
      />

      <div className='flex gap-4 my-8'>
        <div className='bg-primary-3 border border-primary/10 rounded flex p-4'>
          <img src={assets.totalBookingIcon} alt="" className='h-10' />
          <div className='ml-4'>
            <p className='text-blue-500'>Total Bookings</p>
            <p>{totalBookings}</p>
          </div>
        </div>
        <div className='bg-primary-3 border border-primary/10 rounded flex p-4'>
          <img src={assets.totalRevenueIcon} alt="" className='h-10' />
          <div className='ml-4'>
            <p className='text-blue-500'>Total Revenue</p>
            <p>${totalRevenue}</p>
          </div>
        </div>
      </div>

      <h2 className='text-xl font-medium mb-3'>Recent Bookings</h2>
      <div className='overflow-x-auto rounded border border-gray-300'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-2 px-3 text-left'>User Name</th>
              <th className='py-2 px-3 text-left'>Room</th>
              <th className='py-2 px-3 text-center'>Amount</th>
              <th className='py-2 px-3 text-center'>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className='border-t'>
                <td className='py-2 px-3'>{b.user.name}</td>
                <td className='py-2 px-3'>{b.room.roomType}</td>
                <td className='py-2 px-3 text-center'>${b.totalPrice}</td>
                <td className={`py-2 px-3 text-center ${b.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                  {b.isPaid ? 'Completed' : 'Pending'}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={4} className='py-4 text-center text-gray-500'>No bookings yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
