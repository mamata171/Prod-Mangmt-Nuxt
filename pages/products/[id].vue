
<template>
    <div class="form-div" style="width: 40%;margin: auto;">
        <h2 class="m-4 text-center">Edit Product</h2>
        <form action="" @submit.prevent="submitFun">
            <div class="mb-3">
            <label for="" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="name" name="name" v-model="name" required>
            </div>

            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Brand</label>
            <input type="text" class="form-control" id="brand" name="brand" v-model="brand" required>
            </div>


            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">price</label>
            <input type="number" class="form-control" id="price" name="price" v-model="price" placeholder="enter price" required>
            </div>

            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" name="desc" v-model="desc" rows="3" placeholder="enter description"></textarea>
            </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-primary" @click="updateProd">save product</button>
        </div>
    </form>
    </div>
</template>

<script setup>


let name = ref('')
 let brand = ref('')
 let price = ref('')
 let desc = ref('')


const products = ref([])
let currentProd = ref([])    // Array cureprod = [{title : 'jshdj'},{}]

const id = useRoute().params.id
  // Fetching data
    const {data,pending,error} = await useFetch('https://dummyjson.com/products?limit=100')
    products.value = data._rawValue.products

    currentProd.value = products.value.filter((prod) => prod.id == id)
    console.log(id);
    console.log("current data ",currentProd.value);

    name.value = currentProd.value[0].title
    brand.value = currentProd.value[0].brand
    price = currentProd.value[0].price
    desc = currentProd.value[0].description


    const updateProd = async ()=>{
        try{
            await $fetch(`https://dummyjson.com/products/${id}` , {
                method : 'PUT',
                body : {title : name.value,brand:brand.value,price:price.value,desc:desc.value}
            })
            console.log("post updated successfully");
            alert("Product updated successfully")
            navigateTo({ path: '/' })

        }catch(error){
            console.log("Error in updating the data");
        }
    }



</script>

<style>

</style>




