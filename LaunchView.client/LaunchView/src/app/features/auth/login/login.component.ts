import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Login } from '../../../core/models/login.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, MatIconModule, MatCardModule, MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() login = new EventEmitter<User>();
  model: User = new User();
  confirmPassword: string = '';
  terms: boolean = false;
  showPwd: boolean = false;
  showConfirm: boolean = false;
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  submit(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.login.emit({ ...this.model });

    this.auth.handleAuth('auth/login', (form.value as Login)).subscribe({
      next: () => {
        form.resetForm(new User());
        this.router.navigateByUrl('missions');
        this.isLoading = false;
        this.onToastShow('Login success!');
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false; 
        this.onToastShow(e.status + ": " + e.error);
      }
    });
  }

  private onToastShow(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000 
    });
  }
}
