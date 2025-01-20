import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import CreateTaskModal from './CreateNewTask';
import CreateNewTaskSM from './CreateNewTaskSM';

interface FilterType {
    handleCategoryChange: (e: any) => void;
    handleDueDateChange: (e: any) => void;
    handleDueSearch: (e: any) => void;
}

const Filter: React.FC<FilterType> = ({ handleDueDateChange, handleCategoryChange, handleDueSearch }) => {

    const [showAddTaskModel, setShowAddTaskModel] = useState(false);
    const [showAddTaskModelSM, setShowAddTaskModelSM] = useState(false);

    const onClose = () => {
        setShowAddTaskModel(!showAddTaskModel);
    }

    const onCloseSM = () => {
        setShowAddTaskModelSM(!showAddTaskModelSM);
        console.log("Chnaged", showAddTaskModelSM)
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayDate = nextDay.toISOString().split('T')[0];



    return (
        <div className=' flex flex-col lg:flex-row items-center lg:justify-between text-sm mt-4 px-4'>
            <div className=' hidden lg:flex gap-2 items-center'>
                <h1>Filter by: </h1>
                <div className=' flex flex-row gap-2'>
                    <select onChange={handleCategoryChange} name="" id="" className=' rounded-xl p-2 px-2 border-gray-400 border-[1px]'>
                        <option value="">Category</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <select onChange={handleDueDateChange} name="" id="" className=' rounded-xl p-2 px-2 border-gray-400 border-[1px]'>
                        <option value="">Due Date</option>
                        <option value={currentDate}>Today</option>
                        <option value={nextDayDate}>Tomorrow</option>
                    </select>

                </div>
            </div>

            <div className=' hidden lg:flex items-center justify-center gap-5'>
                <div className=' border-2 border-gray-200  p-2 flex gap-2 items-center rounded-2xl'>
                    <CiSearch size={23} />
                    <input onChange={handleDueSearch} type="text" placeholder='Search' className=' border-none outline-none w-full' />
                </div>
                <button onClick={onClose} className=' flex bg-[#7B1984] items-center gap-2 rounded-xl p-3 justify-center px-8 text-white uppercase'>
                    Add Task
                </button>
                {
                    showAddTaskModel && (
                        <CreateTaskModal isOpen={showAddTaskModel} onClose={onClose} />
                    )
                }

            </div>

            <div className=' flex lg:hidden items-end justify-end w-full'>
                <button onClick={onCloseSM} className=' flex bg-[#7B1984] items-center gap-2 rounded-xl p-3 justify-center px-4 text-white uppercase'>
                    Add Task
                </button>
                {
                    showAddTaskModelSM && (
                        <CreateNewTaskSM isOpen={showAddTaskModelSM} onClose={onCloseSM} />
                    )
                }

            </div>

            <div className=' flex lg:hidden items-start justify-start mt-3 w-full'>
                <div className='  lg:hidden gap-2 flex items-center'>
                    <h1>Filter by: </h1>
                    <div className=' flex flex-row gap-2'>
                        <select onChange={handleCategoryChange} name="" id="" className=' rounded-xl p-2 px-2 border-gray-400 border-[1px]'>
                            <option value="">Category</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                        </select>
                        <select onChange={handleDueDateChange} name="" id="" className=' rounded-xl p-2 px-2 border-gray-400 border-[1px]'>
                            <option value="">Due Date</option>
                            <option value={currentDate}>Today</option>
                            <option value={nextDayDate}>Tomorrow</option>
                        </select>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter