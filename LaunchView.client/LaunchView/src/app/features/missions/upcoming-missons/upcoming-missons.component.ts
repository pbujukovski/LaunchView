import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Mission } from '../../../core/models/mission.model';
import { Subscription } from 'rxjs';
import { MissionService } from '../../../core/services/mission.service';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ColumnDef } from '../../../utils/models/column-def.model'; // Assuming this interface is correct

@Component({
  selector: 'app-upcoming-missons',
  imports: [TableComponent],
  templateUrl: './upcoming-missons.component.html',
  styleUrl: './upcoming-missons.component.scss'
})
export class UpcomingMissonsComponent implements OnInit, OnDestroy {
  public upcomingMissions: Mission[] = [];

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

  public upcomingMissionSubscription: Subscription = new Subscription();
 
   constructor(private missionService: MissionService,private liveAnnouncer: LiveAnnouncer) {

    }
 
   ngOnInit() {
     this.missionService.getMission<Mission[]>('mission/upcoming-missions'); 
 
     this.missionService.missions$.subscribe(missions => {
       this.upcomingMissions = missions;
       console.log("HEREE IS THE Upcoming MISSION");
       console.log(this.upcomingMissions);
       this.dataSource.data = this.upcomingMissions;

       console.log(this.dataSource);
       console.log(this.dataSource.data);
     });
   }
 
   ngOnDestroy(): void {
     if (this.upcomingMissionSubscription){
       this.upcomingMissionSubscription.unsubscribe();
     }
   }
 }
