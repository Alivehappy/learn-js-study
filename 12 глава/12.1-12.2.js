/*Обычные функции возвращают только одно-единственное значение (или ничего).

Генераторы могут порождать (yield) множество значений одно за другим, по мере необходимости. Генераторы отлично работают с перебираемыми объектами и позволяют легко создавать потоки данных*/
//Для объявления генератора используется специальная синтаксическая конструкция: function*, которая называется «функция-генератор».

{
	function* generateSequence() {
		yield 1;
		yield 2;
		return 3;
	}
}
//Функции-генераторы ведут себя не так, как обычные. Когда такая функция вызвана, она не выполняет свой код. Вместо этого она возвращает специальный объект, так называемый «генератор», для управления её выполнением
//Основным методом генератора является next().
//При вызове он запускает выполнение кода до ближайшей инструкции yield <значение> (значение может отсутствовать, в этом случае оно предполагается равным undefined). По достижении yield выполнение функции приостанавливается, а соответствующее значение – возвращается во внешний код:
/*Результатом метода next() всегда является объект с двумя свойствами:

value: значение из yield.
done: true, если выполнение функции завершено, иначе false*/
{
	function* generateSequence() {
		yield 1;
		yield 2;
		return 3;
	}
	let generator = generateSequence(); // (1) Создание генератора
	let one = generator.next();
	console.log(JSON.stringify(one)); // {value: 1, done: false}
	let two = generator.next();

	alert(JSON.stringify(two)); // {value: 2, done: false}
	//И, наконец, последний вызов завершит выполнение функции и вернёт результат return:
	let three = generator.next();

	alert(JSON.stringify(three)); // {value: 3, done: true}
}
/*Вызов генератора происходит в строке (1):

generateSequence() не выполняет код функции, а возвращает объект-генератор

*/
//Сейчас генератор полностью выполнен. Мы можем увидеть это по свойству done:true и обработать value:3 как окончательный результат.
/*function* f(…) или function *f(…)?
Нет разницы, оба синтаксиса корректны.

*/
//Как вы, наверное, уже догадались по наличию метода next(), генераторы являются перебираемыми объектами.
//Генераторы автоматически реализуют [Symbol.iterator](), поэтому их можно перебирать:
{
	function* generateSequence() {
		yield 1;
		yield 2;
		return 3;
	}
	let generator = generateSequence();
	for (let value of generator) {
		console.log(value); // 1, затем 2
	}
}
//Но обратите внимание: пример выше выводит значение 1, затем 2. Значение 3 выведено не будет!
//Это из-за того, что перебор через for..of игнорирует последнее значение, при котором done: true. Поэтому, если мы хотим, чтобы были все значения при переборе через for..of, то надо возвращать их через yield: без ретурн, генератор завершится неявно с {done: true} после последнего yield
//Так как генераторы являются перебираемыми объектами, мы можем использовать всю связанную с ними функциональность, например оператор расширения ...:

{
	function* generateSequence() {
		yield 1;
		yield 2;
		yield 3;
	}
	let sequence = [0, ...generateSequence()];
	console.log(sequence); // 0, 1, 2, 3
}
//Некоторое время назад, в главе Перебираемые объекты, мы создали перебираемый объект range, который возвращает значения from..to.
{
	let range = {
		from: 1,
		to: 5,
		// for..of range вызывает этот метод один раз в самом начале
		[Symbol.iterator]() {
			// ...он возвращает перебираемый объект:
			// далее for..of работает только с этим объектом, запрашивая следующие значения
			return {
				current: this.from,
				last: this.to,
				// next() вызывается при каждой итерации цикла for..of
				next() {
					if (this.current <= this.last) {
						return {
							done: false,
							value: this.current++,
						};
					} else {
						return { done: true };
					}
				},
			};
		},
	};
	console.log([...range]);
}
//Мы можем использовать функцию-генератор для итерации, указав её в Symbol.iterator.

{
	let range = {
		from: 1,
		to: 5,
		*[Symbol.iterator]() {
			for (let value = this.from; value <= this.to; value++) {
				yield value;
			}
		}, // краткая запись для [Symbol.iterator]: function*()
	};
	console.log([...range]);
}
//Это работает, потому что range[Symbol.iterator]() теперь возвращает генератор, и его методы – в точности то, что ожидает for..of:
/*у него есть метод .next()
который возвращает значения в виде {value: ..., done: true/false}
Это не совпадение, конечно. Генераторы были добавлены в язык JavaScript, в частности, с целью упростить создание перебираемых объектов.


*/
//Композиция генераторов – это особенная возможность генераторов, которая позволяет прозрачно «встраивать» генераторы друг в друга.
//Для генераторов есть особый синтаксис yield*, который позволяет «вкладывать» генераторы один в другой (осуществлять их композицию).

