import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemenuroleComponent } from './managemenurole.component';

describe('ManagemenuroleComponent', () => {
  let component: ManagemenuroleComponent;
  let fixture: ComponentFixture<ManagemenuroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemenuroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemenuroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
