import { DateAppointments } from './DateAppointments';
import { InvalidDate } from './Errors/InvalidDate';

const dateMocks = [
  'Thu Oct 20 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)',
  'Sat Oct 01 2021 20:10:00 GMT-0300 (Horário Padrão de Brasília)',
];

describe('Test DateAppintments', () => {
  it('should be a create DateAppintments isRight', () => {
    const dateAppointments = DateAppointments.create(dateMocks[0]);

    if (dateAppointments.isLeft()) {
      throw Error('dateAppointments invalid');
    }

    expect(dateAppointments.value).toBeInstanceOf(DateAppointments);
    expect(dateAppointments.value.value).toEqual(new Date(dateMocks[0]));
  });

  it('should be a not create DateAppintments isRight', () => {
    const dateAppointments = DateAppointments.create(dateMocks[1]);

    if (dateAppointments.isRight()) {
      throw Error('dateAppointments valid');
    }

    expect(dateAppointments.value).toBeInstanceOf(InvalidDate);
    expect(dateAppointments.value.message).toEqual('CoreError > This Date is before to date now');
  });
});
