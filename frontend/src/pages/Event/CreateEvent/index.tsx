import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser } from 'react-icons/fi'; 
import api from '../../../services/api';

import './styles.css';

const CreatePoint = () => {
  const user_id = localStorage.getItem('userId') + '';
  const userName = localStorage.getItem('userName');


  const [formData, setFormData] = useState({
    name: '',
    local: '',
    photo: '',
    comment: '',
    user_id: ''
  })

  const history = useHistory();


  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;

    if(event.target.files !== null){
      setFormData({ ...formData, [name]: event.target.files[0] });
    }else{
      setFormData({ ...formData, [name]: value });
    }
  }
  
  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {name, local, photo, comment } = formData;

    const data = new FormData();

    data.append('name', name);
    data.append('local', local);
    data.append('photo', photo);
    data.append('comment', comment);
    data.append('user_id', user_id);

    await api.post('events', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Evento criado!');
    history.push('/list-event');
  }

  return (
    <div id="page-create-event">
      <header>
        <span> <FiUser />{userName} </span>
 
        <Link to="/list-event">
          <FiArrowLeft />
          Voltar para listagem
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Evento</h1>

        <fieldset>

          <div className="field">
            <label htmlFor="name">Nome do Evento</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="local">Local do Evento</label>
              <input 
                type="text"
                name="local"
                id="local"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="comment">Comentário sobre o evento:</label>
              <input 
                type="text"
                name="comment"
                id="comment"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
                <label htmlFor="photo">Foto</label>
                <input 
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleInputChange}
                />
            </div>
          </div>
        </fieldset>

        <button type="submit">
          Cadastrar evento
        </button>
      </form>
    </div>
  )
}

export default CreatePoint;