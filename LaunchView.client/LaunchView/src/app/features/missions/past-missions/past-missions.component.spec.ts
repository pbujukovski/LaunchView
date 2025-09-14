import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMissionsComponent } from './past-missions.component';

describe('PastMissionsComponent', () => {
  let component: PastMissionsComponent;
  let fixture: ComponentFixture<PastMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastMissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
