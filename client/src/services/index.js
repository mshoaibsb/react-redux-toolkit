import axiosClient from "./config";

export const login = async (credentials) => {
    console.log(credentials);
    try {
       const {data} = await axiosClient.post('/auth/login', credentials);
       const {accessToken, user} = data;
       
    } catch (error) {
        
    }
    
}












