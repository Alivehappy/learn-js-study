"use strict"
/*let a = 56
console.log(1+2);
console.log('ghgh' + 'ghg1h');
console.log(1>0);//true
console.log(1>=0);//true
console.log(1 !=0);//true
console.log(!false);//true (not false)
console.log(1/0);//Infinity
console.log(-1 / 0); -Infinity
console.log(NaN==NaN);//false
console.log(NaN===NaN);//false
console.log(2 ** 53 - 1);//9007199254740991
console.log(900719925474099199n);//bigInt больще чем (2 ** 53 - 1)
console.log(`dghjgfkh ${a}`);
/*let password = prompt("ur password", "")
console.log(` ur password ${+password + 1}`);
console.log('10' + 10);//"1010"
console.log(10 - true);//9
console.log(+'10' + 10);//20
console.log(-'5' + +'5');//0
console.log(10 == '10');//true
console.log(10 === '10');//false
console.log(true == '1');//true
console.log(+'1 0');// nan
console.log(+'');//0
console.log(typeof +'');// number
console.log(+' ');//0
console.log(+ null);//0
console.log(+undefined);//nan
console.log(!!false); //false
console.log(!false); //true
console.log(!10);//false
console.log(!!10);//true
console.log(!!0);//false
console.log(!!Infinity);//true
console.log(!!NaN);//false
console.log(!!'jjkjk');//true
console.log(!!"");//false
console.log(!!" ");//true
console.log(!!null);//false
console.log(!!undefined);//false
console.log(!" ");//false
console.log(!"");//true
 let i = 5
 console.log(i++ + 10); //15
console.log(i);//6
let c = 5 
console.log(++c + 10);//16
console.log(c);//6
let counter = 1;
let a = counter++; // (*) меняем ++counter на counter++
console.log(a); // 1
let b=a+1
console.log(b);

let c1ounter = 4;

console.log(c1ounter++);//4

let r = 0;
r++
console.log( r ); //1*/

let result = 5>4
console.log(result);//true
console.log("fgfg">"hghfhd");//false
console.log('2'>1);// true, строка '2' становится числом 2
console.log('01'=1);// true, строка '01' становится числом 1
console.log(null==undefined);// true
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true
//С точки зрения математики это странно. Результат последнего сравнения говорит о том, что «null больше или равно нулю», тогда результат одного из сравнений выше должен быть true, но они оба ложны.

//Причина в том, что нестрогое равенство и сравнения > < >= <= работают по-разному. Сравнения преобразуют null в число, рассматривая его как 0. Поэтому выражение (3) null >= 0 истинно, а null > 0 ложно.

//С другой стороны, для нестрогого равенства == значений undefined и null действует особое правило: эти значения ни к чему не приводятся, они равны друг другу и не равны ничему другому. Поэтому (2) null == 0 ложно.
