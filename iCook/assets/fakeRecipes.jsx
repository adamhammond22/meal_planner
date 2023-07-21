/* List of Fake recipes that can be loaded for debugging */

export const fakeRecipes = [
  {
    name: 'Scrambled Eggs',
    desc: 'Delicious breakfast',
    inst: 'Beat eggs and cook on a pan',
    ingr: '4~0~Eggs*1~4~Salt*1~2~Butter*1~1~Pepper*',
    tag: 'protein@breakfast',
    image: '~~~0'
  },
  {
    name: 'Fried Chicken',
    desc: 'Crispy and flavorful',
    inst: 'Coat chicken in flour and fry until golden',
    ingr: '4~0~Chicken pieces*2~4~Flour*1~1~Salt*1~1~Paprika*1~1~Garlic powder*1~1~Onion powder*1~2~Black pepper*1~4~Vegetable oil*',
    tag: 'meat@dinner@crispy',
    image: '~~~1'
  },
  {
    name: 'Eggplant Parmesan',
    desc: 'Baked eggplant dish',
    inst: 'Layer eggplant with cheese and tomato sauce',
    ingr: '2~4~Medium Eggplants*2~8~Marinara sauce*1~4~Shredded mozzarella cheese*1~4~Grated Parmesan cheese*1~2~Bread crumbs*1~2~Dried basil*1~2~Dried oregano*2~1~Egg*',
    tag: 'vegetarian@dinner@baked',
    image: '~~~2'
  },
  {
    name: 'Salad',
    desc: 'Fresh greens and veggies',
    inst: 'Toss vegetables with dressing',
    ingr: '4~4~Mixed salad greens*1~4~Cherry tomatoes*1~4~Cucumber*1~4~Red onion*1~4~Olives*2~1~Olive oil*1~1~Lemon juice*1~8~Salt*1~1~Pepper*',
    tag: 'vegetarian@healthy@light',
    image: '~~~3'
  },
  {
    name: 'Pasta Carbonara',
    desc: 'Creamy Italian pasta',
    inst: 'Cook pasta, mix with eggs, cheese, and bacon',
    ingr: '8~4~Cooked spaghetti*4~0~Eggs*1~4~Grated Parmesan cheese*1~4~Cooked bacon, chopped*1~2~Clove Garlic, minced*1~2~Olive oil*1~8~Salt*1~1~Pepper*',
    tag: 'pasta@dinner@creamy',
    image: '~~~4'
  },
  {
    name: 'Beef Tacos',
    desc: 'Tortillas filled with seasoned beef',
    inst: 'Cook beef with spices, fill tortillas, and add toppings',
    ingr: '1~2~Pound Ground beef*1~1~Packet Taco seasoning*1~4~Water*8~0~Taco shells*1~4~Shredded lettuce*1~4~Diced tomatoes*1~4~Shredded cheese*1~4~Sour cream*',
    tag: 'meat@dinner@mexican',
    image: '~~~5'
  },
  {
    name: 'Chicken Curry',
    desc: 'Spicy and aromatic chicken dish',
    inst: 'Cook chicken with curry paste and coconut milk',
    ingr: '2~0~Chicken breasts*1~4~Curry paste*2~7~Coconut milk*1~4~Chicken broth*1~4~Chopped onion*1~4~Chopped bell pepper*2~2~Cloves Garlic, minced*1~2~Vegetable oil*1~8~Salt*1~1~Pepper*',
    tag: 'meat@dinner@spicy',
    image: '~~~6'
  },
  {
    name: 'Grilled Salmon',
    desc: 'Healthy grilled salmon fillet',
    inst: 'Season salmon, grill until cooked through',
    ingr: '4~0~Salmon fillets*2~1~Olive oil*1~1~Lemon juice*1~4~Garlic powder*1~4~Paprika*1~4~Dried dill*1~8~Salt*1~1~Pepper*',
    tag: 'seafood@dinner@healthy',
    image: '~~~7'
  },
  {
    name: 'Mushroom Risotto',
    desc: 'Creamy rice with mushrooms',
    inst: 'Saute mushrooms, cook rice with broth, and stir in mushrooms',
    ingr: '1~4~Arborio rice*4~7~Vegetable or chicken broth*1~4~Chopped onion*1~4~Chopped mushrooms*1~4~Grated Parmesan cheese*1~2~Butter*1~2~Olive oil*1~8~Salt*1~1~Pepper*',
    tag: 'vegetarian@dinner@creamy',
    image: '~~~8'
  },
  {
    name: 'Vegetable Stir-Fry',
    desc: 'Assorted vegetables cooked in a stir-fry sauce',
    inst: 'Stir-fry vegetables in a hot pan with sauce',
    ingr: '4~4~Assorted vegetables (bell peppers, broccoli, carrots, etc.)*1~4~Soy sauce*1~4~Hoisin sauce*1~4~Vegetable broth*1~4~Chopped onion*1~2~Cloves Garlic, minced*1~2~Sesame oil*1~8~Salt*1~1~Pepper*',
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
    ingr: '2~4~All-purpose flour*1~4~Baking soda*1~4~Salt*1~4~Unsalted butter, softened*1~2~Granulated sugar*1~2~Brown sugar*2~0~Eggs*2~4~Vanilla extract*2~4~Chocolate chips*',
    tag: 'dessert@cookies@chocolate',
    image: '~~~11'
  },
  {
    name: 'Beef Lasagna',
    desc: 'Layered pasta dish with ground beef and cheese',
    inst: 'Cook beef, layer with pasta and sauce, and bake until bubbly',
    ingr: '1~4~Pound Ground beef*1~4~Chopped onion*2~2~Cloves Garlic, minced*4~8~Marinara sauce*1~4~Tomato paste*1~4~Water*1~4~Dried basil*1~4~Dried oregano*1~2~Salt*1~4~Pepper*1~4~Grated Parmesan cheese*1~4~Chopped fresh',
    tag: 'dinner@italian@comfort food',
    image: '~~~12'
  },
  {
    name: 'Vegetable Curry',
    desc: 'Flavorful curry with assorted vegetables',
    inst: 'Saute vegetables, add curry paste and coconut milk, simmer until cooked',
    ingr: '4~4~Assorted vegetables (carrots, bell peppers, cauliflower, etc.)*1~4~Curry paste*2~7~Coconut milk*1~4~Vegetable broth*1~4~Chopped onion*1~2~Cloves Garlic, minced*1~2~Vegetable oil*1~4~Ground turmeric*1~4~Ground cumin*1~4~Ground coriander*1~4~Salt*1~4~Sugar*',
    tag: 'vegetarian@dinner@curry',
    image: '~~~13'
  },
  {
    name: 'Banana Pancakes',
    desc: 'Fluffy pancakes with mashed bananas',
    inst: 'Mix ingredients, cook on a griddle until golden',
    ingr: '2~4~All-purpose flour*1~4~Granulated sugar*2~4~Baking powder*1~4~Baking soda*1~4~Salt*2~0~Ripe bananas, mashed*2~4~Milk*2~4~Lemon juice*2~4~Vegetable oil*2~0~Eggs*',
    tag: 'breakfast',
    image: '~~~14'
  },
  {
    name: 'Vegetable Noodle Soup',
    desc: 'Hearty soup with vegetables and noodles',
    inst: 'Saute vegetables, add broth and noodles, simmer until noodles are cooked',
    ingr: '4~4~Vegetable broth*1~4~Chopped onion*1~4~Chopped carrots*1~4~Chopped celery*1~4~Chopped bell peppers*1~4~Chopped zucchini*1~2~Cloves Garlic, minced*1~4~Dried thyme*1~4~Dried rosemary*1~4~Salt*1~4~Pepper*2~4~Noodles (such as egg noodles or pasta)*',
    tag: 'vegetarian@soup@comfort food',
    image: '~~~15'
  },
  {
    name: 'Cheeseburger',
    desc: 'Classic beef burger with cheese and toppings',
    inst: 'Form beef patties, grill or cook on stovetop, assemble with cheese and toppings',
    ingr: '1~1~Pound Ground beef*1~4~Salt*1~4~Pepper*4~8~Slices Cheese (such as cheddar or American)*4~8~Hamburger buns*1~4~Lettuce*1~4~Sliced tomatoes*1~4~Sliced onions*1~4~Pickles*1~4~Ketchup*1~4~Mustard*',
    tag: 'meat@dinner@burger',
    image: '~~~16'
  },
  {
    name: 'Chicken Caesar Salad',
    desc: 'Classic salad with grilled chicken and Caesar dressing',
    inst: 'Grill chicken, toss with lettuce, croutons, and dressing',
    ingr: '2~4~Chicken breasts*1~4~Head Romaine lettuce*1~4~Croutons*1~2~Grated Parmesan cheese*1~4~Caesar dressing*',
    tag: 'salad@chicken@healthy',
    image: '~~~17'
  },
  {
    name: 'Berry Smoothie',
    desc: 'Refreshing smoothie with mixed berries',
    inst: 'Blend berries, yogurt, and honey until smooth',
    ingr: '2~4~Mixed berries (strawberries, blueberries, raspberries)*1~2~Cup',
    tag: 'beverage@smoothie@refreshing',
    image: '~~~18'
  },
  {
    name: 'Chicken Alfredo',
    desc: 'Creamy pasta dish with chicken',
    inst: 'Cook pasta, sauté chicken, and mix with Alfredo sauce',
    ingr: '1~4~Pound Boneless, skinless chicken breasts*1~4~Chopped onion*2~2~Cloves Garlic, minced*1~4~Butter*2~4~Heavy cream*1~4~Grated Parmesan cheese*1~4~Dried basil*1~4~Dried parsley*1~8~Salt*1~1~Pepper*',
    tag: 'dinner@pasta@creamy',
    image: '~~~19'
  },
  {
    name: 'Vegetable Omelette',
    desc: 'Fluffy omelette with assorted vegetables',
    inst: 'Beat eggs, sauté vegetables, pour eggs over vegetables and cook until set',
    ingr: '4~0~Eggs*1~4~Chopped bell peppers*1~4~Chopped onion*1~4~Chopped mushrooms*1~4~Chopped tomatoes*1~4~Shredded cheese*1~2~Butter*1~8~Salt*1~1~Pepper*',
    tag: 'breakfast@vegetarian',
    image: '~~~20'
  },
  {
    name: 'Baked Salmon',
    desc: 'Oven-baked salmon fillet with herbs',
    inst: 'Season salmon, place on baking sheet, and bake until cooked through',
    ingr: '4~0~Salmon fillets*2~2~Olive oil*1~2~Lemon juice*1~4~Dried dill*1~4~Garlic powder*1~4~Onion powder*1~4~Paprika*1~8~Salt*1~1~Pepper*',
    tag: 'seafood@dinner@baked',
    image: '~~~21'
  },
  {
    name: 'Tomato Basil Soup',
    desc: 'Comforting soup with fresh tomatoes and basil',
    inst: 'Sauté onions and garlic, add tomatoes, broth, and basil, simmer and blend',
    ingr: '2~4~Pounds Tomatoes*1~4~Chopped onion*2~2~Cloves Garlic, minced*4~7~Vegetable or chicken broth*1~4~Chopped fresh basil*1~4~Heavy cream*2~2~Butter*1~8~Salt*1~1~Pepper*',
    tag: 'soup@vegetarian@comfort food',
    image: '~~~22'
  },
  {
    name: 'Mediterranean Quinoa Salad',
    desc: 'Healthy salad with quinoa, vegetables, and feta cheese',
    inst: 'Cook quinoa, chop vegetables, mix with olive oil, lemon juice, and feta cheese',
    ingr: '2~4~Cooked quinoa*1~4~Chopped cucumber*1~4~Chopped tomatoes*1~4~Chopped red onion*1~4~Chopped Kalamata olives*1~4~Crumbled feta cheese*2~2~Olive oil*2~2~Lemon juice*1~4~Dried oregano*1~8~Salt*1~1~Pepper*',
    tag: 'salad@mediterranean',
    image: '~~~23'
  },
  {
    name: 'Homemade Pizza',
    desc: 'Customizable pizza with your favorite toppings',
    inst: 'Make pizza dough, spread sauce, add toppings, and bake in the oven',
    ingr: '2~4~All-purpose flour*1~2~Active dry yeast*1~2~Sugar*1~4~Salt*1~2~Warm water*1~4~Tomato sauce*1~4~Dried basil*1~4~Dried oregano*1~4~Garlic powder*1~4~Onion powder*1~4~Red pepper flakes*2~4~Shredded mozzarella cheese*Assorted toppings (pepperoni, mushrooms, bell peppers, onions, etc.)*',
    tag: '',
    image: '~~~24'
  },
  {
    name: 'Chicken Teriyaki',
    desc: 'Sweet and savory chicken dish with teriyaki sauce',
    inst: 'Marinate chicken in teriyaki sauce, grill or cook on stovetop until cooked through',
    ingr: '4~4~Boneless, skinless chicken breasts*1~4~Teriyaki sauce*2~2~Soy sauce*1~4~Brown sugar*1~4~Pineapple juice*2~2~Vegetable oil*1~2~Cornstarch*1~2~Water*',
    tag: 'meat@dinner@teriyaki',
    image: '~~~25'
  },
  {
    name: 'Caprese Salad',
    desc: 'Simple and refreshing salad with tomatoes, mozzarella, and basil',
    inst: 'Arrange sliced tomatoes, mozzarella, and basil leaves on a plate, drizzle with olive oil and balsamic glaze, and sprinkle with salt and pepper',
    ingr: '2~4~Large tomatoes*2~4~Balls fresh mozzarella cheese*1~4~Fresh basil leaves*2~2~Olive oil*2~2~Balsamic glaze*1~8~Salt*1~1~Pepper*',
    tag: 'salad@caprese@refreshing',
    image: '~~~26'
  },
  {
    name: 'Lemon Garlic Shrimp',
    desc: 'Flavorful shrimp cooked in a lemon garlic sauce',
    inst: 'Sauté shrimp with garlic, butter, lemon juice, and herbs',
    ingr: '2~4~Pounds Shrimp, peeled and deveined*4~8~Cloves Garlic, minced*1~4~Butter*2~2~Lemon juice*1~4~Lemon zest*1~4~Dried oregano*1~4~Dried parsley*1~8~Salt*1~1~Pepper*',
    tag: 'seafood@dinner',
    image: '~~~27'
  },
  {
    name: 'Stuffed Bell Peppers',
    desc: 'Bell peppers filled with a savory mixture of meat and rice',
    inst: 'Cook meat and rice, mix with seasonings, stuff into bell peppers, and bake until tender',
    ingr: '4~4~Large bell peppers*1~2~Pound Ground beef*1~2~Cooked rice*1~4~Chopped onion*1~4~Chopped tomatoes*1~4~Tomato sauce*1~4~Shredded cheese*1~2~Olive oil*1~8~Salt*1~1~Pepper*',
    tag: 'dinner',
    image: '~~~28'
  },
  {
    name: 'Raspberry Cheesecake',
    desc: 'Creamy cheesecake with a tangy raspberry topping',
    inst: 'Make graham cracker crust, beat cream cheese with sugar and vanilla, pour over crust, bake, and top with raspberry sauce',
    ingr: '2~1~Graham cracker crumbs*1~2~Butter, melted*2~4~Packages Cream cheese*1~2~Sugar*4~8~Eggs*2~2~Vanilla extract*1~4~Raspberry preserves*2~2~Water*',
    tag: 'dessert',
    image: '~~~29'
  },
  {
    name: 'Teriyaki Salmon',
    desc: 'Grilled salmon fillet with a sweet and savory teriyaki glaze',
    inst: 'Marinate salmon in teriyaki sauce, grill until cooked through, and brush with additional teriyaki glaze',
    ingr: '4~0~Salmon fillets*1~4~Teriyaki sauce*2~2~Soy sauce*1~4~Brown sugar*1~4~Pineapple juice*2~2~Vegetable oil*1~8~Salt*1~1~Pepper*',
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
