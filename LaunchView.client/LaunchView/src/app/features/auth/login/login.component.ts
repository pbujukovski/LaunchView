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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Login } from '../../../core/models/login.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { 
    
  }

  get passwordScore(): number {
    const v = this.model.Password ?? '';
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
    if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) s++;
    return s; // 0–3
  }

  submit(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }


    // Emit a clean User object (Password should be hashed server-side)
    this.login.emit({ ...this.model });

    this.auth.handleAuth('auth/login', (form.value as Login)).subscribe({
      next: () => {
        form.resetForm(new User());
        this.router.navigateByUrl('missions');
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false;
      }
    });
  }
}
