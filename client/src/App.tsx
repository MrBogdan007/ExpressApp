import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {
  const [users,setUsers] = useState([])
  const [user, setUser] = useState<any>()
  const [name, setName] = useState('')
  useEffect(() => {
    // const some = async() => {
    //   const fetchUserLimit = await axios.get('http://localhost:8081/users');
    //   const data = fetchUserLimit.data;
    //   console.log(data);
    // }
    // some();
    fetch("http://localhost:8081/users?limit=3&offset=1")
    .then(data => data.json())
    .then(data => 
      setUsers(data))
  })
  
   
    const fetchUser = (id:number) => {
      fetch(`http://localhost:8081/users/${id}`).then(
        data=> {if(data.status >=400) {
          throw Error("Error in fetching")
        } return data.json()}
      ).then(
        data => setUser(data)
      ).catch(e=> {
        console.log(e);
        
      })
    }

  
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetch(`http://localhost:8081/users/`, {
        method: "POST",
        body: JSON.stringify({
          name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data =>data.json()).
      then(data => console.log(data)
      )
    }
  
  return (
    <div className="App">
     {users.length > 0 && (
      <div>
        {
          users.map((user:any) => 
            <li onClick={()=>fetchUser(user.id)}>{user.name}</li>
          )}
          {
            user&& (
              <p>{user.name}</p>
            )
          }
          <form  onSubmit={(e) => onSubmit(e)}>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
      </div>
     )}
    </div>
  );
}

export default App;
