import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMissonsComponent } from './upcoming-missons.component';

describe('UpcomingMissonsComponent', () => {
  let component: UpcomingMissonsComponent;
  let fixture: ComponentFixture<UpcomingMissonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingMissonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingMissonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
