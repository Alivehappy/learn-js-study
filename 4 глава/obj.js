{
	let userInfo = {
		name: 'sas',
		age: 30,
	};
}

{
	let userInfo1 = {
		name: 'sas',
		age: 30,
		58: 'meaning',
	};
	console.log(userInfo1[58]); //meaning
	/*userInfo1[58] эквивалентно userInfo1['58'], потому что число 58 автоматически преобразуется в строку '58'.Ключ 58: Ключ 58 автоматически преобразуется в строку '58', но это не ошибка, а особенность JavaScript.
	 */
}
{
	let userInfo2 = {
		name: 'sas',
		age: 30,
		showInfo() {
			console.log(`${this.name}`); //sas
		},
	};
}
{
	const userInfo3 = {
		name: 'sas',
		age: 30,
	};
	/*showInfo(){
        console.log(`${this.name}`);
};
        // undefined
        /*Контекст this: Если метод showInfo вызывается без контекста (например, как обычная функция), this будет неопределён (undefined или ссылаться на глобальный объект в нестрогом режиме).
        
        */
}
{
	let user2 = {
		name: 'sas',
		age: 30,
	};
	let value = user2;
	value.age = 45;
	console.log(
		user2.age
	); /*Объекты в JavaScript передаются по ссылке. Это значит, что переменная value не создаёт новый объект, а просто ссылается на тот же объект, что и user.

*/
}
{
	let user3 = userInfo;
	userInfo = null;
	user3.showInfo(); //Если userInfo изначально null или undefined, то код выбросит ошибку, Если userInfo изначально ссылается на объект с методом showInfo, то user.showInfo() выполнится

	if (user3 && userInfo) {
		user3.showInfo();
	} else {
		console.log('no');
	}
}
{
	let userInfo4 = {
		name: 'sas',
		age: 30,
	};
	for (const key in userInfo4) {
		const value = userInfo4[key]; //key meaning
		console.log(
			value
		); /*На каждой итерации переменная key получает имя текущего свойства (в виде строки).

    userInfo4[key]:
    
    Используется для получения значения свойства по его ключу.
    
    */
	}
}
{
	for (const key in userInfo4) {
		console.log(`key: ${key}, Valye: ${userInfo4[key]}`);
	}
}
{
	let userInfo5 = {
		name: 'sas',
		age: 30,
		adress: {
			city: 'Moscow',
		},
	};
	for (const key in userInfo5.adress) {
		console.log(userInfo5.adress[key]);
		console.log(key); // Выводим имя свойства (ключ)
		console.log(`Key: ${key}, Value: ${userInfo5.adress[key]}`);
	}
}
{
	let userInfo = {
		name: 'sas',
		age: 30,
		'likes js': true,
	};
	console.log(userInfo['likes js']);
}
{
	user = {
		sayHi: function () {
			alert('hi');
		},
	};
}
{
	user = {
		sayHi() {
			alert('hi');
		},
	};
}
{
	let user = {
		name: 'John',
		age: 30,
		sayHi() {
			// "this" - это "текущий объект".
			console.log(this.name);
		},
	};

	user.sayHi();
	/*Здесь во время выполнения кода user.sayHi() значением this будет являться user (ссылка на объект user). Значение this вычисляется во время выполнения кода, в зависимости от контекста*/
}
{
	let user = { name: 'John' };
	let admin = { name: 'Admin' };

	function sayHi1() {
		alert(this.name);
	}
	// используем одну и ту же функцию в двух объектах
	user.f = sayHi1;
	admin.f = sayHi1;
	// эти вызовы имеют  разное значение this
	// "this" внутри функции - это объект "перед точкой"
	user.f(); // John  (this == user)
	admin.f(); // Admin  (this == admin)

	admin[
		'f'
	](); /* Admin (нет разницы между использованием точки или квадратных скобок для доступа к объекту)/*Если бы ты написал user.f = sayHi1(), то функция sayHi была бы вызвана сразу, и её результат (если он есть) был бы присвоен свойству f/ user.f = sayHi1 — присваивает функцию как метод объекта, не вызывая её.
user.f = sayHi() — вызывает функцию сразу и присваивает её результат (если он есть) свойству f.Когда ты пишешь user.f, ты просто получаешь доступ к функции, но не вызываешь её.

*/
}
{
	function sayHi() {
		alert(this);
	}

	sayHi(); // undefined

	//Стрелочные функции особенные: у них нет своего «собственного» this. Если мы ссылаемся на this внутри такой функции, то оно берётся из внешней «нормальной» функции.
}
{
	let user = {
		firstName: 'Ilya',
		sayHi() {
			let arrow = () => alert(this.firstName);
			arrow();
		},
	};
	user.sayHi(); //Ilya
}

