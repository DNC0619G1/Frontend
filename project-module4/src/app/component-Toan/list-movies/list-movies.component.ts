import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { MoviesService } from '../../service/movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  acctionMovies: Movie[]=[];
  loveMovies: Movie[]=[];
  horrorMovies: Movie[]=[];
  socialMovies: Movie[]=[];

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.movieService.getCategoryMovies("hanh dong").subscribe((data:Movie[]) => {
      data.forEach(element => {
        this.acctionMovies.push(element);
      });
    });

    this.movieService.getCategoryMovies("tinh cam").subscribe((data:Movie[]) => {
      data.forEach(element => {
        this.loveMovies.push(element);
      });
    });

    this.movieService.getCategoryMovies("kinh di").subscribe((data:Movie[]) => {
      data.forEach(element => {
        this.horrorMovies.push(element);
      });
    });

    this.movieService.getCategoryMovies("xa hoi").subscribe((data:Movie[]) => {
      data.forEach(element => {
        this.socialMovies.push(element);
      });
    });
  }
}
