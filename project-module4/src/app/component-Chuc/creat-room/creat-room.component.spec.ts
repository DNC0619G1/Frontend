import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatRoomComponent } from './creat-room.component';

describe('CreatRoomComponent', () => {
  let component: CreatRoomComponent;
  let fixture: ComponentFixture<CreatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
