import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            token
          }),
        });

        if (response) {
          const data = await response.json();
          setName(data.user.name)
          setEmail(data.user.email)
          setDob(data.user.dob)
          setGender(data.user.gender)
          setImage(data.user.image)
        }
      } catch (error) {
        window.location.href = '/login';
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  const handleEdit = () => {
    navigate('/edit');
  };
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
    <body className="body bg-white dark:bg-[#0F172A] overflow-hidden">
      <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 before:via-[#00FF00] before:to-gray-900 before:absolute">
        <div id="myDIV">
          <div className="w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
            <div className="w-full sm:w-2/3 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4 rounded-lg">
              <div className="flex flex-row justify-between">
                <div className="text-[#06b6d4] text-sm md:text-md cursor-pointer" onClick={handleEdit}>
                  EDIT
                </div>
                <div className="text-[#06b6d4] text-sm md:text-md cursor-pointer" onClick={handleLogout}>
                  LOGOUT
                </div>
              </div>

              <div className="mb-6 w-full flex justify-center text-[#22d3ee] text-xl mb-4 md:mb-5">
                - PROFILE -
              </div>
              <br />
              <br />
              <div className="mb-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full">
                    <div className="relative flex flex-col items-center">
                      <img
                        src={image}
                        className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
                      />
                      <form>
                        <div class="relative z-0 w-full mb-6 group mt-28">
                          <input type="text" value={name} name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required readOnly />
                          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input type="email" value={email} name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required readOnly />
                          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                          <div class="relative z-0 w-full mb-6 group">
                            <input type="text" value={dob} name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required readOnly />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of birth</label>
                          </div>
                          <div class="relative z-0 w-full mb-6 group">
                            <input type="text" value={gender} name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required readOnly />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                          </div>
                        </div>
                      </form>
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
    </body>
  );
}

export default ProfileComponent;
