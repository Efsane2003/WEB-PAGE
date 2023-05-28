const BASE_URL = "http://localhost:8080/cards";
let submitBtn=document.querySelector("#submitBtn")
let row = document.querySelector(".row");
let form = document.querySelector("form");
let allInputs = document.querySelectorAll(".form-control");

let id= new URLSearchParams(window.location.search).get("id")
if(id){
    const res=axios(`${BASE_URL}/${id}`).then((res)=>{
        // allInputs[0].value=res.data.img
        allInputs[1].value=res.data.title,
        allInputs[2].value=res.data.price
    })
    submitBtn.innerHTML="EDIT"
}
form.addEventListener("submit",async function(e){
    e.preventDefault()
    let obj={
        img:`./assets/img/${allInputs[0].value.split("\\")[2]}`,
        title:allInputs[1].value,
        price:allInputs[2].value
    }
 if(!id){
    await axios.post(`${BASE_URL}`,obj)
    window.location="index.html"
 }else{
    await axios.patch(`${BASE_URL}/${id}`,obj)
    window.location="index.html"
 }
})

