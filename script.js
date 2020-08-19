//     First API call - no response
// Button that submits call
$("#run-search").on("click", function (event) {
    event.preventDefault();
 
    // API Key: DaMMhwibfDPKxlHn 
    var queryURL = "http://api.isportsapi.com//sport/football/league/basic?api_key=DaMMhwibfDPKxlHn";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
        });
    console.log(queryURL);
});   


//         Second API call - no response
// button that submits call
$("#run-search").on("click", function (event) {
    event.preventDefault();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://free-nba.p.rapidapi.com/games/%7Bid%7D",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-nba.p.rapidapi.com",
            "x-rapidapi-key": "0a9afa4613msh47a31f8fd322579p11f7cfjsnd2a4eacc7e59"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
});