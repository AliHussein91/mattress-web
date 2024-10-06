import { Injectable } from '@angular/core';
import { Formatter } from 'sarala-json-api-data-formatter';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  private formatter = new Formatter();

  constructor() { }

  formatData(data: any): any {
    return this.formatter.deserialize(data);
  }
}
