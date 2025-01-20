import React, { useContext, useRef, useState } from 'react'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SingleTask from './SingleTask';
import { AiOutlineEnter } from "react-icons/ai";
import { MdLibraryAddCheck } from 'react-icons/md';
import { UserInformation } from '../App';
import { toast } from 'react-toastify';
import { useDrop } from 'react-dnd';


interface TaskTableType {
    item: any,
    gettask:()=>void;
}

type SelectedItemsState = {
    items: object[]; // Array of objects
    action: string;  // Global action property
  };
interface todoDetailsType {
    title: string,
    dueDate: string | Date,
    status: string,
    category: string,
    addedBy: string,
}

const TaskTable: React.FC<TaskTableType> = ({ item,gettask }) => {

    const [showData, setShowData] = useState<boolean>(true)
    const [openAddTask, setOpenAddTask] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [showOptionsCategory, setShowOptionsCategory] = useState<boolean>(false);
    const [showDownOptions, setShowDownOptions] = useState<boolean>(false)

      const userInfo:any=useContext(UserInformation);
    
    const [task, setTask] = useState({
        name: "",
        description:"",
        category: "",
        status: "",
        dueDate: "",
        // attachment: null,
        addedBy: userInfo?.userInfo?._id
      });

    const initialState: SelectedItemsState = {
        items: [],
        action: "",
      };

    const [selectedItems, setSelectedItems] = useState<SelectedItemsState>({
        items: [],
        action: "", // Global action property
      });
    
      const resetState = () => {
        setSelectedItems(initialState);
      };

    const toggleShowData = () => {
        setShowData(!showData)
    }


    const toggleShowOptions = () => {
        setShowOptions((prev) => !prev);
    };


    const toggleShowOptionsCategory = () => {
        setShowOptionsCategory((prev) => !prev);
    };



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
              gettask();
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


    const toggleDOwnOptions = () => {
        setShowDownOptions((prev) =>!prev);
    }

    const handleCheckboxChange = (item: object) => {
        setSelectedItems((prevState) => {
          const isAlreadySelected = prevState.items.includes(item);
    
          if (isAlreadySelected) {
            // Remove the item if it is already selected
            return {
              ...prevState,
              items: prevState.items.filter((selected) => selected !== item),
            };
          } else {
            // Add the item if it is not selected
            return {
              ...prevState,
              items: [...prevState.items, item],
            };
          }
        });
        console.log("Selected",selectedItems)

      };
    
      const addAction = (action: string) => {
        setSelectedItems((prevState) => ({
          ...prevState,
          action, // Update the global action property
        }));

        console.log("Selected",selectedItems)
      };
    

       const hanldeAddTask = async () => {
          if (userInfo) {
           
            let res = await fetch(`${process.env.REACT_APP_API_KEY}/task/create-new-task`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(task)
            })
            const status = res.status;
            res = await res.json();
            if (status == 201) {
              toast.success("Task created successfully")
              setTask({
                name: "",
                description: "",
                category: "Work",
                status: "",
                dueDate: "",
                // attachment: null,
                addedBy: ""
              })
              setOpenAddTask(false)
              window.location.reload()
            } else {
              toast.error("Task creation failed");
            }
          }
        }

    return (
        <div >
            <div className={`${item.color} p-4 mt-3 rounded-tl-md rounded-tr-md`} >
                <div className=' flex justify-between items-center'>
                    <h1 className=' font-bold'>{item.name} ({item.count})</h1>
                    <button onClick={toggleShowData}>{
                        !showData ? (<FaAngleUp />) : (<FaAngleDown />
                        )
                    }</button>
                </div>
            </div>
            {
                showData && (
                    <div className=' bg-[#F1F1F1] '>
                        {
                            item.name === "Todo" && (<>
                                <button className=' uppercase hidden md:flex px-16' onClick={() => {
                                    setOpenAddTask(!openAddTask)
                                }}> + Add Task</button>
                                <hr className=' bg-slate-600 border-2 hidden md:flex w-full mt-3 mb-3' />
                            </>
                            )
                        }

                        {
                            openAddTask && item.name === 'Todo' && (
                                <div className=' hidden md:flex flex-col  gap-2 px-7 w-full'>
                                    <ul className=' flex items-center w-full p-4'>
                                        <li className=' font-semibold w-2/4 truncate'>
                                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setTask({ ...task, name: e.target.value })
                                            }} type="text" placeholder='Task Title Name' className=' border-2 border-gray-200 p-2 w-2/4 rounded-md' />
                                        </li>

                                        <li className=' font-semibold flex cursor-pointer gap-1 items-center w-1/4 '>
                                            <div className="flex flex-col">
                                                <span className="mb-1 text-sm font-medium">Due on*</span>
                                                <input
                                                    type="date"
                                                    value={task.dueDate}
                                                    onChange={(e) => setTask({ ...task,dueDate: e.target.value}) }
                                                    className="border text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                                />
                                            </div>
                                        </li>
                                        <li className=' font-semibold w-1/4'>
                                            <div
                                                className="relative font-semibold cursor-pointer flex flex-row gap-3 items-center"

                                            >
                                                <button className=' bg-white rounded-full p-2 w-12' onClick={toggleShowOptions}>+</button>
                                                {
                                                    task.status && (
                                                        <input value={task.status} type="text" name="" className=' border-2 border-gray-200 p-2 w-2/4 rounded-md' id="" />
                                                    )
                                                }
                                                {showOptions && (
                                                    <div className="absolute z-[9999] -left-24 top-4 bg-white shadow-lg px-4 p-3 rounded-md w-32 border border-gray-300">
                                                        <ul className="flex flex-col gap-2">
                                                            <li onClick={() => {
                                                                setTask({ ...task, status: "TO-DO" })
                                                                toggleShowOptions()
                                                            }} className="text-sm flex gap-1 items-center cursor-pointer ">

                                                                TO-DO
                                                            </li>
                                                            <li onClick={() => {
                                                                setTask({ ...task, status: "In-Progress" })
                                                                toggleShowOptions()
                                                            }} className="text-sm flex gap-1 items-center cursor-pointer ">

                                                                In-Progress
                                                            </li>
                                                            <li onClick={() => {
                                                                setTask({ ...task, status: "Completed" })
                                                                toggleShowOptions()
                                                            }} className="text-sm flex gap-1 items-center cursor-pointer ">

                                                                Completed
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                        <li className=' font-semibold w-1/4'>
                                            <div
                                                className="relative font-semibold cursor-pointer flex flex-row gap-3 items-center"

                                            >
                                                <button className=' bg-white rounded-full p-2 w-12' onClick={toggleShowOptionsCategory}>+</button>
                                                {
                                                    task.category && (
                                                        <input value={task.category} type="text" name="" className=' border-2 border-gray-200 p-2 w-2/4 rounded-md' id="" />
                                                    )
                                                }
                                                {showOptionsCategory && (
                                                    <div className="absolute z-[9999] -left-24 top-4 bg-white shadow-lg px-4 p-3 rounded-md w-32 border border-gray-300">
                                                        <ul className="flex flex-col gap-2">
                                                            <li onClick={() => {
                                                                setTask({ ...task, category: "Work" })
                                                                toggleShowOptionsCategory()
                                                            }} className="text-sm flex gap-1 items-center cursor-pointer ">

                                                                Work
                                                            </li>
                                                            <li onClick={() => {
                                                                setTask({ ...task, category: "Personal" })
                                                                toggleShowOptionsCategory()
                                                            }} className="text-sm flex gap-1 items-center cursor-pointer ">
                                                                Personal
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    </ul>

                                    <div className=' flex items-center  gap-10 px-4 justify-start'>
                                        <button onClick={hanldeAddTask} className=' bg-[#7B1984] p-2 rounded-md flex items-center justify-center gap-1 text-white'>
                                            Add Task
                                            <AiOutlineEnter />
                                        </button>
                                        <button>Cancel</button>
                                    </div>
                                    <hr className=' bg-slate-600 border-2 w-full mt-3 mb-3' />


                                </div>
                            )
                        }

                        {
                            item.count > 0 ?
                                (<div ref={drop} className=' flex flex-col items-start justify-start h-[250px] p-4 overflow-y-auto'>

                                    {
                                        item.dummy.map((item: any, index: number) => {
                                            // console.log(item.date)

                                            return (
                                                <SingleTask name={item.name} key={index} item={item} setSelectedItems={handleCheckboxChange}/>
                                            )
                                        })
                                    }
                                </div>)
                                :
                                (
                                    <div ref={drop} className=' flex flex-col items-center justify-center h-[300px]'>
                                        <h1 className=' text-[15px]'>No Tasks in {item.name}</h1>
                                    </div>
                                )
                        }
                    </div>
                )

            }
            {
                selectedItems.items.length> 0 && (
                    <div className=' fixed bottom-1 z-[9999] flex items-center justify-center rounded-md w-full text-sm'>
                        <div className=' bg-[#1A1C20] relative p-2 text-white flex items-center gap-3 px-3 rounded-md'>
                            <h1 className=' rounded-lg flex items-center gap-2 p-1 border-2  px-2 text-sm'>{selectedItems.items.length} Tasks selected 
                                <button onClick={resetState}>x</button>
                            </h1>
                            <MdLibraryAddCheck />
                            <div className=' flex items-center gap-2'>
                                <button onClick={toggleDOwnOptions} className=' border-2 rounded-lg p-1 px-2'>Status</button>
                                <button className=' bg-[#E13838] p-1 rounded-lg px-2'>Deleted</button>
                            </div>
                        </div>
                        
                            {showDownOptions && (
                                <div className="absolute z-[9999] left-24 -top-28 bg-white shadow-lg px-4 p-3 rounded-md w-48 border border-gray-300">
                                    <ul className="flex flex-col gap-2">
                                        <li onClick={() => {
                                            addAction("TO-DO")
                                            toggleDOwnOptions()
                                        }} className="text-sm flex gap-1 items-center cursor-pointer ">

                                            TO-DO
                                        </li>
                                        <li onClick={() => {
                                            addAction("In-Progress")
                                            toggleDOwnOptions()
                                        }} className="text-sm flex gap-1 items-center cursor-pointer ">

                                            In-Progress
                                        </li>
                                        <li onClick={() => {
                                            addAction("Completed")
                                            toggleDOwnOptions()
                                        }} className="text-sm flex gap-1 items-center cursor-pointer ">

                                            Completed
                                        </li>
                                    </ul>
                                </div>
                            )}
                        
                    </div>
                )
            }
        </div>
    )
}

export default TaskTable