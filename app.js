function initMostWanted(people){
	DisplayWelcome();
	var searchType = PromptSearchType();
	switch(searchType){
		case "name":
			var person = SearchByName(people);
			if(person){
				ShowMainMenu(person, people);
			} else {
				alertNoPerson();
				initRestart(people);
			}
		break;
		case "attributes":
			alertAttributes();
			var individual = getAttributes(people);
			if(individual.length > 0){
				mainMenu(individual, people);
			}else{
				alertNoPerson();
				initRestart(people);
			}

		break;
	}
}
function DisplayWelcome(){
	alert("Welcome to Most Wanted! Please follow the prompts to pursue the information for the person you seek.");
}
function PromptSearchType(){
	do{
		var searchType = prompt("Would you like to search by name or attributes? Enter 'name' or 'attributes'.");
	}while(!(searchType == "name" || searchType == "attributes"));
	return searchType;
}
function SearchByName(people){
	var person = getPersonByName(prompt("You have chosen to search by name. \n\nPlease enter the person's first name."), prompt("\nPlease enter the person's last name."), people);
	return person;
}
function getPersonByName(firstName, lastName, people){
	var person = people.filter(function(person){
		return (person.firstName.toUpperCase() === firstName.toUpperCase()) && (person.lastName.toUpperCase() === lastName.toUpperCase());
	});
	return person[0];
}
function alertNoPerson(){
	alert("There were no people matching the given criteria.");
}
function alertError(){
	alert("Sorry, there was an error processing your request.");
}
function initRestart(people){
	do{
		var answer = promptRestart();
	}while(!(answer == "yes" || answer == "no"));
	restart(answer, people);
}
function promptRestart(){
	var answer = prompt("Would you like to restart? (If so, type 'yes'. If not, type 'no')").toLowerCase();
	return answer;
}
function restart(answer, people){
		if(answer.toLowerCase() == "yes")
			initMostWanted(people);
		if(answer.toLowerCase() == "no")
			return answer;
}
function alertAttributes(){
	alert("You have chosen to search a person by attributes. \n\n If at any time you do not know the answer, please type 'next'.");
}
function getAttributes(people){
	var gender = searchGender();
	var age = searchAge();
	age = parseInt(age);
	var height = searchHeight();
	height = parseInt(height);
	var weight = searchWeight();
	weight = parseInt(weight);
	var eyeColor = searchEyeColor();
	var occupation = searchOccupation();

	var attributes = searchByAttributes(gender, age, height, weight, eyeColor, occupation, people);
	return attributes;
}
function searchByAttributes(gender, age, height, weight, eyeColor, occupation, people){
	var personList = people.filter(function(person){
		if(gender === person.gender){
			return true;
		}if((age + 3 || age - 3) === getAge(person.dob, people)){
			return true;
		}if(height === person.height){
			return true;
		}if(weight === person.weight){
			return true;
		}if(eyeColor === person.eyeColor){
			return true;
		}if(occupation === person.occupation){
			return true;
		}
	});
	return personList;
}
function searchGender(){
	do{
		var gender = prompt("What is their gender? \n\nPlease enter the word 'male' or 'female'");
	}while(!((gender.toLowerCase().trim() == "male")||(gender.toLowerCase().trim() == "female")||(gender.trim() == "next")));
	return gender;
}
function searchAge(){
	do{
		var age = prompt("Approximately how old are they? \n\nPlease enter a number between 20 and 90");
	}while(!((20 <= age && age <= 90) || (age.toLowerCase().trim() == "next")));
	return age;
}
function searchHeight(){
	do{
		var height = prompt("Approximately how tall is this person? \n\nPlease enter a number for INCHES between 50 and 80");
	}while(!((50 <= height && height <= 80) || height.toLowerCase().trim() == "next"));
	return height;
}
function searchWeight(){
	do{
		var weight = prompt("About how much does this person weigh? \n\nPlease enter a number for the approximate amount of pounds they weigh between 100 and 260)");
	}while(!((100 <= weight && weight <= 260) || weight.toLowerCase().trim() == "next"));
	return weight;
}
function searchEyeColor(){
	do{
		var eyeColor = prompt("What is their eye color? \n\nOptions: Brown, Blue, Hazel, Green or Black");
	}while(!(eyeColor.toLowerCase() == "brown" || eyeColor.toLowerCase() == "blue" ||
	eyeColor.toLowerCase() == "hazel" || eyeColor.toLowerCase() == "green" ||
	eyeColor.toLowerCase() == "black" || eyeColor.toLowerCase() == "next"));
	return eyeColor;
}
function searchOccupation(){
	do{
		var occupation = prompt("What is their line of work? \n\nEX: Nurse");
	}while(!(occupation.toLowerCase() == "nurse" || occupation.toLowerCase() == "programmer" ||
	occupation.toLowerCase() == "assistant" || occupation.toLowerCase() == "politician" ||
	occupation.toLowerCase() == "doctor" || occupation.toLowerCase() == "landscaper" ||
	occupation.toLowerCase() == "architect" ||occupation.toLowerCase() == "student" ||
	occupation.toLowerCase() == "next"));
		return occupation;
}

