import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/Model/movie';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {
  movie: Movie;
  i: number;
 
  p1 = false;
  p2 = false;
  p3 = false;

  OnClick1() {
    this.p1 = true;
    this.p2 = false;
    this.p3 = false;
    console.log(this.p1);
  }

  OnClick2() {
    this.p1 = false;
    this.p2 = true;
    this.p3 = false;
  }

  OnClick3() {
    this.p1 = false;
    this.p2 = false;
    this.p3 = true;
  }


  constructor(private titleService: Title,private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("Chi Tiết Phim");
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.i = params['i'];
    })
    this.getMovie(); 
  }

  getMovie(){
    this.movieService.getMovieById(this.i).subscribe(data => {
      this.movie=data;
    })
  } 
}
