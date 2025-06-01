//Геттеры и сеттеры создаются на User.prototype

class User {
	constructor(name) {
		// вызывает сеттер
		this.name = name;
	}
	get name() {
		return this._name;
	}
	set name(value) {
		if (value.length < 4) {
			console.log('Имя слишком короткое.');
			return;
		}
		this.name = value;
	}
}
let user = new User('ivan');
alert(user.name); // Иван
//вопрос почему пишет, что взаимодействует геттер. если при инициализации класса конструтор сам создает поля
