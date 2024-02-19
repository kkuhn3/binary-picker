function scaleDiv(div) {
	div.style.height = "";
	div.style.height = div.scrollHeight + 3 + "px";
}

function getAvailableList() {
	let list = options.value.split("\n");
	return list.filter((a) => a != "");
}

function letsGo() {
	start.disabled = !(getAvailableList().length > 1);
}

let available = [];
let total = 0;
let eleminated = {};
let ordered = [];
function onStart() {
	available = getAvailableList();
	total = available.length;
	eleminated = {};
	ordered = [];
	optionA.innerHTML = getAndRemove();
	optionB.innerHTML = getAndRemove();
	first.style.display = "none";
	second.style.display = "block";
	view.innerHTML = "View " + 0 + " Results";
	view.disabled = true;
}

function getAndRemove() {
	const randIndex = Math.floor(Math.random() * available.length);
	return available.splice(randIndex, 1)[0];
}

function nextRoundSelected(selected, avoided) {
	available.push(selected);
	if (eleminated[selected]) {
		eleminated[selected].push(avoided);
	}
	else {
		eleminated[selected] = [avoided];
	}
	nextRound();
}
function nextRoundSelectedA() {
	nextRoundSelected(optionA.innerHTML, optionB.innerHTML);
}
function nextRoundSelectedB() {
	nextRoundSelected(optionB.innerHTML, optionA.innerHTML);
}

function nextRoundMerge() {
	const newOption = optionA.innerHTML + " / " + optionB.innerHTML;
	available.push(newOption);
	eleminated[newOption] = [];
	if (eleminated[optionA.innerHTML]) {
		eleminated[newOption].push(...eleminated[optionA.innerHTML]);
	}
	if (eleminated[optionB.innerHTML]) {
		eleminated[newOption].push(...eleminated[optionB.innerHTML]);
	}
	total = total - 1;
	nextRound();
}

function nextRoundDefer() {
	available.push(optionA.innerHTML);
	available.push(optionB.innerHTML);
	nextRound();
}

function nextRound() {
	if (available.length == 1) {
		let winner = available[0];
		ordered.push(winner);
		view.innerHTML = "View " + ordered.length + " Results";
		view.disabled = false;
		if (!eleminated[winner] || eleminated[winner].length < 1) {
			available = [];
			viewResults();
			return;
		}
		available = eleminated[winner];
		nextRound();
		return;
	}
	optionA.innerHTML = getAndRemove();
	optionB.innerHTML = getAndRemove();
}

function viewResults() {
	results.value = "";
	for (let option of ordered) {
		results.value = results.value + option + "\n";
	}
	const optionsLeft = total - ordered.length;
	if (optionsLeft > 0) {
		pre3.innerHTML = "Here's your choices thus far.";
		post3.style.display = "block";
		redo.innerHTML = "Continue Selecting " + optionsLeft + " Options";
		postpost3.style.display = "none";
	}
	else {
		pre3.innerHTML = "Here's your choices!";
		post3.style.display = "none";
		postpost3.style.display = "block";
	}
	second.style.display = "none";
	third.style.display = "block";
	scaleDiv(results);
}

function backToSelecting() {
	third.style.display = "none";
	second.style.display = "block";
	nextRound();
}

function previewResults() {
	available.push(optionA.innerHTML);
	available.push(optionB.innerHTML);
	viewResults();
}

function onRestart() {
	third.style.display = "none";
	first.style.display = "block";
}