import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LaunchOption, LaunchOptions } from '../../utils/models/launch-type.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LatestMissionComponent } from './latest-mission/latest-mission.component';
import { UpcomingMissonsComponent } from './upcoming-missons/upcoming-missons.component';
import { PastMissionsComponent } from './past-missions/past-missions.component';

@Component({
  selector: 'app-missions',
  imports: [   CommonModule,FormsModule, MatButtonToggleModule, MatInputModule, MatIcon, LatestMissionComponent, UpcomingMissonsComponent, PastMissionsComponent],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss'
})
export class MissionsComponent {
  options = LaunchOptions;
  selected: string = 'latest'; // value type is string

  constructor(){
    this.selected = this.options[0].value;
    console.log(this.selected);
  }

  onLaunchTypeChange(value: string) {
    this.selected = value;
    console.log(this.selected);
  }
}
