import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertasService } from 'src/app/services/alertas.service';
import { AlertasSilenciosasService } from 'src/app/services/alertasilenciosa.service';
import { Usuarios } from './usuarios';
import { Juegos } from './juegos';
import { Juguetes } from './juguetes';
import { Consolas } from './consolas';
import { Seguridad } from './seguridad';
import { Resecnas } from './resecnas';
import { Venta } from './venta';
import { Detallesventa } from './detallesventa';
import { Resecnasyuser } from './resecnasyuser';
import { Resecnascrud } from './resecnascrud';
import { Favs } from './favs';
import { Favsvan } from './favsvan';
import { Productos } from './productos';

@Injectable({
  providedIn: 'root'
})
export class ManejodbService {

  loggin!: any;
  public database!: SQLiteObject;
  private dbCreated: boolean = false; // Propiedad para rastrear si la BD ya fue creada

  productoVerf: any = [
    {
      id_producto: '',
      nombre_prod: '',
      precio_prod: '',
      stock_prod: '',
      descripcion_prod: '',
      foto_prod: '',
      estatus: '',
      id_categoria: ''
    }
  ]

  ////////////////////////////////// Creación de las tablas///////////////////////////

  //rol del usuario
  rol_usuario: string = "CREATE TABLE IF NOT EXISTS rol_usuario (id_rol INTEGER PRIMARY KEY autoincrement, nombre_rol VARCHAR(50) NOT NULL);";

  //estado(venta)
  //estado asi como categoria tendra 
  estado: string = "CREATE TABLE IF NOT EXISTS estado (id_estado INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL);";


  //categoria
  categoria: string = "CREATE TABLE IF NOT EXISTS categoria (id_categoria INTEGER PRIMARY KEY autoincrement, nombre_categoria TEXT NOT NULL);";

