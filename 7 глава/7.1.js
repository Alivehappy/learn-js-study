/*Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).

writable – если true, свойство можно изменить, иначе оно только для чтения.
enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
*/
//Мы ещё не встречали эти атрибуты, потому что обычно они скрыты. Когда мы создаём свойство «обычным способом», все они имеют значение true. Но мы можем изменить их в любое время.

//Метод Object.getOwnPropertyDescriptor позволяет получить полную информацию о свойстве.

//let discriptor = Object.getOwnPropertyDescriptor(obj, propertyName)
//Возвращаемое значение – это объект, так называемый «дескриптор свойства»: он содержит значение свойства и все его флаги.

let user = {
	name: 'John',
};
let discriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log(JSON.stringify(discriptor, null, 2));
//Чтобы изменить флаги, мы можем использовать метод Object.defineProperty
//Object.defineProperty(obj, propertyName, discriptor)
/*obj, propertyName
Объект и его свойство, для которого нужно применить дескриптор.
descriptor
Применяемый дескриптор.
Если свойство существует, defineProperty обновит его флаги. В противном случае метод создаёт новое свойство с указанным значением и флагами; если какой-либо флаг не указан явно, ему присваивается значение false.


*/
{
	let user = {};
	oBJECT.defineProperty(user, 'name', {
		value: 'John',
	});
	let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
	console.log(JSON.stringify(descriptor, null, 2));
}
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */
// в обычном созданиифлаги тру, сщздание через свойство обж без явного указания будет фалс

{
	let user = {
		name: 'John',
	};
	Object.apply.defineProperty(user, 'name', {
		writable: false,
	});
	user.name = 'Pete'; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'
}

//Теперь никто не сможет изменить имя пользователя, если только
//Встроенный метод toString в объектах – неперечислимый, его не видно в цикле for..in. Но если мы напишем свой собственный метод toString, цикл for..in будет выводить его по умолчанию:

{
	let user = {
		name: 'John',
		toString() {
			return this.name;
		},
	};
	// По умолчанию оба свойства выведутся:
	for (let key in user) console.log(key);
	// name, toString
}
//Если мы этого не хотим, можно установить для свойства enumerable:false. Тогда оно перестанет появляться в цикле for..in аналогично встроенному toString:
{
	Object.defineProperty(user, 'toString', {
		enumerable: false,
	});
	for (let key in user) alert(key); // name
	console.log(Object.keys(user)); // name
}
//Неперечислимые свойства также не возвращаются Object.keys:
/*
Флаг неконфигурируемого свойства (configurable:false) иногда предустановлен для некоторых встроенных объектов и свойств.

Неконфигурируемое свойство не может быть удалено, его атрибуты не могут быть изменены.

Например, свойство Math.PI – только для чтения, неперечислимое и неконфигурируемое:

*/
{
	let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
	console.log(JSON.stringify(descriptor, null));
}
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
	Math.PI = 3; // Ошибка, потому что writable: false

// delete Math.PI тоже не сработает
// Ошибка, из-за configurable: false
Object.defineProperty(Math, "PI", { writable: true });

*/
//хоят по умолчанию все тру но некоторые встроенные с фолс
/*Обратите внимание: configurable: false не даст изменить флаги свойства, а также не даст его удалить. При этом можно изменить значение свойства.
Если вы попытаетесь перезаписать configurable: true после того, как уже установили его в false, это не сработает
*/
//Существует метод Object.defineProperties(obj, descriptors), который позволяет определять множество свойств сразу.

/* Object.defineProperties(obj, {
prop1: descriptor1, 
prop2: descriptor2})*/
{
	Object.definePropertirs(user, {
		name: { value: 'John', writable: false },
		surname: { value: 'Smith', writable: false },
	});
}
/*Вместе с Object.defineProperties этот метод можно использовать для клонирования объекта вместе с его флагами:
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))
Обычно при клонировании объекта мы используем присваивание, чтобы скопировать его свойства:


*/
for (let key in user) {
	clone[key] = user[key];
}
//Но это не копирует флаги. Так что если нам нужен клон «получше», предпочтительнее использовать Object.defineProperties.
/*Другое отличие в том, что for..in игнорирует символьные и неперечислимые свойства, а Object.getOwnPropertyDescriptors возвращает дескрипторы всех свойств.

*/
//Первый тип это свойства-данные (data properties). Мы уже знаем, как работать с ними. Все свойства, которые мы использовали до текущего момента, были свойствами-данными.
//Второй тип свойств мы ещё не рассматривали. Это свойства-аксессоры (accessor properties). По своей сути это функции, которые используются для присвоения и получения значения, но во внешнем коде они выглядят как обычные свойства объекта.
//Свойства-аксессоры представлены методами: «геттер» – для чтения и «сеттер» – для записи. При литеральном объявлении объекта они обозначаются get и set:

{
	let obj = {
		get propName() {
			// геттер, срабатывает при чтении obj.propName
		},
		set propName(value) {
			// сеттер, срабатывает при записи obj.propName = value
		},
	};
}
//Геттер срабатывает, когда obj.propName читается, сеттер – когда значение присваивается.

