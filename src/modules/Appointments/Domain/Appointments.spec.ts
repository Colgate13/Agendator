import { DateAppointments } from './DateAppointments';
import { Value } from './Value';
import { Appointments } from './Appointments';

const dateMocks = [
  "Sat Oct 01 2021 20:10:00 GMT-0300 (Horário Padrão de Brasília)",
  "Thu Oct 20 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
  "Sat Nov 19 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
  "Sat Nov 26 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
  "Thu Jul 14 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
  "Tue Jun 21 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
]

const dateAppointments = DateAppointments.create(dateMocks[1]);
const value = Value.create(80.66);

describe('Test Appointments (Value, DateAppointments)', () => {
  it('should be a create Appointments isRight', () => {
    if (dateAppointments.isLeft()) {
      throw Error('dateAppointments invalid');
    }

    if (value.isLeft()) {
      console.log();
      throw Error(`value invalid ${value.value.message}`);
    }

    const appointments = Appointments.create({
      date: dateAppointments.value,
      valor: value.value,
      description: 'Corta cabelo gabriel',
    });

    if (appointments.isLeft()) {
      throw Error('appointments don`t create');
    }

    expect(appointments.value).toBeInstanceOf(Appointments);
    expect(appointments.value.description).toEqual('Corta cabelo gabriel');
    expect(appointments.value.date).toEqual(new Date(dateMocks[1]));
  });
});
