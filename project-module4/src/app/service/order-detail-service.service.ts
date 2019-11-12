import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from '../model/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailServiceService {
  private API_URL="http://localhost:8080";
  constructor(private http :HttpClient) { }
  getOrderDetails(count=10):Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.API_URL}/orderdetails`);
  }
  createOrderDetail(orderdetails: Partial<any>): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${this.API_URL}/createorderdetail`,orderdetails);
  }
}
