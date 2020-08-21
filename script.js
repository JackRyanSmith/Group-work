

// Danny's iSports API key: DaMMhwibfDPKxlHn
// Christian's iSports API key: 0uzEF34YYjTbHstM
// JackRyan's isport API key: wFO2Vj7ud4ZRBpCa
// Michael's iSports API key: OpV33oLoEsvyd08B

const searchForm = $("#city-search-form");
const searchInput = $("#search-city");

searchForm.on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-city").val();
    if (!cityName) return;

    displaySports(cityName);
});

// Building the URL we need to query the iSports database
async function displaySports(city) {
    try {
        const responses = await Promise.all([
            fetch(`https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/team/search?api_key=0uzEF34YYjTbHstM&name=${city}`),
            fetch(`https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/schedule?api_key=0uzEF34YYjTbHstM&leagueId=111`)
        ]);
        const [teams, games] = await Promise.all(responses.map(response => response.json()));
        console.log(teams, games);
// error checks
    } catch (error) {
    console.error(error);
}
}

// Run our AJAX call to get teams
// $.ajax({
// url: cityQueryURL,
// method: "GET"
// }).then(function(response) {

//     for (var i = 0; i < response.data.length; i++) {
//         if (response.data[i].leagueId === "111") {
//             console.log("Upcoming " + response.data[i].name + " games:");
//             teamName = response.data[i].name
//         }
//     }

// });

// Run our AJAX call to get the upcoming game schedule
// $.ajax({
// url: gamesQueryURL,
// method: "GET"
// }).then(function(response) {

//     var game = response.data;

//     for (var i = 0; i < game.length; i++) {
//         if ((game[i].awayName == teamName || game[i].homeName == teamName) && (new Date(game[i].matchTime*1000) > new Date())) {
//             console.log(new Date(game[i].matchTime*1000));
//         }
//     }

// });

