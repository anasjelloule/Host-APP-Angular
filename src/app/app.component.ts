import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Component, OnInit } from '@angular/core';
import { provideRouter, Route, RouterLink, RouterModule, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  // providers: [provideRouter(APP_ROUTES)],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'host-app';
}
