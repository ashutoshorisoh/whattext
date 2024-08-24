import React, {useState, useEffect} from 'react'


function User() {
  const [loading, setLoading] = useState(true) 
  const [user, setUser] = useState(null);
  
  function cb(){
    (async function fetchUser(){
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const userData= await response.json();
        setLoading(false);
        setUser(userData);
    })()
    
  }
  
  useEffect(cb, []);
  if(loading)
  return (
    <>
    <div>User</div>
    <div>Loading...</div>
    </>
  )
  if(loading==false){
   return(
    <>
    <div>User</div>
    <div>{user.name}</div>
    <div>{user.username}</div>
    <div>{user.email}</div>
    </>
   )
  }
}

export default User