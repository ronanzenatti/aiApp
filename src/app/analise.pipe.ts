import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'analise'
})
export class AnalisePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
