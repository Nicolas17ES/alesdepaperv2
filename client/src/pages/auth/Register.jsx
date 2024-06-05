import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import {register} from "../../context/GlobalAction";

function Register() {

    const {dispatch, user} = useContext(GlobalContext);

    const navigate = useNavigate();

    const [message, setMessage] = useState();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        role: '',
        password: '',
        password2: '',
    });

    const { email, username, role, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      };

      const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setMessage('Passwords do not match')
        } else {
         const userData = {
            email,
            username,
            role,
            password,
         }

        register(dispatch, userData);

        if (user) {
          
          navigate('/admin-panel');
          
        } else {

          setMessage('Cant register user');

        }

      }
    
      
      }


    return (
      <div className="auth-landings">
      <section className='heading'>
        <h1 className="title-auth">
          Register
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              onChange={onChange}
              placeholder='Enter your username'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='role'
              name='role'
              value={role}
              onChange={onChange}
              placeholder='Add role'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </div>
       
    )
}

export default Register