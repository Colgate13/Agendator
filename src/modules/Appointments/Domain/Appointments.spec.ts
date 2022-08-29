import { DateAppointments } from './DateAppointments';
import { Price } from './Price';
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
const value = Price.create(80.66);

describe('Test Appointments (Value, DateAppointments)', () => {
  it('should be a create Appointments isRight with passing id', () => {
    if (dateAppointments.isLeft()) {
      throw Error('dateAppointments invalid');
    }

    if (value.isLeft()) {
      console.log();
      throw Error(`value invalid ${value.value.message}`);
    }

    const appointments = Appointments.create({
      date: dateAppointments.value,
      price: value.value,
      description: 'Corta cabelo gabriel',
      user_id: 'asd-asdasd123'
    }, 'idididi');

    if (appointments.isLeft()) {
      throw Error('appointments don`t create');
    }

    expect(appointments.value).toBeInstanceOf(Appointments);
    expect(appointments.value.description).toEqual('Corta cabelo gabriel');
    expect(appointments.value.date).toEqual(new Date(dateMocks[1]));
    expect(appointments.value.uid).toEqual('idididi');
    expect(appointments.value.price).toEqual(80.66);
    expect(appointments.value.user_id).toEqual('asd-asdasd123');
  });

  it('should be a create Appointments isRight with not passing id', () => {
    if (dateAppointments.isLeft()) {
      throw Error('dateAppointments invalid');
    }

    if (value.isLeft()) {
      throw Error(`value invalid ${value.value.message}`);
    }

    const appointments = Appointments.create({
      date: dateAppointments.value,
      price: value.value,
      description: 'Corta cabelo gabriel',
      user_id: 'asd-asdasd123'
    });

    if (appointments.isLeft()) {
      throw Error('appointments don`t create');
    }

    expect(appointments.value).toBeInstanceOf(Appointments);
    expect(appointments.value.description).toEqual('Corta cabelo gabriel');
    expect(appointments.value.date).toEqual(new Date(dateMocks[1]));
    expect(appointments.value.user_id).toEqual('asd-asdasd123');
  });
});
