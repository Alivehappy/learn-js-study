alert(Boolean(1));//true
alert(Boolean(0));//false
alert(Boolean("Hello"));//true
alert(Boolean(""));//false
alert(Boolean("0"));//true
alert(Boolean(" "))://true
/*undefined при численном преобразовании становится NaN, не 0.
"0" и строки из одних пробелов типа " " при логическом преобразовании всегда true.*/
alert(Number("   123   "));
alert(Number(true)); //1
alert(Number(false)); //0 Учтите, что null и undefined ведут себя по-разному. Так, null становится нулём, тогда как undefined приводится к NaN.
let value = true;
alert(typeof value);
value = String; //function
alert(typeof value);
value = String(value); //string!!!!
alert(typeof value);
alert(6 / 2);
let str = 123;
alert(typeof str); //number
let str1 = "123";
alert(typeof str1);
let num = Number(str1); // number!!!!!
alert(typeof num);
let age = Number("any string instead of number");
alert(age); //nan
Учтите, что null и undefined ведут себя по-разному. Так, null становится нулём, тогда как undefined приводится к NaN.


let str = "42";
let num = (Number(str));
console.log(num)//(42);
console.log(typeof num);


let Value = " 3.14 ";
let value1 = Number(Value);
alert(value1)
