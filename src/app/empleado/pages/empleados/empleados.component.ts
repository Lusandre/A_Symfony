import { Component } from '@angular/core';
import { ProvinciaService } from '../../../provincia/services/provincia.service';
import { EmpleadoService } from '../../services/empleado.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent {
  empleados: any[] = [];
  closeResult: any;
  empleadoForm: FormGroup;
  provincias: any;
  constructor(
    private empleadoService: EmpleadoService,
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
    this.cargarEmpleados();
    this.empleadoService.getEmpleadoId(1).subscribe((res) => {
      console.log(res);
    });
    this.cargarProvincias();
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = result;
          this.registrarEmpleado();
          console.log(this.empleadoForm.value);
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

  registrarEmpleado() {
    this.empleadoService
      .registerEmpleado(this.empleadoForm.value)
      .subscribe((res) => {
        console.log(res);
        this.cargarEmpleados();
      });
  }

  cargarEmpleados() {
    this.empleadoService.getEmpleados(1, 30).subscribe((res) => {
      this.empleados = res;
      console.log(res);
    });
  }
  cargarProvincias() {
    this.provinciaService.getProvince(1, 30).subscribe((res) => {
      this.provincias = res;
    });
  }
  eliminarEmpleado(id: number) {
    this.empleadoService.eliminarEmpleado(id).subscribe((res) => {
      console.log(res);
      this.cargarEmpleados();
    });
  }
}
