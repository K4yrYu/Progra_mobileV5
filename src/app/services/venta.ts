export class Venta {
    id_venta!: number;
    fecha_venta!: Date;
    total!: number;
    estado_retiro!: boolean;
    //con el join usuario
    username!: string;
    //foraneas
    id_usuario!: number;
    id_estado!: number;
}