  //Usuario
  usuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY autoincrement, rut_usuario VARCHAR(20) NOT NULL, nombres_usuario VARCHAR(100) NOT NULL, apellidos_usuario VARCHAR(100) NOT NULL, username VARCHAR(20) NOT NULL, clave VARCHAR(12) NOT NULL, correo VARCHAR(50) NOT NULL, token_recup_clave BOOLEAN NOT NULL, foto_usuario BLOB, estado_user BOOLEAN NOT NULL, userlogged BOOLEAN NOT NULL, mantener_sesion BOOLEAN NOT NULL, id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol_usuario(id_rol));";

  //producto
  producto: string = "CREATE TABLE IF NOT EXISTS producto (id_producto INTEGER PRIMARY KEY autoincrement, nombre_prod VARCHAR(50) NOT NULL, precio_prod INTEGER NOT NULL, stock_prod INTEGER NOT NULL, descripcion_prod TEXT NOT NULL, foto_prod BLOB, estatus BOOLEAN, id_categoria INTEGER, FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria));";

  //venta
  venta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY autoincrement, fecha_venta DATE NOT NULL, total INTEGER NOT NULL, estado_retiro BOOLEAN NOT NULL, id_usuario INTEGER, id_estado INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (id_estado) REFERENCES estado(id_estado));";

  //detalle
  detalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY autoincrement, cantidad_d INTEGER, subtotal INTEGER, id_venta INTEGER, id_producto INTEGER, FOREIGN KEY (id_venta) REFERENCES venta(id_venta), FOREIGN KEY (id_producto) REFERENCES producto(id_producto));";
  //ligado a detallesventa
  //estado_retiro: 0 = listo para retirar /// 1 = retirado

  //reseña
  resecna: string = "CREATE TABLE IF NOT EXISTS resecna (id_resecna INTEGER PRIMARY KEY autoincrement, text_resecna TEXT NOT NULL, id_usuario INTEGER, id_producto INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (id_producto) REFERENCES producto(id_producto));";

  //favoritos(lista de deseos)
  favoritos: string = "CREATE TABLE IF NOT EXISTS favoritos (id_favoritos INTEGER PRIMARY KEY autoincrement, fecha_creacion DATE NOT NULL, id_usuario INTEGER, id_producto INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (id_producto) REFERENCES producto(id_producto));";

  //seguridad (pregunta y respuesta de seguridad)
  seguridad: string = "CREATE TABLE IF NOT EXISTS seguridad (id_seguridad INTEGER PRIMARY KEY autoincrement, pregunta_seguridad TEXT NOT NULL, respuesta_seguridad TEXT NOT NULL, id_usuario INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario));";

  //--------------------------------------------------------------------------------------------------------

  //////////////////////////////////////INSERTS//////////////////////////////////////////////////

  //insert de los roles de usuario
  rolesusuario1: string = "INSERT OR IGNORE INTO rol_usuario (nombre_rol) VALUES ('administrador');";

  rolesusuario2: string = "INSERT OR IGNORE INTO rol_usuario (nombre_rol) VALUES ('cliente');";

  //insert de 1 usuario 

  //user maestro
  registrousuario: string = "INSERT OR IGNORE INTO usuario (rut_usuario, nombres_usuario, apellidos_usuario, username, clave, correo, token_recup_clave, foto_usuario, estado_user, userlogged, mantener_sesion, id_rol) VALUES ('12345678-9', 'Vicente Ignacio', 'Palma Salazar', 'admin', 'Admin123.', 'vicentepalma1202@gmail.com', 0, null, 1, 0, 0, 1);";


  //insert de las categorias de los productos
  categoriasproductos1: string = "INSERT OR IGNORE INTO categoria (nombre_categoria) VALUES ('Juego');";

  categoriasproductos2: string = "INSERT OR IGNORE INTO categoria (nombre_categoria) VALUES('Juguete');";

  categoriasproductos3: string = "INSERT OR IGNORE INTO categoria (nombre_categoria) VALUES('Consola');"

  //estados de la venta
  estadoventa1: string = "INSERT OR IGNORE INTO estado (nombre) VALUES ('carrito');";
  estadoventa2: string ="INSERT OR IGNORE INTO estado (nombre) VALUES ('retiro');"

  //insert valor por defect en tabla seguridad (asi queda ingresado en cada user (o al menos en el admin que se añade solo) la pregunta de seguridad)
  insertoseguridadadmin: string = "INSERT OR IGNORE INTO seguridad (pregunta_seguridad, respuesta_seguridad, id_usuario) VALUES ('¿cual es su color favorito?', 'Tangamandapio', 1);";

  //--------------------------------------------------------------------------------------------------------

  //var para los registros de un select
  listadoUsuarios = new BehaviorSubject([]);
  listadoUsuarioUnico = new BehaviorSubject([]); //por nombre
  listadoUsuarioConectado = new BehaviorSubject([]);

  //esto para traer los datos del usuario cuando este se logge en el sistema

  //select juegos + juwgo unico
  listadoJuegos = new BehaviorSubject([]);
  listadoJuegoUnico = new BehaviorSubject([]);

  //select cjuguete + juguete unico
  listadoJuguetes = new BehaviorSubject([]);
  listadoJugueteUnico = new BehaviorSubject([]);

  //select consola + consola unica
  listadoConsolas = new BehaviorSubject([]);
  listadoConsolaUnico = new BehaviorSubject([]);

  //select resecnas + resecna unica (para borrar)
  listadoResecnas = new BehaviorSubject([]);
  listadoResecnasPorProducto = new BehaviorSubject([]);
  listadoResecnasPorProducto2 = new BehaviorSubject([]);
  listadoResecnasUnica = new BehaviorSubject([]);
  
  //listado favoritos
  listadoValidFavs = new BehaviorSubject([]);
  listadoFavs = new BehaviorSubject([]);

  //venta 
  listadoventa = new BehaviorSubject([]);
  
  //detalle venta
  listadoDetalle_carrito = new BehaviorSubject([]);
  listadoDetalle_valid_stock_0 = new BehaviorSubject([]);

  //seguridad
  listadoSeguridad = new BehaviorSubject([]);

  //var para manipular el estado de la base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertasService: AlertasService, private silentalert: AlertasSilenciosasService) {
    // No llamamos a crearBD aquí
  }

  //funciones retorno de los observables
  fetchUsuarios(): Observable<Usuarios[]> {
    return this.listadoUsuarios.asObservable();
  }

  fetchUsuarioUnico(): Observable<Usuarios[]> {
    return this.listadoUsuarioUnico.asObservable();
  }

  fetchUsuarioConectado(): Observable<Usuarios[]> {
    return this.listadoUsuarioConectado.asObservable();
  }

  fetchJuegos(): Observable<Juegos[]> {
    return this.listadoJuegos.asObservable();
  }
  fetchJuegoUnico(): Observable<Juegos[]> {
    return this.listadoJuegoUnico.asObservable();
  }

  fetchJuguetes(): Observable<Juguetes[]> {
    return this.listadoJuguetes.asObservable();
  }
  fetchJuguetesUnico(): Observable<Juguetes[]> {
    return this.listadoJugueteUnico.asObservable();
  }

  fetchConsolas(): Observable<Consolas[]> {
    return this.listadoConsolas.asObservable();
  }
  fetchConsolaUnico(): Observable<Consolas[]> {
    return this.listadoConsolaUnico.asObservable();
  }

  fetchSeguridad(): Observable<Seguridad[]> {
    return this.listadoSeguridad.asObservable();
  }

  fetchResecnas(): Observable<Resecnascrud[]> {
    return this.listadoResecnas.asObservable();
  }

  fetchResecnasPorProducto(): Observable<Resecnasyuser[]> {
    return this.listadoResecnasPorProducto.asObservable();
  }

  fetchResecnasPorProducto2(): Observable<Resecnasyuser[]> {
    return this.listadoResecnasPorProducto2.asObservable();
  }

  fetchResecnasUnica(): Observable<Resecnas[]> {
    return this.listadoResecnasUnica.asObservable();
  }

  fetchCarrito(): Observable<Detallesventa[]> {
    return this.listadoDetalle_carrito.asObservable();
  }

  fetchValidStock0(): Observable<Detallesventa[]> {
    return this.listadoDetalle_valid_stock_0.asObservable();
  }

  fetchVenta(): Observable<Venta[]> {
    return this.listadoventa.asObservable();
  }

  fetchValidFavs(): Observable<Favsvan[]> {
    return this.listadoValidFavs.asObservable();
  }

  fetchFavs(): Observable<Favs[]> {
    return this.listadoFavs.asObservable();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  async crearBD() {
    if (this.dbCreated) return; // Verifica si la base de datos ya fue creada

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'megagames30.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.creartablas();
        this.isDBReady.next(true);
        this.dbCreated = true; // Marca que la base de datos fue creada
      }).catch(e => {
        this.alertasService.presentAlert("Creación de BD", "Error creando la BD: " + JSON.stringify(e)); // Alerta de error
      });
    });
  }

  async creartablas() {
    try {
      //se espera a que se terminen de generar las respectivas tablas
      await this.database.executeSql(this.rol_usuario, []);
      await this.database.executeSql(this.estado, []);
      await this.database.executeSql(this.categoria, []);
      await this.database.executeSql(this.usuario, []);
      await this.database.executeSql(this.producto, []);
      await this.database.executeSql(this.venta, []);
      await this.database.executeSql(this.detalle, []);
      await this.database.executeSql(this.resecna, []);
      await this.database.executeSql(this.favoritos, []);
      await this.database.executeSql(this.seguridad, []);

      // Verificar si ya existe el usuario 'admin'
      const res = await this.database.executeSql('SELECT * FROM usuario WHERE username = "admin"', []);
      if (res.rows.length === 0) { // Solo insertar si no existe
        await this.database.executeSql(this.rolesusuario1, []);
        await this.database.executeSql(this.rolesusuario2, []);
        await this.database.executeSql(this.registrousuario, []);
        await this.database.executeSql(this.categoriasproductos1, []);
        await this.database.executeSql(this.categoriasproductos2, []);
        await this.database.executeSql(this.categoriasproductos3, []);
        await this.database.executeSql(this.insertoseguridadadmin, []);
        await this.database.executeSql(this.estadoventa1, []);
        await this.database.executeSql(this.estadoventa2, []);
        
      }

      // Actualizar la lista de usuarios después de insertar
      this.consultarUsuarios(); // Llamar a consultarUsuarios para refrescar la interfaz
      this.consultarJuegos();
      this.consultarJuguetes();
      this.consultarConsolas();

    } catch (e) {
      this.alertasService.presentAlert("Creación de tabla", "Error creando las tablas: " + JSON.stringify(e));
    }
  }

  ///////////////////////////////CRUD COMPLETO PARA LOS USUARIOS//////////////////////////////////

  //select * de todos los usuarios
  async consultarUsuarios() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //variable para almacenar el resultado de la consulta
      let itemsU: Usuarios[] = [];
      //verificar si hay registros en la consulta
      if (res.rows.length > 0) {
        //se recorren los resultados
        for (var i = 0; i < res.rows.length; i++) {
          //se agrega el registro a mi variable (itemsU)
          itemsU.push({
            id_usuario: res.rows.item(i).id_usuario,
            rut_usuario: res.rows.item(i).rut_usuario,
            nombres_usuario: res.rows.item(i).nombres_usuario,
            apellidos_usuario: res.rows.item(i).apellidos_usuario,
            username: res.rows.item(i).username,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            token_recup_clave: res.rows.item(i).token_recup_clave,
            foto_usuario: res.rows.item(i).foto_usuario,
            estado_user: res.rows.item(i).estado_user,
            userlogged: res.rows.item(i).userlogged,
            mantener_sesion: res.rows.item(i).mantener_sesion,
            id_rol: res.rows.item(i).id_rol
          })
        }
      }
      this.listadoUsuarios.next(itemsU as any);
    })
  }



  //busca a los usuarios por su username (nombre de usuario)
  async consultarUsuariosPorUsername(user: any) {
    return this.database.executeSql('SELECT * FROM usuario WHERE username = ?', [user]).then(res => {
      //variable para almacenar el resultado de la consulta
      let itemsUPP: Usuarios[] = [];
      //verificar si hay registros en la consulta
      if (res.rows.length > 0) {
        //se recorren los resultados
        for (var i = 0; i < res.rows.length; i++) {
          //se agrega el registro a mi variable (itemsU)
          itemsUPP.push({
            id_usuario: res.rows.item(i).id_usuario,
            rut_usuario: res.rows.item(i).rut_usuario,
            nombres_usuario: res.rows.item(i).nombres_usuario,
            apellidos_usuario: res.rows.item(i).apellidos_usuario,
            username: res.rows.item(i).username,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            token_recup_clave: res.rows.item(i).token_recup_clave,
            foto_usuario: res.rows.item(i).foto_usuario,
            estado_user: res.rows.item(i).estado_user,
            userlogged: res.rows.item(i).userlogged,
            mantener_sesion: res.rows.item(i).mantener_sesion,
            id_rol: res.rows.item(i).id_rol
          })
        }
      }
      this.listadoUsuarioUnico.next(itemsUPP as any);
    })
  }

  async consultarUsuarioPorNombre(nombreUsuario: string): Promise<any> {
    const query = 'SELECT * FROM usuario WHERE username = ?'; // Ajusta la tabla y columna según tu esquema
    const result = await this.database.executeSql(query, [nombreUsuario]);
    return result.rows.length > 0 ? result.rows.item(0) : null; // Devuelve el primer usuario encontrado o null
  }


  //verifica y valida el login 
  async consultarUsuariosLoggin(user: any, clave: any): Promise<boolean> {
    return this.database.executeSql('SELECT * FROM usuario WHERE username = ? AND clave = ?', [user, clave]).then(res => {
      let itemsUL: Usuarios[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          itemsUL.push({
            id_usuario: res.rows.item(i).id_usuario,
            rut_usuario: res.rows.item(i).rut_usuario,
            nombres_usuario: res.rows.item(i).nombres_usuario,
            apellidos_usuario: res.rows.item(i).apellidos_usuario,
            username: res.rows.item(i).username,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            token_recup_clave: res.rows.item(i).token_recup_clave,
            foto_usuario: res.rows.item(i).foto_usuario,
            estado_user: res.rows.item(i).estado_user,
            userlogged: res.rows.item(i).userlogged,
            mantener_sesion: res.rows.item(i).mantener_sesion,
            id_rol: res.rows.item(i).id_rol
          });
        }
        this.listadoUsuarioUnico.next(itemsUL as any);
        return true; // Usuario encontrado
      } else {
        return false; // No se encontró usuario
      }
    });
  }


  async validarUsuarioBaneado(username: string): Promise<boolean> {
    return this.database.executeSql('SELECT * FROM usuario WHERE username = ?', [username]).then(res => {
        // Verificar si hay registros en la consulta
        if (res.rows.length > 0) {
            const user = res.rows.item(0); // Solo tomamos el primer registro

            // Verificar si el usuario está baneado
            if (user.estado_user === 0) {
                // Si está baneado, lanzar alerta
                this.alertasService.presentAlert("Usuario Baneado", "Su cuenta ha sido baneada.");
                return false; // Retornar false si está baneado
            }

            return true; // Retornar true si no está baneado
        }
        
        return false; // Retornar false si no se encuentra el usuario
    }).catch(error => {
        this.alertasService.presentAlert("ERROR", "Error al buscar el usuario: " + error);
        return false; // Retornar false en caso de error
    });
}

  async consultarUsuariosPorEstado(): Promise<Usuarios[]> {
    return this.database.executeSql('SELECT * FROM usuario WHERE estado_user = 1', []).then(res => {
      let items: Usuarios[] = []; // Asegúrate de que Usuarios sea el tipo correcto
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            rut_usuario: res.rows.item(i).rut_usuario,
            nombres_usuario: res.rows.item(i).nombres_usuario,
            apellidos_usuario: res.rows.item(i).apellidos_usuario,
            username: res.rows.item(i).username,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            token_recup_clave: res.rows.item(i).token_recup_clave,
            foto_usuario: res.rows.item(i).foto_usuario,
            estado_user: res.rows.item(i).estado_user,
            userlogged: res.rows.item(i).userlogged,
            mantener_sesion: res.rows.item(i).mantener_sesion,
            id_rol: res.rows.item(i).id_rol
          });
        }
      }
      return items; // Retorna el arreglo de usuarios
    }).catch(error => {
      return []; // Retorna un arreglo vacío en caso de error
    });
  }

  async consultarUsuariosPorEstadoConectado(): Promise<Usuarios[]> {
    return this.database.executeSql('SELECT * FROM usuario WHERE userlogged = 1', []).then(res => {
      let itemsUPEC: Usuarios[] = [];
  
      if (res.rows.length > 0) {
        itemsUPEC.push(res.rows.item(0)); // Solo queremos el primer usuario conectado
      }
      return itemsUPEC; // Retorna el arreglo de usuarios
    }).catch(error => {
      return []; // Retorna un arreglo vacío en caso de error
    });
  }

  async consultarUsuariosPorMantenerSesion(): Promise<Usuarios[]> { 
    return this.database.executeSql('SELECT * FROM usuario WHERE mantener_sesion= 1', []).then(res => {
      let itemsUPMS: Usuarios[] = [];
      if (res.rows.length > 0) {
        itemsUPMS.push(res.rows.item(0)); // Solo queremos el primer usuario conectado
      }
      return itemsUPMS; // Retorna el arreglo de usuarios
    }).catch(error => {
      return []; // Retorna un arreglo vacío en caso de error
    });
  }

  async obtenerUsuarioLogueado(): Promise<any> {
    try {
      const sql = 'SELECT * FROM usuario WHERE userlogged = 1';
      const result = await this.database.executeSql(sql, []);
      if (result.rows.length > 0) {
        return result.rows.item(0); // Retorna el primer usuario logueado
      } else {
        return null; // No hay ningún usuario logueado
      }
    } catch (error) {
      console.error('Error obteniendo usuario logueado:', error);
      return null;
    }
  }

  

  async cerrarSesion(): Promise<void> {
    return this.database.executeSql('UPDATE usuario SET userlogged = 0, mantener_sesion = 0 WHERE userlogged = 1', [])
      .then(() => {
        //ya no va alarma ya que sencilla y unicamente se cerraran las sesiones que no eligieron quedar activas, al iniciar la app
      })
      .catch(error => {
        this.alertasService.presentAlert("ERROR", 'Error al actualizar el estado de usuario: ' + error);
        throw error; // Rechaza la promesa en caso de error
      });
  }


  //valida el uusario loggeado
  async actualizarEstadoUsuario(username: any): Promise<void> {
    return this.database.executeSql('UPDATE usuario SET userlogged = ? WHERE username = ?', [1, username])
      .then(() => {
      })
      .catch(error => {
      });
  }

  //actualiza el estado del usuario
  async actualizarEstadoUsuario2(): Promise<void> {
    return this.database.executeSql('UPDATE usuario SET userlogged = ? WHERE userlogged = 1 AND userlogged = 0', [0])
      .then(() => {
      })
      .catch(error => {
      });
  }


  //activa que el usuario quede con sesion iniciada
  async MantenerSesionIniciada(username: any): Promise<void> {
    return this.database.executeSql('UPDATE usuario SET mantener_sesion = ? WHERE username = ?', [1, username])
      .then(() => {
        this.alertasService.presentAlert("CAMBIADO","SESION MANTENIDA");
      })
      .catch(error => {
      });
  }


  //deshace lo de arriba xd
  async DesactivarMantenerSesionIniciada(username: any): Promise<void> {
    return this.database.executeSql('UPDATE usuario SET mantener_sesion = ? WHERE username = ?', [0, username])
      .then(() => {
        this.alertasService.presentAlert("CAMBIADO","SESION NO MANTENIDA");
      })
      .catch(error => {
      });
  }

  //consulta por el usuario que eligio mantener su sesion iniciada
  async obtenerUsuarioConSesionActiva(): Promise<any> {
    return this.database.executeSql('SELECT * FROM usuario WHERE mantener_sesion = 1 LIMIT 1', [])
      .then((data) => {
        if (data.rows.length > 0) {
          return data.rows.item(0); // Devuelve el primer usuario que tenga la sesión activa
        } else {
          return null; // No hay usuarios con sesión activa
        }
      })
      .catch(error => {
        console.error('Error al obtener usuario con sesión activa:', error);
        return null;
      });
  }


  
  //verifica que el nombre de usuario no este ocupado por otro usuario al registrarse 
  async verificarUsuarioExistente(username: any): Promise<boolean> {
    return this.database.executeSql('SELECT * FROM usuario WHERE username = ?', [username]).then(res => {
      // Retorna true si hay algún usuario con ese username, false si no hay
      return res.rows.length > 0;
    }).catch(error => {
      return false; // Devuelve false en caso de error
    });
  }

  // Verifica que el nombre de usuario no esté ocupado por otro usuario al registrarse 
  async verificarUsuarioExistente2(username: any): Promise<any> {
    return this.database.executeSql('SELECT * FROM usuario WHERE username = ?', [username]).then(res => {
        // Retorna el usuario si hay algún registro, o null si no hay
        return res.rows.length > 0 ? res.rows.item(0) : null; // Devuelve el primer usuario encontrado o null
    }).catch(error => {
        console.error('Error al verificar usuario:', error);
        return null; // Devuelve null en caso de error
    });
  }

  // Verifica que el correo de un usuario no esté ocupado por otro usuario al registrarse 
  async verificarCorreoExistente(correoU: string): Promise<boolean> {
    try {
      const res = await this.database.executeSql('SELECT * FROM usuario WHERE correo = ?', [correoU]);
      // Retorna true si hay al menos un registro, false si no
      return res.rows.length > 0;
    } catch (error) {
      this.alertasService.presentAlert('Error al verificar correo:', 'ERROR: ' + error);
      return false; // Devuelve false en caso de error
    }
  }


  //modificacion de usuarios como cliente
  //solo se permite cambiar nombres, apellidos y la foto de perfil,
  // username, rut y correo quedan FIJOS
  async modificarUsuariosCliente(idU: any, nombresU: any, apellidosU: any, fotoU: any) {

    // Lógica para modificar usuarios
    try {
        await this.database.executeSql(
            'UPDATE usuario SET nombres_usuario = ?, apellidos_usuario = ?, foto_usuario = ? WHERE id_usuario = ?',
            [nombresU, apellidosU, fotoU, idU]
        );
        // Se añade la alerta
        await this.alertasService.presentAlert("Éxito", "Datos Actualizados");
        // Se llama al select para mostrar la lista actualizada
        this.consultarUsuarios(); // Asegúrate de que este método esté definido
    } catch (e) {
        await this.alertasService.presentAlert("Error", "Error al modificar el usuario: " + e);
    }
  }

 // Añadir usuario cliente (REGISTRO)
