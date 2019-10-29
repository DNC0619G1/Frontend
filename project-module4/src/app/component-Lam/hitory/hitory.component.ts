import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../model/user';
import { UsersService } from '../../service/users.service';
import { TicketService } from '../../service/ticket.service';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../model/Ticket';
import { MemberCard } from '../../model/MemberCard';
import { MemberCardService } from '../../service/member-card.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hitory',
  templateUrl: './hitory.component.html',
  styleUrls: ['./hitory.component.css']
})
export class HitoryComponent implements OnInit {
  [x: string]: any;
  user: User;
  ticket: Ticket[] = [];
  historyForm: FormGroup;
  idUser = +this.route.snapshot.paramMap.get('idUser');
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private usersService: UsersService,
    private memberCardService: MemberCardService,
    private router: Router,
    private _fb: FormBuilder,
    private titleService: Title,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.titleService.setTitle("Lịch Sử Dùng Điểm");
  }
  hitoryForm() {
    this.historyForm = this._fb.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }
  view(startDate: String, endDate: String) {
    // this.ticketService.getHitoryPoint(this.idUser,this.startDate,this.endDate).subscribe();
    this.ticketService.getHitoryPoint(this.idUser, this.startDate, this.endDate).subscribe((data: Ticket[]) => {
      data.forEach(element => {
        this.ticket.push(element);
      })
    });
    console.log(this.historyForm.value);
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
    // this.memberCardService.getMemberCardByUser(idUser).subscribe(next => (this.memberCards = next));
    // this.ticketService.getCancelTicket(idUser).subscribe((data: Ticket[])=>{
    //   data.forEach(element=>{
    //     this.ticket.push(element);
    //   })
    // });
  }

}
