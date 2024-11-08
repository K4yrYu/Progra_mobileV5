import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'juegos',
    loadChildren: () => import('./pages/juegos/juegos.module').then(m => m.JuegosPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'consolas',
    loadChildren: () => import('./pages/consolas/consolas.module').then(m => m.ConsolasPageModule)
  },
  {
    path: 'juguetes',
    loadChildren: () => import('./pages/juguetes/juguetes.module').then(m => m.JuguetesPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'cambioclave',
    loadChildren: () => import('./pages/cambioclave/cambioclave.module').then(m => m.CambioclavePageModule)
  },
  {
    path: 'crudjuegos',
    loadChildren: () => import('./pages/crudjuegos/crudjuegos.module').then(m => m.CrudjuegosPageModule)
  },
  {
    path: 'agregarjuego',
    loadChildren: () => import('./pages/agregarjuego/agregarjuego.module').then(m => m.AgregarjuegoPageModule)
  },
  {
    path: 'editarjuego',
    loadChildren: () => import('./pages/editarjuego/editarjuego.module').then(m => m.EditarjuegoPageModule)
  },
  {
    path: 'eliminarjuego',
    loadChildren: () => import('./pages/eliminarjuego/eliminarjuego.module').then(m => m.EliminarjuegoPageModule)
  },
  {
    path: 'paneladmin',
    loadChildren: () => import('./pages/paneladmin/paneladmin.module').then(m => m.PaneladminPageModule)
  },
  {
    path: 'crudconsolas',
    loadChildren: () => import('./pages/crudconsolas/crudconsolas.module').then(m => m.CrudconsolasPageModule)
  },
  {
    path: 'agregarconsola',
    loadChildren: () => import('./pages/agregarconsola/agregarconsola.module').then(m => m.AgregarconsolaPageModule)
  },
  {
    path: 'eliminarconsola',
    loadChildren: () => import('./pages/eliminarconsola/eliminarconsola.module').then(m => m.EliminarconsolaPageModule)
  },
  {
    path: 'editarconsola',
    loadChildren: () => import('./pages/editarconsola/editarconsola.module').then(m => m.EditarconsolaPageModule)
  },
  {
    path: 'crudjuguetes',
    loadChildren: () => import('./pages/crudjuguetes/crudjuguetes.module').then(m => m.CrudjuguetesPageModule)
  },
  {
    path: 'agregarjuguete',
    loadChildren: () => import('./pages/agregarjuguete/agregarjuguete.module').then(m => m.AgregarjuguetePageModule)
  },
  {
    path: 'eliminarjuguete',
    loadChildren: () => import('./pages/eliminarjuguete/eliminarjuguete.module').then(m => m.EliminarjuguetePageModule)
  },
  {
    path: 'editarjuguete',
    loadChildren: () => import('./pages/editarjuguete/editarjuguete.module').then(m => m.EditarjuguetePageModule)
  },
  {
    path: 'modificarperfil',
    loadChildren: () => import('./pages/modificarperfil/modificarperfil.module').then(m => m.ModificarperfilPageModule)
  },
  {
    path: 'listadeseos',
    loadChildren: () => import('./pages/listadeseos/listadeseos.module').then(m => m.ListadeseosPageModule)
  },
  {
    path: 'historialcompras',
    loadChildren: () => import('./pages/historialcompras/historialcompras.module').then(m => m.HistorialcomprasPageModule)
  },
  {
    path: 'resecnas',
    loadChildren: () => import('./pages/resecnas/resecnas.module').then(m => m.ResecnasPageModule)
  },
  {
    path: 'juegounico',
    loadChildren: () => import('./pages/juegounico/juegounico.module').then(m => m.JuegounicoPageModule)
  },
  {
    path: 'jugueteunico',
    loadChildren: () => import('./pages/jugueteunico/jugueteunico.module').then(m => m.JugueteunicoPageModule)
  },
  {
    path: 'consolaunica',
    loadChildren: () => import('./pages/consolaunica/consolaunica.module').then(m => m.ConsolaunicaPageModule)
  },
  {
    path: 'ayudacliente',
    loadChildren: () => import('./pages/ayudacliente/ayudacliente.module').then(m => m.AyudaclientePageModule)
  },
  {
    path: 'acercadenosotros',
    loadChildren: () => import('./pages/acercadenosotros/acercadenosotros.module').then(m => m.AcercadenosotrosPageModule)
  },

  {
    path: 'adminresecnas',
    loadChildren: () => import('./pages/adminresecnas/adminresecnas.module').then(m => m.AdminresecnasPageModule)
  },
  {
    path: 'crudusuarios',
    loadChildren: () => import('./pages/crudusuarios/crudusuarios.module').then(m => m.CrudusuariosPageModule)
  },
  {
    path: 'eliminarusuario',
    loadChildren: () => import('./pages/eliminarusuario/eliminarusuario.module').then(m => m.EliminarusuarioPageModule)
  },
  {
    path: 'editarusuario',
    loadChildren: () => import('./pages/editarusuario/editarusuario.module').then(m => m.EditarusuarioPageModule)
  },
  {
    path: 'agregarusuario',
    loadChildren: () => import('./pages/agregarusuario/agregarusuario.module').then(m => m.AgregarusuarioPageModule)
  },
  {
    path: 'comicdetalle/:id',
    loadChildren: () => import('./pages/comicdetalle/comicdetalle.module').then(m => m.ComicdetallePageModule)
  },
  {
    path: 'administrarayudacliente',
    loadChildren: () => import('./pages/administrarayudacliente/administrarayudacliente.module').then( m => m.AdministrarayudaclientePageModule)
  },
  {
    path: 'retiros',
    loadChildren: () => import('./pages/retiros/retiros.module').then( m => m.RetirosPageModule)
  },
  {
    path: 'validretiro',
    loadChildren: () => import('./pages/validretiro/validretiro.module').then( m => m.ValidretiroPageModule)
  },
  {
    path: 'historialventas',
    loadChildren: () => import('./pages/historialventas/historialventas.module').then( m => m.HistorialventasPageModule)
  },
  {
    path: 'editarresecna',
    loadChildren: () => import('./pages/editarresecna/editarresecna.module').then( m => m.EditarresecnaPageModule)
  },
  {
    path: 'cambiocontra',
    loadChildren: () => import('./pages/cambiocontra/cambiocontra.module').then( m => m.CambiocontraPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
  

  

 

  

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
