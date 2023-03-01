import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  @ViewChild('txtbuscar') txtbuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}


  buscar(){
    const valor = this.txtbuscar.nativeElement.value;

    if(valor.trim().length == 0){
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtbuscar.nativeElement.value = '';
  }
}
