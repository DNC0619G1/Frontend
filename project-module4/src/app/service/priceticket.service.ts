import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceTicket } from '../model/PriceTicket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceticketService {
  private API_URL="http://localhost:8080";
  constructor(private http :HttpClient) { }
  
  getPriceTickets(count=10):Observable<PriceTicket[]> {
    return this.http.get<PriceTicket[]>(`${this.API_URL}/pricetickets`);
  }
}
