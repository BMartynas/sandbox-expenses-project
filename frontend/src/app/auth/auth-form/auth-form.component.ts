import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  public showPassword: boolean = false;
  public errorMessage: string = '';
  private emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.errorMessage = '';
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.split('Message: ')[1];
      },
    });
  }
}
