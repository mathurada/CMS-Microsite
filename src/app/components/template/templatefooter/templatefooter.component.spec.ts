import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatefooterComponent } from './templatefooter.component';

describe('TemplatefooterComponent', () => {
  let component: TemplatefooterComponent;
  let fixture: ComponentFixture<TemplatefooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatefooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatefooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
