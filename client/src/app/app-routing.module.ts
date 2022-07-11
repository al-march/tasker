import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./pages/project/project.module')
      .then(m => m.ProjectModule)
  },
  {
    path: 'tag',
    loadChildren: () => import('./pages/tag/tag.module')
      .then(m => m.TagModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
