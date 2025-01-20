import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { LuPencilLine } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import UpdateCurrentTask from './UpdateCurrentTask'

interface SingleTaskType {
    item: any
}
const SingleTaskBoard: React.FC<SingleTaskType> = ({ item }) => {

    const [showOptions, setShowOptions] = useState<boolean>(false);
  const [openEditModel,setOpenEditModel] = useState<boolean>(false)


  const onClose=()=>{
    setOpenEditModel(!openEditModel)
    setShowOptions(false)
  }


    const toggleShowOptions = () => {
        setShowOptions((prev) => !prev);
    };

    
      const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id:item._id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

      const givenDate = new Date(item.dueDate);

      // Get today's date
      const today = new Date();
  
      // Compare the year, month, and day
      const isToday =
          givenDate.getFullYear() === today.getFullYear() &&
          givenDate.getMonth() === today.getMonth() &&
          givenDate.getDate() === today.getDate();


          const deleteCurrentTask=async()=>{
            toggleShowOptions()
              let res = await fetch(`${process.env.REACT_APP_API_KEY}/task/delete-task/${item._id}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json'
                },
              })
              const status = res.status;
              res = await res.json();
              if (status == 200) {
                toast.success("Task deleted successfully")
                window.location.reload();
              }else{
                toast.error("Failed to delete task")
              }
            }

    return (
        <div ref={drag} className=' bg-white shadow-lg rounded-md p-3 mb-3 flex flex-col gap-5'>
            <div className=' flex justify-between items-center'>
                <h1 className=' text-[16px] font-[700]' style={{
                    textDecoration: item.status === "Completed" ? "line-through" : "none",
                }}>{item.name}</h1>
                <div
                    className="relative font-semibold cursor-pointer"

                >
                    <IoEllipsisHorizontal onClick={toggleShowOptions} />
                    {showOptions && (
                        <div className="absolute z-[9999] -left-24 top-4 bg-white shadow-lg px-4 p-3 rounded-md w-32 border border-gray-300">
                            <ul className="flex flex-col gap-2">
                                <li onClick={onClose} className="text-sm flex gap-1 items-center cursor-pointer ">
                                    <LuPencilLine />
                                    Edit
                                </li>
                                <li onClick={deleteCurrentTask} className="text-sm flex gap-1 items-center cursor-pointer ">
                                    <MdDelete color="red" />
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {
        openEditModel && (
          <UpdateCurrentTask item={item} onClose={onClose} isOpen={openEditModel}/>
        )
      }

            <div className=' flex justify-between items-center'>
                <h1 className=' text-[14px] font-[300] text-slate-400' >{item.category}</h1>
                <h1 className=' text-[14px] font-[300] text-slate-400'>{isToday? "Today" : (item.date)}</h1>

            </div>

        </div>
    )
}

export default SingleTaskBoard