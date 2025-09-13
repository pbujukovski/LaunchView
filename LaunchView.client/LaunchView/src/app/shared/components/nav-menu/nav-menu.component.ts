import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-menu',
  imports: [MatIconModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
 constructor(private authService: AuthService) {}

 onLogout() {
   this.authService.onLogout();
 }
}
