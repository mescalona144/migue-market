import { computed } from "@angular/core";
import { patchState, signalStore, withState, withMethods, withComputed } from "@ngrx/signals";
import { Product } from "@shared/models/product.interface";


export interface CartStore {
    products: Product[];
    totalAmount: number;
    productCount: number;
}

const initialState: CartStore ={
    products: [],
    totalAmount: 0,
    productCount: 0
}

export const CartStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withComputed(({products}) => ({
        productsCount: computed(() => calculateProductCount(products())),
        totalAmount: computed(() => calculateTotalAmount(products()))
    })),
    withMethods(({products, ...store}) => ({
        addToCart(product: Product) {
            patchState(store,  {products: [...products(), product]})
        },
        removeFromCart(id: number){
            const updatedProducts = products().filter(product => product.id === id);
            patchState(store, {products: updatedProducts})

        },
        clearCart(){
            patchState(store, initialState)
        }
    }))
) 

function calculateTotalAmount(products: Product[]): number {
    return products.reduce(
      (acc, product) => acc + product.price * product.qty,
      0
    );
  }
  
  function calculateProductCount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.qty, 0);
  }