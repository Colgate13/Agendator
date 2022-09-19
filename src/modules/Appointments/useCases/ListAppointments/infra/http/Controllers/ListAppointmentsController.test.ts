import {
  request, response,
} from 'express';
import ListAppointmentsController from './ListAppointmentsController';
import { ListAppointments } from '../../../ListAppointments';
import { AppError } from '../../../../../../../shared/Error/AppError';

let listAppointmentsController: ListAppointmentsController;

describe('Test UseCase List AppointmentsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    listAppointmentsController = new ListAppointmentsController();
  });

  it('should a List appointment by Controller', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.user = {
      id: '123',
    };
    // eslint-disable-next-line no-promise-executor-return
    jest.spyOn(ListAppointments.prototype, 'listAppointmentsByUser').mockReturnValue(new Promise((resolve) => resolve({
      isLeft() {
        return false;
      },
      isRight() {
        return true;
      },
      value: [
        {
          id: '931c4a23-2412-4c5b-b1dc-39e9e74d37ef',
          date: '2022-10-20T03:00:00.000Z',
          price: 10,
          description: 'Corte',
          user_id: 'bf3f403b-aeac-4806-aefc-872df14cb143',
        },
      ],
    })));

    jest.spyOn(response, 'status').mockReturnValue(response);
    jest.spyOn(response, 'json').mockReturnValue(response);

    await listAppointmentsController.execute(requestCurrent, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalled();
  });

  it('should a DONT List appointment by Controller user id UNDEFINED', async () => {
    const requestCurrent = Object.create(request);
    requestCurrent.user = {
      id: '',
    };

    // eslint-disable-next-line no-promise-executor-return
    jest.spyOn(ListAppointments.prototype, 'listAppointmentsByUser').mockReturnValue(new Promise((resolve) => resolve({
      isLeft() {
        return false;
      },
      isRight() {
        return true;
      },
      value: [
        {
          id: '931c4a23-2412-4c5b-b1dc-39e9e74d37ef',
          date: '2022-10-20T03:00:00.000Z',
          price: 10,
          description: 'Corte',
          user_id: 'bf3f403b-aeac-4806-aefc-872df14cb143',
        },
      ],
    })));

    try {
      await listAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should a DONT List appointment by Controller ListAppoitnemt Return left', async () => {
    const requestCurrent = request;
    requestCurrent.user = {
      id: '1234578',
    };

    // eslint-disable-next-line no-promise-executor-return
    jest.spyOn(ListAppointments.prototype, 'listAppointmentsByUser').mockReturnValue(new Promise((resolve) => resolve({
      isLeft() {
        return true;
      },
      isRight() {
        return false;
      },
      value: [
        {
          id: '931c4a23-2412-4c5b-b1dc-39e9e74d37ef',
          date: '2022-10-20T03:00:00.000Z',
          price: 10,
          description: 'Corte',
          user_id: 'bf3f403b-aeac-4806-aefc-872df14cb143',
        },
      ],
    })));

    try {
      await listAppointmentsController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
