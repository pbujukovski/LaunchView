import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMissionComponent } from './latest-mission.component';

describe('LatestMissionComponent', () => {
  let component: LatestMissionComponent;
  let fixture: ComponentFixture<LatestMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
