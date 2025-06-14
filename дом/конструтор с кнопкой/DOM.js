const allItems = [];
const addButton = document.querySelector('.btn1');
addButton.addEventListener('click', function addItem() {
	const itemName = document.querySelector('.name').value.trim(); //ищет первый элемент с классом нейм
	const quantity = Number(document.querySelector('.quantity').value);
	const price = Number(document.querySelector('.price').value);
	const ExistItem = allItems.find(i => i.item === itemName);
	if (!ExistItem) {
		allItems.push({ item: itemName, quantity: quantity, price: price });
	} else {
		ExistItem.quantity += quantity;
	}
});

const deleteButton = document.querySelector('.btn2');
deleteButton.addEventListener('click', function removeItem() {
	const itemName = document.querySelector('.name').value.trim();
	let quantity = document.querySelector('.quantity').value;
	const price = Number(document.querySelector('.price').value);
	const ExistItem = allItems.find(i => i.item === itemName);
	if (!ExistItem) {
		console.log(`No such ${itemName}`);
		return;
	}
	if (quantity.trim() === '') {
		const findToRemoveIndex = allItems.findIndex(
			item => item.item === ExistItem.item
		); //ищем идекс того, кторый сейчас удаляем
		allItems.splice(findToRemoveIndex, 1);
		return;
	}
	quantity = Number(quantity);
	if (quantity <= ExistItem.quantity) {
		ExistItem.quantity -= quantity;
	} else if (quantity > ExistItem.quantity) {
		console.log('Can not remove more than already is in casket'); //остается строка
	}
	if (ExistItem.quantity === 0) {
		const findToRemoveIndex = allItems.findIndex(
			item => item.item === ExistItem.item
		); //ищем идекс того, кторый сейчас удаляем
		allItems.splice(findToRemoveIndex, 1);
	}
});
const getCheque = document.querySelector('.btn4');
getCheque.addEventListener('click', function showCheque() {
	let cheque = '';
	allItems.forEach(item => {
		cheque += `${item.item}  в количестве ${item.quantity} шт. по цене ${
			item.price
		}, итого: ${item.quantity * item.price} рублей\n`;
	});
	console.log(cheque);
});
console.log(allItems);

/*document.querySelector('.quantity').value всегда возвращает строку:

Если поле ввода пустое → вернёт '' (пустая строка*/

/// написать локед
/// вывести аддайтемс массив
/// вывести при гетчеке строку на тстранице
/// нпаси стили чтоб красиво было
/// проверка на отрицательне число неваоидон число
/// проверка для цен с копецками корректная для умножения
