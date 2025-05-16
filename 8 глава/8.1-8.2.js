//В JavaScript объекты имеют специальное скрытое свойство [[Prototype]] (так оно названо в спецификации), которое либо равно null, либо ссылается на другой объект. Этот объект называется «прототип»:
//Когда мы хотим прочитать свойство из object, а оно отсутствует, JavaScript автоматически берёт его из прототипа. В программировании такой механизм называется «прототипным наследованием»
/**Свойство [[Prototype]] является внутренним и скрытым, но есть много способов задать его.

Одним из них является использование __proto__, например так:

 */
let animal = {
	eats: true,
	walk() {
		console.log('Animal walk');
	},
};
let rabbit = {
	jumps: true,
};
rabbit.__proto__ = animal; //устанавливает animal как прототип для rabbit
//Если мы ищем свойство в rabbit, а оно отсутствует, JavaScript автоматически берёт его из animal.

console.log(rabbit.eats);
console.log(rabbit.jumps);
rabbit.walk(); // walk взят из прототипа

//когда alert пытается прочитать свойство rabbit.eats (**), его нет в rabbit, поэтому JavaScript следует по ссылке [[Prototype]] и находит его в animal
//Здесь мы можем сказать, что «animal является прототипом rabbit» или «rabbit прототипно наследует от animal
//если у animal много полезных свойств и методов, то они автоматически становятся доступными у rabbit. Такие свойства называются «унаследованными».
//Если у нас есть метод в animal, он может быть вызван на rabbit:

//Цепочка прототипов может быть длиннее:
{
	let animal = {
		eats: true,
		walk() {
			console.log('Animal walk');
		},
	};
	let rabbit = {
		jumps: true,
		__proto__: animal,
	};
	let longEar = {
		earLength: 10,
		__proto__: rabbit,
	};
	longEar.walk(); // walk взят из цепочки прототипов

	console.log(longEar.jumps); // true (из rabbit)
}
//Теперь, если мы прочтём что-нибудь из longEar, и оно будет отсутствовать, JavaScript будет искать его в rabbit, а затем в animal.
//Есть только два ограничения:

/*Ссылки не могут идти по кругу. JavaScript выдаст ошибку, если мы попытаемся назначить __proto__ по кругу.
Значение __proto__ может быть объектом или null. Другие типы игнорируются.
что __proto__ — не то же самое, что внутреннее свойство [[Prototype]]. Это геттер/сеттер для [[Prototype]].
Прототип используется только для чтения свойств.
Операции записи/удаления работают напрямую с объектом.


*/
//В приведённом ниже примере мы присваиваем rabbit собственный метод walk:
{
	let animal = {
		eats: true,
		walk() {
			/* этот метод не будет использоваться в rabbit */
		},
	};
	let rabbit = {
		__proto__: animal,
	};
	rabbit.walk = function () {
		console.log('Rabbit! Bounce-bounce!');
	};
	rabbit.walk(); // Rabbit! Bounce-bounce!
}
//Теперь вызов rabbit.walk() находит метод непосредственно в объекте и выполняет его, не используя прототип:
//Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером. То есть это фактически вызов функции.

{
	let user = {
		name: 'John',
		surname: 'Smith',
		set fullNmae(value) {
			[this.name, this.surname] = value.split(' ');
		},
		get fullName() {
			return `${this.name} ${this.surname}`;
		},
	};
	let admin = {
		__proto__: user,
		isAdmin: true,
	};
	alert(admin.fullName); // John Smith (*)
	// срабатывает сеттер!
	admin.fullName = 'Alice Cooper'; // (**)
	alert(admin.name); // Alice
	alert(admin.surname); // Cooper
}
//Здесь в строке (*) свойство admin.fullName имеет геттер в прототипе user, поэтому вызывается он. В строке (**) свойство также имеет сеттер в прототипе, который и будет вызван.
//Ответ прост: прототипы никак не влияют на this.
//Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.
//Таким образом, вызов сеттера admin.fullName= в качестве this использует admin, а не user.
//Это на самом деле очень важная деталь, потому что у нас может быть большой объект со множеством методов, от которого можно наследовать. Затем наследующие объекты могут вызывать его методы, но они будут изменять своё состояние, а не состояние объекта-родителя
//Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта.
{
	let animal = {
		eats: true,
	};

	let rabbit = {
		jumps: true,
		__proto__: animal,
	};
	console.log(Object.keys(rabbit)); // Object.keys возвращает только собственные ключи jumps
	for (let prop in rabbit) console.log(prop); // jumps, затем eats
	// for..in проходит и по своим, и по унаследованным ключам
}
//Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи встроенного метода obj.hasOwnProperty(key): он возвращает true, если у obj есть собственное, не унаследованное, свойство с именем key.
{
	let animal = {
		eats: true,
	};
	let rabbit = {
		jumps: true,
		__proto__: animal,
	};
	for (let key in rabbit) {
		let isOwn = rabbit.hasOwnProperty(key);
		if (isOwn) {
			console.log(`our: ${key}`);
		} else {
			console.log(`inherited: ${key}`);
		}
	}
}
//Откуда взялся метод rabbit.hasOwnProperty? Мы его явно не определяли. Если посмотреть на цепочку прототипов, то видно, что он берётся из Object.prototype.hasOwnProperty. То есть он унаследован. Ответ простой: оно не перечислимо. То есть у него внутренний флаг enumerable стоит false, как и у других свойств Object.prototype. Поэтому оно и не появляется в цикле.

