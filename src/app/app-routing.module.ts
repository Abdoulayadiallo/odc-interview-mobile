import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentification.guard';
import { NoteComponent } from './note/note.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthenticationGuard] 
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  // {
  //   path: 'postulant',
  //   loadChildren: () => import('./postulant/postulant.module').then( m => m.PostulantPageModule)
  // },
  // {
  //   path: 'jury',
  //   loadChildren: () => import('./jury/jury.module').then( m => m.JuryPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  // },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  // {
  //   path: 'postulant-details',
  //   loadChildren: () => import('./postulant-details/postulant-details.module').then( m => m.PostulantDetailsPageModule)
  // },
  {
    path: 'postulant-details/:id',
    loadChildren: () => import('./postulant-details/postulant-details.module').then( m => m.PostulantDetailsPageModule),
    // canActivate: [AuthenticationGuard],
    // resolve:{resolvedPostulant:PostulantresolverService}
  },
  {
    path: 'entretien/:id',
    loadChildren: () => import('./entretien/entretien.module').then( m => m.EntretienPageModule)
  },
  {
    path: 'note', component: NoteComponent
  },
  {
    path:'notification', component: NotificationComponent
  },
  {
    path: 'jury-details/:id',
    loadChildren: () => import('./jury-details/jury-details.module').then( m => m.JuryDetailsPageModule)
  },
  {
    path: 'changepassword/:username',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'entretien-details/:id',
    loadChildren: () => import('./entretien-details/entretien-details.module').then( m => m.EntretienDetailsPageModule)
  },
  {
    path: 'postulant-utilisateur/:id/:idUtilisateur',
    loadChildren: () => import('./postulant-utilisateur/postulant-utilisateur.module').then( m => m.PostulantUtilisateurPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
