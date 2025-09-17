// 1.함수: window객체 2.이벤트: 이벤트 받는 대상 3.객체: 객체 자신

function sum(n1, n2) {
  console.log(this);
  return n1 + n2;
}
sum(1, 2);

document.querySelector('table').addEventListener('click', function (e) {
  console.log(this);
  console.log(e.target);
})

const obj = {
  name: '홍',
  show: function () {
    console.log(this);
    return `이름은 ${this.name}`;
  }
}
console.log(obj.show());