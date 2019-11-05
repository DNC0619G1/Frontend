import { Component, OnInit } from '@angular/core';
import { ChairServiceService } from 'src/app/service/chair-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chair } from 'src/app/model/chair';
import { RoomService } from 'src/app/service/room.service';
import { Room } from 'src/app/model/Room';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-chair',
  templateUrl: './create-chair.component.html',
  styleUrls: ['./create-chair.component.css']
})
export class CreateChairComponent implements OnInit {
  chairForm: FormGroup;
  chairs: Chair[] = [];
  room: Room;
  idRoom: number;
  chair: Chair = new Chair();
  submitted = false;
  rows: String[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]
  constructor(private roomService: RoomService, private chairService: ChairServiceService,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.room = new Room();
    this.idRoom = this.route.snapshot.params['idRoom'];
    this.roomService.getRoomByID(this.idRoom)
      .subscribe(data => {
        this.room = data;
        this.chair.room = this.room;
      })
    this.chairService.getchairs().subscribe((data: Chair[]) => {
      data.forEach(element => {
        if (this.idRoom == element.room.idRoom) {
          this.chairs.push(element)
        }
      })
    });
  }
  get f() { return this.chairForm.controls; }
  createForm() {
    this.chairForm = this.fb.group({
      row: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.rows.length)]),
      column: new FormControl('',[Validators.required, Validators.min(1), Validators.max(20)]),
      position: new FormControl(''),
      detail: new FormControl('1'),
    });
  }

  onSubmit() {
    if (this.chairForm.invalid) {
      return;
    }
    this.submitted = true;
    let isExist = false;
    for (let i = 0; i < this.chairs.length; i++) {
      if ((this.chairs[i].row == this.chairForm.get('row').value) && (this.chairs[i].column == this.chairForm.get('column').value)) {
        isExist = true;
        continue;
      }
    }
    if (!isExist) {
      this.submitted = true;
      this.chair.column = this.chairForm.get('column').value;
      this.chair.row = this.chairForm.get('row').value;
      this.chair.idChairDetail = this.chairForm.get('detail').value;
      this.chair.position = this.rows[this.chair.row - 1] + this.chair.column.toString();
      this.chairService.createChair(this.chair).subscribe(data => {
        this.router.navigate(['/roomdetail', this.idRoom])
      })
    } else {
      window.alert("Hàng và cột đã tồn tại.")
    }
  }
}