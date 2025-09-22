// 원시 데이터 타입
let fruit = 'apple';
let newFruit = fruit;
newFruit += ', mango';
console.log(fruit, newFruit);

// 배열도 object
const veggie = ['tomato', 'cucumber', 'beans']; // ...veggie
const newVeggie = veggie; // 객체의 주소가 동일

newVeggie.push('peas');
console.log(veggie, newVeggie); // 같은 배열을 참조해 출력 같음

const anotherVeggie = [...veggie, ...['grape']];
// [...배열이름] : ... 펼침연산자, 배열을 펼쳐서 하나의 배열로 복사
anotherVeggie.push('carrot');
console.log(veggie, anotherVeggie);

// 펼침연산자
function sum(a = 0, b = 0, ...num) { // n1,n2,n3...
  let result = a + b;
  for (let n of num) {
    result += n;
  }
  return result;
}
console.log(sum(1, 2, 3, 4, 5, 6));

// 객체 펼침연산자
const myFriend = {
  name: 'hong',
  age: 20
};
const yourFriend = myFriend; // heap메모리의 주소 참조
myFriend.age = 22;
console.log(myFriend, yourFriend);

const anFriend = { //... 펼침연산자, 객체를 펼쳐서 하나의 객체로 복사
  ...myFriend
};
myFriend.name = 'Hwang';
console.log(myFriend, anFriend);