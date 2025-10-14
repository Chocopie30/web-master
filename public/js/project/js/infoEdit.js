// js/infoEdit.js
(() => {
  const form = document.getElementById('infoEditForm');
  const idInput = document.getElementById('userId');
  const pwInput = document.getElementById('userPw');
  const nameInput = document.getElementById('userName');
  const telInput = document.getElementById('userTel');
  const addrInput = document.getElementById('userAddress');

  // 전화번호 형식 (예: 010-1234-5678)
  const telRe = /^0\d{1,2}-\d{3,4}-\d{4}$/;

  // 1) 로그인 사용자 확인 + 프로필 불러오기
  document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('loggedInUser');
    if (!userId) {
      alert('로그인이 필요합니다.');
      location.href = 'login.html';
      return;
    }

    // 아이디 readonly 표시
    idInput.value = userId;

    try {
      const res = await fetch(`http://192.168.0.17:3000/user/profile?userId=${encodeURIComponent(userId)}`);
      const result = await res.json();
      if (!res.ok || !result?.success) {
        alert(result?.message || '회원 정보를 불러오지 못했습니다.');
        return;
      }
      const { userName, userTel, userAddress } = result.data;

      nameInput.value = userName || '';
      telInput.value = userTel || '';
      addrInput.value = userAddress || '';

      // 보안상 비밀번호는 미리 채우지 않음 (필요 시 새 비밀번호만 입력)
      pwInput.value = '';
    } catch (err) {
      console.error(err);
      alert('서버 오류가 발생했습니다.');
    }
  });

  // 2) 저장 (수정) 처리
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = idInput.value.trim();
    const userPw = pwInput.value.trim(); // 비워두면 비번 미변경
    const userName = nameInput.value.trim();
    const userTel = telInput.value.trim();
    const userAddress = addrInput.value.trim();

    if (!userName || !userTel || !userAddress) {
      alert('이름, 전화번호, 주소를 모두 입력해 주세요.');
      return;
    }
    if (!telRe.test(userTel)) {
      alert('전화번호 형식이 올바르지 않습니다. 예) 010-1234-5678');
      telInput.focus();
      return;
    }

    const payload = { userId, userName, userTel, userAddress };
    if (userPw) payload.userPw = userPw; // 새 비번 입력 시에만 전송

    try {
      const res = await fetch('http://192.168.0.17:3000/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result?.success) {
        alert(result?.message || '정보 수정에 실패했습니다.');
        return;
      }

      // 로컬스토리지의 이름도 최신으로 반영
      if (userName) localStorage.setItem('loggedInUserName', userName);

      alert('정보가 저장되었습니다.');
      location.href = 'main.html';
    } catch (err) {
      console.error(err);
      alert('서버 오류가 발생했습니다.');
    }
  });
})();
