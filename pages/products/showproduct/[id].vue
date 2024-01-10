<template>
    {{ cartStore.numberOfItems }}
    <div class="navbar">
        <NuxtLink to="/"><p class="home-btn">Home</p> </NuxtLink>
       
       <NuxtLink to="/products/cartPage">
        <button class="go-to-cart-btn"> Go to Cart
            <nuxt-icon name="cart" class="big-cart ms-1"></nuxt-icon>
            <span> ({{ cartStore.numberOfItems }})</span>
        </button>
    </NuxtLink> 

    </div>
    <div class="product-details">
       <div class="left-side">
            <div class="main-img">
                <img :src="prodObj.images[0]" alt="">
            </div>
            <div class="small-imgs">
                <div v-for="imgsrc in prodObj.images.slice(1,5)">
                <img :src="imgsrc" alt="">
            </div>
            </div>
            
       </div>
                    
       <div class="right-side mt-0">

            <div class="right1">
                <div class="title">{{ prodObj.title }}</div>
                <div class="visit blue-text">Visit the {{ prodObj.brand }} Store</div>
                <div class="brand">{{ prodObj.brand }}</div>
                <div class="rating">{{ prodObj.rating}} 
                    <span class="blue-text">ratings ***** 
                        <span style="color: black;margin: auto 7px;">| </span> 
                        1000+ answered questions </span> </div>
                <div class="numOfBuyers small-text"> {{ Math.floor((Math.random() * 1000) + 1)}}+ people bought in past month</div>
            </div>
            <hr>

            <div class="right2">
                <div class="red-box">Deal of the Day</div>
                <div class="discount"> {{ prodObj.discountPercentage }}% ${{ prodObj.price }} </div>
                <div class="originalMrp "> M.R.P. : 
                    <span class="text-decoration-line-through">{{ prodObj.price + (prodObj.price * (prodObj.discountPercentage/100)) }}</span>  
                </div>
            
                <div class="inclusive-text">Inclusive of all taxes</div>
            </div>
            <hr>
            
            <div class="right3">
                <div>Current offers</div>
                <div class="offer-box">
                    <div class="text-dark"> <nuxt-icon name="offer2"></nuxt-icon><span class="ms-2">Bank offer</span> </div>
                   <div>Upto ₹150.00 discount on HSBC Bank Credit Cards</div> 
                   <div class="blue-text">4 offers</div>
                </div>
            </div>

            <div class="right4 mt-3">
                <div class="wishlist">
                     <span class="btn-com btn-wish"><nuxt-icon name="wishlist" class="icon me-2"></nuxt-icon>WishList</span>
                </div>

                <div class="cart">
                     <span class="ms-1 btn-cart"> 
                        <nuxt-icon name="cart" class="icon me-2"></nuxt-icon> 
                        <span v-if="!added" @click="addtocartfun(prodObj)" class="addtocart">Add to cart</span>

                        <span class="incDecBtn" v-if="added">
                            <button @click="deccartItem(prodObj)"> - <span class="text-small">{{ clickedbtn=='decbtn'? prodObj.quantity :'' }}</span></button>
                            <button @click="incrcartItem(prodObj)"> + <span class="text-small">{{clickedbtn=='incbtn'? prodObj.quantity :'' }}</span></button>
                        </span>
                    </span>
                </div>
            </div>
            
       </div>

       </div>



</template>

<!-- ()=>{cartStore.addtoCart(prodObj)} -->

<script setup>
const id = useRoute().params.id
let products = ref([])
let currentProd = ref([])
let prodObj = ref({})
let added = ref(false)
let clickedbtn = ref('')


// Fetching data
const {data,pending,error} = await useFetch('https://dummyjson.com/products?limit=100')
products.value = data._rawValue.products

currentProd.value = products.value.filter((prod)=> prod.id == id)
prodObj = currentProd.value[0]
let quantity = ref(prodObj.quantity)

