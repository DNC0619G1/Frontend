import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { MemberCard } from '../model/MemberCard'
@Injectable({
  providedIn: 'root'
})
export class MemberCardService {

  private readonly API_URL = 'http://localhost:8080/memberCard'

  constructor(private http: HttpClient) { }

  getMemberCardByUser(idUser : number): Observable<MemberCard>{
    return this.http.get<MemberCard>(`${this.API_URL}/detailUser/${idUser}`);
  }
}
