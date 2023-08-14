import { Component } from '@angular/core';
import { CentrosTrabajoService } from '../../service/centros-trabajo.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinciaService } from 'src/app/provincia/services/provincia.service';
import { Provincia } from 'src/app/interface/provincia.interface';

@Component({
  selector: 'app-centros-trabajos',
  templateUrl: './centros-trabajo.component.html',
  styleUrls: ['./centros-trabajo.component.css'],
})
export class CentrosTrabajoComponent {
  centrosTrabajo: any;
  centroTrabajoForm: FormGroup;
  closeResult: any;
  provincias: Provincia[] = [];

  constructor(
    private centrosTrabajoService: CentrosTrabajoService,
    private modalService: NgbModal,
    private provinciaService: ProvinciaService,
    private fb: FormBuilder
  ) {
    this.centroTrabajoForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: [
        '',
        [Validators.required, Validators.pattern(/^\+[0-9]{11,12}$/)],
      ],
      provincia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarCentrosTrabajos();
    this.cargarProvincias();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = result;
          this.registrarCentroTrabajo();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  registrarCentroTrabajo() {
    this.centrosTrabajoService
      .registerCentroTrabajo(this.centroTrabajoForm.value)
      .subscribe((res) => {
        this.cargarCentrosTrabajos();
      });
  }

  cargarCentrosTrabajos() {
    this.centrosTrabajoService.getCentrosTrabajo(1, 30).subscribe((res) => {
      this.centrosTrabajo = res;
      console.log(res);
    });
  }

  cargarProvincias() {
    this.provinciaService.getProvince(1, 30).subscribe((res) => {
      this.provincias = res;
    });
  }

  delete(id: number) {
    this.centrosTrabajoService.eliminarCentroTrabajo(id).subscribe((res) => {
      console.log(res);
      this.cargarCentrosTrabajos();
    });
  }
}
