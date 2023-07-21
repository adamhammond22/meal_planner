/* List of Fake recipes that can be loaded for debugging */

export const fakeRecipes = [
  {
    name: 'Scrambled Eggs',
    desc: 'Delicious breakfast',
    inst: 'Beat eggs and cook on a pan',
    ingr: '4~0~Eggs*1~4~Salt*1~2~Tablespoon Butter*1~1~Pepper*',
    tag: 'protein@breakfast',
    image: '~~~0'
  },
  {
    name: 'Fried Chicken',
    desc: 'Crispy and flavorful',
    inst: 'Coat chicken in flour and fry until golden',
    ingr: '4~0~Chicken pieces*2~4~Cups Flour*1~1~Tablespoon Salt*1~1~Tablespoon Paprika*1~1~Tablespoon Garlic powder*1~1~Tablespoon Onion powder*1~2~Teaspoon Black pepper*1~4~Cups Vegetable oil*',
    tag: 'meat@dinner@crispy',
    image: '~~~1'
  },
  {
    name: 'Eggplant Parmesan',
    desc: 'Baked eggplant dish',
    inst: 'Layer eggplant with cheese and tomato sauce',
    ingr: '2~4~Medium Eggplants*2~8~Cups Marinara sauce*1~4~Cups Shredded mozzarella cheese*1~4~Cup Grated Parmesan cheese*1~2~Cups Bread crumbs*1~2~Teaspoon Dried basil*1~2~Teaspoon Dried oregano*2~1~Egg*',
    tag: 'vegetarian@dinner@baked',
    image: '~~~2'
  },
  {
    name: 'Salad',
    desc: 'Fresh greens and veggies',
    inst: 'Toss vegetables with dressing',
    ingr: '4~4~Cups Mixed salad greens*1~4~Cup Cherry tomatoes*1~4~Cup Cucumber*1~4~Cup Red onion*1~4~Cup Olives*2~1~Tablespoon Olive oil*1~1~Tablespoon Lemon juice*1~8~Salt*1~1~Pepper*',
    tag: 'vegetarian@healthy@light',
    image: '~~~3'
  },
  {
    name: 'Pasta Carbonara',
    desc: 'Creamy Italian pasta',
    inst: 'Cook pasta, mix with eggs, cheese, and bacon',
    ingr: '8~4~Cups Cooked spaghetti*4~0~Eggs*1~4~Cup Grated Parmesan cheese*1~4~Cup Cooked bacon, chopped*1~2~Clove Garlic, minced*1~2~Tablespoon Olive oil*1~8~Salt*1~1~Pepper*',
    tag: 'pasta@dinner@creamy',
    image: '~~~4'
  },
  {
    name: 'Beef Tacos',
    desc: 'Tortillas filled with seasoned beef',
    inst: 'Cook beef with spices, fill tortillas, and add toppings',
    ingr: '1~2~Pound Ground beef*1~1~Packet Taco seasoning*1~4~Cup Water*8~0~Taco shells*1~4~Cup Shredded lettuce*1~4~Cup Diced tomatoes*1~4~Cup Shredded cheese*1~4~Cup Sour cream*',
    tag: 'meat@dinner@mexican',
    image: '~~~5'
  },
  {
    name: 'Chicken Curry',
    desc: 'Spicy and aromatic chicken dish',
    inst: 'Cook chicken with curry paste and coconut milk',
    ingr: '2~0~Chicken breasts*1~4~Cup Curry paste*2~7~Cups Coconut milk*1~4~Cup Chicken broth*1~4~Cup Chopped onion*1~4~Cup Chopped bell pepper*2~2~Cloves Garlic, minced*1~2~Tablespoon Vegetable oil*1~8~Salt*1~1~Pepper*',
    tag: 'meat@dinner@spicy',
    image: '~~~6'
  },
  {
    name: 'Grilled Salmon',
    desc: 'Healthy grilled salmon fillet',
    inst: 'Season salmon, grill until cooked through',
    ingr: '4~0~Salmon fillets*2~1~Tablespoon Olive oil*1~1~Tablespoon Lemon juice*1~4~Teaspoon Garlic powder*1~4~Teaspoon Paprika*1~4~Teaspoon Dried dill*1~8~Salt*1~1~Pepper*',
    tag: 'seafood@dinner@healthy',
    image: '~~~7'
  },
  {
    name: 'Mushroom Risotto',
    desc: 'Creamy rice with mushrooms',
    inst: 'Saute mushrooms, cook rice with broth, and stir in mushrooms',
    ingr: '1~4~Cup Arborio rice*4~7~Cups Vegetable or chicken broth*1~4~Cup Chopped onion*1~4~Cup Chopped mushrooms*1~4~Cup Grated Parmesan cheese*1~2~Tablespoon Butter*1~2~Tablespoon Olive oil*1~8~Salt*1~1~Pepper*',
    tag: 'vegetarian@dinner@creamy',
    image: '~~~8'
  },
  {
    name: 'Vegetable Stir-Fry',
    desc: 'Assorted vegetables cooked in a stir-fry sauce',
    inst: 'Stir-fry vegetables in a hot pan with sauce',
    ingr: '4~4~Cups Assorted vegetables (bell peppers, broccoli, carrots, etc.)*1~4~Cup Soy sauce*1~4~Cup Hoisin sauce*1~4~Cup Vegetable broth*1~4~Cup Chopped onion*1~2~Cloves Garlic, minced*1~2~Tablespoon Sesame oil*1~8~Salt*1~1~Pepper*',
    tag: 'vegetarian@dinner@asian',
    image: '~~~9'
  },
  {
    name: 'Roasted Chicken',
    desc: 'Oven-roasted whole chicken',
    inst: 'Season chicken, roast in the oven until cooked',
    ingr: '1~1~Whole chicken',
    tag: '',
    image: '~~~10'
  },
  {
    name: 'Chocolate Chip Cookies',
    desc: 'Classic homemade cookies with chocolate chips',
    inst: 'Mix ingredients, drop spoonfuls onto baking sheet, and bake until golden',
    ingr: '2~4~Cups All-purpose flour*1~4~Teaspoon Baking soda*1~4~Teaspoon Salt*1~4~Cup Unsalted butter, softened*1~2~Cup Granulated sugar*1~2~Cup Brown sugar*2~0~Eggs*2~4~Teaspoons Vanilla extract*2~4~Cups Chocolate chips*',
    tag: 'dessert@cookies@chocolate',
    image: '~~~11'
  },
  {
    name: 'Beef Lasagna',
    desc: 'Layered pasta dish with ground beef and cheese',
    inst: 'Cook beef, layer with pasta and sauce, and bake until bubbly',
    ingr: '1~4~Pound Ground beef*1~4~Cup Chopped onion*2~2~Cloves Garlic, minced*4~8~Cups Marinara sauce*1~4~Cup Tomato paste*1~4~Cup Water*1~4~Teaspoon Dried basil*1~4~Teaspoon Dried oregano*1~4~Teaspoon Salt*1~4~Teaspoon Pepper*1~4~Cup Grated Parmesan cheese*1~4~Cup Chopped fresh',
    tag: 'dinner@italian@comfort food',
    image: '~~~12'
  },
  {
    name: 'Vegetable Curry',
    desc: 'Flavorful curry with assorted vegetables',
    inst: 'Saute vegetables, add curry paste and coconut milk, simmer until cooked',
    ingr: '4~4~Cups Assorted vegetables (carrots, bell peppers, cauliflower, etc.)*1~4~Cup Curry paste*2~7~Cups Coconut milk*1~4~Cup Vegetable broth*1~4~Cup Chopped onion*1~2~Cloves Garlic, minced*1~2~Tablespoon Vegetable oil*1~4~Teaspoon Ground turmeric*1~4~Teaspoon Ground cumin*1~4~Teaspoon Ground coriander*1~4~Teaspoon Salt*1~4~Teaspoon Sugar*',
    tag: 'vegetarian@dinner@curry',
    image: '~~~13'
  },
  {
    name: 'Banana Pancakes',
    desc: 'Fluffy pancakes with mashed bananas',
    inst: 'Mix ingredients, cook on a griddle until golden',
    ingr: '2~4~Cups All-purpose flour*1~4~Cup Granulated sugar*2~4~Teaspoons Baking powder*1~4~Teaspoon Baking soda*1~4~Teaspoon Salt*2~0~Ripe bananas, mashed*2~4~Cups Milk*2~4~Teaspoons Lemon juice*2~4~Teaspoons Vegetable oil*2~0~Eggs*',
    tag: 'breakfast',
    image: '~~~14'
  },
  {
    name: 'Vegetable Noodle Soup',
    desc: 'Hearty soup with vegetables and noodles',
    inst: 'Saute vegetables, add broth and noodles, simmer until noodles are cooked',
    ingr: '4~4~Cups Vegetable broth*1~4~Cup Chopped onion*1~4~Cup Chopped carrots*1~4~Cup Chopped celery*1~4~Cup Chopped bell peppers*1~4~Cup Chopped zucchini*1~2~Cloves Garlic, minced*1~4~Teaspoon Dried thyme*1~4~Teaspoon Dried rosemary*1~4~Teaspoon Salt*1~4~Teaspoon Pepper*2~4~Cups Noodles (such as egg noodles or pasta)*',
    tag: 'vegetarian@soup@comfort food',
    image: '~~~15'
  },
  {
    name: 'Cheeseburger',
    desc: 'Classic beef burger with cheese and toppings',
    inst: 'Form beef patties, grill or cook on stovetop, assemble with cheese and toppings',
    ingr: '1~1~Pound Ground beef*1~4~Teaspoon Salt*1~4~Teaspoon Pepper*4~8~Slices Cheese (such as cheddar or American)*4~8~Hamburger buns*1~4~Cup Lettuce*1~4~Cup Sliced tomatoes*1~4~Cup Sliced onions*1~4~Cup Pickles*1~4~Cup Ketchup*1~4~Cup Mustard*',
    tag: 'meat@dinner@burger',
    image: '~~~16'
  },
  {
    name: 'Chicken Caesar Salad',
    desc: 'Classic salad with grilled chicken and Caesar dressing',
    inst: 'Grill chicken, toss with lettuce, croutons, and dressing',
    ingr: '2~4~Chicken breasts*1~4~Head Romaine lettuce*1~4~Cup Croutons*1~2~Cup Grated Parmesan cheese*1~4~Cup Caesar dressing*',
    tag: 'salad@chicken@healthy',
    image: '~~~17'
  },
  {
    name: 'Berry Smoothie',
    desc: 'Refreshing smoothie with mixed berries',
    inst: 'Blend berries, yogurt, and honey until smooth',
    ingr: '2~4~Cups Mixed berries (strawberries, blueberries, raspberries)*1~2~Cup',
    tag: 'beverage@smoothie@refreshing',
    image: '~~~18'
  },
  {
    name: 'Chicken Alfredo',
    desc: 'Creamy pasta dish with chicken',
    inst: 'Cook pasta, sauté chicken, and mix with Alfredo sauce',
    ingr: '1~4~Pound Boneless, skinless chicken breasts*1~4~Cup Chopped onion*2~2~Cloves Garlic, minced*1~4~Cup Butter*2~4~Cups Heavy cream*1~4~Cup Grated Parmesan cheese*1~4~Teaspoon Dried basil*1~4~Teaspoon Dried parsley*1~8~Salt*1~1~Pepper*',
    tag: 'dinner@pasta@creamy',
    image: '~~~19'
  },
  {
    name: 'Vegetable Omelette',
    desc: 'Fluffy omelette with assorted vegetables',
    inst: 'Beat eggs, sauté vegetables, pour eggs over vegetables and cook until set',
    ingr: '4~0~Eggs*1~4~Cup Chopped bell peppers*1~4~Cup Chopped onion*1~4~Cup Chopped mushrooms*1~4~Cup Chopped tomatoes*1~4~Cup Shredded cheese*1~2~Tablespoon Butter*1~8~Salt*1~1~Pepper*',
    tag: 'breakfast@vegetarian',
    image: '~~~20'
  },
  {
    name: 'Baked Salmon',
    desc: 'Oven-baked salmon fillet with herbs',
    inst: 'Season salmon, place on baking sheet, and bake until cooked through',
    ingr: '4~0~Salmon fillets*2~2~Tablespoons Olive oil*1~2~Tablespoon Lemon juice*1~4~Teaspoon Dried dill*1~4~Teaspoon Garlic powder*1~4~Teaspoon Onion powder*1~4~Teaspoon Paprika*1~8~Salt*1~1~Pepper*',
    tag: 'seafood@dinner@baked',
    image: '~~~21'
  },
  {
    name: 'Tomato Basil Soup',
    desc: 'Comforting soup with fresh tomatoes and basil',
    inst: 'Sauté onions and garlic, add tomatoes, broth, and basil, simmer and blend',
    ingr: '2~4~Pounds Tomatoes*1~4~Cup Chopped onion*2~2~Cloves Garlic, minced*4~7~Cups Vegetable or chicken broth*1~4~Cup Chopped fresh basil*1~4~Cup Heavy cream*2~2~Tablespoons Butter*1~8~Salt*1~1~Pepper*',
    tag: 'soup@vegetarian@comfort food',
    image: '~~~22'
  },
  {
    name: 'Mediterranean Quinoa Salad',
    desc: 'Healthy salad with quinoa, vegetables, and feta cheese',
    inst: 'Cook quinoa, chop vegetables, mix with olive oil, lemon juice, and feta cheese',
    ingr: '2~4~Cups Cooked quinoa*1~4~Cup Chopped cucumber*1~4~Cup Chopped tomatoes*1~4~Cup Chopped red onion*1~4~Cup Chopped Kalamata olives*1~4~Cup Crumbled feta cheese*2~2~Tablespoons Olive oil*2~2~Tablespoons Lemon juice*1~4~Teaspoon Dried oregano*1~8~Salt*1~1~Pepper*',
    tag: 'salad@mediterranean',
    image: '~~~23'
  },
  {
    name: 'Homemade Pizza',
    desc: 'Customizable pizza with your favorite toppings',
    inst: 'Make pizza dough, spread sauce, add toppings, and bake in the oven',
    ingr: '2~4~Cups All-purpose flour*1~2~Teaspoon Active dry yeast*1~2~Teaspoon Sugar*1~4~Teaspoon Salt*1~2~Cup Warm water*1~4~Cup Tomato sauce*1~4~Teaspoon Dried basil*1~4~Teaspoon Dried oregano*1~4~Teaspoon Garlic powder*1~4~Teaspoon Onion powder*1~4~Teaspoon Red pepper flakes*2~4~Cups Shredded mozzarella cheese*Assorted toppings (pepperoni, mushrooms, bell peppers, onions, etc.)*',
    tag: '',
    image: '~~~24'
  },
  {
    name: 'Chicken Teriyaki',
    desc: 'Sweet and savory chicken dish with teriyaki sauce',
    inst: 'Marinate chicken in teriyaki sauce, grill or cook on stovetop until cooked through',
    ingr: '4~4~Boneless, skinless chicken breasts*1~4~Cup Teriyaki sauce*2~2~Tablespoons Soy sauce*1~4~Cup Brown sugar*1~4~Cup Pineapple juice*2~2~Tablespoons Vegetable oil*1~2~Tablespoon Cornstarch*1~2~Tablespoon Water*',
    tag: 'meat@dinner@teriyaki',
    image: '~~~25'
  },
  {
    name: 'Caprese Salad',
    desc: 'Simple and refreshing salad with tomatoes, mozzarella, and basil',
    inst: 'Arrange sliced tomatoes, mozzarella, and basil leaves on a plate, drizzle with olive oil and balsamic glaze, and sprinkle with salt and pepper',
    ingr: '2~4~Large tomatoes*2~4~Balls fresh mozzarella cheese*1~4~Cup Fresh basil leaves*2~2~Tablespoons Olive oil*2~2~Teaspoons Balsamic glaze*1~8~Salt*1~1~Pepper*',
    tag: 'salad@caprese@refreshing',
    image: '~~~26'
  },
  {
    name: 'Lemon Garlic Shrimp',
    desc: 'Flavorful shrimp cooked in a lemon garlic sauce',
    inst: 'Sauté shrimp with garlic, butter, lemon juice, and herbs',
    ingr: '2~4~Pounds Shrimp, peeled and deveined*4~8~Cloves Garlic, minced*1~4~Cup Butter*2~2~Tablespoons Lemon juice*1~4~Teaspoon Lemon zest*1~4~Teaspoon Dried oregano*1~4~Teaspoon Dried parsley*1~8~Salt*1~1~Pepper*',
    tag: 'seafood@dinner',
    image: '~~~27'
  },
  {
    name: 'Stuffed Bell Peppers',
    desc: 'Bell peppers filled with a savory mixture of meat and rice',
    inst: 'Cook meat and rice, mix with seasonings, stuff into bell peppers, and bake until tender',
    ingr: '4~4~Large bell peppers*1~2~Pound Ground beef*1~2~Cup Cooked rice*1~4~Cup Chopped onion*1~4~Cup Chopped tomatoes*1~4~Cup Tomato sauce*1~4~Cup Shredded cheese*1~2~Tablespoon Olive oil*1~8~Salt*1~1~Pepper*',
    tag: 'dinner',
    image: '~~~28'
  },
  {
    name: 'Raspberry Cheesecake',
    desc: 'Creamy cheesecake with a tangy raspberry topping',
    inst: 'Make graham cracker crust, beat cream cheese with sugar and vanilla, pour over crust, bake, and top with raspberry sauce',
    ingr: '2~1~Cups Graham cracker crumbs*1~2~Cup Butter, melted*2~4~Packages Cream cheese*1~2~Cups Sugar*4~8~Eggs*2~2~Teaspoons Vanilla extract*1~4~Cup Raspberry preserves*2~2~Tablespoons Water*',
    tag: 'dessert',
    image: '~~~29'
  },
  {
    name: 'Teriyaki Salmon',
    desc: 'Grilled salmon fillet with a sweet and savory teriyaki glaze',
    inst: 'Marinate salmon in teriyaki sauce, grill until cooked through, and brush with additional teriyaki glaze',
    ingr: '4~0~Salmon fillets*1~4~Cup Teriyaki sauce*2~2~Tablespoons Soy sauce*1~4~Cup Brown sugar*1~4~Cup Pineapple juice*2~2~Tablespoons Vegetable oil*1~8~Salt*1~1~Pepper*',
    tag: 'seafood',
    image: '~~~30'
  },
]



