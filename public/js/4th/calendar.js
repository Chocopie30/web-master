// 알고 싶은 년도 달력 입력
let yyyy = 2025,
  mm = 9;

let today = new Date();
today.setFullYear(yyyy);
today.setMonth(mm - 1);
today.setDate(1);
// 공란 갯수 구하기
let spaces = today.getDay();

// 말일 구하기
today.setMonth(mm);
let lastDay = new Date(today.getTime() - (1000 * 60 * 60 * 24)).getDate();

// 공휴일 지정
const holi = [10, 19, 25];

let tr = document.createElement('tr');
// 공란 띄우기
for (let s = 0; s < spaces; s++) {
  let td = document.createElement('td');
  tr.appendChild(td);
}
// 일 출력하기
for (let d = 1; d <= lastDay; d++) {
  let td = document.createElement('td');
  td.innerHTML = d;
  tr.appendChild(td);

  const isHoli = holi.includes(d);

  if ((d + spaces) % 7 == 0) {
    td.setAttribute('class', 'sat');
    document.querySelector('tbody').appendChild(tr);
    tr = document.createElement('tr');
  } else if ((d + spaces) % 7 == 1 || isHoli) {
    td.setAttribute('class', 'sun');
  }
}
document.querySelector('tbody').appendChild(tr);