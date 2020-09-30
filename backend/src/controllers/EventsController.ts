import { Request, Response} from 'express';
import knex from '../database/connection';
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

class EventsController {

    async like(request: Request, response: Response) {
        const { id } = request.params;

        let event = await knex('events').where('id', id).first();

        if (!event){
            return response.status(404).json({ message: 'Evento não encontrado.' });
        }

        await knex('events')
        .where('id', id)
        .update({
            'like': knex.raw('like + 1')
        });

        event = await knex('events').where('id', id).first();

        return response.json(event);
    }

    async dislike(request: Request, response: Response) {
        const { id } = request.params;

        let event = await knex('events').where('id', id).first();

        if (!event){
            return response.status(404).json({ message: 'Evento não encontrado.' });
        }

        await knex('events')
        .where('id', id)
        .update({
            'dislike': knex.raw('dislike + 1')
        });

        event = await knex('events').where('id', id).first();

        return response.json(event);
    }

    async index(request: Request, response: Response) {
        const events = await knex('events')
        .join('users', 'users.id', 'events.user_id')
        .orderBy('created_at', 'desc')
        .select('events.*','users.name as created_by');
  
        return response.json(events);
    }

    async create(request: Request, response: Response) {
    
        let { filename: photo} = request.file
        const [photoName] = photo.split('.')
        const fileName = `${photoName}-${Math.floor(Math.random() * 100)}.jpg`

        await sharp(request.file.path)
        .resize(180)
        .jpeg({ quality: 70})
        .toFile(
          path.resolve(request.file.destination, 
            'resizes', fileName)
        )
        fs.unlinkSync(request.file.path)
        photo = fileName;

        const {
            name,
            local,
            comment,
            user_id,
        } = request.body;
        
        const event = {
            name,
            local,
            photo,
            comment,
            user_id
        };

  
        const trx = await knex.transaction();

        await trx('events').insert(event);
    
        await trx.commit();

        return response.status(200).json('Salvo com sucesso!');
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
    
        const user_id = request.body.user_id;

        const event = await knex("events")
          .where("id", id)
          .select("user_id")
          .first();
    
        if (event.user_id != user_id) {
          return response.status(401).json({ error: "Operação não permitda." });
        }

        await knex("events")
          .where("id", id)
          .delete();
    
        return response.status(204).send();
      }
}

export default EventsController;