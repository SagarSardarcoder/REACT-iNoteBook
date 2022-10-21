import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: ""}) 
    let navigate = useNavigate ();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password})
        });
       const json = await response.json()
       
        if (json.success){
            // console.log(json.token)
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            props.showAlert("Account registered successfull" , "success")
            navigate("/");
        }
        else{
            props.showAlert("invalid credentiall" , "danger")
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container my-3'>
            <form  onSubmit={handleSubmit}>
            <h2>Create an account to use iNoteBook</h2>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} name="name" id="name" minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup