import { Rol } from "../roles/rol.model";
import { BaseModel } from '../base.model';

export class Usuario extends BaseModel{
    FechaNacimiento: Date;
    Nombres: string;
    Apellidos: string;
    Email: string;
    Foto: string;
    Rol: Rol;
    CodigoPostal: string;
    Telefono: string;
    Token: string;

    constructor() {
        super()
        this.FechaNacimiento = null;
        this.Nombres = "";
        this.Apellidos = "";
        this.Email = "";
        this.Foto = "";
        this.Rol = null;
        this.CodigoPostal = "";
        this.Telefono = "";
        this.Token = "";
    }
}
