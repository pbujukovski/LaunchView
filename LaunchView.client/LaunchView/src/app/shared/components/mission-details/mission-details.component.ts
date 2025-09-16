import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Mission } from '../../../core/models/mission.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mission-details',
  imports: [CommonModule, MatCard, MatDivider, MatDivider, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './mission-details.component.html',
  styleUrl: './mission-details.component.scss'
})
export class MissionDetailsComponent {

 @Input() mission: Mission = new Mission();
 @Input() isCloseButtonVisible: boolean = false;
 @Output() closeDetails = new EventEmitter<boolean>();

 constructor(){}

 onCloseDetails() {
  this.closeDetails.emit(true);
 }
}
