import React, { useEffect, useState } from 'react'
import ListViewHeader from '../components/ListViewHeader'
import Filter from '../components/Filter'
import NamingList from '../components/NamingList'
import TaskTable from '../components/TaskTableList'
import { dummyforCompleted, dummyforInProgress, dummyforTODO } from '../dummyData'
import TaskTableBoard from '../components/TaskTableBoard'

import { useDrop } from 'react-dnd'

interface UserDetails {
    email: string;
    name: string;
    photoURL: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}
const TaskList = () => {

    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);

    const taskType = [
        {
            name: "Todo",
            key: "TO-DO",
            count: todos.length,
            color: 'bg-[#FAC3FF]',
            dummy: todos
        },
        {
            name: "In-Progress",
            key: "In-Progress",
            count: inProgress.length,
            color: 'bg-[#85D9F1]',
            dummy: inProgress
        },
        {
            name: "Completed",
            key: "Completed",
            count: completed.length,
            color: 'bg-[#CEFFCC]',
            dummy: completed
        },
    ]


    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const [allTask, setAllTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('user')
        if (token) {
            setUserDetails(JSON.parse(token))
        }
    }, [])

    const getTask = async () => {
        if (!userDetails) return;
        let res: any = await fetch(`${process.env.REACT_APP_API_KEY}/task/get-all-task/${userDetails._id}`);
        res = await res.json();
        // console.log("Res:", res);
        // setAllTasks(res.data)
        setTodos(res.todo)
        setInProgress(res.inProgress)
        setCompleted(res.completed)
    }

    useEffect(() => {
        if (userDetails) {
            getTask()
        }
    }, [userDetails])

    useEffect(() => {
        getTask()
    }, [setTodos || setCompleted || setCompleted])

    // console.log("All Tasks: ", allTask)

    const [infos, setInfos] = useState({
        filterByDueDate: '',
        filterByCategory: '',
        searchText: '',
    })

    // console.log(userDetails)

    const [boardType, setBoardType] = useState("list")

    const changeBoardType = (value: string) => {
        setBoardType(value)
        setInfos({ ...infos, filterByCategory: '', searchText: '', filterByDueDate: '', })
    }


    const [showDataOnDescending, setShowDataOnDescending] = useState(true);
    
    const toggleDataOnAscending = async () => {
        setShowDataOnDescending(!showDataOnDescending);
        console.log("Current state", showDataOnDescending)
        if (showDataOnDescending) {
            if (!userDetails) return;
            let res: any = await fetch(`${process.env.REACT_APP_API_KEY}/task/get-all-task-desc/${userDetails._id}`);
            res = await res.json();
            setTodos(res.todo)
            setInProgress(res.inProgress)
            setCompleted(res.completed)
        }
        else {
            getTask()
        }
    }

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
    
        // Update the state with the new category
        setInfos(prevInfos => ({
            ...prevInfos,
            filterByCategory: newCategory,
        }));
    
        if (!userDetails) return;
    
        // Use the updated category value directly from the event
        let res: any = await fetch(`${process.env.REACT_APP_API_KEY}/task/get-all-task-by-filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: newCategory, // use the new category directly here
                name: infos.searchText,
                dueDate: infos.filterByDueDate,
                addedBy: userDetails._id,
            }),
        });
    
        res = await res.json();
        console.log("res: ", res);
    
        setTodos(res.todo);
        setInProgress(res.inProgress);
        setCompleted(res.completed);
    };
    

    const handleDueDateChange =async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const newCategory = event.target.value;
    
        // Update the state with the new category
        setInfos(prevInfos => ({
            ...prevInfos,
            filterByDueDate: newCategory,
        }));
    
        if (!userDetails) return;
    
        // Use the updated category value directly from the event
        let res: any = await fetch(`${process.env.REACT_APP_API_KEY}/task/get-all-task-by-filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: infos.filterByCategory, // use the new category directly here
                name: infos.searchText,
                dueDate: newCategory,
                addedBy: userDetails._id,
            }),
        });
    
        res = await res.json();
        console.log("res: ", res);
    
        setTodos(res.todo);
        setInProgress(res.inProgress);
        setCompleted(res.completed);
    };

    const handleDueSearch =async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const newCategory = event.target.value;
    
        // Update the state with the new category
        setInfos(prevInfos => ({
            ...prevInfos,
            searchText: newCategory,
        }));
    
        if (!userDetails) return;
    
        // Use the updated category value directly from the event
        let res: any = await fetch(`${process.env.REACT_APP_API_KEY}/task/get-all-task-by-filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: infos.filterByCategory, // use the new category directly here
                name: newCategory,
                dueDate: infos.filterByDueDate,
                addedBy: userDetails._id,
            }),
        });
    
        res = await res.json();
        console.log("res: ", res);
    
        setTodos(res.todo);
        setInProgress(res.inProgress);
        setCompleted(res.completed);
    };

    return (
        <div className=' min-h-screen bg-white lg:px-16  lg:py-8'>
            <ListViewHeader boardType={boardType} setBoardType={changeBoardType} />
            <Filter handleDueDateChange={handleDueDateChange} handleCategoryChange={handleCategoryChange} handleDueSearch={handleDueSearch}/>
            <hr className=' bg-slate-200 w-full mt-3 mb-3' />
            {boardType === 'list' && <NamingList toggleDataOnAscending={toggleDataOnAscending}

            />}
            {
                boardType === 'list' && (<div className=' flex flex-col gap-6'>
                    {
                        taskType.map((item: any, index: number) => {
                            return (
                                <TaskTable gettask={getTask} item={item} key={index} />
                            )
                        })
                    }
                </div>)
            }
            {
                boardType === 'board' && (<div className=' grid grid-cols-3 w-full gap-10'>
                    {
                        taskType.map((item: any, index: number) => {
                            return (
                                <TaskTableBoard item={item} key={index} />
                            )
                        })
                    }
                </div>)
            }
        </div>
    )
}

export default TaskList