import React from 'react'
import { useUser } from '../Context/UserContext'
import { useShop } from '../Context/ShopContext';
import Login from './Login';

function Profile() {

  const { token } = useShop();
  const { userData } = useUser();


  return (
    <>
      {
        token != "null" ? (<div>
          <div>{userData?.name}</div>
          <div>{userData?.email}</div>
        </div>) : <Login />
      }
    </>
  )
}

export default Profile