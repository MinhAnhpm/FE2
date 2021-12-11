function menuButton() {
  // sideNav.style.right = "-250px";
  menuBtn.onclick = function () {
    if (sideNav.style.right == "-250px") {
      sideNav.style.right = "0";
      menu.src = "/image/close.png";
    } else {
      sideNav.style.right = "-250px";
      menu.src = "/image/menu.png";
    }
  };
}

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800,
  speedAsDuration: true,
});
var urlImg;
function previewImage(event) {
  //doc du lieu tren may nguoi dung
  var reader = new FileReader();
  var imageField = document.getElementById("image-field");
  var result = document.getElementById("result");

  reader.onload = function () {
    if (reader.readyState == 2) {
      imageField.src = reader.result;
      result.style.display = "block";
    }
  };

  reader.readAsDataURL(event.target.files[0]);
  document.getElementById("image-field").style.opacity = 1.0;
  urlImg = URL.createObjectURL(event.target.files[0]);
  console.log(urlImg);
}

function display() {}

function clickSearch() {
  let keyword = document.getElementById("txtSearch").value;
  search(keyword);
}

function search(keyword) {
  axios
    .get(`http://104.215.180.216:5000/FavoritePlant/search?keyword=${keyword}`)
    .then((result) => {
      console.log(result);
      document.getElementById("nameP").innerHTML = result.data[0].name;
      document.getElementById("descriptionP").innerHTML =
        result.data[0].description;
      document.getElementById("regionP").innerHTML = result.data[0].region;
      document.getElementById("benefitsP").innerHTML = result.data[0].benefits;
      document.getElementById("careTipsP").innerHTML = result.data[0].careTips;
    //   document.getElementById("re-image").src = result.data[0].image;
    document.getElementById("re-image").src = result.data[0].image;
    })
    .catch((error) => {
      alert("Can't find this plant!");
    });
}


function favorite() {
  var favor = document.getElementById("favor");
  favor.src = "/image/red-heart.JPG";
  let userID, plantID, description, image;
  // userID = 
  // plantID = document.getElementById("")
  // description = document.getElementById("")
  image = document.getElementById("re-image").src;
  addFavorPlant("", "", "", image);
}


function addFavorPlant(userID,plantID, description, image){
  let data = {
      "userID" : userID,
      "plantID" : plantID,
      "description" : description,
      "image" : image
  }
  axios.post(`http://localhost:5000/FavoritePlant/`, data)
  .then((result)=> {

  }).catch((error)=> {
      alert("Existed in My Garden!");
  })
}