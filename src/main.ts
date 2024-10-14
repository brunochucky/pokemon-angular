import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, Route } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app/app.component";
import { PokemonListComponent } from "./app/components/pokemon-list/pokemon-list.component";
import { PokemonDetailComponent } from "./app/components/pokemon-detail/pokemon-detail.component";
import { FavoritesComponent } from "./app/components/favorites/favorites.component";

const routes: Route[] = [
  { path: "", component: PokemonListComponent },
  { path: "pokemon/:id", component: PokemonDetailComponent },
  { path: "favorites", component: FavoritesComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule)],
});
