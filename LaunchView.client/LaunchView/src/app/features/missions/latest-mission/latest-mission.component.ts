import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mission } from '../../../core/models/mission.model';
import { MissionService } from '../../../core/services/mission.service';
import { Subscription } from 'rxjs';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDivider } from "@angular/material/divider";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-latest-mission',
  imports: [CommonModule, MatCard, MatDivider, MatDivider, MatProgressSpinnerModule],
  templateUrl: './latest-mission.component.html',
  styleUrl: './latest-mission.component.scss'
})
export class LatestMissionComponent implements OnInit, OnDestroy {
 public latestMission: Mission = new Mission();

 public missionSubscription: Subscription = new Subscription();

 public isLoading: boolean = true;

  constructor(private missionService: MissionService) { }

  ngOnInit() {
    this.missionService.getMission<Mission>('mission/latest-mission'); 

    this.missionService.mission$.subscribe(mission => {
      this.latestMission = mission;
      this.isLoading = false;
      console.log("HEREE IS THE LATEST MISSION");
      console.log(this.latestMission);
    });
  }

  ngOnDestroy(): void {
    if (this.missionSubscription){
      this.missionSubscription.unsubscribe();
    }
  }
}
