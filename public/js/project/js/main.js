// ----------------- 카테고리 드롭다운 -----------------
document.getElementById("category-btn").addEventListener("click", function () {
  document.getElementById("category-menu").classList.toggle("show");
});

// 다른 곳 클릭 시 메뉴 닫기
window.addEventListener("click", function (e) {
  if (!e.target.matches("#category-btn")) {
    document.getElementById("category-menu").classList.remove("show");
  }
});

// ----------------- 로그인 상태 확인 및 로그아웃 -----------------
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

// ----------------- 상품 불러오기 -----------------
function loadProducts() {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";

  fetch("http://localhost:3000/products/all")
    .then(res => res.json())
    .then(result => {
      if (!result.success) throw new Error(result.message || "상품 데이터를 가져오는데 실패했습니다.");

      result.data.forEach(prod => {
        const productBox = document.createElement("div");
        productBox.className = "product-box";

        const img = document.createElement("img");
        img.src = prod.IMGPATH ? "/" + prod.IMGPATH.replace(/\\/g, "/") : "/js/project/img/default.png";
        img.alt = prod.PRODNAME;

        const nameDiv = document.createElement("div");
        nameDiv.textContent = prod.PRODNAME;

        productBox.appendChild(img);
        productBox.appendChild(nameDiv);

        // ✅ 상품 클릭 시 상세페이지 이동
        productBox.addEventListener("click", () => {
          localStorage.setItem("selectedProductNo", prod.PRODNO);
          location.href = "product.html";
        });

        productsContainer.appendChild(productBox);
      });
    })
    .catch(err => {
      console.error(err);
      alert("상품 데이터를 가져오는데 오류가 발생했습니다.");
    });
}

// ----------------- 상품 검색 -----------------
function searchProducts(keyword) {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";

  fetch(`http://localhost:3000/products/search?keyword=${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(result => {
      if (!result.success || result.data.length === 0) {
        productsContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
        return;
      }

      result.data.forEach(prod => {
        const productBox = document.createElement("div");
        productBox.className = "product-box";

        const img = document.createElement("img");
        img.src = prod.IMGPATH ? "/" + prod.IMGPATH.replace(/\\/g, "/") : "/js/project/img/default.png";
        img.alt = prod.PRODNAME;

        const nameDiv = document.createElement("div");
        nameDiv.textContent = prod.PRODNAME;

        productBox.appendChild(img);
        productBox.appendChild(nameDiv);

        // ✅ 검색 결과 클릭 시 상세페이지 이동
        productBox.addEventListener("click", () => {
          localStorage.setItem("selectedProductNo", prod.PRODNO);
          location.href = "product.html";
        });

        productsContainer.appendChild(productBox);
      });
    })
    .catch(err => {
      console.error("검색 오류:", err);
      alert("상품 검색 중 오류가 발생했습니다.");
    });
}

// ----------------- 페이지 로드 시 -----------------
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  // 검색 버튼 이벤트
  document.getElementById("searchBtn").addEventListener("click", () => {
    const keyword = document.getElementById("searchInput").value.trim();
    if (keyword) searchProducts(keyword);
  });

  // 엔터 입력 시 검색
  document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const keyword = e.target.value.trim();
      if (keyword) searchProducts(keyword);
    }
  });
});

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});

// ----------------- 상품 등록하기 버튼 이벤트 -----------------
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addProductBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      // 로그인 여부 확인 (등록은 로그인 필요)
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        alert("상품을 등록하려면 로그인이 필요합니다.");
        location.href = "main.html";
        return;
      }
      location.href = "add.html";
    });
  }
});
