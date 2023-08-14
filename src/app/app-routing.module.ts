import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinciasComponent } from './provincia/pages/provincias/provincias.component';
import { VerProvinciaComponent } from './provincia/pages/ver-provincia/ver-provincia.component';
import { EmpleadosComponent } from './empleado/pages/empleados/empleados.component';
import { CentrosTrabajoComponent } from './centros-trabajos/pages/centros-trabajos/centros-trabajo.component';
import { VerCentroTrabajoComponent } from './centros-trabajos/pages/ver-centro-trabajo/ver-centro-trabajo.component';
import { VerEmpleadoComponent } from './empleado/pages/ver-empleado/ver-empleado.component';

const routes: Routes = [
  {
    path: 'provincias',
    component: ProvinciasComponent,
    pathMatch: 'full',
  },
  {
    path: 'provincias/:id',
    component: VerProvinciaComponent,
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
  },
  {
    path: 'empleados/:id',
    component: VerEmpleadoComponent,
  },
  {
    path: 'centros-trabajo',
    component: CentrosTrabajoComponent,
  },
  {
    path: 'centros-trabajo/:id',
    component: VerCentroTrabajoComponent,
  },
  {
    path: '**',
    redirectTo: 'empleados',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
