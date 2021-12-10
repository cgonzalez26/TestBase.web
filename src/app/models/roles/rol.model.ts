import { Permiso } from "../permisos/permiso.model";
import { BaseModel } from "./../base.model";

export class Rol extends BaseModel {
    Nombre: string;
    Permisos: Permiso[];
    IsAllPermisosChecked: boolean;

    constructor() {
        super();
        this.Nombre = null;
        this.Permisos = [];
        this.IsAllPermisosChecked = false;
    }
}
