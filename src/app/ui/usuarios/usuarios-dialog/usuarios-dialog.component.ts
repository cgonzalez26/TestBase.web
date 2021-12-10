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
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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

export interface DialogData {
  titleTranslationCode: string;
  action: string;
  form: Usuario; //Athlete;
  athlete: Usuario;
}

@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class UsuariosDialogComponent implements OnInit {
  @BlockUI('form-dialog') dialogBlockUI: NgBlockUI;
    //@ViewChild('picker1',null) picker: MatDatepicker<Date>;
    //@ViewChild('BirthDate',null) birthdate: ElementRef;
    @ViewChild('picker1') picker: MatDatepicker<Date>;
    @ViewChild('BirthDate') birthdate: ElementRef;
    
    dialogForm: FormGroup;
    title: string;
    action: string;
    form: Usuario; 
    rowCopy: Usuario = new Usuario();
    saveCallback: (any) => void;
    genders : any[];
    sports : any[];
    categories : any[];

    public patronLetras = {
      U: { pattern: new RegExp('[a-zA-ZñÑáéíóúÁÉÍÓÚ/ ]') }
    };

    public namePatterns = {
        'A': { pattern: new RegExp('\[a-zA-Z \]')},
    };
    
  constructor( 
    public _matDialogRef: MatDialogRef<UsuariosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
    private _formBuilder: FormBuilder,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _usuariosService: UsuariosService,        
    ) { 
      this.dialogBlockUI.start('Cargando...');
      this.title = _dialogData.titleTranslationCode ? _dialogData.titleTranslationCode : 'COMMON.NOT_AVAILABLE';
      this.action = _dialogData.action ? _dialogData.action : 'add';
      this.form = _dialogData.form ? _dialogData.form : new Usuario();   // Athlete();
      this.rowCopy = JSON.parse(JSON.stringify(this.form));
      this.dialogForm = this.createDialogForm();
      this.saveCallback = null;
      this.dialogBlockUI.stop();
    }

  ngOnInit(): void {
  }

  createDialogForm(): FormGroup {
    const formGroup = this._formBuilder.group({
     /* Nombres: [this.form.Usuario.Nombres, [Validators.required]],
      Apellidos: [this.form.Usuario.Apellidos, [Validators.required]],
      //  DocumentNumber: [this.form.Usuario.DocumentNumber],
        Telefono: [this.form.Usuario.Telefono],
        Email: [this.form.Usuario.Email],
        FechaNacimiento: [this.form.Usuario.FechaNacimiento],       
        GenderId: [this.form.Usuario.GenderId]//,*/
    });        
    return formGroup;
  }
  setRawValues(): any {
    const rawValue = this.dialogForm.getRawValue();
    /*this.form.Usuario.FirstName = rawValue.FirstName;
    this.form.Usuario.LastName = rawValue.LastName;
    this.form.Usuario.DocumentNumber = rawValue.DocumentNumber;
    this.form.Usuario.PhoneNumber = rawValue.PhoneNumber;
    this.form.Usuario.Mail = rawValue.Mail;
    this.form.Usuario.BirthDate = rawValue.BirthDate;
    this.form.Weight = rawValue.Weight;
    this.form.Height = rawValue.Height;
    this.form.Usuario.GenderId = rawValue.GenderId;*/
  } 
  cancel() {
    this._matDialogRef.close();
  }
  save() {
    this.setRawValues();
  }
}