// Añadir usuario cliente (REGISTRO)
async agregarUsuariosCliente(rutU: any, nombresU: any, apellidosU: any, userU: any, claveU: any, correoU: any, respuestaSeguridad: string) {
  try {
    // Lógica para agregar usuarios, aplicando trim() solo en los campos de texto
    const result = await this.database.executeSql(
      'INSERT OR IGNORE INTO usuario (rut_usuario, nombres_usuario, apellidos_usuario, username, clave, correo, token_recup_clave, foto_usuario, estado_user, userlogged, mantener_sesion, id_rol) VALUES (?, ?, ?, ?, ?, ?, 0, null, 1, 0, 0, 2)', 
      [rutU.trim(), nombresU.trim(), apellidosU.trim(), userU.trim(), claveU.trim(), correoU.trim()]
    );

    // Se añade la alerta
    this.alertasService.presentAlert("Agregar", "Usuario Agregado");

    // Obtener el ID del usuario recién creado
    const userId = await this.consultarUsuarioPorNombre(userU.trim());

    // Agregar respuesta de seguridad
    if (userId) {
      await this.database.executeSql(
        'INSERT OR IGNORE INTO seguridad (pregunta_seguridad, respuesta_seguridad, id_usuario) VALUES (?, ?, ?)', 
        ['¿cual es su color favorito?', respuestaSeguridad, userId.id_usuario]
      );
    }

    // Se llama al select para mostrar la lista actualizada
    this.consultarUsuarios();
  } catch (e) {
    this.alertasService.presentAlert("Agregar", "Error: " + JSON.stringify(e));
  }
}

// Añadir usuario (panel admin)
// Añadir usuario (panel admin)
async agregarUsuariosAdmin(
  rutU: any,
  nombresU: any,
  apellidosU: any,
  userU: any,
  claveU: any,
  correoU: any,
  fotoU: any,
  estadoU: any,
  id_rolU: any,
  respuestaSeguridad: any // Nueva variable para la respuesta de seguridad
) {
  try {
    // Normalizar los campos de texto eliminando espacios extra
    rutU = rutU.trim();
    nombresU = nombresU.trim();
    apellidosU = apellidosU.trim();
    userU = userU.trim();
    claveU = claveU.trim();
    correoU = correoU.trim();
    respuestaSeguridad = respuestaSeguridad.trim(); // Limpiar respuesta de seguridad

    // Verificar si ya existe un usuario con el mismo nombre de usuario
    const resultado = await this.database.executeSql(
      'SELECT COUNT(*) AS count FROM usuario WHERE TRIM(REPLACE(username, "  ", " ")) = ?',
      [userU]
    );

    if (resultado.rows.item(0).count > 0) {
      this.alertasService.presentAlert("Agregar", "Ya existe un usuario con ese nombre de usuario");
      return; // No se agrega si ya existe
    }

    // Ejecutar la consulta para agregar el usuario
    await this.database.executeSql(
      'INSERT OR IGNORE INTO usuario (rut_usuario, nombres_usuario, apellidos_usuario, username, clave, correo, token_recup_clave, foto_usuario, estado_user, userlogged, mantener_sesion, id_rol) VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, 0, 0, ?)', 
      [rutU, nombresU, apellidosU, userU, claveU, correoU, fotoU, estadoU, id_rolU]
    );

    // Obtener el ID del último usuario agregado
    const lastId = await this.database.executeSql('SELECT last_insert_rowid() AS id', []);
    const idUsuario = lastId.rows.item(0).id; // ID del usuario recién agregado

    // Agregar la respuesta de seguridad
    await this.database.executeSql(
      'INSERT INTO seguridad (pregunta_seguridad, respuesta_seguridad, id_usuario) VALUES (?, ?, ?)',
      ['¿Cuál es tu color favorito?', respuestaSeguridad, idUsuario]
    );

    // Presentar alerta solo si se agregó el usuario
    this.alertasService.presentAlert("Agregar", "Usuario Agregado");
    await this.consultarUsuarios(); // Asegúrate de que esta función retorne una promesa
  } catch (e) {
    this.alertasService.presentAlert("Agregar", "Error: " + JSON.stringify(e));
  }
}


