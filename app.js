
/*  Remove this from your final submission
function printAllToConsole(dataObj){
	for (var key in dataObj) {
		if (dataObj.hasOwnProperty(key)) {
			console.log(key + " -> " + JSON.stringify(dataObj[key]));
		}
	}
}
printAllToConsole(data);
*/


function initMostWanted(people){
	
	alert("Welcome to Most Wanted! Please follow the prompts to pursue the information for the person you seek.");
	
	do{	
		var SearchType = prompt("Would you like to search by name or attributes? Enter 'name' or 'attributes'.");
	}while(!(SearchType == "name" || SearchType == "attributes")); 
	switch(SearchType){
		case "name":
			var listOfPeople = getPerson(prompt("Enter person's first name."), prompt("Enter person's last name."), people);
			if(listOfPeople.length > 0){
				mainMenu(listOfPeople[0], people);
			} else {
				alert("Did not find anyone matching those perameters.");
				do{
				var nameRestart = prompt("Would you like to restart? (If so, type 'yes'. If not, type 'no')");
				}while(!(nameRestart == "yes" || nameRestart == "no"));
				if(nameRestart.toLowerCase() == "yes")
					return initMostWanted(people);
				if(nameRestart.toLowerCase() == "no")
					window.close();
			}
		break;
		case "attributes":

			do{
				var Gender = prompt("What is their gender? (M=Male, F=Female)");
			}while(!(Gender == "F" || Gender == "M"));

			do{
			var Age = prompt("Approximately how old are they? Please Type: '18 & Under', '18-25', '25-50' or '50+' ");
			}while(!(Age == "18 & Under" || Age == "18-25" || Age == "25-50" || Age == "50+"));

				var Height = prompt("Approximately how tall is this person? (In INCHES)");
				// (Inches, FT, In)

				var Weight = prompt("About how much does this person weigh? (In LBS)");

			do{
				var EyeColor = prompt("What is their eye color? Options: Brown, Blue, Hazel, Green or Black");
			}while(!(EyeColor == "Brown" || EyeColor == "Blue" || EyeColor == "Hazel" || EyeColor == "Green" || EyeColor == "Black"));

				var Occupation = prompt("What is their line of work? (EX: Nurse)");
				// Dropdown

				mainMenu(person, people);
		break;
		default:
			alert("There was an error processing your request.");
			initMostWanted(people);
		break;
	}
}

function getPerson(firstName, lastName, people){
	var listOfPeople = people.filter(function(person){
		return (person.firstName.toLowerCase() === firstName) && (person.lastName.toLowerCase() === lastName);
	});
	return listOfPeople;
}

function mainMenu(person, people){
	if(!person){
		alert("Sorry, could not find individual.");
		return initMostWanted(people);
	}


	var displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". " + "Do you want to know their 'info', 'family', 'next of kin', or 'descendants'? Please type what you'd like. Otherwise, type 'restart' or 'quit'.");

	switch(displayOption){

		case "info":
			getPersonInfo(person, people);

		break;
		case "family":
			getFamily(person, people);

		break;
		case "kin":
			getNextOfKin(person, people);

		break;
		case "descendants":
			getDescendants(person, people);

		break;
		case "restart":
			initMostWanted(person, people);

		break;
		case "quit":
		return;
		break;
		default:
			alert("There was an error processing your request.");
			return mainMenu(person, people);
		break;
	}
}


function getPersonInfo(person, people){
	alert("Name: " +person.firstName + " " +person.lastName + ". Gender: " +person.gender + ". Their occupation is: " +person.occupation+ ".");
	alert("Birthday: " +person.dob + ". Height: " +person.height + " inches. Weight: " +person.weight + " lbs. Eye Color: " +person.eyeColor+ ".");
	mainMenu(person, people);

}

function getDescendants(person, people){

}

function getFamily(person, people){
	var idSwitch = getPersonById(idSwitch.parents, people).firstName   //person.parents;
	/*if(person.parents.length > 0)
		alert("Parents: " +getPersonById(person.parents[0].firstName, people)+ " and " +getPersonById(parents[1].firstName, people)+ ".");
	else if(person.parents.length = 0)
		alert("Parents: " +getPersonById(person.parents[0].firstName, people)+ ".");
	else if(person.parents.length < 0)
		alert("No parents.")
	*/


	//var kids = 

	var spouse = person.currentSpouse;
	

	//var siblings = 
	alert("-" +person.lastName+ " Family- Parents: " +idSwitch);
	mainMenu(person, people);
}

function getNextOfKin(person, people){
	alert("Name: " +person.lastName + " " +person.firstName);
	mainMenu(person, people);
}


	



function getPersonById(person, people){
	var idSwitch = people.map(function(person){return "id:" + person.id + "firstName:" + person.firstName });
	return idSwitch;
}