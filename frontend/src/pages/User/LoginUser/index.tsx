import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../../services/api';

const Home = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  
  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    try {
      const { email, password } = formData;

      const data = {
        email,
        password
      }

      const response = await api.post('/users/login', data );

      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('userName', response.data.user.name);

      history.push('/list-event');
    }catch (err){
      alert('Falha no login, tente novamente.')
    }
  }

  
  return (
    <div id="page-home">
      <div className="content">
        <main>
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail: </label>
                <input 
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Senha: </label>
                <input 
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit">
              <span>
                <FiLogIn />
              </span>
                <strong>Acessar área de eventos</strong>
            </button>
          </form>
          
          <Link to="/create-user"> 
            <BsFillPersonPlusFill />
            Novo Usuário 
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home;