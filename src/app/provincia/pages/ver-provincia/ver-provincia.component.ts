import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../../interface/provincia.interface';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-provincia',
  templateUrl: './ver-provincia.component.html',
  styleUrls: ['./ver-provincia.component.css'],
})
export class VerProvinciaComponent {
  provincia: Provincia = {} as Provincia;
  nombre: string = '';
  closeResult: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private provinciaService: ProvinciaService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.cargarProvincia();
  }
  cargarProvincia() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.provinciaService.getProvinceId(id)),
        tap(console.log)
      )
      .subscribe((res) => {
        this.provincia = res;
        this.nombre = this.provincia.nombre;
      });
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = result;
          this.provinciaService
            .editarProvince(this.provincia.id, this.nombre)
            .subscribe((res) => {
              this.provincia = res;
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
}
