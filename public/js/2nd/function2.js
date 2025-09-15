// 매개변수(2개) 입력받아 숫자들 사이 모든 수 합 구하기
function sumBy2Number(n1,n2) {
  let small = 0;
  let big = 0;
  let sum = 0;

  if (n1 == n2) {
    console.log(`두 수의 값이 같습니다`);
    return 0;
  }

  // 조건문 switch
  // switch(true) {
  //   case n1>n2 :
  //     small = n2;
  //     big = n1;
  //   case n1<n2 :
  //     small = n1;
  //     big = n2;
  // }
  
  //조건문 if문
  if(n1>n2) {
    small = n2;
    big = n1; 
  } else {
    small = n1;
    big = n2;
  }

  // 반복문 while
  // while (true) {
  //   sum += small;
  //   if(small >= big) {
  //     break;
  //   }
  //   small++;
  // }
  // console.log(sum);

  // 반복문 for문
  for(small; small <= big; small++){
    sum += small;
  }
  console.log(`두 사이 합 ${sum}`);
  return sum; //함수를 호출한 영역으로 값을 반환한다
}
let result = sumBy2Number(10,10);
console.log(`합은 ${result}`);


// 매개변수(2개) 입력받아 큰 수 콘솔에 출력 => showMax
function showMax(n1, n2) {
  if (n1 > n2) {
    console.log(`${n1}, ${n2}중에 ${n1}(이)가 더 크다`);
  } else {
    console.log(`${n1}, ${n2}중에 ${n2}(이)가 더 크다`);
  }
}
// showMax(70,100);


// 구구단 x단을 콘솔에 출력하는 함수 => multiplication
function multiplication(x) {
  for (let i = 1; i < 10; i++) {
    console.log(`${x} * ${i} = ${x*i}`);
  }
}
// multiplication(5);