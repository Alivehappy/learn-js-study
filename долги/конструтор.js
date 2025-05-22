/*Конструктор заказа. Основы. learnjs 1.1..1.4]
1. написать функцию конструктор для заказа в магазине.
Новый инстанс - новый заказ
у него будут методы
addItem(item, count) - добавить итем в чек (+ имя +цена)
removeItem(item, count) - убрать из чека count итемов (если не указано сколько - убрать все). Нельзя убрать больше чем было в чеке
getCheck() - получить информацию сколько каких итемов в чеке, общую цену, опционаольно цену за каждую позицию (за 3 пивка - 300р). Формат произвольный, чтобы был читабельный
lockOrder() - после вызова метода функции addItem/removeItem не должны делать что-либо. Можно как-то сообщать об ошибке, можно просто молча.
unlockOrder() - убрать блокировку заказа - снова можно добавлять итемы

Формат item - объект с 1. названием итема 2. ценой за штуку. 2 итема с одинаковым именем считаем одной позицией в чеке

3. использовать отладку (debugger) при решении в хроме. Если получится без отладки - самому допустить ошибку и найти ее при отладке через интерфейс девтулзов 
maksimo (Макс) — 16.04.2022 12:19
--------------------------------------------------------

*/
function Constructor() {
	this.cheque = {}; //для итема и количества
	this.cheque1 = {}; //для итема и цены
	this.isLocked = false;
	this.addItem = function (item, count, price) {
		if (this.isLocked) {
			console.error('Заказ заблокирован');
			return false;
		}

		if (!this.cheque[item]) {
			this.cheque[item] = 0;
			this.cheque[item] += count;
		} else {
			this.cheque[item] += count;
		}
		if (!this.cheque1[item]) {
			this.cheque1[item] = price;
			return;
		}
	};
	this.removeItem = function (item, count) {
		if (this.isLocked) {
			console.error('Заказ заблокирован');
			return false;
		}

		if (this.cheque[item] && count === undefined) {
			delete this.cheque[item];
			return;
		}
		if (!this.cheque[item]) {
			console.log('Не добавляли товар в корзину');
			return;
		} else if (this.cheque[item] && this.cheque[item] >= count) {
			this.cheque[item] -= count;
			if (this.cheque[item] === 0) {
				delete this.cheque[item];
				return;
			}
		} else if (this.cheque[item] && this.cheque[item] < count) {
			//хочет удалить,больше чем положил //Нельзя убрать больше чем было в чеке
			console.log('Нельзя убрать больше чем было в чеке');
			return;
		}
	};
	this.getCheck = function () {
		this.fullCheque = new Map();
		for (let itemName in this.cheque) {
			if (this.cheque1.hasOwnProperty(itemName)) {
				this.fullCheque.set(
					itemName,
					` количество: ${this.cheque[itemName]}, полная цена: ${
						this.cheque[itemName] * this.cheque1[itemName]
					} руб.`
				);
			}
		}
		return [...this.fullCheque];
	};
	this.LockOrder = function () {
		this.isLocked = true;
	};
	this.unlockOrder = function () {
		this.isLocked = false;
	};
}
const buy = new Constructor();
buy.addItem('пиво', 3, 100);
buy.removeItem('пиво', 2, 100);
buy.getCheck();