import {useCartStore} from "../../../store/cartStore"
let cartStore = useCartStore()

if(cartStore.numberOfItems){
    let index = cartStore.cartItems.findIndex((elm) => elm.id == prodObj.id)
    if(index!=-1){
        added.value = true
        console.log("already added : ",added.value);
    }

}



function addtocartfun(prodObj){
    prodObj.quantity = 1
    cartStore.addToCart(prodObj)
    added.value= true
    console.log("added value ",added.value); 
}       

function incrcartItem(prodObj){
    clickedbtn.value = "incbtn"
    cartStore.addToCart(prodObj)
    console.log("clicked button value :",clickedbtn.value);
}



async function deccartItem(prodObj) {
    clickedbtn.value = "decbtn"
    console.log("clicked button value :",clickedbtn.value);
  await cartStore.deleteFromCart(prodObj); 

  // Check for product removal:
  const isRemoved = !cartStore.cartItems.some((item) => item.id === prodObj.id);

  if (isRemoved) {
    added.value = false; 
    clickedbtn.value= ''
  } else {
    console.log("Product quantity decremented:", prodObj.quantity);
    // Update UI or perform other actions as needed
  }
}



</script>


<style>
.text-small{
    font-size: 11px;
}
.icon{
    font-size: 1.3rem;
}
.home-btn{
    text-decoration: none !important;
    margin: 4px 15px;
    color: black !important;
}

.navbar{
    display: flex;
    justify-content: space-between;
    padding: 7px 20px 0px 20px;
}

.big-cart{
    font-size: 1.2rem;
}
.go-to-cart-btn{
    border: none;
    padding: 0px 10px;
    background-color: rgb(255, 213, 0);
    border-radius: 5px;
}
.product-details{
    display: flex;
    height: 100vh;
    align-items: center;
    gap: 40px;
    justify-content: center;
}

.main-img{
    display: flex;
    justify-content: center;
}
.main-img img{
    max-width: 400px;
    height: 400px;
}

.small-imgs{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.small-imgs img{
    widows: 70px;
    height: 70px;
}

.blue-text{
    color: rgb(42, 176, 244);
}

.small-text{
    margin-top: 6px;
    font-size: 12px;
}

.text-dark{
    font-weight: 700;
}
.red-box{
    background-color: rgb(211, 44, 44);
    color: white;
    display: inline-block;
    border-radius: 4px;
    padding: 4px 6px;
    font-size: 12px;
    font-weight: 600;
   margin-bottom: 5px;
}

.title{
    font-size: 2rem;
    font-weight: 700;
    /* letter-spacing: 1px; */
    margin-bottom: 6px;
}

.offer-box{
    margin-top: 4px;
    widows: 400px;
    padding: 7px 12px;
    box-shadow: 0px 0px 2px 1px rgb(213, 213, 213);
}

.right4{
    display: flex;
    gap: 13px;
    font-size: 1rem;
}
.btn-com{
    padding: 4px 10px;
    background-color: black;
    color: white;
    border-radius: 7px;
    cursor: pointer;
}

.btn-wish{
    background-color: rgb(240, 29, 92);
}


.addtocart{
    cursor: pointer;
}

.cart{
    width: 150px;
}

.btn-cart{
    background-color: rgb(255, 174, 0);
    padding: 4px 10px;
    color: white;
    border-radius: 7px;
}

.incDecBtn button{
    border: none;
    margin-right: 5px;
    background-color: transparent;
    font-size: 1.3rem;
    color: white;
    cursor: pointer;
    display: inline-block;
 

}

.incDecBtn button:hover{
    transform: scaleX(1.5);


}

@media screen and (max-width:780px) {
    .product-details{
        flex-direction: column;
        padding: 20px 25px;
        margin-top: 20px;
    }

    
}

@media screen and (max-width:985px) {
    .main-img img{
        width: 350px;

    }
   
    
}

</style>

