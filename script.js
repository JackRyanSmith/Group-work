// Danny's iSports API key: DaMMhwibfDPKxlHn
// Christian's iSports API key: 0uzEF34YYjTbHstM
// JackRyan's isport API key: wFO2Vj7ud4ZRBpCa
// Michael's iSports API key: OpV33oLoEsvyd08B
const searchForm = $("#city-search-form");
const searchInput = $("#search-city");
const teamInput = $("#team-selection");
const options = $("#info-options");
searchForm.on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-city").val();
    if (!cityName) return;
    searchForm.addClass("hide");
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
        displayTeams(teams);
        {
            const teamItem = $("<div>").appendTo(teamInput);
            const teamBody = $("<div>").addClass("#team-card-body").appendTo(teamItem);
            const teamForm = $("<form>").attr("id", "formId").appendTo(teamBody);
            for (var i = 0; i < teams.data.length; i++) {
                const teamFormItem = $("<input>").attr("class", "choseTeam").attr("type", "checkbox").attr("name", "team" + [i]).attr("value", `${teams.data[i].name}`);
                const teamFormLabel = $("<label>").attr("for", "team" + [i]).text(`${teams.data[i].name}`);
                const breakLine = $("<br>");
                teamForm.append(teamFormItem, teamFormLabel, breakLine);
            }
            // $("#formId").on("click", function() {
            //     console.log($(`input[type=checkbox][name=${teams.data[i]}]:checked`).val());
            // });
            const submitBtn = $("<button>Submit</button>").addClass("#team-submit-btn").appendTo(teamForm);
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

                const breakLine = $("<br>");
                const optionsForm = $("<form>").appendTo(options);
                const optionItemOne = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("name", "option-1");
                const optionOneLabel = $("<label>").attr("for", "option-1").text("Next Game").append($("<br>"));
                const optionItemTwo = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("name", "option-2");
                const optionTwoLabel = $("<label>").attr("for", "option-2").text("Team Schedule").append($("<br>"));
                const optionItemThree = $("<input>").attr("class", "choose-option").attr("type", "checkbox").attr("name", "option-3");
                const optionThreeLabel = $("<label>").attr("for", "option-3").text("Team Standings").append($("<br>"));
                optionsForm.append(optionItemOne, optionOneLabel, optionItemTwo, optionTwoLabel, optionItemThree, optionThreeLabel);
                

                const submitBtn2 = $("<button>Submit</button>").addClass("#option-submit-btn").appendTo(optionsForm);
                submitBtn2.on("click", function(event){
                    event.preventDefault();
                    var optionArray = [];
                    $(".choose-option").each(function (index, item){
                        if (item.checked == true){
                            optionArray.push(item.value);
                        }
                    });
                    localStorage.setItem("optionArray", optionArray);
                    optionsForm.addClass("hide");

                    // last page functionality
                })
            })
        }
        // error checks
    } catch (error) {
        console.error(error);
    }
}
function displayTeams(city) {
}
// function renderTeamList() {
//     // Clear todoList element and update todoCountSpan
//     teamList.innerHTML = "";
//     teamCountSpan.textContent = teams.length;
//       // Render a new li for each todo
//   for (var i = 0; i < teams.length; i++) {
//             var team = teams[i];
//             var li = document.createElement("li");
//             li.textContent = team;
//             li.setAttribute("data-index", i);
//             var button = document.createElement("button");
//             button.textContent = "Complete";
//             li.appendChild(button);
//             todoList.appendChild(li);
//         }
// }
// function init() {
//   // Get stored todos from localStorage
//   // Parsing the JSON string to an object
//   var storedTeams = JSON.parse(localStorage.getItem("teams"));
//   // If todos were retrieved from localStorage, update the todos array to it
//   if (storedTeams !== null) {
//     teams = storedTeams;
//   }
//   // Render todos to the DOM
//   renderTodos();
// }
// function storeTodos() {
//   // Stringify and set "todos" key in localStorage to todos array
//   localStorage.setItem("teams", JSON.stringify(teams));
// }
// // When form is submitted...
// todoForm.addEventListener("submit", function(event) {
//   event.preventDefault();
//   var teamText = teamInput.value.trim();
//   // Return from function early if submitted todoText is blank
//   if (teamText === "") {
//     return;
//   }
//   // Add new todoText to todos array, clear the input
//   teams.push(todoText);
//   teamInput.value = "";
//   // Store updated todos in localStorage, re-render the list
//   storeTeams();
//   renderTeams();
// });
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