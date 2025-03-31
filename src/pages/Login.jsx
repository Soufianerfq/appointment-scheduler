import axios from "../api/axios";
import { useLoginStore } from "../store/loginStore";
import { useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

//DISPLAY ERRORS (INCORRECT PASSWORD, INCORRECT USERNAME, FILLIN YOUR LOGINS)

const Login = () => {
  const userLogins = useLoginStore((state) => state.logins);
  const setUsername = useLoginStore((state) => state.setUsername);
  const setPassword = useLoginStore((state) => state.setpassword);
  const setAccessToken = useLoginStore((state) => state.setAccessToken);
  const setRoles = useLoginStore((state) => state.setRoles);
  const setPersiste = useLoginStore((state) => state.setPersiste);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const ROLES_LIST = {
    Admin: 5150,
    Editor: 1984,
    User: 2001,
  };

  const signin = async (e) => {
    e.preventDefault();
    if (userLogins.username === "" || userLogins.password === "") {
      console.log("please add your logins");
    } else {
      try {
        const response = await axios.post(
          "/signin",
          JSON.stringify({
            username: userLogins.username,
            pwd: userLogins.password,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const accesstoken = response.data.accessToken;
        setAccessToken(accesstoken);
        const roles = response.data.roles;
        setRoles(roles);
        console.log(userLogins);
        navigate(from, { replace: true });
      } catch (err) {
        console.error(err);
      }
    }
  
  };

  useEffect(()=>{
    localStorage.setItem("persist", userLogins.persiste)
  }, [userLogins.persiste])
  
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#111827] dark:border-[#374151]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#111827] md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-[#111827] dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-[#374151] dark:border-[#374151] dark:placeholder-[gray-400] dark:text-white dark:focus:ring-[#3b82f6] dark:focus:border-[#3b82f6]"
                  placeholder="Mr.Banana"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-[#111827] dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-[#d1d5db] text-[#111827] rounded-lg focus:ring-[#3b82f6] focus:border-[#3b82f6] block w-full p-2.5 dark:bg-[#374151] dark:border-[#374151] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#3b82f6] dark:focus:border-[#3b82f6]"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-[#d1d5db] rounded bg-[#f9fafb] focus:ring-3 focus:ring-[#93c5fd] dark:bg-[#374151] dark:border-[#374151] dark:focus:ring-[#2563eb] dark:ring-offset-[#1f2937]"
                      required=""
                      onChange={()=> setPersiste(!userLogins.persiste)}
                      checked = {userLogins.persiste}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-[#6b7280] dark:text-[#d1d5db]"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-[#3b82f6] hover:underline dark:text-[#3b82f6]"
                >
                  Forgot password?
                </a>
              </div>
              <button
                className="w-full text-white bg-[#3b82f6] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#3b82f6] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]"
                onClick={(e) => signin(e)}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-[gray-400]">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-[#3b82f6] hover:underline dark:text-[#3b82f6]"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
