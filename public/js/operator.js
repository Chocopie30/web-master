let num1 = 10;
let num2 = 20;
let result;
result = num1 + num2;

console.log("결과는 " + num1 + num2);
console.log("결과는 " + (num1 + num2));
console.log(num1 + num2 + " 입니다.");

num1 = 425;
result = num1 % num2;
console.log("나머지 " + result);
num1 = 3;
console.log(num1%2);

result = num1 % 2 == 0
console.log(result);

if(num1 % 2 == 0) {
  console.log("짝수 입니다.");
}

if(num1 % 2 != 0 ) {
  console.log("홀수 입니다.");
}
