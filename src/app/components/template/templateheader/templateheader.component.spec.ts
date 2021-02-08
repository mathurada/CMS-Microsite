import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateheaderComponent } from './templateheader.component';

describe('TemplateheaderComponent', () => {
  let component: TemplateheaderComponent;
  let fixture: ComponentFixture<TemplateheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
