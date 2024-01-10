export const useCartStore = defineStore('cart', {
  state: () => ({ cartItems : [] }),

  getters: {
    numberOfItems: (state) => state.cartItems.length
  },

  actions: {
          addToCart(product){
            for(let i=0;i<this.cartItems.length;i++){
                  if(product.id == this.cartItems[i].id){
                      this.cartItems[i].quantity++;
                      return
                  }
            }
            this.cartItems.push(product)
          },
          
         

          deleteFromCart(product) {
            this.cartItems = this.cartItems.filter((prod) => {
              if (prod.id === product.id) {
                if (prod.quantity === 1) {
                  return false; // Remove the item
                } else {
                  prod.quantity--; // Decrement quantity
                  return true; // Keep the item
                }
              }
              return true; // Keep other items
            });
          }

      } 
      
})    


  // export const useCartStore = defineStore('cart', () => {
    
  //   const cartItems = ref([])
    
  //   const numberofItems = computed(()=>{
  //       return cartItems.value.length
  //   })
  //   function addtoCart(item) {

  //       cartItems.value = [...cartItems.value, item]
  //   }
  
  //   return { numberofItems,addtoCart,cartItems }
  // })

 