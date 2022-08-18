import { Value } from "./Value";
import { DateAppointments } from "./DateAppointments";

export interface IAppointments {
  description: string;
  valor: Value;
  date: DateAppointments
}