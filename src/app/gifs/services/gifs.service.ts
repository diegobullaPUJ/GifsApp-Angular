import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey  : string = 'k5HmlXJXo6L9Kau2pcHM6bZ4LG4LQB9d';
  private serviceUrl : string = 'https://api.giphy.com/v1/gifs';
  private _record : string[] = [];

  public results: Gif [] = [];

  
  get record() {
    return [...this._record];
  }

  constructor( private http: HttpClient) {

    
    this._record = JSON.parse(localStorage.getItem('record')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];


    // if ( localStorage.getItem( 'history' ) ) {
    //   this._record = JSON.parse(localStorage.getItem( 'history' )! );
    // }

  }


  searchGifs( query: string = ''){

    query = query.trim().toLowerCase();

    if ( !this._record.includes( query )){
      this._record.unshift( query );
      this._record = this._record.splice(0,10);

      localStorage.setItem( 'record', JSON.stringify( this._record ) );
     
    }

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'q', query );

    
    
    this.http.get<SearchGifsResponse>( `${this.serviceUrl}/search`, { params } )
        .subscribe( ( resp ) => {
          this.results = resp.data;
          localStorage.setItem( 'results', JSON.stringify( this.results ) );
        });
  }

}
