document.querySelector('table').remove();

let str = 'Lorem ipsum dolor sit amet consectetur adipisicing elit Obcaecati vel ipsa alias dolore exercitationem impedit quasi atque Et similique accusantium harum quidem est quasi debitis id assumenda reprehenderit laboriosam ratione.';
// console.log(str.length); 문장 길이 확인
let strAry = str.split(' ');
// console.log(strAry); 공백을 끊어 만든 배열 확인
const outer = document.querySelector('div.outer');

strAry.forEach(function (item) {
  let div = document.createElement('div');
  div.innerHTML = item;
  div.setAttribute('class', 'inner');
  outer.appendChild(div);
});

let timing = 10;

// 찾기버튼 클릭하면 alert('클릭')
document.querySelector('#search_word').addEventListener('click', function () {
  let search = document.querySelector('#user_value').value;
  let is_exit = false;
  document.querySelectorAll('div.inner').forEach(function (item) {
    if (search == item.innerHTML) {
      // console.dir(item);
      item.remove();
      is_exit = true;
    }
  });
  if (is_exit == false) {
    alert('찾는 값이 없습니다.');
  } else {
    alert('삭제 되었습니다.');
  }
  document.querySelector('#user_value').value = '';
});


setInterval(function () {
  console.log(`남은시간 ${timing--}`);
  console.log(document.querySelectorAll('div.inner').length);
  if (timing == 0 && document.querySelectorAll('div.inner').length > 0) {
    alert('실패');
    return 0;
  } else if (timing > 0 && document.querySelectorAll('div.inner').length == 0) {
    alert('성공');
    return 0;
  }
}, 1000)