export  function UseFetch(){

    const {data,pending,error} =  useFetch('https://dummyjson.com/products?limit=100')
    return {data,pending,error}
}