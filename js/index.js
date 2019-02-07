let pokeName;
window.onload = function() {

  let pokeGen = new XMLHttpRequest();

  pokeGen.onreadystatechange = function() {
    JSON.parse(pokeGen.response).pokemon_species.forEach(thisPokemon => {

      $.get("https://pokeapi.co/api/v2/pokemon/" + thisPokemon.name, function(pokeImage) {

        $('body').append("<img id='" + thisPokemon.name + "' class='pokemonSelect' src='" + pokeImage.sprites.front_default + "' ></img>")
        console.log(thisPokemon.name);

      })

    })
  }

// console.log(thisPokemon);

pokeGen.open("GET", "https://pokeapi.co/api/v2/generation/1", false);
pokeGen.send();

startClickebull()


}

$(document).keyup(function(evt) {
  if (evt.keyCode == 13) {

  } else {
    let pokemonCheck = $(".pokemonSelect");
    let curInput = $("input").val()

    for (var i = 0; i < $(".pokemonSelect").length; i++) {

      let thispokeCheck = $(pokemonCheck[i]);

      if (thispokeCheck.attr("id").indexOf(curInput) == -1) {
        thispokeCheck.css("display", "none")
      } else {
        thispokeCheck.css("display", "block")
      }

    }

  }

})









//blastoise









function startClickebull() {

  console.log(11);

  $(".pokemonSelect").click(function() {

    $("#pokedex").css("display", "block");
    pokeName = $(this).val();

    console.log(11);

    $.get("https://pokeapi.co/api/v2/pokemon/" + pokeName + "/", function(data) {
      console.log(data);

      let speciesLink = data.species.url

      $("#name").text(data.name);

      $("#pokeID").text(data.id);

      $("#photo").attr("src", data.sprites.front_default)

      // $("#moves").text(moveSet())

      moveSet()

      // $("#vorigeEvol").attr("src", data)


      $.get(speciesLink, function(data3) {
        if (data3.evolves_from_species != null) {
          let lastEvolution = data3.evolves_from_species.name;
          $.get("https://pokeapi.co/api/v2/pokemon/" + lastEvolution + "/", function(data4) {
            $("#vorigeEvol").attr("src", data4.sprites.front_default)
          })
        } else {
          $("#vorigeEvol").attr("src", "")
        }
      })




      function moveSet() {
        let allMoves = "moves: ";
        let curLI;
        for (var i = 0; i < 4; i++) {

          curLI = $($("li")[i]);

          let randomMove = Math.floor(Math.random() * data.moves.length)

          curLI.text(data.moves[randomMove].move.name);




          // normaale js manier

          let pokeColor = new XMLHttpRequest();

          pokeColor.onreadystatechange = function() {
            if (pokeColor.readyState == 4 && pokeColor.status == 200) {

              curLI.css("background-color", JSON.parse(pokeColor.response).color.name);

              if (JSON.parse(pokeColor.response).color.name == "white" || JSON.parse(pokeColor.response).color.name == "yellow") {
                curLI.css("color", "black");
              } else {
                curLI.css("color", "white");
              }
            }
          }

          pokeColor.open("GET", speciesLink, false);
          pokeColor.send();
        }

        return allMoves
      }
    })

  })

}
