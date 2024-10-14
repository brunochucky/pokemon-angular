import { Component } from "@angular/core";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [PokemonListComponent, RouterModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Pokemon App";
}
