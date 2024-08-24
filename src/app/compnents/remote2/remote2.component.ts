import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {  OnInit,  ViewContainerRef, Injector } from '@angular/core';

import * as ReactDOM from 'react-dom/client';
import React from 'react';


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



constructor(private viewContainerRef:ViewContainerRef,private injector:Injector){}
     async ngOnInit() {
      // console.log(window);
       const remote  = await loadRemoteModule({
        // remoteName: 'reactRemote',
        type: 'module',
        // remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteEntry: 'http://localhost:4173/assets/remoteEntry.js',
        exposedModule: './MyReactComponent',
      });
       const zustand  = await loadRemoteModule({
        // remoteName: 'reactRemote',
        type: 'module',
        // remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteEntry: 'http://localhost:4173/assets/remoteEntry.js',
        exposedModule: './store',
      });
      const ReactButton = remote.default; // Assuming default export
      const reactElement = React.createElement(ReactButton, {
        ls: 'Click Btn',
      });
      console.log(zustand);

      const container = this.containerRef.nativeElement;
      const root = ReactDOM.createRoot(container);
      root.render(reactElement); // Render using 'createRoot'
      //  // Access the Zustand store from the componentRef
      //  const zustandStore = container.instance.useStore;
      //  console.log(zustandStore.count); // Output: 0
      //  zustandStore.increment();
      //  console.log(zustandStore.count); // Output: 1
     }
}
