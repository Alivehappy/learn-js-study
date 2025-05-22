//Встроенные прототипы можно изменять. Например, если добавить метод к String.prototype, метод становится доступен для всех строк:
{
	String.prototype.show = function () {
		alert(this);
	};
	Boowm.show(); //Boowm
}
//Прототипы глобальны, поэтому очень легко могут возникнуть конфликты. Если две библиотеки добавляют метод String.prototype.show, то одна из них перепишет метод другой.
//Этот код добавляет метод repeat() для строк в старых версиях JavaScript, где этого метода ещё не существовало
{
	if (!String.prototype.repeat) {
		// Если такого метода нет
		// добавляем его в прототип

		String.prototype.repeat = function (n) {
			// повторить строку n раз
			return new Array(n + 1).join(this);
		}; //'' + 'La' + '' + 'La' + '' + 'La' + '' = 'LaLaLa' длина 4, так как н =3
	}
	console.log('La'.repeat(3));
}
//Некоторые методы встроенных прототипов часто одалживают.

// Например, если мы создаём объект, похожий на массив (псевдомассив), мы можем скопировать некоторые методы из Array в этот объект.

{
	let obj = {
		0: 'Hello',
		1: 'world',
		length: 2,
	};
	obj.join = Array.prototype.join;
	console.log(obj.join); // Hello,world!
}
//Это работает, потому что для внутреннего алгоритма встроенного метода join важны только корректность индексов и свойство length, он не проверяет, является ли объект
//Альтернативная возможность – мы можем унаследовать от массива, установив obj.__proto__ как Array.prototype, таким образом все методы Array станут автоматически доступны в obj
//Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.

Function.prototype.defer = function (ms) {
	setTimeout(this, ms); //приниял функцию
};
//Внутри метода defer, this будет ссылаться на функцию, к которой применяется метод. Если вы не используете this, вы не сможете вызвать исходную функцию.
//Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд
{
	Function.prototype.defer = function (ms) {
		let f = this;
		return function (...args) {
			//сечйас контекст объекта перед точкой
			setTimeout(() => {
				f.apply(this, args); //здесть привязываем на ф
			}, ms);
		};
	};
	function f(a, b) {
		alert(a + b);
	}

	f.defer(1000)(1, 2); // выведет 3 через 1 секунду.
}
{
	Function.prototype.defer = function (ms) {
		let original = this;
		return function (...args) {
			setTimeout(() => {
				original.apply(this, args);
			}, ms);
		};
	};
}
// венутьс вверх почемуошибка
/*Object.create(proto[, descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto, и необязательными дескрипторами свойств descriptors.
Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.
*/
{
	let animal = {
		eats: true,
	};
	// создаём новый объект с прототипом animal
	let rabbit = Object.create(animal);
	console.log(rabbit); //{} prototype animal
	console.log(rabbit.eats); // true
	console.log(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit
	Object.setPrototypeOf(rabbit, {});
}
//У Object.create есть необязательный второй аргумент: дескрипторы свойств. Мы можем добавить дополнительное свойство новому объекту таким образом:

{
	let animal = {
		eats: true,
	};

	let rabbit = Object.create(animal, {
		jumps: {
			value: true, //свойство у рэбита
		},
	});
	console.log(rabbit);
	console.log(animal);
	alert(rabbit.jumps); // true
}
//// клон obj c тем же прототипом (с поверхностным копированием свойств)
{
	let obj = {
		a: 1,
		d: {
			c: 5,
		},
	};
	let clone = Object.create(
		Object.getPrototypeOf(obj),
		Object.getOwnPropertyDescriptors(obj) //Вложенные объекты не клонируются - они остаются ссылками на те же объекты
	);
	console.log(clone);
	console.log(Object.assign({}, obj)); //Вложенные объекты не клонируются - копируются ссылки

	console.log(structuredClone(obj)); //изолированная копия
}
//Такой вызов создаёт точную копию объекта obj, включая все свойства: перечисляемые и неперечисляемые, геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]].
//при чтении или установке obj.__proto__ вызывается соответствующий геттер/сеттер из прототипа obj, и именно он устанавливает/получает свойство [[Prototype]].
