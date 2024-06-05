import { useNavigate} from 'react-router-dom';
import { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import {login} from "../../context/GlobalAction";

function LogIn() {

    const {dispatch, user} = useContext(GlobalContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })
    
      const { email, password } = formData
        
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
        }

        login(dispatch, userData);

        if (user) {

          navigate('/admin-panel');
          
        }

      }

      return (
        <div className="auth-landings">
          <section className='heading'>
            <h1 className="title-auth"> Login </h1>
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
              <div className='form-group center-element'>
                <button className='btn btn-block center-element'>Submit</button>
              </div>
            </form>
          </section>
        </div>
      )
    }
    
    export default LogIn