let numAry = [10, 20, 30, 40, 50];

let sum = 0;
// 배열의 길이 만큼 반복
for (let num of numAry) {
  sum += num;
}
console.log(sum);

let student = {
  sno: 100,
  sname: '최민수',
  score: 5
};
for (let prop in student) {
  console.log(prop, student[prop]);
}