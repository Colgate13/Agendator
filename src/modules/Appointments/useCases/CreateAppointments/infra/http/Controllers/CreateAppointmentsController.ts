import { Response, Request } from 'express';
import { PrismaAppointmentsRepository } from '../../../../../repositories/prisma/AppointmentsRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { CreateAppointment } from '../../../CreateAppointment';

export default class CreateAppointmentsController {
  public async execute(
    request: Request,
    response: Response,
  ) {
    const createAppointmentService = new CreateAppointment(new PrismaAppointmentsRepository());

    const { body } = request;

    if (!body) {
      throw new AppError('Body is required');
    }
    if (!body.price) {
      throw new AppError('Price is required');
    }
    if (!body.dateAppointments) {
      throw new AppError('dateAppointments is required');
    }
    if (!body.description) {
      throw new AppError('Description is required');
    }
    if (!request.user.id) {
      throw new AppError('UserId Dont exist in Token. is required');
    }

    const appointmentProps = {
      price: body.price,
      dateAppointments: body.dateAppointments,
      description: body.description,
      user_id: request.user.id,
    };

    const appointment = await createAppointmentService.create(appointmentProps);

    if (appointment.isLeft()) {
      throw new AppError(appointment.value.message, 400);
    }

    return response.status(201).json(appointment.value);
  }
}
