console.log(this); // window
{
	('use strict');
	console.log(this); // window почему сторгий режим не влияет и нет undefined
}

{
	('use strict');
	let obj = {
		name: 'Tom',
		method: this,
	};
	console.log(obj.method); // window - почему не undefined
}

{
	('use strict');
	let obj = {
		name: 'Tom',
		method() {
			return this;
		},
	};
	console.log(obj.method()); //{name: 'Tom', method: ƒ}  возвращает объект - почему
	let method = obj.method; //должен терять контекст - а почему
	console.log(method()); //вернул window а не undefined
	let a = obj.method.bind(obj);
	console.log(a());
}

{
	('use strict');
	let obj1 = {
		name: 'Tom',
		method1() {
			return this;
		},
	};
	console.log(obj1.method1()); // возвращает объект - почему
	let method1 = obj1.method1(); // присваиваю результат вызова
	console.log(method1()); //TypeError: method1 is not a function
}
//В глобальном контексте выполнения (за пределами каких-либо функций) this ссылается на глобальный объект вне зависимости от режима (строгий или нестрогий
