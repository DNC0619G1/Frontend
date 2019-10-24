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
  createRoom(room: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(`${this.API_URL}/rooms`,room);
  }

  // updateRoom(id: number, value: String): Observable<Object> {
  //   return this.http.put(`${this.API_URL}/${id}`, value);
  // }
}
