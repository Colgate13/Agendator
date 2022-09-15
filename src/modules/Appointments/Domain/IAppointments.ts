import { Price } from './Price';
import { DateAppointments } from './DateAppointments';

export interface IAppointments {
  description: string;
  price: Price;
  date: DateAppointments;
  user_id: string;
}
