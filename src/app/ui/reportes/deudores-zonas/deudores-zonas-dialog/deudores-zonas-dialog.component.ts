import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { Impuestos } from 'app/models/impuestos/impuestos';
import { Deudores } from 'app/models/titulares/deudores';
import { TitularesService } from 'app/services/titulares/titulares.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { combineLatest } from 'rxjs';

export interface DialogData {
  titleTranslationCode: string;
  action: string;
  form: Deudores;
}


@Component({
  selector: 'deudores-zonas-dialog',
  templateUrl: './deudores-zonas-dialog.component.html',
  styleUrls: ['./deudores-zonas-dialog.component.scss']
})
export class DeudoresZonasDialogComponent implements OnInit {
  @BlockUI('form-dialog-deudores') dialogBlockUI: NgBlockUI;
  messages = {
    emptyMessage: 'No se encontraron registros'
  };
  title: string;
  forms: Impuestos[];
  form: Deudores; 
  impuestos: Impuestos[];
  
  constructor(
    public _matDialogRef: MatDialogRef<DeudoresZonasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
    private _titularesService: TitularesService,
    private _sweetAlert2Helper: SweetAlert2Helper,
  ) { 
    this.dialogBlockUI.start('Cargando...');
    this.title = _dialogData.titleTranslationCode ? _dialogData.titleTranslationCode : 'COMMON.NOT_AVAILABLE';
    this.form = _dialogData.form ? _dialogData.form : new Deudores();   
    this.dialogBlockUI.stop();
  }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    //const currentUser = this._authenticationService.usuario;
    combineLatest(
      this._titularesService.getDeudasByTitularId(this.form.Id),
    ).subscribe(      
      ([_impuestos]) => {
          console.log('impuestos adeudados ',_impuestos);
            this.forms = _impuestos;                  
            this.dialogBlockUI.stop();
        }, error => {
            this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los formularios. Detalle: ' + error.Message, null, false);
            this.dialogBlockUI.stop();
      });  
  }

  cancel() {
    this._matDialogRef.close();      
  }

  printDeudas(){
    return null;
  }

}
