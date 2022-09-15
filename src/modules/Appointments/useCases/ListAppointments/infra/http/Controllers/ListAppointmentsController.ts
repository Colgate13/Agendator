import { Response, Request } from 'express';
import { PrismaAppointmentsRepository } from '../../../../../repositories/prisma/AppointmentsRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { ListAppointments } from '../../../ListAppointments';

export default class CreateAppointmentsController {
  public async execute(
    request: Request,
    response: Response,
  ) {
    const listAppointments = new ListAppointments(new PrismaAppointmentsRepository());

    if (!request.user.id) {
      throw new AppError('UserId Dont exist in Token. is required');
    }

    const list = await listAppointments.listAppointmentsByUser(request.user.id);

    if (!list) {
      throw new AppError('Invalid For List appointments', 400);
    }

    return response.status(200).json(list);
  }
}
