import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {


    this.heroesService.getHeroes()
      .subscribe( resp => {
        console.log(resp);
        this.heroes = resp;
      } );

  }


  borrarHeroe( heroe: HeroeModel, i: number ){

    Swal.fire({
      title: 'Está seguro ?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      console.log(resp);
      if ( resp.value ){
        this.heroes.splice( i, 1 );
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }

    });


  }

}
