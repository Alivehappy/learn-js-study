//есть синтаксическая конструкция try..catch, которая позволяет «ловить» ошибки и вместо падения делать что-то более осмысленное.
//Если же в нём возникает ошибка, то выполнение try прерывается, и поток управления переходит в начало catch(err). Переменная err (можно использовать любое имя) содержит объект ошибки с подробной информацией о произошедшем.
{
	try {
		console.log('Начало блока try');
		lazy; //ошибка, переменная не определена
		console.log('Конец блока try (никогда не выполнится)');
	} catch (err) {
		console.log('Возникла ошибка');
	}
}
//try..catch работает только для ошибок, возникающих во время выполнения кода
//Он не сработает, если код синтаксически неверен, например, содержит несовпадающее количество фигурных скобок:
//Исключение, которое произойдёт в коде, запланированном «на будущее», например в setTimeout, try..catch не поймает:

{
	try {
		setTimeout(function () {
			noSuchVariable; // скрипт упадёт тут
		}, 1000);
	} catch (e) {
		console.log('dont work');
	}
}
//Это потому, что функция выполняется позже, когда движок уже покинул конструкцию try..catch.

//Чтобы поймать исключение внутри запланированной функции, try..catch должен находиться внутри самой этой функции:
{
	setTimeout(function () {
		try {
			noSuchVariable; // try..catch обрабатывает ошибку!
		} catch (e) {
			noSuchVariable; // try..catch обрабатывает ошибку!}
		}
	}, 1000);
}
//Когда возникает ошибка, JavaScript генерирует объект, содержащий её детали. Затем этот объект передаётся как аргумент в блок catch:
//catch(err) { // <-- объект ошибки, можно использовать другое название вместо err
/*name
Имя ошибки. Например, для неопределённой переменной это "ReferenceError".
message
Текстовое сообщение о деталях ошибки.
stack
Текущий стек вызова: строка, содержащая информацию о последовательности вложенных вызовов, которые привели к ошибке. Используется в целях отладки.

*/
{
	try {
		lazy;
	} catch (err) {
		console.log(err.name); //ReferenceError
		console.log(err.message); //lazy is not defined
		console.log(err.stack); //ReferenceError lazy is not at (...стек вызовов)
		// Можем также просто вывести ошибку целиком
		// Ошибка приводится к строке вида "name: message"
		alert(err); // ReferenceError: lalala is not defined
	}
}
{
	let json = '{некорректный JSON}';
	try {
		let user = JSON.parse(json); //тут возникает ошибка...
		alert(user.name); // не сработает
	} catch (e) {
		// ...выполнение прыгает сюда
		alert('Извините, в данных ошибка, мы попробуем получить их ещё раз.');
		alert(e.name);
		alert(e.message);
	}
}

//Оператор throw генерирует ошибку.
//Технически в качестве объекта ошибки можно передать что угодно. Это может быть даже примитив, число или строка, но всё же лучше, чтобы это был объект, желательно со свойствами name и message (для совместимости со встроенными ошибками
//Для встроенных ошибок (не для любых объектов, только для ошибок), свойство name – это в точности имя конструктора. А свойство message берётся из аргумента.

{
	let error = new Error('Ого, ошибка! o_O');
	console.log(error.name); //Error
	console.log(error.message); //Ого, ошибка! o_O
}

{
	let json = '{"age": 3}'; //// данные неполны
	try {
		let user = JSON.parse(json);
		if (!user.name) {
			throw new SyntaxError('Данные неполны: нет имени');
		}
	} catch (e) {
		if (e.name == 'SyntaxError') {
			console.log(object);
		}
	}
}

{
	function readDate() {
		try {
			let json = '{"age": 30 }';
			let user = JSON.parse(json);
			blabla(); // ошибка!
		} catch (e) {
			if (!user.name) {
				throw new SyntaxError('Данные неполны: нет имени');
			} else if (e.name !== 'SyntaxError') {
				throw e; //// проброс исключения (не знаю как это обработать)
			}
		}
	}

	try {
		readDate();
	} catch (e) {
		console.log('Внешний catch поймал' + e);
	}
}
//Внешний catch поймалSyntaxError: Данные неполны: нет имени
//Переменные внутри try..catch..finally локальны

