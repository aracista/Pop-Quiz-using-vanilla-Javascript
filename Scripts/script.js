var questions = new Array();
questions[0] = "questions 1";
questions[1] = "questions 2";
questions[2] = "questions 3";
questions[3] = "questions 4";
questions[4] = "questions 5";
questions[5] = "questions 6";
questions[6] = "questions 7"; 

function menu() {
	var kandidat = localStorage.getItem("candidate");
	kandidat = kandidat ? kandidat.split(',') : [];
	var oldListAnswer  = confirm("Do you wish to continue the old list?");
	if (oldListAnswer == true) {
		newCandidateAnswer();
	} else{
		localStorage.clear();
		newCandidateAnswer();
	}
	listPending();
	passedCandidate();
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
	 countdown(waktu);
}

function countdown(waktu){
	var interval = waktu;

	var inter = setInterval(function(){
		var kandidat = localStorage.getItem("candidate");
		kandidat = kandidat ? kandidat.split(',') : [];
		var passed = localStorage.getItem("passed");
		passed = passed ? passed.split(',') : [];

		if(interval == 0){
			var beginButton = document.querySelector("#begin-button");
			var correctButton = document.querySelector("#correct-button");
			var wrongButton = document.querySelector("#wrong-button");
			var question = document.getElementById("question");

			document.querySelector(".sentence").style.display = "flex";
			beginButton.style.display = "inline";
			document.querySelector("#correct-button").style.display = "none";
			document.querySelector("#wrong-button").style.display = "none";
			document.querySelector("#question").style.display = "none";


			var randomKandidat = get_random(kandidat);
			
			var candidate = document.getElementById("candidate");
			var spanCandidate = document.createElement("span");
			spanCandidate.textContent = randomKandidat;
			candidate.appendChild(spanCandidate);
			document.querySelector(".modal-wrapper").style.display = "flex";

			if (kandidat.length > 0) {
				beginButton.addEventListener("click", function(event){
				deleteChild("#candidate");
				var questionTextNode = get_question(questions);
				var question = document.getElementById("question");
				question.textContent = questionTextNode;
				document.querySelector(".sentence").style.display = "none";
				beginButton.style.display = "none";
			    document.querySelector("#question").style.display = "flex";
			     correctButton.style.display = "inline";
			     wrongButton.style.display = "inline";
			  });

				correctButton.addEventListener("click", function(event){
	   				document.querySelector(".modal-wrapper").style.display = "none";
	   				passed.push(randomKandidat);
					localStorage.setItem("passed", passed.toString());
					var updateArray = arrayRemove(kandidat,randomKandidat);
					console.log(updateArray);
					localStorage.setItem("candidate", updateArray.toString());
					interval = waktu;
					listPending();
					passedCandidate();
				});



				wrongButton.addEventListener("click", function(event){
	   				document.querySelector(".modal-wrapper").style.display = "none";
	   				passed.push(randomKandidat);
					localStorage.setItem("passed", passed.toString());
					var updateArray = arrayRemove(kandidat,randomKandidat);
					console.log(updateArray);
					localStorage.setItem("candidate", updateArray.toString());
					interval = waktu;
					listPending();
					passedCandidate();
				});
			}else{
				clearInterval(inter);
				alert("game over");
				document.querySelector(".modal-wrapper").style.display = "none";
				document.getElementById("seconds-left").innerHTML = 0;
			}
			

		}else {
			if (interval >= 0) {
				document.getElementById("seconds-left").innerHTML = interval;
			}
			else {
				document.getElementById("seconds-left").innerHTML = 0;
			}
			

		}
		interval --;
	},1000);
}


function listPending(){
	var kandidat = localStorage.getItem("candidate");
	kandidat = kandidat ? kandidat.split(',') : [];
	deleteChild("#pending");
	for(index = 0; index < kandidat.length; index++){
	  console.log(kandidat[index]);
	  	var newParagraph = document.createElement("span");
		var newTextNode = document.createTextNode(kandidat[index]);
		newParagraph.appendChild(newTextNode);
		var pendingNode = document.querySelector("#pending");
		pendingNode.appendChild(newParagraph);
	}
}

function passedCandidate(){
	var passed = localStorage.getItem("passed");
	passed = passed ? passed.split(',') : [];
	deleteChild("#passed");
	for(index = 0; index < passed.length; index++){
	  console.log(passed[index]);
	  	var newParagraph = document.createElement("span");
		var newTextNode = document.createTextNode(passed[index]);
		newParagraph.appendChild(newTextNode);
		var passedNode = document.querySelector("#passed");
		passedNode.appendChild(newParagraph);
	}
}

function get_random(kandidat) {
  return kandidat[Math.floor((Math.random()*kandidat.length))];
}

function get_question(questions) {
  return questions[Math.floor((Math.random()*questions.length))];
} 



  function arrayRemove(array, value){
  	return array.filter(function(element){
  		return element != value;
  	});
  }

  function deleteChild(selector){
  	var parent = document.querySelector(selector);
  	var child = parent.lastElementChild;
  	while(child){
  		parent.removeChild(child);
  		child = parent.lastElementChild;
  	}
  }


menu();













// console.log("Do you wish to continue answer: ", oldListAnswer);