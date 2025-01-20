import React, { useState } from 'react';
import { LuClipboardList } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup, signOut } from "../firebaseConfig";

const Login: React.FC = () => {

    const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          localStorage.setItem('isUser',"true");
          const {email,displayName,photoURL}=user;
          console.log("env",process.env.REACT_APP_API_KEY)
          let res=await fetch(`${process.env.REACT_APP_API_KEY}/user/create-new-account`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({
              email,
              name:displayName,
              photoURL
            })
          })
          if(res.status===201 || res.status===200){
            res=await res.json();
            localStorage.setItem('user',JSON.stringify(res));
            window.location.href="/"
            // console.log("User created successfully")
          }else{
            console.log("Error creating user",res.statusText)
          }
        //   console.log("User",user)
        //   console.log("Logged in user:", user);
        } catch (error) {
          console.error("Error logging in with Google:", error);
        }
      };

    return (
        <div className=' min-h-screen  bg-[#FFF9F9] flex lg:flex-row flex-col items-center justify-center lg:justify-start  gap-5 lg:px:32 md:px-16 p-8'>

            {/* left side */}
            <div className=' w-full lg:w-1/3 flex flex-col gap-7 items-center justify-center'>
                <div>
                    <div className=' flex items-center gap-1 text-[#7B1984] text-[26.19px] font-bold'>
                        <LuClipboardList />
                        <h1>TaskBuddy</h1>
                    </div>
                    <p className=' text-[12.64px] font-[500]'>Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                </div>
                <button onClick={handleGoogleLogin} className=' bg-[#292929] p-3 px-4 flex items-center justify-center w-full rounded-lg text-white gap-2 cursor-pointer'>
                    <FcGoogle size={24} />
                    Continue with Google</button>
            </div>


            {/* right side */}
            <div className='  hidden lg:flex items-end justify-center flex-col w-2/3 overflow-hidden relative'>
                <div className=' border-[#7B1984] border-[0.75px] rounded-[100%] w-[850px] h-[950px] relative -mt-8 -mr-32 overflow-hidden'>
                    <div className=' border-[#7B1984] absolute top-16 left-16 border-[0.75px] rounded-[100%] w-[650px] h-[750px] flex flex-col gap-6 -mr-32 overflow-hidden'>
                        <div className=' border-[#7B1984] absolute top-16 left-16 border-[0.75px] rounded-[100%] w-[500px] h-[600px] flex flex-col gap-6 -mr-32 overflow-hidden'>

                        </div>
                    </div>
                </div>
                <div className="absolute h-[600px] w-[650px] bg-white p-4 rounded-lg top-10 flex items-center justify-center overflow-hidden -mr-24">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/494f/1405/d39d91697e2b4152019135fa206392a5?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oSBTj7xXjuWtUqX-yY87~y1USTVTmqoUPGu9eOPn0HmXvCKltI3M-rGqCNYEcPXzRJR0MtgspP5dVlWoFXOz-9hAabpIw8wYyUu2IQhk4sqeCqAn4jmC-SDAalZMN9WmEQLRsDHA-6Df3-ALTBvTI86wx2okzg-hCAsyv8SDBvq92~P~KI5nl9Hi4g3JR6ESxgM87ts9UEjK3c4z~yCxAjB9WGqTriiE0C3QZL2gDidAWe8MZ85xKOrHDibYnJlbLLeO~~7rg-Y6o25FEp83daUQfKCbLYLR1SnUA0snRjuIQmyhWooYlFX6MwoyA3SU3NKwYz4QYDnXWCExwggLZg__"
                        alt="logo"
                        className="object-contain h-full w-full "
                    />
                </div>
            </div>
        </div>
    )
}

export default Login