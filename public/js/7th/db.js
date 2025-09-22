// 추가버튼
// document.forms['postForm'] : 화면에 폼중에 ['']이름인 친구 선택
document.forms['postForm'].addEventListener('submit', function (e) {
  // 기본 기능 제거
  e.preventDefault();
  // 입력 값 받아오기
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  // 입력 값 있는지 확인하기
  if (!title || !author) {
    alert('title, author 입력해주세요');
    return;
  }

  // ajax 요청방식:post
  fetch('http://localhost:3000/posts', { // {}안에 옵션 지정 가능
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ //JSON문자열로 변환
        title,
        author
      })
    })
    .then(responese => responese.json())
    .then(result => {
      console.log(result);
      let div = document.createElement('div');
      for (let prop in result) { // prop활용 잘하기
        let span = document.createElement('span');
        span.innerHTML = result[prop];
        span.setAttribute('class', 'data-' + prop);
        div.appendChild(span);
      }

      let btn = document.createElement('button');
      btn.innerHTML = '삭제';
      div.appendChild(btn);

      document.querySelector('#data-container').appendChild(div);
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';

    })
    .catch((err) => console.log(err));
})

// 게시글목록
fetch('http://localhost:3000/posts')
  .then(responese => responese.json())
  .then(result => {
    // console.log(result);
    result.forEach((item) => {
      let div = document.createElement('div');
      // const target = this;
      // const post_id = this.children[0].innerHTML;

      // const cList = document.querySelector(".comments");
      // cList.innerHTML = '';

      // const filterList = customElements.filter(item => item.postId == post_id);


      for (let prop in item) { // prop활용 잘하기
        let span = document.createElement('span');
        span.innerHTML = item[prop];
        span.setAttribute('class', 'data-' + prop);
        div.appendChild(span);
      }
      let btn = document.createElement('button');
      btn.innerHTML = '삭제';
      div.appendChild(btn);
      document.querySelector('#data-container').appendChild(div);
    })
  })
  .catch(err => console.log(err))

// 삭제 누르면 실행
document.querySelector('#data-container').addEventListener('click', function (e) {
  console.log(e.target.parentElement);
  const postDiv = e.target.parentElement;
  const spanId = postDiv.querySelector('.data-id').innerHTML;
  fetch(`http://localhost:3000/posts/${spanId}`, {
      method: 'DELETE'
    })
    .then(responese => e.target.parentElement.remove())
    .catch(err => console.log(err))
});