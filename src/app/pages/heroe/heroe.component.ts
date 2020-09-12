import { HeroesService } from './../../services/heroes.service';
import { HeroeModel } from './../../models/heroe.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ){
      this.heroesService.getHeroe( id )
          .subscribe( (resp: HeroeModel) => {
            this.heroe = resp;
            this.heroe.id = id;
          } );
    } 

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    // actualizar Heroe ya que existe un valor en el id
    if ( this.heroe.id ){

      peticion = this.heroesService.actualizarHeroe( this.heroe );
        // .subscribe( resp => {
        //   console.log(resp);
        // } );

    // Crear el Heroe
    } else {

      peticion = this.heroesService.crearHeroe( this.heroe );
        // .subscribe( resp => {
        //   console.log(resp);
        // } );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });


    });


  }

}
