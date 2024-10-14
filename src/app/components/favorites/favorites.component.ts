import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";
import { RouterModule, Router } from "@angular/router";
import { JsonPipe, CommonModule, Location } from "@angular/common";

@Component({
  selector: "app-favorites",
  standalone: true,
  imports: [CommonModule, RouterModule, JsonPipe],
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"],
})
export class FavoritesComponent implements OnInit {
  favoritePokemons: any[] = [];

  constructor(
    private pokemonService: PokemonService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavoritePokemons();
  }

  loadFavoritePokemons(): void {
    // Get the favorite Pokémon IDs from localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoriteIds: string[] = JSON.parse(storedFavorites);

      favoriteIds.forEach((id) => {
        this.pokemonService.getPokemonDetail(id).subscribe((pokemon) => {
          this.favoritePokemons.push(pokemon);
        });
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToPokemon(id: string): void {
    this.router.navigate(["/pokemon", id]);
  }

  removePokemon(pokemonId: string): void {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites = favorites.filter((id: string) => id !== pokemonId);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Update the favoritePokemons
    this.favoritePokemons = this.favoritePokemons.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
  }
}
