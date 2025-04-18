function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter());
//Переменная counter теперь содержит ту самую внутреннюю функцию- результат вызова - вложенная функция

//Переменная count продолжает существовать благодаря замыканию
function adder(n) {
  let sum = 0;
  return function (n) {
    return (sum += n);
  };
}
console.log(adder(5));
//Передавать n вложенной функции нужно только если вы хотите менять это значение при каждом вызове
//Создайте функцию cachedCalc(), которая запоминает результаты вычислений и возвращает их при повторных запросах.

function createCachedCalc() {
  const cache = new Map();
  return function (a, b) {
    const key = `${a}_${b}`;
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = a + b;
    cache.set(key, result);
    return result;
  };
}

const cachedCalc = createCachedCalc();
console.log(cachedCalc(5, 3));

//Напишите функцию createIdGenerator(), которая генерирует уникальные ID (начиная с 1) при каждом вызове.
function createIdGenerator() {
  let result = 0;
  return function () {
    result += 1;
    return result.toString().padStart(5, "0");
  };
}
const genId = createIdGenerator();
console.log(genId()); // "00001"

console.log(genId()); // 2
//Напишите функцию createValidator(rules), которая проверяет данные по правилам:
function createValidator(rule) {
  return function (value) {
    return value >= rule.min && value <= rule.max;
  };
}
const validate = createValidator({ min: 3, max: 10 });

console.log(validate(5)); // true
console.log(validate(11)); // false
/*Создайте функцию createTimer(seconds), которая возвращает объект с методами:

start() — запускает отсчёт,

pause() — останавливает,

getTime() — возвращает оставшееся время.
   */
function createTimer(seconds) {
  let remainingSeconds = seconds;
  let timerId = null;
  let isRunning = false; // Работает ли таймер
  return {
    start() {
      if (!isRunning && remainingSeconds > 0) {
        isRunning = true;
        timerId = setInterval(() => {
          remainingSeconds--;
          if (remainingSeconds <= 0) {
            clearInterval(timerId);
            isRunning = false;
          }
        }, 1000);
      }
    },
    pause() {
      if (isRunning) {
        //// Если таймер работает
        clearInterval(timerId);
        isRunning = false; /// Помечаем как остановленный
      }
    },
    getTime() {
      return remainingSeconds;
    },
  };
}
//Создайте функцию multiplier(factor), которая возвращает функцию, умножающую аргумент на factor

function multiplier(factor) {
  return function (n) {
    let result = factor * n;
    return result;
  };
}
const double = multiplier(2);
console.log(double(5)); // 10
/*Возвращает новую функцию, которая "запоминает" этот factor через замыкание*/

const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [...arr1, ...arr2];
console.log(arr3); //[1, 2, 3, 4];
//Создайте копию массива arr без мутации оригинала.
{
  const arr = [1, 2, 3];
  const copyArr = arr.slice();
  const copy2 = [0, ...arr, 4];
  console.log(copyArr); //[1, 2, 3]

  console.log(copy2); //[0, 1, 2, 3, 4]
}

{
  const arr = [1, 2, 2, 3, 4, 4];
  const unique = new Set(arr); //{1, 2, 3, 4;}
  //надо спред для массива[... new Set(arr)]
  console.log(unique);
}

{
  const arr = [10, 5, 20, 15];
  const max = Math.max(...[arr]);
  console.log(max);
  const obj1 = { a: 1, b: 2 };
  const obj2 = { c: 3, b: 4 };
  const obj3 = { ...obj1, ...obj2 };
  console.log(obj3);
}
//Создайте новый массив, исключив все false значения из [0, 1, false, 2, "", 3].
const falsy = [0, 1, false, 2, "", 3];
const truthy = [];
for (let elem of falsy) {
  if (Boolean(elem) === true) {
    truthy.push(elem);
  }
}
console.log(truthy);
//спред можнт быть нужен чтоб создаьб копию перед методом
{
  const falsy = [0, 1, false, 2, "", 3];
  const truthy = falsy.filter((elem) => Boolean(elem));
}

{
  function sum() {
    let result = 0;
    return function f(...arguments) {
      result += arguments;
    };
  }
  sum(1)(3)(45)(8);
}
