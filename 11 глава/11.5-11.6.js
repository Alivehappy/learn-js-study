//Promise.all.
//Допустим, нам нужно запустить множество промисов параллельно и дождаться, пока все они выполнятся.

let promise = Promise.all(iterable);
//Метод Promise.all принимает массив промисов (может принимать любой перебираемый объект, но обычно используется массив) и возвращает новый промис.
//Новый промис завершится, когда завершится весь переданный список промисов, и его результатом будет массив их результатов
//Сохраняет исходный порядок промисов в массиве
{
	Primise.all([
		new Promise(resolve => setTimeout(() => resolve(1), 3000)),
		new Promise(resolve => setTimeout(() => resolve(2), 2000)),
		new Promise(resolve => setTimeout(() => resolve(3), 1000)), // 3
	]).then(alert);
}
//// когда все промисы выполнятся, результат будет 1,2,3
// каждый промис даёт элемент массива
//Обратите внимание, что порядок элементов массива в точности соответствует порядку исходных промисов. Даже если первый промис будет выполняться дольше всех, его результат всё равно будет первым в массиве
//Часто применяемый трюк – пропустить массив данных через map-функцию, которая для каждого элемента создаст задачу-промис, и затем обернуть получившийся массив в Promise.all.

{
	let urls = [
		'https://api.github.com/users/iliakan',
		'https://api.github.com/users/remy',
		'https://api.github.com/users/jeresig',
	];
	//// Преобразуем каждый URL в промис, возвращённый fetch

	let requests = urls.map(url => fetch(url));
	// Promise.all будет ожидать выполнения всех промисов
	Promise.all(requests).then(responses =>
		responses.forEach(response => alert(`${response.url}: ${response.status}`))
	);
}
//А вот пример побольше, с получением информации о пользователях GitHub по их логинам из массива (мы могли бы получать массив товаров по их идентификаторам, логика та же):

{
	let names = ['iliakan', 'remy', 'jeresig'];
	let reqests = names.map(name =>
		fetch(`https://api.github.com/users/${name}`)
	);
	//Ждём завершения ВСЕХ запросов

	Promise.all(requests)
		.then(responses => {
			for (let response of responses) {
				alert(`${response.url}: ${response.status}`); //// покажет 200 для каждой ссылки
			}
			return responses;
		})
		.then(responses => Promise.all(responses.map(r => r.json())))
		.then(users => users.forEach(user => alert(user.name)));
}

/*Если любой из промисов завершится с ошибкой, то промис, возвращённый Promise.all, немедленно завершается с этой ошибкой*/
//В случае ошибки, остальные результаты игнорируются
//Если один промис завершается с ошибкой, то весь Promise.all завершается с ней, полностью забывая про остальные промисы в списке. Их результаты игнорируются.
//Например, если сделано несколько вызовов fetch, как в примере выше, и один не прошёл, то остальные будут всё ещё выполняться, но Promise.all за ними уже не смотрит. Скорее всего, они так или иначе завершатся, но их результаты будут проигнорированы.
{
	Promise.all([
		new Promise((resolve, reject) => {
			setTimeout(() => resolve(1), 1000);
		}),
		2,
		3,
	]).then(alert); // 1, 2, 3
}

{
	let promise = Promise.allSettled(iterable);
}
//Promise.all завершается с ошибкой, если она возникает в любом из переданных промисов. Это подходит для ситуаций «всё или ничего», когда нам нужны все результаты для продолжения:

/*Метод Promise.allSettled всегда ждёт завершения всех промисов. В массиве результатов будет

{status:"fulfilled", value:результат} для успешных завершений,
{status:"rejected", reason:ошибка} для ошибок.
*/

{
	let urls = [
		'https://api.github.com/users/iliakan',
		'https://api.github.com/users/remy',
		'https://no-such-url',
	];
	Promise.allSettled(urls.map(url => fetch(url))).then(results => {
		results.forEach((result, num) => {
			if (result.status == 'fulfilled') {
				console.log(`${urls[num]} : ${result.value.status}`);
			}
		});
		if (result.status == 'rejected') {
			alert(`${urls[num]}: ${result.reason}`);
		}
	});
}
//urls.map(url => fetch(url)):

//Создаёт массив из 3 промисов (по одному на каждый URL)
/*Promise.allSettled():

Немедленно возвращает новый промис

Этот промис будет разрешён, когда ВСЕ 3 запроса завершатся (успешно или с ошибкой)

*/
//Если браузер не поддерживает Promise.allSettled, для него легко сделать полифил:

{
	if (!Primuse.allSettled) {
		Promise.allSettled = function (promises) {
			return Promise.all(
				promises.map(p => {
					Promise.resolve(p).then(
						value => ({
							status: 'fulfilled',
							value: value,
						}),
						error => ({ status: 'rejected', reason: error })
					);
				})
			);
		};
	}
}
// этом коде promises.map берёт аргументы, превращает их в промисы (на всякий случай) и добавляет каждому обработчик .then.
/*Promise.race
Метод очень похож на Promise.all, но ждёт только первый выполненный промис, из которого берёт результат ////////(или ошибку).///////////////

*/
{
	let promise = Promise.race(iterable);
}
{
	Promise.race([
		new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
		new Promise((resolve, reject) =>
			setTimeout(() => reject(new Error('Ошибка!')), 2000)
		),
		new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
	]).then(alert); //1
}
//Быстрее всех выполнился первый промис, он и дал результат. После этого остальные промисы игнорируются.

