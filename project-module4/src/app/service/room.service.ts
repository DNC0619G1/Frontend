import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private API_URL="http://localhost:8080"

  constructor(private http :HttpClient) { }
  getRooms(count=10):Observable<Room[]> {
    return this.http.get<Room[]>(`${this.API_URL}/rooms`);
  }
  getRoomByID(id:number):Observable<Room>{
    return this.http.get<Room>(`${this.API_URL}/room/${id}`)
  }
}

