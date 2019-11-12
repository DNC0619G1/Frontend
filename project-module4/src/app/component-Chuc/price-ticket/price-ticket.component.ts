import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PriceticketService } from 'src/app/service/priceticket.service';
import { PriceTicket } from 'src/app/model/PriceTicket';


@Component({
  selector: 'app-price-ticket',
  templateUrl: './price-ticket.component.html',
  styleUrls: ['./price-ticket.component.css']
})
export class PriceTicketComponent implements OnInit {

  priceTickets:PriceTicket[]=[];
  constructor(private titleService: Title,private priceTicketService :PriceticketService) { 
    this.titleService.setTitle("giá vé")
  }

  ngOnInit() {
    this.priceTicketService.getPriceTickets().subscribe((data: PriceTicket[]) => {
      this.priceTickets=data;
      console.log(this.priceTickets)
    })

  }

}
