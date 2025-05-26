//Реализовать forEach/map/reduce на прототипах
{
	Array.prototype.myforEach = function (callback) {
		for (let i = 0; i < this.length; i++) {
			callback(this[i], i, this); //Это вызов функции-обработчика для каждого элемента массива с тремя параметрами
		}
	};

	let arr = [11, 12, 16, 15];
	arr.myforEach((elem, index) =>
		console.log(`index: ${index} element: ${elem}`)
	);

	/*arr.myforEach(function(elem, index) {
  console.log(`index: ${index} element: ${elem}`)})

/*index: 0 element: 11
VM64:9 index: 1 element: 12
VM64:9 index: 2 element: 16
VM64:9 index: 3 element: 15
*/
}

{
	Array.prototype.myMap = function (callBack) {
		let newArr = [];
		for (let i = 0; i < this.length; i++) {
			newArr.push(callBack(this[i], i, this));
		}
		return newArr;
	};
	let arr = [1, 2, 3];
	arr.myMap(function (elem) {
		//callback явно описывает преобразование
		return elem * 2;
	});
	//arr.myMap(elem => elem * 2);
}
/*Принимать callback как параметр (function(callback))

Вызывать его для каждого элемента (callback(this[i], i, this))

Возвращать новый массив с результатами

*/
//Callback — это "инструкция", которую вы даёте методу, объясняя, что делать с каждым элементом. Сам метод занимается перебором, а callback определяет логику преобразования.

{
	Array.prototype.myReduce = function (callBack, startValue) {
		let acc = startValue;
		let startIndex = 0;
		if (acc === undefined) {
			//если startValue не передано, то есть startValue не массив и не объект
			acc = this[0];
			startIndex = 1; // Пропускаем первый элемент, так как он уже в acc
		}
		for (let i = startIndex; i < this.length; i++) {
			acc = callBack(acc, this[i], i, this);
		} //acc сохраняет новое значение, возвращённое callback-ом, для следующей итерации.

		return acc;
	};
	let arr = [1, 1, 1, 1];
	arr.myReduce(function (acc, elem) {
		return acc + elem;
	}, 0);
}

//Реализовать bind/call/apply на прототипах
{
	Function.prototype.myCall = function (context, ...args) {
		const fn = this;
		context.fn = fn;
		const result = context.fn(...args);
		//Удаляем временный метод
		delete context.fn;
		return result;
	};
	function greet(greeting) {
		return `${greeting}, ${this.name}!`;
	}
	const person = { name: 'John' };
	console.log(greet.myCall(person, 'Hi')); //hi John
}
//context.fn = fn — это временное добавление функции как метода в объект (context), чтобы вызвать её в нужном контексте
//JavaScript this внутри функции определяется тем, как её вызывают. Если функция вызывается как метод объекта (obj.method()), то this будет ссылаться на этот объект.
{
	Function.prototype.myApply = function (context, argsArray) {
		argsArray = argsArray || [];
		const fn = this;
		context.fn = fn;
		const res = context.fn(...argsArray); //context.fn(argsArray[0], argsArray[1], argsArray[2])

		delete context.fn;
		return res;
	};
}
//Внутри обычного apply происходит преобразование массива в список аргументов.
//Без ... мы передаём массив как первый аргумент
//Это ломает логику функций, которые ожидают отдельные аргументы.
