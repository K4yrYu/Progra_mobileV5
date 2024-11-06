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
  productosNODisponibles: any[] = [];
  productosSinStock: any[] = [];
  productos: any[] = [];
  idVentaActiva: number | null = null;
  mostrarSinStock: boolean = true;
  totalVENTA: number = 0; 
  wasaborrar: any[] = [];
  wasmalasaborrar: any[] = [];

  constructor(
    private alertasService: AlertasService,
    private bd: ManejodbService,
    private cd: ChangeDetectorRef // Detecta cambios manualmente si es necesario
  ) {}


  async ngOnInit() {
    await this.cargarProductos();
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
  
      // Separar productos sin stock y disponibles
      this.productosSinStock = this.productos.filter(p => p.estatus === 0); 
      this.productosDisponibles = this.productos.filter(p => p.cantidad_d > 0);
  
      // Determinar si mostrar la sección de sin stock
      this.mostrarSinStock = this.productosSinStock.length > 0;
  
      console.log('Productos sin stock:', this.productosSinStock);
      console.log('Productos disponibles:', this.productosDisponibles);
  
      this.cd.detectChanges(); // Forzar actualización de la vista
    } catch (error) {
      console.error('Error al cargar productos del carrito:', error);
      this.alertasService.presentAlert('Error', 'No se pudieron cargar los productos.');
    }
  }
  
  async continuar() {
    await this.borrarProductosSinStock();
    this.productosSinStock = [];
    this.mostrarSinStock = false;
    await this.actualizarPrecioTotal();  // Actualizamos el total.
    await this.cargarProductos();
  }

  async incrementarCantidad(producto: any) {
    // Consulta el stock actual desde la base de datos
    const productos = await this.bd.consultarProductoPorId(producto.id_producto);

    if (productos && productos.length > 0) {
      const productoActual = productos[0]; // Extrae el producto con stock actualizado

      if (producto.cantidad_d < productoActual.stock_prod) {
        producto.cantidad_d++;
        await this.bd.agregarCantidad(this.idVentaActiva, producto.id_producto);
        this.actualizarPrecioTotal();
      } else {
        // Muestra una alerta si se alcanza el límite del stock
        this.alertasService.presentAlert("Alcanzado límite de stock", "No queda más de ese producto en inventario");
      }
    } else {
      console.error("Error al consultar el producto.");
    }
  }
  
  async decrementarCantidad(producto: any) {
    if (producto.cantidad_d > 0) {
      producto.cantidad_d--;  // Reducimos cantidad en la vista.
      await this.bd.restarCantidad(this.idVentaActiva, producto.id_producto);
      await this.cargarProductos();  // Recargar productos después de modificar.
      this.actualizarPrecioTotal();  // Actualizamos el total.
    }
  }

  async borrarProductosSinStock() {
    try {
      this.wasmalasaborrar = this.productosSinStock;
      for (let producto of this.wasmalasaborrar) {
        await this.bd.eliminarProductoDelCarrito(this.idVentaActiva, producto.id_producto);
      }
      console.log('Productos sin stock eliminados del carrito');
      await this.cargarProductos();  // Recargar productos
      this.wasmalasaborrar = [];
      this.alertasService.presentAlert('EXITO','Productos sin stock eliminados');
    } catch (error) {
      this.alertasService.presentAlert('ERROR','Error al eliminar productos sin stock:' + error);
    }
  }

  async RestarStockAlComprar() {
    this.wasaborrar = this.productosDisponibles;
    try {
      for (let producto of this.wasaborrar) {
        await this.bd.restarStock(producto.id_producto, producto.cantidad_d);
      }
      await this.cargarProductos();  // Recargar productos
      this.alertasService.presentAlert('EXITO', 'Stock restado correctamente');
      this.wasaborrar = [];
    } catch (error) {
      console.error('Error al eliminar productos sin stock:', error);
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
    await this.RestarStockAlComprar();
    const idUsuario = await this.bd.obtenerIdUsuarioLogueado();
    await this.bd.confirmarCompra(this.idVentaActiva, idUsuario, this.totalVENTA);
    await this.bd.ActualizarStock();
    await this.actualizarPrecioTotal();  // Actualizamos el total.
    await this.cargarProductos();
  }
}
