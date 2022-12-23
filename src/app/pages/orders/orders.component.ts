import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../core/services";
import {Observable} from "rxjs";
import {Order} from "../../core/interfaces/order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]> = this.orderService.getOrders();

  constructor(
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
  }


}
