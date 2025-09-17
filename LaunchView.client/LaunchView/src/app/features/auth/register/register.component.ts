import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';


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
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatProgressBarModule, MatProgressSpinner
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() registered = new EventEmitter<User>();

  model: User = new User();
  confirmPassword: string = '';
  terms = false;

  showPwd: boolean = false;
  showConfirm: boolean= false;

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  submit(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.confirmPassword !== this.model.Password) {
      form.control.markAsDirty()
      this.onToastShow('Passwords do not match');
      this.isLoading = false;
      return;
    }

    this.registered.emit({ ...this.model });

    this.authService.handleAuth('auth/register', (form.value as User)).subscribe({
      next: () => {
        form.resetForm(new User());
        this.router.navigateByUrl('missions');
        this.isLoading = false;
        this.onToastShow('Registration success! Welcome aboard!');
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
