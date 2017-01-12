function initMostWanted(people){
	alert("Welcome to Most Wanted! Please follow the prompts to pursue the information for the person you seek.");

	do{
		var SearchType = prompt("Would you like to search by name or attributes? Enter 'name' or 'attributes'.");
	}while(!(SearchType == "name" || SearchType == "attributes"));
	switch(SearchType){
		case "name":
			var findPerson = getPerson(prompt("Enter person's first name."), prompt("Enter person's last name."), people);
			if(findPerson.length > 0){
				mainMenu(findPerson[0], people);
			} else {
				alert("Did not find anyone matching those perameters.");
				do{
				var nameRestart = prompt("Would you like to restart? (If so, type 'yes'. If not, type 'no')");
				}while(!(nameRestart == "yes" || nameRestart == "no"));
				if(nameRestart.toLowerCase() == "yes")
					initMostWanted(people);
				if(nameRestart.toLowerCase() == "no")
					break;
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


				var Weight = prompt("About how much does this person weigh? (In LBS)");

			do{
				var EyeColor = prompt("What is their eye color? Options: Brown, Blue, Hazel, Green or Black");
			}while(!(EyeColor == "Brown" || EyeColor == "Blue" || EyeColor == "Hazel" || EyeColor == "Green" || EyeColor == "Black"));

				var Occupation = prompt("What is their line of work? (EX: Nurse)");


				mainMenu(people);
		break;
		default:
			alert("There was an error processing your request.");
			initMostWanted(people);
		break;
	}
}

/*function searchByAttributes(person, people){

}*/

function getPerson(firstName, lastName, people){
	var findPerson = people.filter(function(person){
		return (person.firstName.toUpperCase() === firstName.toUpperCase()) && (person.lastName.toUpperCase() === lastName.toUpperCase());
	});
	return findPerson;
}

function mainMenu(person, people){
	if(!person){
		alert("Sorry, could not find individual.");
		return initMostWanted(people);
	}


	var displayOption = prompt("Found: " + person.firstName + " " + person.lastName +
	"\n\nDo you want to know their 'info', 'family', 'next of kin', or 'descendants'? Please type what you'd like." +
	"\n\nOtherwise, type 'restart' or 'quit'.");

	switch(displayOption){

		case "info":
			displayPersonInfo(person, people);

		break;
		case "family":
			displayFamily(person, people);

		break;
		case "next of kin":
			displayNextOfKin(person, people);

		break;
		case "descendants":
			displayDescendants(person, people);

		break;
		case "restart":
			initMostWanted(people);

		break;
		case "quit":
		break;
		default:
			alert("There was an error processing your request.");
			return mainMenu(person, people);
	}
}

function displayPersonInfo(person, people){
	alert("Name: " +person.firstName + " " +person.lastName + "\nGender: " +person.gender+
	"\nTheir occupation is: "+ person.occupation + "\nBirthday: " +person.dob +
	"\nHeight: " +person.height + " inches" + "\nWeight: " +person.weight + " lbs." +
	"\nEye Color: " +person.eyeColor);
	mainMenu(person, people);

}

function displayFamily(person, people){

	var parents = displayParents(person, people);

	var spouse = displaySpouse(person, people);

	var kids = displayKids(person, people);

	var siblings = displaySiblings(person, people);

	alert("-The " +person.lastName+ " Family- \nParent(s): " + parents + "\nSpouse: " + spouse + "\nSiblings: " +siblings+ "\nKid(s): " + kids);
	mainMenu(person, people);
}

function displayParents(person, people){

	/*
	if(person.parents.length == 0){
		return "None";
	}else{
	*/
		var parents = getParents(person.parents, people);

/*
		if(parents.length == 2){
				return parents[0].firstName +" "+ parents[0].lastName + " and " + parents[1].firstName +" "+ parents[1].lastName;
		}else{
			return parents[0].firstName +" "+ parents[0].lastName;
		}
		*/
		for(var i = 0; i < parents.length; i++){
			if(i==0){
				return parents[i].firstName + " " + parents[i].lastName;
			}else if((i > 0 ) && (i != parents.length-1)){
				return + ", " + parents[i].firstName + " " + parents[i].lastName;
			}else if(i == parents.length-1){
				return + ", and " + parents[i].firstName + " " + parents[i].lastName;
			}else{
				return "None";
			}
	}
}

function getParents(parentsId, people){
		var parents = [];
		for(var i = 0; i < parentsId.length; i++){
			parents.push(people.filter(function(person){
				return (person.id === parentsId[i]);
			})[0]);
		}
		return parents;
}

function displaySpouse(person, people){

	var spouse = getSpouse(person.currentSpouse, people);

	if(spouse[0]){
		return spouse[0].firstName +" "+ spouse[0].lastName;
	}else{
		return "None";
	}
}

function getSpouse(spouseId, people){
	var spouseById = people.filter(function(person){
			return (person.id === spouseId);
	});
	return spouseById;
}

function displayKids(person, people){

	var kids = getKids(person, people);

	if(kids.length == 4){
		return kids[0].firstName +" "+ kids[0].lastName + ", " + kids[1].firstName +" "+ kids[1].lastName +
		", " + kids[2].firstName +" "+ kids[2].lastName + ", and " + kids[3].firstName +" "+ kids[3].lastName;
	}else if(kids.length == 3){
		return kids[0].firstName +" "+ kids[0].lastName + ", " + kids[1].firstName +" "+ kids[1].lastName +
		", and " + kids[2].firstName +" "+ kids[2].lastName;
	}else if(kids.length == 2){
		return kids[0].firstName +" "+ kids[0].lastName + " and " + kids[1].firstName +" "+ kids[1].lastName;
	}else if(kids.length == 1){
		return kids[0].firstName +" "+ kids[0].lastName;
	}else{
		return "None";
	}
}

function getKids(parent, people){
	var kids = people.filter(function(person){
		for(var i =0; i <person.parents.length; i++){
			if(parent.id == person.parents[i]){
				return true;
			}
		}
		return false;
	});
	return kids;
}

function displaySiblings(person, people){

	var siblings = getSiblings(person, people);

	if(siblings.length == 4){
			return siblings[0].firstName +" "+ siblings[0].lastName + ", " + siblings[1].firstName +" "+ siblings[1].lastName +
			", " + siblings[2].firstName +" "+ siblings[2].lastName + ", and " + siblings[3].firstName +" "+ siblings[3].lastName;
		}else if(siblings.length == 3){
			return siblings[0].firstName +" "+ siblings[0].lastName + ", " + siblings[1].firstName +" "+ siblings[1].lastName +
			", and " + siblings[2].firstName +" "+ siblings[2].lastName;
		}else if(siblings.length == 2){
			return siblings[0].firstName +" "+ siblings[0].lastName + " and " + siblings[1].firstName +" "+ siblings[1].lastName;
		}else if(siblings.length == 1){
			return siblings[0].firstName +" "+ siblings[0].lastName;
		}else{
			return "None";
		}
}
function getSiblings(person, people){
	var siblings = people.filter(function(individual){
		if (individual.parents.includes(person.parents[0]) || individual.parents.includes(person.parents[1])){
			return true;
		} else{
			return false;
		}
		});
	return siblings;
}

function displayNextOfKin(person, people){

	var nextOfKin = getNextOfKin(person,people);

	alert("Next of Kin: " +nextOfKin);
	mainMenu(person, people);
}

function getNextOfKin(person, people){
	if(person.currentSpouse){
		return displaySpouse(person, people);
	}else if(displayKids(person, people) != "None"){
		return displayKids(person, people);
	}else if(person.parents[0]){
		return displayParents(person, people);
	}else if (displaySiblings(person, people) != "None"){
		return displaySiblings(person, people);
	}else{
		return "None";
	}
}


function displayDescendants(person, people){

	var kids = displayKids(person, people);

	//var grandchildren = displayGc(person, people);

	alert("-Descendants- \n\nKids: " + kids + "\nGrandchildren: " +/* grandchildren +*/ " \nGreat-Grandchildren: " );
	mainMenu(person, people);
}

/*
function displayGc(person, people){

	var kidsArray = getKids(person,people);
	var gC = getGc(0, kidsArray, people);


	for(var i = 0; i < gC.length; i++){
		if(i==0){
			return gC[i].firstName + " " + gC[i].lastName;
		}else if((i > 0 ) && (i != gC.length-1)){
			return + ", " + gC[i].firstName + " " + gC[i].lastName;
		}else if(i == gC.length-1){
			return + ", and " + gC[i].firstName + " " + gC[i].lastName;
		}else{
			return "None"
		}
	}
}

function getGc(x, kidsArray, people, results = []){
	var gC = people.filter(function(person){
		for(var i =0; i < person.parents.length; i++){
			if(kidsArray[x].id == person.parents[i]){
				x++
				return true;
			}else{
				return false;
			}
		}
	});
	if (gC != null){
		gC.forEach(function(child){
			results.push(child);
			getGc(x, kidsArray, people, results);
		})

	}
	return results;
}
*/
