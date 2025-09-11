let num1 = prompt("첫번째 숫자");
let num2 = prompt("두번째 숫자");
//parseInt parseFloat Number String boolean
let result = parseInt(num1) + parseInt(num2);

if (result % 3 == 0) {
  console.log(result + "는 3의 배수입니다");
} else {
  console.log(result + "는 3의 배수가 아닙니다");
}
