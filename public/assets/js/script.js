// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-menu-mobile");
if(buttonMenuMobile) {
  const menu = document.querySelector(".header .inner-menu");
  const overlay = document.querySelector(".header .inner-overlay");

  // Click vào button mở menu
  buttonMenuMobile.addEventListener("click", () => {
    menu.classList.add("active");
  })

  // Click vào overlay đóng menu
  overlay.addEventListener("click", () => {
    menu.classList.remove("active");
  })

  // Click vào icon down mở sub menu
  const listButtonSubMenu = menu.querySelectorAll("ul > li > i");
  listButtonSubMenu.forEach(button => {
    button.addEventListener("click", () => {
      const li = button.closest("li");
      li.classList.toggle("active");
    })
  })
}
// End Menu Mobile

// Box Address Section 1
const boxAddressSection1 = document.querySelector(".section-1 .inner-form .inner-address");
if(boxAddressSection1) {
  // Ẩn/Hiện box suggest
  const input = boxAddressSection1.querySelector(".inner-input");
  
  input.addEventListener("focus", () => {
    boxAddressSection1.classList.add("active");
  })

  input.addEventListener("blur", () => {
    boxAddressSection1.classList.remove("active");
  })

  // Sự kiện click vào từng item
  const listItem = boxAddressSection1.querySelectorAll(".inner-suggest-list .inner-item");
  listItem.forEach(item => {
    item.addEventListener("mousedown", () => {
      const title = item.querySelector(".inner-item-title").innerHTML.trim();
      if(title) {
        input.value = title;
      }
    })
  })
}
// End Box Address Section 1

// Box User Section 1
const boxUserSection1 = document.querySelector(".section-1 .inner-form .inner-user");
if(boxUserSection1) {
  // Hiện box quantity
  const input = boxUserSection1.querySelector(".inner-input");
  
  input.addEventListener("focus", () => {
    boxUserSection1.classList.add("active");
  })

  // Ẩn box quantity
  document.addEventListener("click", (event) => {
    if(!boxUserSection1.contains(event.target)) {
      boxUserSection1.classList.remove("active");
    }
  })

  // Cập nhật số lượng trong ô input
  const updateQuantityInput = () => {
    const listBoxNumber = boxUserSection1.querySelectorAll(".inner-quantity .inner-number");
    const listNumber = [];
    listBoxNumber.forEach(item => {
      const number = parseInt(item.innerHTML.trim());
      listNumber.push(number);
    })
    input.value = `NL: ${listNumber[0]}, TE: ${listNumber[1]}, EB: ${listNumber[2]}`;
  }

  // Bắt sự kiện click vào nút up
  const listButtonUp = boxUserSection1.querySelectorAll(".inner-quantity .inner-up");
  listButtonUp.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".inner-count");
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      const numberUpdate = number + 1;
      boxNumber.innerHTML = numberUpdate;
      updateQuantityInput();
    })
  })

  // Bắt sự kiện click vào nút down
  const listButtonDown = boxUserSection1.querySelectorAll(".inner-quantity .inner-down");
  listButtonDown.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".inner-count");
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      if(number > 0) {
        const numberUpdate = number - 1;
        boxNumber.innerHTML = numberUpdate;
        updateQuantityInput();
      }
    })
  })
}
// End Box User Section 1

// Clock Expire
const clockExpire = document.querySelector("[clock-expire]");
if(clockExpire) {
  const expireDateTimeString = clockExpire.getAttribute("clock-expire");
  const expireDateTime = new Date(expireDateTimeString);

  const updateClock = () => {
    const now = new Date();
    const remainingTime = expireDateTime - now;
    if(remainingTime > 0) {
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor(remainingTime / (60 * 60 * 1000) % 24);
      const minutes = Math.floor(remainingTime / (60 * 1000) % 60);
      const seconds = Math.floor(remainingTime / (1000) % 60);

      const listInnerNumber = clockExpire.querySelectorAll(".inner-number");
      listInnerNumber[0].innerHTML = days > 9 ? days : `0${days}`;
      listInnerNumber[1].innerHTML = hours > 9 ? hours : `0${hours}`;
      listInnerNumber[2].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      listInnerNumber[3].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
    } else {
      clearInterval(intervalClock);
    }
  }

  const intervalClock = setInterval(updateClock, 1000);
}
// End Clock Expire

