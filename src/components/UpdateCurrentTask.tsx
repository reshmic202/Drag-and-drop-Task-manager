import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserInformation } from "../App";

interface CreateTaskModelType {
  isOpen: boolean,
  onClose: () => void;
  item:any
}

const UpdateCurrentTask: React.FC<CreateTaskModelType> = ({ isOpen, onClose, item }) => {


  const userInfo:any=useContext(UserInformation);


  const [task, setTask] = useState({
    name: item.name,
    description:item.description,
    category: item.category,
    status: item.status,
    dueDate: item.dueDate,
    // attachment: null,
    addedBy: userInfo?.userInfo?._id
  });


  if (!isOpen) return null;

  const handleInputChange = (field: any, value: any) => {
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const hanldeAddTask = async () => {
    if (userInfo) {
      
      let res = await fetch(`${process.env.REACT_APP_API_KEY}/task/edit-task/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const status = res.status;
      res = await res.json();
      if (status == 200) {
        toast.success("Task updated successfully")
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
        toast.error("Task updation failed");
      }
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Task</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Task title"
          value={task.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows={3}
          maxLength={300}
        ></textarea>

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <span className="mb-1 text-sm font-medium">Task Category*</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleInputChange("category", "Work")}
                className={`px-4 py-2 rounded-lg border ${task.category === "Work"
                  ? "bg-purple-700 text-white"
                  : "bg-gray-100"
                  }`}
              >
                Work
              </button>
              <button
                onClick={() => handleInputChange("category", "Personal")}
                className={`px-4 py-2 rounded-lg border ${task.category === "Personal"
                  ? "bg-purple-700 text-white"
                  : "bg-gray-100"
                  }`}
              >
                Personal
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="mb-1 text-sm font-medium">Due on*</span>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-col">
            <span className="mb-1 text-sm font-medium">Task Status*</span>
            <select
              value={task.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Choose</option>
              <option value="TO-DO">TO-DO</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <span className="block mb-1 text-sm font-medium">Attachment</span>
          <label className="block w-full border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer">
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
            className="px-6 py-2 rounded-lg border text-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button onClick={hanldeAddTask} className="px-6 py-2 rounded-lg bg-purple-700 text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCurrentTask;
