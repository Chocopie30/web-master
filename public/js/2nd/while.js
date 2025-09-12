let i = 1;

while (true) {
  let ran = parseInt(Math.random()*10);
  console.log(`임의의 값 : ${ran}`);
 if (i >= 10) {
    break;
  }
  i++;
}

console.log(`ran의 값은 ${ran}`);

// 1 ~ 10까지 출력
// let i = 1;
// while(i <= 10) {
//   console.log(`i의 값은 ${i}`);
//   i++;
// }