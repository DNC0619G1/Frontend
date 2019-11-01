import { ShowTime } from './ShowTimes';
import { User } from './user';

export class Booking{
    idBooking :number;
    showTime :ShowTime;
    user : User;
    bookingDate :Date;
}