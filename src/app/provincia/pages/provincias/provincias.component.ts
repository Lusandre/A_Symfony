import { Component } from '@angular/core';
import { ProvinciaService } from '../../services/provincia.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css'],
})
export class ProvinciasComponent {
  provincias: any[] = [];
  nombre: string = '';
  id: number = 0;
  closeResult = '';

  constructor(
    private provinciaService: ProvinciaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cargarProvincias();
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (this.id === 0) {
            this.registrarProvincia();
          } else {
            this.editarProvincia();
          }
          this.closeResult = result;
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
  registrarProvincia() {
    this.provinciaService.registerProvince(this.nombre).subscribe((res) => {
      this.nombre = '';
      this.cargarProvincias();

      console.log(res);
    });
  }
  delete(id: number) {
    this.provinciaService.eliminarProvincia(id).subscribe((res) => {
      console.log(res);
      this.cargarProvincias();
    });
  }

  edit(conten: any, id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
    this.open(conten);
  }
  editarProvincia() {
    this.provinciaService
      .editarProvince(this.id, this.nombre)
      .subscribe((res) => {
        this.nombre = '';
        this.id = 0;
        this.cargarProvincias();

        console.log(res);
      });
  }
  cargarProvincias() {
    this.provinciaService.getProvince(1, 30).subscribe((res) => {
      this.provincias = res;
      console.log(res);
    });
  }
}
