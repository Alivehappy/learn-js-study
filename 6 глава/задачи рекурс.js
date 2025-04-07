function sumDigits(n) {
	let n1 = String(n);
	if (n1.length === 1) {
		return Number(n);
	} else {
		const firstDigit = Number(n1[0]);
		const remainingNumber = Number(n1.slice(1));
		return firstDigit + sumDigits(remainingNumber);
	}
}
console.log(sumDigits(1234));
//(1234) → 10  # 1 + 2 + 3 + 4 = 10
//для получения подстроки, начиная с индекса 1 до конца строки.

function palindrome(str) {
	if (str.length === 1) {
		return true;
	} else {
		for (let i = 0; i <= str.length; i++) {
			const firstLet = str[0];
			const remainLet = str.slice(1);
			let newStr = firstLet + palindrome(str);
		}
		if (newStr !== newStr.split('').reverse().join('')) {
			return false;
		}
		return true;
	}
}
console.log(palindrome('racecar'));
console.log(palindrome('hello'));
