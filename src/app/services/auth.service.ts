import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  link="http://localhost"
  constructor(
    private router: Router,
    private readonly keycloak: KeycloakService,
    private http: HttpClient
  ) {}

  secure(): Promise<any> {
    // console.log(this.keycloak.getKeycloakInstance().);

    // return lastValueFrom(this.http.get('${this.link}:8086/realms/MICROSERVICE/protocol/openid-connect/token/introspect'));
    return lastValueFrom(this.http.get(`${this.link}:3000/permissions`));
    return lastValueFrom(this.http.get(`${this.link}:8086/realms/MICROSERVICE/protocol/openid-connect/auth`));
    return lastValueFrom(this.http.get(`${this.link}:8086/realms/MICROSERVICE/authz/protection/permission`));
    return lastValueFrom(this.http.get(`${this.link}:8086/auth/owner/realms/MICROSERVICE/users/6930635a-ccd0-4277-89e0-f8ac442ef873/role-mappings`));
    return lastValueFrom(this.http.get(`${this.link}:8086/realms/MICROSERVICE/protocol/openid-connect/userinfo`));
  }

  loadRtp(): Promise<any> {
    const data:any={
      grant_type:'urn:ietf:params:oauth:grant-type:uma-ticket',
      audience:'EXPRESS'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }
    return lastValueFrom(this.http.post(`${this.link}:8086/realms/MICROSERVICE/protocol/openid-connect/token`,body.toString(), { headers }));
  }
  me(): Promise<any> {
    return lastValueFrom(this.http.get(`${this.link}:3000/me`));
  }

  owner(): Promise<any> {
    return lastValueFrom(this.http.get(`${this.link}:3000/owner`));
  }
  account(): Promise<any> {
    return lastValueFrom(this.http.get(`${this.link}:8086/realms/MICROSERVICE/account`));
  }



  loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }

  getUserRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  isUserInRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  logout(redirectUri?: string): any {
    // console.log(this.keycloak.isLoggedIn());
    this.keycloak.logout(redirectUri);
    // this.router.
    // this.router.navigate(['/logout'],{state:{pr:"anas",relativeTo: this.route}});
    // return ;
  }
  static login(){

  }
}
