const imageToBase64 = async(image) => {
    try {
        const reader= new FileReader();
    reader.readAsDataURL(image);

    const data= await new Promise((resolve,reject)=>{
        reader.onload=()=>resolve(reader.result);
        reader.onerror=(error)=>reject(error);
    })
    return data
    } catch (error) {
        console.log("error", error);
    }
    
}

export default imageToBase64