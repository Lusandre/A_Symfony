import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentrosTrabajoComponent } from './pages/centros-trabajos/centros-trabajo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerCentroTrabajoComponent } from './pages/ver-centro-trabajo/ver-centro-trabajo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CentrosTrabajoComponent, VerCentroTrabajoComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  exports: [CentrosTrabajoComponent],
})
export class CentrosTrabajoModule {}
