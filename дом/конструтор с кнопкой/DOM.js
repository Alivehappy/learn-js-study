let allItems = [];
const itemList = document.getElementById('items-list');
const chequeOutput = document.getElementById('cheque-output');

function updateItemsDisplay() {
	itemList.innerHTML = '';
	allItems.forEach(item => {
		const itemDiv = document.createElement('div'); //Для каждого товара создаём div-элемент

		itemDiv.className = 'item-display'; //Даём ему класс для стилей
		//Заполняем его HTML-содержимым
		itemDiv.innerHTML = `
		<span>${item.item}</span>
				<span>: ${item.quantity} шт.</span>
						<span>${item.price} руб.</span>
						<span>Итого: ${Math.round(item.quantity * item.price * 100) / 100}</span>
		`; //Math.round() - исправляет ошибки вычислений:
		itemList.appendChild(itemDiv); // Добавляем элемент в DOM
	});
	localStorage.setItem('cartItems', JSON.stringify(allItems));
}
let locked = false;
const lockOrderButton = document.querySelector('.btn3');
lockOrderButton.addEventListener('click', function toggleOrderLock() {
	locked = !locked;
});
const addButton = document.querySelector('.btn1');
addButton.addEventListener('click', function addItem() {
	if (locked) {
		alert('нельзя ничего сделать с корзинойб разблоктруйте заказ');
		return;
	}
	let itemName = document.querySelector('.name').value.trim(); //ищет первый элемент с классом нейм
	let quantity = document.querySelector('.quantity').value;
	let price = document.querySelector('.price').value;
	const ExistItem = allItems.find(i => i.item === itemName);
	if (!itemName) {
		alert('Введите название товара');
		document.querySelector('.name').focus();
		return;
	}
	if (!quantity || isNaN(quantity) || quantity < 1) {
		alert('некорректное количество');
		document.querySelector('.quantity').focus();
		return;
	}
	if (!price || isNaN(price) || price < 100) {
		alert('некорректная цена');
		document.querySelector('.price').focus();
		return;
	}
	quantity = Number(quantity);
	price = Number(price);

	if (!ExistItem) {
		allItems.push({ item: itemName, quantity: quantity, price: price });
	} else {
		ExistItem.quantity += quantity;
	}
	updateItemsDisplay();
});

document.addEventListener(
	'DOMContentLoaded',
	/*Почему localStorage используют внутри DOMContentLoaded?
Гарантия, что DOM готов*/
	function () {
		const savedCart = localStorage.getItem('cartItems');

		if (savedCart) {
			try {
				allItems = JSON.parse(savedCart);
			} catch (e) {
				console.error('Ошибка при загрузке корзины', e);
			}
		}
		updateItemsDisplay();
	}
);
const deleteButton = document.querySelector('.btn2');
deleteButton.addEventListener('click', function removeItem() {
	if (locked) {
		alert('нельзя ничего сделать с корзинойб разблоктруйте заказ');
		return;
	}
	const itemName = document.querySelector('.name').value.trim();
	let quantity = document.querySelector('.quantity').value;
	let price = Number(document.querySelector('.price').value);
	const ExistItem = allItems.find(i => i.item === itemName);
	if (!ExistItem) {
		alert(`No such ${itemName}`);
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
		alert('Can not remove more than already is in casket'); //остается строка
	}
	if (ExistItem.quantity === 0) {
		const findToRemoveIndex = allItems.findIndex(
			item => item.item === ExistItem.item
		); //ищем идекс того, кторый сейчас удаляем
		allItems.splice(findToRemoveIndex, 1);
	}
	updateItemsDisplay();
});
const getCheque = document.querySelector('.btn4');
getCheque.addEventListener('click', function showCheque() {
	let cheque = '';
	allItems.forEach(item => {
		cheque += `${item.item}  в количестве ${item.quantity} шт. по цене ${
			item.price
		}, итого: ${Math.round(item.quantity * item.price * 100) / 100} рублей\n`;
	});
	console.log(cheque);
	let totalSum = allItems.reduce((acc, elem) => {
		let everyItemTotal = Math.round(elem.quantity * elem.price * 100) / 100;
		return (acc += everyItemTotal);
	}, 0);
	chequeOutput.textContent = `${cheque} сумма за всю покупку: ${totalSum} `;
});
console.log(allItems);

/*document.querySelector('.quantity').value всегда возвращает строку:

Если поле ввода пустое → вернёт '' (пустая строка*/

/// написать локед

/// нпаси стили чтоб красиво было
/*DOMContentLoaded?
Это событие, которое срабатывает, когда:

Браузер полностью загрузил HTML-документ*/
//DOMContentLoaded - только для первичной загрузки при старте