{
	let user = {
		name: 'John',
		surname: 'Smith',
		get fullName() {
			return `${this.name} ${this.surname}`;
		},
	};
	alert(user.fullName); // John Smith
}
//мы не вызываем user.fullName как функцию, а читаем как обычное свойство: геттер выполнит всю работу за кулисами.
//На данный момент у fullName есть только геттер. Если мы попытаемся назначить user.fullName=, произойдёт ошибка:
user.fullName = 'Тест'; // Ошибка (у свойства есть только геттер)
{
	let user = {
		name: 'John',
		surname: 'Smith',
		get fullName() {
			return `${this.name} ${this.surname}`;
		},
		set fullName(value) {
			[this.name, this.surname] = value.split('');
		},
	};
	// set fullName запустится с данным значением
	user.fullName = 'Alice Cooper';

	alert(user.name); // Alice
	alert(user.surname); // Cooper
}
//В итоге мы получили «виртуальное» свойство fullName. Его можно прочитать и изменить.
//Свойства-аксессоры не имеют value и writable, но взамен предлагают функции get и set.
/*То есть, дескриптор аксессора может иметь:

get – функция без аргументов, которая сработает при чтении свойства,
set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
enumerable – то же самое, что и для свойств-данных,
configurable – то же самое, что и для свойств-данных.
*/
{
	let user = {
		name: 'John',
		surname: 'Smith',
	};

	Object.defineProperty(user, 'fullName', {
		get() {
			return `${this.name} ${this.surname}`;
		},
		set(value) {
			[this.name, this.surname] = value.split(' ');
		},
	});
	alert(user.fullName); // John Smith

	for (let key in user) alert(key); // name, surname
}

{
	let user = {
		get name() {
			return this._name;
		},
		set name(value) {
			if (value.length < 4) {
				console.log('Name is too short');
				return;
			}
			this._name = value;
		},
	};
	user.name = 'Pete';
	alert(user.name); // Pete

	user.name = ''; // Имя слишком короткое...
}
// перпишу ее как обычную обертку
{
	function show(name) {
		let user = new Map();
		if (user.has(name)) {
			console.log(user.get(name));
		} else {
			user.set(name);
			console.log(user.get(name));
		}
	}
}

{
	function User() {
		let _name = '';
		return {
			getName() {
				return _name;
			},
			setName(value) {
				if (value < 4) {
					console.log('Имя слишком короткое, должно быть более 4 символов');
					return;
				}
				_name = value;
			},
		};
	}
	const user = User();
	user.setName('Pete'); // Устанавливаем имя
	console.log(user.getName()); // Pete
}

function User(name, birthDay) {
	this.name = name;
	this.birthDay = birthDay;
	// возраст рассчитывается из текущей даты и дня рождения
	Object.defineProperty(this, 'age', {
		get() {
			let todayYear = new Date().getFullYear();
			return todayYear - this.birthDay.getFullYear();
		},
	});
}
let john = new User('John', new Date(1992, 6, 1));

alert(john.birthday); // доступен как день рождения
alert(john.age); // ...так и возраст

{
	let arr = [1, 2, 5, 79, 9, 666, 45, 8];
	function sorted(arr) {
		let n = arr.length;
		for (let i = 0; i < n - 1; i++) {
			for (let j = 0; j < n - i - 1; j++) {
				if (arr[j] > arr[j + 1]) {
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				}
			}
		}
		return arr;
	}
	sorted(arr);
}
//при большом цикле у нас просто столько подходов, какая длина массива, вся работа по замене идет во внутренннем цикле, так как последний элемент опредлен, то таким же образом определяем предпоследний и те, что перед ним

//Создайте объект user с  свойством _name и публичными геттером и сеттером для него. Геттер должен возвращать имя в верхнем регистре, а сеттер — проверять, что новое имя не пустое

{
	const user = {
		_name: 'Guest',
		get name() {
			return this._name.toLocaleUpperCase();
		},
		set name(newName) {
			if (newName && typeof newName === 'string') {
				return (this._name = newName);
			} else {
				console.log('Enter normal name');
			}
		},
	};
}
//Создайте объект rectangle с свойствами width и height. Добавьте геттер area, который возвращает площадь прямоугольника
{
	const rectangle = {
		width: 5,
		height: 5,
		get area() {
			return this.width * this.height;
		},
	};
}
//Создайте объект product с приватным свойством _price. Сеттер должен принимать число или строку (например, "10.99") и всегда сохранять _price как число. Если передано некорректное значение — выводить ошибку.

{
	const product = {
		_price: 0,
		set price(value) {
			const onlyNum = parseFloat(value); //парсит убирая все, что не число, точку оставляет, если наичнается с букв, то нан
			if (!isNaN(onlyNum)) {
				//
				this._price = onlyNum;
			} else {
				console.log('Error');
				return;
			}
		},
		get price() {
			return this._price;
		},
	};
	product.price = '19.99';
	console.log(product.price); // 19.99
}
//Создайте объект student с полями name, grades (массив оценок). Добавьте геттер averageGrade, который будет вычислять средний балл.

{
	const school = {
		name: 'Alice',
		grades: [85, 90, 78, 92],
		get averageGrade() {
			if (this.grades.length === 0) return 0;
			const sum = this.grades.reduce((acc, elem) => (acc += elem), 0);
			return sum / this.grades.length;
		},
	};
	console.log(school.averageGrade); // 86.25
	school.grades.push(88);
	console.log(school.averageGrade); // 86.6
}
