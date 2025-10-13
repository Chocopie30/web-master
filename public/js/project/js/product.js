// ----------------- 카테고리 드롭다운 -----------------
document.getElementById("category-btn").addEventListener("click", function () {
  document.getElementById("category-menu").classList.toggle("show");
});
window.addEventListener("click", function (e) {
  if (!e.target.matches("#category-btn")) {
    document.getElementById("category-menu").classList.remove("show");
  }
});

// ----------------- 로그인 상태 확인 및 로그아웃 -----------------
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const authBox = document.querySelector(".auth-box");
  const loggedInUserName = localStorage.getItem("loggedInUserName");

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

// ----------------- 상품 번호 가져오기 -----------------
const prodNo = localStorage.getItem("selectedProductNo");
if (!prodNo) {
  alert("상품 정보가 없습니다. 메인으로 이동합니다.");
  location.href = "main.html";
}

const categoryMap = { 1: "잡동사니", 2: "전자제품", 3: "음식" };
let product = null;

// 버튼
const editBtn = document.getElementById("editProductBtn");
const deleteBtn = document.getElementById("deleteProductBtn");
if (editBtn) editBtn.style.display = "none";
if (deleteBtn) deleteBtn.style.display = "none";

// ----------------- 품절 배지 엘리먼트 -----------------
function getSoldOutBadge() {
  const titleEl = document.querySelector(".product-title");
  if (!titleEl) return null;

  let badge = document.getElementById("soldoutBadge");
  if (badge) return badge;

  badge = document.createElement("span");
  badge.id = "soldoutBadge";
  badge.className = "soldout-badge hidden";
  badge.textContent = "품절";

  // 제목(h2) 바로 다음에 삽입
  titleEl.insertAdjacentElement("beforeend", badge);
  return badge;
}

function setSoldOutUI(isSoldOut) {
  const badge = getSoldOutBadge();
  const orderBox = document.querySelector(".order-box");
  const orderBtn = document.getElementById("orderBtn");
  const orderCountInput = document.getElementById("orderCount");

  if (badge) {
    if (isSoldOut) badge.classList.remove("hidden");
    else badge.classList.add("hidden");
  }

  if (isSoldOut) {
    orderBox?.classList.add("soldout");
    if (orderBtn) {
      orderBtn.disabled = true;
      orderBtn.textContent = "품절";
    }
    if (orderCountInput) orderCountInput.disabled = true;
  } else {
    orderBox?.classList.remove("soldout");
    if (orderBtn) {
      orderBtn.disabled = false;
      orderBtn.textContent = "구매";
    }
    if (orderCountInput) orderCountInput.disabled = false;
  }
}

// ----------------- 상품 상세 불러오기 -----------------
function loadProduct() {
  fetch(`http://localhost:3000/products/${prodNo}`)
    .then(res => res.json())
    .then(result => {
      if (!result.success) throw new Error(result.message || "상품 정보를 불러오지 못했습니다.");
      product = result.data;

      // HTML 반영
      document.querySelector(".product-title").textContent = product.PRODNAME;
      document.querySelector(".product-desc").textContent = product.PRODDES;
      document.querySelector(".product-cate").textContent = categoryMap[product.PRODCATE] || "기타";
      document.querySelector(".product-count").textContent = product.PRODCOUNT;
      document.querySelector(".product-price").textContent = product.PRODPRICE.toLocaleString() + "원";

      const img = document.querySelector(".product-img");
      img.src = product.IMGPATH ? "/" + product.IMGPATH.replace(/\\/g, "/") : "/js/project/img/default.png";
      img.alt = product.PRODNAME;

      const sellerEl = document.querySelector(".product-seller");
      if (sellerEl) sellerEl.textContent = product.PRODSELLER || "정보 없음";

      // 판매자만 수정/삭제 노출
      const loggedInUser = localStorage.getItem("loggedInUser");
      const isOwner = !!loggedInUser && loggedInUser === product.PRODSELLER;
      if (editBtn) editBtn.style.display = isOwner ? "inline-flex" : "none";
      if (deleteBtn) deleteBtn.style.display = isOwner ? "inline-flex" : "none";

      // 재고 0 → 품절 UI
      setSoldOutUI(Number(product.PRODCOUNT) === 0);
    })
    .catch(err => {
      console.error("상품 불러오기 오류:", err);
      alert("상품 정보를 불러오지 못했습니다.");
    });
}

// ----------------- 구매 버튼 이벤트 -----------------
document.getElementById("orderBtn").addEventListener("click", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("구매를 하려면 로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
    location.reload();
    return;
  }
  if (Number(product?.PRODCOUNT) === 0) {
    alert("품절된 상품입니다.");
    return;
  }

  const orderCount = parseInt(document.getElementById("orderCount").value);
  if (!orderCount || orderCount <= 0) {
    alert("올바른 수량을 입력해주세요.");
    return;
  }

  const orderData = {
    prodNo: prodNo,
    ordCount: orderCount,
    ordBuyer: loggedInUser,
    ordSeller: product.PRODSELLER
  };

  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        alert("구매가 완료되었습니다!");
        location.href = "order.html";
      } else {
        alert("구매 실패: " + result.message);
      }
    })
    .catch(err => {
      console.error("구매 요청 오류:", err);
      alert("구매 처리 중 오류가 발생했습니다.");
    });
});

// ----------------- 상품 수정 버튼 이벤트 -----------------
if (editBtn) {
  editBtn.addEventListener("click", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("상품 수정을 하려면 로그인이 필요합니다.");
      return;
    }
    if (!product) {
      alert("상품 정보가 아직 로드되지 않았습니다.");
      return;
    }
    if (loggedInUser === product.PRODSELLER) {
      location.href = "edit.html";
    } else {
      alert("이 상품의 판매자가 아니므로 수정 권한이 없습니다.");
    }
  });
}

// ----------------- 상품 삭제 버튼 이벤트 -----------------
if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("상품 삭제를 하려면 로그인이 필요합니다.");
      return;
    }
    if (!product) {
      alert("상품 정보가 아직 로드되지 않았습니다.");
      return;
    }
    if (loggedInUser !== product.PRODSELLER) {
      alert("이 상품의 판매자가 아니므로 삭제 권한이 없습니다.");
      return;
    }

    const ok = confirm(`정말로 "${product.PRODNAME}" 상품을 삭제하시겠습니까?`);
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:3000/products/${prodNo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seller: loggedInUser })
      });
      const result = await res.json();
      if (result.success) {
        alert("상품이 삭제되었습니다.");
        localStorage.removeItem("selectedProductNo");
        location.href = "main.html";
      } else {
        alert("삭제 실패: " + (result.message || "알 수 없는 오류"));
      }
    } catch (err) {
      console.error("상품 삭제 오류:", err);
      alert("삭제 처리 중 오류가 발생했습니다.");
    }
  });
}

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});

// ----------------- 초기 로드 -----------------
document.addEventListener("DOMContentLoaded", loadProduct);
