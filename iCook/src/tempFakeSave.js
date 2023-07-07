
// Fake saveslot A
let saveARecipe = {
    name: 'Recipe A',
    description: 'The first recipe',
    ingredients: [{name: 'Letters', unit: 4, amount: 0.25 }, {name: 'Purple', unit: 8, amount: 19.5},
{name: 'nothing', unit: 0, amount: 12}],
    instructions: '1) Add Letters into a large bowl\n2) Consume Purple\n3) Profit'
}

// Fake saveslot B
let saveBRecipe = {
    name: 'Recipe B',
    description: 'The second recipe',
    ingredients: [{name: 'Wind', unit: 6, amount: 8}, {name: 'Salt', unit: 2, amount: 2}, 
    {name: 'Space-Time', unit: 9, amount: 5}],
    instructions: '1) Filter wind through a strainer\n2) Season the Space-Time with the salt\n3) Enjoy newfound timetravel abilities\n...\n...\n4) Restore the ruined timelines'
}

// Error load
const errorRecipe = {
    name: 'Invalid Name Error',
    description: 'The errorth recipe',
    ingredients: [{name: 'Invalid', unit: 9, amount: 1}],
    instructions: 'Call a name of a recipe'
  }

// "Save" Call
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
  

// "Load" Call
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

// Return the names in saveslot A and B
export const GetNameList = () => {
    var returnValue = [saveARecipe.name, saveBRecipe.name]
    return returnValue
}