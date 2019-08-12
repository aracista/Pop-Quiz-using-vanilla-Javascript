var questions = new Array();
questions[0] = "questions 1";
questions[1] = "questions 2";
questions[2] = "questions 3";
questions[3] = "questions 4";
questions[4] = "questions 5";
questions[5] = "questions 6";
questions[6] = "questions 7"; 

function oldList() {
	var oldListAnswer  = confirm("Do you wish to continue the old list?");
	if (oldListAnswer == true) {
		newCandidateAnswer();
	} else{
		localStorage.removeItem("candidate");
		newCandidateAnswer();
	}
	listPending();
	setTimer();

}

function newCandidateAnswer() {
	var newCandidateAnswer;
	do{
		var newCandidateAnswer = confirm("Do you wish to add new pending candidate?");
		if (newCandidateAnswer == true) {
			var name = prompt("Please enter candidate name"," ");
			if (name != null) {
				var kandidat = localStorage.getItem("candidate");
				kandidat = kandidat ? kandidat.split(',') : [];
				kandidat.push(name);
				localStorage.setItem("candidate", kandidat.toString());
			}
		}
	}while(newCandidateAnswer === true)
}

function setTimer(){
var newCandidateAnswer = prompt("How many seconds do you wish to set your timer ?");
var waktu = newCandidateAnswer;
	setInterval(function() {

		var kandidat = localStorage.getItem("candidate");
		kandidat = kandidat ? kandidat.split(',') : [];
		var passed = localStorage.getItem("passed");
		passed = passed ? passed.split(',') : [];
		if(waktu == 0) {
			var randomKandidat = get_random(kandidat);
			var newTextNode = document.createTextNode(randomKandidat);
			var candidate = document.getElementById("candidate");
			candidate.appendChild(newTextNode);
			document.querySelector(".modal-wrapper").style.display = "flex";

			correctButton.addEventListener("click", function(event){
   				document.querySelector(".modal-wrapper").style.display = "none";
   				passed.push(randomKandidat);
				localStorage.setItem("passed", passed.toString());
				var updateArray = arrayRemove(kandidat,randomKandidat);
				console.log(updateArray);
				localStorage.setItem("candidate", updateArray.toString());

  			});

		}
		if (waktu > -1) {
			document.getElementById("seconds-left").innerHTML = waktu;
		}

		if (waktu > -1) {
			waktu--;
		}
		
	}, 1000);
}

function listPending(){
	var kandidat = localStorage.getItem("candidate");
	kandidat = kandidat ? kandidat.split(',') : [];

	for(index = 0; index < kandidat.length; index++){
	  console.log(kandidat[index]);
	  	var newParagraph = document.createElement("span");
		var newTextNode = document.createTextNode(kandidat[index]);
		newParagraph.appendChild(newTextNode);
		var leftContainerNode = document.getElementsByClassName("left-container");
		leftContainerNode[0].appendChild(newParagraph);
	}
}

get_random = function (kandidat) {
  return kandidat[Math.floor((Math.random()*kandidat.length))];
}

get_question = function (questions) {
  return questions[Math.floor((Math.random()*questions.length))];
} 

var beginButton = document.querySelector("#begin-button");
var correctButton = document.querySelector("#correct-button");
var wrongButton = document.querySelector("#wrong-button");
beginButton.addEventListener("click", function(event){
	var questionTextNode = document.createTextNode(get_question(questions));
	var question = document.getElementById("question");
	question.appendChild(questionTextNode);
	document.querySelector(".sentence").style.display = "none";
	beginButton.style.display = "none";
    document.querySelector("#question").style.display = "flex";
     correctButton.style.display = "inline";
     wrongButton.style.display = "inline";
  });

  function arrayRemove(array, value){
  	return array.filter(function(element){
  		return element != value;
  	});
  }


oldList()











// console.log("Do you wish to continue answer: ", oldListAnswer);