import React, { useState } from 'react'
import { HiChevronUpDown } from "react-icons/hi2";

interface NamingType{
  toggleDataOnAscending:()=>void;
}
const NamingList:React.FC<NamingType> = ({toggleDataOnAscending}) => {

  


  return (
    <div className=' hidden lg:flex items-center text-sm'> 
        <ul className=' flex items-center w-full p-4'>
            <li className=' font-semibold w-2/4 truncate'>Task name</li>
            <li className=' font-semibold flex cursor-pointer gap-1 items-center w-1/4 ' onClick={toggleDataOnAscending}>Due On <HiChevronUpDown />
            </li>
            <li className=' font-semibold w-1/4'>Task Status</li>
            <li className=' font-semibold w-1/4'>Task Category</li>
        </ul>
    </div>
  )
}

export default NamingList