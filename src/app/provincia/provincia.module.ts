import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvinciasComponent } from './pages/provincias/provincias.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { VerProvinciaComponent } from './pages/ver-provincia/ver-provincia.component';

@NgModule({
  declarations: [ProvinciasComponent, VerProvinciaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbDatepickerModule,
    RouterModule,
  ],
  exports: [ProvinciasComponent, VerProvinciaComponent],
})
export class ProvinciaModule {}
