/*Создайте функцию fetchWithTimeout(url, timeout), которая:
Делает fetch-запрос
Отклоняет промис с ошибкой new Error('Timeout'), если ответ не пришел за указанное время
Работает с любым API
*/

{
	function fetchWithTimeout(url, timeout) {
		return Promise.race([
			fetch(url),
			new Promise((resolve, reject) => {
				setTimeout(() => reject(new Error('Timeout')), timeout);
			}),
		]);
	}
	// Использование
	fetchWithTimeout('https://api.publicapis.org/entries', 3000)
		.then(response => response.json())
		.catch(err => {
			if (err.message === 'Timeout') {
				console.log('ошибка: время истекло');
			} else {
				console.log('ошибка сети');
			}
		});
}
/*Есть массив URL и функция processUrl(url), возвращающая промис.
Реализуйте функцию processInBatches(urls, batchSize), которая:
Обрабатывает URL пачками указанного размера
Новая пачка начинается только после завершения предыдущей
Возвращает массив результатов в исходном порядке*/

{
	const urls = [
		'https://jsonplaceholder.typicode.com/posts/1',
		'https://jsonplaceholder.typicode.com/posts/2',
		'https://jsonplaceholder.typicode.com/posts/3',
	];
	function processUrl(url) {
		return fetch(url).then(response => response.json());
	}
	async function processInBatches(urls, batchSize) {
		const results = [];
		for (let i = 0; i < urls.length; i += batchSize) {
			const batch = urls.slice(i, i + batchSize);
			const batchRes = await Promise.all(batch.map(url => processUrl(url)));
			results.push(...batchRes);
		}
		return results;
	}
}
/*Методы массива  не понимают промисы

Они выполняют callback для каждого элемента синхронно, не дожидаясь завершения асинхронных операций
*/
/*Promise.all возвращает промис сразу, не дожидаясь выполнения

results.push(...batchRes) пытается развернуть промис как массив (ошибка)
Цикл продолжает работать не дожидаясь завершения запросов
надо с С async/await

/*Создайте функцию retry(fn, retries, delay), которая:
Пытается выполнить асинхронную функцию fn
При ошибке повторяет попытку через указанный delay (мс)
Прекращает после retries неудачных попыток
Использует экспоненциальный бекофф (удваивает задержку)
*/
{
	function retry(fn, retries, delay) {
		let attempts = 1;
		return fn()
			.then(res => {
				return res;
			})
			.catch(err => {
				if (attempts <= retries) {
					attempts++;
					return new Promise(resolve =>
						setTimeout(() => {
							resolve(retry(fn, retries - 1, delay * 2));
						}, delay)
					);
				} else {
					return Promise.reject(err);
				}
			});
	}
}
/*Реализуйте класс PromisePool для управления количеством одновременных промисов:
Конструктор принимает maxConcurrent
Метод add(task) добавляет задачу (функцию, возвращающую промис)
Задачи выполняются не более maxConcurrent одновременно
*/

{
	class PromisePool {
		constructor(maxConcurrent = 5) {
			this.maxConcurrent = maxConcurrent;
			this.count = 0;
			this.queue = [];
		}

		add(task) {
			return new Promise((resolve, reject) => {
				const wrappedTask = () => {
					this.count++;
					task()
						.then(resolve)
						.catch(reject)
						.finally(() => {
							this.count--;
							this._next();
						});
				};

				if (this.count < this.maxConcurrent) {
					wrappedTask();
				} else {
					this.queue.push(wrappedTask);
				}
			});
		}

		_next() {
			if (this.count < this.maxConcurrent && this.queue.length > 0) {
				const task = this.queue.shift();
				task();
			}
		}
	}
}
/*/**
 * Функция делает параллельные запросы к разным API
 * и возвращает:
 * - массив успешных результатов в порядке вызовов
 * - первую ошибку, если все запросы провалились
 */
{
	function queris(urls) {
		return Promise.allSettled(urls.map(url => fetch(url))).then(res => {
			let succesful = res.filter(elem => elem.status === 'fulfilled');
			if (succesful.length > 0) {
				return succesful.map(r => r.value);
			} else {
				const firstError = res.find(elem => elem.status === 'rejected');
				throw firstError;
			}
		});
	}
}
/* * Функция выполняет запросы последовательно,
 * но если запрос падает, ждет указанную задержку
 * перед следующим вызовом. Возвращает первый успешный результат*/
{
	async function queris(urls, delay) {
		for (let i of urls) {
			try {
				const response = await fetch(i);
				if (!response.ok) {
					throw new Error(`HTTP error! status ${response.status}`);
				} else {
					return await response.json();
				}
			} catch (e) {
				console.error(`Ошибка при запросе к ${url}, ${e.message}`);
				await new Promise(resolve => setTimeout(resolve, delay));
			}
		}
		throw new Error('Все запросы провалились');
	}
}
