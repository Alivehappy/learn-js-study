"use strict";
function factorial(n){
    let result = 1;
    for (let i = 1; i<=n; i++){
        result *=i
    }
    return result;
}
console.log(factorial(5));
console.log(factorial(6));
/*Если вы хотите вызвать функцию без использования console.log, то вы можете просто вызвать её, и она выполнит свой код. Однако, если функция возвращает результат (например, с помощью return), и вы хотите увидеть этот результат, то без console.log или другого способа вывода вы не сможете его увидеть в консоли*/

function num (n){
    if ( n < 1 ) return false;
    for (let i = 2; i <= n; i++){
        if( n % i === 0 ) {
            return false;
        }
        return true;
    }

}
console.log(num (7))

for (let i = 1; i <=10; i++){
    for ( let j = 1; j <= 10; j++){
        console.log(`${i} * ${j} = ${ i * j}`);
    }
    console.log( '---')
}
/* i увеличивается только после завершения внутреннего цикла
Внешний цикл (i) выполняется 10 раз (от 1 до 10).

Для каждого значения i внутренний цикл (j) выполняется полностью (от 1 до 10).*/

function pyramid (n){
    for (let i = 1; i <= n; i++){
        let row = '';
        for (let j = 1; j <= i; j++){
            row += j + ' ';
        }
        console.log(row);
    }
} 
pyramid (6);
/*При объявлении row внутри внешнего цикла (let row = '';) переменная автоматически инициализируется как пустая строка в начале каждой итерации. Это гарантирует, что каждая строка пирамиды начинается с чистого состояния.row нужна только для формирования текущей строки.

*/

function bubbleSort(arr){
    let n =  arr.length;
    for (let i = 0; i < n - 1; i++){
        for (let j = 9; j < n - 1 - i; j++){
            if (arr[j] > arr[j+1] ){
                let temp = arr[j];
                
            }
        }
    }
}