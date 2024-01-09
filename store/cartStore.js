export const useCartStore = defineStore('cart', () => {
    
    const cartItems = ref([
        {id:'dummyid',title:'Nokia',images:['~public/favicon.ico']},{id:'dummyid',title:'i phone 13',images:['~public/favicon.ico']}
    ])
    // const numberofItems = cartItems.value.length
    const numberofItems = computed(()=>{
        return cartItems.value.length
    })
    function addtoCart(item) {
        cartItems.value = [...cartItems.value,item]
    }
  
    return { numberofItems,addtoCart,cartItems }
  })