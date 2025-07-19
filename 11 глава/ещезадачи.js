/*Создайте иерархию ошибок для HTTP-запросов:

javascript
class ApiError extends Error {
  constructor(url, ...params) {
    super(...params);
    this.url = url;
    this.name = "ApiError";
  }
}

class NotFoundError extends ApiError { /* добавьте statusCode = 404  }
class TimeoutError extends ApiError { /* добавьте timeout = 5000 *}*/
{
	class ApiError extends Error {
		constructor(url, ...params) {
			super(...params);
			this.url = url;
			this.name = this.constructor.name;
		}
	}
	class NotFoundError extends ApiError {
		constructor(url, message = 'NotFound') {
			super(url, message);

			this.statusCode = 404;
		}
	}
	class TimeoutError extends ApiError {
		constructor(url, message = 'Request timeout', timeout = 5000) {
			super(url, message);
			this.timeout = timeout;
		}
	}

	function fetchAll(url, timeout = 5000) {
		return Promise.race([
			new Promise(resolve, reject =>
				setTimeout(() => reject(new TimeoutError(url)), timeout)
			),
			fetch(url).then(async res => {
				let data = await res.json();
				if (res.status == 404) {
					throw new NotFoundError(url);
				} else if (!res.ok) {
					throw new ApiError(url);
				}
				return data;
			}),
		]);
	}
}
/*then() принимает функцию, которая возвращает промис
Любая async функция автоматически возвращает промис, поэтому это полностью валидно:
 и вообзе вместо промис рейс ессть  Альтернатива с явным AbortController
*/
//Задача 2. Преобразование колбэков

/*
Напишите функцию promisify(fn), которая преобразует
функцию с колбэком в стиле (err, data) в промис*/
{
	function promisify(fn) {
		return function (...args) {
			return new Promise((resolve, reject) => {
				args.push((err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
			fn(...args);
		};
	}
}
//Колбэк должен быть последним аргументом в исходной функции.
/*
4. Асинхронный парсинг JSON
Создайте функцию parseJsonAsync(jsonString), которая:
Возвращает Promise
Через setTimeout симулирует асинхронный парсинг
При успехе резолвит распарсенный объект
При ошибке парсинга rejects с SyntaxError
Добавьте обработку через try/catch с async/await
Тесты:

await parseJsonAsync('{"valid": true}');  // { valid: true }
await parseJsonAsync('{invalid}');       // SyntaxError*/
{
	function parseJsonAsync(jsonString, ms) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					JSON.parse(jsonString);
					console.log(jsonString);
					resolve(jsonString);
				} catch (e) {
					reject(new SyntaxError(e.message));
				}
			}, ms);
		});
	}
	// Пример использования с async/await
	async function testym() {
		try {
			await parseJsonAsync('{"valid": true}', 100);
			await parseJsonAsync('{invalid"}', 200);
		} catch (e) {
			console.error('Поймали ошибку:', e.message); // Исправлено на латинскую 'e'
		}
	}
	testym();
}
//parseJsonAsync('{"valid": true}').then(res => console.log(res));  бкез асинка

/*5. Ошибки в цепочке Promise
Реализуйте цепочку из 3 промисов, где:
Первый промис создает случайное число 0-5
Если число < 3, второй промис падает с ValueTooSmallError
Третий промис преобразует число в строку
Добавьте .catch() для конкретной ошибки и общий обработчик

executeChain()
  .then(console.log)
  .catch(e => console.error(e.name));  // ValueTooSmallError или другие
*/
{
	let a = new Promise((resolve, reject) => {
		let random = Math.floor(Math.random() * (5 - 0));
		resolve(random);
	})
		.then(res => {
			if (res < 3) {
				throw new ValueTooSmallError();
			} else {
				return res;
			}
		})
		.then(res => {
			return String(res);
		})
		.catch(e => console.error(e));
}
/*1. Последовательные HTTP-запросы
Условие:
Напишите функцию, которая последовательно выполняет 3 HTTP-запроса к разным URL и возвращает массив результатов в том же порядке, что и URL. Обрабатывайте каждый запрос через await, чтобы они выполнялись строго один за другим.*/
{
	async function queries(...urls) {
		let results = [];
		for (let i of urls) {
			let response = await fetch(i);
			let data = await response.json();
			results.push(data);
		}
		return results;
	}
}
/*for..of + await = последовательность (как очередь в магазине)

map + Promise.all = параллельность (как одновременная готовка на нескольких плитах)

*/
// через мап параллельные
{
	async function queries(...urls) {
		const promises = urls.map(async elem => {
			const response = await fetch(elem);
			return response.json();
		});
		return await Promise.all(promises);
	}
}
/*map мгновенно создаёт массив из async функций

Каждая async функция возвращает промис сразу (до выполнения await)

Без Promise.all вы получаете непереданные промисы, а не их результаты Без await/.then() вы получите Promise<pending> без данных.
*/
/*
2. Таймер с прогрессом
Условие:
Создайте функцию countdown(seconds), которая каждую секунду выводит в консоль оставшееся время (начиная с seconds до 0). В конце выведите "Время вышло!". Используйте await для пауз между обновлениями.*/
{
	async function countdown(seconds) {
		for (let i = seconds; i >= 0; i--) {
			if (i > 0) {
				await new Promise(resolve =>
					setTimeout(() => {
						console.log(i);
						resolve();
					}, 1000)
				);
			} else {
				console.log('Время вышло');
			}
		}
	}
	countdown(3);
}
{
	function countdown(seconds) {
		let time = seconds;
		for (let i = 0; i <= seconds; i++) {
			setTimeout(() => {
				console.log(time);
				time--;
				if (time === 0) {
					console.log('Время вышло!');
				}
			}, i * 1000);
		}
	}
	countdown(5);
}
{
	function countdown(seconds) {
		return new Promise(resolve => {
			let time = seconds;
			function tick() {
				if (time > 0) {
					--time;
					console.log(time);
					setTimeout(tick, 1000);
				} else if (time === 0) {
					resolve(console.log('Время вышло!'));
				}
			}
			tick();
		});
	}
}
/*3. Параллельные запросы с обработкой ошибок
Условие:
Реализуйте функцию, которая:

Выполняет 3 HTTP-запроса параллельно

Если какой-то запрос завершается ошибкой — возвращает для него объект с ошибкой (вместо прерывания всей операции)

Возвращает массив результатов в исходном порядке <URL></URL>*/
{
	async function querris(...urls) {
		let response = urls.map(elem =>
			fetch(elem)
				.then(res => {
					if (!res.ok) {
						throw new Error(`error ${res.status}`);
					} else {
						return res.json();
					}
				})
				.catch(e => {
					return { e: e.message, url };
				})
		);
		return await Promise.all(response);
	}
}

{
	async function fetchWithTimeout(url, timeout) {
		return new Promise.race([
			fetch(url),
			new Promise(reject => {
				setTimeout(() => {
					reject(new Error('timeout'));
				}, timeout);
			}),
		]).catch(e => console.log(e));
	}
}
