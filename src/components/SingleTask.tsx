import React, { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { LuGripVertical, LuPencilLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import UpdateCurrentTask from "./UpdateCurrentTask";
import { toast } from "react-toastify";
import { useDrag } from "react-dnd";

interface TaskTableType {
  item: {
    name: string;
    dueDate: string;
    status: string;
    category: string;
    _id: string;
  };
  name:string
  setSelectedItems: (value:any)=>void;

}

const SingleTask: React.FC<TaskTableType> = ({ item,setSelectedItems,name }) => {
  let date=new Date().toLocaleDateString();

  // console.log("Date",date);


  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item:{id:item._id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const toggleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const [openEditModel,setOpenEditModel] = useState<boolean>(false)

  const onClose=()=>{
    setOpenEditModel(!openEditModel)
    setShowOptions(false)
  }

  const deleteCurrentTask=async()=>{
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

  // console.log(isDragging)

  const givenDate = new Date(item.dueDate);

    // Get today's date
    const today = new Date();

    // Compare the year, month, and day
    const isToday =
        givenDate.getFullYear() === today.getFullYear() &&
        givenDate.getMonth() === today.getMonth() &&
        givenDate.getDate() === today.getDate();

  return (
    <div ref={drag} className=" flex cursor-pointer  flex-col  items-center justify-center w-full">
    <ul className="mb-4 relative flex items-center w-full text-sm">
      {/* Task details */}
      <li className="flex gap-2 w-full md:w-2/4 truncate items-center text-sm">
        <input onChange={(e)=>{
          setSelectedItems(item)
        }} type="checkbox" name="completed" id="completed" />
        <LuGripVertical className="text-slate-400 hidden md:flex" />
        <IoIosCheckmarkCircle
          className={`${
            item.status !== "Completed" ? "text-slate-400" : "text-green-600"
          }`}
        />
        <label
          style={{
            textDecoration: item.status === "Completed" ? "line-through" : "none",
          }}
        >
          {item.name}
        </label>
      </li>

      {/* Task date */}
      <li className="font-semibold hidden md:flex cursor-pointer gap-1 items-center w-1/4">
        {isToday ? "Today":item.dueDate}
      </li>

      {/* Task status */}
      <li className="font-semibold hidden md:flex w-1/4">{item.status}</li>

      {/* Task category and options */}
      <li className="md:flex justify-between hidden w-1/4 items-center">
        <span className="font-semibold">{item.category}</span>
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
                <li onClick={()=>{
                  deleteCurrentTask()
                  setShowOptions(false)
                }} className="text-sm flex gap-1 items-center cursor-pointer ">
                  <MdDelete color="red" />
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </li>
    </ul>
      <hr className=" border-[1px] border-slate-400 w-full"/>

      {
        openEditModel && (
          <UpdateCurrentTask item={item} onClose={onClose} isOpen={openEditModel}/>
        )
      }
    </div>
  );
};

export default SingleTask;
