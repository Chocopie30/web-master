const person = {
  name: '동동이',
  age: 20
};

let {
  name,
  age
} = person; // 객체 destructuring
// let name = person.name;
// let age = person.age;
console.log(name, age);

const numAry = [10, 20, 30];
let [n1, n2, n3] = numAry; // 배열 destructuring
console.log(n1, n2, n3);

// 배열메소드: forEach(), map(), filter(), reduce()
const stdAry = [{
    sno: 100,
    name: "홍길동",
    score: 80
  },
  {
    sno: 200,
    name: "김민수",
    score: 60
  },
  {
    sno: 300,
    name: "박민규",
    score: 70
  }
];

// forEach()
// const newAry = [];

// stdAry.forEach((item) => {
//   if (item.score >= 70) {
//     newAry.push(item);
//   }
// })

// filter()
// const newAry = stdAry.filter((item) => {
//   if (item.score >= 70) {
//     return true;
//   } else {
//     return false;
//   }
// });

// map()
const newAry = stdAry.map(item => {
  const {
    sno,
    name
  } = item; // 객체 distructuring
  return {
    sno,
    name
  };
})
console.log(newAry);