import { Component, OnInit } from '@angular/core';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { ShowTime } from 'src/app/model/ShowTimes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.component.html',
  styleUrls: ['./createticket.component.css']
})
export class CreateticketComponent implements OnInit {
  filmShowMap: Map<String, ShowTime[]>;
  setDate: Date;
  isExist: Boolean = true;

  constructor(private showTimesService: ShowTimesService, private route: ActivatedRoute) {
    this.filmShowMap = new Map();
    this.setDate = new Date();
  }

  ngOnInit() {
    this.showTimesService.getShowTimes()
      .subscribe((data: ShowTime[]) => {
        data.forEach(filmShow => {
          const nameMovie = filmShow.movie.nameMovie;
          if (this.filmShowMap.get(nameMovie) == null) {
            this.filmShowMap.set(nameMovie, [filmShow]);
          } else {
            this.filmShowMap.get(nameMovie).push(filmShow);
          }
        });
      });
  }

  isSameDay(start: Date, end: Date): boolean {
    return end == start;
  }

  isContainFilmAsDay(filmShows: ShowTime[], day: Date): boolean {
    let hasFilm = false;
    filmShows.forEach(filmShow => {
      if (filmShow.showDate == day) {
        hasFilm = true;
      }
    });
    return hasFilm;
  }
}
