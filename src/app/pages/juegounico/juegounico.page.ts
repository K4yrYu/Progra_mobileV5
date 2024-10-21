import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-juegounico',
  templateUrl: './juegounico.page.html',
  styleUrls: ['./juegounico.page.scss'],
})
export class JuegounicoPage implements OnInit {
  juegoLlego: any;     //
  fotoResena: string | null = null;
  hayResecna: boolean = false;  //
  laresecna: string = ''; // Inicializar la reseña   //
  idUserLogged!: any;  //
  arregloresecnas: any = [];  //
  arregloJuegoUnico: any = {}; 
  idVentaActiva: number | null = null;
  estaEnListaDeseos: boolean = false; // Estado inicial //
  estaEnCarrito!: boolean; // Estado inicial

  constructor(
    private bd: ManejodbService,
    private router: Router,
    private activedroute: ActivatedRoute,
    private alertasService: AlertasService
  ) {
    this.activedroute.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.juegoLlego = this.router.getCurrentNavigation()?.extras?.state?.['juegoSelect'];
      }
    });
  }

  async ionViewWillEnter() {
    await this.validarSiHayResecna(); // Verifica si hay reseña
    await this.verificarSiEstaEnListaDeseos(); // Verifica si está en la lista de deseos
    await this.validarSiEstaEnCarrito();
  }

  ngOnInit() {
    this.bd.dbState().subscribe((data) => {
      if (data) {
        this.fetchJuegoUnico().then(() => {
          this.obtenerResecnas2(); // Cargar reseñas
          this.verificarSiEstaEnListaDeseos();
          this.validarSiEstaEnCarrito();
        });
      }
    });
  }

  async verificarOCrearVenta() {
    try {
      this.idUserLogged = await this.bd.obtenerIdUsuarioLogueado();
      if (!this.idUserLogged) {
        this.alertasService.presentAlert('Error', 'Debes estar logueado para añadir al carrito.');
        return;
      }
  
      const venta = await this.bd.verificarOCrearVenta(this.idUserLogged);
      console.log('Venta activa encontrada:', venta);
  
      if (venta) {
        this.idVentaActiva = venta;
      } else {
        this.idVentaActiva = await this.bd.crearVenta(this.idUserLogged);
        console.log('Nueva venta creada con ID:', this.idVentaActiva);
      }
    } catch (error) {
      this.alertasService.presentAlert('Error', 'No se pudo verificar o crear la venta.');
    }
  }

  async agregarAlCarrito() {
    await this.verificarOCrearVenta();
    try {
      if (!this.idVentaActiva) {
        this.alertasService.presentAlert('Error', 'No se encontró una venta activa.');
        return;
      }
      await this.validarSiEstaEnCarrito();
      if (this.estaEnCarrito === true){
        return this.alertasService.presentAlert("ERROR","EL PRODUCTO YA ESTA EN EL CARRITO");
      }

      await this.bd.agregarDetalleVenta(
        this.idVentaActiva,
        this.juegoLlego.precio_prod,
        this.juegoLlego.id_producto
      );
      
      await this.bd.preciofinal(this.idVentaActiva);
      console.log(`Juego ${this.juegoLlego.nombre_prod} añadido al carrito.`);
      this.alertasService.presentAlert('Añadido al Carrito', 'El juego fue añadido correctamente.');
  
      
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      this.alertasService.presentAlert('Error', 'No se pudo añadir al carrito.');
    }
  }

  async validarSiEstaEnCarrito() {
    try {
      this.estaEnCarrito = await this.bd.consultarProdsCarro(this.juegoLlego.id_producto, this.idVentaActiva);
    } catch (error) {
      console.error('Error al verificar si el producto está en el carrito:', error);
    }
  }

  async comprant(){
    await this.bd.restarCantidad(this.idVentaActiva,this.juegoLlego.id_producto);
    await this.validarSiEstaEnCarrito();
    this.alertasService.presentAlert("EXITO","Producto eliminado del carrito");
  }

  // Verificar si el juego está en la lista de deseos
  async verificarSiEstaEnListaDeseos() {
    this.idUserLogged = await this.bd.obtenerIdUsuarioLogueado();
    this.estaEnListaDeseos = await this.bd.verificarFav(this.juegoLlego.id_producto, this.idUserLogged);
  }

  // Agregar a la lista de deseos
  async agregarAListaDeseos() {
    try {
      const idUserLogged = await this.bd.obtenerIdUsuarioLogueado();
      if (!idUserLogged) {
        this.alertasService.presentAlert('Error', 'Debes estar logueado para agregar a la lista de deseos.');
        return;
      }
  
      console.log(`Usuario logueado: ${idUserLogged}, Juego: ${this.juegoLlego.id_producto}`);
  
      await this.bd.agregarFav(idUserLogged, this.juegoLlego.id_producto);
      this.estaEnListaDeseos = true;
    } catch (error) {
      console.error('Error al agregar a la lista de deseos:', error);
      this.alertasService.presentAlert('Error', 'No se pudo añadir a la lista de deseos: ' + JSON.stringify(error));
    }
  }

  // Quitar de la lista de deseos
  async quitarDeListaDeseos() {
    try {
      await this.bd.quitarFav(this.juegoLlego.id_producto, this.idUserLogged);
      this.estaEnListaDeseos = false;
    } catch (error) {
      this.alertasService.presentAlert('Error', 'No se pudo eliminar: ' + error);
    }
  }

  async validarSiHayResecna() {
    this.hayResecna = false;
    const usuarioLogueado = await this.bd.obtenerUsuarioLogueado();
    if (usuarioLogueado) {
      const id_usuario = usuarioLogueado.id_usuario;
      if (await this.bd.consultarResecnaPorIdProductoYUsuario(this.juegoLlego.id_producto, id_usuario)) {
        this.hayResecna = true;
      }
    }
  }

  async SubirResecna() {
    this.idUserLogged = await this.bd.obtenerIdUsuarioLogueado();
    if (this.idUserLogged) {
      await this.bd.agregarResecnas(this.laresecna, this.idUserLogged, this.juegoLlego.id_producto);
      this.laresecna = ''; // Reiniciar la reseña después de subirla
      this.hayResecna = true;
      await this.obtenerResecnas2();
      await this.fetchJuegoUnico();
    } else {
      this.alertasService.presentAlert('Error', 'Debes estar logueado para agregar una reseña.');
    }
  }

  async obtenerResecnas2() {
    try {
      this.arregloresecnas = await this.bd.obtenerResecnas2(this.juegoLlego.id_producto);
    } catch (error) {
      this.alertasService.presentAlert('Error al cargar reseñas:', 'ERROR: ' + error);
    }
  }

  async fetchJuegoUnico() {
    try {
      const juegoUnico = await this.bd.consultarJuegoPorId(this.juegoLlego.id_producto);
      if (juegoUnico) {
        this.arregloJuegoUnico = juegoUnico;
      } else {
        console.error('No se encontró el juego con el ID:', this.juegoLlego.id_producto);
      }
    } catch (error) {
      console.error('Error al consultar el juego:', error);
    }
  }

  compra() {
    this.alertasService.presentAlert('Añadido al carro', '¡Gracias!');
  }

  getImagenUsuario(foto: string | null): string {
    return foto ? foto : 'assets/img/user_default_photo.jpg';
  }
}
