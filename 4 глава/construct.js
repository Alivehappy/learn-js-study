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
		this.items.push({ item: item, count: count, price: price });
	};
	this.removeItem = function (item, count, price) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].item == item && this.items[i].price == price) {
				if (this.items[i].count < count) {
					this.items[i].count-1
					this.items.splice(i, 1);
			} else {
				this.items.splice(
					this.items[i].item && this.items[i].count && this.items[i].price
				);
			}
		}
	};

	this.getCheck = function () {
		let total = 0;
		for (let item of this.items) {
			total += this.items.price * this.items.count;
		}
		return this.items, total;
	};
}
let order1 = new Order();
order1.addItem('пиво', 3, 100);
order1.removeItem('пиво', 2, 100);
console.log(order1.getCheck());
//this.items[i]:
//Это обращение к элементу массива this.items с индексом i. Например, если i = 0, то this.items[0] — это первый элемент в массиве
