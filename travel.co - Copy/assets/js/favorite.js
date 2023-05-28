const BASE_URL = "http://localhost:8080/favorite";
let row = document.querySelector(".row");
async function favoritecard() {
  const res = await axios(BASE_URL);
  const data = await res.data;

  row.innerHTML = "";
  data.forEach((el) => {
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
          
          <i style="font-size:22px;color:red" class="fa-solid fa-trash" onclick=deletecard(${el.id},this)></i>
          
          </div>
        </div>
      </span>
        `;
  });
}
favoritecard();
// delete
async function deletecard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