//como admin editar usuarios
async modificarUsuarioConSeguridadAdmin(idU: any, rutU: any, nombresU: any, apellidosU: any, userU: any, claveU: any, correoU: any, fotoU: any, estadoU: any, rolU: any, respuestaSeguridad: any) {
  // Evitar modificación del administrador principal
  if (idU === 1) {
      return this.alertasService.presentAlert("ERROR", "NO PUEDE MODIFICAR al ADMINISTRADOR PRINCIPAL");
  }
  // Validar campos obligatorios antes de proceder
  const camposObligatorios = [rutU, nombresU, apellidosU, userU, claveU, correoU];
  if (camposObligatorios.some(campo => !campo)) {
      return this.alertasService.presentAlert("ERROR", "Todos los campos obligatorios deben ser completados.");
  }
  // Lógica para modificar usuarios con trim() solo en los campos de texto
  try {
      // Actualizar información del usuario
      await this.database.executeSql(
          'UPDATE usuario SET rut_usuario = ?, nombres_usuario = ?, apellidos_usuario = ?, username = ?, clave = ?, correo = ?, foto_usuario = ?, estado_user = ?, id_rol = ? WHERE id_usuario = ?',
          [rutU.trim(), nombresU.trim(), apellidosU.trim(), userU.trim(), claveU.trim(), correoU.trim(), fotoU, estadoU, rolU, idU]
      );
      // Actualizar o agregar la respuesta de seguridad
      const respuestaSeguridadExistente = await this.database.executeSql('SELECT * FROM seguridad WHERE id_usuario = ?', [idU]);
      if (respuestaSeguridadExistente.rows.length > 0) {
          // Si ya existe una respuesta de seguridad, actualizarla
          await this.database.executeSql(
              'UPDATE seguridad SET pregunta_seguridad = ?, respuesta_seguridad = ? WHERE id_usuario = ?',
              ['¿Cuál es su color favorito?', respuestaSeguridad.trim(), idU]
          );
      } else {
          // Si no existe, insertar una nueva entrada en la tabla de seguridad
          await this.database.executeSql(
              'INSERT INTO seguridad (pregunta_seguridad, respuesta_seguridad, id_usuario) VALUES (?, ?, ?)',
              ['¿Cuál es su color favorito?', respuestaSeguridad.trim(), idU]
          );
      }
      // Se añade la alerta
      await this.alertasService.presentAlert("Éxito", "Usuario modificado correctamente");
      // Se llama al select para mostrar la lista actualizada
      this.consultarUsuarios(); // Asegúrate de que este método esté definido
  } catch (e) {
      await this.alertasService.presentAlert("Error", "Error al modificar el usuario: " + e);
  }
}

