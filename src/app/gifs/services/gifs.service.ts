import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string = "https://api.giphy.com/v1/gifs/search";
  private apikey: string = "H7lUrxo33lEDPs0Tbn3ec1aeVdw5A442";
  private limite: string = "20"
  private _historial: string[] = [];


  public res: Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){}

  buscarGifs(query:string = ''){

    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(this.url+"?api_key="+this.apikey+`&q=${query}&limit=`+this.limite)
      .subscribe( (resp) => {
        console.log(resp.data);
        this.res = resp.data;
      })
  }
}
