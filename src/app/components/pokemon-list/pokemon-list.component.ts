import { Component, OnInit } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { PokemonService } from "../../services/pokemon.service";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: "app-pokemon-list",
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.css"],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  nextUrl: string | null = null;
  previousUrl: string | null = null;
  limit: number = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.pokemonService
      .getPokemonList(this.limit, this.offset)
      .subscribe((data) => {
        this.pokemonList = data.results;
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
      });
  }

  nextPage(): void {
    if (this.nextUrl) {
      this.offset += this.limit;
      this.loadPokemonList();
    }
  }

  previousPage(): void {
    if (this.previousUrl && this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemonList();
    }
  }

  goToPokemon(url: string): void {
    const pokemonId = this.getPokemonId(url);
    this.router.navigate(["/pokemon", pokemonId]);
  }

  getPokemonId(url: string): string {
    return url.split("/").filter(Boolean).pop() || "";
  }
}
