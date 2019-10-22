import { User } from './user';

export class Ticket{
    idTicket : number;
    nameTicket : string;
    dateOrderTicket : Date;
    priceTicket : number;
    status : string;
    user : User;
    plusPoint : number;
    usePoint : number;
    
}