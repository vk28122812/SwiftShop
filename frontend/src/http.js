const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export async function validateLogin({email,password}) {
    try{
        const response = await fetch(`${BACKEND_URL}/api/login`, {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({email,password})
        })
        const resData = await response.json();
        return resData;
    }catch(error){
        return {error:error};
    }
}

export async function signUp({email, password,name}){
    try{
        const response = await fetch(`${BACKEND_URL}/api/signup`, {
            method:'POST',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify({email,password,name})
        })
        const resData = await response.json();
        console.log(resData);
        return resData;
    }catch(error){
        return {error:error};
    }
}

export async function fetchProducts(){
    try{
        const response = await fetch(`${BACKEND_URL}/api/products`);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const products = await response.json();
        return products; 
    }catch(error){
        console.error("Failed to fetch products: ", error);
        return [];
    }
}

export async function fetchZipDetails(zip){
    try{
        const  response = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const resData = await response.json();
        return resData[0];
    }catch(e){
        console.error("Failed to fetch zip",error);
        return {status:"error"};
    }
}