{
	let head = {
		glasses: 1,
	};

	let table = {
		pen: 3,
		__proto__: head,
	};

	let bed = {
		sheet: 1,
		pillow: 2,
		__proto__: table,
	};

	let pockets = {
		money: 2000,
		__proto__: bed,
	};

	alert(pockets.pen); // 3
	alert(bed.glasses); // 1
	alert(table.money); // undefined
}

{
	let hamster = {
		stomach: [],
		eat(food) {
			this.stomach.push(food);
		},
	};
	let speedy = {
		__proto__: hamster,
		stomach: [],
	};
	let lazy = {
		__proto__: hamster,
		stomach: [],
	};
	// Этот хомяк нашёл еду
	speedy.eat('apple');
	console.log(speedy.stomach);
	alert(lazy.stomach); // apple
}
//вызове this.stomach.push() движок:

//Ищет stomach в speedy → не находит

//Идёт в прототип hamster → находит массив

//а прототип один у них и подтому надо изменит ьдоступ либо в каждом объекте по новому массиву
{
	let hamster = {
		stomach: [],
		eat(food) {
			this.stomach = [food]; //  Присваивание this.stomach Создаёт новое свойство в объекте
		},
	};
}

{
	let animal = {
		eats: true,
	};

	function Rabbit(name) {
		this.name = name;
	}
	Rabbit.prototipe = animal;
	let rabbit = new Rabbit('White Rabbit');
	//  rabbit.__proto__ == animal
	alert(rabbit.eats); // true
}
//Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее: «При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]».
/*У каждой функции (за исключением стрелочных) по умолчанию уже есть свойство "prototype".

По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
function Rabbit() {}

/* прототип по умолчанию
Rabbit.prototype = { constructor: Rabbit };

*/
{
	function Rabbit() {
		// по умолчанию:
		// Rabbit.prototype = { constructor: Rabbit }
	}
	alert(Rabbit.prototype.constructor == Rabbit);
}
//Соответственно, если мы ничего не меняем, то свойство constructor будет доступно всем кроликам через [[Prototype]]:

{
	function Rabbit() {}
	// по умолчанию:
	// Rabbit.prototype = { constructor: Rabbit }
	let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}
	alert(rabbit.constructor == Rabbit);
}
//Мы можем использовать свойство constructor существующего объекта для создания нового.
{
	function Rabbit(name) {
		this.name = name;
		console.log(name);
	}
	let rabbit = new Rabbit('White Rabbit');
	let rabbit2 = new rabbit.constructor('Black Rabbit');
}
//Это удобно, когда у нас есть объект, но мы не знаем, какой конструктор использовался для его создания (например, он мог быть взят из сторонней библиотеки), а нам необходимо создать ещё один такой объект.
/*Но, пожалуй, самое важное о свойстве "constructor" это то, что…

…JavaScript сам по себе не гарантирует правильное значение свойства "constructor".

Да, оно является свойством по умолчанию в "prototype" у функций, но что случится с ним позже – зависит только от нас.

В частности, если мы заменим прототип по умолчанию на другой объект, то свойства "constructor" в нём не будет.

*/
{
	function Rabbit() {
		Rabbit.prototype = {
			jumps: true,
		};
	}
	let rabbit = new Rabbit();
	console.log(rabbit.constructor === Rabbit); // false
}
//Таким образом, чтобы сохранить верное свойство "constructor", мы должны добавлять/удалять/изменять свойства у прототипа по умолчанию вместо того, чтобы перезаписывать его целиком:

{
	function Rabbit() {
		// Не перезаписываем Rabbit.prototype полностью,
		// а добавляем к нему свойство
		Rabbit.prototype.jumps = true;
	}
	// Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Rabbit.prototype.constructor
}
//Или мы можем заново создать свойство constructor:
{
	Rabbit.prototype = {
		jumps: true,
		constructor: Rabbit,
	};
}

{
	function Foo(name) {
		this.name = name;
	}
	const obj = new Foo('Anna');
	const obj2 = new obj.constructor('Pete');
	console.log(obj2.name); //Pete
}
/*Всё получилось, потому что User.prototype.constructor == User.

…Но если кто-то перезапишет User.prototype и забудет заново назначить свойство "constructor", чтобы оно указывало на User, то ничего не выйдет.

*/
//Rabbit.prototype = { constructor: Rabbit };