//Promise.any
//Метод очень похож на Promise.race, но ждёт только первый успешно выполненный промис, из которого берёт результат.
/*Если ни один из переданных промисов не завершится успешно, тогда возвращённый объект Promise будет отклонён с помощью AggregateError – специального объекта ошибок, который хранит все ошибки промисов в своём свойстве errors.

*/
{
	let promise = Promise.any(iterable);
}
//Например, здесь, результатом будет 1:

{
	Promise.any([
		new Promise((resolve, reject) =>
			setTimeout(() => reject(new Error('Ошибка!')), 1000)
		),
		new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
		new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
	]);
}
//Первый промис в этом примере был самым быстрым, но он был отклонён, поэтому результатом стал второй. После того, как первый успешно выполненный промис «выиграет гонку», все дальнейшие результаты будут проигнорированы.
//Как вы можете видеть, объекты ошибок для отклонённых промисов доступны в свойстве errors объекта AggregateError.
/*Если все промисы отклонены:

Возвращает отклонённый промис с AggregateError

AggregateError содержит массив всех ошибок в свойстве .errors
.catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ошибка!
  console.log(error.errors[1]); // Error: Ещё одна ошибка!
});
*/
/*Так как успешных промисов нет:

Promise.any создаёт AggregateError

Помещает все ошибки в массив error.errors

В catch мы получаем этот AggregateError и можем:

Проверить тип ошибки через constructor.name

Достать отдельные ошибки из error.errors

*/
//AggregateError — специальный тип ошибки для агрегации нескольких ошибок (появился в ES2021
/*AggregateError — это:

Объект-ошибка

Создаётся синхронно

Не имеет методов .then()/.catch()

Promise.any — это:

Функция, возвращающая промис

Асинхронная операция

В случае провала возвращает промис, который реджектится с AggregateError

*/
//Promise.resolve(value) создаёт успешно выполненный промис с результатом value.
//let promise = new Promise(resolve => resolve(value));

//Этот метод используют для совместимости: когда ожидается, что функция возвратит именно промис

//Promise.reject(error) создаёт промис, завершённый с ошибкой error.
// ТОЖ САМОЕ КАК let promise = new Promise((resolve, reject) => reject(error));
{
	let cache = new Map();
	function loadCached(url) {
		if (cache.has(url)) {
			return Promise.resolve(cache.get(url));
		}
	}
	return fetch(url)
		.then(response => response.text())
		.then(text => {
			cache.set(url, text);
			return text;
		});
}
//Промисификация – это длинное слово для простого преобразования. Мы берём функцию, которая принимает колбэк и меняем её, чтобы она вместо этого возвращала промис.
//Новая функция loadScriptPromise(src) будет делать то же самое, но будет принимать только src (не callback) и возвращать промис.

{
	let lodScriptPromise = function (src) {
		return new Promise((resolve, reject) => {
			loadScript(src, (err, script) => {
				if (err) reject(err);
				else resolve(script);
			});
		});
	};
}
// использование:
// loadScriptPromise('path/script.js').then(...)
/*Ваш код преобразует callback-стиль loadScript в Promise-стиль

Это называется "обещание" (promisification) функции*/
/*На практике нам, скорее всего, понадобится промисифицировать не одну функцию, поэтому имеет смысл сделать для этого специальную «функцию-помощник».

Мы назовём её promisify(f) – она принимает функцию для промисификации f и возвращает функцию-обёртку.

*/

{
	function promisify(f) {
		return function (...args) {
			// возвращает функцию-обёртку
			return new Promise((resolve, reject) => {
				function callback(err, result) {
					//// наш специальный колбэк для f
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
				args.push(callback); // добавляем колбэк в конец аргументов f
				f.call(this, ...args);
			});
		};
	}
	// использование:
	//let loadScriptPromise = promisify(loadScript);
	//loadScriptPromise(...).then(...);
}
//Таким образом, args.push(callback) — это механизм "подстановки" вашего колбэка в вызов оригинальной функции, чтобы та могла сообщить о результате. Это мост между промисами и колбэками.
//и в эьтом колбеке у мен результат  промиса
{
	p; //romisify(f, true); //чтобы получить массив результатов
	function promisify(f, manyArgs = false) {
		return function (...args) {
			return new Promise((resolve, reject) => {
				function callback(err, ...results) {
					// наш специальный колбэк для f
					if (err) {
						reject(err);
					} else {
						// делаем resolve для всех results колбэка, если задано manyArgs
						resolve(manyArgs ? results : resul[0]);
					}
				}
				args.push(callback);

				f.call(this, ...args);
			});
		};
	}
}
/*/ использование:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
*/
/*Деталь A (...args) — собираем все аргументы вызова

Деталь B (callback) — наш преобразователь

Деталь C (args.push) — соединяем аргументы с колбэком

Собираем (f.call) — запускаем оригинальную функцию

*/
