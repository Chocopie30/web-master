let students = [{
  stdNo: 100,
  stdName: '정씨',
  score: 99
}, {
  stdNo: 200,
  stdName: '남씨',
  score: 89
}];



// prop 이해하깅
for (let prop in students[0]) {
  console.log(prop, students[0][prop]);
}



// 등록버튼
document.querySelector('#addBtn').addEventListener('click', function () {
  // 등록정보 받아올 곳
  const newElement = {
    stdNo: document.querySelector('#student_no').value,
    stdName: document.querySelector('#student_name').value,
    score: document.querySelector('#score').value
  }
  // 정보 받아 표만들기
  let tr = makeTr(newElement);

  document.querySelector('#list tbody').appendChild(tr);
}) // 등록 이벤트



// 이미 입력되어 있는 정보 화면에 출력하는 함수
function createStdList() {
  for (let i = 0; i < students.length; i++) {
    let tr = makeTr(students[i]);

    document.querySelector('#list tbody').appendChild(tr);
  }
} // end of createStdList
createStdList(); // 이미 있는 거 출력하기




// 표만들기 반복되는 부분 빼와서 함수 만들기
function makeTr(newElement) {

  console.log(newElement);
  let tr = document.createElement('tr');

  for (let prop in newElement) {
    let td = document.createElement('td');
    td.innerHTML = newElement[prop];
    tr.appendChild(td);
  }

  let td = document.createElement('td');
  let btn = document.createElement('button');
  btn.addEventListener('click', function (e) {
    e.target.parentElement.parentElement.remove();
  });
  btn.setAttribute('class', 'btn btn-danger');
  btn.innerHTML = '삭제';
  td.appendChild(btn);
  tr.appendChild(td);

  //생성한 tr 반환
  return tr;
} // end of makeTr