import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }
}