export const fakeRecipeImages = [require('./fakeRecipeImages/scrambledEggs.jpg'),
require('./fakeRecipeImages/friedChicken.jpg'),
require('./fakeRecipeImages/eggplantParm.jpg'),
require('./fakeRecipeImages/salad.jpg'),
require('./fakeRecipeImages/pastaCarbonara.jpg'),
require('./fakeRecipeImages/beefTacos.jpg'),
require('./fakeRecipeImages/chickenCurry.jpg'),
require('./fakeRecipeImages/grilledSalmon.jpg'),
require('./fakeRecipeImages/mushroomRisotto.jpg'),
require('./fakeRecipeImages/veggieStirFry.jpg'),
require('./fakeRecipeImages/roastedChicken.jpg'),
require('./fakeRecipeImages/chocolateChipCookies.jpg'),
require('./fakeRecipeImages/beefLasagna.jpg'),
require('./fakeRecipeImages/vegtableCurry.jpg'),
require('./fakeRecipeImages/bannanaPancakes.jpg'),
require('./fakeRecipeImages/vegtableNoodleSoup.jpg'),
require('./fakeRecipeImages/cheeseBurger.jpg'),
require('./fakeRecipeImages/chickenCaesarSalad.jpg'),
require('./fakeRecipeImages/berrySmoothie.jpg'),
require('./fakeRecipeImages/chickenAlfredo.jpg'),
require('./fakeRecipeImages/veggieOmlette.jpg'),
require('./fakeRecipeImages/bakedSalmon.jpg'),
require('./fakeRecipeImages/CapreseSalad.jpg'),
require('./fakeRecipeImages/mediterraneanQuinoaSalad.jpg'),
require('./fakeRecipeImages/HomemadePizza.jpg'),
require('./fakeRecipeImages/ChickenTeriyaki.jpg'),
require('./fakeRecipeImages/CapreseSalad.jpg'),
require('./fakeRecipeImages/LemonGarlicShrimp.jpg'),
require('./fakeRecipeImages/StuffedBellPeppers.jpg'),
require('./fakeRecipeImages/RaspberryCheesecake.jpg'),
require('./fakeRecipeImages/TeriyakiSalmon.jpg'),
]
