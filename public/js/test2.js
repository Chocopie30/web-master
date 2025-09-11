let friend1 = {
  name : "박규태",
  height : 175
}

let friend2 = {
  name : "김민식",
  height : 180
}

if (friend1.height > friend2.height) {
  console.log(friend1.name+"(이)가 크다");
}

if (friend1.height < friend2.height) {
  console.log(friend2.name+"(이)가 크다");
}

friend1.height = 180;

if (friend1.height == friend2.height) {
  console.log(friend2.name+"과 "+friend1.name+"의 키는 동일하다.");
}

let num3 = prompt("숫자를 입력하세요: ");

if (num3 % 2 == 0) {
console.log("짝수 입니다");
}
else {
  console.log("홀수 입니다");
}


// if (num3 % 2 != 0) {
// console.log("홀수 입니다");
// }