// Box Filter
const buttonFilterMobile = document.querySelector(".section-9 .inner-filter-mobile");
if(buttonFilterMobile) {
  const boxLeft = document.querySelector(".section-9 .inner-left");
  const overlay = document.querySelector(".section-9 .inner-left .inner-overlay");

  buttonFilterMobile.addEventListener("click", () => {
    boxLeft.classList.add("active");
  })

  overlay.addEventListener("click", () => {
    boxLeft.classList.remove("active");
  })
}
// End Box Filter

// Box Tour Info
const boxTourInfo = document.querySelector(".box-tour-info");
if(boxTourInfo) {
  const buttonReadMore = boxTourInfo.querySelector(".inner-read-more button");
  buttonReadMore.addEventListener("click", () => {
    if(boxTourInfo.classList.contains("active")) {
      boxTourInfo.classList.remove("active");
      buttonReadMore.innerHTML = "Xem tất cả";
    } else {
      boxTourInfo.classList.add("active");
      buttonReadMore.innerHTML = "Ẩn bớt";
    }
  })

  // Zoom ảnh
  const boxContent = boxTourInfo.querySelector(".inner-content");
  if(boxContent) {
    new Viewer(boxContent);
  }
}
// End Box Tour Info

// Khởi tạo AOS
AOS.init();
// Hết Khởi tạo AOS

// Swiper Section 2
const swiperSection2 = document.querySelector(".swiper-section-2");
if(swiperSection2) {
  new Swiper(".swiper-section-2", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 2

// Swiper Section 3
const swiperSection3 = document.querySelector(".swiper-section-3");
if(swiperSection3) {
  new Swiper(".swiper-section-3", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
// End Swiper Section 2

// Box Images
const boxImages = document.querySelector(".box-images");
if(boxImages) {
  const swiperBoxImagesThumb = new Swiper(".swiper-box-images-thumb", {
    spaceBetween: 5,
    slidesPerView: 4,
    breakpoints: {
      576: {
        spaceBetween: 10,
      },
    },
  });
  const swiperBoxImagesMain = new Swiper(".swiper-box-images-main", {
    spaceBetween: 0,
    thumbs: {
      swiper: swiperBoxImagesThumb,
    },
  });
}
// End Box Images

// Zoom Box Image Main
const boxImageMain = document.querySelector(".box-images .inner-images-main");
if(boxImageMain) {
  new Viewer(boxImageMain);
}
// End Zoom Box Image Main

// Zoom Box Tour Schedule
const boxTourSchedule = document.querySelector(".box-tour-schedule");
if(boxTourSchedule) {
  const listBoxContent = boxTourSchedule.querySelectorAll(".inner-content");
  listBoxContent.forEach(boxContent => {
    new Viewer(boxContent);
  })
}
// End Zoom Box Tour Schedule

// Email Form
const emailForm = document.querySelector("#email-form");
if(emailForm) {
  const validator = new JustValidate('#email-form');

  validator
    .addField('#email-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập email!"
      },
      {
        rule: 'email',
        errorMessage: "Email không đúng định dạng!"
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
      console.log(email);
    })
}
// End Email Form

// Coupon Form
const couponForm = document.querySelector("#coupon-form");
if(couponForm) {
  const validator = new JustValidate('#coupon-form');

  validator
    .addField('#coupon-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập mã giảm giá!"
      },
    ])
    .onSuccess((event) => {
      const coupon = event.target.coupon.value;
      console.log(coupon);
    })
}
// End Coupon Form

// Order Form
const orderForm = document.querySelector("#order-form");
if(orderForm) {
  const validator = new JustValidate('#order-form');

  validator
    .addField('#fullname-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập họ tên!"
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: "Họ tên phải có ít nhất 5 ký tự!"
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: "Họ tên không được vượt quá 50 ký tự!"
      },
    ])
    .addField('#phone-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập số điện thoại!"
      },
      {
        rule: 'customRegexp',
        value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        errorMessage: "Số điện thoại không đúng định dạng!"
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const method = event.target.method.value;

      console.log(fullName);
      console.log(phone);
      console.log(note);
      console.log(method);
    })

  
  // List Input Method
  const listInputMethod = orderForm.querySelectorAll(`input[name="method"]`);
  const innerInfoBank = orderForm.querySelector(".inner-info-bank");

  listInputMethod.forEach(input => {
    input.addEventListener("change", () => {
      if(input.value == "bank") {
        innerInfoBank.classList.add("active");
      } else {
        innerInfoBank.classList.remove("active");
      }
    })
  })
  // End List Input Method
}
// End Order Form