{
	function* generateSequence(start, end) {
		for (let i = start; i <= end; i++) yield i;
	}
	function* generatePasswordCodes() {
		yield* generateSequence(48, 57);
		yield* generateSequence(65, 90);

		// a..z
		yield* generateSequence(97, 122);
	}
	let str = '';
	for (let code of generatePasswordCodes()) {
		str += String.fromCharCode(code);
	}
	console.log(str);
}
/*yield* означает:
«Выполни этот генератор и отдай все его значения по очереди».
*/
/*Чтобы сделать объект итерируемым асинхронно:

Используется Symbol.asyncIterator вместо Symbol.iterator.
next() должен возвращать промис.
Чтобы перебрать*/
{
	let range = {
		from: 1,
		to: 5, // for await..of вызывает этот метод один раз в самом начале
		[Symbol.asyncIterator]() {
			// ...возвращает объект-итератор:
			// далее for await..of работает только с этим объектом,
			// запрашивая у него следующие значения вызовом next()
			return {
				current: this.from,
				last: this.to,
				// next() вызывается на каждой итерации цикла for await..of

				async next() {
					// должен возвращать значение как объект {done:.., value :...}
					// (автоматически оборачивается в промис с помощью async)
					// можно использовать await внутри для асинхронности:
					await new Promise(resolve => setTimeout(resolve, 1000));
					if (this.current <= this.last) {
						return { done: false, value: this.current++ };
					} else {
						return { done: true };
					}
				},
			};
		},
	}(async () => {
		for await (let value of range) {
			console.log(value);
		}
	})();
}
/*Чтобы сделать объект асинхронно итерируемым, он должен иметь метод Symbol.asyncIterator (1).
Этот метод должен возвращать объект с методом next(), который в свою очередь возвращает промис (2).
Метод next() не обязательно должен быть async, он может быть обычным методом, возвращающим промис, но async позволяет использовать await, так что это удобно. Здесь мы просто делаем паузу на одну секунду (3).
Для итерации мы используем for await (let value of range) (4), добавляя «await» после «for». Он вызовет range[Symbol.asyncIterator]() один раз, а затем его метод next() для получения значений.
*/
//Оператор расширения ... не работает асинхронно
/*технической точки зрения, ещё одно отличие асинхронного генератора заключается в том, что его метод generator.next() теперь тоже асинхронный и возвращает промисы.

Из обычного генератора мы можем получить значения при помощи result = generator.next(). Для асинхронного нужно добавить await, вот так
result = await generator.next(); // result = {value: ..., done: true/false}*/
{
	async function* generateSequence(start, end) {
		for (let i = start; i <= end; i++) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			yield i;
		}
	}
	async () => {
		let generator = generateSequence(1, 5); //Генератор создан, но код внутри него ещё не выполняется

		for await (let value of generator) {
			//Цикл вызывает generator.next() неявно

			console.log(value);
		}
	};
}
//технической точки зрения, ещё одно отличие асинхронного генератора заключается в том, что его метод generator.next() теперь тоже асинхронный и возвращает промисы.
{
	let range = {
		from: 1,
		to: 5,
		*[Symbol.iterator]() {
			for (let value = this.from; value <= this.to; value++) {
				yield value;
			}
		}, //сокращение для [Symbol.iterator]: function*()
	};
	for (let value of range) {
		console.log(value);
	}
}
/*Здесь созданный объект range является перебираемым, а генератор *[Symbol.iterator] реализует логику для перечисления значений.

Если хотим добавить асинхронные действия в генератор, нужно заменить Symbol.iterator на асинхронный Symbol.asyncIterator:*/
{
	let range = {
		from: 1,
		to: 5,
		async *[Symbol.asyncIterator]() {
			for (let value = this.from; value <= this.to; value++) {
				await new Promise(resolve => setTimeout(resolve, 1000));
				yield value;
			}
		},
	};
	(async () => {
		for await (let value of range) {
			console.log(value);
		}
	})();
}

{
	async function* fetchCommits(repo) {
		let url = `https://api.github.com/repos/${repo}/commits`;
		while (url) {
			const response = await fetch(url, {
				headers: { 'User-Agent': 'Our script' }, //GitHub требует заголовок user-agent
			});
			const body = await response.json(); //ответ в формате JSON (массив коммитов)
			// (3) Ссылка на следующую страницу находится в заголовках, извлекаем её
			let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
			nextPage = nextPage && nextPage[1];
			url = nextPage;
			for (let commit of bosy) {
				yield commit;
			}
		}
	}
	//Пример использования (показывает авторов коммитов в консоли):

	(async () => {
		let count = 0;
		for await (const commit of fetchCommits(
			'javascript-tutorial/en.javascript.info'
		)) {
			console.log(commit.author.login);
			if (++count == 100) {
				// остановимся на 100 коммитах
				break;
			}
		}
	})();
}
