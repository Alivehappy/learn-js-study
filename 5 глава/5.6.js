//У самого range нет метода next().
//Вместо этого другой объект, так называемый «итератор», создаётся вызовом range[Symbol.iterator](), и именно его next() генерирует значения.
//Таким образом, объект итератор отделён от самого итерируемого объекта.

let range = {
	from: 1,
	to: 5,
};
range[Symbol.iterator] = function () {
	// ...она возвращает объект итератора:
	// 2. Далее, for..of работает только с этим итератором,
	// запрашивая у него новые значения
	return {
		current: this.from,
		last: this.to,
		// 3. next() вызывается на каждой итерации цикла for..of
		next() {
			// 4. он должен вернуть значение в виде объекта {done:.., value :...}
			if (this.current <= this.last) {
				return { done: false, value: this.current++ };
			} else {
				return {
					done: true,
				};
			}
		},
	};
};
for (let num of range) {
	console.log(num); //Вывод: 1, 2, 3, 4, 5//false- это потому что мы еще не закончили итерировать
}
//Чтобы сделать range итерируемым (и позволить for..of работать с ним), нам нужно добавить в объект метод с именем Symbol.iterator (специальный встроенный Symbol, созданный как раз для этого).
//

{
	let range = {
		from: 1,
		to: 5,
		[Symbol.iterator]() {
			this.current = this.from;
			return this;
		},
		next() {
			if (this.current <= this.to) {
				return { done: false, value: this.current++ };
			} else {
				return { done: true };
			}
		},
	};
	for (let num of range) {
		console.log(num); // 1, затем 2, 3, 4, 5
	}
}
//Среди встроенных перебираемых объектов наиболее широко используются массивы и строки.
let test = 'test';
for (let char of test) {
	console.log(char); /// t, затем e, затем s, затем t//// срабатывает 4 раза: по одному для каждого символа
}
//И он работает корректно даже с суррогатными парами!

let str = '𝒳😂';
for (let char of str) {
	console.log(char); // 𝒳, а затем 😂
}
let str1 = 'Hello';
//// делает то же самое, что и
// for (let char of str) alert(char);
let iterator = str[Symbol.iterator]();
while (true) {
	let result = iterator.next();
	if (result.done) break;
	console.log(result.value);
}

letarrayLike = {
	0: 'hello',
	1: 'World',
	length: 2,
};
let arr = Array.from(arrayLike);
console.log(arr.pop());
{
	//То же самое происходит с итерируемым объектом:

	// range взят из примера в начале статьи
	let arr = Array.from(range);
	alert(arr);
}
//Array.from(obj[, mapFn, thisArg])
//Необязательный второй аргумент может быть функцией, которая будет применена к каждому элементу перед добавлением в массив, а thisArg позволяет установить this для этой функции.
{
	let arr = Array.from(range, num => num * num);
}
//Здесь мы используем Array.from, чтобы превратить строку в массив её элементов
{
	let str = '𝒳😂';
	let chars = Array.from(str);
	alert(chars[0]); // 𝒳
	alert(chars[1]); // 😂
	alert(chars.length); // 2
}
{
	let str = '𝒳😂';

	let chars = []; // Array.from внутри себя выполняет тот же цикл
	for (let char of str) {
		chars.push(char);
	}

	alert(chars);
}

{
	function slice(str, start, end) {
		return Array.from(str).slice(start, end).join('');
	}
	let str = '𝒳😂𩷶';
	console.log(slice(str, 1, 3));
}
