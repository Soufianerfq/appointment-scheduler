import axios from "../api/axios";
import { useLoginStore } from "../store/loginStore";

const useRefreshToken = ()=>{
    const userLogins = useLoginStore((state) => state.logins);
    const setRoles = useLoginStore((state) => state.setRoles);
    const setAccessToken = useLoginStore((state) => state.setAccessToken);

    const refresh = async ()=>{
        const response = await axios.get("/refresh", {
            withCredentials: true //to send/recieve cookies
        });
        setAccessToken(response.data.accessToken)
        setRoles(response.data.roles)
        console.log(userLogins.accessToken)
        return response.data.accessToken
    };
    return refresh
}
export default useRefreshToken


//this is a hook that handles updating the accesstoken
//on the BE, we created a refresh end point that sends out a new accesstoken eachtime it is called out as long as the refreshtoken is not expired
//this hook takes the response from the endpoint, and stores in our global state along side with the associated roles to that token
//this hook is used for presistant login and to keep access open for as long as the refreshtoken is not expired