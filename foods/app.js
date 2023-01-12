//display random the foods

function display(){
    let loopTime = 6

    for (let j=0;j<loopTime; j++){

        let urlRandom = "https://www.themealdb.com/api/json/v1/1/random.php"
        let cart = document.getElementById("cart")
        fetch(urlRandom)
        .then((response) => response.json())
        .then((data)=>{
            
            let myMeal = data.meals[0]
    
            
            
            // console.log(ingredients)
            
            cart.innerHTML+= `
            <div class="cart col-sm-12 col-md-4 col-lg-4"  >
            <div class="card" style="width: 18rem;" >
            
                <img class="card-img-top" src="${myMeal.strMealThumb}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${myMeal.strMeal}</h5>
                    <h6 class="card-title"> ${myMeal.strCategory}</h6> 
            
            
                    <button type="button" class="btn btn-primary" id="btnSearche${j}" data-bs-toggle="modal" data-bs-target="#staticBackdrop${myMeal.idMeal}">
                    Instructions
                    </button>
                </div>
            </div>  

            </div>  
                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop${myMeal.idMeal}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Meals</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${myMeal.strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/><br><br>
                        <p>Name : ${myMeal.strMeal}</p>
                        <p>Area : ${myMeal.strArea}</p>
                        <p>recipe : ${myMeal.strInstructions}</p>
                    </div>
                
                </div>
                </div>
            
            </div>
 
                      
            `

    
                    
        });
    }

    
}
display()



//search the meals

document.getElementById("search").addEventListener("keyup", function(){
    let searchValue = this.value.toLowerCase()
    let url1 = "https://www.themealdb.com/api/json/v1/1/search.php?s="
    let cart = document.getElementById("cart")
    fetch(url1 + searchValue)
    .then((response) => response.json())
    .then((data)=>{
        let dataFilter = data.meals.filter(meal => meal.strMeal.toLowerCase().includes(searchValue)) 
        // console.log(dataFilter)
        
        cart.textContent = ``
            if(searchValue == "" || searchValue == " "){
                //display te 6 random
                display()
            }else{
                for(let i in dataFilter){
                    cart.innerHTML+= `
                    <div class="cart col-sm-12 col-md-4 col-lg-4"  >
                    <div class="card" style="width: 18rem;" >
                        <img class="card-img-top" src=" ${dataFilter[i].strMealThumb}" >
                        <div class="card-body">
                        <h5 class="card-title">${dataFilter[i].strMeal}</h5>
                        <h6 class="card-title"> ${dataFilter[i].strCategory}</h6>  
                        <button type="button" class="btn btn-primary" id="btnSearche${i}" data-bs-toggle="modal" data-bs-target="#staticBackdrop${dataFilter[i].idMeal}">
                        Instructions
                        </button>
                        </div>
                    </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop${dataFilter[i].idMeal}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Meals</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${dataFilter[i].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/><br><br>
                            <p>Name : ${dataFilter[i].strMeal}</p>
                            <p>Area : ${dataFilter[i].strArea}</p>
                            <p>recipe : ${dataFilter[i].strInstructions}</p>
                        </div>
                    
                    </div>
                    </div>
                
                </div>
                
                
                
                    `
                } 
                
            }
        });
})


