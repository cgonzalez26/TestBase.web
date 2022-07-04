import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { Usuario } from './../../../models/usuarios/usuario.model';
import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
/*import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';*/
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepicker, } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS,DateAdapter } from '@angular/material/core';

import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { isEqual, omit } from 'lodash';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { KeyValue } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RolesService } from 'app/services/roles/roles.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AuthenticationService } from 'app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.scss']/*,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,*/
})

export class MiperfilComponent implements OnInit {
    @ViewChild('picker1') picker: MatDatepicker<Date>;
    @ViewChild('BirthDate') birthdate: ElementRef;
  form: Usuario; 
  miperfilForm: FormGroup;
  isLoading: boolean;
  hidePassword:boolean = true;


  constructor( private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _ngxPermissionsService: NgxPermissionsService,
    private _translate: TranslateService,
    private _usuariosService: UsuariosService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    ) { 
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
          };
          //this._fuseTranslationLoaderService.loadTranslations(english, spanish);
          //this.hasError = false;
      this.isLoading = false;
      this.form = new Usuario();
  }

  ngOnInit(): void {
    this.miperfilForm = this._formBuilder.group({
        // email: ['', [Validators.required, Validators.email]],
        //UsuarioNombre: ["", [Validators.required]],
        //Password: ["", Validators.required],
        sNroDocumento: [this.form.sNroDocumento],
        UsuarioNombre: [this.form.UsuarioNombre, [Validators.required]],
        Nombres: [this.form.Nombres, [Validators.required]],
        Apellidos: [this.form.Apellidos, [Validators.required]],      
        Telefono: [this.form.Telefono],
        Email: [this.form.Email],
        FechaNacimiento: [this.form.FechaNacimiento],       
        //RolId: [this.form.RolId, [Validators.required]],
        Rol: [this.form.Rol],
        Password: [this.form.Password],
        ConfirmPassword: [this.form.Password]
        });
  
  }

  onBlurPassword(): void {
    !this.hidePassword ? this.hidePassword = !this.hidePassword : this.hidePassword;
    if (this.miperfilForm.get('Password').value == this.miperfilForm.get('ConfirmPassword').value) {
        this.miperfilForm.get('Password').setErrors = null;
        this.miperfilForm.get('ConfirmPassword').setErrors = null;
        this.miperfilForm.get('Password').updateValueAndValidity();
        this.miperfilForm.get('ConfirmPassword').updateValueAndValidity();
    }
  }
    
  save(): void{

  }

  cancel(): void{
    
  }
}
