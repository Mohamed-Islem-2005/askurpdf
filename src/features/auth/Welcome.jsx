import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "./authSlice";

import React from 'react'

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const user  = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const tokenAbbr = token ? token.substring(0, 10) : "";
    const handleLogout = async () => {
      try{
        dispatch(LogOut());
        navigate('/login');
      }catch(err){
        return err.message;
      }
    }
  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <p>Your token is: {tokenAbbr}...</p>
      
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Link to="/chat">
          <button style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
            Go to Chat
          </button>
        </Link>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Welcome
