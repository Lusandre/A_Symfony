import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentrosTrabajoService } from '../../service/centros-trabajo.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinciaService } from 'src/app/provincia/services/provincia.service';
import { Provincia } from 'src/app/interface/provincia.interface';
import { EmpleadoService } from '../../../empleado/services/empleado.service';

@Component({
  selector: 'app-ver-centro-trabajo',
  templateUrl: './ver-centro-trabajo.component.html',
  styleUrls: ['./ver-centro-trabajo.component.css'],
})
export class VerCentroTrabajoComponent {
  centroTrabajo: any;
  centroTrabajoForm: FormGroup;
  closeResult: any;
  provincias: Provincia[] = [];
  empleados: any[] = [];
  empleadosAdd: any;
  selectedEmpladoIds: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private centrosTrabajosService: CentrosTrabajoService,
    private empleadoService: EmpleadoService,
    private provinciaService: ProvinciaService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.centroTrabajoForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      provincia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarCentroTrabajo();
    this.cargarEmpladosDeCentro();
    this.cargarProvincias();
    this.cargarEmpleados();
    this.selectedEmpladoIds = Array(this.empleados.length).fill(0);
  }

  cargarCentroTrabajo() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.centrosTrabajosService.getCentroTrabajoId(id)
        ),
        tap(console.log)
      )
      .subscribe((res) => {
        this.centroTrabajo = res;
        console.log(res);
      });
  }

  open(content: any) {
    this.centroTrabajoForm.patchValue({
      nombre: this.centroTrabajo.nombre,
      direccion: this.centroTrabajo.direccion,
      codigoPostal: this.centroTrabajo.codigoPostal,
      ciudad: this.centroTrabajo.ciudad,
      telefono: this.centroTrabajo.telefono,
      provincia: this.centroTrabajo.provincia,
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = result;
          this.editarCentroTrabajo();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openAdd(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'add' }).result.then(
      (result) => {
        this.closeResult = result;
        const selected = this.empleados.filter(
          (coop, i) => this.selectedEmpladoIds[i]
        );
        const selectedIds = selected.map((coop) => coop['@id']);
        const selecEmpleados = selectedIds.concat(
          this.centroTrabajo.idEmpleado
        );
        this.centrosTrabajosService
          .addEmpleado(this.centroTrabajo.id, selecEmpleados)
          .subscribe((res) => {
            console.log(res);
            this.cargarEmpladosDeCentro();
            this.cargarEmpleados();
          });
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

  editarCentroTrabajo() {
    this.centrosTrabajosService
      .editarCentroTrabajo(this.centroTrabajo.id, this.centroTrabajoForm.value)
      .subscribe((res) => {
        console.log(res);
        this.cargarCentroTrabajo();
      });
  }

  cargarProvincias() {
    this.provinciaService.getProvince(1, 30).subscribe((res) => {
      this.provincias = res;
    });
  }

  cargarEmpleados() {
    this.empleadoService.getEmpleados(1, 30).subscribe((res) => {
      this.empleados = res.filter((empleado: any) => {
        return !this.empleadosAdd.some(
          (empleadoAdd: any) => empleadoAdd['@id'] === empleado['@id']
        );
      });
    });
  }

  cargarEmpladosDeCentro() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.centrosTrabajosService.getEmpleadosoDeCentros(id, 1, 30)
        ),
        tap(console.log)
      )
      .subscribe((res) => {
        this.empleadosAdd = res;
      });
  }
}
