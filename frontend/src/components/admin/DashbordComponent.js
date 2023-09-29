import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setUserId } from "../../actions/userSlice";
import {useDispatch, useSelector} from "react-redux"



function DashbordComponent() {
    const usertoken = useSelector((store)=>store.user.userId)

    const dispatch = useDispatch()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('http://localhost:5000/admin/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    token
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);  
            } else {
                console.log('Error fetching user profile:', response.statusText);
            }
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admintoken');
        window.location.href = '/admin-login';
    };
    function handleEdit(id){
        dispatch(setUserId(id));
        window.location.href = '/edit-user';
    }
    async function handleBlock(id){
        dispatch(setUserId(id))
        const response = await fetch(`http://localhost:5000/admin/block-user`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${usertoken}`
            }
          });
        if(response){
            window.location.href = '/admin';
        }
    }
    async function handleRemove(id){
        dispatch(setUserId(id))
        const response = await fetch(`http://localhost:5000/admin/delete-user`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${usertoken}`
            }
          });
        if(response){
            window.location.href = '/admin';
        }
    }
    const elements = [];
    for (let k = 1; k <= 1500; k++) {
        elements.push(
            <div
                key={k}
                className="transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#2563eb]"
            ></div>
        );
    }

    return (
        <div className="body bg-white dark:bg-[#0F172A] overflow-hidden">
            <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 before:via-[#00FF00] before:to-gray-900 before:absolute">
                <div id="myDIV">
                    <div className="w-[100vw] h-[100] px-3 sm:px-5 flex items-center justify-center absolute">
                        <div className="w-full sm:w-4/4 lg:3/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4 rounded-lg">
                            <div className="flex flex-row justify-between">
                                <Link to='/add-user' className="text-[#06b6d4] text-sm md:text-md">
                                    ADD USER
                                </Link>
                                <div className="text-[#06b6d4] text-sm md:text-md cursor-pointer" onClick={handleLogout}>
                                    LOGOUT
                                </div>
                            </div>

                            <div className="mb-6 w-full flex justify-center text-[#22d3ee] text-xl mb-4 md:mb-5">
                                - ADMIN DASHBORD -
                            </div>
                            <div className="mb-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="flex justify-center w-full">
                                        <div className="relative flex flex-col items-center">

                                            <div className="flex flex-wrap justify-center gap-4">
                                            {users.map((user) => (
                                                <div className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-140">
                                                    <img
                                                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                                        src={user.image}
                                                    />
                                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                                        <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                            Name : {user.name}
                                                        </h5>
                                                        <h6 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                            Email : {user.email}
                                                            <br />
                                                            DOB : {user.dob}
                                                            <br />
                                                            Gender : {user.gender}
                                                        </h6>
                                                        <div className="md:w-full flex justify-center space-x-4 text-[#22d3ee]  text-sm md:text-xl bg-[#0F172A]  py-2 rounded-md ">
                                                            <button className="remove-button hover:text-[#0F172A] hover:bg-[#06b6d4] hover:cursor-pointer rounded-md" onClick={()=>handleEdit(user._id)}>EDIT</button>
                                                            {user.blocked ? (
                                                                <button className="block-button hover:text-[#0F172A] hover:bg-[#06b6d4] hover:cursor-pointer rounded-md" onClick={()=>handleBlock(user._id)}>UNBLOCK</button>
                                                              ) : (
                                                                <button className="block-button hover:text-[#0F172A] hover:bg-[#06b6d4] hover:cursor-pointer rounded-md" onClick={()=>handleBlock(user._id)}>BLOCK</button>
                                
                                                              )}
                                                            <button className="remove-button hover:text-[#0F172A] hover:bg-[#06b6d4] hover:cursor-pointer rounded-md" onClick={()=>handleRemove(user._id)}>REMOVE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-0.5 h-screen items-center justify-center relative">
                {elements}
            </div>
        </div>
    );
}

export default DashbordComponent;
