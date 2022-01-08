import { ImpuestosInmService } from '../../services/impuestos_inm/impuestos_inm.service';
import { Establecimiento } from '../../models/establecimientos/establecimiento';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { environment } from 'environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
//import { EstablecimientosDialogComponent } from './establecimientos-dialog/establecimientos-dialog.component';
import { BaseTableOptions } from 'app/base/base-table/base-table-options';
import { ImpuestosInm } from 'app/models/impuestos_inm/impuestos_inm';
import { Console } from 'console';

@Component({
  selector: 'impuestos_inm',
  templateUrl: './impuestos_inm.component.html',
  styleUrls: ['./impuestos_inm.component.scss']
})
export class ImpuestosInmComponent implements OnInit {
  @BlockUI('forms-block') dialogBlockUI: NgBlockUI;
  forms: ImpuestosInm[];
  forms$: Observable<ImpuestosInm[]>;
  userCode: string;
  dialogRef: any;
  baseTableOptions: BaseTableOptions;

  constructor(
    private _impuestos_inmService: ImpuestosInmService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _matDialog: MatDialog,
    private _fuseConfigService: FuseConfigService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router
  ) { 
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
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    
    this.userCode = JSON.parse(localStorage.getItem(environment.localStorageAuthDataItem)).UserCode;
    this.forms$ = this._impuestos_inmService.getEntities();
    this.forms$.subscribe(forms => {
        this.forms = forms;
    });
  }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    if (!this.forms || this.forms.length == 0) {
        combineLatest(
            this._impuestos_inmService.getAll()
        ).subscribe(
            ([_forms]) => {
                this.forms$ = this._impuestos_inmService.getEntities();
                //console.log('datos imp aut',this.forms$); SI lo tiene                
                this.dialogBlockUI.stop();
            }, error => {
                this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los Impuestos. Detalle: ' + error.Message, null, false);
                this.dialogBlockUI.stop();
            });
    } else {
        this.dialogBlockUI.stop();
    }
  }

  onActivate(row: ImpuestosInm) {
    this._impuestos_inmService.setForm(row);
    /* document.getElementById('tFormSelected').innerHTML = row.Formulario;
    this.router.navigate(['pages', 'form-configuration', row.CodFormulario, row.CodVersion]);
    localStorage.setItem(environment.localStorageEditItem, JSON.stringify(row)); */
}

}
