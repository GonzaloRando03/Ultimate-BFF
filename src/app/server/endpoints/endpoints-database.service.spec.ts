import { TestBed } from '@angular/core/testing';

import { EndpointsDatabaseService } from './endpoints-database.service';

describe('EndpointsDatabaseService', () => {
  let service: EndpointsDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointsDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
