import { Component } from '@angular/core';
import { HeroesService, Heroe} from 'src/app/services/heroes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  heroes:Heroe[]=[]
  heroesFiltro:Heroe[]=[]

  control = new FormControl();

  ngOnInit(): void{
    this.heroes = Array.from(this._heroesService.getHeroes());
    console.log(this.heroes);
  this.observerChangeSearch();
  }

  constructor(private _heroesService:HeroesService, private router:Router){
    
  }

  verHeroe(idx: number){
    console.log(idx);
    this.router.navigate(['/heroe',idx]);
  }

 observerChangeSearch(){
    this.control.valueChanges.
    pipe(
      debounceTime(500)
      ).subscribe(query => {
        this.obtenerPersonajesMedianteQuery(query);
        console.log(this.heroes);
        if(this.heroes.length == 0 && query.trim() == ""){
          this.heroes = Array.from(this._heroesService.getHeroes());
        }
    });
  }

  obtenerPersonajesMedianteQuery(query:string){
    this.heroes.length = 0;
    this._heroesService.getHeroes().forEach(heroe => {
      console.log(query);
      if(heroe.nombre.toLowerCase() == query.toLowerCase()){
        this.heroes.push(heroe);
      }
    });
  }
}

