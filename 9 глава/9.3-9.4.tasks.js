//Добавьте событие onFinish(callback), которое срабатывает при завершении.

{
	class CountDown {
		constructor(duration) {
			this.duration = duration;
			this.remainig = duration;
			this.allCallbacks = [];
			this.toggle = false;
		}
		start() {
			if (this.toggle) return;

			this.toggle = true;
			this.interval = setInterval(() => {
				this.remainig--;
				console.log(this.remainig);
				if (this.remainig <= 0) {
					this.stop();
					this.trigger();
				}
			}, 1000);
		}
		stop() {
			clearInterval(this.interval);
			this.toggle = false;
		}
		onFinish(callback) {
			if (typeof callback === 'function') {
				this.allCallbacks.push(callback);
			}
			return this; //для лесенки вызовов
		}
		trigger() {
			this.allCallbacks.forEach(callBack => callBack());
		}
	}
	const timer = new CountDown(5);
	timer.start();
	timer.onFinish(() => {
		console.log('Таймер завершён!');
	});
}
//Нужно отслеживать, сколько экземпляров класса создано, чтобы ограничить максимальное количество (например, для лицензирования).
{
	class User {
		static #count = 0;
		static max_instances = 3;
		constructor(name) {
			if (User.#count > User.max_instances) {
				throw new Error('too many instances');
			}
			this.name = name;
			User.#count++; // Увеличиваем при создании экземпляра
		}
		static getCount() {
			return User.#count;
		}
	}
}
//Статичность — принадлежат классу, а не экземплярам

/*Создайте класс Calculator, который кэширует результаты вычислений (например, факториала). При повторном запросе с теми же аргументами должен возвращаться результат из кэша.

Дано:

Приватное статическое поле #cache для хранения результатов

Статический метод factorial(n) для вычисления факториала

Автоматическое сохранение результатов в кэш

*/
{
	class Calculator {
		static #cache = {}; //Принадлежит не каждому экземпляру класса а самосу классу

		constructor(number) {
			this.number = number;
		}
		static factorial(number) {
			if (Calculator.#cache[number] !== undefined) {
				console.log(`From cashe: ${Calculator.#cache[number]}`);
			} else {
				let result = 1;
				for (let i = 1; i <= number; i++) {
					result *= i;
				}
				Calculator.#cache[number] = result;
				console.log(`From factorial: ${result}`);
				return result;
			}
		}
	}
	console.log(Calculator.factorial(5)); //From factorial: 120
	console.log(Calculator.factorial(5)); //From cashe: 120
}

/*Создайте класс Animal с методом makeSound() (выводит "Some generic sound").
От него наследуйте   Cat, переопределив makeSound() (  и мяу  ).
Добавьте метод describe(), который выводит "I am a <тип животного>".
*/
{
	class Animal {
		constructor(sound) {
			this.sound = sound;
		}
		makeSound() {
			console.log(`Some generic sound: ${this.sound}`);
		}
	}
	class Cat extends Animal {
		constructor(sound, name) {
			super();
			this.sound = sound;
			this.name = name;
		}
		SayMyau() {
			super.makeSound();
		}
		describe() {
			console.log(`i am ${this.name}`);
		}
	}
	const blacky = new Cat('Miau', 'cat');
	blacky.SayMyau();
	blacky.describe();
}
//Реализуйте систему, где класс Robot может наследовать функциональность от нескольких миксинов:

{
	let Walker = {
		Walk() {
			console.log('i walk');
		},
	};
	let Talker = {
		talk() {
			console.log('i talk');
		},
	};

	class Robot {
		constructor(name) {
			this.name = name;
		}
		act() {
			for (let key in this) {
				if (typeof this[key] === 'function' && key !== 'act') {
					this[key]();
				}
			}
		}
	}
	Object.assign(Robot.prototype, Walker, Talker);
	let rob = new Robot();
	rob.act();
}
//Неперечислимости методов классов
