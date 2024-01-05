import { TestBed } from '@angular/core/testing';

import { CarpetasDatabaseService } from './carpetas-database.service';

describe('CarpetasDatabaseService', () => {
  let service: CarpetasDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarpetasDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
