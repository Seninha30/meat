import { CartItemModel } from './../restaurants-detail/shopping-cart/cart-itemMode';
import { RadioOptionModel } from './../shared/radio/radio-option-Model';
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattner = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattner = /^[0-9]*$/
  orderForm: FormGroup;
  paymentsOption: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'DIN' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  delivery: number = 8;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattner)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattner)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattner)]),
      optionaladdress: this.formBuilder.control(''),
      paymentOtion: this.formBuilder.control('', [Validators.required])
    });
  }

  cartItems(): CartItemModel[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItemModel) {
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItemModel) {
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItemModel) {
    return this.orderService.remove(item);
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  checkOrder(order: Order) {
    order.orderItem = this.cartItems()
      .map((item: CartItemModel) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order)
      .subscribe((orderId) => {
        this.router.navigate(['/order-sumary']);
        this.orderService.clear();
      })
  }
}
