/*Создайте функцию validateForm(data), которая:

Проверяет объект с полями email, password

Собирает ВСЕ ошибки (не только первую)

Бросает агрегированную ошибку, если есть хотя бы одна*/ {
	function validateForm(data) {
		const errors = [];
		if (!data.email.includes('@')) {
			errors.push('Invalid email');
		}
		if (data.password.length < 8) {
			errors.push('Password too short');
		}
		if (errors.length > 0) {
			throw new Error(`Validation failed:  ${errors.join(', ')}`);
		}
	}

	///testim

	try {
		validateForm({ email: 'test', password: '123' });
	} catch (e) {
		console.log(e.message); //Validation failed:  Invalid email, Password too short
		console.log(e.name); //Error
	}
}

/*Напишите функцию safeCall(fn, ...args), которая:

Вызывает переданную функцию с аргументами

Перехватывает ЛЮБЫЕ ошибки

Возвращает объект { result, error }

*/
{
	function safeCall(fn, ...args) {
		//упаковываем аргументы
		try {
			return {
				result: fn(...args), //распаковываем аргументы
			};
		} catch (e) {
			return { error: e };
		}
	}
	const { result, error } = safeCall(JSON.parse, '{invalidValue}');
	console.log(result, error); //undefined SyntaxError: Expected property
}
/*...args в параметрах → упаковываем аргументы в массив

...args при вызове → распаковываем массив в аргументы

*/
{
	try {
		setTimeout(() => {
			console.log('dd');
			dfdfg;
		}, 1000);
	} catch (e) {
		throw new SyntaxError();
	}
	//try/catch ловит только синхронные ошибки в текущем потоке выполнения

	//setTimeout проходит код и отрабатывает после блоков кетч и трай
	//
}
{
	setTimeout(() => {
		try {
			console.log('dd');
			dfdfg;
		} catch (e) {
			console.log(e);
		}
	}, 1000);
}
/*Задача: Валидация и обработка пользовательских данных
Условие:

Нужно обработать данные пользователя (JSON)

Проверить обязательные поля

Преобразовать email к нижнему регистру

Сохранить в базу данных

На каждом этапе возможны разные типы ошибок

*/
{
	function 
}