//Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд. Например
function f(x) {
	console.log(x);
}
function delay(f, ms) {
	return function (...args) {
		//это аргументы из f1000('test') из вызова f
		setTimeout(() => f(...args), ms); ///delay(f, 1000); отсюда 1000
	};
}

let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);
f1000('test'); // показывает "test" после 1000 мс
f1500('test'); // показывает "test" после 1500 мс

///////либо вот по теме
{
	function delay(f, ms) {
		return function () {
			setTimeout(() => f.apply(null, arguments), ms);
		};
	}
	let f1000 = delay(alert, 1000);

	f1000('test');
}

//Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.

{
	function work(a, b) {
		console.log(a + b);
	}
	function spy(func) {
		function wrapper(...args) {
			wrapper.calls.push(args);
			return func.apply(this, args);
		}
		wrapper.calls = [];
		return wrapper;
	}

	work = spy(work);
	work(1, 2); // 3
	work(4, 5); // 9
	for (let args of work.calls) {
		console.log('call' + args.join());
	}
}

{
	function debounce(func, ms) {
		let timeout;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, arguments), ms);
		};
	}
}
//Вызов debounce возвращает обёртку. При вызове он планирует вызов исходной функции через указанное количество ms и отменяет предыдущий такой тайм-аут
/*Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку.

При многократном вызове он передает вызов f не чаще одного раза в ms миллисекунд.

*/
{
	function f(a) {
		console.log(a);
	}
	function throttle(func, ms) {
		let isTrottled = false;
		savedArgs;
		savedThis;
		function wrapper() {
			if (isTrottled) {
				savedArgs = arguments;
				savedThis = this;
				return;
			}
			func.apply(this, arguments);
			isTrottled = true;
			setTimeout(function () {
				isTrottled = false;
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		}
		return wrapper;
	}
	let f1000 = throttle(f, 1000);
	f1000(1); // показывает 1
	f1000(2); // (ограничение, 1000 мс ещё нет)
	f1000(3); // (ограничение, 1000 мс ещё нет)
}

{
}
