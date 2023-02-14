import * as React from 'react';
import { logoutUser } from "../../../services/authentication"
import { useNavigate } from 'react-router-dom';

function UserHome(){
    const navigate = useNavigate();

    return(
        <>
            <h1>Welcom, to Home Page</h1>
            <button onClick={()=>{
                logoutUser(navigate)
                console.log('done')
                }}>logout</button>
        </>
    )
}

export default UserHome;
