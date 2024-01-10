<template>
    <div class="navbar">
        <NuxtLink to="/"> <li class="home-btn">Home</li> </NuxtLink>
    </div>

    <h2>Shopping Cart</h2>

    <!-- <div v-if="cartStore.numberOfItems>=1"> -->
    <div  v-for="product in cartStore.cartItems">
        <div class="cartItem">
             <div class="left-side">
                    <img :src="product?.images[0]" alt="image">
             </div>


             <div class="right-side">
              
                <div class="title">{{ product.title }}</div>
                <div class="brand"> Brand : {{ product.brand }}</div>
                <div class="in-stock">In stock</div>
                <div class="rating">{{ product.rating}} ratings </div>
                <div> Quantity : {{ product.quantity }}</div>
                <div><button class="btn btn-success my-2">Buy now</button> </div>

            </div>
        </div>

        <hr>
<!-- </div>    -->
    </div>
</template>

<script setup>
import { useCartStore } from '~/store/cartStore';
let cartStore = useCartStore()

</script>


<style scoped>
h2{
    margin-left: 60px;
}

.home-btn{
    text-decoration: none;
    color: black;
    list-style: none;
}
.cartItem{
    margin-top: 15px;
    display: flex;
    gap: 50px;
    align-items: center;
    margin-left: 60px;
}

.left-side img{
    width: 200px;
    height: 200px;
}




</style>