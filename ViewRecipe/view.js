window.onload=function()
{
    let selectedrecipe
    try{
        selectedrecipe=JSON.parse(localStorage.getItem('selectedrecipe'));
    }
    catch(e)
    {
        console.log("error parsing selectedRecipe from localStorage :",e)
        selectedrecipe=null;
    }
    if(!selectedrecipe)
    {
        console.error("there is no such selected field");
        document.body.innerHTML="<h1>Recipe Not Found!</h1>";
        return;
    }
    else{
        console.log(selectedrecipe);
        const navBar=document.querySelector('nav')
        const heading=document.createElement('h3')
        const mainContainer=document.querySelector('main');
        
        const imageHTML = selectedrecipe.image ? 
            `<img src="${selectedrecipe.image.startsWith('data:image') ? selectedrecipe.image : 'data:image/png;base64,' + selectedrecipe.image}" alt="${selectedrecipe.recipeName}" class="recipe-img" />` 
            : '';
        heading.className="recipe-name"
        heading.innerHTML=selectedrecipe.recipeName;
        navBar.appendChild(heading);

        //to make sure they get iterated over,make sure they are arrya
        //not a string something,,if its a string make it into array
        const ingredientArray=Array.isArray(selectedrecipe.ingredients)?selectedrecipe.ingredients:
                (selectedrecipe.ingredients.split(',').map(ingredient=>ingredient.trim()))

        const ingredients_list=document.createElement('ul');
        ingredients_list.classList='recipe-ingredient'
        ingredients_list.innerHTML=ingredientArray.map((ingredient)=>
        `<li>${ingredient}</li>`).join('');

        //make array for steps and make ol for it and then iterate over them using map and make list
        const stepsArray=Array.isArray(selectedrecipe.steps)?
        selectedrecipe.steps:selectedrecipe.steps.split('.').map(step=>step.trim()).filter(Boolean)

        const steps_list=document.createElement('ol');
        steps_list.classList='recipe-steps'
        steps_list.innerHTML=stepsArray.map(step=>`<li>
            ${step}
            </li>`).join('');
        


        //creating a new div for writing all information
        const recipeInfo=document.createElement('div')
        recipeInfo.innerHTML=
        `<h2 class="heading">Ingredients</h2>`
        recipeInfo.appendChild(ingredients_list)
        
        recipeInfo.innerHTML+=`<h2 class="heading">Steps</h2>`
        recipeInfo.appendChild(steps_list);

        recipeInfo.innerHTML+=imageHTML;

        mainContainer.appendChild(recipeInfo);
    }
    
}