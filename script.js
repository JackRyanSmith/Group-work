// Danny's iSports API key:
const apiKey1 = "DaMMhwibfDPKxlHn";
// Christian's iSports API key: 
const apiKey2 = "0uzEF34YYjTbHstM"; 
// JackRyan's isport API key: 
const apiKey3 = "wFO2Vj7ud4ZRBpCa";
// Michael's iSports API key: 
const apiKey4 = "OpV33oLoEsvyd08B";
// Michael's second iSports API key: 
const apiKey5 = "hXIoG3unSr5PFboi";
// Michael's third iSports API key: 
const apiKey6 = "OhHGQTk2RHGzu5Tp";
// Chirstian's Pexels API key: 
const apiKeyPexels = "563492ad6f91700001000001fc2a789fa0864115a147ac0879147312";

const searchForm = $("#city-search-form");
const searchInput = $("#search-city");
const teamInput = $("#team-selection");
const options = $("#info-options");
const finalResults = $("#results");

searchForm.on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-city").val();
    if (!cityName) return;
    searchForm.addClass("hide");
    $("#header").text(cityName);
    // Pexels - photo search
    $.ajax({
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", apiKeyPexels);
        },
        url: "https://api.pexels.com/v1/search?query=" + cityName,
    }).then(function (data) {
        var random = Math.floor(Math.random()*10);
        var cityImage = (data.photos[random].src.original);
        console.log(cityImage);
        $("#header").css({
            "background-image": "url(" + cityImage + ")",
            "background-position": "center"
        });
    });
    searchForTeamData(cityName);
});


// Building the URL we need to query the iSports database
async function searchForTeamData(city) {
    try {
        const responses = await Promise.all([
            fetch(`https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/team/search?api_key=${apiKey4}&name=${city}`),
            fetch(`https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/schedule?api_key=${apiKey4}&leagueId=111`)
        ]);

        const [teamSearchResults, schedule] = await Promise.all(responses.map(response => response.json()));
        
        searchForm.addClass("hide");

        console.log(teamSearchResults);
        console.log(schedule);
        
        teams = teamSearchResults.data.map(function(teamData) {
            // Filter object properties
            return { ...teamData };
        });
        matches = schedule.data.map(function(matchData) {
            // Filter object properties
            return { ...matchData };
        });
        console.log(teams, matches);
        for (var i = 0; i < matches.length; i++) {
            if (matches[i].homeId == 6){
                console.log(matches[i].matchTime);
            }
        }

        displayTeamSelection();
        
        // error checks
    } catch (error) {
        console.error(error);
    }
}


function displayTeamSelection() {
    // appending local team data
    const teamItem = $("<div>").appendTo(teamInput); // teamInput < teamItem < teamBody < teamForm < divTemp < teamFormItem + teamFormLabel + breakLine
    const teamBody = $("<div>").addClass("#team-card-body").appendTo(teamItem);
    const teamForm = $("<form>").attr("id", "formId").addClass("title-text").text("Local Teams").appendTo(teamBody);
    const spacer = $("<div>").addClass("spacer").appendTo(teamForm);

    // loop that gives labels/checkboxes to teams no matter how long the list is
    for (var i = 0; i < teams.length; i++) {
        const divTemp = $("<div>");
        const teamFormItem = $("<input>").attr("class", "choseTeam").attr("type", "checkbox").attr("id", "team" + [i]).attr("name", "team" + [i]).attr("value", `${teams[i].name}`).appendTo(divTemp);
        const teamFormLabel = $("<label>").attr("for", "team" + [i]).text(`${teams[i].name}`).appendTo(divTemp);
        const breakLine = $("<br>").appendTo(divTemp);
        teamForm.append(divTemp);
    }
    const submitBtn = $("<button>Submit</button>").attr("id", "submit-btn").addClass("btn waves-effect waves-light").attr("type", "submit").attr("name", "action").appendTo(teamForm);

    // click listener that leads to next page with info list
    submitBtn.on("click", function (event) {
        event.preventDefault();

        $(".choseTeam").each(function (index, item) {
            if (!item.checked) delete teams[index];
        });

        teams = teams.filter(function(team) {
            return team;
        });

        teamItem.addClass("hide");

        displayDataSelection();
    });
}

