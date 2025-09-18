let name = 'Hong';
let age = 20;

let result = '';

// ${}: 복잡한 연산식 넣지 못함
if (age >= 20) {
  result = '성인'
} else {
  result = '미성년'
}

// ${}: 간단한 연산식 넣을 수 있음 - 삼항 연산식
// 조건식 ? true : false;
result = age >= 20 ? '성인' : '미성년';

console.log(`내 이름은 ${name == 'Hong'}, ${age >= 20 ? '성인' : '미성년'}`);

//indexOf('매개값')
let idx = 'Hello, World'.indexOf('W'); // 결과 : 7

idx = '김성태, 박명식, 남승원'.indexOf('남승투'); // 결과 : -1 (없어서)

console.log(idx);

let myFriends = ['탄지로', '남승원', '젠이츠', '이노스케'];

myFriends.forEach((item, idx, ary) => {
  if (item.indexOf('젠') != -1) { // 같은 값이 하나라도 있으면 찾을 수 있다
    console.log(item);
  }
});

// 원시데이터형 : string, number, boolean

// 문자열 <-> 문자객체 new String('hello');
// slice
//slice(포함,미포함); so 뒷자리는 포함하고 싶은위치 +1
let world = 'pizza, chicken, hamburger'.slice(0, 5);
console.log(world); // pizza

world = 'pizza, chicken, hamburger'.slice(-9);
console.log(world); // hamburger : 원하는 만큼 뒤에서 불러오기

world = 'pizza, chicken, hamburger'.substring(0, 5);
console.log(world); // slice랑 비슷하지만 뒤에서부터 자를 수 없고,
// 인자값 순서가 잘못되어도 알아서 순서를 바꿔 처리한다

// 객체만 메소드를 담을 수 있다
// toUpperCase() : 대문자로 변환, toLowerCase() : 소문자로 변환 

// charAt() : String 타입 문자열에서 특정 문자를 char 타입으로 변환
console.log('Hello, World'.charAt(7));

// replace() : 원하는 거 찾아서 바꾸기
console.log('Hello, World'.replace('W', 'T'));

// trim() : 좌우 공백 없애기
console.log('           Hello           '.trim());

// 성별판별 함수
function getGender(no) {
  let n = 7;
  // -가 없으면
  if (no.indexOf('-') == -1) {
    n--;
    if (no.indexOf('2' || '4') == no.charAt(n)) {
      return console.log('여성');
    } else {
      return console.log('남성');
    }
  }

  //-가 있으면
  if (no.indexOf('2' || '4') == n) {
    console.log('여성');
  } else {
    console.log('남성');
  }

  // 교수님 코드
  // let pos = -1;
  // pos = no.length == 14 ? 7 : 6;
  // if (no.charAt(pos) == 1 || no.charAt(pos) == 3) { console.log('남자'); }
  // else { console.log('여자'); }
}

//남 남 여 여
const numAry = ['990101-1234678', '030101-3234678', '980101-2234678', '0009284027487'];
numAry.forEach((item) => {
  getGender(item);
});

// 사용자 아이디 확인
function getId(mail) {
  let n = mail.indexOf('@');
  console.log(mail.slice(0, n));
}

const emails = [
  "rstuckey0@ted.com",
  "jmcmanamon1@vistaprint.com",
  "fkirvin2@hhs.gov",
  "egreenacre3@cyberchimps.com"
];

emails.forEach((item) => {
  getId(item);
})