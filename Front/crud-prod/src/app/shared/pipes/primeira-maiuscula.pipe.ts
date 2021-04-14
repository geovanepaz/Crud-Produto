import { Pipe, PipeTransform } from '@angular/core';
import { endWith } from 'rxjs/operators';

@Pipe({
  name: 'primeiraMaiuscula'
})

//Apenas para testar a criação de um pipe.
export class PrimeiraMaiusculaPipe implements PipeTransform {

  transform(valor: string): string {
    return valor[0].toUpperCase() + valor.substring(1, valor.length);
  }

}
