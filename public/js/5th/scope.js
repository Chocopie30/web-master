// 전역(global), 지역(local)
// var (전역 or 지역) & let, const (블럭단위)

var myAge = 20;

function showAge() {
  var myAge = 22;
  console.log(myAge + 1);
}
showAge();

{
  var myAge = 10;
  myAge += 1;
}
console.log(myAge + 1);