import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'callMethod'
})
export class CallMethodPipe implements PipeTransform {

  transform(value: any, method: string, ...args: any[]): any {
    return value[method](...args);
  }

}
