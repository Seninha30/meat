
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RestaurantService } from './restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { Observable, from } from 'rxjs';
import {debounceTime, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators'
@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSerach', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchForm: FormGroup;
  searchControl: FormControl;

  searchBarToggle = 'hidden'
  constructor(private restaurantService: RestaurantService,
    private fb: FormBuilder) {

  }
  restaurants: Restaurant[];
  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });


    this.searchControl.valueChanges
    .pipe(
      debounceTime(500), /* espera 500ms de intervalo entre a digitação para liberar a busca */
      distinctUntilChanged(), /*libera a consulta apenas se houver diferença entre a nova digitação e a última*/
      switchMap(x => this.restaurantService.restaurants(x)
      .pipe(catchError(error => from([])))))
      .subscribe(restaurantes => this.restaurants = restaurantes);

    this.restaurantService.restaurants()
      .subscribe(restaurantes => {
        this.restaurants = restaurantes;
      });
  }

  touggleSearch() {
    this.searchBarToggle = this.searchBarToggle === 'hidden' ? 'visible' : 'hidden';
  }
}
