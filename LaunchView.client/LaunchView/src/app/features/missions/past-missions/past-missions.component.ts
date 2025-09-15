import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Mission } from '../../../core/models/mission.model';
import { MissionService } from '../../../core/services/mission.service';
import { ColumnDef } from '../../../utils/models/column-def.model';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-past-missions',
  imports: [TableComponent],
  templateUrl: './past-missions.component.html',
  styleUrl: './past-missions.component.scss'
})
export class PastMissionsComponent implements OnInit, OnDestroy {
  public pastMissions: Mission[] = [];

    //Data
    public dataSource = new MatTableDataSource<Mission>([]);

    //Data list settings
    public displayedColumns: string[] = ['id', 'name', 'rocket', 'date_utc', 'success'];

    public missionColumnDefs: ColumnDef[] = [
      { columnDef: 'id', header: 'ID' },
      { columnDef: 'name', header: 'Mission Name' },
      { columnDef: 'rocket', header: 'Rocket' },
      { columnDef: 'date_utc', header: 'Launch Date', type: 'date' },
      { columnDef: 'success', header: 'Success', type: 'status' }
    ];

  public pastMissionSubscription: Subscription = new Subscription();
 
   constructor(private missionService: MissionService, private liveAnnouncer: LiveAnnouncer) {

    }
 
   ngOnInit() {
     this.missionService.getMission<Mission[]>('mission/past-missions'); 
 
     this.missionService.missions$.subscribe(missions => {
       this.pastMissions = missions;
       console.log("HEREE IS THE Past MISSION");
       console.log(this.pastMissions);
       this.dataSource.data = this.pastMissions;

       console.log(this.dataSource);
       console.log(this.dataSource.data);
     });
   }
 
   ngOnDestroy(): void {
     if (this.pastMissionSubscription){
       this.pastMissionSubscription.unsubscribe();
     }
   }
 }