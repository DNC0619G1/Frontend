import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../model/user';
import { UsersService } from '../../service/users.service';
import { TicketService } from '../../service/ticket.service';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../model/Ticket';
// import { element } from 'protractor';

@Component({
  selector: 'app-ticket-order',
  templateUrl: './ticket-order.component.html',
  styleUrls: ['./ticket-order.component.css']
})
export class TicketOrderComponent implements OnInit {

  [x: string]: any;
  user: User;
  ticket : Ticket[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private ticketService : TicketService,
    private usersService: UsersService,
    private router: Router
    ) { }

    
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

      this.ticketService.getOrderTicket(idUser).subscribe((data: Ticket[])=>{
        data.forEach(element=>{
          this.ticket.push(element);
        })
      });
    }

}
