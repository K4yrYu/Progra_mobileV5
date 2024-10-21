export class Detallesventa {
    //esto va para retiros pendientes si estado retiro = 0
    //si estado_retiro = 1 va para historial de compras
    id_detalle!: number;
    cantidad!: number;
    subtotal!: number;
    nombre_prod!: string;
    foto_prod!: Blob;
    id_venta!: number;
    id_producto!: number;
}