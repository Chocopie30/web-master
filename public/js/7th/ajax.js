// ajax: 비동기방식 (javascript 기본)
// Asynchronous Javascript And XML (Json)

// let members = [];
// const xhtp = new XMLHttpRequest();
// xhtp.open('get', '../5th/data.json');
// xhtp.send();
// xhtp.onload = function () {
//   members = JSON.parse(xhtp.responseText);
// };
// console.log(members); // 결과: []
// 비동기방식으로 위에 작업 콜백 큐에 넣어두고 나중에 실행


// 비동기방식
// setTimeout(function () {
//   console.log('첫번째 함수');
// }, 1000);
// setTimeout(function () {
//   console.log('두번째 함수');
// }, 2000);
// setTimeout(function () {
//   console.log('세번째 함수');
// }, 500);

// 동기방식
// setTimeout(function () {
//   console.log('첫번째 함수');
//   setTimeout(function () {
//     console.log('두번째 함수');
//     setTimeout(function () {
//       console.log('세번째 함수');
//     }, 500);
//   }, 2000);
// }, 1000);