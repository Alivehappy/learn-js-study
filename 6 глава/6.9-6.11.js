function slow(x) {
	alert(`called with ${x}`); // здесь могут быть ресурсоёмкие вычисления
	return x;
}
function cachingDecorator(func) {
	let cashe = new Map();
	return function (x) {
		if (cashe.has(x)) {
			return cashe.get(x);
		}
		let result = func(x);
		cashe.set(x, result); // и кешируем (запоминаем) результат
		return result;
	};
}
slow = cachingDecorator(slow);
/*cachingDecorator(slow) возвращает новую функцию-обёртку (с кешированием).

*/
alert(slow(1)); // slow(1) кешируем
alert('Again: ' + slow(1));
const result = cachingDecorator(slow);
console.log(result); // ƒ (x) { ... }
// возвращаем из кеша
/*cachingDecorator – это декоратор, специальная функция, которая принимает другую функцию и изменяет её поведение мы можем вызвать cachingDecorator с любой функцией, в результате чего мы получим кеширующую обёртку. */
//Упомянутый выше кеширующий декоратор не подходит для работы с методами объектов.
//декоратор передаёт вызов оригинальному методу, но без контекста. Следовательно – ошибка.

//Существует специальный встроенный метод функции func.call(context, …args), который позволяет вызывать функцию, явно устанавливая this.
//func.call(context, arg1, arg2)
/*Он запускает функцию func, используя первый аргумент как её контекст this, а последующие – как её аргументы.
func(1, 2, 3);
func.call(obj, 1, 2, 3)
отличие состоит в том, что func.call ещё и устанавливает this равным obj.



*/
{
	function sayHi() {
		alert(this.name);
	}
	let user = { name: 'John' };
	let admin = { name: 'Admin' };
	// используем 'call' для передачи различных объектов в качестве 'this'

	sayHi.call(user); // John

	sayHi.call(admin); // Admin
}
//Здесь мы используем call для вызова say с заданным контекстом и фразой:

function say(phrase) {
	alert(this.name + ':' + phrase);
}
let user = { name: 'John' };

// 'user' становится 'this', и "Hello" становится первым аргументом
say.call(user, Hello); // John: Hello
{
	let worker = {
		someMethod() {
			return 1;
		},
		slow(x) {
			alert('Called with ' + x);
			return x * this.someMethod();
		},
	};
	function cachingDecorator(func) {
		let cache = new Map();
		return function (x) {
			if (cache.has(x)) {
				return cache.get(x);
			}
			let result = func.call(this, x);
			cache.set(x, result);
			return result;
		};
	}
	worker.slow = cachingDecorator(worker.slow);
	alert(worker.slow(2)); // работает
	alert(worker.slow(2)); // работает, не вызывая первоначальную функцию (кешируется)
}
//После декорации worker.slow становится обёрткой function (x) { ... }.
/*Так что при выполнении worker.slow(2) обёртка получает 2 в качестве аргумента и this=worker (так как это объект перед точкой).
Внутри обёртки, если результат ещё не кеширован, func.call(this, x) передаёт текущий this (=worker) и текущий аргумент (=2) в оригинальную функцию.*/
{
	let worker = {
		slow(min, max) {
			return min + max;
		},
	};
	function cachingDecorator(func, hash) {
		let cache = new Map();
		return function () {
			let key = hash(arguments);
			if (cache.has(key)) {
				return cache.get(key);
			}
			let result = func.call(this, ...arguments);
			cache.set(key, result);
			return result;
		};
	}
	function hash(args) {
		return args[0] + ',' + args[1];
	}

	// будет кешировать вызовы с одинаковыми аргументами
	worker.slow = cachingDecorator(worker.slow, hash);
	alert(worker.slow(3, 5)); // работает
	alert('Again ' + worker.slow(3, 5)); // аналогично (из кеша)
}
/*вызываем hash для создания одного ключа из arguments. Здесь мы используем простую функцию «объединения», которая превращает аргументы (3, 5) в ключ "3,5". В более сложных случаях могут потребоваться другие функции хеширования.
Затем в строке (**) используем func.call(this, ...arguments) для передачи как контекста, так и всех аргументов, полученных обёрткой (независимо от их количества), в исходную функцию.
Вместо func.call(this, ...arguments) мы могли бы написать func.apply(this, arguments).

func.apply(context, args)
/*Он выполняет func, устанавливая this=context и принимая в качестве списка аргументов псевдомассив args.
Единственная разница в синтаксисе между call и apply состоит в том, что call ожидает список аргументов, в то время как apply принимает псевдомассив
func.call(context, ...args); // передаёт массив как список с оператором расширения
func.apply(context, args);   // тот же эффект
Оператор расширения ... позволяет передавать перебираемый объект args в виде списка в call.
А apply принимает только псевдомассив args.

*/
/*Передача всех аргументов вместе с контекстом другой функции называется «перенаправлением вызова» (call forwarding).

*/

let wrapper = function () {
	return func.apply(this, arguments);
};
//есть простой способ использовать соединение массива:

