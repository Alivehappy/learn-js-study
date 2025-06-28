/*Напишите функцию fetchWithRetry, которая:
Делает GET-запрос через fetch(url)
Если сервер возвращает статус 500-599, повторяет запрос 1 раз
При повторной ошибке — пробрасывает её дальше
Для других ошибок (404, сетевые) — сразу пробрасывает*/
{
	function fetchWithRetry() {
		let repeatCount = 0;

		return fetch(url)
			.then(response => {
				if (response.ok) {
					console.log(`{Запрос успешен}: ${response.status}`);
					return response;
				}
				if (
					response.status >= 500 &&
					response.status <= 599 &&
					repeatCount < 1
				) {
					console.log(`Ошибка на стороне сервера: ${response.status}`);

					++repeatCount;
					// Второй запрос при 500-599 ошибке
					return fetch(url).then(secondResponse => {
						if (secondResponse.ok) {
							return secondResponse;
						}
						throw new Error(`HTTP error: ${secondResponse.status}`);
					});
				} else {
					throw new Error(`HTTP error ${response.status}`);
				}
			})
			.catch(err => {
				if (err instanceof TypeError) {
					console.log('Сетевая ошибка:', err.message); //ошибка соединения
					//Не имеет HTTP-статуса (ошибка происходит ДО получения ответа)
				}
				throw err; //ошибка на стороне клиента
			});
	}
}
/*200-299: Успешное выполнение бизнес-логики

400-499: Клиент прислал недопустимые данные

500-599: Сервер не смог обработать корректный запрос

*/
/*Создайте функцию delay(ms), которая возвращает промис, разрешающийся через ms миллисекунд.
Используйте её, чтобы вывести в консоль:
"Start" (сразу)
"Middle" (через 1 секунду),
"End" (ещё через 2 секунды).

*/
{
	function delay(ms) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, ms);
		});
	}
	console.log('Start'); // Выводим сразу

	delay(2000)
		.then(result => {
			setTimeout(() => {
				console.log('Middle');
			}, 1000);
			return delay();
		})
		.then(result => {
			setTimeout(() => {
				console.log('End');
			}, 2000);
		});
}
//Новый промис создаётся только в функции delay(). В цепочке мы просто возвращаем результат вызова delay():

/*Создайте класс ValidationError, наследуемый от Error.
Напишите функцию validateNumber(num), которая:
Возвращает Promise.resolve(num), если num — число.
Возвращает Promise.reject с ValidationError, если num не число.
Вызовите её и обработайте ошибку.
*/

{
	class ValidationError extends Error {
		constructor(message) {
			super(message);
			this.name = this.constructor.name;
		}
	}
	function validateNumber(num) {
		return new Promise((resolve, reject) => {
			if (typeof num === 'number' && !isNaN(num)) {
				resolve(num);
				return; // Явно прерываем выполнение
			}
			reject(new ValidationError(`${num} не число`));
		})
			.then(num => {
				console.log('успешно обработано - в параметре число');
				return num; //для дргих обработчиков для цепочки
			})
			.catch(err => {
				console.log('У меня нет идей, как ее обработать:', err.message);
				throw err; //Пробрасываем ошибку дальше
			});
	}
	validateNumber('10').then(
		result => {
			console.log('Успех', result);
		},
		error => {
			if (error instanceof ValidationError) {
				console.log(error.message);
			} else {
				console.log('Другая ошибка:", error');
			}
		}
	);
}
