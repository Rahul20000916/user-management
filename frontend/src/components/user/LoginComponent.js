import React, { useState } from 'react';
import { Link } from "react-router-dom";

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.status === 'ok') {
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    }else{
      alert("USER NOT AVAILABLE OR BLOCKED")
    }
    console.log(data);
  }

  const elements = [];
  for (let k = 1; k <= 1500; k++) {
    elements.push(
      <div
        key={k}
        className="transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#22d3ee]"
        ></div>
    );
  }


  return (
    <body className="body bg-white dark:bg-[#0F172A] overflow-hidden">
      <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 before:via-[#00FF00] before:to-gray-900 before:absolute">
        <div id="myDIV">
          <div className="w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
          <div className="w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4 rounded-lg">
              <div className="w-full flex justify-center text-[#06b6d4] text-xl mb-2 md:mb-5">
                SIGN IN
              </div>
              
              <form onSubmit={loginUser}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs font-medium text-white"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ENTER YOUR EMAIL"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-xs font-medium text-white"
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder="ENTER THE PASSWORD"
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-white text-sm md:text-md">
                  {/* Forgot Password */}
                </div>
                <Link to='/signup' className="text-[#06b6d4] text-sm md:text-md hover:cursor-pointer">SIGN UP</Link>
              </div>
              <button className="mb-4 md:mt-4 w-full text-[#22d3ee] hover:text-[#0F172A] flex justify-center text-sm md:text-xl bg-[#0F172A] hover:bg-[#06b6d4] py-2 rounded-md hover:cursor-pointer">
                <input type="submit" value="LOGIN IN"/>
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-0.5 h-screen items-center justify-center relative">
        {elements}
      </div>
    </body>
  );
}

export default LoginComponent;
