import { ShowTime } from './ShowTimes';
import { User } from './user';

export class Order{
    idOrder :number;
    showTime :ShowTime;
    user : User;
    dateOrderTicket :Date;
}