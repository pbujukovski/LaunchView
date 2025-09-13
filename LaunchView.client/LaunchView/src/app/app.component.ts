import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './core/services/auth.service';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,     
            LayoutModule,
            AsyncPipe,
            NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LaunchView';
  public isAuth: boolean = false;
  public isAuthenticated$: Observable<boolean> = new Observable<boolean>();
  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(isAuthed => {
      this.isAuth = isAuthed;
    })

    this.isAuthenticated$ = this.authService.isAuthenticated$;

    
  }
}
