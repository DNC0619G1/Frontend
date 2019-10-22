import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../model/Ticket';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly API_URL = 'http://localhost:8080/ticketUser'
  constructor(private http: HttpClient) { }

  getCancelTicket(idUser : number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.API_URL}/cancel/${idUser}`);
  }
  getOrderTicket(idUser : number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.API_URL}/order/${idUser}`);
  }
  getHitoryPoint(idUser : number,startDate : String, endDate: String):Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.API_URL}/pointHistory/${idUser}/${startDate}/${endDate}`);
  }
  
}
