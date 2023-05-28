let row = document.querySelector(".row");
const BASE_URL = "http://localhost:8080/cards";
let id= new URLSearchParams(window.location.search).get("id")
async function detailsCard(){
    const res= await axios(`${BASE_URL}/${id}`)
    const obj=await res.data 
    row.innerHTML=""
    row.innerHTML=`
    <span class="col-sm-12 col-md-4 col-lg-4 my-3">
        <div class="card">
          <img src="${obj.img}" alt="" />
          <div class="card-text">
            <i class="fa-solid fa-location-dot"></i>
            <p>${obj.title}</p><br>
            <i class="px-2">Price:</i><p>${obj.price}</p>
          </div>
        </div>
      </span>
    `

}
detailsCard()