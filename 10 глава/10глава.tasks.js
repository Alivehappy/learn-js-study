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

/*Базовый try/catch с математической операцией
Условие:
Создайте функцию safeDivide(a, b), которая:

Возвращает результат деления a / b

При делении на ноль выбрасывает кастомную ошибку DivisionError
Ошибка должна содержать стандарнтые поля + тамйстамп:

*/
{
	class DivisionError extends Error {
		constructor() {
			super('Division by zero'); //передаю родителю в месаадж
			this.name = this.constructor.name;

			this.timestamp = new Date().toISOString();
		}
	}
	function safeDivide(a, b) {
		try {
			if (b === 0) {
				throw new DivisionError();
			} else {
				return a / b;
			}
		} catch (e) {
			console.error(e, e.timestamp);
			return Infinity;
		} finally {
			console.log('Operation completed');
		}
	}
	console.log(safeDivide(10, 2));

	console.log(safeDivide(10, 0)); //Блок finally выполняется ПЕРЕД возвратом:?
}
/*
2. 
Создайте функцию processTransactions(transactions), которая
Принимает массив транзакций вида { id, amount }
В блоке try:
Проверяет, что все amount > 0 (иначе throws InvalidTransactionError
Вычисляет общую сумму (sum)
Есл sum > 1000, throws LimitExceededError
В блоке catch обрабатывает обе ошибки по-разному
Для InvalidTransactionError возвращает { error: "Invalid transaction", details: error.transactionId }
Для других ошибок возвращает { error: "Failed", reason: error.message }
В finally отправляет аналитику: console.log("Processed at", new Date())
///Вы явно передаёте строку "Мой текст ошибки" в super(), поэтому message заполняется.


*/
{
	class InvalidTransactionError extends Error {
		constructor(transactionId) {
			super(`Invalid transaction ${transactionId}`); //сообщение для базового класса Error //станет Свойством message экземпляра ошибки
			this.transactionId = transactionId;
			this.name = this.constructor.name;
		}
	}
	class LimitExceededError extends Error {
		constructor() {
			super('Limit exceeded');
			this.name = this.constructor.name;
		}
	}

	function processTransactions(transactions) {
		try {
			for (let i of transactions) {
				if (i.amount < 0) {
					throw new InvalidTransactionError(i.id); //передаю айди
				}
			}

			let sum = transactions.reduce((acc, elem) => {
				return (acc += elem.amount);
			}, 0);
			if (sum > 1000) {
				throw new LimitExceededError();
			}
			return sum;
		} catch (e) {
			if (e instanceof InvalidTransactionError) {
				return { error: 'Invalid transaction', details: e.transactionId }; //блок е
			} else {
				return { error: 'Failed', reason: error.message };
			}
		} finally {
			console.log('Processed at', new Date());
		}
	}

	processTransactions([
		{ id: 1, amount: 100 },
		{ id: 2, amount: -50 },
	]);
	// { error: "Invalid transaction", details: 2 }, "Processed at ..."

	processTransactions([{ id: 1, amount: 2000 }]);
	// { error: "Failed", reason: "Limit exceeded" }, "Processed at ..."	}
}
// проброс исключения это когда мы в кетче пишем throw для внешнего трайкетч
/*Техника «проброс исключения» выглядит так:

Блок catch получает все ошибки.
В блоке catch(err) {...} мы анализируем объект ошибки err.
Если мы не знаем как её обработать, тогда делаем throw err.
Проброс исключения – это очень важный приём обработки ошибок: блок catch обычно ожидает и знает, как обработать определённый тип ошибок, поэтому он должен пробрасывать дальше ошибки, о которых он не знает.

try{
} catch(e){
 if(error is not ours){
 throw err}
 }
try{
function n()
catch(err)
}
Когда вы ловите ошибку в catch(err), err - это уже готовый объект ошибки


*/
/*Родитель требует аргументы	Обязательно передавайте в super()
Родитель не требует	Можно super() без аргументов
Наследуетесь от Error	Всегда передавайте message (дефолтное или кастомное)
*/
