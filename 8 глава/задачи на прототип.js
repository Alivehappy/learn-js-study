function Animal(name) {
	this.name = name;
}
Animal.prototype.move = function () {
	return 'Moving';
};
function Rabbit(name) {
	Animal.call(this, name); // Вызываем конструктор Animal в контексте Rabbit
}
Rabbit.prototype = Object.create(Animal.prototype); //Создаёт новый пустой объект, у которого __proto__ ссылается на Animal.prototype.
Rabbit.prototype.jump = function () {
	return 'Jumping';
};
let bunny = new Rabbit('Bugs');
console.log(bunny.jump()); //Jumping
// Что выведет?
//Конструктор Animal вызывается для нового объекта Rabbit, чтобы присвоить ему свойство name.

/*Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit; // Явно восстанавливаем конструктор


Object.setPrototypeOf(Rabbit.prototype, Animal.prototype);


Rabbit.prototype.__proto__ = Animal.prototype;

*/
//отсортировать по имени
{
	function User(name) {
		this.name = name;
	}

	let users = [new User('John'), new User('Alice')];
	console.log(users);
	let sorted = users.sort((a, b) => a.name.localeCompare(b.name));
	console.log(sorted);
}
//const sorted = [... users].sort((a,b) => a.name > b.name ? 1: -1)
{
	function Shape() {}
	Shape.prototype.draw = function () {
		return 'Drawing shape';
	};

	function Circle() {}
	Circle.prototype = Object.create(Shape.prototype);
	Circle.prototype.draw = function () {
		return 'Drawing circle';
	}; // Переопределение

	console.log(Circle.prototype);
}

{
	function Device(command) {
		this.enable = function () {
			console.log(command);
		};
		this.disable = function () {
			console.log('Dont do: ' + command);
		};
	}
	function CoffeeMachine(command) {
		Device.call(this, command); //вызываю в контексте нового объекта и сразу добвялю свойства дефайса
		this.brew = function () {
			return 'we brewed';
		};
	}
}

{
	//или вот так
	function Device(command) {
		this.command = command;
		this.enable = function () {
			console.log(this.command);
		};
		this.disable = function () {
			console.log('Dont do: ' + this.command);
		};
	}
	function CoffeeMachine(command) {
		this.brew = function () {
			return 'we brewed';
		};
	}
	CoffeeMachine.prototype.__proto__ = Device.prototype;
}

{
	function Device(command) {
		this.command = command;
	}
	// Методы создаются ОДИН РАЗ в прототипе

	Device.prototype.enable = function () {
		console.log(this.command);
	};
	Device.prototype.disable = function () {
		console.log('Dont: ' + this.command);
	};
	function CoffeeMachine(command) {
		Device.call(this, command); // Наследует только свойства
	}
	CoffeeMachine.prototype = Object.create(Device.prototype);
	CoffeeMachine.prototype.brew = function () {}; // Метод в прототипе
}
/*Создайте объект temperature с двумя свойствами:

celsius - температура в градусах Цельсия

fahrenheit - температура в Фаренгейтах

При изменении одного свойства, второе должно автоматически пересчитываться:

*/
{
	const temperature = {
		_celsius: 0,
		_fahrenheit: 0,
		get celsius() {
			return this._celsius;
		},
		set celsius(value) {
			this._celsius = value;
			this._fahrenheit = this._celsius * 1.8 + 32;
		},
		get fahrenheit() {
			return this._fahrenheit;
		},
		set fahrenheit(value) {
			this._fahrenheit = value;
			this._celsius = (this._fahrenheit - 32) / 1.8;
		},
	};
	temperature.celsius = 25;
	console.log(temperature.fahrenheit); // 77

	temperature.fahrenheit = 68;
	console.log(temperature.celsius); // 20
}
/*Создайте функцию Person с "защищённым" полем _age, которое:

Нельзя удалить

Можно читать, но нельзя изменить напрямую

Можно изменить только через метод birthday()

*/
{
	function Person(age) {
		this._age = age;
		this.birthday = function () {
			this._age++;
		};

		Object.defineProperty(this, 'age', {
			//само свойство пишу акцессором и без сеттера, чтоб не изменяли
			get: function () {
				return this._age;
			},
			enumerable: true,
			configurable: false,
		});
	}
	const person = new Person(30);
	console.log(person.age); // 30
	person.age = 40; // не работает!
	person.birthday();
	console.log(person.age); // 31
}
//Свойство с геттером, но без сеттера — автоматически становится read-only (нельзя записать новое значение)
//Для свойств-аксессоров (get/set) writable игнорируется.
function Shape(width, height) {}
Shape.prototype.getArea = function () {
	return this.width * this.height;
};
function Rectangle(width, height) {
	this.width = width; // Свойство экземпляра
	this.height = height; // Свойство экземпляра
}
Object.setPrototypeOf(Rectangle.prototype, Shape.prototype); //Не заменяет, а модифицирует существующий прототип Rectangle
function Square(width, height) {
	this.width = width;
	this.height = this.width;
}
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
//Методы добавляются в прототип.
const square = new Square(5);
console.log(square.getArea()); // 25
