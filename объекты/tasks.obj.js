'use strict'

function makeUser(){
    return{
        name: 'John',
        ref: this
    };
}
let user = makeUser();
alert( user.ref.name );
/*Код пытается получить доступ к свойству name объекта, на который ссылается user.ref.
user.ref равно undefined Таким образом, ref: this фактически принимает текущее this функции makeUser,*/

