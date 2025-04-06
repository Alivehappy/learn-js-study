//Рекурсия — это когда функция вызывает саму себя
/*pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16*/

//1.Итеративный способ: цикл for:
function pow(x, n) {
	let result = 1;
	for (let i = 0; i < n; i++) {
		result *= x;
	}
	return result;
}
console.log(pow(2, 4)); //16
//2.
function pow(x, n) {
	if (n == 1) {
		//Когда n равно 1, функция возвращает x, так как любое число в степени 1 равно самому себе.

		return x;
	} else {
		return x * pow(x, n - 1);
	}
}
alert(pow(2, 3)); // 8
//Если n == 1, тогда всё просто. Эта ветвь называется базой рекурсии, потому что сразу же приводит к очевидному результату: pow(x, 1) равно x
//Мы можем представить pow(x, n) в виде: x * pow(x, n - 1). Что в математике записывается как: xn = x * xn-1. Эта ветвь – шаг рекурсии: мы сводим задачу к более простому действию (умножение на x) и более простой аналогичной задаче (pow с меньшим n). Последующие шаги упрощают задачу всё больше и больше, пока n не достигает 1.

//Общее количество вложенных вызовов (включая первый) называют глубиной рекурсии. В нашем случае она будет равна n.
//Максимальная глубина рекурсии ограничена движком JavaScript. Точно можно рассчитывать на 10000 вложенных вызовов
//то есть получая базовоае значение 2 оно поднимается вверх и просто каждый раз умножает себя на 2
//Каждый вызов pow порождает новый вызов (если n > 1), и только когда n = 1, начинается процесс возврата значений.
/*pow(2, 4) = 2 * pow(2, 3)
pow(2, 3) = 2 * pow(2, 2)
pow(2, 2) = 2 * pow(2, 1)
pow(2, 1) = 2
*/
function pow(x, n) {
	return n == 1 ? x : x * pow(x, n - 1);
}
//Информация о процессе выполнения запущенной функции хранится в её контексте выполнения (execution context)
/*Контекст выполнения – специальная внутренняя структура данных, которая содержит информацию о вызове функции. Она включает в себя конкретное место в коде, на котором находится интерпретатор, локальные переменные функции, значение this (мы не используем его в данном примере) и прочую служебную информацию.*/
//Один вызов функции имеет ровно один контекст выполнения, связанный с ним
/*Каждый вызов функции создаёт контекст выполнения, который помещается в стек вызовов.

При вложенном вызове текущая функция приостанавливается, а новая — выполняется.

После завершения вложенной функции её контекст удаляется из стека, и выполнение внешней функции продолжается.

//Рекурсия приводит к хранению всех данных для неоконченных внешних вызовов в стеке, и в данном случае это приводит к тому, что возведение в степень n хранит в памяти n различных контекстов.

Реализация возведения в степень через цикл гораздо более*/
let company = {
	sales: [
		{
			name: 'John',
			salary: 1000,
		},
		{
			name: 'Alice',
			salary: 600,
		},
	],

	development: {
		sites: [
			{
				name: 'Peter',
				salary: 2000,
			},
			{
				name: 'Alex',
				salary: 1800,
			},
		],

		internals: [
			{
				name: 'Jack',
				salary: 1300,
			},
		],
	},
};
{
	let company = {
		sales: [
			{ name: 'John', salary: 1000 },
			{ name: 'Alice', salary: 600 },
		],
		development: {
			sites: [
				{ name: 'Peter', salary: 2000 },
				{ name: 'Alex', salary: 1800 },
			],
			internals: [{ name: 'Jack', salary: 1300 }],
		},
	};
	// Функция для подсчёта суммы зарплат

	function sumSalaries(department) {
		if (Array.isArray(department)) {
			// случай (1)
			return department.reduce((prev, current) => prev + current.salary, 0); // сумма элементов массива
		} else {
			// случай (2)
			let sum = 0;
			for (let subdep of Object.values(department)) {
				sum += sumSalaries(subdep); // рекурсивно вызывается для подотделов, суммируя результаты
			}
			return sum;
		}
	}

	alert(sumSalaries(company)); // 6700
}
/*sumSalaries(company.sales) // передали массив -> случай 1
sumSalaries(company.development) // передали объект -> случай 2
*/
