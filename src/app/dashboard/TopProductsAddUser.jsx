import React from 'react';
import { GrAdd } from 'react-icons/gr';
import DoughnutChart from '../../components/DoughnutChart';
import { useClicked } from '../../contexts/AddUserClickContext';
import { BsWhatsapp } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa6';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { SlSocialYoutube } from 'react-icons/sl';
import { useAddUser } from '../../contexts/AddUserContext';

const TopProductsAddUser = () => {
  const { setClicked } = useClicked();
  const { user } = useAddUser();
  return (
    <div className='w-full max-h-96 grid grid-cols-2 gap-9 py-4 gri'>
      <div className='border-2 border-[#E0E0E0] drop-shadow-md rounded-[20px] px-8 py-4'>
        <div className='top-products-period flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Top Products</h1>
          <p className='text-[#858585]'>May - June 2021</p>
        </div>
        <div className='doughnut-stats flex gap-8 pb-2 pt-8'>
          <div className='doughnut py-4 h-56 w-56'>
            <DoughnutChart />
          </div>
          <div className='top-product-stats flex flex-col gap-4 items-start'>
            <div>
              <div className='guest flex items-center gap-2 text-lg font-bold'>
                <i className='w-4 h-4 rounded-[50%] bg-[#98D89E]'></i>
                Basic Tees
              </div>
              <p className='text-[#858585] pl-6'>55%</p>
            </div>
            <div>
              <div className='guest flex items-center gap-2 text-lg font-bold'>
                <i className='w-4 h-4 rounded-[50%] bg-[#F6DC7D]'></i>
                Custom Short Pants
              </div>
              <p className='text-[#858585] pl-6'>31%</p>
            </div>
            <div>
              <div className='guest flex items-center gap-2 text-lg font-bold'>
                <i className='w-4 h-4 rounded-[50%] bg-[#E9A0A0]'></i>
                Super Hoodies
              </div>
              <p className='text-[#858585] pl-6'>14%</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-2 border-[#E0E0E0] drop-shadow-md rounded-[20px] p-12'>
        <div
          className={`${
            user.name && 'hidden'
          } flex-col items-center justify-center gap-2 flex w-full h-full`}
        >
          <span
            onClick={(e) => setClicked(true)}
            className='cursor-pointer w-16 h-16 grid place-items-center rounded-[50%] bg-[#F2F2F2]'
          >
            <GrAdd className='text-2xl text-[#858585]' />
          </span>
          <p className='text-xl text-[#858585]'>Add Profile</p>
        </div>
        <div className={`user ${!user.name && 'hidden'}`}>
          <h1 className='text-3xl font-bold mb-4'>{user.name}</h1>
          <div className='items grid grid-cols-2 grid-rows-2 gap-x-20 gap-y-12 px-4 pt-12 pb-8'>
            <div className='flex items-center gap-4'>
              <span className='p-2 rounded-[50%] bg-[#E9F9EB]'>
                <BsWhatsapp className='text-2xl text-[#3CC952]' />
              </span>
              <span className='underline'>{user.phone}</span>
            </div>
            <div className='flex items-center gap-4'>
              <span className='p-2 rounded-[50%] bg-[#FFE9EC]'>
                <FaInstagram className='text-2xl text-[#FF4E64]' />
              </span>
              <span className='underline break-all'>{user.instaLink}</span>
            </div>
            <div className='flex items-center gap-4'>
              <span className='p-2 rounded-[50%] bg-[#EBE6F9]'>
                <RxEnvelopeClosed className='text-2xl text-[#5C33CF]' />
              </span>
              <span className='underline break-all'>{user.email}</span>
            </div>
            <div className='flex items-center gap-4'>
              <span className='p-2 rounded-[50%] bg-[#FFE9EC]'>
                <SlSocialYoutube className='text-2xl text-[#FF4E64]' />
              </span>
              <span className='underline break-all'>{user.youtubeLink}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductsAddUser;
