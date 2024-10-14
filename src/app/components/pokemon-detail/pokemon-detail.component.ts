import { Component, OnInit } from "@angular/core";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { PokemonService } from "../../services/pokemon.service";
import { JsonPipe, CommonModule, Location } from "@angular/common";

@Component({
  selector: "app-pokemon-detail",
  standalone: true,
  imports: [CommonModule, JsonPipe, RouterModule],
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.css"],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.pokemonService.getPokemonDetail(id).subscribe((data) => {
        this.pokemon = data;
      });
    }
  }

  isPrimitive(value: any): boolean {
    return typeof value !== "object" || value === null;
  }

  goBack(): void {
    this.location.back();
  }

  isFavorite(pokemonId: string): boolean {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites: string[] = JSON.parse(storedFavorites);
      return favorites.includes(pokemonId);
    }
    return false;
  }

  addToFavorites(pokemonId: string): void {
    let favorites: string[] = [];

    // Check if there are existing favorites in localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }

    // Check if the Pokémon is already in the favorites list
    if (!favorites.includes(pokemonId)) {
      favorites.push(pokemonId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }
}
