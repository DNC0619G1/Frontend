import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowTime } from '../model/ShowTimes';

@Injectable({
  providedIn: 'root'
})
export class ShowTimesService {
  private API_URL="http://localhost:8080";
  constructor(private http :HttpClient) { }

  getShowTimes(count=10):Observable<ShowTime[]> {
    return this.http.get<ShowTime[]>(this.API_URL+"/getShowTimes");
  }
  getShowTimeById(id:number):Observable<ShowTime>{
    return this.http.get<ShowTime>(`${this.API_URL}/getShowtime/${id}`)
  }
}
