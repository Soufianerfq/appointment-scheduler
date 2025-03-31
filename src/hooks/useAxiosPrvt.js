import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./usereferesh";
import { useLoginStore } from "../store/loginStore";

const useAxiosPrivate = ()=>{
    const refresh = useRefreshToken()
    const userLogins = useLoginStore((state) => state.logins);

    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    console.log(userLogins)
                    config.headers['Authorization'] = `Bearer ${userLogins?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return ()=>{ //cleanup function
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        };
    },[userLogins, refresh])
 
    return axiosPrivate
}

export default useAxiosPrivate

//this hook sends the accesstoken to the server to allow access to make the front end call 
//on the BE, we can do this by manually pasting the none expired accesstoken on the brearer section in Auth
//this hook also generates a new accesstoken with the refresh() hook when the token expires, and sends to make sure the API call is completed
//you can find this hook used in the users.jsx components to retreve the registered users from the DB