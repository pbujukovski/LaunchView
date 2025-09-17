import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-menu',
  imports: [MatIconModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit{

 public userCredidentials: string = '';

 constructor(private authService: AuthService) {}


 ngOnInit() {
  this.userCredidentials = this.authService.getUserName().toLocaleUpperCase();
 }

 onLogout() {
   this.authService.onLogout();
 }
}
