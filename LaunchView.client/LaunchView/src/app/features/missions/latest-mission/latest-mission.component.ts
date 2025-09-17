import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mission } from '../../../core/models/mission.model';
import { MissionService } from '../../../core/services/mission.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MissionDetailsComponent } from '../../../shared/components/mission-details/mission-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-latest-mission',
  imports: [CommonModule, MatProgressSpinnerModule, MissionDetailsComponent],
  templateUrl: './latest-mission.component.html',
  styleUrl: './latest-mission.component.scss'
})
export class LatestMissionComponent implements OnInit, OnDestroy {
 public latestMission: Mission = new Mission();

 public missionSubscription: Subscription = new Subscription();

 public dataArrived: boolean = false;

 constructor(private missionService: MissionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.missionService.getMission<Mission>('mission/latest-mission'); 

    this.missionService.mission$.subscribe({
      next: (mission) => {
        this.latestMission = mission;

        setTimeout(() => {
          this.dataArrived = true;
        }, 1000);
      },
      error: (e) => {
        console.log(e);
        this.dataArrived = true;
        this.onToastShow(e.status + ": " + e.error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.missionSubscription){
      this.missionSubscription.unsubscribe();
    }
  }

  private onToastShow(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000 
    });
  }
}
