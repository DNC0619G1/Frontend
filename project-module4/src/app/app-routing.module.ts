import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMoviesComponent } from './component-Toan/list-movies/list-movies.component';
import { DetailMovieComponent } from './component-Toan/detail-movie/detail-movie.component';
import { ListAllComponent } from './component-Toan/list-all/list-all.component';
import { SearchMovieComponent } from './component-Toan/search-movie/search-movie.component';
import { ListCategoryMoviesComponent } from './component-Toan/list-category-movies/list-category-movies.component';
import { ManagementInfoComponent } from './component-Lam/management-info/management-info.component';
import { TicketOrderComponent } from './component-Lam/ticket-order/ticket-order.component';
import { TicketCancelComponent } from './component-Lam/ticket-cancel/ticket-cancel.component';
import { HitoryComponent } from './component-Lam/hitory/hitory.component';
import { CreateticketComponent } from './component-Chuc/createticket/createticket.component';
import { ListChairComponent } from './component-Chuc/list-chair/list-chair.component';
import { ConfirmticketComponent } from './component-Chuc/confirmticket/confirmticket.component';
import { InforTicketComponent } from './component-Chuc/infor-ticket/infor-ticket.component';
import { ListPromotionComponent } from './component-Toan/list-promotion/list-promotion.component';
import { EditPromotionComponent } from './component-Toan/edit-promotion/edit-promotion.component';
import { AddPromotionComponent } from './component-Toan/add-promotion/add-promotion.component';
import { ListRoomComponent } from './component-Chuc/list-room/list-room.component';
import { RommDetailComponent } from './component-Chuc/romm-detail/romm-detail.component';
import { CreatRoomComponent } from './component-Chuc/creat-room/creat-room.component';
import { CreateChairComponent } from './component-Chuc/create-chair/create-chair.component';
import { EditRoomComponent } from './component-Chuc/edit-room/edit-room.component';
import { ChairDetailComponent } from './component-Chuc/chair-detail/chair-detail.component';
import { EditChairComponent } from './component-Chuc/edit-chair/edit-chair.component';
import { ListEmployeeComponent } from './component-Lam/list-employee/list-employee.component';
import { InsertEmployeeComponent } from './component-Lam/insert-employee/insert-employee.component';
import { EditEmployeeComponent } from './component-Lam/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './component-Lam/delete-employee/delete-employee.component';
import { RegisterComponent } from './component-Lam/register/register.component';



const routes: Routes = [
  {path:'', component: ListMoviesComponent},
  {path:'detail/:i', component: DetailMovieComponent},
  {path:'listAll', component: ListAllComponent},
  {path:'search/:keyword', component: SearchMovieComponent},
  {path:'listPromotion', component: ListPromotionComponent},
  {path:'editPromotion/:id', component: EditPromotionComponent},
  {path:'listCategory/:category', component: ListCategoryMoviesComponent},
  {path:'addPromotion', component: AddPromotionComponent},
  {
    path: 'infoUser/:idUser',component :ManagementInfoComponent,
  },
  {
    path: 'infoUser/orderTicket/:idUser',component :TicketOrderComponent
  },
  {
    path: 'infoUser/cancelTicket/:idUser',component :TicketCancelComponent
  },
  { path: "muave", component: CreateticketComponent },
  { path: "chonve/:showtime.idTime", component: ListChairComponent },
  { path: "xacnhanbanve/:time.idTime/:chairListChoise", component: ConfirmticketComponent },
  { path: "thongtinbanve/:time.idTime/:chairListChoise/:user.id/:pointChange", component: InforTicketComponent },
  { path: "rooms", component: ListRoomComponent },
  { path: "roomdetail/:idRoom", component: RommDetailComponent },
  { path: "roomedit/:idRoom", component: EditRoomComponent },
  { path: "newroom", component: CreatRoomComponent },
  { path: "newchair/:idRoom", component: CreateChairComponent },
  { path: "chairdetail/:idRoom/:chair.idChair", component: ChairDetailComponent },
  { path: "editchair/:chair.idChair", component: EditChairComponent },
  {
    path: 'infoUser/history/:idUser',component :HitoryComponent
  },
  {
    path: 'admin/employeeList',component : ListEmployeeComponent
  },
  {
    path: 'admin/employeeAdd',component : InsertEmployeeComponent
  },
  {
    path: 'admin/employeeEdit/:idEmployee', component : EditEmployeeComponent
  },
  {
    path: 'admin/employeeDelete/:idEmployee', component: DeleteEmployeeComponent
  },
  {
    path: 'register', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
