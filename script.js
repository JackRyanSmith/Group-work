// Danny's iSports API key: DaMMhwibfDPKxlHn
// Christian's iSports API key: 0uzEF34YYjTbHstM
// JackRyan's isport API key: wFO2Vj7ud4ZRBpCa
// Michael's iSports API key: OpV33oLoEsvyd08B
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
    displaySports(cityName);
});
// Building the URL we need to query the iSports database
async function displaySports(city) {
    try {
        const responses = await Promise.all([
            fetch(`https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/team/search?api_key=DaMMhwibfDPKxlHn&name=${city}`),
            fetch(`https://cors-anywhere.herokuapp.com/http://api.isportsapi.com/sport/basketball/schedule?api_key=DaMMhwibfDPKxlHn&leagueId=111`)
        ]);

        const [teams, games] = await Promise.all(responses.map(response => response.json()));
        console.log(teams, games);
        displayTeams(teams);

        // grab next game data
        for (var i = 0; i < teams.data.length; i++) {
            if (teams.data[i].leagueId === "111") {
                console.log("Upcoming " + teams.data[i].name + " games:");
                teamName = teams.data[i].name
            }
        }
        var game = games.data;
        for (var i = 0; i < game.length; i++) {
            if ((game[i].awayName == teamName || game[i].homeName == teamName) && (new Date(game[i].matchTime * 1000) > new Date())) {
                console.log(new Date(game[i].matchTime * 1000));
            }
        }
        // end of grab next game data

        
        const teamItem = $("<div>").appendTo(teamInput); // teamInput < teamItem < teamBody < teamForm < divTemp < teamFormItem + teamFormLabel + breakLine
        const teamBody = $("<div>").addClass("#team-card-body").appendTo(teamItem);
        const teamForm = $("<form>").attr("id", "formId").appendTo(teamBody);

        for (var i = 0; i < teams.data.length; i++) {
            const divTemp = $("<div>");
            const teamFormItem = $("<input>").attr("class", "choseTeam").attr("type", "checkbox").attr("id", "team" + [i]).attr("name", "team" + [i]).attr("value", `${teams.data[i].name}`).appendTo(divTemp);
            const teamFormLabel = $("<label>").attr("for", "team" + [i]).text(`${teams.data[i].name}`).appendTo(divTemp);
            const breakLine = $("<br>").appendTo(divTemp);
            teamForm.append(divTemp);
        }


        const submitBtn = $("<button>Submit</button>").attr("id", "submit-btn").addClass("btn waves-effect waves-light").attr("type", "submit").attr("name", "action").appendTo(teamForm);

        submitBtn.on("click", function (event) {
            event.preventDefault();
            var teamArray = [];

            $(".choseTeam").each(function (index, item) {
                console.log(index + " = " + item.checked + " = " + item.value);
                if (item.checked == true){
                    teamArray.push(item.value);
                }
            });

            localStorage.setItem("teamArray", teamArray);
            teamItem.addClass("hide");

            // // OLD form code
            // const breakLine = $("<br>");
            // const optionsForm = $("<form>").attr("id", "formId").appendTo(options); // options < optionsForm < optionItemOne + optionOneLabel + optionItemTwo ...
            // const optionItemOne = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("name", "option-1").attr("value", "Next Game");
            // const optionOneLabel = $("<label>").attr("for", "option-1").text("Next Game");
            // const optionItemTwo = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("name", "option-2").attr("value", "Team Schedule");
            // const optionTwoLabel = $("<label>").attr("for", "option-2").text("Team Schedule");
            // const optionItemThree = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("name", "option-3").attr("value", "Team Standings");
            // const optionThreeLabel = $("<label>").attr("for", "option-3").text("Team Standings");
            // optionsForm.append(optionItemOne, optionOneLabel, optionItemTwo, optionTwoLabel, optionItemThree, optionThreeLabel);

            // NEW form code
            const optionItem = $("<div>").appendTo(options); // options < optionItem < optionBody < optionsForm < divTemp <
            const optionBody = $("<div>").addClass("#option-card-body").appendTo(optionItem);
            const optionsForm = $("<form>").attr("id", "formId").appendTo(optionBody);

            const divTemp1 = $("<div>");
            const optionItemOne = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("id", "option-1").attr("name", "option-1").attr("value", "Next Game").appendTo(divTemp1);
            const optionOneLabel = $("<label>").attr("for", "option-1").text("Next Game").appendTo(divTemp1);
            const breakLine1 = $("<br>").appendTo(divTemp1);

            const divTemp2 = $("<div>");
            const optionItemTwo = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("id", "option-2").attr("name", "option-2").attr("value", "Team Schedule").appendTo(divTemp2);
            const optionTwoLabel = $("<label>").attr("for", "option-2").text("Team Schedule").appendTo(divTemp2);
            const breakLine2 = $("<br>").appendTo(divTemp2);

            const divTemp3 = $("<div>");
            const optionItemThree = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("id", "option-3").attr("name", "option-3").attr("value", "Team Standings").appendTo(divTemp3);
            const optionThreeLabel = $("<label>").attr("for", "option-3").text("Team Standings").appendTo(divTemp3);
            const breakLine3 = $("<br>").appendTo(divTemp3);

            optionsForm.append(divTemp1, divTemp2, divTemp3);
            

            const submitBtn2 = $("<button>Submit</button>").attr("id", "submit-btn").addClass("btn waves-effect waves-light").attr("type", "submit").attr("name", "action").appendTo(optionsForm);

            submitBtn2.on("click", function(event){
                event.preventDefault();
                var optionArray = [];

                $(".choose-option").each(function (index, item){
                    console.log(index + " = " + item.checked + " = " + item.value);
                    if (item.checked == true){
                        optionArray.push(item.value);
                    }
                });

                localStorage.setItem("optionArray", optionArray);
                optionsForm.addClass("hide");

                for (var i = 0; i < teamArray.length; i++) {
                    const teamData = $("<div>").attr("id", "team-result").text(teamArray[i]).appendTo(finalResults);
                    for (var j = 0; j < optionArray.length; j++) {
                        const optionsData = $("<div>").attr("id", "option-result").text(optionArray[j]).appendTo(finalResults);
                    }
                    teamData.append($("<br>"));
                };
            });

        });
        
        // error checks
    } catch (error) {
        console.error(error);
    }
}
function displayTeams(city) {
}

