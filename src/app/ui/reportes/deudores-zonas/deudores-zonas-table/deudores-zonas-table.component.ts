import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject, Observable } from 'rxjs';
import { Titular } from '../../../../models/titulares/titular';
import { FormControl } from '@angular/forms';
//import { ImpuestosTsgService } from '../../../services/impuestos_tsg/impuestos_tsg.service';
import { TranslationService } from '../../../../services/translation/translation.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Deudores } from 'app/models/titulares/deudores';
import { ExcelService } from 'app/services/excel/excel.service';
import { TitularesService } from 'app/services/titulares/titulares.service';
import { AuthenticationService } from 'app/services/authentication/authentication.service';
//import { ExcelService } from '../../../services/excel/excel.service';
//import { AuthenticationService } from "../../../services/authentication/authentication.service";

@Component({
  selector: 'deudores-zonas-table',
  templateUrl: './deudores-zonas-table.component.html',
  styleUrls: ['./deudores-zonas-table.component.scss']
})
export class DeudoresZonasTableComponent implements OnInit {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  @Input() forms$: Observable<Deudores[]>;
  @Output() onView: EventEmitter<void>;
  searchInput: FormControl;

  private _unsubscribeAll: Subject<any>;
  messages = {
        emptyMessage: 'No se encontraron registros'
    };
  searchSubject: Subject<string>;

  filteredRows: Observable<Deudores[]>;
  deudores:Deudores[] = [];
  isContribuyente: boolean;

  constructor(private _translationService: TranslationService,
    private _ImpuestosTsgService: TitularesService,
    private _excelService: ExcelService,
    private _authenticationService: AuthenticationService,) { 
      this._unsubscribeAll = new Subject();
        this.onView = new EventEmitter<void>();
       
        this.messages.emptyMessage = this._translationService.noDataAvailable;
        this.searchInput = new FormControl('');
        this.searchInput.valueChanges
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    debounceTime(500),
                    distinctUntilChanged()
                )
                .subscribe(value => {
                    this.search(value);
                });
    }

  ngOnInit(): void {
    this.filteredRows = this.forms$;
    const currentUser = this._authenticationService.usuario;    
    this.isContribuyente = (currentUser.Rol.Id == 'COD_CONTRIBUYENTE')? true: false;
  }

  ngOnChanges() {
    this.searchInput.setValue('');
  }

  ngOnDestroy() {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  search(value: string) {
    value = value.toUpperCase();

    if(this.forms$){
        this.filteredRows = this.forms$.pipe(map((response: any) => {
            return response.filter(c => (c && c.sCatastro.toUpperCase().includes(value) /*|| (c.Institucion && c.Institucion.toUpperCase().includes(value))*/
            //|| (c.UserName && c.UserName.toUpperCase().includes(value)) || (c.DocumentNumber && c.DocumentNumber.toUpperCase().includes(value))
            ));
        }));
    }
  }

  view(row: Deudores):void{
    return null;
  }

}
