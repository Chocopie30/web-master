let num1 = 10;
let num2 = 20; // 갑 재할당 가능, 변수 재선언 불가능
var num3 = 300; //값 재할당 가능, 변수 재선언 가능
const num4 = 3.14; //값 재할당 불가능, 변수 재선언 불가능

{
  let num2 = 2; //블럭 안에선 재선언 가능, 블럭 안에서만 사용
  console.log(num2);
}
  console.log(num2);

function sum(n1,n2) {
  let result = n1 + n2;
  console.log(`결과는 : ${result}`);
}
sum(10,5);