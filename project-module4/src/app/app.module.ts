import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './component-Toan/list-movies/list-movies.component';
import { DetailMovieComponent } from './component-Toan/detail-movie/detail-movie.component';
import { HeaderComponent } from './component-Toan/header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './component-Toan/footer/footer.component';
import { ListAllComponent } from './component-Toan/list-all/list-all.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchMovieComponent } from './component-Toan/search-movie/search-movie.component';
import { ListCategoryMoviesComponent } from './component-Toan/list-category-movies/list-category-movies.component';
import { ManagementInfoComponent } from './component-Lam/management-info/management-info.component';
import { TicketOrderComponent } from './component-Lam/ticket-order/ticket-order.component';
import { TicketCancelComponent } from './component-Lam/ticket-cancel/ticket-cancel.component';
import { HitoryComponent } from './component-Lam/hitory/hitory.component';
import { CreateticketComponent } from './component-Chuc/createticket/createticket.component';
import { ConfirmticketComponent } from './component-Chuc/confirmticket/confirmticket.component';
import { InforTicketComponent } from './component-Chuc/infor-ticket/infor-ticket.component';
import { ListChairComponent } from './component-Chuc/list-chair/list-chair.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ListPromotionComponent } from './component-Toan/list-promotion/list-promotion.component';
import { EditPromotionComponent } from './component-Toan/edit-promotion/edit-promotion.component';
import { DeletePromotionComponent } from './component-Toan/delete-promotion/delete-promotion.component';
import { AddPromotionComponent } from './component-Toan/add-promotion/add-promotion.component';

import { ListRoomComponent } from './component-Chuc/list-room/list-room.component';
import { RommDetailComponent } from './component-Chuc/romm-detail/romm-detail.component';
import { CreatRoomComponent } from './component-Chuc/creat-room/creat-room.component';
import { CreateChairComponent } from './component-Chuc/create-chair/create-chair.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    DetailMovieComponent,
    HeaderComponent,
    FooterComponent,
    ListAllComponent,
    SearchMovieComponent,
    ListCategoryMoviesComponent,
    ManagementInfoComponent,
    TicketOrderComponent,
    TicketCancelComponent,
    HitoryComponent,
    CreateticketComponent,
    ConfirmticketComponent,
    InforTicketComponent,
    ListChairComponent,
    ListPromotionComponent,
    EditPromotionComponent,
    DeletePromotionComponent,
    AddPromotionComponent
    ListRoomComponent,
    RommDetailComponent,
    CreatRoomComponent,
    CreateChairComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
