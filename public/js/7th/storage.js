// console.log(window);
// localStorage.setItem('myName', '정재');
localStorage.setItem('myInfo', '{"name":"Nam","age":20}'); //정보넣기
let info = JSON.parse(localStorage.getItem('myInfo')); //정보가져오기
// console.log(info);

// 데이터 입력 -> 이미 들어갔으니 주석
// localStorage.setItem('students', JSON.stringify([{ //JSON 문자열로 변환
//   sno: 100,
//   sname: '홍길동',
//   score: 80
// }, {
//   sno: 200,
//   sname: '박철수',
//   score: 85
// }, {
//   sno: 300,
//   sname: '김민우',
//   score: 76
// }]))

// 데이터 화면에 띄우기 함수
function loadData() {
  document.querySelector(".data-container").innerHTML = ""; //기존값 지우고...
  let data = JSON.parse(localStorage.getItem("students"));
  data.forEach((item) => {
    let div = document.createElement("div");
    for (let prop in item) {
      let span = document.createElement("span");
      span.innerHTML = item[prop];
      span.setAttribute("class", "data-" + prop);
      div.appendChild(span);
    }
    // 수정화면으로 이동하는 버튼
    let btn = document.createElement('button');
    btn.innerHTML = '수정';
    btn.addEventListener('click', function (e) {
      // search : sno 저장
      localStorage.setItem('search', item.sno);
      location.href = 'update.html';
    });
    div.appendChild(btn);
    document.querySelector(".data-container").appendChild(div);
  });
}
loadData(); //  목록출력.

// 현재값을 불러오기
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  let sno = document.getElementById('sno').value;
  let sname = document.getElementById('sname').value;
  let score = document.getElementById('score').value;

  if (!sno || !sname || !score) {
    alert('값을 입력 해');
    return;
  }

  if (!confirm('저장할래오?')) {
    alert('그래 취소');
    return;
  }

  let data = JSON.parse(localStorage.getItem('students'));
  data.push({
    sno,
    sname,
    score
  });
  localStorage.setItem('students', JSON.stringify(data));

  loadData();
})