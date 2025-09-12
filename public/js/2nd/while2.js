let sum = 0;
let count = 0;

while (true) {
  let userValue = prompt("숫자를 입력하세요. 종료하려면 exit");
  if (userValue == 'exit') {
    break;
  }
  sum += parseInt(userValue);
  count++;
}
console.log(`학생들의 총점 : ${sum}, 평균 : ${sum/count}`);