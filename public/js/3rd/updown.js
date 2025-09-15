function updown() {
  let num = parseInt(Math.random() * 100 +1)
  let inp =0;
  let i = 0;
  for (i =0; i <10; i++){
  inp = parseInt(prompt('1~100 숫자 중 입력하세요'));
    if(inp == num) {
      console.log('정답입니다');
      break;
    } else if (inp < num) {
      console.log('up');
    } else {
      console.log('down');
    }
  }
  if (i==10) {
      console.log('기회가 끝났습니다.');
  }
}
updown();