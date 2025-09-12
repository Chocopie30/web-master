let sum = 0;

let sum2 = 0;
let sum3 = 0;

for (let i = 1; i < 101; i++) {
  let ran = parseInt(Math.random() * 10) +1
  if (ran % 2 == 0) {
    sum2 += ran;
  }
  if (ran % 3 == 0) {
    sum3 += ran;
  }
}
console.log(`2의 배수의 합은 ${sum2}, 3의 배수의 합은 ${sum3}`);

// 1 ~ 100 숫자중에 2의 배수, 3의 배수 각각 합 저장해 출력
// let sum2 = 0;
// let sum3 = 0;

// for (let i = 1; i < 101; i++) {
//   if (i % 2 == 0) {
//     sum2 += i;
//   }
//   if (i % 3 == 0) {
//     sum3 += i;
//   }
// }
// console.log(`2의 배수의 합은 ${sum2}, 3의 배수의 합은 ${sum3}`);


// 1 ~ 100 값중 3의 배수의 합 구하기
// for (let i = 1; i < 101; i++) {
//   if (i % 3 == 0) {
//     sum += i;
//   }
// }
// console.log(`3의 배수의 합은 ${sum}`);


// 합이 30이상 일때 출력
// for (let i = 1; i <= 10; i++) {
//   sum += i;
//   if (sum > 30) {
//     console.log(`sum의 값은 : ${sum}`);
//   }
// }