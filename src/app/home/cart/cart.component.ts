import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartList: any [] = []
  totalPrice: number = 0.00
  constructor(private modalCtr: ModalController,private navParams: NavParams) { }

  ngOnInit() {
    this.cartList = this.navParams.get('cartList')
    this.calculateTotalPrice()
  }

  increaseQuantity(index){
    this.cartList[index].quantity = this.cartList[index].quantity + 1 ;
    this.cartList[index].totalPrice = this.cartList[index].quantity * this.cartList[index].price
    this.calculateTotalPrice()
  }

  reduceOrRemoveFromCart(index){
    this.cartList[index].quantity -= 1
    this.cartList[index].totalPrice = this.cartList[index].quantity * this.cartList[index].price
    if(this.cartList[index].quantity == 0){
      delete this.cartList[index].quantity;
      this.cartList.splice(this.cartList.indexOf(this.cartList[index]),1)
    }
    this.calculateTotalPrice()
  }

  calculateTotalPrice(){
    this.totalPrice = 0.00
    for (let index = 0; index < this.cartList.length; index++) {
      const element = this.cartList[index];
      this.totalPrice += element.totalPrice
    }
  }
  
  close() {
    this.modalCtr.dismiss({cart: this.cartList, total: this.totalPrice})
  }
}
