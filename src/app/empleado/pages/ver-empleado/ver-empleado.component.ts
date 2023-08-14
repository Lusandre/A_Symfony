import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinciaService } from 'src/app/provincia/services/provincia.service';
import { Provincia } from 'src/app/interface/provincia.interface';
import { CentrosTrabajoService } from 'src/app/centros-trabajos/service/centros-trabajo.service';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css'],
})
export class VerEmpleadoComponent {
  empleado: any;
  empleadoForm: FormGroup;
  closeResult: any;
  provincias: Provincia[] = [];
  centrosTrabajo: any[] = [];
  selectedCoopIds: string[] = [];
  centros: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private centrosTrabajoService: CentrosTrabajoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private provinciaService: ProvinciaService
  ) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      provincia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarEmpleado();
    this.cargarCentrosDeEmpleado();
    this.cargarProvincias();
    this.cargarCentrosTrabajos();
    this.selectedCoopIds = Array(this.centrosTrabajo.length).fill(0);
  }

  open(content: any) {
    this.empleadoForm.patchValue({
      nombre: this.empleado.nombre,
      apellido1: this.empleado.apellido1,
      apellido2: this.empleado.apellido2,
      dni: this.empleado.dni,
      direccion: this.empleado.direccion,
      ciudad: this.empleado.ciudad,
      codigoPostal: this.empleado.codigoPostal,
      fechaNacimiento: this.empleado.fechaNacimiento,
      provincia: this.empleado.provincia['@id'],
    });
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = result;
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
        const selected = this.centrosTrabajo.filter(
          (coop, i) => this.selectedCoopIds[i]
        );
        const selectedIds = selected.map((coop) => coop['@id']);
        const selecCentros = selectedIds.concat(this.empleado.idCentroTrabajo);
        this.empleadoService
          .addCentro(this.empleado.id, selecCentros)
          .subscribe((res) => {
            console.log(res);
            this.cargarCentrosDeEmpleado();
            this.cargarCentrosTrabajos();
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

  cargarEmpleado() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.empleadoService.getEmpleadoId(id)),
        tap(console.log)
      )
      .subscribe((res) => {
        this.empleado = res;
      });
  }

  editarEmpleado() {
    this.empleadoService
      .editarEmpleado(this.empleado.id, this.empleadoForm.value)
      .subscribe((res) => {
        console.log(res);
        this.cargarEmpleado();
      });
  }

  cargarProvincias() {
    this.provinciaService.getProvince(1, 30).subscribe((res) => {
      this.provincias = res;
    });
  }

  cargarCentrosTrabajos() {
    this.centrosTrabajoService.getCentrosTrabajo(1, 30).subscribe((res) => {
      this.centrosTrabajo = res.filter((centroTrabajo: any) => {
        // Comprobar si el centro de trabajo no está en this.centros
        return !this.centros.some(
          (centro: any) => centro['@id'] === centroTrabajo['@id']
        );
      });
    });
  }
  cargarCentrosDeEmpleado() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.empleadoService.getCentrosDeEmpleado(id, 1, 30)
        ),
        tap(console.log)
      )
      .subscribe((res) => {
        this.centros = res;
      });
  }
}
