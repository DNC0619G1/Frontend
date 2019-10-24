import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from '../Model/promotion';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private readonly API_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.API_URL}/promotion/list`);
  }

  getPromotion(id: number): Observable<Promotion>{
    return this.http.get<Promotion>(`${this.API_URL}/promotion/${id}`)
  }

  deletePromotion(id: number): Observable<any>{
    return this.http.delete(`${this.API_URL}/promotion/delete/${id}`);
  } 

  getAddPromotion(promotion: Partial<Promotion>): Observable<Promotion>{
    return this.http.post<Promotion>(`${this.API_URL}/promotion/add`, promotion);
  }
}
