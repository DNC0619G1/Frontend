import { Order } from './Order';
import { Chair } from './chair';

export class OrderDetail{
    idOrderDetail :number;
    order :Order;
    chair : Chair;
    priceChair :number;
}