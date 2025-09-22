const obj = { //객체, 하나의 값
  name: 'Hong',
  age: 20,
  showInfo() {
    return `이름은 ${this.name}, 나이는 ${this.age}`;
  }
};
console.log(obj.showInfo());

// 클래스 (실사물의 전산적 표현 => 객체(클래스))
class Person {
  constructor(name, height, weight, bloodType) { // 구조 생성
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.bloodType = bloodType;
  }
  showInfo() {
    return `이름은 ${this.name}, 키는 ${this.height}, `;
  }
}
const p1 = new Person('Hong', 178.9, 72.3, 'O'); // 인스턴스 생성, 실체 생성
const p2 = new Person('Hwang', 170.2, 68.8, 'A');

console.log(p1.name, p1.height);
console.log(p1.showInfo(), p2.showInfo());