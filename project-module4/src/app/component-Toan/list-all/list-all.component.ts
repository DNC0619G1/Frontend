import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {

  movies: Movie[] = [];
  p: number = 1;
  keyword: any;
  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe((data: Movie[]) => {
      data.forEach(element => {
        this.movies.push(element);
      });
    });
  }
}
