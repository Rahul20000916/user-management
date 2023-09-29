import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
 function  EditUserComponent() {
  const token = useSelector((store)=>store.user.userId)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    fetchUserProfile();
  }, [token]);
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/edit-user', {
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
      console.error('Error fetching user profile:', error);
    }
  };
  async function uploadImageToCloudinary() {
    try {
      const imageData = new FormData();
      imageData.append('file', image);
      imageData.append('upload_preset', 'user-profile');
      imageData.append('cloud_name', ''); 
  
      const response = await fetch('https://api.cloudinary.com/v1_1/dkf15ybam/image/upload', {
        method: 'post',
        body: imageData,
      });
  
      const responseData = await response.json();
      console.log('Cloudinary response:', responseData);
  
      return responseData.url;
    } catch (error) {
      console.log('Error uploading image to Cloudinary:', error);
      throw error; 
    }
  }
  
  async function updateUser(event) {
    event.preventDefault();  
    try {
      const imageUrl = await uploadImageToCloudinary();
  
      const response = await fetch('http://localhost:5000/admin/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          name,
          email,
          dob,
          gender,
          image: imageUrl, 
        }),
      });
  
      if (response) {
        alert("UPDATED SUCESSFULLY")
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error('Error updating user:', error);
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
          <div className="w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
            <div className="w-full sm:w-2/3 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4 rounded-lg">
              <div className="flex flex-row justify-between">
                <Link to='/admin'className="text-[#06b6d4] text-sm md:text-md">
                  BACK
                </Link>               
                </div>

              <div className="mb-6 w-full flex justify-center text-[#22d3ee] text-xl mb-4 md:mb-5">
                - EDIT PROFILE -
              </div>
              <br />
              <br />
              <div className="mb-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full">
                  <form onSubmit={updateUser}>
                  <div className="relative flex flex-col items-center">
                      <img
                        src={image}
                        className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
                      />
                        <div class="relative z-0 w-full mb-4 group mt-28">
                        <br/>
                          <input 
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                          onChange={(e)=>setImage(e.target.files[0])}
                          id="file_input" 
                          type="file"
                           />
                        </div>
                        <div class="relative z-0 w-full mb-4 group">
                          <input
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          type="text" 
                          name="floating_password" 
                          id="floating_password" 
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div class="relative z-0 w-full mb-4 group">
                          <input type="email" 
                          name="floating_email" 
                          id="floating_email" 
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-4">
                          <div class="relative z-0 w-full mb-6 group">
                            <input type="date"
                             name="floating_first_name"
                             id="floating_first_name" 
                             value={dob}
                             onChange={(e)=>setDob(e.target.value)}
                             class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of birth</label>
                          </div>
                          <div class="relative z-0 w-full mb-4 group">
                            <input type="text" 
                            name="floating_last_name" 
                            id="floating_last_name" 
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                          </div>
                        </div>

                        <button className="mt-4 md:mt-10 w-full text-[#22d3ee] hover:text-[#0F172A] flex justify-center text-sm md:text-xl bg-[#0F172A] hover:bg-[#06b6d4] py-2 rounded-md hover:cursor-pointer">
                        <input type="submit" value="UPDATE"/>
                      </button>
                        </div>
                        </form>
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

export default EditUserComponent;
