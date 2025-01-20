import React, { useEffect, useState,createContext } from 'react'
import Login from './pages/Login'
import TaskList from './pages/TaskList'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute
import { ToastContainer } from 'react-toastify';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export const UserInformation=createContext({});

interface UserDetails {
  email: string;
  name: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
const App: React.FC = () => {
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('isUser');
    const userInfomation = localStorage.getItem('user');
    
    if (user === null) {
        setIsUser(false); // User is not authenticated
    } else {
        setIsUser(true);
        try {
            const parsedUser = userInfomation ? JSON.parse(userInfomation) : null;
            setUserInfo(parsedUser);
        } catch (error) {
            console.error('Error parsing user information:', error);
        }
    }
}, []);


  const [userInfo,setUserInfo]=useState<UserDetails>()

  if (isUser === null) {
    return <div>Loading...</div>; // Show loading state while checking user status
  }



  return (
    
    <div className="font-urbanist">
      <UserInformation.Provider value={{userInfo,setUserInfo}}>
      <DndProvider backend={HTML5Backend}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={isUser ? "/homePage" : "/login"} />} />
            {/* Protect the /homePage route using PrivateRoute */}
            <Route path="/homePage" element={<PrivateRoute element={<TaskList />} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </UserInformation.Provider>
    </div>
  );
}

export default App;
