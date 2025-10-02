// 카테고리
document.getElementById("category-btn").addEventListener("click", function () {
  document.getElementById("category-menu").classList.toggle("show");
});

// 다른 곳 클릭 시 메뉴 닫기
window.addEventListener("click", function (e) {
  if (!e.target.matches("#category-btn")) {
    document.getElementById("category-menu").classList.remove("show");
  }
});

// ----------------- 로그인 상태 확인 -----------------
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const authBox = document.querySelector(".auth-box");

  if (loggedInUser) {
    authBox.innerHTML = `
      <span>${loggedInUser}님, 환영합니다!</span>
      <a href="#" id="logoutBtn">로그아웃</a>
    `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.reload();
    });

    // ✅ 주문내역 불러오기
    loadOrders(loggedInUser);

  } else {
    authBox.innerHTML = `
      <a href="register.html">회원가입</a>
      <a href="login.html">로그인</a>
    `;
    alert("로그인 후 주문내역을 확인할 수 있습니다.");
    location.href = "main.html";
  }
});

// ----------------- 주문 내역 불러오기 -----------------
function loadOrders(buyerId) {
  fetch(`http://localhost:3000/orders?buyerId=${buyerId}`)
    .then(res => res.json())
    .then(result => {
      const orderList = document.querySelector(".order-list");
      orderList.innerHTML = "";

      if (!result.success || result.data.length === 0) {
        orderList.innerHTML = "<p>주문 내역이 없습니다.</p>";
        return;
      }

      result.data.forEach((order, index) => {
        const item = document.createElement("div");
        item.className = "order-item";

        item.innerHTML = `
          <div class="index">${index + 1}</div>
          <img src="${order.IMGPATH ? "/" + order.IMGPATH.replace(/\\/g, "/") : "/js/project/img/default.png"}" alt="상품 이미지" width="60" height="60">
          <div class="name">${order.PRODNAME}</div>
          <div class="quantity">${order.ORDCOUNT} 개</div>
          <div class="seller">판매자: ${order.ORDSELLER}</div>
        `;

        orderList.appendChild(item);
      });
    })
    .catch(err => {
      console.error("주문 내역 로드 오류:", err);
      alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
    });
}

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});