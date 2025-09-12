let user_id = "user01"
let user_age = 20;
let is_child = false;

function show_info() {
  console.log("회원의 아이디는 " + user_id);
}
show_info();

function changeWord() {
  document.querySelector('h3#world').innerHTML = "안녕!";
}
//condition.js 활용 기능
function changeValue() {
  // let num = 78;
  //document.querySelector('#user_value').value;
  let score = document.querySelector('#user_value').value;

  if (score >= 90) {
    console.log("아주 잘했습니다");
  } else if (score >= 80) {
    console.log("잘했습니다");
  } else if (score >= 70) {
    console.log("보통입니다");
  } else if (score >= 60) {
    console.log("노력하세요");
  } else {
    console.log("망했습니다");
  }
}