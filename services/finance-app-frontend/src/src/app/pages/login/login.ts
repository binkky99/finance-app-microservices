import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected auth = inject(AuthService);
}
