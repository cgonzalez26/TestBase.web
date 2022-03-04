import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosService } from 'app/services/usuarios/usuarios.service';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register.component';


const routes = [
  {
      path: 'register',
      component: RegisterComponent,
      //canActivate: [NgxPermissionsGuard],
      data: {
          permissions: {
              only: 'PAGES_MANAGEMENT',
              redirectTo: '/pages/errors/error-403'
          }
      }
  }, 
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    
    //  MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSliderModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsuariosService,  
  ]
})
export class RegisterModule { }
