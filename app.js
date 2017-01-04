
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

	alert("FOREWARNING: If you are ever uncertain of a question asked, please leave the section blank.");

	do{	
		var SearchType = prompt("Would you like to search by name or attributes? Enter 'name' or 'attributes'.");
	}while(!(SearchType == "name" || SearchType == "attributes")); 
	switch(SearchType){
		case "name":
			var person = getPerson(prompt("Enter person's first name."), prompt("Enter person's last name."), people);
			mainMenu(person, people);
		break;
		case "attributes":

			var Gender = prompt("What is their gender? (M=Male, F=Female)");

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
		}
	}

	function getPerson (fistName, lastName, people){

	}

	function mainMenu (person, people){
		if(!person){
			alert("Sorry, could not find individual.");
			return initMostWanted(people);
		}

	}

	/*var displayOption promt ("Found + person.firstname = " " + person.lastname + " . "Do you want to know their 'info', 'family' , 'next of kin', 'descendants'? Please type what you'd like. Otherwise, click 'restart' or 'quit'.");

	switch(displayOption){

		break;
		case "info":
		getinfo(person, people);

		break;
		case "family":
		//call getfamily()

		break;
		case "kin":
		//call getnextofkin()

		break;
		case "descendants":
		//call getdescendants()

		break;
		case "restart":
		initMostWanted(people)

		break;
		case "quit":

		break;
		default;
		return mainMenu(person, people);

	}
}

function getinfo(person, people){
	alert("person: " +person.firstname + " " +person.lastname + ".Their occupation is" + person.occupation + "___");
	mainMenu(person, people);

}*/


/*


	// then pass that info to the respective function.
	var result = getPersonInfo("J", "T")

	// once the search is done, pass the results to the responder function
	responder(result);
}

function responder(results){
	// results may be a list of strings, an object, or a single string.
	alert(results);
}

function getPersonInfo(firstname, lastname){
	var result = "This will be the information for whoever you searched for";
	// return the object of a person
	return result;
}

function getFamily(){
	// return an array containing the members of the person's family
	// the array should contain each person's unmodified object
}

// there will be much more here, and some of the code above will certainly change
*/