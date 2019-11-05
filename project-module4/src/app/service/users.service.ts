import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API_URL = 'http://localhost:8080/users'

  constructor(private http: HttpClient) { }
  getAllUsers(count = 10): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(
      map(response => response.filter((post, i) => i < count))
    );
  }
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.API_URL}`, user);
  }
  getUserByIdUser(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/showAndUpdate/${idUser}`);
  }
  updateUser(user: User,idUser: number): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/update/${idUser}`, user);
  }
  updateUserPassword(user: User,idUser: number): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/updatePassword/${idUser}`, user);
  }
  
}
