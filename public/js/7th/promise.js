// 콜백함수 -> 순차적으로 구성
//매개값을 함수: 함수 기능을 매개값으로 받겠다
function callFnc(x1 = 0, x2 = 0, anonymousFnc) {
  return anonymousFnc(x1, x2);
};
let result = callFnc(10, 20, function (a, b) {
  return a + b;
});
console.log(result);

// 비동기방식을 동기방식으로 처리할때 사용
const promise = new Promise(function (resolve, reject) { // new: 객체를 생성할 때;
  resolve('Ok');
  reject('NG')
});

// promise가 잘 실행이 되면 정의되진 함수의 첫번째 매개변수를 실행
// 함수안에 함수를 넣는 동기방식보다 순차적으로 보기 좋다.
promise.then(function (responese) {
    console.log(responese);
  })
  .then(function (result) {
    console.log(result);
  });
// promise에서 reject에 들어가는 값 실행
promise.catch(function (err) {
  console.log(err);
});