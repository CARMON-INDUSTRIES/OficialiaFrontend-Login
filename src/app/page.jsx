"use client"
import React from 'react';
import {BsGithub, BsLinkedin} from 'react-icons/bs'
import {AiFillTwitterCircle} from 'react-icons/ai'
import {IoLogoDiscord} from 'react-icons/io5'


export const SignIn = () => {
  
  return (
    <div className='grid sm:grid-cols-2 grid-cols-1 auto-rows-[100vh] bg-stone-50'>
      <div
        className='login-left hidden bg-[#691B31] py-10 px-8 lg:px-16 sm:flex flex-col'
      >
        <h1 className='text-white text-1xl font-bold'>Presidencia municipal Tula de Allende</h1>
        <h1 className='text-white text-5xl font-bold my-auto ml-20 lg:ml-32'>BIENVENIDO</h1>
        <div className="socials ml-8 lg:ml-24">
        <ul className='right list-none flex items-center gap-6'>
        <li><a href="#"><BsGithub className='text-4xl text-slate-50'/></a></li>
        <li><a href="#"><BsLinkedin className='text-4xl text-slate-50'/></a></li>
        <li><a href="#"><AiFillTwitterCircle className='text-4xl text-slate-50'/></a></li>
        <li><a href="#"><IoLogoDiscord className='text-4xl text-slate-50'/></a></li>
        </ul>
        </div>
      </div>
      <div className="right flex flex-col justify-center items-center relative">
        <h1 className='top-8 left-8 absolute text-3xl font-bold sm:hidden'>BIENVENIDO</h1>
          <div className='lg:w-[26.5rem] w-80 flex flex-col gap-4 '>
          <div className='text-center sm :text-left'>
            <h1 className='text-4xl font-bold'>Inicio de sesión</h1>
            <p className='py-3'>Ingresa a tu cuenta</p>
          </div>
         
          <form action="" className='bg-white rounded-[20px] p-8 flex flex-col gap-5 lg:border-none border border-[#e6ebf4]'>
            <div className="email flex flex-col gap-3 items-start">
              <label htmlFor="Email">USUARIO</label>
              <input type="email" placeholder='Enter email' className='w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]'/>
            </div>
            <div className="password flex flex-col gap-3 items-start">
              <label htmlFor="Password">CONTRASEÑA</label>
              <input type="password" placeholder='Password' className='w-full px-4 py-2 rounded-lg border-none outline-none bg-[#EAEAEA]'/>
            </div>
            <p><a href="#" className='text-[#346BD4]'>Forgot password?</a></p>
            <button className='bg-[#4285F4] text-white rounded-[10px] py-2 '>Sign In</button>
          </form>
          <p className='text-[#858585] lg:mt-4 mt-2 w-full text-center'>Don't have an account? <span className='text-[#346BD4]'><a href="#">Register here</a></span>
          </p>
          </div>
          <ul className='right list-none flex items-center gap-6 bottom-8 absolute sm:hidden'>
          <li><a href="#"><BsGithub className='text-3xl text-gray-800'/></a></li>
          <li><a href="#"><BsLinkedin className='text-3xl text-gray-800'/></a></li>
          <li><a href="#"><AiFillTwitterCircle className='text-3xl text-gray-800'/></a></li>
          <li><a href="#"><IoLogoDiscord className='text-3xl text-gray-800'/></a></li>
        </ul>
      </div>
    </div>
  );
};

export default SignIn;
