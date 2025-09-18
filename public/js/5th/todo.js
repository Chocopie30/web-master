for (let i = 1; i < 6; i++) {
  console.log('*'.repeat(i));
}
console.log('');

for (let i = 5; i >= 0; i--) {
  console.log('*'.repeat(i));
}
console.log('');

let space = ' ';
let n = 5;
for (let i = n; i >= 0; i--) {
  let result = space.repeat(n - i);
  result += '*'.repeat(i);
  console.log(result);
  result = '';
}