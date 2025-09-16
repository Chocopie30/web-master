const numAry = new Array(); //[];
numAry.push(10);
numAry.push(25);

numAry.push(34);
numAry.unshift(47);
numAry.splice(2, 0, 33);
numAry.splice(2, 0, 22, 19);

let sum = 0;

// 배열 크기만큼 반복 - forEach(function(x, y, z))
// x: 값, y:인덱스 위치, z:배열
numAry.forEach(function (item, idx, ary) {
  console.log(item);
  if (idx == 0 || idx == ary.length - 1) {
    sum += item;
  }
});
console.log(sum);