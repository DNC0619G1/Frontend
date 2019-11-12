import { Component, OnInit } from '@angular/core';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { ShowTime } from 'src/app/model/ShowTimes';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.component.html',
  styleUrls: ['./createticket.component.css']
})
export class CreateticketComponent implements OnInit {
  filmShowMap: Map<String, ShowTime[]>;
  setDate: Date;
  minDate = new Date();
  maxDate: Date = new Date();

  constructor(private titleService: Title,private showTimesService: ShowTimesService, private route: ActivatedRoute) {
    this.filmShowMap = new Map();
    this.setDate = new Date();
    this.maxDate = new Date(this.maxDate.setDate(this.maxDate.getDate() - this.maxDate.getDay() + 6));
    console.log(this.setDate.getDay());
    this.titleService.setTitle("mua vé")
  }
  ngOnInit() {
    this.showTimesService.getShowTimes().subscribe((data: ShowTime[]) => {
      data.forEach(filmShow => {
        const nameMovie = filmShow.movie.nameMovie;
        if (this.filmShowMap.get(nameMovie) == null) {
          this.filmShowMap.set(nameMovie, [filmShow]);
        } else {
          this.filmShowMap.get(nameMovie).push(filmShow);
        }
      });
      this.filmShowMap.forEach((value: ShowTime[]) => {
        value.sort((a, b) => a.showTime.timeStart.localeCompare(b.showTime.timeStart));
      })
    });
  }

  isSameDay(start: Date, end: Date): boolean {
    return end == start;
  }

  isContainFilmAsDay(filmShows: ShowTime[], day: Date): boolean {
    let hasFilm = false;
    filmShows.forEach(filmShow => {
      if (filmShow.showDate == day) { hasFilm = true; }
    });
    return hasFilm;
  }
}
