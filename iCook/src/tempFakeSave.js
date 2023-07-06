
let saveARecipe = {
    name: 'Recipe A',
    ingredients: [{name: 'Letters', unit: 'cup', amount: 0.25 }, {name: 'Purple', unit: 'oz', amount: 19.5},
{name: 'nothing', unit: ' ', amount: 12}],
    instructions: '1) Add Letters into a large bowl\n2) Consume Purple\n3) Profit'
}
  
let saveBRecipe = {
    name: 'Recipe B',
    ingredients: [{name: 'Wind', unit: 'gallon', amount: 8}, {name: 'Salt', unit: 'tablespoon', amount: 2}, 
    {name: 'Space-Time', unit: 'lb', amount: 5}],
    instructions: '1) Filter wind through a strainer\n2) Season the Space-Time with the salt\n3) Enjoy newfound timetravel abilities\n...\n...\n4) Restore the ruined timelines'
}

let errorRecipe = {
    name: 'Invalid Name Error',
    ingredients: [{name: 'Invalid', unit: 'lb', amount: 1}],
    instructions: 'Call a name of a recipe'
  }

export const Save = ( originalName, editedRecipe ) => {
    if(originalName == saveARecipe.name){
      saveARecipe = editedRecipe
      console.log("Save A")
    }else if(originalName == saveBRecipe.name){
      saveBRecipe = editedRecipe
      console.log("Save B")
    }else{
      console.log("Save Error")
    }
    return;
  }
  
export const Load = ( name ) => {
    if(name == saveARecipe.name){
        return(saveARecipe)
    }else if(name == saveBRecipe.name){
        return(saveBRecipe)
    }else{
        return(errorRecipe)
        console.log("Load Error")
    }
}

export const GetNameList = () => {
    var returnValue = [saveARecipe.name, saveBRecipe.name]
    return returnValue
}