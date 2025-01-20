import React, { ChangeEvent, useContext, useState } from "react";
import { UserInformation } from "../App";
import { toast } from "react-toastify";

interface CreateTaskModelType {
  isOpen: boolean,
  onClose: () => void;
}

const CreateNewTaskSM: React.FC<CreateTaskModelType> = ({ isOpen, onClose }) => {

   const userInfo:any=useContext(UserInformation);

   const [task, setTask] = useState({
     name: "",
     description: "",
     category: "Work",
     status: "",
     dueDate: "",
     // attachment: null,
     addedBy: userInfo?.userInfo?._id
   });

  if (!isOpen) return null;

  const handleInputChange = (field: any, value: any) => {
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const hanldeAddTask = async () => {
      if (userInfo) {
        setTask({
          ...task,
          addedBy: userInfo?.userInfo?._id || ''
        })
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
          onClose()
          window.location.reload()
        } else {
          toast.error("Task creation failed");
        }
      }
    }

  return (
    <div className="fixed inset-0 z-50 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md sm:max-w-lg p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Create Task</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Task title"
          value={task.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
        />

        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
          rows={3}
          maxLength={300}
        ></textarea>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col w-full sm:w-auto">
            <span className="mb-1 text-sm font-medium">Task Category*</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleInputChange("category", "Work")}
                className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${task.category === "Work"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-100"
                  }`}
              >
                Work
              </button>
              <button
                onClick={() => handleInputChange("category", "Personal")}
                className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${task.category === "Personal"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-100"
                  }`}
              >
                Personal
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <span className="mb-1 text-sm font-medium">Due on*</span>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <span className="mb-1 text-sm font-medium">Task Status*</span>
            <select
              value={task.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            >
              <option value="">Choose</option>
              <option value="TO-DO">To Do</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <span className="block mb-1 text-sm font-medium">Attachment</span>
          <label className="block w-full border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer text-sm sm:text-base">
            <input
              type="file"
              onChange={(e: any) =>
                handleInputChange("attachment", e.target.files[0])
              }
              className="hidden"
            />
            Drop your files here or <span className="text-purple-400">Update</span>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="px-4 sm:px-6 py-2 rounded-lg border text-gray-500 text-sm sm:text-base"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={hanldeAddTask}
            className="px-4 sm:px-6 py-2 rounded-lg bg-purple-400 text-white text-sm sm:text-base"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTaskSM;
