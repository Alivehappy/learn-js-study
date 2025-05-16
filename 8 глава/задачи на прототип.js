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
