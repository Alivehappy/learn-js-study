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
Напишите функцию, которая последовательно выполняет 3 HTTP-запроса к разным URL и возвращает массив результатов в том же порядке, что и URL. Обрабатывайте каждый запрос через await, чтобы они выполнялись строго один за другим.

2. Таймер с прогрессом
Условие:
Создайте функцию countdown(seconds), которая каждую секунду выводит в консоль оставшееся время (начиная с seconds до 0). В конце выведите "Время вышло!". Используйте await для пауз между обновлениями.

3. Параллельные запросы с обработкой ошибок
Условие:
Реализуйте функцию, которая:

Выполняет 3 HTTP-запроса параллельно

Если какой-то запрос завершается ошибкой — возвращает для него объект с ошибкой (вместо прерывания всей операции)

Возвращает массив результатов в исходном порядке URL

4. Ограничение времени выполнения
Условие:
Напишите функцию fetchWithTimeout(url, timeout), которая:

Делает HTTP-запрос к url

Отменяет запрос и выбрасывает ошибку, если ответ не получен за timeout мс

Использует AbortController для отмены

5. Цепочка зависимых операций
Условие:
Создайте функцию, которая:

Получает данные пользователя по ID

Для этого пользователя получает список его постов

Для первого поста получает комментарии

Возвращает объект { user, posts, comments }

Все запросы должны выполняться последовательно через await.

/