/*window.onerror = function(message, url, line, col, error) {
...
message
Сообщение об ошибке.
url
URL скрипта, в котором произошла ошибка.
line, col
Номера строки и столбца, в которых произошла ошибка.
error
Объект ошибки.*/
{
	class Error {
		constructor(message) {
			this.message = message;
			this.name = 'Error'; // (разные имена для разных встроенных классов ошибок)
			this.stack; // = <стек вызовов>; // нестандартное свойство, но обычно поддерживается
		}
	}
	class ValidationError extends Error {
		constructor(message) {
			super(message);
			this.name = 'ValidationError';
		}
	}
	function test() {
		throw new ValidationError('Упс');
	}
	try {
		test();
	} catch (err) {
		alert(err.message); // Упс!
		alert(err.name); // ValidationError
		alert(err.stack); // список вложенных вызовов с номерами строк для каждого
	}
}

{
	class ValidationError extends Error {
		constructor(message) {
			super(message);
			this.name = 'ValidationError';
		}
	}
	function readUser(json) {
		let user = JSON.parse(json);
		if (!user.age) {
			throw new ValidationError('Нет поля: age');
		}
		if (!user.name) {
			throw new ValidationError('Нет поля: name');
		}
		return user;
	}
	//// Рабочий пример с try..catch

	try {
		let user = readUser('{ "age": 25 }');
	} catch (err) {
		if (err instanceof ValidationError) {
			console.log('Некорректные данные' + err.message);
		} else if (err instanceof SyntaxError) {
			console.log('JSON Ошибка Синтаксиса' + err.message);
		} else {
			throw err; // неизвестная ошибка, пробросить исключение (**)
		}
	}
}
//Блок try..catch в коде выше обрабатывает и нашу ValidationError, и встроенную SyntaxError из JSON.parse
//Мы можем также проверить тип, используя err.name:
//} else if (err.name == "SyntaxError") { // (*)
{
	class ValidationError extends Error {
		constructor(message) {
			super(message);
			this.name = 'ValidationError';
		}
	}

	class PropertyRequiredError extends ValidationError {
		constructor(property) {
			this.name = 'PropertyRequiredError';
			this.property = property;
		}
	}
	// Применение
	function readUser(json) {
		let user = JSON.parse(json);

		if (!user.age) {
			throw new PropertyRequiredError('age');
		}
		if (!user.name) {
			throw new PropertyRequiredError('name');
		}

		return user;
	}
	try {
		let user = readUser('{ "age": 25 }');
	} catch (err) {
		if (err instanceof ValidationError) {
			alert('Неверные данные: ' + err.message); // Неверные данные: Нет свойства: name
			alert(err.name); // PropertyRequiredError
			alert(err.property); // name
		} else if (err instanceof SyntaxError) {
			alert('Ошибка синтаксиса JSON: ' + err.message);
		} else {
			throw err; // неизвестная ошибка, повторно выбросит исключение
		}
	}
}
//Сообщение для пользователя message генерируется конструктором.
//this.name = this.constructor.name;
//MyError.prototype.constructor.name;
{
	class ReadError extends Error {
		conctructor(message, cause) {
			super(mesage);
			this.cause = cause;
			this.name = 'ReadError';
		}
	}
	class ValidationError extends Error {}
	class PropertyRequiredError extends ValidationError {}
	function validateUser(user) {
		if (!user.age) {
			throw new PropertyRequiredError('age');
		}

		if (!user.name) {
			throw new PropertyRequiredError('name');
		}
	}
	function readUser(json) {
		let user;

		try {
			user = JSON.parse(json);
		} catch (err) {
			if (err instanceof SyntaxError) {
				throw new ReadError('Синтаксическая ошибка', err);
			} else {
				throw err;
			}
		}
		try {
			validateUser(user);
		} catch (err) {
			if (err instanceof ValidationError) {
				throw new ReadError('Ошибка валидации', err);
			}
			ReadError('Ошибка валидации', err);
		}
	}
	try {
		readUser('{bad json}');
	} catch (e) {
		if (e instanceof ReadError) {
			alert(e);
			// Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
			alert('Исходная ошибка: ' + e.cause);
		} else {
			throw e;
		}
	}
}
