
import { MEAT_API } from './../app.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItemModel } from 'app/restaurants-detail/shopping-cart/cart-itemMode';
import { ShoppingCartService } from './../restaurants-detail/shopping-cart/shopping-cart.service';
import { Injectable } from "@angular/core";
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService,
        private http: HttpClient) {
    }

    cartItems(): CartItemModel[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItemModel) {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItemModel) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItemModel) {
        this.cartService.removeItem(item);
    }

    itemsValue(): number {
        return this.cartService.total();
    }

    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .pipe(
                map(order => order.id));
    }

    clear() {
        this.cartService.clear();
    }
}
