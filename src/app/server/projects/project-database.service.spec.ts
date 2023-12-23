import { TestBed } from '@angular/core/testing';

import { ProjectDatabaseService } from './project-database.service';

describe('ProjectDatabaseService', () => {
  let service: ProjectDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
