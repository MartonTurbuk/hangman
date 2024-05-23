import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getProperty'
})
export class GetPropertyPipe implements PipeTransform {

  transform(value: any, property: string): any {
    return value[property];
  }

}
