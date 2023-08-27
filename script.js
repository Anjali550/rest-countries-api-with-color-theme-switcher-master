const dropList= document.querySelector(".drop");
function droplist(){

        dropList.style.display = "block";
     
    }

// dropList.classList.toggle("showdropdown");

function getCountry(){
    fetch(`https://restcountries.com/v2/all`)
    .then((data)=>{return data.json})
    .then((result)=>{
        console.log(result);
    })
    .catch((error) => console.log(error));
}
getCountry();