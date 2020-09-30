import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 
import api from '../../../services/api';

import './styles.css';


const CreatePoint = () => {

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

    const {name, email, password } = formData;

    const data = {
      name,
      email,
      password
    }

    await api.post('users', data);

    alert('Usuário criado!');
    history.push('/');
  }

  return (
    <div id="page-create-user">
      <header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de usuário</h1>

        <fieldset>
          <div className="field">
            <label htmlFor="name">Nome do Usuário</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Senha</label>
              <input 
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <button type="submit">
          Cadastrar usuário
        </button>
      </form>
    </div>
  )
}

export default CreatePoint;