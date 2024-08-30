import { provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { CommonModule } from '@angular/common';
// import { AuthService } from './services/auth.service';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, KeycloakAngularModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'v18';
  user=signal<KeycloakProfile>({});
  constructor(protected authService: AuthService, kcService: KeycloakService) {
    // console.log(kcservice.profile);
    authService.loadUserProfile().then((user:any) =>this.user.update(val=>val=user));
  }
  logout() {
    // this.kcservice.clearToken();
    // console.log(this.keycloakService.isLoggedIn())
    this.authService.logout('http://localhost:4200/logout');
    // this.kcservice.logout("http://localhost:4200/logout");
  }


  secure(){
    this.authService.secure().then((data:any)=>console.log(data));
  }

  loadRtp(){
    this.authService.loadRtp().then((data:any)=>console.log(data));
  }
  me(){
    this.authService.me().then((data:any)=>console.log(data));
  }

  account(){
    this.authService.account().then((data:any)=>console.log(data));
  }

  owner(){
    this.authService.owner().then((data:any)=>console.log(data));
  }
}
