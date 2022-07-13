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
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

export const MY_DATE_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.scss'],/*,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,*/
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})

export class MiperfilComponent implements OnInit {
    @ViewChild('picker1') picker: MatDatepicker<Date>;
    @ViewChild('BirthDate') birthdate: ElementRef;
    @BlockUI('form-dialog') dialogBlockUI: NgBlockUI;
    
  form: Usuario; 
  miperfilForm: FormGroup;
  isLoading: boolean;
  hidePassword:boolean = true;
  userCode: string = "";
  usuarioId: string = "";
  rol: string = "";
  disabled: boolean = true;

  constructor( private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _ngxPermissionsService: NgxPermissionsService,
    private _translate: TranslateService,
    private _usuariosService: UsuariosService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private router:Router,
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
      console.log('datos de usuarios ',JSON.parse(localStorage.getItem(environment.localStorageAuthDataItem)));
      this.userCode = JSON.parse(localStorage.getItem(environment.localStorageAuthDataItem)).UserCode;    
      this.usuarioId = JSON.parse(localStorage.getItem(environment.localStorageAuthDataItem)).Id;  
      this.rol = JSON.parse(localStorage.getItem(environment.localStorageAuthDataItem)).Rol.Nombre;    
      this.isLoading = false;
      this.form = new Usuario();                     
      this.miperfilForm = this.createFormGroup();      
  }

  ngOnInit(): void {    
    this.cargarDatos();
  }

  createFormGroup(): FormGroup {
    
    const formGroup = this._formBuilder.group({
      sNroDocumento: [this.form.sNroDocumento],
      UsuarioNombre: [this.form.UsuarioNombre, [Validators.required]],
      Nombres: [this.form.Nombres, [Validators.required]],
      Apellidos: [this.form.Apellidos, [Validators.required]],      
      Telefono: [this.form.Telefono],
      Email: [this.form.Email],
      FechaNacimiento: [this.form.FechaNacimiento],       
      //RolId: [this.form.RolId, [Validators.required]],
      Rol: [this.rol],
      Password: [this.form.Password],
      ConfirmPassword: [this.form.Password]
      });
      return formGroup;
  }

  cargarDatos(): void{
    this._usuariosService.getById(this.usuarioId).subscribe((usersForm: Usuario) =>{      
      this.form = usersForm;  
      this.initForm(this.form);
      //this.miperfilForm =
      console.log('user encontrado',usersForm); //ok
      //this.createDialogForm();
    })
  }

  private initForm = (_data: any): void => {
    this.miperfilForm = this._formBuilder.group({
        //nombres: [_data.nombres, [Validators.required]],
        sNroDocumento: [_data.sNroDocumento],
        UsuarioNombre: [_data.UsuarioNombre, [Validators.required]],
        Nombres: [_data.Nombres, [Validators.required]],
        Apellidos: [_data.Apellidos, [Validators.required]],      
        Telefono: [_data.Telefono],
        Email: [_data.Email],
        FechaNacimiento: [_data.FechaNacimiento],       
        //RolId: [this.form.RolId, [Validators.required]],
        Rol: [this.rol],
        Password: ['********'],
        ConfirmPassword: ['********'],
    });
    //this.miperfilForm.get('Password').setValue('********');
    //this.miperfilForm.get('ConfirmPassword').setValue('********');

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
    
  setRawValues(): any {
    const rawValue = this.miperfilForm.getRawValue();
    this.form.sNroDocumento = rawValue.sNroDocumento;
    this.form.UsuarioNombre = rawValue.UsuarioNombre;
    this.form.Nombres = rawValue.Nombres;
    this.form.Apellidos = rawValue.Apellidos;
    this.form.Telefono = rawValue.Telefono;
    this.form.Email = rawValue.Email;
    this.form.FechaNacimiento = rawValue.FechaNacimiento;
    //this.form.RolId = rawValue.RolId;
    this.form.Password = rawValue.Password;
  } 

  
  save(): void{
    this.dialogBlockUI.start('Guardando...');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    this.setRawValues();
    this._usuariosService.editWeb(this.form).subscribe(async (result: any) => {
        this.dialogBlockUI.stop();
        this._sweetAlert2Helper.success('Aviso', 'Usuario editado correctamente', null, true);
        await delay(2000);
        this.router.navigate(['/home']);
    }, error => {
        this.dialogBlockUI.stop();
        this._sweetAlert2Helper.error('Error', error.Message, null, true);
    });

  }

  cancel(): void{
    this.router.navigate(['/home']);
  }
}
