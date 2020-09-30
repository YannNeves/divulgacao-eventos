import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiMapPin, FiTrash2, FiUser } from 'react-icons/fi'; 
import { AiFillDislike, AiFillLike } from 'react-icons/ai'; 
import api from '../../../services/api';

import '../ListEvent/styles.css';


interface Event {
  id: number;
  name: string;
  local: string;
  comment: string;
  photo: string;
  like: number;
  dislike: number;
  user_id: number;
}

const CreatePoint = () => {

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const [events, setEvents] = useState<Event[]>([]);
  
  const history = useHistory();

  useEffect(() => {
    api.get('events').then(response => {
      setEvents(response.data);
    });
  }, []);


  
  async function handleDeleteEvent(id: Number) {
    try{
        await api.post(`events/${id}`, {
            'user_id': userId
        });

        setEvents(events.filter(events => events.id !== id));
    } catch (err) {
        alert('Erro ao deletar evento, tente novamente.')
    }
  }

  async function handleLikeEvent(id: Number) {
    try{
        await api.put(`events/like/${id}`);

        api.get('events').then(response => {
          setEvents(response.data);
        });
    } catch (err) {
        alert('Erro ao dar like no evento, tente novamente!')
    }
  }

  async function handleDislikeEvent(id: Number) {
    try{
        await api.put(`events/dislike/${id}`);

        api.get('events').then(response => {
          setEvents(response.data);
        });
    } catch (err) {
        alert('Erro ao dar dislike no evento, tente novamente!')
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
}

  return (
    <div id="page-list-event">
      <header>
        <span> <FiUser />{userName} </span>

        <button onClick={handleLogout} type="button">
          <FiArrowLeft />
          Logout
        </button>
      </header>

      <form>
        <h1>Lista de Eventos</h1>

        <Link to="/create-event">
          <FiArrowRight />
          Cadastrar Novo Evento
        </Link>
    
        <fieldset>

          <ul className="items-grid">
            {events.map(event => (
              <li  
                key={event.id}
              >
          

                <img src={`http://localhost:3333/events/photo/${event.photo}`} alt={event.name}/>
                <h3>{event.comment}</h3>
                <span><FiMapPin />{event.local}</span>
             
           
                  <tr>
                    <td>
                      {event.user_id + "" === userId ? (
                        <button className="threshButton" onClick={() => handleDeleteEvent(event.id)} type="button">
                          <FiTrash2 size={20} color="red" />
                      </button>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleLikeEvent(event.id)} type="button">
                        {event.like}<AiFillLike size={20} color="green" />
                      </button>
                    </td>
                    <td> 
                      <button onClick={() => handleDislikeEvent(event.id)} type="button">
                        {event.dislike}<AiFillDislike size={20} color="red" />
                      </button>
                    </td>
                  </tr>
              </li>
            ))}
          </ul>
        </fieldset>

      </form>
    </div>
  )
}

export default CreatePoint;