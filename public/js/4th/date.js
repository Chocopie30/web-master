const now = new Date();

console.log(now.toLocaleDateString() + now.toLocaleTimeString());

let today = new Date('2025-05-30 09:28')
today.setFullYear(2024);
today.setMonth(8);
today.setDate(28);

console.log(today.getFullYear()); //년
console.log(today.getMonth()); // 월 1월(0) ~ 12월(11)
console.log(today.getDate()); // 일
console.log(today.getDay()); // 요일 일(0) ~ 토(6)

console.log(today.toLocaleString());


//날짜 입력하면 '2025-11-12' => 요일 정보 반환 함수
function translateDay(s) {
  const inp = new Date(s);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  let che = inp.getDay();
  return `${s}는 ${days[che]}요일 입니다`

  // switch (che) {
  //   case 0:
  //     return '일'
  //   case 1:
  //     return '월'
  //   case 2:
  //     return '화'
  //   case 3:
  //     return '수'
  //   case 4:
  //     return '목'
  //   case 5:
  //     return '금'
  //   case 6:
  //     return '토'
  // }
}

console.log(translateDay('2025-10-03'));