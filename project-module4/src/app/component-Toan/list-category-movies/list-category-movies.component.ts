import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Model/movie';
import { MoviesService } from '../../service/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-category-movies',
  templateUrl: './list-category-movies.component.html',
  styleUrls: ['./list-category-movies.component.css']
})
export class ListCategoryMoviesComponent implements OnInit {

  movies: Movie[] = [];
  p: number = 1;
  category: any;
  categoryMovie: any;

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    } // Dòng này để load lại trang khi URL không đổi
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
    })
    this.movieService.getAllCategoryMovies(this.category).subscribe((data: Movie[]) => {
      data.forEach(element => {
        this.movies.push(element);
      });
      this.categoryMovie=this.movies[0].categoryMovie;
    });
  }

}
