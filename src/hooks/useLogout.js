import axios from "../api/axios"
import { useLoginStore } from "../store/loginStore"

const useLogout = ()=>{
      const setUsername = useLoginStore((state) => state.setUsername);
      const setPassword = useLoginStore((state) => state.setpassword);
      const setAccessToken = useLoginStore((state) => state.setAccessToken);
      const setRoles = useLoginStore((state) => state.setRoles);
    
    const logout = async ()=>{
        setAccessToken("");
        setUsername("");
        setPassword("");
        setRoles([]);
        try{
            const response = await axios.get("/logout", {
                withCredentials: true,
            })
        }catch(err){
            console.error(err)
        }
    }
    return logout
}


export default useLogout


//Logout hook makes a call to the logout endpoint, which terminats the refreshtoken cookie and whipes out the users details from the global state