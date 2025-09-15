let students = [{
    stdNo: 100,
    stdName: '홍씨',
    stdScore: 80
  },
  {
    stdNo: 200,
    stdName: '남씨',
    stdScore: 85
  }
];

// 이벤트

// 등록
document.querySelector("#addBtn").addEventListener('click', function () {
  // 입력 값 받아 배열에 넣기
  let sno = document.querySelector('#student_no').value;
  let sname = document.querySelector('#student_name').value;
  let score = document.querySelector('#score').value;
  // 필수 값 입력
  if (sno == '' || sname == '' || score == '') {
    alert('값을 입력하세여');
    return;
  }

  students[students.length] = {
    stdNo: sno,
    stdName: sname,
    stdScore: score
  };
  console.log(students);
  createStdList();
  // 값 받고 입력정보 초기화
  document.querySelector('#student_no').value = '';
  document.querySelector('#student_name').value = '';
  document.querySelector('#score').value = '';
});

// 수정
document.querySelector('.addBtn').addEventListener('click', function () {
  let nodeList = document.querySelectorAll('#list tbody tr');
  let sno = document.querySelector('#student_no').value;
  let score = document.querySelector('#score').value;
  for (let i = 0; i < nodeList.length; i++) {
    // console.dir(nodeList[i]);
    if(nodeList[i].children[0].innerHTML == sno) {
      nodeList[i].children[2].innerHTML = score;
    }
  }
});

// 함수

// 배열 값을 활용해 학생 목록 출력
function createStdList() {
  let str = ``;
  for (let i = 0; i < students.length; i++) {
    str += `<tr onclick='showInfo(event)'><td>${students[i].stdNo}</td>
    <td>${students[i].stdName}</td>
    <td>${students[i].stdScore}</td>
    <td><button class='btn btn-danger' onclick='removeRow(event)'>삭제</button></td>
    </tr>`;
  }
  document.querySelector('#list tbody').innerHTML = str;
}
createStdList();

// 학생 정보 삭제
function removeRow(e) {
  // console.dir(e.target);
  e.target.parentElement.parentElement.remove();
}

// 학생 정보 입력 창으로 올리기
function showInfo(e) {
  // console.dir(e.target.parentElement.children[1].innerHTML);
  document.querySelector('#student_no').value = e.target.parentElement.children[0].innerHTML;
  document.querySelector('#student_name').value = e.target.parentElement.children[1].innerHTML;
  document.querySelector('#score').value = e.target.parentElement.children[2].innerHTML;
}

// querySelctorAll로 모든 지정요소 선택 후 배열 숫자로 지정 가능
// document.querySelectorAll('button')[0].addEventListener(); 