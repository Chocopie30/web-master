// Add 누르면 목록에 데이터 추가되기
// 클릭하면 li에 class checked 추가
//  클릭하면 li안에 span 넣어 X만들고
//  display 속성 none으로 변경 or remove()

function newElement() {
  let li = document.createElement('li');
  li.innerHTML = document.querySelector('#myInput').value;
  document.querySelector('#myUL').appendChild(li);
};

document.querySelector('#myUL').addEventListener('click', function (e) {

  const is_il = e.target;
  console.dir(is_il);
  if (is_il.localName == 'li') {
    if (is_il.classList.contains('checked')) {
      is_il.classList.remove('checked');
      is_il.children[0].remove();
    } else {
      is_il.setAttribute('class', 'checked');
      let span = document.createElement('span');
      span.setAttribute('class', 'close');
      span.innerHTML = 'X';
      is_il.appendChild(span);
    };
  };

  if (is_il.classList.contains('close')) {
    is_il.parentElement.remove();
  }
});

// clone 기능
// document.querySelector('원하는 요소').cloneNode(true); : 기본값 false
// false면 안에 요소를 까지 복제하지 않는다

// classList
// .add('이름') 추가, .remove('이름') 제거, .contains('이름') 확인