import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chair } from '../model/chair';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChairServiceService {
  private API_URL="http://localhost:8080";
  constructor(private http :HttpClient) { }
  getchairs(count=10):Observable<Chair[]> {
    return this.http.get<Chair[]>(`${this.API_URL}/getchairs`);
  }
  getChairByID(id:number):Observable<Chair>{
    return this.http.get<Chair>(`${this.API_URL}/getchair/${id}`)
  }
}
