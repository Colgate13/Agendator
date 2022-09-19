import { request, response } from 'express';
import { Authenticator } from '../../../../AuthenticateUser/AuthenticateUser';
import { InMemoryUsersRepository } from '../../../../../repositories/InMemory/UsersRepository';
import { IUsersRepository } from '../../../../../repositories/IUsersRepository';
import { CreateUser } from '../../../createUser';
import CreateUserController from './CreateUserController';
import { User } from '../../../../../Domain/User';
// import { InvalidEmailOrPasswordError } from './Errors/InvalidEmailOrPasswordError';

let usersRepository: IUsersRepository;
let createUser: CreateUser;
let createUserController: CreateUserController;

describe('Test Authenticator UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
    createUserController = new CreateUserController();
  });

  it('should be a auth User isRight', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.debug = () => ({});

    requestCurrent.body = {
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    };

    const user = await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    });

    // eslint-disable-next-line no-promise-executor-return
    const createUserControllerSpy = jest.spyOn(CreateUser.prototype, 'create').mockReturnValue(new Promise((resolve) => resolve({
      isLeft() {
        return false;
      },
      isRight() {
        return true;
      },
      value: user.value as User,
    })));

    // eslint-disable-next-line no-promise-executor-return
    jest.spyOn(Authenticator.prototype, 'authUser').mockReturnValue(new Promise((resolve) => resolve({
      isLeft() {
        return true;
      },
      isRight() {
        return false;
      },
      value: {
        message: 'User logged in successfully',
        statusCode: 200,
        token: '123456',
        name: 'Teste',
        stack: 'Teste',
      },
    })));

    jest.spyOn(response, 'status').mockReturnValue(response);
    jest.spyOn(response, 'json').mockReturnValue(response);

    createUserController.execute(requestCurrent, response);

    expect(createUserControllerSpy).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(201);
  });
});
