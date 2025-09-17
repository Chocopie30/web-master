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