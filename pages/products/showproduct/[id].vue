<template>
    <!-- {{ prodObj }} -->
    <div class="navbar">
        <NuxtLink to="/"><p class="home-btn">Home</p> </NuxtLink>
       
       <NuxtLink to="/products/cartPage">
        <button class="go-to-cart-btn"> Go to Cart
            <nuxt-icon name="cart" class="big-cart ms-1"></nuxt-icon>
            <span> ({{ cartStore.numberofItems }})</span>
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
                    <nuxt-icon name="wishlist" class="icon"></nuxt-icon> <span class="ms-1 btn-com btn-wish">WishList</span>
                </div>

                <div class="cart cursor-pointer" @click="()=>{cartStore.addtoCart(prodObj)}">
                    <nuxt-icon name="cart" class="icon"></nuxt-icon> <span class="ms-1 btn-com btn-cart">Add to cart</span>
                </div>
            </div>
            
       </div>

       </div>

</template>


<script setup>
const id = useRoute().params.id
let products = ref([])
let currentProd = ref([])
let prodObj = ref({})

// product properties


// Fetching data
const {data,pending,error} = await useFetch('https://dummyjson.com/products?limit=100')
products.value = data._rawValue.products

currentProd.value = products.value.filter((prod)=> prod.id == id)
prodObj = currentProd.value[0]

import {useCartStore} from "../../../store/cartStore"
let cartStore = useCartStore()




</script>


<style>
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
.btn-cart{
    background-color: rgb(255, 174, 0);
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

