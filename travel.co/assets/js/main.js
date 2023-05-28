const BASE_URL = "http://localhost:8080/cards";
let header = document.querySelector("header");
let menuIcon = document.querySelector("#menuIcon");
let row = document.querySelector(".row");
let sortBtn = document.querySelector("#sortBtn");
let searchInput = document.querySelector(".form-control");
let showMore = document.querySelector("#showMore");
let nav = document.querySelector("nav");
let copyArray = [];
let filteredData = [];
let maxLength = 6;

async function getAllCards() {
  const res = await axios(BASE_URL);
  const data = await res.data;
  copyArray = data;
  filteredData =
    filteredData.length || searchInput.value
      ? filteredData.slice(0, maxLength)
      : data.slice(0, maxLength);
  row.innerHTML = "";
  filteredData.forEach((el) => {
    row.innerHTML += `
    <span class="col-sm-12 col-md-4 col-lg-4 my-3">
    <div class="card">
      <img src="${el.img}" alt="" />
      <div class="card-text">
        <i class="fa-solid fa-location-dot"></i>
        <p>${el.title}</p><br>
        <i class="px-2">Price:</i><p>${el.price}</p>
      </div>
      <div class="px-5">
      <i style="font-size:22px;color:yellow"class="fa-solid fa-cart-shopping" onclick=favorite(${el.id},this)></i>
      <i style="font-size:22px;color:red" class="fa-solid fa-trash" onclick=deletecard(${el.id},this)></i>
      <a href="add-edit.html?id=${el.id}"><i style="font-size:22px;color:green" class="fa-solid fa-pen-to-square"></i></a>
      <a href="details.html?id=${el.id}" style="font-size:22px;color:blue">Details</a>
      </div>
    </div>
  </span>
    `;
  });
}
getAllCards();
// delete
async function deletecard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
// favorite
async function favorite(id){
    const res=await axios(`${BASE_URL}/${id}`)
    const obj=await res.data
    await axios.post(`http://localhost:8080/favorite`,obj)

}
// search
searchInput.addEventListener("input", function (e) {
  filteredData = copyArray
    .slice(0, maxLength)
    .filter((item) =>
      item.title
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
  getAllCards();
});
// sortBtn
sortBtn.addEventListener("click",function(){
    if(this.innerHTML=="Asscending"){
        filteredData=filteredData.sort((a,b)=>a.price-b.price)
        getAllCards()
        this.innerHTML="Desscending"
    }else if(this.innerHTML=="Desscending"){
        filteredData=filteredData.sort((a,b)=>b.price-a.price)
        getAllCards()
        this.innerHTML="Default"
    }else{
        filteredData=copyArray
        getAllCards()
    }
})
// showMore
showMore.addEventListener("click",function(){
    maxLength+=6
    filteredData=copyArray.slice(0,maxLength)
    getAllCards()
})

// scrooll;
function scrollFunc() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.style.background = "#1ca7e2";
  } else {
    header.style.background = "";
  }
}
window.addEventListener("scroll", scrollFunc);
// menuIcon
menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");
  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-x")
    : (this.classList = "fa-solid fa-bars");
});