function ShowMainMenu(person, people){

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

	var rents = getPersonById(person.parents, people);
	var parents = getNames(rents);

	var sigO = getPersonById([person.currentSpouse], people);
	var spouse = getNames(sigO);

	var childs = getPersonByParents(person, person.id, people);
	var kids = getNames(childs);

	var sibs = getPersonByParents(person, person.parents[0], people);
	var siblings = getNames(sibs);

	alert("-The " +person.lastName+ " Family- \nParent(s): " + parents + "\nSpouse: " + spouse + "\nSiblings: " +siblings+ "\nKid(s): " + kids);
	mainMenu(person, people);
}

function getNames(mortals){
	var names;
		if(mortals.length == 0){
			names = "None";
		}else{
			for(var i = 0; i < mortals.length; i++){
				if(i==0){
					names = (mortals[i].firstName + " " + mortals[i].lastName);
				}else if(i==1 && mortals.length == 2){
					names += (" and " + mortals[i].firstName + " " + mortals[i].lastName);
				}else if((i > 0 ) && (i != mortals.length-1)){
					names += (", " + mortals[i].firstName + " " + mortals[i].lastName);
				}else if(i == mortals.length-1){
					names += (", and " + mortals[i].firstName + " " + mortals[i].lastName);
				}
			}
		}
		return names;
}

function getPersonById(personId, people){
	var personById = people.filter(function(person){
		for(var i =0; i <personId.length; i++){
			if(person.id === personId[i]){
				return true;
			}
		}
		return false;
	});
	return personById;
}

function getPersonByParents(oldPerson, parentId, people){
	var kids = people.filter(function(person){
		for(var i =0; i <person.parents.length; i++){
			if((parentId == person.parents[i]) && oldPerson != person){
				return true;
			}
		}
		return false;
	});
	return kids;
}

function displayNextOfKin(person, people){

	var nextOfKin = getNextOfKin(person,people);

	alert("Next of Kin: " +nextOfKin);
	mainMenu(person, people);
}

function getNextOfKin(person, people){
	if(person.currentSpouse){
		return getPersonById([person.currentSpouse], people);
	}else if(getPersonByParents(person, person.id, people) != []){
		var kids = getPersonByParents(person, person.id, people);
		return getNames()
	}else if(person.parents[0]){
		return displayParents(person, people);
	}else if (displaySiblings(person, people) != "None"){
		return displaySiblings(person, people);
	}else{
		return "None";
	}
}
function sortByAge(){

}


function getAge(person, people) {
    var today = new Date();
    var dob = new Date(person);
    var age = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

function displayDescendants(person, people){

	var kids = displayKids(person, people);

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
