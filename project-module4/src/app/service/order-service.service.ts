import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private API_URL="http://localhost:8080";
  constructor(private http :HttpClient) { }
  getorders(count=10):Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/orders`);
  }
  createOrder(order: Partial<any>): Observable<Order> {
    return this.http.post<Order>(`${this.API_URL}/createOrders`,order);
  }
}
