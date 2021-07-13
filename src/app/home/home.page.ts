import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartComponent } from './cart/cart.component';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoading: boolean = false
  mainCategory: any = {}
  subCategoires: any[] = []
  productsList: any [] = []
  cartList: any [] = []
  categorySelected: number = -1
  totalPrice: number = 0.00
  constructor(private modalCtr: ModalController, private prodcut: ProductService) {}

  ngOnInit(ev?) {
    this.isLoading = true
    if(this.prodcut.dataCash.result){
      this.mainCategory = this.prodcut.dataCash.result
      this.subCategoires = this.prodcut.dataCash.result.sub_categories
      this.categorySelected = this.mainCategory.id
      this.productsList = this.mainCategory.products
      this.isLoading = false
    }
    this.prodcut.getProducts().subscribe( (response: any)=>{
      if(response.success && response.result){
        this.prodcut.dataCash = response
        this.mainCategory = response.result
        this.subCategoires = response.result.sub_categories
        this.categorySelected = this.mainCategory.id
        this.productsList = this.mainCategory.products
      }
      this.isLoading = false
      if (ev) ev.target.complete(); this.cartList = [];
    }, (err) =>{
      if (ev) ev.target.complete();
      console.log('ERR..', err)
    })
  }

  async presentCartModal() {
    const modal = await this.modalCtr.create({
      component: CartComponent,
      cssClass: 'my-custom-class',
      componentProps: {cartList : this.cartList}
    });
    modal.onDidDismiss().then( (data: any)=>{
      this.cartList = data.data.cart
      this.totalPrice = data.data.total
    });
    return await modal.present();
  }

  addToCart(index){
    this.productsList[index].quantity = 1
    this.productsList[index].totalPrice = this.productsList[index].quantity * this.productsList[index].price
    this.cartList.push(this.productsList[index])
    this.calculateTotalPrice()
  }

  increaseQuantity(index){
    this.productsList[index].quantity = this.productsList[index].quantity + 1 ;
    this.productsList[index].totalPrice = this.productsList[index].quantity * this.productsList[index].price
    this.calculateTotalPrice()
  }

  reduceOrRemoveFromCart(index){
    this.productsList[index].quantity -= 1
    this.productsList[index].totalPrice = this.productsList[index].quantity * this.productsList[index].price
    if(this.productsList[index].quantity == 0){
      delete this.productsList[index].quantity;
      this.cartList.splice(this.cartList.indexOf(this.productsList[index]),1)
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
}
