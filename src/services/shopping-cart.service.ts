import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from 'src/models/event';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private products: Product[];

  constructor() {
    this.products = this.productsSubject$.getValue();
  }

  getProducts() {
    return this.productsSubject$.asObservable();
  }

  addSession(event: Event, date: string) {
    let productInShoppingCartIndex = this.products?.findIndex(product => product.event.id === event.id);
    if (productInShoppingCartIndex >=0 ) {
      let sessionInProductIndex = this.products[productInShoppingCartIndex].sessionsProduct?.findIndex(sessionProduct => sessionProduct.date === date);
      if (sessionInProductIndex >=0 ) {
        this.products[productInShoppingCartIndex].sessionsProduct[sessionInProductIndex].quantity++;
      } else {
        this.products[productInShoppingCartIndex].sessionsProduct.push({ date: date, quantity: 1 });
      }
    } else {
      this.products.push({ event: event, sessionsProduct: [{ date: date, quantity: 1 }] });
    }
    this.productsSubject$.next(this.products);
  }

  removeSession(event: Event, date: string) {
    let productInShoppingCartIndex = this.products?.findIndex(product => product.event.id === event.id);
    let sessionInProductIndex = this.products[productInShoppingCartIndex].sessionsProduct?.findIndex(sessionProduct => sessionProduct.date === date);
    if (this.products[productInShoppingCartIndex].sessionsProduct[sessionInProductIndex].quantity > 1) {
      this.products[productInShoppingCartIndex].sessionsProduct[sessionInProductIndex].quantity--;
    } else {
      let sessionsProducts = this.products[productInShoppingCartIndex].sessionsProduct.filter(sessionProduct => sessionProduct.date !== date);
      this.products[productInShoppingCartIndex].sessionsProduct = sessionsProducts;
      if(this.products[productInShoppingCartIndex].sessionsProduct.length === 0){
        let productsUpdated = this.products.filter(product => product.event.id !== event.id);
        this.products = productsUpdated;
      }
    }
    this.productsSubject$.next(this.products);
  }
}
