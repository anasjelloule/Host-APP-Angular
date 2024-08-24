import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import React from 'react';
// import useCounterStore from "remoteApp/store";

// import * as React from 'react';
// import MyReactComponent from 'remoteApp/MyReactComponent';

import * as ReactDOM from 'react-dom/client';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  // templateUrl: './button.component.html',
  template: `<div #reactContainer></div>
    <button (click)="click()">click 2</button>`,
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  reactComponent: any;
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;

  async click() {
    // await fetch('http://localhost:5000/api/v1/equipe/readAll').then((response) => {
    //   console.log(response);
    // });
    localStorage.setItem("equipe","RCA");
  }
  ngOnInit() {
    // const addToCart = useCounterStore((state: any) => state.addToCart);
    // loadRemoteModule({
    //   remoteEntry: 'http://localhost:4173/assets/remoteEntry.js',
    //   remoteName: 'MyReactComponent',
    //   exposedModule: './Button'
    // }).then((remote) => {
    //   const MyReactComponent = remote.MyReactComponent;
    //   this.reactComponent = MyReactComponent;
    // });
     loadRemoteModule({
      // remoteName: 'reactRemote',
      type: 'module',
      // remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteEntry: 'http://localhost:4173/assets/remoteEntry.js',
      exposedModule: './MyReactComponent',
    }).then((remote) => {
      console.log(remote);
      // const MyReactComponent = remote.MyReactComponent;
      // this.reactComponent = MyReactComponent;

      // const container = this.containerRef.nativeElement;
      // const root = ReactDOM.createRoot(container);
      // root.render(reactElement); // Render using 'createRoot'
      // ReactDOM.render(
      //   React.createElement(MyReactComponent),
      //   this.containerRef.nativeElement
      // );

      const ReactButton = remote.default; // Assuming default export
      const reactElement = React.createElement(ReactButton, {
        ls: 'Click Btn',
      });

      const container = this.containerRef.nativeElement;
      const root = ReactDOM.createRoot(container);
      // console.log(useCounterStore);
      root.render(reactElement); // Render using 'createRoot'
    });
  }
}
