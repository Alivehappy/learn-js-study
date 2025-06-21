{
	function loadScript(src, callback) {
		let script = document.createElement('script');
		script.src = src;
		script.onload = () => callback(null, script);
		script.onerror = () =>
			callback(new Error(`Не удалось загрузить скрипт ${src}`));
	}
}
//onload и onerror — это специальные обработчики событий для элементов <script> в JavaScript. Они позволяют отслеживать успешную загрузку скрипта или ошибки.
/*Опять же, подход, который мы использовали в loadScript, также распространён и называется «колбэк с первым аргументом-ошибкой» («error-first callback»).

Правила таковы:

Первый аргумент функции callback зарезервирован для ошибки. В этом случае вызов выглядит вот так: callback(err).
Второй и последующие аргументы — для результатов выполнения. В этом случае вызов выглядит вот так: callback(null, result1, result2…).
*/
{
	loadScript('/my/script.js', function (error, script) {
		if (error) {
			handleError(error);
			// обрабатываем ошибку
		} else {
			// скрипт успешно загружен
		}
	});
}
//Адская пирамида вызовов
/*
{
	loadScript('1.js', function (error, script) {
		if (error) {
			handleError(error);
		} else {
			// ...
			loadScript('2.js', function(error, script) {
				if (error) {
					handleError(error);
				} else {
					// ...
					loadScript('3.js', function (error, script) {
						if (error) {
							handleError(error);
						} else {
							// ...и так далее,
						}
					});
					*/
/*Мы загружаем 1.js. Продолжаем, если нет ошибок.
Мы загружаем 2.js. Продолжаем, если нет ошибок.
Мы загружаем 3.js. Продолжаем, если нет ошибок*/
/*Пирамида вложенных вызовов растёт вправо с каждым асинхронным действием. В итоге вы сами будете путаться, где что есть.

*/
/*Promise (по англ. promise, будем называть такой объект «промис») – это специальный объект в JavaScript, который связывает «создающий» и «потребляющий» коды вместе. В терминах нашей аналогии – это «список для подписки». «Создающий» код может выполняться сколько потребуется, чтобы получить результат, а промис делает результат доступным для кода, который подписан на него, когда результат готов*/
//let promise = new Promise(function (resolve, reject) {// функция-исполнитель (executor)
// "певец"});
//Функция, переданная в конструкцию new Promise, называется исполнитель (executor). Когда Promise создаётся, она запускается автоматически
//Она должна содержать «создающий» код, который когда-нибудь создаст результат. В терминах нашей аналогии: исполнитель – это «певец».
//Её аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript. Наш код – только внутри исполнителя.
/*Когда он получает результат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:

resolve(value) — если работа завершилась успешно, с результатом value.
reject(error) — если произошла ошибка, error – объект ошибки*/
/*state («состояние») — вначале "pending" («ожидание»), потом меняется на "fulfilled" («выполнено успешно») при вызове resolve или на "rejected" («выполнено с ошибкой») при вызове reject.
result («результат») — вначале undefined, далее изменяется на value при вызове resolve(value) или на error при вызове reject(error)*/
//Промис – и успешный, и отклонённый будем называть «завершённым», в отличие от изначального промиса «в ожидании».
//Свойства state и result – это внутренние свойства объекта Promise и мы не имеем к ним прямого доступа. Для обработки результата следует использовать методы .then/.catch/.finally,
let promise = new Promise(function (resolve, reject) {
	setTimeout(() => resolve('done'), 1000);
});
/*Функция-исполнитель запускается сразу же при вызове new Promise.
Исполнитель получает два аргумента: resolve и reject — это функции, встроенные в JavaScript, поэтому нам не нужно их писать. Нам нужно лишь позаботиться, чтобы исполнитель вызвал одну из них по готовности.
*/

{
	let promise = new Promise(function (resolve, reject) {
		setTimeout(() => reject(new Error('Whoops')), 1000);
	});
}
/*Подведём промежуточные итоги: исполнитель выполняет задачу (что-то, что обычно требует времени), затем вызывает resolve или reject, чтобы изменить состояние соответствующего Promise.

Промис – и успешный, и отклонённый будем называть «завершённым», в отличие от изначального промиса «в ожидании».

*/
//Функции-потребители могут быть зарегистрированы (подписаны) с помощью методов .then и .catch.

/*promise.then(function(result){/* обработает успешное выполнение /
} function(error/* обработает ошибку )*/

{
	let promise = new Promise(function (resolve, reject) {
		setTimeout(() => resolve('done'), 1000);
	});
	promise.then(
		result => console.log(result), //done
		error => console.log(error)
	);
}
//А в случае ошибки в промисе – выполнится вторая:
{
	let promise = new Promise(function (resolve, reject) {
		setTimeout(() => reject(new Error('Whoops!')), 1000);
	});

	promise.then(
		result => alert(result),
		error => alert(error) // выведет "Error: Whoops!" спустя одну секунду
	);
}
//Если мы заинтересованы только в результате успешного выполнения задачи, то в then можно передать только одну функцию:
//promise.then(alert); // выведет "done!" спустя одну секунду
//Если мы хотели бы только обработать ошибку, то можно использовать null в качестве первого аргумента: .then(null, errorHandlingFunction). Или можно воспользоваться методом .catch(errorHandlingFunction), который сделает то же самое:

{
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => reject(new Error('Ошибка!')), 1000);
	});
	promise.catch(alert); //.catch(f) это то же самое, что promise.then(null, f)
}
//Вызов .catch(f) – это сокращённый, «укороченный» вариант .then(null, f).
//Идея finally состоит в том, чтобы настроить обработчик для выполнения очистки/доведения после завершения предыдущих операций.
//Например, здесь результат проходит через finally к then
{
	new Promise((resolve, reject) => {
		setTimeout(() => resolve('value'), 2000);
	})
		.finally(() => console.log('Промис завершён')) // срабатывает первым

		.then(result => console.log(result)); //then показывает "value"
}
//Обработчик finally также не должен ничего возвращать. Если это так, то возвращаемое значение молча игнорируется
/*Обработчик finally не получает результат предыдущего обработчика (у него нет аргументов). Вместо этого этот результат передается следующему подходящему обработчику.
Если обработчик finally возвращает что-то, это игнорируется.
Когда finally выдает ошибку, выполнение переходит к ближайшему обработчику ошибок.
Если промис в состоянии ожидания, обработчики в .then/catch/finally будут ждать его.

Иногда может случиться так, что промис уже выполнен, когда мы добавляем к нему обработчик.

В таком случае эти обработчики просто запускаются немедленно:


*/
//Новой функции loadScript более не нужен аргумент callback. Вместо этого она будет создавать и возвращать объект Promise, который перейдет в состояние «успешно завершён», когда загрузка закончится. Внешний код может добавлять обработчики («подписчиков»), используя .then:

{
	function loadScript(src) {
		return new Promise(function (resolve, reject) {
			let script = document.createElement('script');
			script.src = src;
			script.onload = () => resolve(script);
			script.onerror = () =>
				reject(new Error(`Ошибка загрузки скрипта ${src}`));
			document.head.append(script);
		});
	}
	let promise = loadScript(
		'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js'
	);
	promise.then(
		script => console.log(`${script.src}загружен`),
		error => console.log(`Ошибка ${error.message}`)
	);
	promise.then(script => alert('Ещё один обработчик...'));
}
//Мы можем вызывать .then у Promise столько раз, сколько захотим. Каждый раз мы добавляем нового «фаната», новую функцию-подписчика в «список подписок».
