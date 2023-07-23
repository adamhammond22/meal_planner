# iCook

Recipe Planner and shopping guide

## Installation Instructions

### Installation Guide
Install Expo Go on your chosen device.
Download and then navigate to the project folder on your system in command terminal
Make sure your system has npm
In the command terminal, run the command: npm install
Once that finishes, run the command: npm start
Scan the QR code from the terminal with your device that has Expo Go installed.

## User Guide
Starting on the home screen, a user can click “Add new recipe” to be taken to the recipe editing screen for a new recipe.
A user can scroll through their existing recipes, and click on the shopping cart icon to add that recipe to their planned meals, or on the trashcan icon  to remove the recipe.
Clicking directly on the recipe will take them to the recipe page.

The recipe page has all the recipe information on display, and can be scrolled through. 
A user can press the ‘Edit’ button to be taken to the recipe edit page, or the ‘Back’ button to return to the home screen.

On the edit recipe page, a user can edit the text for any of the various recipe components.
Hitting the ‘Add ingredient’ button adds an ingredient object for the user to edit.
An ingredient object consists of an amount, a unit dropdown select, and a name.
The ‘Delete’ button on the ingredient object will remove that ingredient.
Hitting the ‘Add Tag’ button adds a tag object for the user to edit.
An tag object just a name.
The ‘Delete’ button on the tag object will remove that tag.

The bottom of the edit page has 3 buttons. Save will return the user to the recipe page will all edits saved. Cancel will return the user to the recipe page, undoing any changes made on the edit page. ‘Delete Recipe’ will return the user to the home screen and delete the recipe.

The planned recipe paged allows the user view recipes add from the home screen, and increment the number of each recipe.
Pressing ‘Compile new shopping list’ will total the ingredients from all the recipes in the planned recipes. Recipe amounts for any recipe will be multiplied by the number of recipes selected.

In the shopping list screen, users can scroll through their list.
All items on the list can be edited.
Each item on the list has a checkbox next to it that can be checked or unchecked by a press from the user.
Each item can be deleted by pressing the delete button on the right of the item.
Users can add new items to the list by scrolling down to the bottom and pressing the ‘Add New Item’ button.


### Feature:

#### Homepage / Recipe List

- In the recipe list homepage, we can view all of our recipes, add them to our Meal Planner, or delete them. The delete button will ask if you’re sure you want to delete, so don’t worry about accidentally hitting it!

- We can also perform searches! Anything entered in the search bar searches all fields of the recipe: tags, name, description, and ingredients!
- We can input multiple searches or “filter” our recipes. Simply press “return” on your current nonempty search! This will add the current search to a bottom box.
- The search bar will search for recipes that include all searches in the bottom box, as well as in the current search bar.
- You can clear individual searches in the bottom box with the trash icon, and clear the entire bottom box with the x icon.

- Tapping on any recipe will take you to the single recipe view

#### Single Recipe View
- You can see ingredients instructions and tags
- You can hit back to return to home, or edit to edit the recipe

- When editing, you can upload an image, add or delete ingredients, instructions, and recipe tags
- For ingredients, you can choose from a dropdown of unit options, this is so we can compile the shopping list of ingredients for all planned recipes
- When editing, we can choose to save the changes, cancel, or delete the whole recipe

#### Meal Planner
- Each time a recipe is added to the cart, it appears in the meal planner
- You can increment or decrement the amount of meals planned
- You can compile all Planned Recipes into a shopping list (each compilation overwrites the current shopping list!)
- You can clear the list with the button at the bottom

#### Shopping List
- Each ingredient can be checked, edited, or deleted
- New ingredients can be added at the bottom of the list

## Contact
- This project was created by 6 UC Santa Cruz Students for our Software Engineering class in the summer of 2023
- Feel free to reach out to Adam Hammond at abhammond22@gmail.com for any inquiries or feedback! :)
