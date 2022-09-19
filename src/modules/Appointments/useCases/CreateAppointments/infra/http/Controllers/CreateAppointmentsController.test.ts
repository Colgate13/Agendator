import {
  request, response,
} from 'express';
import CreateAppointmentsController from './CreateAppointmentsController';
import { CreateAppointment } from '../../../CreateAppointment';
import { AppError } from '../../../../../../../shared/Error/AppError';

const dateMocks = [
  'Thu Oct 20 2022 00:00:00',
  'Thu Oct 20 2020 00:00:00',
];

let createAppointmentsController: CreateAppointmentsController;

describe('Test UseCase Create AppointmentsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    createAppointmentsController = new CreateAppointmentsController();
  });

  it('should a Create appointment by Controller', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      date: dateMocks[0],
      price: 100,
      description: 'Teste',
    };

    requestCurrent.user = {
      id: '123456',
    };

    // eslint-disable-next-line no-promise-executor-return
    jest.spyOn(CreateAppointment.prototype, 'create').mockReturnValue(new Promise((resolve) => resolve({
      isLeft() {
        return false;
      },
      isRight() {
        return true;
      },
      value: {
        id: '123456',
        date: dateMocks[0],
        price: 100,
        description: 'Teste',
        user_id: '123456',
        message: 'Appointment created successfully',
        name: 'Teste',
        statusCode: 201,
        stack: 'Teste',
      },
    })));

    jest.spyOn(response, 'status').mockReturnValue(response);
    jest.spyOn(response, 'json').mockReturnValue(response);

    await createAppointmentsController.execute(requestCurrent, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalled();
  });

  it('should a not Create appointment by Controller', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      date: dateMocks[0],
      price: 100,
      description: 'Teste',
    };

    requestCurrent.user = {
      id: '123456',
    };

    // eslint-disable-next-line no-promise-executor-return
    jest.spyOn(CreateAppointment.prototype, 'create').mockReturnValue(new Promise((resolve) => resolve({
      isLeft() {
        return true;
      },
      isRight() {
        return false;
      },
      value: {
        id: '123456',
        date: dateMocks[0],
        price: 100,
        description: 'Teste',
        user_id: '123456',
        message: 'Appointment created successfully',
        name: 'Teste',
        statusCode: 201,
        stack: 'Teste',
      },
    })));

    try {
      await createAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should a not Create appointment by Controller Body Date Invalid', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      price: 100,
      description: 'Teste',
    };

    try {
      await createAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('AppError > date is required');
    }
  });

  it('should a not Create appointment by Controller Body Price Invalid', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      date: dateMocks[0],
      description: 'Teste',
    };

    try {
      await createAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('AppError > Price is required');
    }
  });

  it('should a not Create appointment by Controller Body description Invalid', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      date: dateMocks[0],
      price: 100,
    };

    try {
      await createAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('AppError > Description is required');
    }
  });

  it('should a not Create appointment by Controller Body user.id Invalid', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      date: dateMocks[0],
      price: 100,
      description: 'Teste',
    };

    requestCurrent.user = {};
    try {
      await createAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('AppError > UserId Dont exist in Token. is required');
    }
  });

  it('should a not Create appointment by Controller Body Invalid', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = null;

    try {
      await createAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('AppError > Body is required');
    }
  });
});
