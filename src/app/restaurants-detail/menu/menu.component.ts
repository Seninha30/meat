import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { RestaurantService } from 'app/restaurants/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute) { }

  menu: Observable<MenuItem[]>;

  ngOnInit() {
    this.menu = this.restaurantService.getMenuItem(this.route.parent.snapshot.params['id']);
  }
}
