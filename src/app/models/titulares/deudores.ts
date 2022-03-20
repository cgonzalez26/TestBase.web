import { BaseModel } from '../base.model';
import { Zona } from '../zonas/zona';

export class Deudores extends BaseModel{
    sNroDocumento: string;
    sNombre: string;
    sApellido: string;    
    sDomicilio: string;
    sTelefono: string;        
    sCelular: string;
    ZonaId: string;
    Zona: Zona;

    constructor() {
        super()
        this.sNroDocumento = "";
        this.sNombre = "";
        this.sApellido = "";        
        this.sDomicilio = "";
        this.sTelefono = "";                
        this.sCelular = "";
        this.ZonaId = "";
        this.Zona = null;
    }
}
