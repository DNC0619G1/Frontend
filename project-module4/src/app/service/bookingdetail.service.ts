import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDetail } from '../model/BookingDetail';

@Injectable({
  providedIn: 'root'
})
export class BookingdetailService {
  private API_URL="http://localhost:8080";
  constructor(private http :HttpClient) { }
  getBookingDetails(count=10):Observable<BookingDetail[]> {
    return this.http.get<BookingDetail[]>(`${this.API_URL}/bookingdetails`);
  }
  createBookingDetail(bookingdetail: Partial<any>): Observable<BookingDetail> {
    return this.http.post<BookingDetail>(`${this.API_URL}/createbookingdetail`,bookingdetail);
  }
}
