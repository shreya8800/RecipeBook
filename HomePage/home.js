window.onload=function() //it work only once and its work is to have all html elemets fetched before doing anything
{
    const search=document.querySelector('.srchInput');
    const recipes=JSON.parse(localStorage.getItem('recipes'))||[];
    // console.log(recipes);
    const mainContainer=document.querySelector('main');
    function renderRecipes(recipesToRender)
    {
        mainContainer.innerHTML='';
        recipesToRender.forEach((recipe,index)=>{
        const recipecart=document.createElement('div');
        recipecart.classList.add('recipe_cart');

        const imageHTML = recipe.image ? 
            `<img src="${recipe.image.startsWith('data:image') ? recipe.image : 'data:image/png;base64,' + recipe.image}" alt="${recipe.recipeName}" class="recipe-img" />` 
            : '';
        recipecart.innerHTML=
        `    
            <div class="recipe-header">
                ${imageHTML}
                <h3 class="recipe-name">${recipe.recipeName}</h3>
            </div>
            <div class="recipe-body">
                <button class="view-recipe"
                onClick="viewrecipe(${index})">View Recipe</button>

            </div>`
        
            
        mainContainer.appendChild(recipecart);    
    });
}

renderRecipes(recipes);
// srching from recipes
search.addEventListener('input',()=>{
    const srchterm=search.value.toLowerCase();
    const filterRecipe=recipes.filter((recipe)=>{
        return recipe.recipeName.toLowerCase().includes(srchterm)
    })
    renderRecipes(filterRecipe);  // Re-render filtered recipes
    
})
}
function viewrecipe(index)
{
    const recipes=JSON.parse(localStorage.getItem('recipes'))|| [];
    const selectedrecipe=recipes[index];
    localStorage.setItem('selectedrecipe',JSON.stringify(selectedrecipe));
    //navigate to new page
    window.location.href="../ViewRecipe/view.html";

    //why use local storage?
    /**
     * bcz when navigting to new page we can 
     * use localStorage to ransfer to selected-recipe's data 
     * page without needing of backend server
     * and if we want to access that paticular 
     * recipe ,we can do getItem from storage (selecterecipe)
     */
} 










