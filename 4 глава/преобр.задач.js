let obj = {
	a: 1,
	b: 2,
	[Symbol.toPrimitive](hint) {
		if (hint === 'number' || hint === 'default') {
			return this.a + this.b;
		} else {
			return `It is not a number`;
		}
	},
};
let str = 0;
str += obj;
console.log(str);

/*  второе решение let obj = {
  a: 1,
  b: 2,
  valueOf() {
    return [a, b];
  }
};
let str = 0;
str += obj;
console.log(str);*/

let obj1 = {
	name: 'Tom',
	age: 20,
	toString() {
		return `name: ${this.name}, age: ${this.age}`; // определяем в область видимости метода
	},
};
let obj2 = {
	a: 'Ivan',
};

console.log(String(obj1));
console.log(obj2 + obj1);
//name: Tom, age: 20
// [object Object]name: Tom, age: 20
console.log(number(obj1)); //nan

let obj3 = {
	x: 15,
	y: 10,
	[Symbol.toPrimitive](hint) {
		if (hint === 'number') {
			return this.x + this.y;
		} else if (hint === 'string') {
			return `x: ${this.x}, y: ${this.y}`;
		}
		return `x: ${this.x}, y: ${this.y}`;
	},
};
console.log(+obj3); //25
console.log(String(obj3)); //x: 15, y: 10

let obj4 = {
	enabled: true,
	valueOf() {
		return this.enabled;
	},
};
console.log(Boolean(obj)); //true

let obj5 = {
	value: 50,
	[Symbol.toPrimitive](hint) {
		if (hint === 'number' || hint === 'default') {
			return this.value;
		} else if (hint === 'string') {
			return `value: ${this.value}`;
		}
	},
};
console.log(obj5 + 10);
console.log('Info' + obj5);
console.log(+obj5);
//вседа надо дефалт прописать ему без него плохо
// когда 2 условия лучше без Symbol.toPrimitive](hint)
let obj6 = {
	value: 5,
	toString() {
		return `value: ${this.value}`;
	},
	valueOf() {
		return this.value;
	},
};
console.log(obj6 + 10);
console.log('Info' + obj6);
console.log(+obj6);

let obj7 = {
	password: 'aaa',
	num: 15,
	bool: true,
	toJSON() {
		return {
			num: this.num,
			bool: this.bool,
		};
	},
};
console.log(JSON.stringify(obj7));

let obj8 = {
	num: 100,
	str: 'hello',
	toString() {
		return this.str;
	},
	valueOf() {
		return this.num;
	},

	[Symbol.toPrimitive](hint) {
		if (hint === 'number') {
			return this.valueOf();
		} else if (hint === 'string') {
			return this.toString();
		} else {
			return 'default';
		}
	},
};
console.log(+obj8);
console.log(String(obj8));
console.log(obj8 + '');
//
