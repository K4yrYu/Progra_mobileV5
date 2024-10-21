export class Usuarios {
    id_usuario!: number;
    rut_usuario!: string;
    nombres_usuario!: string;
    apellidos_usuario!: string;
    username!: string;
    clave!: string;
    correo!: string;
    token_recup_clave!: boolean;
    foto_usuario!: Blob;
    estado_user!: boolean;
    userlogged!: boolean;
    mantener_sesion!: boolean;
    id_rol!: number;
    
}
