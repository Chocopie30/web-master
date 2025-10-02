// ----------------- 카테고리 드롭다운 -----------------
document.getElementById("category-btn").addEventListener("click", function () {
  document.getElementById("category-menu").classList.toggle("show");
});

window.addEventListener("click", function (e) {
  if (!e.target.matches("#category-btn")) {
    document.getElementById("category-menu").classList.remove("show");
  }
});

// ----------------- 로그인 상태, 로그아웃 -----------------
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
  } else {
    authBox.innerHTML = `
      <a href="register.html">회원가입</a>
      <a href="login.html">로그인</a>
    `;
  }
});

// ----------------- 카테고리 이름 매핑 -----------------
const categoryMap = {
  3: "음식",
  2: "전자제품",
  1: "잡동사니"
};

// ----------------- 카테고리 상품 로드 -----------------
function loadCategoryProducts(cateId) {
  fetch(`http://localhost:3000/products/category/${cateId}`)
    .then(res => res.json())
    .then(result => {
      const productsContainer = document.querySelector(".products-container");
      productsContainer.innerHTML = "";

      if (!result.success || result.data.length === 0) {
        productsContainer.innerHTML = "<p>상품이 없습니다.</p>";
        return;
      }

      result.data.forEach(prod => {
        const productBox = document.createElement("div");
        productBox.className = "product-box";

        const img = document.createElement("img");
        img.src = prod.IMGPATH ?
          "/" + prod.IMGPATH.replace(/\\/g, "/") :
          "/js/project/img/default.png";
        img.alt = prod.PRODNAME;

        const nameDiv = document.createElement("div");
        nameDiv.textContent = prod.PRODNAME;

        productBox.appendChild(img);
        productBox.appendChild(nameDiv);

        // ✅ 상품 클릭 시 상세페이지 이동
        productBox.addEventListener("click", () => {
          localStorage.setItem("selectedProductNo", prod.PRODNO); // ✅ 대문자
          location.href = "product.html";
        });

        productsContainer.appendChild(productBox);
      });
    })
    .catch(err => {
      console.error("카테고리 상품 로드 오류:", err);
      alert("상품을 불러오는 중 오류가 발생했습니다.");
    });
}

// ----------------- 카테고리 내 검색 -----------------
function searchProducts(cateId, keyword) {
  fetch(`http://localhost:3000/products/category/${cateId}/search?keyword=${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(result => {
      const productsContainer = document.querySelector(".products-container");
      productsContainer.innerHTML = "";

      if (!result.success || result.data.length === 0) {
        productsContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
        return;
      }

      result.data.forEach(prod => {
        const productBox = document.createElement("div");
        productBox.className = "product-box";

        const img = document.createElement("img");
        img.src = prod.IMGPATH ?
          "/" + prod.IMGPATH.replace(/\\/g, "/") :
          "/js/project/img/default.png";
        img.alt = prod.PRODNAME;

        const nameDiv = document.createElement("div");
        nameDiv.textContent = prod.PRODNAME;

        productBox.appendChild(img);
        productBox.appendChild(nameDiv);

        // ✅ 검색 결과 카드 클릭 시 상세페이지 이동
        productBox.addEventListener("click", () => {
          localStorage.setItem("selectedProductNo", prod.PRODNO); // ✅ 대문자
          location.href = "product.html";
        });

        productsContainer.appendChild(productBox);
      });
    })
    .catch(err => {
      console.error("카테고리 검색 오류:", err);
      alert("검색 중 오류가 발생했습니다.");
    });
}

// ----------------- 페이지 로드 시 -----------------
window.addEventListener("DOMContentLoaded", () => {
  const cateId = localStorage.getItem("selectedCategory");
  if (!cateId) {
    alert("카테고리가 선택되지 않았습니다. 메인으로 이동합니다.");
    location.href = "main.html";
    return;
  }

  // 제목 변경
  document.querySelector(".main h3").textContent = categoryMap[cateId] + " 카테고리";

  // 상품 로드
  loadCategoryProducts(cateId);

  // 검색 버튼
  document.getElementById("searchBtn").addEventListener("click", () => {
    const keyword = document.getElementById("searchInput").value.trim();
    if (keyword) searchProducts(cateId, keyword);
  });

  // 엔터 입력 시
  document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const keyword = e.target.value.trim();
      if (keyword) searchProducts(cateId, keyword);
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