const allItems = [];
const addButton = document.querySelector('.btn1');
addButton.addEventListener('click', function addItem() {
	const item = document.querySelector('.name').value;
	const quantity = document.querySelector('.quantity').value;
	if (!allItems.includes(item)) {
		allItems.push({ item: item, quantity: quantity });
	}
});
console.log(allItems);
