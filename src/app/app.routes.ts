import { Routes } from '@angular/router';
import { ButtonComponent } from './compnents/button/button.component';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Remote2Component } from './compnents/remote2/remote2.component';

export const routes: Routes = [
  {path: 'home', component: ButtonComponent},
  {path: 'mf1', component: Remote2Component},
  {
    path: 'flights',
    loadChildren: () => loadRemoteModule({
      type:"module",
      // remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteEntry: 'http://localhost:4173/assets/remoteEntry.js',
      exposedModule: './MyReactComponent',
      })
      .then(m =>{
        console.log(m);
        return  m.MyReactComponent;
      })
  },
];
