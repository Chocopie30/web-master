(() => {
  const findIdForm = document.getElementById('findIdForm');
  const findPwForm = document.getElementById('findPwForm');

  // 공통: 타임아웃 있는 fetch
  function fetchWithTimeout(url, options = {}) {
    const { timeout = 8000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    return fetch(url, { ...options, signal: controller.signal })
      .finally(() => clearTimeout(id));
  }

  // 전화번호 간단 정규식 (010-1234-5678)
  const telRe = /^0\d{1,2}-\d{3,4}-\d{4}$/;

  // -------------------- 아이디 찾기 --------------------
  findIdForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('findName').value.trim();
    const tel  = document.getElementById('findTel').value.trim();

    // 입력검증
    if (!name || !tel) {
      alert('이름과 전화번호를 모두 입력하세요.');
      return;
    }
    if (!telRe.test(tel)) {
      alert('전화번호 형식이 올바르지 않습니다. 예) 010-1234-5678');
      document.getElementById('findTel').focus();
      return;
    }

    try {
      const res = await fetchWithTimeout('http://localhost:3000/user/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ userName: name, userTel: tel }),
        timeout: 8000,
      });

      let result;
      try { result = await res.json(); } catch { result = { success:false, message:'응답 파싱 실패' }; }

      if (res.ok && result?.success && result?.userId) {
        alert(`아이디는 "${result.userId}" 입니다.`);
      } else {
        alert(result?.message || '일치하는 회원정보가 없습니다. 회원가입을 하거나 다시 입력해 주세요.');
      }
    } catch (err) {
      if (err.name === 'AbortError') alert('요청이 시간 초과되었습니다. 네트워크를 확인해 주세요.');
      else {
        console.error(err);
        alert('서버 오류가 발생했습니다.');
      }
    }
  });

  // -------------------- 비밀번호 찾기 --------------------
  findPwForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('pwUserId').value.trim();
    const name   = document.getElementById('pwName').value.trim();

    if (!userId || !name) {
      alert('아이디와 이름을 모두 입력하세요.');
      return;
    }

    try {
      const res = await fetchWithTimeout('http://localhost:3000/user/find-pw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ userId, userName: name }),
        timeout: 8000,
      });

      let result;
      try { result = await res.json(); } catch { result = { success:false, message:'응답 파싱 실패' }; }

      if (res.ok && result?.success) {
        // 아래 한 줄은 학습/개발용 예시입니다.
        if (result.userPw) {
          alert(`비밀번호는 "${result.userPw}" 입니다.`);
        } else if (result.tempPw) {
          alert(`임시 비밀번호가 발급되었습니다: "${result.tempPw}"\n로그인 후 즉시 변경해 주세요.`);
        } else {
          alert(result.message || '비밀번호 확인 성공');
        }
      } else {
        alert(result?.message || '일치하는 회원정보가 없습니다. 다시 입력해 주세요.');
      }
    } catch (err) {
      if (err.name === 'AbortError') alert('요청이 시간 초과되었습니다. 네트워크를 확인해 주세요.');
      else {
        console.error(err);
        alert('서버 오류가 발생했습니다.');
      }
    }
  });
})();
