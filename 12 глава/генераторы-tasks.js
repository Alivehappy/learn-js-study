/*Задача 1: Асинхронный генератор чисел с задержкой
Условие:
Создайте асинхронный генератор generateNumbers, который принимает параметры start, end и delay (в миллисекундах). Генератор должен последовательно возвращать числа от start до end с указанной задержкой между значениями.

Требования:

Используйте await для задержки.

Генератор должен быть асинхронным (async function*).

Для теста: выведите числа от 1 до 5 с задержкой 1 секунда.
*/

{
	async function* generateNumbers(start, end, delay) {
		for (let i = start; i <= end; i++) {
			let timeDelay = await new Promise(resolve => setTimeout(resolve, delay));
			yield i;
		}
	}

	(async () => {
		const generated = generateNumbers(0, 3, 1000);
		console.log(await generated.next());
		console.log(await generated.next());
		console.log(await generated.next());
		console.log(await generated.next());
	})(); ///////или

	async function run() {
		for await (let i of generateNumbers(0, 2, 500)) {
			console.log(i);
		}
	}
	run();
}
//async function* — асинхронный генератор
/*Когда вы вызываете .next() у асинхронного генератора:

Он возвращает Promise, который разрешится в { value, done }. внешний код всё равно получит Promise, который нужно ещё раз "распаковать".
нужно аваит чтоб полуит результат, а аваит нало обернуть в асинк
/
Цикл for await...of автоматически:

Вызывает .next() для генератора

Ждёт разрешения Promise (await)


/*
Задача 2: Постраничная загрузка коммитов с GitHub API
Условие:
Создайте асинхронный генератор fetchCommits, который загружает коммиты из репозитория GitHub постранично и отдаёт их по одному.
Требования:
Используйте GitHub API: https://api.github.com/repos/{user}/{repo}/commits?page={page}&per_page={per_page}.
Генератор должен автоматически переходить на следующую страницу, когда текущая заканчивается.
Обрабатывайте ошибки (например, если репозитория не существует).
Для теста: выведите первые 10 коммитов из любого публичного репозитория.*/
{
	async function* fetchCommits(user, repo, perPage = 10) {
		let page = 1;
		let count = 0; //Счётчик полученных коммитов
		let hasMore = true; // Флаг наличия данных
		while (hasMore) {
			const url = `https://api.github.com/repos/${user}/${repo}/commits?page=${page}&per_page=${perPage}`;
			try {
				let response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP:${response.status}`);
				} else {
					const commits = await response.json();
					if (commits.length === 0) {
						console.log('Больше нет коммитов');
						return;
					}
					for (let commit of commits) {
						// commit - объект с информацией о коммите

						if (count > 10) break;
						if (count <= 10) {
							++count;
							yield commit;
						}
					}
					page++;
				}
			} catch (e) {
				console.error(`Ошибка: ${error}`);
				hasMore = false;
			}
		}
	}
}
//yield commit приостанавливает генератор и возвращает один коммит

/*Задача 3: Асинхронный генератор-таймер с возможностью остановки
Условие:
Создайте асинхронный генератор timer, который каждые interval мс генерирует событие (например, текущее время), но может быть остановлен извне через специальный метод.

Генератор должен принимать interval (задержка между событиями).
Реализуйте метод .stop(), который прерывает генератор.
Для теста: запустите таймер с интервалом 1 секунда и остановите его через 5 секунд.
*/
{
	async function* timer(interval) {
		let stopped = false;
		let id;
		try {
			while (stopped !== true) {
				yield new Date();
				await new Promise(resolve => {
					id = setTimeout(resolve, interval);
				});
			}
		} finally {
			if (id) {
				clearInterval(id);
				console.log('Таймер полностью остановлен');
			}
		}
		stop(){
			stopped = true;
			clearTimeout(id);
		};
	}
	(async () => {
		const gen = timer(1000);
		setTimeout(() => {
			gen.stop();
		}, 5000);
		for await (const time of gen) {
			console.log(time);
		}
	})();
}
