import React, {useState} from 'react';
import {IoCloseOutline} from 'react-icons/io5'
import { useAddUser } from '../contexts/AddUserContext';
import { useClicked } from '../contexts/AddUserClickContext';

const AddUser = () => {
    const [next, setNext] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [instaLink, setInstaLink] = useState('')
    const [ytLink, setYtLink] = useState('')
    const {user, setUser} = useAddUser()
    const {clicked, setClicked} = useClicked()

const handleClick = (val) => {
  if (val === 'Done' && name && email && phone) {

    setUser({...user, name, email, phone, instaLink, youtubeLink: ytLink})
    setClicked(false)
    console.log(user);
  }
}

  return (
    <div className={`${clicked ? 'grid' : 'hidden'} w-full h-auto backdrop-blur-[0.5px] place-items-center absolute inset-0 bg-[#00000060]`}>
      <div className='add w-[30rem] h-fit drop-shadow-custom bg-slate-50 rounded-xl py-4 flex flex-col'>
        <div className='flex items-center justify-between mb-4 px-6'>
        <h1 className='text-lg font-medium'>Add New Profile</h1>
        <IoCloseOutline onClick={() => setClicked(false)} className='text-2xl text-[#999CA0] hover:text-black cursor-pointer'/>
        </div>
        <hr className='bg-[#00000002]' />
        <div className='content flex flex-col gap-6 p-6 w-full'>
          <div className='grid grid-cols-2 gap-8'>
            <div className={`${!next ? 'border-[#3F84F8]' : 'border-[#D9D9D9]'} basic border-b-4 text-center text-lg font-semibold rounded-sm overflow-hidden py-2`}>Basic</div>
            <div className={`${next ? 'border-[#3F84F8]' : 'border-[#D9D9D9]'} contact border-b-4 text-center text-lg font-semibold rounded-sm overflow-hidden py-2`}>{next ? 'Social' : 'Contact'}</div>
          </div>
          <div className={`${next && 'hidden'} name  flex flex-col gap-2 items-start`}>
            <label htmlFor="Name">Enter Name<sup>*</sup></label>
            <input required onChange={(e) => setName(e.target.value)} type="text" placeholder='Eg: John Doe' className='w-full px-4 py-2 border-2 border-[#F2F2F2] bg-transparent outline-none rounded-md'/>
          </div>
          <div className={`${next && 'hidden'} email flex flex-col gap-2 items-start`}>
            <label htmlFor="Email">Enter Email<sup>*</sup></label>
            <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Eg: John@xyz.com' className='w-full px-4 py-2 border-2 border-[#F2F2F2] bg-transparent outline-none rounded-md'/>
          </div>
          <div className={`${next && 'hidden'} phone flex flex-col gap-2 items-start>`}>
            <label htmlFor="Phone">Enter Phone<sup>*</sup></label>
            <input required onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Eg: 9123456789' className='w-full px-4 py-2 border-2 border-[#F2F2F2] bg-transparent outline-none rounded-md'/>
          </div>   
          <div className={`${!next && 'hidden'} instagram flex flex-col gap-2 items-start`}>
            <label htmlFor="Instagram">Instagram Link <span className='text-[#999CA0]'>(Optional)</span></label>
            <input onChange={(e) => setInstaLink(e.target.value)} type="text" placeholder='Eg. ..instagram.com/username' className='w-full px-4 py-2 border-2 border-[#F2F2F2] bg-transparent outline-none rounded-md'/>
          </div>   
          <div className={`${!next && 'hidden'} youtube flex flex-col gap-2 items-start`}>
            <label htmlFor="Youtube">Youtube Link <span className='text-[#999CA0]'>(Optional)</span></label>
            <input onChange={(e) => setYtLink(e.target.value)} type="text" placeholder='Eg. ..youtebe/username' className='w-full px-4 py-2 border-2 border-[#F2F2F2] bg-transparent outline-none rounded-md'/>
          </div>   
        </div>
          <hr className='bg-[#00000002]' />
          <div className="btns flex items-center gap-4 justify-end pt-6 pb-4 px-6">
          <button onClick={() => setNext(false)} className={`${!next && 'hidden'} px-4 py-2 border border-[#999CA0] rounded-xl w-20`}>Back</button> 
          <button value={next ? 'Done' : 'Next'} onClick={(e) => {setNext(true), handleClick(e.target.value)}} className='px-4 py-2 text-white bg-[#3F84F8] rounded-xl w-20'>{next ? 'Done' : 'Next'}</button> 
          </div>
      </div>
    </div>
  );
};

export default AddUser;
