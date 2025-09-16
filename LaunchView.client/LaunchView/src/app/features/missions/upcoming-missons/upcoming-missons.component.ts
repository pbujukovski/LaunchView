import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Mission } from '../../../core/models/mission.model';
import { Subscription } from 'rxjs';
import { MissionService } from '../../../core/services/mission.service';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ColumnDef } from '../../../utils/models/column-def.model';
import { PageParams } from '../../../utils/models/page-params.model';
import { MissionDetailsComponent } from '../../../shared/components/mission-details/mission-details.component';

@Component({
  selector: 'app-upcoming-missons',
  imports: [TableComponent, MissionDetailsComponent],
  templateUrl: './upcoming-missons.component.html',
  styleUrl: './upcoming-missons.component.scss'
})
export class UpcomingMissonsComponent implements OnInit, OnDestroy {
  
  upcomingMissions: Mission[] = [];
  mission: Mission = new Mission();
  dataSource = new MatTableDataSource<Mission>([]);

  openDetails: boolean = false;

  displayedColumns: string[] = ['id','name','rocket','date_utc','success', 'actions'];
  missionColumnDefs: ColumnDef[] = [
    { columnDef: 'id', header: 'ID' },
    { columnDef: 'name', header: 'Mission Name' },
    { columnDef: 'rocket', header: 'Rocket' },
    { columnDef: 'date_utc', header: 'Launch Date', type: 'date' },
    { columnDef: 'success', header: 'Success', type: 'status' },
    { columnDef: 'actions', header: 'Actions', type: 'actions' }
  ];

  params: PageParams = { pageIndex: 0, pageSize: 10, sort: 'date_utc', order: 'desc', filter: '' };
  totalDocs = 0;
  pageSizeOptions = [5, 10, 25, 50];

  private pastMissionSubscription = new Subscription();

  constructor(private missionService: MissionService) {}

  ngOnInit() {
    
    this.missionService.getMissions('mission/upcoming-missions', { ...this.params });

    this.pastMissionSubscription = this.missionService.missionsWithQuery$.subscribe(missions => {
      this.upcomingMissions = missions.docs;
      this.totalDocs = missions.totalDocs;
      this.dataSource.data = this.upcomingMissions;
    });
  }

  ngOnDestroy(): void {
    this.pastMissionSubscription.unsubscribe();
  }

  private reload() {
    this.missionService.getMissions('mission/upcoming-missions', { ...this.params });
  }

  onFilterChanged(value: string) {
    this.params.filter = value ?? '';
    this.params.pageIndex = 0;
    this.reload();
  }

  onSortChanged(sort: { active: string; direction: 'asc' | 'desc' | '' }) {
    if (sort.active) this.params.sort = sort.active;
    if (sort.direction) this.params.order = sort.direction as 'asc' | 'desc';
    this.reload();
  }

  onPageChanged(ev: { pageIndex: number; pageSize: number }) {
    this.params.pageIndex = ev.pageIndex;
    this.params.pageSize = ev.pageSize;
    this.reload();
  }
  
  onAction(action: string, row: Mission) {
    this.openDetails = true;
    this.mission = row;
    console.log(action, row);
  }

  onCloseDetails() {
    this.openDetails = false;
    this.mission = new Mission();
  }
}
