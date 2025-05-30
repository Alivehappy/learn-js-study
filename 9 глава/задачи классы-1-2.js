//Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.
{
	class Clock {
		constructor({ template }) {
			//  Деструктуризация объекта
			this.template = template;
			this.timer = null; //timer - локальная переменная (исчезает после конструктора)
		}
		render() {
			let date = new Date();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			if (hours < 10) hours = '0' + hours;
			if (minutes < 10) minutes = '0' + minutes;
			if (seconds < 10) seconds = '0' + seconds;
			let output = this.template
				.replace('h', hours)
				.replace('m', minutes)
				.replace('s', seconds);
			console.log(output);
		}

		start() {
			this.render(); //нужно передавать функцию, а не её результат (убрать скобки)

			this.timer = setInterval(this.render.bind(this), 1000);
		}
		stop() {
			clearInterval(this.timer);
		}
	}
	let clock = new Clock({ template: 'h:m:s' });
	clock.start(); //01:20:00  и погнал
	clock.stop();
}
//нам нужен зис в конструкторе чтобы локальные перменные конструктора стали свойствами объекта и были доступны в методах
//let timer = setInterval((=>{this.render(),1000 })) Стрелочная функция запоминает this из класса

/*В коде ниже класс Rabbit наследует Animal.

К сожалению, объект класса Rabbit не создаётся. Что не так? Исправьте ошибку.

*/
//Ошибка возникает потому, что конструктор дочернего класса должен вызывать super().

{
	class Animal {
		constructor(name) {
			this.name = name;
		}
	}
	class Rabbit extends Animal {
		constructor(name) {
			super(name); //  // Вызов конструктора Animal
			this.name = name;
			this.created = Date.now();
		}
	}
	let rabbit = new Rabbit('Белый кролик');
	console.log(rabbit);
	console.log(rabbit.__proto__); //Animal
	console.log(Rabbit.prototype); //Animal
	console.log(rabbit.__proto__ === Rabbit.prototype);
}
//Создайте новый класс ExtendedClock, который будет наследоваться от Clock и добавьте параметр precision – количество миллисекунд между «тиками». Установите значение в 1000 (1 секунда) по умолчанию
{
	class Clock {
		constructor({ template }) {
			this.template = template;
			this.timer = null;
		}

		render() {
			let date = new Date();

			let hours = date.getHours();
			if (hours < 10) hours = '0' + hours;

			let mins = date.getMinutes();
			if (mins < 10) mins = '0' + mins;

			let secs = date.getSeconds();
			if (secs < 10) secs = '0' + secs;

			let output = this.template
				.replace('h', hours)
				.replace('m', mins)
				.replace('s', secs);

			console.log(output);
		}
		start() {
			this.render();
			this.timer = setInterval(() => {
				this.render();
			}, 1000);
		}
		stop() {
			clearInterval(this.timer);
		}
	}
	class ExtendedClock extends Clock {
		constructor(options) {
			super(options);
			let { precision = 1000 } = options;
			this.precision = precision;
		}
		start() {
			this.render();
			this.timer = setInterval(() => {
				this.render();
			}, this.precision);
		}
	}
	new ExtendedClock({
		template: 'h:m:s',
		precision: 2000, // Обновление каждые 2 секунды
	});
}
//у ребенка объект с 2 свойствами в аргументах и я вытаскиваю деструктуризацией нужное
/*Что на самом деле делает super()?
Вызывает конструктор родительского класса
super() запускает выполнение кода из constructor родителя.

Создаёт базовый объект
Родительский конструктор инициализирует часть объекта (свойства/методы), которые потом дополняет дочерний класс*/

//Добавьте метод reset(), который обнуляет секунды.

{
	class Timer {
		constructor() {
			this.seconds = 0;
		}
		start() {
			this.interval = setInterval(() => {
				this.seconds++;
				console.log(this.seconds);
			}, 1000);
		}
		stop() {
			clearInterval(this.interval);
			console.log(this.seconds);
		}
		reset() {
			this.seconds = 0;
		}
	}
	const timer = new Timer();
	timer.start();
	// Через 3 секунды:

	timer.stop();
	timer.reset();
}
//Добавьте метод toggleFormat() для переключения между 12/24-часовым форматом.

{
	function Clock() {
		this.time = new Date();
	}
	Clock.prototype.showTime = function () {
		console.log(this.time.toLocaleTimeString());
	};
	class DigitalClock extends Clock {
		constructor() {
			super();
			this.format24 = true;
		}
		toggleFormat() {
			this.format24 = !this.format24;
		}
		show() {
			const options = {
				hour12: !this.format24,
			};
			console.log(
				this.time.toLocaleCompare(undefined, { hour12: !this.format24 })
			);
		}
	}
	const clock = new DigitalClock();
	clock.showTime();
}
/*Если this.format24 = true (24-часовой формат), то hour12 = false

Если this.format24 = false (12-часовой формат), то hour12 = true

*/
