import { useState, useEffect, useContext } from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './Context/LoginContext';


export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [count, setCount] = useState(0);

  const { token, setToken } = useContext(LoginContext);


  useEffect(() => {
    (localStorage.setItem("token", token));
  }, [token]);




  return (
    <>
      {
        (token != "null" && token != null) ?
          <div>
            <Navbar />
            <SideBar />
          </div>
          : <Login setToken={setToken} />
      }
    </>
  )
}

export default App
