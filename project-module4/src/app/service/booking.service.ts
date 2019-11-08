import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../model/Booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private API_URL="http://localhost:8080";
  constructor(private http :HttpClient) { }
  getbookings(count=10):Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.API_URL}/bookings`);
  }
  createbooking(booking: Partial<any>): Observable<Booking> {
    return this.http.post<Booking>(`${this.API_URL}/createbooking`,booking);
  }
  getBookingrByID(id:number):Observable<Booking>{
    return this.http.get<Booking>(`${this.API_URL}/getbooking/${id}`)
  }
}
