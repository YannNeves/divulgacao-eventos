import express from 'express';
import path from 'path';
import UsersController from './controllers/UsersController';
import EventsController from './controllers/EventsController';

const routes = express.Router();
const usersController = new UsersController();
const eventsController = new EventsController();

const uploadConfig = require('./config/upload');
const multer = require('multer');

const upload = multer(uploadConfig)

routes.get('/events', eventsController.index);
routes.post('/events', upload.single('photo'), eventsController.create);
routes.put('/events/like/:id', eventsController.like);
routes.put('/events/dislike/:id', eventsController.dislike);
routes.post('/events/:id', eventsController.delete)
routes.use('/events/photo', express.static(path.resolve(__dirname, '..', 'uploads', 'resizes')));

routes.post('/users/login', usersController.login);
routes.post('/users', usersController.create);


export default routes;