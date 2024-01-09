<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Prducts-Manager</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <NuxtLink class="nav-link active" aria-current="page" to="/">Home</NuxtLink>
                    </li>

                    <li class="nav-item">
                        <NuxtLink class="nav-link active" to="/products/cartPage">
                          Cart  <nuxt-icon name="cart" class="big-cart ms-1"></nuxt-icon>
                        <span> ({{ cartStore.numberofItems }})</span>  
                        </NuxtLink> 
                    </li>
                  
                </ul>
                

                <form class="d-flex">
                    <NuxtLink to="/products/AddEditProd">
                   <button class="btn btn-outline-success" type="submit">Add Product</button>
                    </NuxtLink> 
                </form>
                </div>
            </div>
        </nav>
    </div>

    <div class="main-continer" style="width: 70%;margin: auto;margin-top: 40px;">
        <table class="table table-striped ">
   
            <thead>
                <tr>
                <th scope="col">PId</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th>Edit/Delete</th>
                </tr>
            </thead>
             <tbody>
                <div v-if="pending">
                        Loading ...
                </div>

                <div v-else-if="error">
                    Error in loading data
                </div>
               
                    <tr v-else v-for="product of products" :key="product.id">
                    <th scope="row">{{ product.id }}</th>
                    <td><NuxtLink to="">{{ product.title }}</NuxtLink> </td>
                    <td>{{ product.brand }}</td>
                    <td>{{  product.description}}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <div class="btns-div">
                            <NuxtLink class="btn btn-primary" :to="`/products/showproduct/${product.id}`">View</NuxtLink>
                            <NuxtLink class="btn btn-primary" :to="`/products/${product.id}`">Edit</NuxtLink>
                            <button class="btn btn-primary" @click="deleteProd(product.id)">Delete</button>
                        </div>
                    </td>

                    </tr>
        
               
            </tbody> 

            </table>
    </div>
    
</template>

<script setup>
import { useCartStore } from '~/store/cartStore';

    
    let products = ref([])

    let cartStore = useCartStore()
    // Fetching data
    const {data,pending,error} = await useFetch('https://dummyjson.com/products?limit=100')
    products.value = data._value.products                               

   
    
    // DELETE
    const deleteProd = async (pid) => {
    try {
        await $fetch(`https://dummyjson.com/products/${pid}`, {
        method: 'DELETE'
        })
        console.log('Post deleted successfully')
        alert("product deleted sucessfully")
    } catch (error) {
        console.error('Error deleting post:', error)
    }
}


</script>

<style>
.btns-div{
    display: flex;
    gap: 5px;
    align-items: center;
    height: 60px;

}


</style>

