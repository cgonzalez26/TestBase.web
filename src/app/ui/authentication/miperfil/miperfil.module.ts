import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiperfilComponent } from './miperfil.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

const routes = [
  {
      path: 'auth/miperfil',
      component: MiperfilComponent,
  }, 
];


@NgModule({
  declarations: [MiperfilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
  ]
})
export class MiperfilModule { }
