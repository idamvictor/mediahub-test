import axios from "axios"


//Register 
const register = async (userData) =>{
    const response = await axios.post("https://data-be-2.onrender.com/api/v1/users/signup",userData,{
        withCredentials: true
    })
    return response.data
};
//Login
const login = async (userData) =>{
    const response = await axios.post("https://data-be-2.onrender.com/api/v1/users/signin",userData,{
        withCredentials: true
    })
    return response.data
};

//Logout
const logout = async () =>{
    const response = await axios.get("https://data-be-2.onrender.com/api/v1/users/logout")
    return response.data
};

 /*
//Get Update user
const updateUser = async (userData) =>{
    const response = await axios.patch("http://localhost:5000/api/auth/updateUser",userData)
    return response.data
};
//update photo
const updatePhoto = async (userData) =>{
    const response = await axios.patch("http://localhost:5000/api/auth/updatePhoto",userData)
    return response.data
};*/
const authService ={
    register,login,logout
}

export default authService;