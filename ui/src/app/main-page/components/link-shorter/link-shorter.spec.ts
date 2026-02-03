import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkShorter } from './link-shorter';

describe('LinkShorter', () => {
  let component: LinkShorter;
  let fixture: ComponentFixture<LinkShorter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkShorter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkShorter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
