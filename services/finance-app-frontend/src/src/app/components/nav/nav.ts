import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-nav',
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected auth = inject(AuthService);
  protected readonly window = window;
  pictureFailed = false;
}
