import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {  OnInit,  ViewContainerRef, Injector } from '@angular/core';

import * as ReactDOM from 'react-dom/client';
import React from 'react';
import { HttpClient } from '@angular/common/http';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-remote2',
  standalone: true,
  imports: [],
  templateUrl: './remote2.component.html',
  styleUrl: './remote2.component.scss'
})
export class Remote2Component implements OnInit{
  reactComponent: any;
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;



constructor(private viewContainerRef:ViewContainerRef,private injector:Injector,private http: HttpClient,private readonly keycloak: KeycloakService){}
     async ngOnInit() {
      // console.log(window);
      window.callAngularFunction = this.angularFunction.bind(this);



       const remote  = await loadRemoteModule({
        // remoteName: 'reactRemote',
        type: 'module',
        // remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteEntry: 'http://localhost:4173/assets/remoteEntry.js',
        exposedModule: './MyReactComponent',
      });
      //  const zustand  = await loadRemoteModule({
      //   // remoteName: 'reactRemote',
      //   type: 'module',
      //   // remoteEntry: 'http://localhost:3000/remoteEntry.js',
      //   remoteEntry: 'http://localhost:4173/assets/remoteEntry.js',
      //   exposedModule: './store',
      // });
      console.log(remote,"remote");
            const ReactButton = remote.default; // Assuming default export
      const reactElement = React.createElement(ReactButton, {
        ls: 'Click Btn',
      });
      // console.log(zustand);

      const container = this.containerRef.nativeElement;
      const root = ReactDOM.createRoot(container);
      root.render(reactElement); // Render using 'createRoot'
      //  // Access the Zustand store from the componentRef
      //  const zustandStore = container.instance.useStore;
      //  console.log(zustandStore.count); // Output: 0
      //  zustandStore.increment();
      //  console.log(zustandStore.count); // Output: 1
     }

     async login(){
      this.http.post('http://localhost:3000/login',{}, { withCredentials: true }).subscribe();
      // await fetch('http://localhost:3000/login', {
      //   method: 'POST',
      //   credentials: 'include' // Ensures cookies are sent
      // });
     }
     async callProtectedApi() {
      return this.http.get('http://localhost:3000/protected-route', { withCredentials: true }).subscribe();
      // await fetch('http://localhost:3000/protected-route', {
      //   method: 'GET',
      //   credentials: 'include' // Ensures cookies are sent
      // });
    }
     angularFunction(data: any) {
      console.log('Angular Function called from React with data:');
      return data;
    }
     callReactFunction() {
      if (window.reactFunction) {
        // Calling the React function
        window.reactFunction({ message: 'Hello from Angular' });
      } else {
        console.log('React function is not available.');
      }
    }
}
