
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
	}while(!(SearchType == "name"|| SearchType == "attributes")); 
	switch(SearchType){
		case "name":
		var person = getPerson(prompt("Enter person's first name."), prompt("Enter person's last name."), people);
		mainMenu(person, people);
		break;
		case "attributes":

		do{
			var Gender = prompt("What is their gender? (M=Male, F=Female)");
		}while(!(Gender == "F" || Gender == "M"));

		var Age = prompt("Approximately how old are they? (EX: 18-25)");
			// Add dropdown menu

			var Height = prompt("Approximately how tall is this person? (In INCHES)");
			// (Inches, FT, In)

			var Weight = prompt("About how much does this person weigh? (In LBS)");

			var EyeColor = prompt("What is their eye color?");
			//Dropdown menu

			var Occupation = prompt("What is their line of work? (EX: Retail)");
			// Dropdown
			mainMenu(person, people);
			break;
			default:
			alert("There was an error processing your request.");
			initMostWanted(people);
			break;
		}
	}

	function getPerson (fistName, lastName, people){
		
		}

		

	// if user enterd info that matches with data, alert further info for the individual

	function mainMenu (person, people){
		if(!person){
			alert("Sorry, could not find individual.");
			return initMostWanted(people);
		}


		var displayOption = getPerson(prompt("Found" + person.firstName + " " + person.lastName + "." + "Do you want to know their 'info', 'family', 'next of kin', or 'descendants'? Please type what you'd like. Otherwise, click 'restart' or 'quit'."), person);

		switch(displayOption){

			case "info":
			getInfo(person, people);

			break;
			case "family":
			getFamily(person, people);

			break;
			case "kin":
			getnextofkin(person, people);

			break;
			case "descendants":
			getdescendants(person, people);

			break;
			case "restart":
			initMostWanted(people)

			break;
			case "quit":

			break;
			default:
			return mainMenu(person, people);
			break;
		}
	}

	function getInfo(person, people){
		alert("person: " +person.firstname + " " +person.lastname + ".Their occupation is" + person.occupation + "___");
		mainMenu(person, people);

	}

	function getFamily(person, people){
		alert("person: " +person.lastName + " " +person.currentSpouse);
		mainMenu(person, people);
	}

	function getPerson(firstName, lastName, people){
		function byAge(person){
			if(person.age >50){
				return true;
			} else {
				return false;
			}
		}
	}


