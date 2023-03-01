import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string = "https://api.giphy.com/v1/gifs";
  private apikey: string = "H7lUrxo33lEDPs0Tbn3ec1aeVdw5A442";
  private limite: string = "21"
  private _historial: string[] = [];


  public res: Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.res = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query:string = ''){

    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);

    localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
                  .set('api_key', this.apikey)
                  .set("q", query)
                  .set("limit", this.limite)

    this.http.get<SearchGifsResponse>(`${this.url}/search`, {params})
      .subscribe( (resp) => {
        console.log(resp.data);
        this.res = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.res));
      })
  }
}
