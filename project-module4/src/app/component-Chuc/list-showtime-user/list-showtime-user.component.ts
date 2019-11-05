import { Component, OnInit } from '@angular/core';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { Title } from '@angular/platform-browser';
import { ShowTime } from 'src/app/model/ShowTimes';

@Component({
  selector: 'app-list-showtime-user',
  templateUrl: './list-showtime-user.component.html',
  styleUrls: ['./list-showtime-user.component.css']
})
export class ListShowtimeUserComponent implements OnInit {
  mapShowTime: Map<String, ShowTime[]>;
  setDate: Date;
  minDate = new Date();
  maxDate:Date=new Date();
  constructor(private showTimesService: ShowTimesService, private titleService: Title) {
    this.titleService.setTitle("Lịch Chiếu Phim");
    this.setDate = new Date();
    this.maxDate = new Date(this.maxDate.setDate(this.maxDate.getDate() - this.maxDate.getDay()+7));
  }

  ngOnInit() {
    this.showTimesService.getMapShowTimes().subscribe((data: Map<String, ShowTime[]>) => {
      this.mapShowTime = data
    });
  }
  
  isSameDay(start: Date, end: Date): boolean {
    return end == start;
  }

  isContainFilmAsDay(showTimes: ShowTime[], day: Date): boolean {
    let hasFilm = false;
    showTimes.forEach(showTime => {
      if (showTime.showDate == day) {
        hasFilm = true;
      }
    });
    return hasFilm;
  }
}
