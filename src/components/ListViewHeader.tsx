import React, { useEffect, useState } from 'react'
import { LuClipboardList } from 'react-icons/lu'
import { LiaListSolid } from "react-icons/lia";
import { CiViewBoard, CiLogout } from "react-icons/ci";
import { signOut, auth } from "../firebaseConfig";

// Define the expected structure of userDetails state
interface UserDetails {
    email: string;
    name: string;
    photoURL: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

interface ListViewHeaderType {
    boardType: string,
    setBoardType: (boardType: string) => void,
}

const ListViewHeader: React.FC<ListViewHeaderType> = ({ boardType, setBoardType }) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // Initialize with null

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            const parsedUser = JSON.parse(token); // Parse token and set user details
            setUserDetails(parsedUser);
        }
    }, []);

    // Ensure that userDetails is available before accessing its properties
    const photoURL = userDetails?.photoURL || ''; // Default to an empty string if photoURL is not available

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex-col gap-3 hidden lg:flex w-full">
                <div className="flex items-center gap-1 text-[#2F2F2F] text-[24.19px] font-bold">
                    <LuClipboardList />
                    <h1>TaskBuddy</h1>
                </div>
                <div>
                    <ul className="flex gap-3">
                        <li
                            onClick={() => setBoardType('list')}
                            className={`font-semibold flex ${boardType === 'list' && "border-b-2 w-16 border-black"} items-center gap-2 justify-center cursor-pointer`}
                        >
                            <LiaListSolid className="" />
                            List
                        </li>
                        <li
                            onClick={() => setBoardType('board')}
                            className={`font-semibold flex ${boardType === 'board' && "border-b-2 w-16 border-black"} items-center gap-2 justify-center cursor-pointer`}
                        >
                            <CiViewBoard className="" />
                            Board
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex-col gap-3 hidden lg:flex w-full items-end">
                <div className="flex items-center gap-1">
                    <img src={"https://s3-alpha-sig.figma.com/img/f549/15dc/fd930beee5a3918d920109c2020d3ccb?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cQeCBqEqFTYStovSE~prLxKDuiWqYFyGPJkBcT5Sf0iBUEkD9mUuqLIa-fjAKN04l-LJB6Z26EXz4FZ0UQOi4ecKnHCL~SjLY6l16J9sxA11TfnK28Ram6F5LUAxKb6X5nzMPPl1H7T2P1o5CVM68lWJIfDWsb~xmQo-HPJVIOaTEKxFKS4F7pRtwwHW6ri2km82cAkCagkWqJ00iOJdBK0UxulFM4jzsDkrevQJ3L21BoP97xTW15U8W1OSHbS-YbJ2lkWBJ8WTth~Ot9crTD2cTIAhCOpY9acCJijRV-~KR-N~hvUJPsknZaCrPPb00rx2bdi-5nWvBvsfr-NctA__"} alt="User" className="h-10 w-10 rounded-full object-cover cursor-pointer" />
                    <p className="font-bold text-gray-500">{userDetails?.name || 'User'}</p>
                </div>
                <button
                    onClick={async () => {
                        localStorage.clear();
                        await signOut(auth);
                        window.location.href = '/';
                    }}
                    className="bg-[#eedddd] rounded-md p-2 px-3 border[1px] flex items-center gap-2"
                >
                    <CiLogout />
                    Logout
                </button>
            </div>

            <div className="flex lg:hidden items-center bg-[#FAEEFC] p-2 px-3 gap-1 text-[#2F2F2F] text-[16px] w-full justify-between rounded-md font-bold">
                <h1>TaskBuddy</h1>
                <img
                    src="https://s3-alpha-sig.figma.com/img/f549/15dc/fd930beee5a3918d920109c2020d3ccb?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cQeCBqEqFTYStovSE~prLxKDuiWqYFyGPJkBcT5Sf0iBUEkD9mUuqLIa-fjAKN04l-LJB6Z26EXz4FZ0UQOi4ecKnHCL~SjLY6l16J9sxA11TfnK28Ram6F5LUAxKb6X5nzMPPl1H7T2P1o5CVM68lWJIfDWsb~xmQo-HPJVIOaTEKxFKS4F7pRtwwHW6ri2km82cAkCagkWqJ00iOJdBK0UxulFM4jzsDkrevQJ3L21BoP97xTW15U8W1OSHbS-YbJ2lkWBJ8WTth~Ot9crTD2cTIAhCOpY9acCJijRV-~KR-N~hvUJPsknZaCrPPb00rx2bdi-5nWvBvsfr-NctA__"
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
            </div>
        </div>
    );
};

export default ListViewHeader;
