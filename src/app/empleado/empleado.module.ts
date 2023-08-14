import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VerEmpleadoComponent } from './pages/ver-empleado/ver-empleado.component';

@NgModule({
  declarations: [EmpleadosComponent, VerEmpleadoComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  exports: [EmpleadosComponent, VerEmpleadoComponent],
})
export class EmpleadoModule {}
