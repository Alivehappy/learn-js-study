/*Мы также можем присвоить метод самому классу. Такие методы называются статическими.

В объявление класса они добавляются с помощью ключевого слова static
*/
class User {
	static staticMethod() {
		console.log(this === User);
	}
}
User.staticMethod(); // true
//Это фактически то же самое, что присвоить метод напрямую как свойство функции
{
	class User {}
	User.staticMethod = function () {
		console.log(this === User);
	};
}
//Значением this при вызове User.staticMethod() является сам конструктор класса User (правило «объект до точки»).
//Обычно статические методы используются для реализации функций, которые будут принадлежать классу в целом, но не какому-либо его конкретному объекту.

{
	class Article {
		constructor(title, date) {
			this.title = title;
			this.date = date;
		}
		static compare(articleA, articleB) {
			return articleA.date - articleB.date;
		}
	}
	// использование
	let articles = [
		new Article('HTML', new Date(2019, 11, 1)),
		new Article('CSS', new Date(2019, 0, 1)),
		new Article('JavaScript', new Date(2019, 11, 1)),
	];
	articles.sort(Article.compare);
	alert(articles[0].title); // CSS
}
//Здесь метод Article.compare стоит «над» статьями, как средство для их сравнения. Это метод не отдельной статьи, а всего класса.

{
	class Article {
		constructor(title, date) {
			this.title = title;
			this.date = date;
		}
		static createToday() {
			// помним, что this = Article

			return new this('Сегодняшний дайджест', new Date());
		}
	}
	let article = Article.createToday();
	alert(article.title); // Сегодняшний дайджест
}
//Статические методы также используются в классах, относящихся к базам данных, для поиска/сохранения/удаления вхождений в базу данных, например
// предположим, что Article - это специальный класс для управления статьями
// статический метод для удаления статьи по id:
Article.remove({ id: 12345 });
/*Статические методы недоступны для отдельных объектов
Статические методы могут вызываться для классов, но не для отдельных объектов.*/
/*Статические свойства также возможны, они выглядят как свойства класса, но с static в начале:

*/ {
	class Article {
		static publisher = 'Илья Кантор';
	}
	console.log(Article.publisher); //Илья Кантор
}
/*Это то же самое, что и прямое присваивание Article:

Article.publisher = "Илья Кантор";
*/
//Статические свойства и методы наследуются.

//Цепочка прототипов для экземпляров:
//rabbit → Rabbit.prototype → Animal.prototype → Object.prototype
//Цепочка поиска	Через __proto__ экземпляра
//Rabbit.prototype.__proto__

/*Rabbit.__proto__ === Animal
При вызове Rabbit.breathe():

Ищет в Rabbit → не находит

Ищет в Animal → находит метод
Rabbit → Animal → Function.prototype → Object.prototype
//Через __proto__ класса*/

/*class Animal {}
class Rabbit extends Animal {}

// для статики
alert(Rabbit.__proto__ === Animal); // true

// для обычных методов
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
*/

/*Как мы знаем, синтаксис «extends» устанавливает 2 прототипа:

Между "prototype" функций-конструкторов (для методов)
Между самими функциями-конструкторами (для статических методов).
*/
/*объектно-ориентированном программировании свойства и методы разделены на 2 группы:

Внутренний интерфейс – методы и свойства, доступные из других методов класса, но не снаружи класса.
Внешний интерфейс – методы и свойства, доступные снаружи класса.
*/
/*Публичные: доступны отовсюду. Они составляют внешний интерфейс. До этого момента мы использовали только публичные свойства и методы.
Приватные: доступны только внутри класса. Они для внутреннего интерфейса*/

{
	class Coffemachine {
		waterAmount = 0;
		constructor(power) {
			this.power = power;
			console.log(`Создана кофеварка, мощность: ${power}`);
		}
	}
	let coffeMachine = new Coffemachine(100);
	coffeMachine.waterAmount = 200;
}
/*Прямо сейчас свойства waterAmount и power публичные. Мы можем легко получать и устанавливать им любое значение извне.

*/
//Защищённые свойства обычно начинаются с префикса _.

{
	class Coffemachine {
		_waterAmount = 0;
		get waterAmount() {
			return this._waterAmount;
		}
		set waterAmount(value) {
			if (value < 0) throw new Error('Отрицательное количество воды');
			this._waterAmount = value;
		}
		constructor(power) {
			this.power = power;
		}
	}
	let coffeMachine = new Coffemachine(100);
	coffeMachine.waterAmount = 200;
	coffeMachine.waterAmount = -10; // Error: Отрицательное количество воды
}

