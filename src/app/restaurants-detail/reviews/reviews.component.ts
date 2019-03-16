import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'app/restaurants/restaurant.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  constructor(
    private restaurantService: RestaurantService, 
    private route : ActivatedRoute
    ) { }

  ngOnInit() {
    this.reviews = this.restaurantService.reviwsOfRestaurant(this.route.parent.snapshot.params['id']);
  }

}
