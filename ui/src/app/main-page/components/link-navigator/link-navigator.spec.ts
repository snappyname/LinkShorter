import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkNavigator } from './link-navigator';

describe('LinkNavigator', () => {
  let component: LinkNavigator;
  let fixture: ComponentFixture<LinkNavigator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkNavigator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkNavigator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
