const friends = [{
  name: '김우진',
  phone: '010-1111-1234'
}];

friends.push({
  name: '박은식',
  phone: '010-2222-1234'
});

friends.push({
  name: '김우식',
  phip_addressone: '010-3333-1234'
})

// let search = prompt('연락처를 찾을 친구의 이름을 입력하세요');

// friends.forEach(function (item, idx, ary) {
//   if (item.name == search) {
//     console.log(`${search}의 번호는 ${item.phone}`);
//   }
// });

const maleAry = [];

// 불러온  data 사원정보
data.forEach(function (item, idx, ary) {
  // 급여가 5000이상 사원 이름 급여 출력
  // if (item.salary >= 5000) {
  //   console.log(`이름: ${item.first_name} ${item.last_name}, 급여: ${item.salary}`);
  // }

  // 남자 사원들만 maleAry에 추가
  if (item.gender == 'Male') {
    maleAry.push(item);
  }
});

maleAry.sort(function (a, b) {
  if (a.salary < b.salary) {
    return -1;
  } else {
    return 0;
  }
})

console.log(maleAry);