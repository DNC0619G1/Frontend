import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../service/movies.service';
import { Movie } from '../../Model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';


@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  movies: Movie[] = [];
  p: number = 1;
  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    } // Dòng này để load lại trang khi URL không đổi
  }

  ngOnInit() {
    this.searchMovie(this.route.snapshot.params["keyword"]);
  }

  searchMovie(keyword) {
    // this.movieService.searchMoviesByName(keyword).subscribe((data: Movie[]) => {
    //   data.forEach(element => {
    //     this.movies.push(element);
    //   });
    //   console.log(this.movies.length);
    //     this.movieService.searchMoviesByActor(keyword).subscribe((data: Movie[]) => {
    //       data.forEach(element => {
    //         this.movies.push(element);
    //       });
    //         this.movieService.searchMoviesByAuthor(keyword).subscribe((data: Movie[]) => {
    //           data.forEach(element => {
    //             this.movies.push(element);
    //           });
    //           if(this.movies.length == 0){
    //             alert("Không tìm thấy phim theo yêu cầu");
    //           }
    //         });
    //     });
    // });
    if (keyword == "") {
      this.movieService.getAllMovies().subscribe((data: Movie[]) => {
        data.forEach(element => {
          this.movies.push(element);
        });
      });
    } else {
      this.movieService.getSearchMovies(keyword).subscribe((data: Movie[]) => {
        data.forEach(element => {
          this.movies.push(element);
        });
        console.log(this.movies)
        if (this.movies.length == 0) {
          alert("Không tìm thấy phim theo yêu cầu");
        }
      });
    }
  }
}
