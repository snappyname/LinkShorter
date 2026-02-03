import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLink } from './result-link';

describe('ResultLink', () => {
  let component: ResultLink;
  let fixture: ComponentFixture<ResultLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
