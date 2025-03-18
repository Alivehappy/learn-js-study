/*1. написать функцию конструктор для заказа в магазине.
Новый инстанс - новый заказ
у него будут методы
addItem(item, count) - добавить итем в чек (+ имя +цена)
removeItem(item, count) - убрать из чека count итемов (если не указано сколько - убрать все). Нельзя убрать больше чем было в чеке
getCheck() - получить информацию сколько каких итемов в чеке, общую цену, опционаольно цену за каждую позицию (за 3 пивка - 300р). Формат произвольный, чтобы был читабельный
lockOrder() - после вызова метода функции addItem/removeItem не должны делать что-либо. Можно как-то сообщать об ошибке, можно просто молча.
unlockOrder() - убрать блокировку заказа - снова можно добавлять итемы

Формат item - объект с 1. названием итема 2. ценой за штуку. 2 итема с одинаковым именем считаем одной позицией в чеке

3. использовать отладку (debugger) при решении в хроме. Если получится без отладки - самому допустить ошибку и найти ее при отладке через интерфейс девтулзов 
*/
function Order() {
	this.items = [];

	this.addItem = function (item, count, price) {
		let existItem = this.items.find(i => i.item === item); //возвращаеи объект или undefined  из массива объектов
		if (!existItem) {
			this.items.push({ item: item, count: count, price: price });
		} else {
			existItem.count += count;
		}
	};
	this.removeItem = function (item, count, price) {
		let existItem = this.items.find(i => i.item === item);
		if (!existItem) {
			console.log(`нет продукта ${item}`);
		} else if (count === undefined) {
			this.items = this.items.filter(i => i.item !== item);
		} else if (existItem.count > count) {
			existItem.count -= count;
			console.log(`осталось ${existItem.count} товаров  ${item}`);
		} else if (existItem.count < count) {
			console.log(
				`Нельзя удалить${count} товаров ${item}.В заказе только ${existItem.count}`
			);
		}
		if (existItem.count === 0) {
			this.items = this.items.filter(i => i.item !== item);
		}
	};
	//getCheck() - получить информацию сколько каких итемов в чеке, общую цену, опционаольно цену за каждую позицию (за 3 пивка - 300р). Формат произвольный, чтобы был читабельный
	this.getCheck = function () {
		let totalPrice = 0;

		this.items.forEach(elem => {
			let itemTotal = elem.count * elem.price;
			totalPrice += itemTotal;
			console.log(` За ${elem.count} ${elem.item} : ${totalPrice}`);
		});
	};
}

let order = new Order();
order.addItem('Пиво', 3, 100);
console.log(order.getCheck());
//Для удаления всех товаров с определённым именем проще использовать filter, чем искать индексы и удалять их через splice.
