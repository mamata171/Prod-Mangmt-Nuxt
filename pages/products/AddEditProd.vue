<template>
    <div class="form-div" style="width: 40%;margin: auto;">
        <h2 class="m-4 text-center">Add Product</h2>
        <form action="" @submit.prevent="submitFun">
            <div class="mb-3">
            <label for="" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="name" name="name" v-model="name" placeholder="enter product name">
            </div>

            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Brand</label>
            <input type="text" class="form-control" id="brand" name="brand" v-model="brand" placeholder="enter brand name">
            </div>


            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">price</label>
            <input type="number" class="form-control" id="price" name="price" v-model="price" placeholder="enter price">
            </div>

            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" name="desc" v-model="desc" rows="3" placeholder="enter description"></textarea>
            </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Save product</button>
        </div>
    </form>
    </div>
</template>

<script setup>

 const name = ref('')
 const brand = ref('')
 const price = ref('')
 const desc = ref('')
 const newprod = ref(null)



function clearForm(){
     name.value = ''
     brand.value = ''
     price.value= ''
     desc.value = ''


}

 function submitFun(e){
    e.preventDefault()
    

      newprod.value = {
        name : name.value,
        brand : brand.value,
        price : price.value,
        desc : desc.value
    }

    console.log(newprod.value);
     // Posting data
     createProd()

    
   
}
const createProd = async () => {
        try {
           let response = await $fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            body: newprod.value
            })
            console.log('data posted successfully')
            alert("data posted successfully")
            console.log(response);
            clearForm()
        } catch (error) {
            console.error('Error sending data:', error)
            alert("error in sending data")
            
        }
        
    }






    
</script>

<style>

</style>




