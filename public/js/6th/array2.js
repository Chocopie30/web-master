const xhtp = new XMLHttpRequest();
xhtp.open('get', '../5th/data.json');
xhtp.send();
xhtp.onload = function () {
  console.log(JSON.parse(xhtp.responseText));

  // filter, map => 여자사원 / 사번, 이름(성+이름), 급여 출력
  const womanEmployee = JSON.parse(xhtp.responseText);

  womanEmployee.filter((item) => item.gender == 'Female')
    .map(item => {
      let {
        id,
        salary
      } = item;
      let name = `${item.first_name} ${item.last_name};`
      return {
        id,
        name,
        salary
      };
    })
    .forEach((item) => {
      console.log(`사번: ${item.id}, 이름: ${item.name}, 급여: ${item.salary}`);
    });
};