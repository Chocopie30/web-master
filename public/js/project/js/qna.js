// ----------------- 카테고리 드롭다운 -----------------
document.getElementById("category-btn").addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("category-menu").classList.toggle("show");
});

window.addEventListener("click", function () {
  document.getElementById("category-menu").classList.remove("show");
});

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});

// ----------------- 로그인 상태, 로그아웃 -----------------
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loggedInUserName = localStorage.getItem("loggedInUserName");
  const authBox = document.querySelector(".auth-box");

  if (loggedInUser) {
    authBox.innerHTML = `
      <span>🎈${loggedInUserName}</span>
      <a href="infoEdit.html">정보수정</a>
      <a href="#" id="logoutBtn">로그아웃</a>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInUserName");
      location.reload();
    });
  } else {
    authBox.innerHTML = `
      <a href="register.html">회원가입</a>
      <a href="login.html">로그인</a>
    `;
  }
});

// ----------------- Q&A 데이터 불러오기 -----------------
async function loadQnA() {
  try {
    const response = await fetch("http://192.168.0.17:3000/qna");
    const result = await response.json();

    if (!result.success) {
      console.error(result.detail);
      alert("Q&A 데이터를 가져오는데 실패했습니다.");
      return;
    }

    const table = document.querySelector(".qna-table");
    // 기존 데이터 초기화 (헤더 행은 남김)
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

    result.data.forEach((item,index) => {
      const hasAnswer = Array.isArray(item.answers) && item.answers.length > 0;
      const displayNo = index + 1;

      // 질문 행
      const qRow = document.createElement("tr");
      qRow.classList.add("accordion");
      qRow.dataset.qno = item.qNo;
      qRow.innerHTML = `
        <td>${displayNo}</td>
        <td>${escapeHtml(item.qTitle)}</td>
        <td>${escapeHtml(item.qWriter)}</td>
      `;
      table.appendChild(qRow);

      // 내용 + 댓글 행
      const aRow = document.createElement("tr");
      aRow.classList.add("panel");
      aRow.innerHTML = `
        <td colspan="3">
          <div class="content">
            <p><strong>내용:</strong> ${escapeHtml(item.qContent)}</p>
            <div class="answers">
              ${ (item.answers || []).map(a => `
                <div class="comment">
                  <p><strong>댓글:</strong> ${escapeHtml(a.aContent)}</p>
                  <p><em>작성자: ${escapeHtml(a.aWriter)}</em></p>
                </div>
              `).join('') }
            </div>
            <div class="answer-actions">
              ${!hasAnswer ? `<button class="answer-btn" data-qno="${item.qNo}">답변하기</button>` : ''}
            </div>
          </div>
        </td>
      `;
      table.appendChild(aRow);
    });

    // ----------------- 아코디언 기능 (하나만 열기 + 다시 누르면 닫기) -----------------
    document.querySelectorAll(".accordion").forEach(row => {
      row.addEventListener("click", () => {
        const panel = row.nextElementSibling;
        const isOpen = panel.classList.contains("show");

        // 모든 panel 닫기
        document.querySelectorAll(".panel.show").forEach(openPanel => {
          openPanel.classList.remove("show");
        });

        // 이미 열려있던 걸 다시 누르면 닫기 (열지 않음)
        if (!isOpen) {
          panel.classList.add("show");
        }
      });
    });

    // ----------------- 답변하기 버튼 기능 -----------------
    document.querySelectorAll(".answer-btn").forEach(btn => {
      // 안정적으로 qNo를 읽어오기: btn.dataset.qno (문자) -> 숫자 변환
      const qNo = Number(btn.dataset.qno);

      btn.addEventListener("click", (e) => {

        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
          alert("답변을 작성하려면 로그인이 필요합니다.\n로그인 후 다시 시도해주세요.");
          return; // 로그인 안 했으면 바로 종료
        }

        const contentDiv = btn.closest(".content");
        if (!contentDiv) return;

        // 이미 답변 입력폼이 열려있으면 생성하지 않음
        if (contentDiv.querySelector(".answer-form")) return;

        // 입력폼 생성
        const formDiv = document.createElement("div");
        formDiv.className = "answer-form";
        formDiv.innerHTML = `
          <textarea placeholder="답변 내용을 입력하세요"></textarea>
          <div class="form-actions">
            <button class="submit-answer">등록</button>
            <button class="cancel-answer">취소</button>
          </div>
        `;
        contentDiv.appendChild(formDiv);
        formDiv.querySelector("textarea").focus();

        // 취소
        formDiv.querySelector(".cancel-answer").addEventListener("click", () => {
          formDiv.remove();
        });

        // 등록
        formDiv.querySelector(".submit-answer").addEventListener("click", async () => {
          const loggedInUser = localStorage.getItem("loggedInUser");
          if (!loggedInUser) {
            alert("답변을 등록하려면 로그인해야 합니다.");
            return;
          }

          const aContent = formDiv.querySelector("textarea").value.trim();
          if (!aContent) {
            alert("답변 내용을 입력하세요.");
            return;
          }

          try {
            const res = await fetch("http://192.168.0.17:3000/answer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              body: JSON.stringify({
                qNo: qNo,
                aContent: aContent,
                aWriter: loggedInUser
              })
            });

            const json = await res.json();
            if (!json.success) {
              alert("답변 등록 실패: " + (json.message || "서버 오류"));
              return;
            }

            // 성공 시: form 제거, 버튼 제거, 새 댓글 DOM에 추가
            const answersDiv = contentDiv.querySelector(".answers");
            const newComment = document.createElement("div");
            newComment.className = "comment";
            newComment.innerHTML = `
              <p><strong>댓글:</strong> ${escapeHtml(aContent)}</p>
              <p><em>작성자: ${escapeHtml(loggedInUser)}</em></p>
            `;
            answersDiv.appendChild(newComment);

            // remove form and remove answer button
            formDiv.remove();
            btn.remove();

            alert("답변이 등록되었습니다.");
          } catch (err) {
            console.error("답변 등록 오류:", err);
            alert("답변 등록 중 오류가 발생했습니다.");
          }
        });
      });
    });

  } catch (err) {
    console.error("QnA fetch client error:", err);
    alert("Q&A 데이터를 가져오는데 오류가 발생했습니다.");
  }
}

// ----------------- 페이지 로드 시 Q&A 불러오기 -----------------
window.addEventListener("DOMContentLoaded", loadQnA);

// ----------------- 질문하기 버튼 클릭 시 -----------------
const qBtn = document.querySelector('#qeustion_btn');
if (qBtn) {
  qBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      localStorage.setItem("fromQnA", "1");
      location.href = 'question.html';
    } else {
      alert("질문을 작성하려면 로그인이 필요합니다.\n로그인 후 다시 시도해주세요.");
    }
  });
}

// ----------------- 유틸: XSS 방지 간단 이스케이프 -----------------
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}