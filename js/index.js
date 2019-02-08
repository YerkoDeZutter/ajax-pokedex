let pokeName;
window.onload = function() {

  createGen(1)

  function createGen(thisGen) {

    let pokeGen = new XMLHttpRequest();

    pokeGen.onreadystatechange = function() {

      if (pokeGen.readyState == 4 && pokeGen.status == 200) {

        JSON.parse(pokeGen.response).pokemon_species.forEach(thisPokemon => {

          $.get("https://pokeapi.co/api/v2/pokemon/" + thisPokemon.name, function(pokeImage) {

            $('#pickAPokemon').append("<img onclick='startClickebull()' id='" + thisPokemon.name + "' class='pokemonSelect' src='" + pokeImage.sprites.front_default + "' ></img>")
            console.log(thisPokemon.name);

          })

        })

      }

    }

    // console.log(thisPokemon);

    pokeGen.open("GET", "https://pokeapi.co/api/v2/generation/" + thisGen, false);
    pokeGen.send();


  }

  $("ol li").click(function() {
    $('#pickAPokemon').empty();
    let pickdGen = $(this).text();
    createGen(pickdGen)
  })


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

  $(".pokemonSelect").click(function() {

    $("#pokedex").css("display", "block");
    pokeName = $(this).attr("id");

    $.get("https://pokeapi.co/api/v2/pokemon/" + pokeName + "/", function(data) {

      let speciesLink = data.species.url

      $("#name").text(data.name);

      $("#pokeID").text(data.id);

      if (Math.random() <= .02) {

        $("#photo").attr("src", data.sprites.front_shiny)

      } else {
        $("#photo").attr("src", data.sprites.front_default)
      }
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

          curLI = $($("ul li")[i]);

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
