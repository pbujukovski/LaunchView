import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


/* Angular Material (standalone imports) */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatIconModule }      from '@angular/material/icon';
import { MatCardModule }      from '@angular/material/card';
import { MatDividerModule }   from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../core/models/user.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

// import { MatchToDirective } from '../../shared/validators/match-to.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, MatIconModule, MatCardModule, MatDividerModule,
    MatProgressBarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() registered = new EventEmitter<User>();

  // backing model for template-driven form
  model: User = new User();
  confirmPassword = '';
  terms = false;

  showPwd: boolean = false;
  showConfirm: boolean= false;

  isLoading: boolean = false;

  get passwordScore(): number {
    const v = this.model.Password ?? '';
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
    if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) s++;
    return s; // 0–3
  }

  constructor(private authService: AuthService, private router: Router) { }
  submit(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }


    // Emit a clean User object (Password should be hashed server-side)
    this.registered.emit({ ...this.model });

    this.authService.handleAuth('auth/register', (form.value as any)).subscribe({
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
