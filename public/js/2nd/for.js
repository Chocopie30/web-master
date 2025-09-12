let sum = 0;

document.writeln(`<table class='table table-striped'>`)
document.writeln(`<thead>
  <tr> <th>단수</th> <th></th> <th>배수</th> <th></th>
  <th>결과</th> </tr> </thead> <tbody>`)

for (let i = 1; i <= 9; i++) {
  // 콘솔에 표시하기
  // console.log(`3 * ${i} = ${3 * i}`);

  // 페이지에 표시하기
  document.writeln(`<tr> <td>3</td> 
    <td>*</td> <td>${i}</td> <td>=</td> <td>${3 * i}</td> </tr>`);
}

document.writeln(`</tbody></table>`)

// 1에서 10까지 더하기

// for (let i = 1; i <= 10; i++) {
//   console.log(`sum: ${sum}, i: ${i} => sum: ${sum + i}`);
//   sum += i;
// }

// console.log(`총 합은 : ${sum}`);