{
	const obj = {
		prop: 123,
		method() {
			console.log(this.prop);
		},
	};
	obj.method(); // 123

	//const copy = Object.assign(copy, obj);// copy тут не объект нельзя так написать
	const copy = Object.assign({}, obj);
	console.log(copy);

	//{prop: 123, method: ƒ}
	const a = Object.assign(obj, { prop: 1 });
	console.log(obj);
	console.log(copy);

	//Объект obj уже был объявлен ранее, и у него есть свойство prop со значением 123 и метод method
	/*Object.assign(obj, {prop: 1}) изменяет свойства объекта obj. Метод Object.assign копирует значения всех перечисляемых собственных свойств из источников (в данном случае из объекта { prop: 1 }) в целевой объект (в данном случае obj).
    
    Объект obj будет изменен. Значение свойства prop у obj будет перезаписано значением 1 из переданного объекта.
    
    Вывод в консоль: Когда вы вызываете console.log(obj)*/

	123 - // вызов метода
		//  { prop: 123, method: ƒ } method: ƒ method()prop: 123[[Prototype]]: Object //вызов copy
		// { prop: 1, method: ƒ } //console.log(obj); вызоб с измененнным свойством
		//  { prop: 123, method: ƒ } //console.log(copy);

		console
			.log('obj', obj) //Это вызов функции console.log, который выводит в консоль строку 'obj' и значение переменной obj.
			.console.log('copy', copy);
	console.log(copy === obj); //false создали новый объект copy с помощью Object.assign, вывод будет false, так как они ссылаются на разные объекты.

	console.log(JSON.stringify(obj)); //преобразует объекта встоку без методов {"prop":1}
	//строгий режим делает невозможным случайное создание глобальных переменных
	//В строгом режиме присваивание NaN значения выбрасывает исключение.
	//в strict Mode ключевое слово this должно выполняться только в контексте объекта.
	//This — это ссылка на контекст исполнения функции. Таким образом получается, что this тесно связан именно с функциями и рассматривается относительно них. Вне функции this будет ссылаться на глобальный контекст
	//Для функций, объявленных через function f( ) { }, this вычисляется в момент вызова и равен объекту перед точкой. Если такого объекта нет — тогда this будет указывать на глобальный контекст (window)
	//Для стрелочных функций this определяется в момент их создания и больше никогда не изменяется
	//Договоримся, что везде используется 'use strict', поэтому в глобальной области видимости this всегда будет undefined, а не window. например Стрелочная функция указывает на window, потому что она была создана внутри глобального контекста (window).

	//this имеет смысл только относительно функции, потому что this указывает на контекст исполнения функции
	//Поведение this в методах объекта одинаково как в строгом, так и в нестрогом режиме. this ссылается на объект, в контексте которого вызван метод
}
{
	const obj = {
		value: 42,
		showThis() {
			console.log(this);
		},
	};

	obj.showThis(); // { value: 42, showThis: [Function: showThis] }
	//Если функция используется как конструктор (с ключевым словом new), this ссылается на новый созданный объект.
}
{
	let obj1 = {
		prop: 123,
		method: () => {
			console.log(this);
		},
	};
	console.log(obj1.method()); //undefined
	{
		const m = obj1.method;
	}
	const m = obj1.method.bind(obj1); //строке const m = obj.method.bind(obj); вы создаете новую функцию m, которая будет иметь this, установленным на obj. Однако, поскольку method — это стрелочная функция, bind не будет работать так, как вы ожидаете. Переменная m всё равно будет стрелочной функцией, и значение this остается прежним
	m(); //Так как method определена в глобальной области (вне каких-либо других функций), this будет ссылаться на глобальный объект (или на undefined в строгом режиме).
	//Здесь вы создаете переменную m, которая ссылается на то же самое, что и obj.method. Однако, когда вы вызываете m(), this все равно не указывает на obj, а ссылается на родительскую лексическую область. Поэтому вы получите undefined, если вы попытаетесь обратиться к this//
}
{
	const obj2 = {
		prop: 456,
	};
	obj2.method = m;
	obj2.mrthod(); //error m не определена
}
/*
'use strict'; this;
Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}
 this ссылается на объект Window, потому что код выполняется в глобальной области видимости.

В строгом режиме ('use strict';) поведение this в глобальной области видимости не меняется — оно по-прежнему ссылается на глобальный объект (window в браузере).

Почему this равно Window?
Объект Window — это глобальный объект в браузере. Он содержит все глобальные переменные, функции и другие объекты, такие как document, location, history и т.д. Когда вы используете this в глобальной области видимости, оно ссылается на этот объект.

Примеры
Без строгого режима:

javascript
Copy
console.log(this); // Window
Со строгим режимом:

javascript
Copy
'use strict';
console.log(this); // Window
В обоих случаях this ссылается на объект Window, потому что код выполняется в глобальной области видимости.

Когда this может быть другим?
В функциях: В строгом режиме, если функция вызывается без контекста (например, просто как foo()), this будет undefined. В нестрогом режиме this будет ссылаться на глобальный объект (window).

javascript
Copy
'use strict';
function foo() {
  console.log(this);
}
foo(); // undefined
В методах объектов: this будет ссылаться на объект, к которому принадлежит метод.

javascript
Copy
const obj = {
  method() {
    console.log(this);
  }
};
obj.method(); // { method: [Function: method] }
*/
{
	const obj = {
		a: 3,
	};
	obj['obj'] = obj;
	console.log(obj);
	/*Теперь объект obj выглядит так:


{
  a: 3,
  obj: <ссылка на самого себя>
}
  Когда вы выводите объект obj в консоль, JavaScript пытается отобразить его структуру. Однако он обнаруживает, что объект содержит ссылку на самого себя, что создает циклическую ссылкуЦиклическая ссылка возникает, когда объект ссылается на самого себя, прямо или косвенно. В вашем случае объект obj содержит свойство obj, которое ссылается на самого себя:

к свойству объекта который в коючен записан как число обратиться можно тоолько чере [] скобки
let obj = {
1: a,
}
alert(obj[1]);
*/
}
{
	let obj = {
		4: 'aboba',
		$: 5,
	};
	function aba() {
		return '4';
	}
	console.log(obj[aba()]);

	const prop = aba;
	console.log(obj[prop()]); /*Функция aba:

Функция aba возвращает строку '4'.

Вызов obj[aba()]:

aba() вызfunction params(obj) {
		obj = {
			prop: 5,
		}
		return obj.prop
	}
	const obj = {
		prop: 4,
	}

	console.log(params(obj)) //5
	console.log(obj.prop) //4ывается, и её результат — строка '4'.

Код преобразуется в obj['4'].

Это обращение к свойству объекта obj с ключом '4'.

Значение свойства 'aboba':

В объекте obj свойство с ключом '4' имеет значение aboba.

Вы присваиваете переменной prop функцию aba:

prop() — это вызов функции aba, которая возвращает строку '4'.

Затем происходит обращение к свойству объекта obj с ключом '4'.

Значение свойства '4' в объекте obj — это 'aboba'.

Поэтому в консоль снова выводится 'aboba'.


*/ //сначала выполнит что внутри
}
{
	function params(obj) {
		obj = {
			prop: 5,
		};
		return obj.prop;
	}
	const obj = {
		prop: 4,
	};

	console.log(params(obj)); //5
	console.log(obj.prop); //4

	//Параметр obj функции params — это копия ссылки на объект obj, переданный извне.//В JavaScript аргументы функций передаются по значению для примитивов и по ссылке для объектов. Однако, если вы перезаписывайте переменную obj внутри функции, это не влияет на исходный объект, переданный в функцию
}
{
	function params(obj) {
		obj.prop = 56;
		obj = {
			prop: 5,
		};

		return obj.prop;
	}
	const obj = {
		prop: 4,
	};
	console.log(params(obj));
	console.log(obj.prop);
} //56
/*Сначала изменяется свойство внешнего объекта ({ prop: 4 } → { prop: 56 }).

Затем создаётся новый объект ({ prop: 5 }), и переменная obj начинает ссылаться на него.

Внешний объект уже был изменён, но новый объект нигде не используется вне функции.

Передача объекта в функцию:

В функцию params передаётся ссылка на внешний объект obj (который имеет свойство prop: 4).

Внутри функции переменная obj сначала ссылается на внешний объект.

Изменение внешнего объекта:

Выполняется obj.prop = 56;. Это изменяет свойство prop внешнего объекта ({ prop: 4 }) на 56.

Перезапись ссылки внутри функции:

Затем выполняется obj = { prop: 5 };. Теперь переменная obj ссылается на новый объект { prop: 5 }.

Внешний объект ({ prop: 56 }) уже был изменён, но теперь obj ссылается на новый объект.

Возврат значения:

Функция возвращает obj.prop, то есть 5. Однако это значение нигде не используется*/
{
	function params(obj) {
		obj = {
			prop: 5,
		};
		obj.prop = 56;
		return obj.prop;
	}

	const obj = {
		prop: 4,
	};

	params(obj);
	console.log(obj.prop); /* Вывод: 4
Что происходит:
Передача объекта в функцию:

В функцию params передаётся ссылка на внешний объект obj (который имеет свойство prop: 4).

Внутри функции переменная obj сначала ссылается на внешний объект.

Перезапись ссылки внутри функции:

Выполняется obj = { prop: 5 };. Теперь переменная obj ссылается на новый объект { prop: 5 }.

Внешний объект ({ prop: 4 }) не изменяется, потому что ссылка на него была перезаписана.

Изменение нового объекта:

Выполняется obj.prop = 56;. Это изменяет свойство prop нового объекта ({ prop: 5 }) на 56.

Возврат значения:

Функция возвращает obj.prop, то есть 56. Однако это значение нигде не используется, так как результат функции не сохраняется.

Вывод console.log(obj.prop):

Внешний объект obj не был изменён, поэтому obj.prop остаётся равным 4.


*/
}
{
	const obj = {
		a: 3,
	};
	const obj2 = {
		obj, // Эквивалентно obj: obj
		b: 4,
	};
	let objCopy = Object.assign({}, obj2);
	console.log(objCopy);
	obj2.obj.a = 4;
	console.log(objCopy.obj.a); //4
	console.log(obj.a); //4

	//Поскольку obj2.obj и obj ссылаются на один и тот же объект, изменение этого объекта через одну из ссылок повлияет на обе. /* В вашем коде obj.a не изменяется напрямую. Вы изменяете obj2.obj.a, что влияет на objCopy.obj.a, но не на obj.a.
}
/*
obj, // Эквивалентно obj: obj
// Теперь obj2 выглядит так:
{
    obj: { a: 3 }, // Вложенный объект
    b: 4,
Вложенный объект — это объект, который является значением свойства другого объекта. В вашем случае
В памяти создаётся объект { a: 3 }, и переменная obj ссылается на него.
Свойство obj в obj2 не содержит копию объекта obj, а содержит ссылку на тот же объект, на который ссылается переменная obj.

*/
const obj = {
	a: 3,
};

const obj2 = {
	obj, // Вложенный объект
	b: 4,
};

// Глубокая копия с использованием structuredClone
let objCopy = structuredClone(obj2);

console.log(objCopy);

obj2.obj.a = 4; // Изменяем свойство вложенного объекта в obj2
console.log(objCopy.obj.a); // 3 - это отдельный объект который не меняли
console.log(obj.a); //4
