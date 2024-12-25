
const form =document.querySelector('form')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const recipeName=document.getElementById('recipe_name').value;
    const ingredients=document.getElementById('ingredients').value;
    const steps=document.getElementById('steps').value;
    const imageFile=document.getElementById('images').files[0]|| null;
    // idhar se vo first file milegi
    let image='';
    if(imageFile) //if imageFile isthe selected one
    {
        const reader=new FileReader();
        reader.onloadend=function()
        {
            image=reader.result;//give Base64 string
            saveRecipeData(recipeName, ingredients, steps, image);
        };
        reader.readAsDataURL(imageFile); // Convert image to Base64
    } else {
        saveRecipeData(recipeName, ingredients, steps, image);
    }
});
function saveRecipeData(recipeName, ingredients, steps, image){

    const recipeData={
        recipeName:recipeName,
        ingredients:ingredients,
        steps:steps,
        image:image
    };

    // const recipeData={
    //     recipeName:recipeName,
    //     ingredients:ingredients,
    //     steps:steps,
    //     image:image
    // }
    //retrieve all recipes is there are present ,if there is not
    //return empty array
    //now add receipedata in recipes
    //and set recipes in localStorage
    let recipes=JSON.parse(localStorage.getItem('recipes'))|| [];
    recipes.push(recipeData);
    localStorage.setItem('recipes',JSON.stringify(recipes));

    console.log("data stored in localStorage",recipes);
    document.getElementById('recipe_name').value="";
    document.getElementById('ingredients').value="";
    document.getElementById('steps').value="";
    document.getElementById('images').value="";

}