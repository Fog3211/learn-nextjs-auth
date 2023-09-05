'use client';

import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'
import { LoginIcons } from '@/config/auth'
import { useState } from 'react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitForm = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
      callbackUrl,
    })
    console.log(res)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
        <div className="mb-8 flex justify-center">
          <Image width={36} height={36} className="w-24" src="/next_auth_logo.png" alt="" />
        </div>
        <div className="flex flex-col text-sm rounded-md">
          <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Username or Email id"
            value={formValues.email}
            onChange={handleChange}
            name='email'
          />
          <input className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500" type="password" placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            name='password'
          />
        </div>
        <button className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit"
          onClick={handleSubmitForm}
        >Sign in</button>
        <div className="mt-5 flex justify-between text-sm text-gray-600">
          <a href="#">Forgot password?</a>
          <a href="#">Sign up</a>
        </div>
        <div className="flex justify-center mt-5 text-sm">
          <p className="text-gray-400">or you can sign with</p>
        </div>
        <div className="mt-5 flex justify-center gap-3">
          {
            LoginIcons.map(item => (
              <Link key={item.name} href='#' onClick={() => signIn('github', { callbackUrl })}>
                <Image
                  width={30}
                  height={30}
                  className="h-7 cursor-pointer scale-105 duration-300"
                  src={item.icon}
                  alt={item.name}
                />
              </Link>
            ))
          }
          <a className="bg-gray-400 h-7 w-7 rounded-3xl text-center grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300 " href="">...</a>
        </div>
        <div className="mt-5 flex text-center text-sm text-gray-400">
          <p>
            This site is protected by Fog3211 <br />
            <a className="underline" href="">Privacy Policy</a>  and <a className="underline" href="">Terms of Service</a>  apply.
          </p>
        </div>
      </div>
    </div>
  )
}
