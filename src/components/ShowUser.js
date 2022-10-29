import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const ShowUser = () => {
    const [users, setUsers] = useState([]);



    useEffect(() => {
        fetch('https://module-64.vercel.app/datas')
        .then(res => res.json())
        .then(user => setUsers(user))
        .catch(error => console.log(error.message))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const user = {name, email};
        form.reset();

        fetch('https://module-64.vercel.app/datas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            const newUser = [...users, data];
            console.log(data);
            setUsers(newUser);
        })
        .catch(err => console.log(err.message))

    };
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder='Enter your name' /> <br/>
            <input type="text" name='email' placeholder='Enter email address' /> <br/>
            <input type="submit" value={'Submit'} />
        </form>
        {users.map(({_id,email,name}) => <h3 key={_id}>{name} {email}</h3>)}
    </div>
  )
}

export default ShowUser