{
	function hash() {
		alert([].join.call(arguments));
	}
	hash(1, 2);
	//arguments.join не является функцией
	// так как у пседомасива arguments нет методов массива
}
/*Этот трюк называется заимствование метода.

Мы берём (заимствуем) метод join из обычного массива [].join. И используем [].join.call, чтобы выполнить его в контексте arguments.

*/
//Декоратор – это обёртка вокруг функции, которая изменяет поведение последней. Основная работа по-прежнему выполняется функцией.
/*Как только метод передаётся отдельно от объекта – this теряется.

Вот как это может произойти в случае с setTimeout:

*/ {
	let user = {
		firstName: 'Вася',
		sayHi() {
			alert(`Привет, ${this.firstName}!`);
		},
	};
	setTimeout(user.sayHi, 1000); // Привет, undefined!
}
/*Это произошло потому, что setTimeout получил функцию sayHi отдельно от объекта user (именно здесь функция и потеряла контекст). То есть последняя строка может быть переписана как:

*/
let f = user.sayHi;
setTimeout(f, 1000); // контекст user потеряли
/*Метод setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции (в Node.js this становится объектом таймера, но здесь это не имеет значения). Таким образом, для this.firstName он пытается получить window.firstName, которого не существует. В других подобных случаях this обычно просто становится undefined.

*/
{
	let user = {
		firstName: 'Вася',
		sayHi() {
			alert(`Привет, ${this.firstName}!`);
		},
	};
	setTimeout(function () {
		user.sayHi();
	}, 1000);
}
//В setTimeout вы передаете анонимную функцию function() { user.sayHi(); }, а не результат её вызова.
//Внутри анонимной функции вы явно вызываете user.sayHi().
//Это означает, что метод sayHi вызывается как метод объекта user, и this внутри sayHi ссылается на user.
{
	setTimeout(() => user.sayHi(), 1000);
}
/*Что произойдёт, если до момента срабатывания setTimeout (ведь задержка составляет целую секунду!) в переменную user будет записано другое значение? Тогда вызов неожиданно будет совсем не тот!

*/ {
	let user = {
		firstName: 'Вася',
		sayHi() {
			alert(`Привет, ${this.firstName}!`);
		},
	};

	setTimeout(() => user.sayHi(), 1000);
	// ...в течение 1 секунды\
	user = {
		sayHi() {
			alert("Другой пользователь в 'setTimeout'!");
		},
	};
}
//В современном JavaScript у функций есть встроенный метод bind, который позволяет зафиксировать this.

let boundFunc = func.bind(context);
//Результатом вызова func.bind(context) является особый «экзотический объект» (термин взят из спецификации), который вызывается как функция и прозрачно передаёт вызов в func, при этом устанавливая this=context.
//Другими словами, вызов boundFunc подобен вызову func с фиксированным this
{
	let user = {
		firstName: 'Vasya',
	};
	function func() {
		alert(this.firstName);
	}
	let funcUser = func.bind(user);
	funcUser(); //Vasya
	console.log(func()); //undefined
}

{
	let user = {
		firstName: 'Вася',
		sayHi() {
			alert(`Привет, ${this.firstName}!`);
		},
	};

	let sayHi = user.sayHi.bind(user);
	sayHi();
	setTimeout(sayHi, 1000);
}
//Если у объекта много методов и мы планируем их активно передавать, то можно привязать контекст для них всех в цикле:

for (let key in user) {
	if (typeof user[key] == 'function') {
		(user[key] = user[key]), bind(user);
	}
}
/*Полный синтаксис bind:

let bound = func.bind(context, [arg1], [arg2], ...);
*/
function mul(a, b) {
	return a * b;
}
let double = mul.bind(null, 2);
console.log(double(4));
let tripple = mul.bind(null, 3);
//Польза от этого в том, что возможно создать независимую функцию с понятным названием (double, triple). Мы можем использовать её и не передавать каждый раз первый аргумент, т.к. он зафиксирован с помощью bind.

//Это называется частичное применение – мы создаём новую функцию, фиксируя некоторые из существующих параметров
//в данном случае мы на самом деле не используем this. Но для bind это обязательный параметр, так что мы должны передать туда что-нибудь вроде null.

{
	function mul(a, b) {
		return a * b;
	}
	let double = и => mul(2, b);
	double(5);
}

{
	let group = {
		title: 'Our Group',
		students: ['John', 'Pete', 'Alice'],
		showList() {
			this.students.forEach(student => console.log(this.title + ':' + student));
		},
	};
	group.showList();
}
//Здесь внутри forEach использована стрелочная функция, таким образом this.title в ней будет иметь точно такое же значение, как в методе showList: group.title.
//forEach просто вызывает функцию, не устанавливая контекст

{
	let group = {
		title: 'Our Group',
		students: ['John', 'Pete', 'Alice'],

		showList() {
			this.students.forEach(function (student) {
				console.log(this.title + ':' + student);
			});
		},
	};
	group.showList();
}
//Ошибка возникает потому, что forEach по умолчанию выполняет функции с this, равным undefined, и в итоге мы пытаемся обратиться к undefined.title.
{
	function partial(func, ...argsBound) {
		return function (...args) {
			return func.call(this, ...argsBound, ...args);
		};
	}
	let user = {
		firstName: 'John',
		say(time, pharse) {
			console.log(`[${time}] ${this.firstName}: ${phrase}`);
		},
	};
	// добавляем частично применённый метод с фиксированным временем
	user.sayNow = partial(
		user.say,
		new Date().getHours() + ':' + new Date.getMinutes() //// argsBound
	);
	user.sayNow('Hello'); // args
}
{
	function defer(f, ms) {
		return function () {
			setTimeout(() => f.apply(this, arguments), ms);
		};
	}
	function sayHi(who) {
		alert('hello', +who);
	}
	let sayHideferred = defer(sayHi, 2000);
	sayHideferred('John'); // выводит "Hello, John" через 2 секунды
}
{
	function defer(f, ms) {
		return (
			function (...args) {
				let ctx = this;
				setTimeout(function () {
					return f.apply(ctx, args);
				});
			},
			ms
		);
	}
}
