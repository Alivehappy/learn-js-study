//статическое свойство

{
	class Cat {
		static tailLength = 10;
		#ears = 2;
		getEars() {
			return this.#ears;
		}
	}
	console.log(Cat.tailLength); //10

	let cat = new Cat();
	console.log(cat.tailLength); //undefined
	console.log(new Cat().#ears);
	//console.log(Cat.#ears); //Приватные поля нельзя читать напрямую извне класса

	//console.log(cat.#ears); //Для экземпляров этого класса, но только внутри методов класса

	//console.log(Cat.getEars()); //Uncaught TypeError: Cat.getEars is not a function
	//надо нестатичсекий метод вызывть через экземпляр
	/*Методы экземпляра (например, getEars) принадлежат экземплярам класса, а не самому классу.
Вызов Cat.getEars() пытается найти статический метод с именем getEars в классе Cat, но такого метода нет (есть только метод экземпляра).
*/
	console.log(cat.getEars()); //2

	//приватное могу вызывать(через метод) и измениь через метод
	//Приватные поля (обозначенные #) также добавляются в каждый экземпляр.
	//Статические методы принадлежат самому классу (конструктору) и не доступны через экземпляры.
	Object.getOwnPropertyDescriptor(cat);
	//// Выведет: {} (пустой объект, так как у cat нет собственных свойств)
	/*Приватные поля невозможно проверить стандартными методами вроде:

Object.keys()

Object.getOwnPropertyNames()

for...in

*/
	console.log(cat.prototype === Cat); //false
	/*cat — это экземпляр класса Cat, созданный с помощью new Cat().
cat.prototype — это свойство, которое указывает на прототип экземпляра cat. В данном случае, cat.prototype равно undefined, потому что у экземпляров нет свойства prototype.
Cat — это функция-конструктор, которая имеет свое собственное свойство prototype, указывающее на объект, содержащий методы класса.
Таким образом*/
	cat.__proto__ === Cat.prototype; // true
	/*cat.__proto__ указывает на прототип объекта cat, который был установлен при создании объекта с помощью new.
Cat.prototype — это объект, который был назначен в качестве прототипа для всех экземпляров Cat.
*/
	console.log(cat instanceof Cat); // true
}
/*cat
  |
  |__proto__
      |
  Cat.prototype
      |
  Object.prototype
      |
  null*/
{
	//Можно ли обратиться к статическому полю из this
	class User {
		static abob = 5;
		static method() {
			return this.abob; //this  в статике === User, то есть маомому классу
		}
		method() {
			return this.__proto__.constructor.abob;
		} /// this === instance, хранятся в конструкторе
	}
	console.log(User.method()); //5
	let user = new User();
	console.log(user.method()); //5
}
//Ввстроенные классы – исключение. Они не наследуют статические методы друг друга.
//Хотя технически Array и Date наследуют от Object, их статические методы не копируются
//Для обычных классов
//Cat.[[Prototype]] → Animal.[[Prototype]] → Function.prototype → Object.prototype
//Статические методы (конструкторы) наследуются иначе
//Например, и Array, и Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype. Но Array.[[Prototype]] не ссылается на Object, поэтому нет методов Array.keys() или Date.keys().
/*Как видите, нет связи между Date и Object. Они независимы, только Date.prototype наследует от Object.prototype.

В этом важное отличие наследования встроенных объектов от того, что мы получаем с использованием extends.

*/
/*Как мы знаем, синтаксис «extends» устанавливает 2 прототипа:

Между "prototype" функций-конструкторов (для методов)
Между самими функциями-конструкторами (для статических методов).
*/
{
	new Date().__proto__.__proto__ === Object.prototype; //true
	new Date().__proto__.__proto__ === Object; //false
	//Object — это функция-конструктор (а не прототип)
}
/*__proto__ — свойство экземпляра, указывающее на его прототип

prototype — свойство функции-конструктора (например, Date.prototype)*/
//Встроенные классы не наследуют статику от Object
/*

Для доступа к методам Object используйте прямое обращение:
Object.keys(someArray); // Правильно

*/
//Для экземпляров:

//new Cat() → Cat.prototype → Animal.prototype → Object.prototype → null
//Для статики:

//Cat → Animal → Function.prototype → Object.prototype → null

/*Экземпляр (new Rabbit()) 
  → Rabbit.prototype 
    → Object.prototype
      → null

Rabbit (функция-конструктор)
  → Object
    → Function.prototype
      → Object.prototype
        → null*/
/*Rabbit.prototype определяет, какие методы получат экземпляры

Rabbit.__proto__ определяет, какие статические методы доступны классу*/
{
	class Rabbit extends Object {}
	Rabbit.keys({ a: 1 }); // Работает (статика от Object)

	class SimpleRabbit {}
	SimpleRabbit.keys({ a: 1 }); // Ошибка (нет статики)
}
new Date() instanceof Date;
console.log(new Date().__proto__); //date.prototype
console.log(Date.__proto__); //function.prorotpe

{
	class User {}
	const abober = new User();
	abober instanceof User;
	console.log(abober.constructor === User);
	console.log(Object.getPrototypeOf(abober) === User.prototype); // true
	console.log(abober instanceof User.prototype.__proto__); //не работатет
	/*instanceof ожидает функцию-конструктор справа, а Object.prototype - это объект, не функция
	abober → User.prototype → Object.prototype → null


*/
	console.log(abober instanceof Object); // true
	console.log(abober instanceof Function); // false

	/*Проверка instanceof идёт по этой цепочке

Function.prototype не участвует
Function.prototype есть только в цепочке конструктора (User), но не в цепочке экземпляра (abober)*/
	console.log(Object.prototype.isPrototypeOf(abober)); // true
	// Проверки для конструктора User
	console.log(User instanceof Function); // true
	console.log(User instanceof Object); // true

	/*abober.__proto__ автоматически устанавливается в User.prototype

Поэтому abober.constructor ищется через цепочку прототипов

abober {
  __proto__: User.prototype {
    constructor: User,
    __proto__: Object.prototype
  }
}
*/
}

{
	const obj = {}; // или new Object()
	console.log(obj instanceof Object); // true
	//Object — это функция-конструктор
	console.log(typeof Object); // "function"
	console.log(Object.prototype.constructor === Object); // true
}

//задача сделать выражение равным тру
{
	({}) instanceof Array; //false
	let obj = {};

	obj.__proto__ = Array.prototype;
	obj instanceof Array; //true
}
{
	let obj = Object.create(Array.prototype);
	obj instanceof Array; //true
}

{
	try {
		var f = 1;
	} catch (t) {
		console.log(f);
	}
}
