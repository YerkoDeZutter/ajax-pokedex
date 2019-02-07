let pokeName;

$(document).keydown(function(evt) {
  if (evt.keyCode == 13) {
    pokeName = $("#pokeName").val();

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

          let randomMove = Math.floor(Math.random()*data.moves.length)

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

          console.log(data.species.url);
        }

        return allMoves
      }
    })
  }

})



//blastoise
