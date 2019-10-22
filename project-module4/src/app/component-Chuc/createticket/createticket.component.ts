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
  filmShowMap: Map<number, ShowTime[]>;
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
          const id = filmShow.idMovie;
          if (this.filmShowMap.get(id) == null) {
            this.filmShowMap.set(id, [filmShow]);
          } else {
            this.filmShowMap.get(id).push(filmShow);
          }
        });
      });
  }

  isSameDay(start: Date, end: Date): boolean {
    return end == start;
  }

  //  mi coi roi chinh html vs css hi
  isContainFilmAsDay(filmShows: ShowTime[], day: Date): boolean {
    console.log(day)
    let hasFilm = false;
    filmShows.forEach(filmShow => {
      if (filmShow.showDate == day) {
        hasFilm = true;
      }
    });
    return hasFilm;
  }
}
