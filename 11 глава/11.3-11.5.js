{
	new Promise(function (resolve, reject) {
		setTimeout(() => resolve(1), 1000);
	})
		.then(function (result) {
			console.log(result); //1
			return result * 2;
		})
		.then(function (result) {
			console.log(result); //2
			return result * 2; //  будет 4
		});
}
//Идея состоит в том, что результат первого промиса передаётся по цепочке обработчиков .then.
/*Начальный промис успешно выполняется через 1 секунду (*),
Затем вызывается обработчик в .then (**).
Возвращаемое им значение передаётся дальше в следующий обработчик .then (***)
*/
//В итоге результат передаётся по цепочке обработчиков, и мы видим несколько alert подряд, которые выводят: 1 → 2 → 4.
//Всё это работает, потому что вызов promise.then тоже возвращает промис, так что мы можем вызвать на нём следующий .then.

//Классическая ошибка новичков: технически возможно добавить много обработчиков .then к единственному промису. Но это не цепочка.
//Например
{
	let promise = new Promise(function (resolve, reject) {
		setTimeout(() => resolve(1), 1000);
	});
	promise.then(function (result) {
		console.log(result); //1
		return result * 2;
	});
	promise.then(function (result) {
		console.log(result); // 1
		return result * 2;
	});
}
//Мы добавили несколько обработчиков к одному промису. Они не передают друг другу результаты своего выполнения, а действуют независимо
//Все обработчики .then на одном и том же промисе получают одно и то же значение – результат выполнения того же самого промиса. Таким образом, в коде выше все console.log показывают одно и то же: 1.
/*Обработчик handler, переданный в .then(handler), может вернуть промис.

В этом случае дальнейшие обработчики ожидают, пока он выполнится, и затем получают его результат.

*/

{
	new Promise(function (resolve, reject) {
		setTimeout(() => resolve(1), 1000);
	}).then(function (result) {
		console.log(result); //1
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(result * 2), 1000);
		}).then(function (result) {
			console.log(result);
		});
	});
}
/*Возврат промиса из handler'а позволяет строить цепочки асинхронных операций

Вложенный .then() работает так же, как и внешний - это обычная цепочка промисов

*/
//Таким образом, как и в предыдущем примере, выводятся 1 → 2 → 4, но сейчас между вызовами alert существует пауза в 1 секунду.

//Колбэки не возвращают промисы, а промисы удобнее для асинхронного кода.
//Чтобы превратить колбэк в промис, его оборачивают в new Promise.
/*Когда нужен return new Promise внутри .then()?
Только если в .then() есть асинхронная операция (например, ещё один setTimeout, fetch, fs.readFile).

*/
//Во фронтенд-разработке промисы часто используются, чтобы делать запросы по сети. Давайте рассмотрим один такой пример.
let promise = fetch(url);
//Этот код запрашивает по сети url и возвращает промис
//Промис успешно выполняется и в свою очередь возвращает объект response после того, как удалённый сервер присылает заголовки ответа, но до того, как весь ответ сервера полностью загружен.
//Чтобы прочитать полный ответ, надо вызвать метод response.text(): он тоже возвращает промис, который выполняется, когда данные полностью загружены с удалённого сервера, и возвращает эти данные.
//Есть также метод response.json(), который читает данные в формате JSON. Он больше подходит для нашего примера, так что давайте использовать его.
{
	fetch('/article/promise-chaining/user.jso')
		.then(response => response.json())
		.then(user => console.log(user.name));
}
// fetch возвращает промис
//response.json() тоже возвращает промис (потому что чтение тела ответа — асинхронная операция).
/*Каждый .then() получает результат предыдущего:

Сначала response от fetch,

затем распарсенный user из response.json().*/
//fetch, response.json(), response.text() — все эти методы уже возвращают промисы.
{
	function loadJson(url) {
		return fetch(url).then(response => response.json());
	}
	function loadGithubUser(name) {
		return fetch(`https://api.github.com/users/${name}`).then(response =>
			response.json()
		);
	}
	function showAvatar(githubUser) {
		return new Promise(function (resolve, reject) {
			let img = document.createElement('img');
			img.src = githubUser.avatar_url;
			img.className = 'promise-avatar-example';
			document.body.append(img);
			setTimeout(() => {
				img.remove();
				resolve(githubUser);
			}, 3000);
		});
	}
	// Используем их:
	loadJson('/article/promise-chaining/user.json')
		.then(user => loadGithubUser(user.name))
		.then(showAvatar)
		.then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
}
/*loadJson(url) — базовая функция для загрузки JSON (возвращает промис).

loadGithubUser(name) — обёртка для fetch к GitHub API (возвращает промис).

showAvatar(githubUser) — обёртка для отображения аватара (возвращает промис, который разрешается после удаления изображения).

*/
//Например, в представленном ниже примере для fetch указана неправильная ссылка (сайт не существует), и .catch перехватывает ошибку:

{
	fetch('https://no-such-server.blabla') //ошибка
		.then(response => response.json())
		.catch(err => alert(err));
}
//Самый лёгкий путь перехватить все ошибки – это добавить .catch в конец цепочки:
//Если все в порядке, то такой .catch вообще не выполнится. Но если любой из промисов будет отклонён (проблемы с сетью или некорректная json-строка, или что угодно другое), то ошибка будет перехвачена.
//Невидимый try..catch» вокруг промиса автоматически перехватывает ошибку и превращает её в отклонённый промис.
{
	new Promise((resolve, reject) => {
		reject(new Error('error'));
	}).catch(alert);
}
//Это работает не только в функции промиса, но и в обработчиках. Если мы бросим ошибку (throw) из обработчика (.then), то промис будет считаться отклонённым, и управление перейдёт к ближайшему обработчику ошибок.
{
	new Promise((resolve, reject) => {
		resolve('ok');
	})
		.then(result => {
			throw new Error('Ошибка'); // генерируем ошибку
		})
		.catch(alert);
}
//В примере ниже мы видим другую ситуацию с блоком .catch. Обработчик (*) перехватывает ошибку и не может обработать её (например, он знает как обработать только URIError), поэтому ошибка пробрасывается далее:

{
	new Promise((resolve, reject) => {
		throw new Error('Ошибка');
	})
		.catch(function (error) {
			if (error instanceof URIError) {
				// обрабатываем ошибку
			} else {
				alert('Не могу обработать ошибку');
				throw error; // пробрасывает эту или другую ошибку в следующий catch
			}
		})
		.then(function () {
			/* не выполнится */
		})
		.catch(error => {
			alert(`Неизвестная ошибка: ${error}`);
			// ничего не возвращаем => выполнение продолжается в нормальном режиме
		});
}