async eliminarUsuarios(idU: any) {
  // Obtener el usuario logueado
  const usuarioLogueado = await this.obtenerUsuarioLogueado();

  if (usuarioLogueado === null) {
    return this.alertasService.presentAlert("ERROR", "No se pudo verificar el usuario logueado.");
  }

  if (idU === 1) {
    // Si el usuario que se intenta eliminar es el administrador principal (id 1)
    return this.alertasService.presentAlert("ERROR", "NO PUEDE ELIMINAR AL ADMINISTRADOR PRINCIPAL");
  } else if (idU === usuarioLogueado.id_usuario) {
    // Si el usuario que se intenta eliminar es el mismo que está logueado
    return this.alertasService.presentAlert("ERROR", "NO PUEDE ELIMINAR SU PROPIA CUENTA MIENTRAS ESTÁ LOGUEADO");
  } else {
    // Procede con la eliminación de otros usuarios
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?', [idU]).then(res => {
      // Mostrar alerta de éxito
      this.alertasService.presentAlert("Eliminar", "Usuario eliminado");
      this.consultarUsuarios(); // Refrescar la lista de usuarios
    }).catch(e => {
      // Mostrar alerta de error en caso de fallo
      this.alertasService.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
    });
  }
}


  ////////////////////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////crud completo PRODUCTOS//////////////////////////////////////////////

  //OBTENER PRODUCTO POR ID (funcion del producto unico)
  // Método para obtener un producto específico por su ID

  //se realizara un select * para cada producto 
  async consultarJuegoPorId(id_producto: string): Promise<Juegos | null> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM juegos WHERE id_producto = ?';
      this.database.executeSql(query, [id_producto])
        .then(data => {
          if (data.rows.length > 0) {
            resolve(data.rows.item(0)); // Retorna el juego encontrado
          } else {
            resolve(null); // Retorna null si no se encuentra
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }



  //-----------------------------------------------------------

  async consultarJuguetePorId(idjugueteU: any) {
    try {
        const resp = await this.database.executeSql(
            'SELECT id_producto, nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria FROM producto WHERE id_producto = ?',
            [idjugueteU]
        );

        let itemsJGTU: Juguetes[] = [];
        if (resp.rows.length > 0) {
            for (var i = 0; i < resp.rows.length; i++) {
                itemsJGTU.push({
                    id_producto: resp.rows.item(i).id_producto,
                    nombre_prod: resp.rows.item(i).nombre_prod,
                    precio_prod: resp.rows.item(i).precio_prod,
                    stock_prod: resp.rows.item(i).stock_prod,
                    descripcion_prod: resp.rows.item(i).descripcion_prod,
                    foto_prod: resp.rows.item(i).foto_prod,
                    estatus: resp.rows.item(i).estatus,
                    id_categoria: resp.rows.item(i).id_categoria,
                });
            }
        }
        return itemsJGTU.length > 0 ? itemsJGTU[0] : null; // Retornar el primer elemento o null si no hay resultados
    } catch (error) {
        return null; // Retornar null en caso de error
    }
}


  //---------------------------------------------------------------------------

  async consultarConsolaPorId(idConsolaU: any) {
    try {
        const resp = await this.database.executeSql(
            'SELECT id_producto, nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria FROM producto WHERE id_producto = ?',
            [idConsolaU]
        );

        let itemsConsola: any[] = [];
        if (resp.rows.length > 0) {
            for (let i = 0; i < resp.rows.length; i++) {
                itemsConsola.push({
                    id_producto: resp.rows.item(i).id_producto,
                    nombre_prod: resp.rows.item(i).nombre_prod,
                    precio_prod: resp.rows.item(i).precio_prod,
                    stock_prod: resp.rows.item(i).stock_prod,
                    descripcion_prod: resp.rows.item(i).descripcion_prod,
                    foto_prod: resp.rows.item(i).foto_prod,
                    estatus: resp.rows.item(i).estatus,
                    id_categoria: resp.rows.item(i).id_categoria,
                });
            }
        }
        return itemsConsola.length > 0 ? itemsConsola[0] : null; // Retorna el primer elemento o null si no hay resultados.
    } catch (error) {
        console.error('Error al consultar consola:', error);
        return null; // Retorna null en caso de error.
    }
}



  //------------------------------------------------------------------------------


  async consultarProdsCarro(id_producto: any, idVenta: any): Promise<boolean> {
    try {
      const query = 'SELECT * FROM detalle WHERE id_producto = ? AND id_venta = ?';
      const data = await this.database.executeSql(query, [id_producto, idVenta]);
      return data.rows.length > 0; // Devuelve true si encuentra el producto
    } catch (error) {
      console.error('Error al consultar el producto en el carrito:', error);
      return false; // En caso de error, devolvemos false
    }
  }


  
  //------------------------------------------------------------------------

  async consultarProductoPorId(idProducto: any) {
    try {
        const resp = await this.database.executeSql(
            'SELECT id_producto, nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria FROM producto WHERE id_producto = ?',
            [idProducto]
        );

        let itemsP: Productos[] = [];
        if (resp.rows.length > 0) {
            for (var i = 0; i < resp.rows.length; i++) {
              itemsP.push({
                    id_producto: resp.rows.item(i).id_producto,
                    nombre_prod: resp.rows.item(i).nombre_prod,
                    precio_prod: resp.rows.item(i).precio_prod,
                    stock_prod: resp.rows.item(i).stock_prod,
                    descripcion_prod: resp.rows.item(i).descripcion_prod,
                    foto_prod: resp.rows.item(i).foto_prod,
                    estatus: resp.rows.item(i).estatus,
                    id_categoria: resp.rows.item(i).id_categoria,
                });
            }
        }
        return itemsP;
    } catch (error) {
        return null; // Retornar null en caso de error
    }
}


  ////////--JUEGOS/////////////////////////////////////////////////////////////
  async consultarJuegos() {
    try {
      const resp = await this.database.executeSql('SELECT id_producto, nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria FROM producto WHERE id_categoria = 1', []);
      const itemsP: Juegos[] = [];
      if (resp.rows.length > 0) {
        for (let i = 0; i < resp.rows.length; i++) {
          itemsP.push({
            id_producto: resp.rows.item(i).id_producto,
            nombre_prod: resp.rows.item(i).nombre_prod,
            precio_prod: resp.rows.item(i).precio_prod,
            stock_prod: resp.rows.item(i).stock_prod,
            descripcion_prod: resp.rows.item(i).descripcion_prod,
            foto_prod: resp.rows.item(i).foto_prod,
            estatus: resp.rows.item(i).estatus,
            id_categoria: resp.rows.item(i).id_categoria
          });
        }
      } 
      this.listadoJuegos.next(itemsP as any);
    } catch (error) {
      
    }
  }


  async agregarJuegos(nombre_prod: string, precio_prod: number, stock_prod: number, descripcion_prod: string, foto_prod: any): Promise<void> {
    try {
      // Normalizar el nombre del producto eliminando espacios extra
      nombre_prod = nombre_prod.trim().replace(/\s+/g, ' ');

      // Verificar si ya existe un producto con el mismo nombre
      const resultado = await this.database.executeSql(
        'SELECT COUNT(*) AS count FROM producto WHERE TRIM(REPLACE(nombre_prod, "  ", " ")) = ?',
        [nombre_prod]
      );

      if (resultado.rows.item(0).count > 0) {
        this.alertasService.presentAlert("Agregar", "Ya existe un juego con ese nombre");
        return; // No se agrega si ya existe
      }

      /* Ejecutar la consulta para agregar el juego
      await this.database.executeSql(
        'INSERT OR IGNORE INTO producto (nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria) VALUES (?, ?, ?, ?, ?, 1, 1);',
        [nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod]
      ); */

      if (stock_prod === 0) {
        // Ejecutar la consulta para agregar el juego con estatus 2 si stock_prod es 0
        await this.database.executeSql(
          'INSERT OR IGNORE INTO producto (nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria) VALUES (?, ?, ?, ?, ?, 0, 1);',
          [nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod]
        );
      } else {
        // Ejecutar la consulta para agregar el juego con estatus 1 si stock_prod es mayor que 0
        await this.database.executeSql(
          'INSERT OR IGNORE INTO producto (nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria) VALUES (?, ?, ?, ?, ?, 1, 1);',
          [nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod]
        );
      }

      // Presentar alerta solo si se agregó el juego
      this.alertasService.presentAlert("Agregar", "Juego Agregado");
      await this.consultarJuegos(); // Asegúrate de que esta función retorne una promesa
    } catch (e) {
      this.alertasService.presentAlert("Agregar", "Error: " + JSON.stringify(e));
    }
  }




  async modificarJuego(idJ: any, nomJ: any, precioJ: any, stockJ: any, descripJ: any, fotoJ: any, estatusJ: any): Promise<void> {
    try {
      // Normalizar el nombre del juego eliminando espacios extra
      nomJ = nomJ.trim().replace(/\s+/g, ' ');
  
      // Verificar si ya existe otro juego con el mismo nombre (excepto el actual)
      const resultado = await this.database.executeSql(
        'SELECT COUNT(*) AS count FROM producto WHERE TRIM(REPLACE(nombre_prod, "  ", " ")) = ? AND id_categoria = 1 AND id_producto != ?',
        [nomJ, idJ]
      );
  
      if (resultado.rows.item(0).count > 0) {
        this.alertasService.presentAlert("Modificar", "Ya existe un juego con ese nombre. Por favor, elige otro.");
        return; // No se modifica si ya existe otro juego con el mismo nombre
      }
  
      // Ejecutar la consulta para modificar el juego
      await this.database.executeSql(
        'UPDATE producto SET nombre_prod = ?, precio_prod = ?, stock_prod = ?, descripcion_prod = ?, foto_prod = ?, estatus = ?, id_categoria = 1 WHERE id_producto = ?',
        [nomJ, precioJ, stockJ, descripJ, fotoJ, estatusJ, idJ]
      );
  
      // Presentar alerta si se modificó el juego
      this.alertasService.presentAlert("Modificar", "Juego Modificado");
      await this.consultarJuegos(); // Asegúrate de que esta función retorne una promesa
    } catch (e) {
      this.alertasService.presentAlert("Modificar", "Error: " + JSON.stringify(e));
    }
  }


  async eliminarJuegos(idJ: any) {
    try {
      await this.database.transaction(async (tx) => {
        await tx.executeSql('DELETE FROM producto WHERE id_producto = ?', [idJ]);
      });
      this.alertasService.presentAlert("Eliminar", "Juego eliminado");
      this.consultarJuegos();
    } catch (e) {
      this.alertasService.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
      
    }
  }



  //---------------------------CRUD DE JUGUETES----------------------------------------------

  //////////--JUGUETES
  async consultarJuguetes() {
    try {
      const resp = await this.database.executeSql('SELECT id_producto, nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria FROM producto WHERE id_categoria = 2', []);
      const itemsJGT: Juguetes[] = [];
      if (resp.rows.length > 0) {
        for (let i = 0; i < resp.rows.length; i++) {
          itemsJGT.push({
            id_producto: resp.rows.item(i).id_producto,
            nombre_prod: resp.rows.item(i).nombre_prod,
            precio_prod: resp.rows.item(i).precio_prod,
            stock_prod: resp.rows.item(i).stock_prod,
            descripcion_prod: resp.rows.item(i).descripcion_prod,
            foto_prod: resp.rows.item(i).foto_prod,
            estatus: resp.rows.item(i).estatus,
            id_categoria: resp.rows.item(i).id_categoria
          });
        }
      }
      this.listadoJuguetes.next(itemsJGT as any);
    } catch (error) {
    }
  }

  async agregarJuguetes(nombre_prod: string, precio_prod: number, stock_prod: number, descripcion_prod: string, foto_prod: any): Promise<void> {
    try {
      // Normalizar el nombre del juguete eliminando espacios extra
      nombre_prod = nombre_prod.trim().replace(/\s+/g, ' ');
  
      // Verificar si ya existe un juguete con el mismo nombre
      const resultado = await this.database.executeSql(
        'SELECT COUNT(*) AS count FROM producto WHERE TRIM(REPLACE(nombre_prod, "  ", " ")) = ? AND id_categoria = 2',
        [nombre_prod]
      );
  
      if (resultado.rows.item(0).count > 0) {
        this.alertasService.presentAlert("Agregar", "Ya existe un juguete con ese nombre");
        return; // No se agrega si ya existe
      }
  
      // Ejecutar la consulta para agregar el juguete
      await this.database.executeSql(
        'INSERT OR IGNORE INTO producto (nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria) VALUES (?, ?, ?, ?, ?, 1, 2);',
        [nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod]
      );
  
      // Presentar alerta solo si se agregó el juguete
      this.alertasService.presentAlert("Agregar", "Juguete Agregado");
      await this.consultarJuguetes(); // Asegúrate de que esta función retorne una promesa
    } catch (e) {
      this.alertasService.presentAlert("Agregar", "Error: " + JSON.stringify(e));
    }
  }
  

  async modificarJuguete(idJ: any, nomJ: any, precioJ: any, stockJ: any, descripJ: any, fotoJ: any, estatusJ: any): Promise<void> {
    try {
      // Normalizar el nombre del juguete eliminando espacios extra
      nomJ = nomJ.trim().replace(/\s+/g, ' ');
  
      // Verificar si ya existe otro juguete con el mismo nombre (excepto el actual)
      const resultado = await this.database.executeSql(
        'SELECT COUNT(*) AS count FROM producto WHERE TRIM(REPLACE(nombre_prod, "  ", " ")) = ? AND id_categoria = 2 AND id_producto != ?',
        [nomJ, idJ]
      );
  
      if (resultado.rows.item(0).count > 0) {
        this.alertasService.presentAlert("Modificar", "Ya existe un juguete con ese nombre. Por favor, elige otro.");
        return; // No se modifica si ya existe otro juguete con el mismo nombre
      }
      // Ejecutar la consulta para modificar el juguete
      await this.database.executeSql(
        'UPDATE producto SET nombre_prod = ?, precio_prod = ?, stock_prod = ?, descripcion_prod = ?, foto_prod = ?, estatus = ?, id_categoria = 2 WHERE id_producto = ?',
        [nomJ, precioJ, stockJ, descripJ, fotoJ, estatusJ, idJ]
      );
  
      // Presentar alerta si se modificó el juguete
      this.alertasService.presentAlert("Modificar", "Juguete Modificado");
      await this.consultarJuguetes(); // Asegúrate de que esta función retorne una promesa
    } catch (e) {
      this.alertasService.presentAlert("Modificar", "Error: " + JSON.stringify(e));
    }
  }


    async eliminarJuguete(idJGT: any) {
      try {
        await this.database.executeSql('DELETE FROM producto WHERE id_producto = ?', [idJGT]);
        this.alertasService.presentAlert("Eliminar", "Juguete eliminado");
        await this.consultarJuguetes();
      } catch (e) {
        this.alertasService.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
      }
    }



  //---------------------------CRUD DE CONSOLAS----------------------------------------------

  //////////--CONSOLAS
async consultarConsolas() {
  try {
    const resp = await this.database.executeSql('SELECT id_producto, nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria FROM producto WHERE id_categoria = 3', []);
    const itemsC: Consolas[] = [];
    if (resp.rows.length > 0) {
      for (let i = 0; i < resp.rows.length; i++) {
        itemsC.push({
          id_producto: resp.rows.item(i).id_producto,
          nombre_prod: resp.rows.item(i).nombre_prod,
          precio_prod: resp.rows.item(i).precio_prod,
          stock_prod: resp.rows.item(i).stock_prod,
          descripcion_prod: resp.rows.item(i).descripcion_prod,
          foto_prod: resp.rows.item(i).foto_prod,
          estatus: resp.rows.item(i).estatus,
          id_categoria: resp.rows.item(i).id_categoria
        });
      }
    }
    this.listadoConsolas.next(itemsC as any);
  } catch (error) {
  }
}

async agregarConsola(nombre_prod: string, precio_prod: number, stock_prod: number, descripcion_prod: string, foto_prod: any): Promise<void> {
  try {
    // Normalizar el nombre de la consola eliminando espacios extra
    nombre_prod = nombre_prod.trim().replace(/\s+/g, ' ');

    // Verificar si ya existe una consola con el mismo nombre
    const resultado = await this.database.executeSql(
      'SELECT COUNT(*) AS count FROM producto WHERE TRIM(REPLACE(nombre_prod, "  ", " ")) = ? AND id_categoria = 3',
      [nombre_prod]
    );

    if (resultado.rows.item(0).count > 0) {
      this.alertasService.presentAlert("Agregar", "Ya existe una consola con ese nombre");
      return; // No se agrega si ya existe
    }

    // Ejecutar la consulta para agregar la consola
    await this.database.executeSql(
      'INSERT OR IGNORE INTO producto (nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus, id_categoria) VALUES (?, ?, ?, ?, ?, 1, 3);',
      [nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod]
    );

    // Presentar alerta solo si se agregó la consola
    this.alertasService.presentAlert("Agregar", "Consola Agregada");
    await this.consultarConsolas(); // Asegúrate de que esta función retorne una promesa
  } catch (e) {
    this.alertasService.presentAlert("Agregar", "Error: " + JSON.stringify(e));
  }
}


async modificarConsola(idJ: any, nomJ: any, precioJ: any, stockJ: any, descripJ: any, fotoJ: any, estatusJ: any): Promise<void> {
  try {
    // Normalizar el nombre de la consola eliminando espacios extra
    nomJ = nomJ.trim().replace(/\s+/g, ' ');

    // Verificar si ya existe otra consola con el mismo nombre (excepto el actual)
    const resultado = await this.database.executeSql(
      'SELECT COUNT(*) AS count FROM producto WHERE TRIM(REPLACE(nombre_prod, "  ", " ")) = ? AND id_categoria = 3 AND id_producto != ?',
      [nomJ, idJ]
    );

    if (resultado.rows.item(0).count > 0) {
      this.alertasService.presentAlert("Modificar", "Ya existe una consola con ese nombre. Por favor, elige otro.");
      return; // No se modifica si ya existe otra consola con el mismo nombre
    }

    // Ejecutar la consulta para modificar la consola
    await this.database.executeSql(
      'UPDATE producto SET nombre_prod = ?, precio_prod = ?, stock_prod = ?, descripcion_prod = ?, foto_prod = ?, estatus = ?, id_categoria = 3 WHERE id_producto = ?',
      [nomJ, precioJ, stockJ, descripJ, fotoJ, estatusJ, idJ]
    );

    // Presentar alerta si se modificó la consola
    this.alertasService.presentAlert("Modificar", "Consola Modificada");
    await this.consultarConsolas(); // Asegúrate de que esta función retorne una promesa
  } catch (e) {
    this.alertasService.presentAlert("Modificar", "Error: " + JSON.stringify(e));
  }
}

async eliminarConsola(idCU: any) {
  try {
    await this.database.executeSql('DELETE FROM producto WHERE id_producto = ?', [idCU]);
    this.alertasService.presentAlert("Eliminar", "Consola eliminada");
    await this.consultarConsolas();
  } catch (e) {
    this.alertasService.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
  }
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////CRUD  RESECNAS////////////////////////

  //select * de todas las resecnas (vista adminresecnas)
  async consultarResecnas() {
    return this.database.executeSql('SELECT * FROM resecnas', []).then(res => {
      //variable para almacenar el resultado de la consulta
      let itemsR: Resecnas[] = [];
      //verificar si hay registros en la consulta
      if (res.rows.length > 0) {
        //se recorren los resultados
        for (var i = 0; i < res.rows.length; i++) {
          //se agrega el registro a mi variable (itemsU)
          itemsR.push({
            id_resecna: res.rows.item(i).id_resecna,
            text_resecna: res.rows.item(i).text_resecna,
            id_usuario: res.rows.item(i).id_usuario,
            id_producto: res.rows.item(i).id_producto
          })
        }
      }
      this.listadoResecnas.next(itemsR as any);
    })
  }

  // Función para consultar si ya existe una reseña para un usuario y un producto
  async consultarReseñaPorUsuarioYProducto(id_User: any, id_Prod: any) {
    const result = await this.database.executeSql(
      'SELECT * FROM resecnas WHERE id_usuario = ? AND id_producto = ?',
      [id_User, id_Prod]
    );
  
    return result.rows.length > 0 ? result.rows.item(0) : null; // Retorna la reseña encontrada o null
  }
  
  // Traerá las reseñas en base al producto con toda la información de usuario
  async consultarResecnasPorIdProductoYusuarios(id_producto: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM resecna WHERE id_producto = ?';
      this.database.executeSql(query, [id_producto])
        .then(data => {
          const reselas = [];
          for (let i = 0; i < data.rows.length; i++) {
            reselas.push(data.rows.item(i));
          }
          resolve(reselas); // Retorna la lista de reseñas
        })
        .catch(error => {
          reject(error);
        });
    });
  }



  //consulta si el usuario ya escribio una resecna en x producto
  async consultarResecnaPorIdProductoYUsuario(id_producto: number, id_usuario: number) {
    return this.database.executeSql('SELECT * FROM resecna WHERE id_producto = ? AND id_usuario = ?', [id_producto, id_usuario]).then(res => {
        // Verificar si hay registros en la consulta
        if (res.rows.length > 0) {
            return true // Si hay reseñas Retornar true
        }
        return false; // Si no hay reseñas, Retornar false
    }).catch(error => {
        console.error('Error al consultar reseña por id_producto y id_usuario:', error);
        return null; // Manejar el error y retornar null
    });
  }


  //agregar mas reseñas (si ya hay una reseña de un x producto con un usuario si este intenta añadir otra reseña, que lo envie a modificar la que agrego previamente)
  async agregarResecnas(textoR: any, id_User: any, id_Prod: any) {
    try {
        await this.database.executeSql(
            'INSERT INTO resecna (text_resecna, id_usuario, id_producto) VALUES (?, ?, ?)', 
            [textoR, id_User, id_Prod]
        );
        this.consultarResecnasPorIdProductoYusuarios(id_Prod);
    } catch (error) {
        this.alertasService.presentAlert("Error", "Error al agregar la reseña: " + JSON.stringify(error));
    }
}


async obtenerResecnas2(idp: any) {
  return this.database.executeSql('SELECT r.text_resecna, r.id_producto, u.username, u.foto_usuario FROM resecna r INNER JOIN usuario u ON r.id_usuario = u.id_usuario WHERE r.id_producto = ?', [idp]).then(res => {
    //variable para almacenar el resultado de la consulta
    let itemsR: Resecnasyuser[] = [];
    //verificar si hay registros en la consulta
    if (res.rows.length > 0) {
      //se recorren los resultados
      for (var i = 0; i < res.rows.length; i++) {
        //se agrega el registro a mi variable (itemsU)
        itemsR.push({
          id_resecna: res.rows.item(i).id_resecna,
          text_resecna: res.rows.item(i).text_resecna,
          id_producto: res.rows.item(i).id_producto,
          username: res.rows.item(i).username,
          foto_usuario: res.rows.item(i).foto_usuario,
          userlogged: res.rows.item(i).userlogged
        })
      }
    }
    this.listadoResecnasPorProducto.next(itemsR as any);
    return itemsR;
  })
}

async obtenerResecnas3() {
  return this.database.executeSql('SELECT r.text_resecna, r.id_producto, u.username, u.foto_usuario FROM resecna r INNER JOIN usuario u ON r.id_usuario = u.id_usuario', []).then(res => {
    //variable para almacenar el resultado de la consulta
    let itemsR: Resecnasyuser[] = [];
    //verificar si hay registros en la consulta
    if (res.rows.length > 0) {
      //se recorren los resultados
      for (var i = 0; i < res.rows.length; i++) {
        //se agrega el registro a mi variable (itemsU)
        itemsR.push({
          id_resecna: res.rows.item(i).id_resecna,
          text_resecna: res.rows.item(i).text_resecna,
          id_producto: res.rows.item(i).id_producto,
          username: res.rows.item(i).username,
          foto_usuario: res.rows.item(i).foto_usuario,
          userlogged: res.rows.item(i).userlogged
        })
      }
    }
    this.listadoResecnasPorProducto2.next(itemsR as any);
    return itemsR;
  })
}


// Trae todas las RESECNAS ()
// Método para obtener todas las reseñas
async obtenerResecnas() {
  return this.database.executeSql('SELECT r.id_resecna, r.text_resecna, r.id_producto, u.username, u.foto_usuario, p.nombre_prod FROM resecna r INNER JOIN usuario u ON r.id_usuario = u.id_usuario INNER JOIN producto p ON r.id_producto = p.id_producto', []).then(res => {
    //variable para almacenar el resultado de la consulta
    let itemsR: Resecnascrud[] = [];
    //verificar si hay registros en la consulta
    if (res.rows.length > 0) {
      //se recorren los resultados
      for (var i = 0; i < res.rows.length; i++) {
        //se agrega el registro a mi variable (itemsU)
        itemsR.push({
          id_resecna: res.rows.item(i).id_resecna,
          text_resecna: res.rows.item(i).text_resecna,
          id_producto: res.rows.item(i).id_producto,
          username: res.rows.item(i).username,
          nombre_prod: res.rows.item(i).nombre_prod,
          foto_usuario: res.rows.item(i).foto_usuario
        })
      }
    }
    this.listadoResecnas.next(itemsR as any);
    return itemsR;
  })
}

obtenerIdUsuarioLogueado() {
    // Suponiendo que ya tienes una función que consulta el usuario logueado
    return this.database.executeSql('SELECT id_usuario FROM usuario WHERE userlogged = ?', [1])
        .then(res => res.rows.length > 0 ? res.rows.item(0).id_usuario : null);
}

  //eliminar reseñas (por id_usuario e id_producto)
  async eliminarResecnas(idR: any) {
    try {
      await this.database.transaction(async (tx) => {
        await tx.executeSql('DELETE FROM resecna WHERE id_resecna = ?', [idR]);
      });
      this.obtenerResecnas3();
    } catch (e) {
      this.alertasService.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
      
    }
  }



  //modificar (tal vez nunca llegue XD)



  //////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////CRUD CARRITO////////////////////////////////////

  //listar todos los items de venta en el carrito, por usuario conectado
  //elparametro a usar es el id del usuario en sesion, de esta forma, se traeran los carros
  //de los usuarios conectados
  async obtenerCarroPorUsuario(idVenta: number): Promise<any[]> {
    const query = `
      SELECT 
        d.id_detalle, 
        d.cantidad_d, 
        d.subtotal,
        p.nombre_prod, 
        p.foto_prod,  
        d.id_venta, 
        d.id_producto 
      FROM detalle d
      INNER JOIN producto p ON d.id_producto = p.id_producto
      INNER JOIN venta v ON d.id_venta = v.id_venta
      WHERE d.id_venta = ?;
    `;
  
    try {
      const res = await this.database.executeSql(query, [idVenta]);
      const itemsD: any[] = [];
  
      for (let i = 0; i < res.rows.length; i++) {
        itemsD.push(res.rows.item(i));
      }
  
      return itemsD;
    } catch (error) {
      this.alertasService.presentAlert('Error al obtener los detalles de la venta:','errors: ' + JSON.stringify(error));
      return [];
    }
  }


  //select V2.0
  /*
  async obtenerDetallesVenta(idVenta: number): Promise<Detallesventa[]> {
    const query = `
      SELECT p.nombre_prod AS nombre, p.precio_prod AS precio, d.cantidad, p.foto_prod AS imagen
      FROM detalle d
      INNER JOIN producto p ON d.id_producto = p.id_producto
      WHERE d.id_venta = ?;
    `;
  
    try {
      const res = await this.database.executeSql(query, [idVenta]);
      const productos: Detallesventa[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        productos.push(res.rows.item(i));
      }
      return productos;
    } catch (error) {
      console.error('Error al obtener los detalles de la venta:', error);
      return [];
    }
  } */


  //verifica que la venta exista con ese usuario
  async verificarOCrearVenta(idUsuario: any): Promise<number> {
    const queryVerificar = `
      SELECT id_venta 
      FROM venta 
      WHERE id_usuario = ? AND id_estado = 1;
    `;
    
    try {
      const res = await this.database.executeSql(queryVerificar, [idUsuario]);
      
      if (res.rows.length > 0) {
        const idVenta = res.rows.item(0).id_venta;
        console.log('Venta activa encontrada con ID:', idVenta);
        return idVenta;  // Retorna el ID de la venta activa
      } else {
        console.log('No se encontró venta activa, creando una nueva...');
        return await this.crearVenta(idUsuario);  // Crea una nueva venta si no existe
      }
    } catch (error) {
      console.error('Error al verificar o crear la venta:', error);
      throw error;  // Lanza el error para ser manejado en otro lugar
    }
  }
  
  // Función para crear una nueva venta
  async crearVenta(idUsuario: number): Promise<number> {
    const queryCrear = `
      INSERT INTO venta (fecha_venta, total, estado_retiro, id_usuario, id_estado) 
      VALUES (?, ?, ?, ?, ?);
    `;
    const fechaHoy = new Date().toISOString();
    const params = [fechaHoy, 0, 0, idUsuario, 1];  // Estado = 1
  
    try {
      const res = await this.database.executeSql(queryCrear, params);
      console.log('Nueva venta creada con ID:', res.insertId);
      return res.insertId;  // Retorna el ID de la nueva venta
    } catch (error) {
      console.error('Error al crear la venta:', error);
      throw error;  // Lanza el error para ser manejado en otro lugar
    }
  }



  //añadir al carrito
  async agregarDetalleVenta(idVenta: number, precio: number, idProducto: number): Promise<void> {
    const subtotal = precio * 1;  // Precio por la cantidad inicial de 1
    const query = `
      INSERT INTO detalle (cantidad_d, subtotal, id_venta, id_producto) 
      VALUES (?, ?, ?, ?);
    `;
    const params = [1, subtotal, idVenta, idProducto];
  
    try {
      await this.database.executeSql(query, params);
      console.log('Producto añadido al carrito.');
    } catch (error) {
      console.error('Error al agregar el detalle de venta:', error);
      throw error;
    }
  }

  

  async agregarCantidad(idVenta: any, idProducto: any): Promise<void> {
    // Consulta el producto para verificar su stock
    const productos = await this.consultarProductoPorId(idProducto);
    
    if (productos && productos.length > 0) {
      const productoActual = productos[0];
      const query = `
        UPDATE detalle 
        SET cantidad_d = MIN(cantidad_d + 1, ${productoActual.stock_prod})
        WHERE id_venta = ? AND id_producto = ?;
      `;
      try {
        await this.database.executeSql(query, [idVenta, idProducto]);
      } catch (error) {
        console.error('Error al agregar cantidad:', error);
        throw error;
      }
    } else {
      console.error("Producto no encontrado o error al consultar el stock.");
    }
  }
  

  //restar stock
  async restarCantidad(idVenta: any, idProducto: any): Promise<void> {
    const queryVerificar = `
      SELECT cantidad_d 
      FROM detalle 
      WHERE id_venta = ? AND id_producto = ?;
    `;
  
    const queryRestar = `
      UPDATE detalle 
      SET cantidad_d = cantidad_d - 1 
      WHERE id_venta = ? AND id_producto = ?;
    `;
  
    const queryEliminar = `
      DELETE FROM detalle 
      WHERE id_venta = ? AND id_producto = ?;
    `;
  
    try {
      const res = await this.database.executeSql(queryVerificar, [idVenta, idProducto]);
      if (res.rows.length > 0) {
        const cantidad = res.rows.item(0).cantidad_d;
  
        if (cantidad > 1) {
          await this.database.executeSql(queryRestar, [idVenta, idProducto]);
        } else {
          await this.database.executeSql(queryEliminar, [idVenta, idProducto]);
        }
      }
    } catch (error) {
      console.error('Error al restar cantidad:', error);
      throw error;
    }
  }



  //ejecutar la venta
  async confirmarCompra(idVenta: any, idUser: any, total: any): Promise<void> {
    const query = `
      UPDATE venta 
      SET 
        total = ?,
        id_estado = 2 
      WHERE id_venta = ?;
    `;
  
    try {
      await this.database.executeSql(query, [total,idVenta]);
      this.alertasService.presentAlert("¡Compra Exitosa!","¡GRACIAS!");
      await this.verificarOCrearVenta(idUser);
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      throw error;
    }
  }

  //eliminar antes de continuar la compra los productos sin stock
  async eliminarProductosSinStock(idVenta: number): Promise<void> {
    const query = `
      DELETE FROM detalle 
      WHERE id_venta = ? 
        AND (cantidad_d = 0 OR 
             id_producto IN (
               SELECT id_producto 
               FROM producto 
               WHERE estatus = 0
             ));
    `;
  
    try {
      await this.database.executeSql(query, [idVenta]);
      console.log('Productos sin stock o no disponibles eliminados del carrito.');
    } catch (error) {
      console.error('Error al eliminar productos sin stock o no disponibles:', error);
      throw error;
    }
  }

  //elimina los productos malos xd
  async eliminarProductoDelCarrito(idVenta: any, idProducto: any): Promise<void> {
    const query = `DELETE FROM detalle WHERE id_venta = ? AND id_producto = ?`;
    try {
      await this.database.executeSql(query, [idVenta, idProducto]);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      throw error;
    }
  }

  async restarStock(idProducto: number, cantidad: number): Promise<void> {
    const query = `
      UPDATE producto 
      SET stock_prod = stock_prod - ? 
      WHERE id_producto = ?;
    `;
    try {
      await this.database.executeSql(query, [cantidad, idProducto]);
      console.log(`Stock del producto ${idProducto} reducido en ${cantidad}`);
    } catch (error) {
      console.error(`Error al restar stock del producto ${idProducto}:`, error);
      throw error;
    }
  }

  //calcular precio final 
  async preciofinal(idVenta: any): Promise<number> {
    const query = `
      SELECT SUM(cantidad_d * subtotal) AS total 
      FROM detalle 
      WHERE id_venta = ?;
    `;
  
    try {
      const res = await this.database.executeSql(query, [idVenta]);
      if (res.rows.length > 0 && res.rows.item(0).total != null) {
        return res.rows.item(0).total;
      }
      return 0;
    } catch (error) {
      console.error('Error al calcular el precio final:', error);
      throw error;
    }
  }

  /*----------------Actualizado del stock = 0 a no disponible------------------------*/

  async ActualizarStock(): Promise<void> {
    try {
      // Ejecutar la consulta para modificar el stock
      await this.database.executeSql(
        'UPDATE producto SET estatus = ? WHERE stock_prod = 0',
        [0]
      );
  
      // Presentar alerta si se modificaron los stock de producto
      this.alertasService.presentAlert("Actualizacion", "Stock de productos Actualizado");
      await this.consultarJuegos();
      await this.consultarJuguetes();
      await this.consultarConsolas();
    } catch (e) {
      this.alertasService.presentAlert("Actualizar Stock", "Error: " + JSON.stringify(e));
    }
  }

  /*--------------------------------------------------------------------------------*/
  ///////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////CRUD RETIROS////////////////////////////////////////

  //listado de retiros
  async consultarRetiros(idU: any) {
    const query = `
      SELECT 
        v.id_venta,
        v.fecha_venta,
        v.total,
        v.estado_retiro,
        u.username AS nombre_usuario,  -- Cambiamos el nombre del campo a username
        v.id_usuario,
        v.id_estado
      FROM 
        venta v
      INNER JOIN 
        usuario u ON v.id_usuario = u.id_usuario
      WHERE 
        v.id_estado = 2 AND v.id_usuario = ?;
    `;
  
    try {
      const res = await this.database.executeSql(query, [idU]);
      
      // Variable para almacenar los resultados de la consulta
      let itemsV: Venta[] = [];
  
      // Verificar si hay registros
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          // Agregar cada registro a la lista
          itemsV.push({
            id_venta: res.rows.item(i).id_venta,
            fecha_venta: res.rows.item(i).fecha_venta,
            total: res.rows.item(i).total,
            estado_retiro: res.rows.item(i).estado_retiro,
            username: res.rows.item(i).username,  
            id_usuario: res.rows.item(i).id_usuario,
            id_estado: res.rows.item(i).id_estado
          });
        }
      }
  
      // Emitir los resultados mediante el observable
      this.listadoventa.next(itemsV as any);
      return itemsV;
    } catch (error) {
      console.error('Error al consultar retiros:', error);
      throw error;
    }
  }
  


  //////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////CRUD FAVORITOS////////////////////////////////////
  
  //listar todos los items de favs
  async consultarFavs(idU: number): Promise<Favsvan[]> {
    const sql = `
      SELECT f.id_favoritos, f.fecha_creacion, f.id_usuario, f.id_producto, 
             p.nombre_prod, p.precio_prod, p.stock_prod, p.foto_prod, p.estatus
      FROM favoritos f 
      INNER JOIN producto p ON f.id_producto = p.id_producto 
      WHERE f.id_usuario = ? ORDER BY p.nombre_prod ASC`;
  
    const res = await this.database.executeSql(sql, [idU]);
    return Array.from({ length: res.rows.length }, (_, i) => res.rows.item(i));
  }
  
  async verificarFav(idP: number, idU: number): Promise<boolean> {
    const sql = `SELECT 1 FROM favoritos WHERE id_producto = ? AND id_usuario = ? LIMIT 1`;
    const res = await this.database.executeSql(sql, [idP, idU]);
    return res.rows.length > 0;
  }
  
  async agregarFav(idU: number, idP: number): Promise<void> {
    try {
      const fechaSQL = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  
      const sql = `INSERT INTO favoritos (fecha_creacion, id_usuario, id_producto) VALUES (?, ?, ?)`;
      const res = await this.database.executeSql(sql, [fechaSQL, idU, idP]);
  
      if (res.rowsAffected > 0) {
        console.log(`Juego ${idP} agregado a la lista de deseos del usuario ${idU}`);
      } else {
        throw new Error('No se pudo insertar el juego en la lista de deseos.');
      }
    } catch (error) {
      console.error('Error en agregarFav:', error);
      throw error;
    }
  }
  
  
  async quitarFav(idP: number, idU: number): Promise<void> {
    try {
      await this.database.executeSql(
        `DELETE FROM favoritos WHERE id_producto = ? AND id_usuario = ?`,
        [idP, idU]
      );
    } catch (error) {
      this.alertasService.presentAlert("Error", "No se pudo eliminar: " + JSON.stringify(error));
    }
  }
  //ir a ese item en especifico (tal vez lo haga del ts)

  

  //////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////CRUD SEGURIDAD///////////////////////////////////

  //aqui literalmente solo se comparara la respuesta de seguridad para que el usuario pueda recuperar su clave, activando el token solo por 10 minutos, si el tiempo expira, F,

  //select * de todos los usuarios
  async consultarPreguntasSeguridad(user: any): Promise<{ pregunta_seguridad: string, respuesta_seguridad: string } | null> {
  return this.database.executeSql('SELECT * FROM seguridad WHERE id_usuario = ?', [user]).then(res => {
    // Verificar si hay registros en la consulta
    if (res.rows.length > 0) {
      const item = res.rows.item(0); // Obtener el primer registro
      return {
        pregunta_seguridad: item.pregunta_seguridad,
        respuesta_seguridad: item.respuesta_seguridad
      };
    }
    return null; // Si no hay registros, retornar null
  }).catch(error => {
    console.error('Error al consultar preguntas de seguridad:', error);
    return null; // Manejar el error y retornar null
  });
}



