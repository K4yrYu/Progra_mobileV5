import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosDisponibles: any[] = [];
  productosSinStock: any[] = [];
  productos: any[] = [];
  idVentaActiva: number | null = null;
  mostrarSinStock: boolean = true;
  totalVENTA: number = 0; 

  constructor(
    private alertasService: AlertasService,
    private bd: ManejodbService,
    private cd: ChangeDetectorRef // Detecta cambios manualmente si es necesario
  ) {}


  async ngOnInit() {
  }


  async ionViewWillEnter() {
    await this.cargarProductos();
    await this.actualizarPrecioTotal();  // Llama al calcular el total
  }


  async obtenerVentaActiva() {
    try {
      const idUsuario = await this.bd.obtenerIdUsuarioLogueado();
      if (!idUsuario) {
        this.alertasService.presentAlert('Error', 'Debes estar logueado.');
        return;
      }
      this.idVentaActiva = await this.bd.verificarOCrearVenta(idUsuario);
      console.log('ID de Venta Activa:', this.idVentaActiva);
    } catch (error) {
      console.error('Error al obtener la venta activa:', error);
      this.alertasService.presentAlert('Error', 'No se pudo obtener la venta activa.');
    }
  }


  async cargarProductos() {
    await this.obtenerVentaActiva();
    if (!this.idVentaActiva) return;
  
    try {
      this.productos = await this.bd.obtenerCarroPorUsuario(this.idVentaActiva);
  
      this.productosDisponibles = this.productos;
      this.productosSinStock = this.productos.filter(p => p.cantidad_d === 0);
  
      this.mostrarSinStock = this.productosSinStock.length > 0;
  
      console.log('Productos cargados en el carrito:', this.productos);
      this.cd.detectChanges();  // Forzar detección de cambios
    } catch (error) {
      console.error('Error al cargar productos del carrito:', error);
      this.alertasService.presentAlert('Error', 'No se pudieron cargar los productos.');
    }
  }
  
  async continuar() {
    this.mostrarSinStock = false;
    await this.actualizarPrecioTotal();  // Actualizamos el total.
    await this.cargarProductos();
  }

  async incrementarCantidad(producto: any) {
    producto.cantidad_d++;
    await this.bd.agregarCantidad(this.idVentaActiva, producto.id_producto);
    this.actualizarPrecioTotal();
  }

  async decrementarCantidad(producto: any) {
    if (producto.cantidad_d > 0) {
      producto.cantidad_d--;  // Reducimos cantidad en la vista.
      await this.bd.restarCantidad(this.idVentaActiva, producto.id_producto);
      await this.cargarProductos();  // Recargar productos después de modificar.
      this.actualizarPrecioTotal();  // Actualizamos el total.
    }
  }


  async actualizarPrecioTotal() {
    if (this.idVentaActiva) {
      this.totalVENTA  = await this.bd.preciofinal(this.idVentaActiva);
      this.cd.detectChanges();  // Forzamos la actualización de la vista
    }
  }

  calcularTotal() {
    return this.productosDisponibles.reduce((total, producto) => total + producto.subtotal, 0);
  }

  alertascarro() {
    this.alertasService.presentAlert('Gracias Por Su Compra', '');
  }


  async COMPRAAAAR(){
    const idUsuario = await this.bd.obtenerIdUsuarioLogueado();
    await this.bd.confirmarCompra(this.idVentaActiva, idUsuario, this.totalVENTA);
    await this.actualizarPrecioTotal();  // Actualizamos el total.
    await this.cargarProductos();
  }
}
