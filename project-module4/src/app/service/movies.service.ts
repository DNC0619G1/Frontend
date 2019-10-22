import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../Model/movie';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly API_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getMovies(count=5): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API_URL}/movie/listMovie`).pipe(
      map(response => response.filter((post, i) => i < count)));
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API_URL}/movie/listMovie`)
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL}/movie/detailMovie/${id}`);
  }

  // searchMoviesByName(keyword: any): Observable<Movie[]>{
  //   return this.http.get<Movie[]>(`${this.API_URL}/movie/searchMovie/${keyword}`);
  // }
  // searchMoviesByActor(keyword: any): Observable<Movie[]>{
  //   return this.http.get<Movie[]>(`${this.API_URL}/movie/searchMovie1/${keyword}`);
  // }

  // searchMoviesByAuthor(keyword: any): Observable<Movie[]>{
  //   return this.http.get<Movie[]>(`${this.API_URL}/movie/searchMovie2/${keyword}`);
  // }

  getSearchMovies(keyword: any): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.API_URL}/movie/searchAll/${keyword}`)
  }

  getCategoryMovies(category: any, count = 5): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.API_URL}/movie/categoryMovie/${category}`).pipe(
      map(response => response.filter((post, i) => i < count)));
  }

  getAllCategoryMovies(category: any): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.API_URL}/movie/categoryMovie/${category}`)
  }
}
