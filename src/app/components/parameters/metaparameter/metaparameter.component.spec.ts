import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaparameterComponent } from './metaparameter.component';

describe('MetaparameterComponent', () => {
  let component: MetaparameterComponent;
  let fixture: ComponentFixture<MetaparameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaparameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaparameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