function displayDataSelection() {
    const optionItem = $("<div>").appendTo(options); // options < optionItem < optionBody < optionsForm < divTemp <
    const optionBody = $("<div>").addClass("#option-card-body").appendTo(optionItem);
    const optionsForm = $("<form>").attr("id", "formId").addClass("title-text").text("Info Options").appendTo(optionBody);
    const spacer = $("<div>").addClass("spacer").appendTo(optionsForm);
    
    const divTemp1 = $("<div>");
    const optionItemOne = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("id", "option-1").attr("name", "option-1").appendTo(divTemp1);
    const optionOneLabel = $("<label>").attr("for", "option-1").text("Next Game").appendTo(divTemp1);
    const breakLine1 = $("<br>").appendTo(divTemp1);

    const divTemp2 = $("<div>");
    const optionItemTwo = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("id", "option-2").attr("name", "option-2").appendTo(divTemp2);
    const optionTwoLabel = $("<label>").attr("for", "option-2").text("Team Schedule").appendTo(divTemp2);
    const breakLine2 = $("<br>").appendTo(divTemp2);

    const divTemp3 = $("<div>");
    const optionItemThree = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("id", "option-3").attr("name", "option-3").appendTo(divTemp3);
    const optionThreeLabel = $("<label>").attr("for", "option-3").text("Team Standings").appendTo(divTemp3);
    const breakLine3 = $("<br>").appendTo(divTemp3);

    optionsForm.append(divTemp1, divTemp2, divTemp3);
    
    const submitBtn2 = $("<button>Submit</button>").attr("id", "submit-btn").addClass("btn waves-effect waves-light").attr("type", "submit").attr("name", "action").appendTo(optionsForm);

    submitBtn2.on("click", function(event){
        event.preventDefault();
        optionsForm.addClass("hide");

        displayData(optionItemOne.is(":checked"), optionItemTwo.is(":checked"), optionItemThree.is(":checked"))
    });
}

function displayData(nextGame, teamSchedule, teamStanding) {
    console.log(nextGame, teamSchedule, teamStanding);
    teams.forEach(function(team) {
        console.log(team);
        console.log(team.name);
        const schedResults = $("#schedule-results-list");
        $("#team-card-title").text(team.name).append($("<hr>"));
        const teamData = $("<div>").text(team.name).attr("id", "team-result").appendTo(finalResults);
        if (nextGame) {
            const firstMatch = matches.filter(function(match) {
                console.log(match.homeName);
                return ((match.homeName === team.name || match.awayName === team.name) && (match.matchTime > Date.now()));
            });
            const optionsData = $("<div>").attr("id", "next-match-result").text(firstMatch && new Date(firstMatch.matchTime*1000) || "none").appendTo(teamData)
        }
        if (teamSchedule) {
            $("#schedule-results").removeClass("hide")
            const teamMatches = matches.filter(function(match) {
                return (match.homeName === team.name || match.awayName === team.name);
            });
            console.log(teamMatches);
            for (var i = 0; i < teamMatches.length; i++) {
                const optionsData = $("<div>").attr("id", "match-results").text(`${new Date(teamMatches[i].matchTime * 1000).toLocaleDateString('en-US')} ${teamMatches[i].awayName}: ${teamMatches[i].awayScore} ${teamMatches[i].homeName}: ${teamMatches[i].homeScore}`).appendTo(schedResults);
            }
        }
        if (teamStanding) {
            // another api?
            const optionsData = $("<div>").text("Team Standing").appendTo(teamData)
        }
        teamData.append($("<br>"));
    });
}