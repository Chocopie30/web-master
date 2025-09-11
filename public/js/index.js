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