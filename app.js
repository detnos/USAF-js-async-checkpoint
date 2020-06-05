const fetch = require('node-fetch');

var fs = require('fs');

//coding for the pokemon api
let input = 'input.txt';
var data = fs.readFileSync(input);
var namelines = data.toString().split('\n');
var typesObj = {};


function getPokemon(pokemon) {
  //fetch information for the pokemon
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .then(response => response.json()) // turn the response into json
    .then(json => {
      //create output string and assign the pokemon name to it
      let outputString = json.name + ': '
      //location where the types array is at in the returned json data
      let pokeType = json.types;
      pokeType.forEach(typeItem => {
        //push the type to the array located in the newObj where the key is the name of the pokemon
        typesObj[json.name].push(typeItem.type.name)

      });
      //consolelog pokemon name : types, type, etc..
      outputString += typesObj[json.name].join(', ');
      console.log(outputString);
    });
}
//iterate over the pokemon and call the fetching function to get the appropriate data (their types (can be more than 1))
for (var i = 0; i < namelines.length; i++) {
  pokemon = namelines[i]
  typesObj[namelines[i]] = []
  getPokemon(pokemon);
}
  