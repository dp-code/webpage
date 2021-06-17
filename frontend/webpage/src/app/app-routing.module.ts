import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechstackComponent} from './techstack/techstack/techstack.component';
import {ContactComponent} from './contact/contact/contact.component';
import {AboutComponent} from './about/about/about.component';
import {ImprintComponent} from './about/imprint/imprint.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    component: AboutComponent
  },
  {
    path: 'techstack',
    loadChildren: () => import('./techstack/techstack.module').then(m => m.TechstackModule),
    component: TechstackComponent
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
    component: ContactComponent
  },
  {
    path: 'imprint',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    component: ImprintComponent
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, onSameUrlNavigation: 'ignore'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
