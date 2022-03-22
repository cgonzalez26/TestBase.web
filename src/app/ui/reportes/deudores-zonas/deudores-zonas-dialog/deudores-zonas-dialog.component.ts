import { Component, OnInit } from '@angular/core';
import { Deudores } from 'app/models/titulares/deudores';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
 
  ) { 
    this.dialogBlockUI.start('Cargando...');

    this.dialogBlockUI.stop();
  }

  ngOnInit(): void {
  }

}
