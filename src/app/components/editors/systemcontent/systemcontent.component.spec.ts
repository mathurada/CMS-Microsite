import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemcontentComponent } from './systemcontent.component';

describe('SystemcontentComponent', () => {
  let component: SystemcontentComponent;
  let fixture: ComponentFixture<SystemcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
