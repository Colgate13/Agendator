import { CreateAppointment } from './CreateAppointment';
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';
import { InMemoryAppointmentsRepository } from '../../repositories/InMemory/AppointmentsRepository';
import { Appointments } from '../../Domain/Appointments';

const dateMocks = [
  'Thu Oct 20 2022 00:00:00',
];

let appointmentRepository: IAppointmentsRepository;
let createAppointment: CreateAppointment;

describe('Test UseCase Create Appointments', () => {
  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentsRepository();
    createAppointment = new CreateAppointment(appointmentRepository);
  });

  it('Create appointment useCase', async () => {
    const objToCreate = {
      dateAppointments: dateMocks[0],
      description: 'Corte de cabelo roxo',
      price: 88.66,
      user_id: '132132132',
    };

    const appointment = await createAppointment.create(objToCreate);

    if (appointment.isLeft()) {
      throw new Error('appointment dont create');
    }

    // expect(appointment.value).toBeInstanceOf(Appointments);
    expect(appointment.value.price).toEqual(objToCreate.price);
    expect(appointment.value.description).toEqual(objToCreate.description);
    expect(appointment.value.user_id).toEqual(objToCreate.user_id);
  });
});
