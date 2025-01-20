import React, { useContext, useRef, useState } from 'react'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SingleTask from './SingleTask';
import { AiOutlineEnter } from "react-icons/ai";
import SingleTaskBoard from './SingleTaskBoard';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { LuPencilLine } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { UserInformation } from '../App';
import { toast } from 'react-toastify';
import { useDrop } from 'react-dnd';


interface TaskTableType {
    item: any
}
interface todoDetailsType {
    title: string,
    dueDate: string | Date,
    status: string,
    category: string,
    addedBy: string,
}

const TaskTableBoard: React.FC<TaskTableType> = ({ item }) => {

    const [showData, setShowData] = useState<boolean>(true)
    const [openAddTask, setOpenAddTask] = useState<boolean>(true);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [showOptionsCategory, setShowOptionsCategory] = useState<boolean>(false);
    const [todoDetails, setTodoDetails] = useState<todoDetailsType>({
        title: '',
        dueDate: '',
        status: "",
        category: "",
        addedBy: "",
    });

    const toggleShowData = () => {
        setShowData(!showData)
    }


    const toggleShowOptions = () => {
        setShowOptions((prev) => !prev);
    };


    const toggleShowOptionsCategory = () => {
        setShowOptionsCategory((prev) => !prev);
    };

    const handleLabelClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

          const userInfo:any=useContext(UserInformation);
    

    const hanldeUpdateTask = async (id:string,status:string) => {
            console.log("Status",status)
            if (userInfo) {
              
              let res = await fetch(`${process.env.REACT_APP_API_KEY}/task/edit-task/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: status
                })
              })
              const statuscode = res.status;
              res = await res.json();
              if (statuscode == 200) {
                  toast.success("Task updated successfully");
                  setTimeout(() => {
                    window.location.reload();
                }, 1500);
              } else {
                toast.error("Task updation failed");
              }
            }
          }
    
        const [{ isOver }, drop] = useDrop(() => ({
            accept: "task",
            drop: (draggedItem: any) => {
                hanldeUpdateTask(draggedItem.id,item.key)
              },
            collect: (monitor) => ({
              isOver: !!monitor.isOver()
            })
          }))


    return (
        <div ref={drop} className={`bg-[#F1F1F1] p-4 rounded-md ${item.count>0 && "h-[450px]"} overflow-y-scroll`}>
            <h1 className={` p-2 rounded-md ${item.color} font-bold sticky top-1 uppercase w-[150px] mb-3 text-center`}>{item.name}</h1>

            {
                item.count === 0 && (
                    <div className=' flex flex-col items-center justify-center h-[300px]'>
                        <h1 className=' text-[15px]'>No Tasks in {item.name}</h1>
                    </div>
                )
            }

            {
                item.dummy.map((item: any) => {
                    return (
                        <SingleTaskBoard item={item} />
                    )
                })
            }
        </div>
    )
}

export default TaskTableBoard