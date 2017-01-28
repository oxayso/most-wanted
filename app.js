function InitMostWanted(people){
	DisplayWelcome();
	var searchType = PromptSearchType();
	switch(searchType){
		case "name":
			var person = SearchByName(people);
			if(person){
				ShowMainMenu(person, people);
			} else {
				AlertNoPerson();
				InitRestart(people);
			}
		break;
		case "attributes":
			AlertAttributes();
			var individual = GetAttributes(people);
			if(individual.length > 0){
				ShowMainMenu(individual, people);
			}else{
				AlertNoPerson();
				InitRestart(people);
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
	var person = GetPersonByName(prompt("You have chosen to search by name. \n\nPlease enter the person's first name."), prompt("\nPlease enter the person's last name."), people);
	return person;
}
function GetPersonByName(firstName, lastName, people){
	var person = people.filter(function(person){
		return (person.firstName.toUpperCase() === firstName.toUpperCase()) && (person.lastName.toUpperCase() === lastName.toUpperCase());
	});
	return person[0];
}
function AlertNoPerson(){
	alert("There were no people matching the given criteria.");
}
function AlertError(){
	alert("Sorry, there was an error processing your request.");
}
function InitRestart(people){
	do{
		var answer = PromptRestart();
	}while(!(answer == "yes" || answer == "no"));
	Restart(answer, people);
}
function PromptRestart(){
	var answer = prompt("Would you like to restart? (If so, type 'yes'. If not, type 'no')").toLowerCase();
	return answer;
}
function Restart(answer, people){
		if(answer.toLowerCase() == "yes")
			InitMostWanted(people);
		if(answer.toLowerCase() == "no")
			return answer;
}
function AlertAttributes(){
	alert("You have chosen to search a person by attributes. \n\n If at any time you do not know the answer, please type 'next'.");
}
function GetAttributes(people){
	var gender = SearchGender();
	var age = SearchAge();
	age = parseInt(age);
	var height = SearchHeight();
	height = parseInt(height);
	var weight = SearchWeight();
	weight = parseInt(weight);
	var eyeColor = SearchEyeColor();
	var occupation = SearchOccupation();

	var attributes = SearchByAttributes(gender, age, height, weight, eyeColor, occupation, people);
	return attributes;
}
function SearchByAttributes(gender, age, height, weight, eyeColor, occupation, people){
	var personList = people.filter(function(person){
		if(gender === person.gender){
			return true;
		}if((age + 3 || age - 3) === GetAge(person.dob, people)){
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
function SearchGender(){
	do{
		var gender = prompt("What is their gender? \n\nPlease enter the word 'male' or 'female'");
	}while(!((gender.toLowerCase().trim() == "male")||(gender.toLowerCase().trim() == "female")||(gender.trim() == "next")));
	return gender;
}
function SearchAge(){
	do{
		var age = prompt("Approximately how old are they? \n\nPlease enter a number between 20 and 90");
	}while(!((20 <= age && age <= 90) || (age.toLowerCase().trim() == "next")));
	return age;
}
function SearchHeight(){
	do{
		var height = prompt("Approximately how tall is this person? \n\nPlease enter a number for INCHES between 50 and 80");
	}while(!((50 <= height && height <= 80) || height.toLowerCase().trim() == "next"));
	return height;
}
function SearchWeight(){
	do{
		var weight = prompt("About how much does this person weigh? \n\nPlease enter a number for the approximate amount of pounds they weigh between 100 and 260)");
	}while(!((100 <= weight && weight <= 260) || weight.toLowerCase().trim() == "next"));
	return weight;
}
function SearchEyeColor(){
	do{
		var eyeColor = prompt("What is their eye color? \n\nOptions: Brown, Blue, Hazel, Green or Black");
	}while(!(eyeColor.toLowerCase() == "brown" || eyeColor.toLowerCase() == "blue" ||
	eyeColor.toLowerCase() == "hazel" || eyeColor.toLowerCase() == "green" ||
	eyeColor.toLowerCase() == "black" || eyeColor.toLowerCase() == "next"));
	return eyeColor;
}
function SearchOccupation(){
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
			DisplayPersonInfo(person, people);
		break;
		case "family":
			DisplayFamily(person, people);
		break;
		case "next of kin":
			DisplayNextOfKin(person, people);
		break;
		case "descendants":
			DisplayDescendants(person, people);
		break;
		case "restart":
			InitMostWanted(people);
		break;
		case "quit":
		break;
		default:
			alert("There was an error processing your request.");
			return ShowMainMenu(person, people);
	}
}

function DisplayPersonInfo(person, people){
	alert("Name: " +person.firstName + " " +person.lastName + "\nGender: " +person.gender+
	"\nTheir occupation is: "+ person.occupation + "\nBirthday: " +person.dob +
	"\nHeight: " +person.height + " inches" + "\nWeight: " +person.weight + " lbs." +
	"\nEye Color: " +person.eyeColor);
	ShowMainMenu(person, people);

}

function DisplayFamily(person, people){

	var rents = GetPersonById(person.parents, people);
	var parents = GetNames(rents);

	var sigO = GetPersonById([person.currentSpouse], people);
	var spouse = GetNames(sigO);

	var childs = GetPersonByParents(person, person.id, people);
	var kids = GetNames(childs);

	var sibs = GetPersonByParents(person, person.parents[0], people);
	var siblings = GetNames(sibs);

	alert("-The " +person.lastName+ " Family- \nParent(s): " + parents + "\nSpouse: " + spouse + "\nSiblings: " +siblings+ "\nKid(s): " + kids);
	ShowMainMenu(person, people);
}

function GetNames(mortals){
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

function GetPersonById(personId, people){
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

function GetPersonByParents(oldPerson, parentId, people){
	var kids = people.filter(function(person){
		for(var i = 0; i <person.parents.length; i++){
			if((parentId == person.parents[i]) && oldPerson != person){
				return true;
			}
		}
		return false;
	});
	return kids;
}

function DisplayNextOfKin(person, people){

	var nextOfKin = GetNextOfKin(person,people);

	alert("Next of Kin: " +nextOfKin);
	ShowMainMenu(person, people);
}

function GetNextOfKin(person, people){
	if(person.currentSpouse){
		return GetPersonById([person.currentSpouse], people);
	}else if(GetPersonByParents(person, person.id, people) != []){
		var kids = GetPersonByParents(person, person.id, people);
		return GetNames()
	}else if(person.parents[0]){
		return DisplayParents(person, people);
	}else if (DisplaySiblings(person, people) != "None"){
		return DisplaySiblings(person, people);
	}else{
		return "None";
	}
}

function SortByAge(list){
	var kids = list.filter(function(person){
		var personAge = GetAge(person);

	});

	return kids;
}


function GetAge(person) {
    var today = new Date();
    var dob = new Date(person);
    var age = today.getFullYear() - dob.getFullYear();
    var month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

function DisplayDescendants(person, people){

	//var kids = DisplayKids(person, people);

	alert("-Descendants- \n\nKids: " + /*kids*/ + "\nGrandchildren: " +/* grandchildren +*/ " \nGreat-Grandchildren: " );
	ShowMainMenu(person, people);
}
