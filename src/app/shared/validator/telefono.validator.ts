import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function isValidNumeroTelefono(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value === null || value === '') {
      return null;
    }

    if (value.length !== 12 && value.length !== 13) {
      return { isValidNumeroTelefono: true };
    }

    if (value.charAt(0) !== '+') {
      return { isValidNumeroTelefono: true };
    }

    if (!/^\d+$/.test(value.substr(1))) {
      return { isValidNumeroTelefono: true };
    }

    return null;
  };
}
