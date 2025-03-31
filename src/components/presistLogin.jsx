import { Outlet } from "react-router-dom";
import { useLoginStore } from "../store/loginStore"
import useRefreshToken from "../hooks/usereferesh";
import { useState, useEffect } from "react"


const PresistLogin = () => {
    const userLogins = useLoginStore((state) => state.logins);
    const refresh = useRefreshToken()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        !userLogins?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        //if we dont have an accesstoken, then call verifyRefreshToken, but if we have it, then we can call off loading by changing the state of isLoading to false
    }, [])

    return (
        <>
            {!userLogins.persiste
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}


export default PresistLogin


//Presistant login: check if there is a stored accesstoken in memory each time we try to protected route, if there is none we call the refresh(), itll retreave it and store it in state/custome store
//isLoading state is used to manage actions, first we send the request, if it succeeds, we set isLoading to false, JSX will take us to the protected route we selected
//the user will be logged in until the cookie expires or logs out