import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowTime } from '../model/ShowTimes';
import { Movie } from '../Model/movie';

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
  getMapShowTimes(count=10):Observable<Map<String,ShowTime[]>> {
    return this.http.get<Map<String,ShowTime[]>>(this.API_URL+"/getmapshowtimes");
  }
}
