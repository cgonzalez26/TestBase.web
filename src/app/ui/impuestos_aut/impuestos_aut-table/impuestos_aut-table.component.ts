import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject, Observable } from 'rxjs';
import { ImpuestosAut } from '../../../models/impuestos_aut/impuestos_aut';
import { FormControl } from '@angular/forms';
import { ImpuestosAutService } from '../../../services/impuestos_aut/impuestos_aut.service';
import { TranslationService } from '../../../services/translation/translation.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'impuestos_aut-table',
  templateUrl: './impuestos_aut-table.component.html',
  styleUrls: ['./impuestos_aut-table.component.scss']
})
export class ImpuestosAutTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  @Input() forms$: Observable<ImpuestosAut[]>;
  @Output() onAdd: EventEmitter<void>;
  @Output() onEdit: EventEmitter<any>;
  @Output() onActivate: EventEmitter<any>;

  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  messages = {
        emptyMessage: 'No se encontraron registros'
    };
  searchSubject: Subject<string>;

  filteredRows: Observable<ImpuestosAut[]>;

  constructor(
      private _translationService: TranslationService,
      private _impuestosautService: ImpuestosAutService,) { 
        this._unsubscribeAll = new Subject();
        this.onAdd = new EventEmitter<void>();
        this.onEdit = new EventEmitter<any>();
        this.onActivate = new EventEmitter<any>();
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
            return response.filter(c => (c && c.sDominio.toUpperCase().includes(value) /*|| (c.Institucion && c.Institucion.toUpperCase().includes(value))*/
            //|| (c.UserName && c.UserName.toUpperCase().includes(value)) || (c.DocumentNumber && c.DocumentNumber.toUpperCase().includes(value))
            ));
        }));
    }
  }

  add() {
    this.onAdd.emit();
  }

  edit(row) {
      this.onEdit.emit(row);
  }

  activate(row) {
      if (event.type == 'dblclick') {
          this.onActivate.emit(row.row);
      }        
  }

  /*public openPDF():void {
    let DATA = document.getElementById('tableForm');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('impuestos_aut.pdf');
    });     
  }*/

  generarPDF(){
    html2canvas(document.getElementById('tableForm'), {
       // Opciones
       allowTaint: true,
       useCORS: false,
       // Calidad del PDF
       scale: 1
    }).then(function(canvas) {
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'PNG',7, 20, 195, 105);
    doc.save('impuestos_aut2.pdf');
   });
  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('tableForm');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_impuestos_aut.pdf`);
    });
  }

}
