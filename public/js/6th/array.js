const names = ['정철', '한인호', '정우성', '한용희', '남승원', '북승원'];

// filter() => true값에 해당하는 요소들을 새로운 배열에 저장
const result = names.filter(item => {
  // if (item.indexOf('승원') != -1) return true;
  return item.indexOf('정') == 0 ? true : false;
});
console.log(result);

const numbers = [23, 44, 22, 57, 80, 19];
const evenNumbers = numbers.filter((item) => item % 2 == 0)

console.log(evenNumbers);

// map() => 기본 형태를 원하는 다른 형태로 바꿈
const students = [{
    sno: 100,
    sname: '스누피',
    score: 80
  },
  {
    sno: 200,
    sname: '포차코',
    score: 75
  },
  {
    sno: 300,
    sname: '몰티즈',
    score: 85
  },
  {
    sno: 400,
    sname: '뜨아거',
    score: 55
  },
]

students
  .map(item => {
    let {
      sno,
      sname
    } = item;
    let isPass = item.score > 60 ? 'pass' : 'fail';
    return {
      sno,
      sname,
      isPass
    };
  })
  .filter((item) => item.isPass == "pass")
  .forEach((item) => {
    console.log(item);
  });