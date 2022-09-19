import { ListAppointments } from './ListAppointments';
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';
import { InMemoryAppointmentsRepository } from '../../repositories/InMemory/AppointmentsRepository';
import { Appointments } from '../../Domain/Appointments';
import { Price } from '../../Domain/Price';
import { DateAppointments } from '../../Domain/DateAppointments';

let appointmentRepository: IAppointmentsRepository;
let listAppointments: ListAppointments;

const objToCreate = {
  dateAppointments: 'Thu Oct 20 2022 00:00:00',
  description: '111231231espcifi',
  price: 88.66,
  user_id: '132132132',
};

describe('Test UseCase Create Appointments', () => {
  beforeEach(async () => {
    appointmentRepository = new InMemoryAppointmentsRepository();
    listAppointments = new ListAppointments(appointmentRepository);

    const createAppointment = Appointments.create({
      date: DateAppointments.create(objToCreate.dateAppointments).value as DateAppointments,
      description: objToCreate.description,
      price: Price.create(objToCreate.price).value as Price,
      user_id: objToCreate.user_id,
    });

    await appointmentRepository.create(createAppointment.value as Appointments);
  });

  it('List appointments useCase', async () => {
    const appointments = await listAppointments.listAppointmentsByUser(
      objToCreate.user_id,
    );

    if (appointments.isLeft()) {
      throw new Error('Error list appointments ERROR');
    }

    expect(appointments.value[0].price).toEqual(objToCreate.price);
    expect(appointments.value[0].description).toEqual(objToCreate.description);
    expect(appointments.value[0].user_id).toEqual(objToCreate.user_id);
  });
});
