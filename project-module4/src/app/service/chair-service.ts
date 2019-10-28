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
  getMapChairs(count=10):Observable<Map<number,Chair[]>> {
    return this.http.get<Map<number,Chair[]>>(`${this.API_URL}/getmapchairs`);
  }
  createChair(chair: Partial<Chair>): Observable<Chair> {
    return this.http.post<Chair>(`${this.API_URL}/addchair`,chair);
  }
  deleteChair(id: number): Observable<any>{
    return this.http.delete(`${this.API_URL}/deletechair/${id}`);
  } 

}
