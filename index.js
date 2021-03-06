const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2

    Recipe.create({
      title: "Risotto de setas",
      level: "Easy Peasy",
      ingredients: ["rice", "mushrooms", "cheese"],
      cuisine: "italian",
      dishType: "main_course",
      duration: 40,
      creator: "Julio",
    })
    .then(recipe => {
      console.log(`recipe ${recipe.title} created!`)
    })
    .catch(err => {
      console.error(err)
    })

    // Iteration 3
    Recipe.insertMany(data)
    .then(recipes => {
      recipes.forEach(recipe => {
        console.log(`recipe ${recipe.title} created!`)
      })

          // Iteration 4
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
        .then(recipe => {
          if (recipe)  {
          console.log(`recipe ${recipe.title} updated!`)
          } else {
            console.log('recipe not found')
          }
        })
        .catch(err => {
          console.error(err)
        })

        // Iteration 5
        Recipe.deleteOne({ title: "Carrot Cake" })
        .then(() => {
          console.log(`recipe deleted!`)
          mongoose.connection.close()
        })
        .catch(err => {
          console.error(err)
        })
    })
    .catch(err => {
      console.error(err)
    })
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
