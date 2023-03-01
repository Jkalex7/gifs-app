import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  @ViewChild('txtbuscar') txtbuscar!:ElementRef<HTMLInputElement>;

  buscar(){
    const valor = this.txtbuscar.nativeElement.value;

    this.txtbuscar.nativeElement.value = '';
  }
}
