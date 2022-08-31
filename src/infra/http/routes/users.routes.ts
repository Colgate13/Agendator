import {
  Router, Response, Request
} from 'express';
import 'express-async-errors';

import CreateUserController from '../../../modules/User/useCases/CreateUser/infra/http/Controllers/CreateUserController';

const createUserController = new CreateUserController()

const users = Router();

users.post('/', createUserController.execute);

users.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome to route Users',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/docs/users',
  });
});

export default users;
