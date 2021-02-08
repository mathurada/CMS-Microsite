import { TestBed, inject } from '@angular/core/testing';

import { GlobalVariable } from './globalvariable.service';

describe('GlobalvariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalVariable]
    });
  });

  it('should be created', inject([GlobalVariable], (service: GlobalVariable) => {
    expect(service).toBeTruthy();
  }));
});
