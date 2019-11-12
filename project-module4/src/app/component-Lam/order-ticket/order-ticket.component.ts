import { Component, OnInit } from '@angular/core';
import { ShowTimesService } from 'src/app/service/show-times.service';
import { ShowTime } from 'src/app/model/ShowTimes';
import { ActivatedRoute,Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from '../../model/user';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.css']
})
export class OrderTicketComponent implements OnInit {
  user: User = new User();
  filmShowMap: Map<String, ShowTime[]>;
  setDate: Date;
  minDate = new Date();
  maxDate:Date=new Date();
  idUser = +this.route.snapshot.paramMap.get('idUser');
  constructor(private router: Router,private usersService: UsersService,private showTimesService: ShowTimesService, private route: ActivatedRoute,private titleService: Title,) {
    this.filmShowMap = new Map();
    this.setDate = new Date();
    this.maxDate = new Date(this.maxDate.setDate(this.maxDate.getDate() - this.maxDate.getDay()+7));
    this.titleService.setTitle("Đặt Vé");
  }
  ngOnInit() {
    const idUser = +this.route.snapshot.paramMap.get('idUser');
    this.usersService.getUserByIdUser(idUser).subscribe(
      next => (this.user = next),
      error => {
        console.log(error);
        this.user = null;
      },
    );
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
