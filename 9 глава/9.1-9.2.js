/*class MyClass { // методы класса

  constructor() { }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
  Затем используйте вызов new MyClass() для создания нового объекта со всеми перечисленными методами.

При этом автоматически вызывается метод constructor(), в нём мы можем инициализировать объект.


*/
class User {
	constructor(name) {
		this.name = name;
	}
	sayHi() {
		console.log(this.name);
	}
}
// Использование:
let user = new User('Иван');
user.sayHi();
/*Когда вызывается new User("Иван"):

Создаётся новый объект.
constructor запускается с заданным аргументом и сохраняет его в this.name.
*/
//Методы в классе не разделяются запятой
//Синтаксис классов отличается от литералов объектов, не путайте их. Внутри классов запятые не требуются.
//в JavaScript класс – это разновидность функции.

{
	class User {
		constructor(name) {
			this.name = name;
		}
		sayHi() {
			alert(this.name);
		}
	}
	console.log(typeof User); //VM47:9 function
	alert(User === User.prototype.constructor); // true

	// Методы находятся в User.prototype, например:
	alert(User.prototype.sayHi); // sayHi() { alert(this.name); }

	// в прототипе ровно 2 метода
	alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
}
/*Вот что на самом деле делает конструкция class User {...}:

Создаёт функцию с именем User, которая становится результатом объявления класса. Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
Сохраняет все методы, такие как sayHi, в User.prototype.
При вызове метода объекта new User он будет взят из прототипа, как описано в главе F.prototype. Таким образом, объекты new User имеют доступ к методам класса.

*/
//Во-первых, функция, созданная с помощью class, помечена специальным внутренним свойством [[IsClassConstructor]]: true. Поэтому это не совсем то же самое, что создавать её вручную.

//В отличие от обычных функций, конструктор класса не может быть вызван без new:
{
	class User {
		constructor() {}
	}
	console.log(typeof User); // function
	User(); // Error: Class constructor User cannot be invoked without 'new'
}
//Кроме того, строковое представление конструктора класса в большинстве движков JavaScript начинается с «class …»
{
	class User {
		constructor() {}
	}
	alert(User); // class User { ... }
}
//Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".
//Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.
//Как и функции, классы можно определять внутри другого выражения, передавать, возвращать, присваивать
//Пример Class Expression (по аналогии с Function Expression):

{
	let User = class {
		sayHi() {
			console.log('hi');
		}
	};
}
/*Аналогично Named Function Expression, Class Expression может иметь имя.

Если у Class Expression есть имя, то оно видно только внутри класса:*/
{
	// "Named Class Expression"
	// (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
	let User = class MyClass {
		sayHi() {
			console.log(MyClass); // имя MyClass видно только внутри класса
		}
	};
	new User().sayHi(); // работает, выводит определение MyClass Это работает, потому что мы внутри области видимости класса
	alert(MyClass); // ошибка, имя MyClass не видно за пределами класса
}
//Ошибка, потому что снаружи MyClass не существует
//Фабрика классов
{
	function makeClass(phrase) {
		// объявляем класс и возвращаем его
		return class {
			sayHi() {
				console.log(phrase);
			}
		};
	}
	let User = makeClass('Hi');
	new User().sayHi(); // Привет
}
/*makeClass("Привет") возвращает класс с зафиксированной фразой

Сохраняем этот класс в переменную User

Результат:

User теперь ведёт себя как обычный класс

При создании экземпляра (new User()) он имеет метод sayHi()

Метод использует значение phrase, которое было передано при создании

*/
//Геттеры и сеттеры создаются на User.prototype
{
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

	user = new User(''); // Имя слишком короткое.
}
//При объявлении класса геттеры/сеттеры создаются на User.prototype, вот так:
{
	Object.definePoroperties(User.prototype, {
		name: {
			get() {
				return this._name;
			},
			set(name) {
				//
			},
		},
	});
}
//Пример с вычисляемым свойством в скобках [...]:
{
	class User {
		['say ' + 'Hi']() {
			console.log('hi');
		}
	}
	new User().sayHi();
}
{
	class User {
		name = 'Аноним'; // Поле класса (добавляется в экземпляр)

		sayHi() {
			// Метод класса (добавляется в прототип)
			alert(`Привет, ${this.name}!`);
		}
	}

	let user = new User(1);
	console.log(user);
}
//методы, геттеры и сеттеры записываются в MyClass.prototype.

{
	//Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.
}