//validacion de pregunta seguridad para usuarios (olvido su clave)
async validarRespuestaSeguridad(username: string, respuesta: string): Promise<boolean> {
  try {
    // Consultar el usuario por nombre
    const usuario = await this.consultarUsuarioPorNombre(username);
    if (!usuario) {
      console.error('Usuario no encontrado');
      return false; // Retornar false si el usuario no existe
    }

    // Consultar la pregunta de seguridad y respuesta usando el ID del usuario
    const seguridad = await this.consultarPreguntasSeguridad(usuario.id_usuario);
    if (!seguridad) {
      console.error('No se encontraron preguntas de seguridad para el usuario');
      return false; // Retornar false si no se encontró la pregunta de seguridad
    }

    // Comparar la respuesta ingresada con la respuesta guardada
    return seguridad.respuesta_seguridad === respuesta; // Retornar true si coinciden, false si no
  } catch (error) {
    console.error('Error en la validación de respuesta de seguridad:', error);
    return false; // Manejar el error y retornar false
  }
}


  //ejecuta el cambio de clave al momento de validar la pregunta de seguridad
  async cambiarContrasena(idUsuario: number, nuevaContrasena: string) {
    try {
      await this.database.executeSql(
        'UPDATE usuario SET clave = ? WHERE id_usuario = ?',
        [nuevaContrasena.trim(), idUsuario]
      );
      this.alertasService.presentAlert("Éxito", "Contraseña cambiada correctamente.");
    } catch (error) {
      this.alertasService.presentAlert("No se pudo cambiar la contraseña", "ERROR: " + error );
      throw error; // Lanzar el error para manejarlo en el componente
    }
  }



  //funcion solo de base, se implemento en sus apartados respectivos 
  async agregarRespuestaSeguridad(respU: any, user: any) {
    // Lógica para agregar usuarios, aplicando trim() solo en los campos de texto
    return this.database.executeSql(
      'INSERT OR IGNORE INTO seguridad (respU, id_usuario) VALUES (?, ?)' [respU.trim(), user.trim()]
    ).then(() => {
      // Se añade la alerta
      this.alertasService.presentAlert("Agregar", "Respuesta Seguridad Agregada");
      // Se llama al select para mostrar la lista actualizada
      this.consultarUsuarios();
    }).catch(e => {
      this.alertasService.presentAlert("Agregar", "Error: " + JSON.stringify(e));
    });
  }


  //////////////////////////////////////

  async obtenerResecnasUsuario(idUsuario: number): Promise<any[]> {
    const query = `
      SELECT r.id_resecna, r.text_resecna, r.id_producto, u.username, 
             u.foto_usuario, p.nombre_prod 
      FROM resecna r 
      INNER JOIN usuario u ON r.id_usuario = u.id_usuario 
      INNER JOIN producto p ON r.id_producto = p.id_producto 
      WHERE r.id_usuario = ?`;
  
    try {
      const res = await this.database.executeSql(query, [idUsuario]);
      let resecnas = [];
      for (let i = 0; i < res.rows.length; i++) {
        resecnas.push(res.rows.item(i));
      }
      return resecnas;
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
      throw error;
    }
  }

  async eliminarResecnasUsuario(idR: any) {
    try {
      await this.database.transaction(async (tx) => {
        await tx.executeSql('DELETE FROM resecna WHERE id_resecna = ?', [idR]);
      });
      // Vuelve a cargar las reseñas
      this.obtenerResecnas3();
    } catch (e) {
      this.alertasService.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
    }
  }
  async obtenerProductosSinStock(): Promise<any[]> {
    const query = `
      SELECT id_producto, nombre_prod, stock_prod, estatus
      FROM producto
      WHERE stock_prod = 0 OR estatus = 0;
    `;
    
    try {
      const result = await this.database.executeSql(query, []);
      const productosSinStock = [];
      for (let i = 0; i < result.rows.length; i++) {
        productosSinStock.push(result.rows.item(i));
      }
      return productosSinStock;
    } catch (error) {
      console.error('Error al obtener productos sin stock o no disponibles:', error);
      throw error;
    }
  }

  
  
}