//이벤트
document.querySelector('div.container>form').addEventListener('submit', function (e) {
  e.preventDefault(); // 기본 기능 차단
  addPost();
})

// 추가 버튼으로 데이터 등록
function addPost() {
  const xhtp = new XMLHttpRequest();
  xhtp.open('post', 'http://localhost:3000/posts');
  //post 요청일 때, 요청 헤더 : 컨텐츠 형식 지정
  xhtp.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
  xhtp.send(JSON.stringify({
    title: document.querySelector('#title').value,
    // id-'#title' 대신, 태그[속성]-'input[name="title"]' 로도 부를 수 있다.
    author: document.querySelector('#author').value
  })); // 자바스크립트 문자를 JSON 형식 문자로 변환
  xhtp.onload = function () {
    let result = JSON.parse(xhtp.responseText);

    let div = makeRow(result);

    document.querySelector('#data-container').appendChild(div);
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}
// 반복되는 부분 함수로 구현
function makeRow(post) {
  let fields = ['id', 'title', 'author'];

  let div = document.createElement('div');

  // div에  클릭이벤트.
  div.addEventListener("click", function () {
    // 댓글목록을 가져와서 보여주기.
    const target = this; // div 선택
    const post_id = this.children[0].innerHTML; // div 첫번째 자식 안에 숫자 읽기
    // 댓글목록 만들기.
    const cList = document.querySelector(".comments"); // <div class='comments'> 찾기.
    cList.innerHTML = ""; // html값을 초기화하기.
    // 전체 댓글목록에서 post에 해당하는 댓글을 filtering 하기.
    const filterList = comments.filter((item) => item.postId == post_id);
    // 댓글목록을 반복하면서 <span>댓글번호</span><span>댓글내용</span> 만들기.
    filterList.forEach((item) => {
      let div = document.createElement("div");
      let span = document.createElement("span"); // 댓글id
      span.setAttribute('class', 'comments-id');
      span.innerHTML = item.id;
      div.appendChild(span);
      span = document.createElement("span"); // 댓글내용.
      span.setAttribute('class', 'comments-content');
      span.innerHTML = item.content;
      div.appendChild(span);
      // div와 span의 부모자식관계 만들기.
      cList.appendChild(div); // <div class='container'>의 부모자식관계 만들기.
    });
    target.appendChild(cList); // 선택한 div에 하위요소로 보여주기.
  }); // div의 클릭이벤트 끝.

  for (let i = 0; i < fields.length; i++) {
    let span = document.createElement('span');
    span.innerHTML = post[fields[i]];
    span.setAttribute('class', 'data-' + fields[i]);
    div.appendChild(span);
  };
  return div;
}

// 저장된 데이터로 화면에 표시하기
const xhtp = new XMLHttpRequest();
xhtp.open('get', 'http://localhost:3000/posts');
xhtp.send();
xhtp.onload = function () {
  let data = JSON.parse(xhtp.responseText);
  // console.log(data);

  data.forEach(function (item) {
    let div = makeRow(item);
    document.querySelector('#data-container').appendChild(div);
  })
};

// 댓글 db 불러오기
const xhtp2 = new XMLHttpRequest();
xhtp2.open("get", "http://localhost:3000/comments"); // 서버의 요청할 페이지 지정.
xhtp2.send(); // 실제 요청.
xhtp2.onload = function () {
  comments = JSON.parse(xhtp2.responseText);
};

const person = {
  name: 'Hong',
  birth: '1999-09-09',
  phone: '010-9999-0909'
}
person.name;
person['birth'];
const prop = 'phone';
person[prop];