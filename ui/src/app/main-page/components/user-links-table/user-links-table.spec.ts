import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLinksTable } from './user-links-table';

describe('UserLinksTable', () => {
  let component: UserLinksTable;
  let fixture: ComponentFixture<UserLinksTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLinksTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLinksTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
