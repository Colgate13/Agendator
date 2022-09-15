import {
  Router, Response, Request,
} from 'express';
import 'express-async-errors';

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import CreateAppointmentsController from '../../../modules/Appointments/useCases/CreateAppointments/infra/http/Controllers/CreateAppointmentsController';
import ListAppointmentsController from '../../../modules/Appointments/useCases/ListAppointments/infra/http/Controllers/ListAppointmentsController';

const users = Router();

const createAppointmentsController = new CreateAppointmentsController();
const listAppointmentsController = new ListAppointmentsController();

users.post('/', ensureAuthenticated, createAppointmentsController.execute);
users.get('/list', ensureAuthenticated, listAppointmentsController.execute);

users.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome to route Appointments',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/docs/appointments',
  });
});

export default users;