//Давайте сделаем свойство power доступным только для чтения. Иногда нужно, чтобы свойство устанавливалось только при создании объекта и после этого никогда не изменялось
{
	class CoffeeMachine {
		constructor(power) {
			this._power = power;
		}
		get power() {
			return this._power;
		}
	}
	let coffeMachine = new CoffeeMachine(100);
	alert(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W
	coffeMachine.power = 25; // Error (no setter)
}

//Приватные свойства и методы должны начинаться с #. Они доступны только внутри класса.

{
	class CoffeeMachine {
		#waterAmount = 0;
		get waterAmount() {
			return this.#waterAmount;
		}
		set waterAmount(value) {
			if (value < 0) throw new Error('Отрицательный уровень воды');
			this.#waterAmount = value;
		}
	}
	let machine = new CoffeeMachine();
	machine.waterAmount = 100;
	alert(machine.#waterAmount); // Error
}

//отличие от защищённых, функциональность приватных полей обеспечивается самим языком. Это хорошо.

//Но если мы унаследуем от CoffeeMachine, то мы не получим прямого доступа к #waterAmount. Мы будем вынуждены полагаться на геттер/сеттер waterAmount

/*class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
  }
}
*/
// терминах ООП отделение внутреннего интерфейса от внешнего называется инкапсуляция.
//Защита для пользователей, чтобы они не выстрелили себе в ногу
/*Защищённые поля имеют префикс _. Это хорошо известное соглашение, не поддерживаемое на уровне языка. Программисты должны обращаться к полю, начинающемуся с _, только из его класса и классов, унаследованных от него.
Приватные поля имеют префикс #. JavaScript гарантирует, что мы можем получить доступ к таким полям только внутри класса.
*/
{
	class PowerArray extends Array {
		isEmpty() {
			return this.length === 0;
		}
	}
	let arr = new PowerArray(1, 2, 5, 10, 50);
	console.log(arr.isEmpty()); // false
	let filtered = arr.filter(elem => elem <= 10);
	console.log(filtered);
}

/*Обратите внимание на интересный момент: встроенные методы, такие как filter, map и другие возвращают новые объекты унаследованного класса PowerArray. Их внутренняя реализация такова, что для этого они используют свойство объекта constructor.

В примере выше,

arr.constructor === PowerArray
*/

//Если бы мы хотели, чтобы методы map, filter и т. д. возвращали обычные массивы, мы могли бы вернуть Array в Symbol.species, вот так:

{
	class PowerArray extends Array {
		isEmpty() {
			return this.length === 0;
		}
		static get [Symbol.species]() {
			return (Arrat = y);
		}
	}
	//// встроенные методы массива будут использовать этот метод как конструктор

	let arr = new PowerArray(1, 2, 3, 4, 56);
	alert(arr.isEmpty()); // false
	// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
	let filteredArr = arr.filter(item => item >= 10);

	// filteredArr не является PowerArray, это Array
	alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
}

/*Встроенные методы массива (filter, map, slice и др.) используют Symbol.species для создания нового массива

По умолчанию они используют текущий конструктор (PowerArray)

Но вы явно указали return Array в Symbol.species

Результат

filteredArr создаётся через new Array() (а не new PowerArray())

Поэтому у него нет метода isEmpty()

*/
//Но встроенные классы – исключение. Они не наследуют статические методы друг друга.

//Например, и Array, и Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype. Но Array.[[Prototype]] не ссылается на Object, поэтому нет методов Array.keys() или Date.keys().

//Оператор instanceof позволяет проверить, принадлежит ли объект указанному классу, с учётом наследования
// obj instanceof Class
//Оператор вернёт true, если obj принадлежит классу Class или наследующему от него.
//Обычно obj instanceof Class проверяет, есть ли Class.prototype в цепочке прототипов obj
{
	// проверка instanceof будет полагать,
	// что всё со свойством canEat - животное Animal
	class Animal {
		static [Symbol.hasInstance](obj) {
			if (obj.canEat) return true;
		}
	}
	let obj = { canEat: true };
	alert(obj instanceof Animal); // true: вызван Animal[Symbol.hasInstance](obj)
}
//Большая часть классов не имеет метода Symbol.hasInstance. В этом случае используется стандартная логика: проверяется, равен ли Class.prototype одному из прототипов в прототипной цепочке obj.
{
	class Animal {}
	class Rabbit extends Animal {}
	let rabbit = new Rabbit();

	console.log(rabbit instanceof Animal);
	// rabbit.__proto__ === Animal.prototype (нет совпадения)
	// rabbit.__proto__.__proto__ === Animal.prototype (совпадение!)
	console.log(rabbit.__proto__);
}

//Забавно, но сам конструктор Class не участвует в процессе проверки! Важна только цепочка прототипов Class.prototype.

//итоге мы получили «typeof на стероидах», который не только работает с примитивными типами данных, но также и со встроенными объектами, и даже может быть настроен.
alert({}.toString.call(window)); // [object Window]
alert({}.toString.call(new XMLHttpRequest())); // [object XMLHttpRequest]

//примесь определяет методы, которые реализуют определённое поведение. Мы не используем примесь саму по себе, а используем её, чтобы добавить функциональность другим классам.
