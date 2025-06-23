//Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен» через ms миллисекунд, так чтобы мы могли добавить к нему .then:

{
	function delay(ms) {
		return new Promise(function (resolve, reject) {
			setTimeout(() => resolve(), ms);
		});
	}
	delay(3000).then(() => console.log('выполнилось через 3 секунды'));
}
/// с 1 аргументом
{
	function delay(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}
	delay(3000).then(() => console.log('выполнилось через 3 секунды'));
}
/*resolve — это ссылка на функцию.

setTimeout "запоминает" эту функцию и вызывает её через ms мс.

*/ //если хочу отложить то нало резолв после всего вызывать
{
	let promise = new Promise(resolve => {
		setTimeout(() => {
			console.log(5);
			resolve('Готово');
		}, 1000);
	});
	promise.then(result => {
		console.log(result);
	});
}
//Код внутри new Promise(...) выполняется сразу (кроме асинхронных операций)
/*Сначала выполняется синхронный код - создание Promise и добавление обработчика .then(). На этом этапе Promise находится в состоянии "pending".

Через 1 секунду срабатывает setTimeout:
Почему setTimeout (макрозадача) выполнился раньше .then() (микрозадачи)?
Микрозадачи выполняются сразу после текущей макрозадачи, но до следующей.

Поэтому console.log(result) выводит "Готово".
 */
// Создайте промис, который реджектится через 2 секунды с сообщением "Ошибка!"
// Перехватите ошибку и выведите ее в консоль
{
	let promise = new Promise((resolve, reject) => {
		const message = 'Ошибка';
		setTimeout(() => {
			console.log(message);
			reject(new Error(message));
		}, 2000);
	}).catch(error => console.log(error.message));
}
/*
1. Создайте функцию delay(ms), возвращающую промис
2. Используйте ее для последовательного вывода:
   - "Старт" (сразу)
   - "Через 1 секунду" (через 1 сек)
   - "Еще через 2 секунды" (еще через 2 сек)
*/
{
	function delay(ms) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, ms);
		});
	}
	// Старт выводим сразу СИНХРОННО
	console.log('Старт');

	delay(1000)
		.then(() => {
			console.log('Через 1 секунду');
			return delay(2000); // Возвращаем новый промис
		})
		.then(() => {
			console.log('Еще через 2 секунды');
		});
}
/*Старт" должен быть вне промисов, если он нужен сразу

Каждый delay() создаёт новую задержку относительно предыдущего шага

Возврат промиса (return delay) позволяет строить цепочки

*/
//Дана функция getRandom(): Promise<number> (возвращает случайное число 0-9)
//Используйте ее чтобы получить число, умножить его на 2 и вывести результат
{
	function getRandom() {
		return new Promise((resolve, reject) => {
			const randomNum = Math.floor(Math.random() * 10);
			resolve(randomNum * 2);
		});
	}
	getRandom().then(result => {
		console.log(result);
		return result;
	});
}
/*1. Создайте 3 промиса, которые резолвятся через:
   - 300мс с числом 1
   - 200мс с числом 2
   - 100мс с числом 3
2. Используйте Promise.all чтобы получить массив результатов
3. Выведите сумму элементов массива*/

{
	let promise1 = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(1);
			resolve();
		}, 300);
	});
	let promise2 = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(2);
			resolve();
		}, 200);
	});
	let promise3 = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(3);
			resolve();
		}, 100);
	});
	Promise.all(
		[promise1, promise2, promise3].then(results => {
			console.log(results);
		})
	);
} ///3 2 1
/// Без then() - промис всё равно выполнится, но результат не будет обработан
//// Один обработчик для всех результатов изза  Promise.all
/*Все промисы выполняются параллельно

Обработчик .then() срабатывает один раз, когда все промисы завершены/