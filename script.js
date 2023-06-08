const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	
	const searchStr = str.toLowerCase()

	// I would like there to be some order to how the results appear, so I decided on the following:

	// Get results with matches at the beginning of the string first
	const first = fruit.filter(val => val.toLowerCase().startsWith(str))

	// Next get results with matches at the beginning of a word within the string (if not already in first)
	const second = fruit.filter(val => (val.toLowerCase().includes(" " + str.toLowerCase()) && !first.includes(val)));

	// Finally get results with matches anywhere within the string (if not already in first or second)
	const third = fruit.filter(val => (val.toLowerCase().includes(str.toLowerCase()) && !first.includes(val) && !second.includes(val)));

	if (str) {
		return [...first, ...second, ...third];
	}
	return []
}

function searchHandler(e) {
	showSuggestions(search(e.target.value));
}

function showSuggestions(results) {
	const resultList = document.querySelector("ul");

	// Show maximum of 5 results to limit clutter
	const showResults = 5;
	
	// Delete all results shown previously, if any
	while (resultList.firstChild) {
		resultList.removeChild(resultList.firstChild);
	}

	for (let i = 0; i < showResults; i++) {
		if (results[i]) {
			const newLi = document.createElement("li");
			newLi.innerText = results[i];
			resultList.appendChild(newLi);
		}
	}
}

function useSuggestion(e) {

	// Delete shown suggestions
	showSuggestions([])

	document.querySelector("input").value = e.target.innerText
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);