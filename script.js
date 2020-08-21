        // Danny's iSports API key: DaMMhwibfDPKxlHn
        // Christian's iSports API key: 0uzEF34YYjTbHstM
        // Michael's iSports API key: OpV33oLoEsvyd08B

        var cityName = prompt("Enter city");

        // Building the URL we need to query the iSports database
        var cityQueryURL = "https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/team/search?api_key=0uzEF34YYjTbHstM&name=" + cityName;
        var teamName;

        var gamesQueryURL = "https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/schedule?api_key=0uzEF34YYjTbHstM&leagueId=111";
        
        // Run our AJAX call to get teams
        $.ajax({
        url: cityQueryURL,
        method: "GET"
        }).then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].leagueId === "111") {
                    console.log("Upcoming " + response.data[i].name + " games:");
                    teamName = response.data[i].name
                }
            }

        });

        // Run our AJAX call to get the upcoming game schedule
        $.ajax({
        url: gamesQueryURL,
        method: "GET"
        }).then(function(response) {

            var game = response.data;

            for (var i = 0; i < game.length; i++) {
                if ((game[i].awayName == teamName || game[i].homeName == teamName) && (new Date(game[i].matchTime*1000) > new Date())) {
                    console.log(new Date(game[i].matchTime*1000));
                }
            }

        });
