import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ButtonModule } from 'primeng/button';
import { Nav } from "./components/nav/nav";
import { Login } from "./pages/login/login";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    CommonModule,
    Nav,
    Login
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('src');

  protected auth = inject(AuthService);
}
