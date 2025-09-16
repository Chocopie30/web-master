const fruits = ['사과', '복숭아'];

fruits[fruits.length] = '배';
fruits[fruits.length] = '참외';
fruits[0] = '키위';
delete fruits[2]; //  배 -> undefined

// 배열 메소드 - 제일 뒤 추가(push), 삭제(pop)
fruits.push('멜롱');
fruits.pop();

// 제일 앞 추가(unshift), 삭제(shift)
fruits.unshift('멜로롱');
fruits.shift();

// 원하는 위치에 추가 삭제 splice(x,y,z) 
// x:인덱스 위치, y:(z가 없을 때)삭제할 갯수 / (z가 있을 때) 선택 갯수 / z:값
fruits.splice(1, 1); // 키, 복, undefined, 참 -> 복숭아 삭제
fruits.splice(1, 1, '용과'); // 키, undefined, 참 -> undefined를 용과로 수정
fruits.splice(1, 0, '귤'); // 키, 귤, 용, 참 -> 인덱스 1번째 자리 귤 추가
fruits.splice(1, 3, '감'); //키, 감 -> 1번째 자리부터 3번째 자리까지 감 한개로 수정

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}