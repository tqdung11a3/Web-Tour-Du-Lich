// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-button-menu");
if(buttonMenuMobile) {
  const sider = document.querySelector(".sider");
  const siderOverlay = document.querySelector(".sider-overlay");

  buttonMenuMobile.addEventListener("click", () => {
    sider.classList.add("active");
    siderOverlay.classList.add("active");
  })

  siderOverlay.addEventListener("click", () => {
    sider.classList.remove("active");
    siderOverlay.classList.remove("active");
  })
}
// End Menu Mobile

// Schedule Section 8
const scheduleSection8 = document.querySelector(".section-8 .inner-schedule");
if(scheduleSection8) {
  const buttonCreate = scheduleSection8.querySelector(".inner-schedule-create");
  const listItem = scheduleSection8.querySelector(".inner-schedule-list");

  buttonCreate.addEventListener("click", () => {
    const firstItem = listItem.querySelector(".inner-schedule-item");
    const cloneItem = firstItem.cloneNode(true);
    cloneItem.querySelector(".inner-schedule-head input").value = "";
    
    const innerBody = cloneItem.querySelector(".inner-schedule-body");
    const id = `mce_${Date.now()}`;
    innerBody.innerHTML = `<textarea id="${id}"></textarea>`;

    listItem.appendChild(cloneItem);

    initTinyMCE(`#${id}`);
  })

  listItem.addEventListener("click", (event) => {
    // Đóng/mở item
    if(event.target.closest(".inner-more")) {
      const parentItem = event.target.closest(".inner-schedule-item");
      if(parentItem) {
        parentItem.classList.toggle("hidden");
      }
    }

    // Xóa item
    if(event.target.closest(".inner-remove")) {
      const parentItem = event.target.closest(".inner-schedule-item");
      const totalItem = listItem.querySelectorAll(".inner-schedule-item").length;
      if(parentItem && totalItem > 1) {
        parentItem.remove();
      }
    }
  })

  // Sắp xếp
  new Sortable(listItem, {
    handle: '.inner-move',
    animation: 150,
    onStart: (event) => {
      const textarea = event.item.querySelector(".inner-schedule-body textarea");
      const id = textarea.id;
      tinymce.get(id).remove();
    },
    onEnd: (event) => {
      const textarea = event.item.querySelector(".inner-schedule-body textarea");
      const id = textarea.id;
      initTinyMCE(`#${id}`);
    }
  })
}
// End Schedule Section 8

// Filepond Image
const listFilepondImage = document.querySelectorAll("[filepond-image]");
const filePond = {};
if(listFilepondImage.length > 0) {
  FilePond.registerPlugin(FilePondPluginImagePreview);
  FilePond.registerPlugin(FilePondPluginFileValidateType);

  listFilepondImage.forEach((filepondImage) => {
    filePond[filepondImage.name] = FilePond.create(filepondImage, {
      labelIdle: "+",
      acceptedFileTypes: ['image/*']
    });
  })
}
// End Filepond Image

// Revenue Chart
const revenueChart = document.querySelector("#revenue-chart");
if(revenueChart) {
  new Chart(revenueChart, {
    type: 'line',
    data: {
      labels: ["01", "02", "03", "04", "05"],
      datasets: [
        {
          label: 'Tháng 07/2025',
          data: [1200000, 1600000, 900000, 1580000, 2300000],
          borderColor: "#FE6383",
          borderWidth: 1.5
        },
        {
          label: 'Tháng 08/2025',
          data: [1000000, 1800000, 1200000, 1000000, 2100000],
          borderColor: "#36A1EA",
          borderWidth: 1.5
        }
      ]
    },
    options: {
      maintainAspectRatio: false
    }
  });
}
// End Revenue Chart

// Category Create Form
const categoryCreateForm = document.querySelector("#category-create-form");
if(categoryCreateForm) {
  const validator = new JustValidate('#category-create-form');

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập tên danh mục!"
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file;
      const description = tinymce.get("description").getContent();

      console.log(name);
      console.log(parent);
      console.log(position);
      console.log(status);
      console.log(avatar);
      console.log(description);
    })
}
// End Category Create Form

// Tour Create Form
const tourCreateForm = document.querySelector("#tour-create-form");
if(tourCreateForm) {
  const validator = new JustValidate('#tour-create-form');

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập tên tour!"
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file;
      const priceAdult = event.target.priceAdult.value;
      const priceChildren = event.target.priceChildren.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildren = event.target.priceNewChildren.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.departureDate.value;
      const information = tinymce.get("information").getContent();
      const schedules = [];

      // locations
      const listInputLocation = tourCreateForm.querySelectorAll(`input[name="locations"]`);
      listInputLocation.forEach(input => {
        if(input.checked) {
          locations.push(input.value);
        }
      })
      // End locations

      // schedules
      const listScheduleItem = tourCreateForm.querySelectorAll(".inner-schedule-item");
      listScheduleItem.forEach(item => {
        const input = item.querySelector(".inner-schedule-head input");
        const title = input.value;

        const textarea = item.querySelector(".inner-schedule-body textarea");
        const id = textarea.id;
        const description = tinymce.get(id).getContent();
        schedules.push({
          title: title,
          description: description
        });
      })
      // End schedules

      console.log(name);
      console.log(category);
      console.log(position);
      console.log(status);
      console.log(avatar);
      console.log(priceAdult);
      console.log(priceChildren);
      console.log(priceBaby);
      console.log(priceNewAdult);
      console.log(priceNewChildren);
      console.log(priceNewBaby);
      console.log(stockAdult);
      console.log(stockChildren);
      console.log(stockBaby);
      console.log(locations);
      console.log(time);
      console.log(vehicle);
      console.log(departureDate);
      console.log(information);
      console.log(schedules);
    })
}
// End Tour Create Form

// Order Edit Form
const orderEditForm = document.querySelector("#order-edit-form");
if(orderEditForm) {
  const validator = new JustValidate('#order-edit-form');

  validator
    .addField('#fullName', [
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
    .addField('#phone', [
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
      const paymentMethod = event.target.paymentMethod.value;
      const paymentStatus = event.target.paymentStatus.value;
      const status = event.target.status.value;

      console.log(fullName);
      console.log(phone);
      console.log(note);
      console.log(paymentMethod);
      console.log(paymentStatus);
      console.log(status);
    })
}
// End Order Edit Form

// Setting Website Info Form
const settingWebsiteInfoForm = document.querySelector("#setting-website-info-form");
if(settingWebsiteInfoForm) {
  const validator = new JustValidate('#setting-website-info-form');

  validator
    .addField('#websiteName', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập tên website!"
      },
    ])
    .addField('#email', [
      {
        rule: 'email',
        errorMessage: "Email không đúng định dạng!"
      },
    ])
    .onSuccess((event) => {
      const websiteName = event.target.websiteName.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;
      const address = event.target.address.value;
      const logo = filePond.logo.getFile()?.file;
      const favicon = filePond.favicon.getFile()?.file;

      console.log(websiteName);
      console.log(phone);
      console.log(email);
      console.log(address);
      console.log(logo);
      console.log(favicon);
    })
}
// End Setting Website Info Form

// Setting Account Admin Create Form
const settingAccountAdminCreateForm = document.querySelector("#setting-account-admin-create-form");
if(settingAccountAdminCreateForm) {
  const validator = new JustValidate('#setting-account-admin-create-form');

  validator
    .addField('#fullName', [
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
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập email!"
      },
      {
        rule: 'email',
        errorMessage: "Email không đúng định dạng!"
      },
    ])
    .addField('#phone', [
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
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập mật khẩu!"
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: "Mật khẩu phải có ít nhất 8 ký tự!"
      },
      {
        rule: 'customRegexp',
        value: /[A-Z]/,
        errorMessage: "Mật khẩu phải có ít nhất một chữ cái viết hoa!"
      },
      {
        rule: 'customRegexp',
        value: /[a-z]/,
        errorMessage: "Mật khẩu phải có ít nhất một chữ cái viết thường!"
      },
      {
        rule: 'customRegexp',
        value: /\d/,
        errorMessage: "Mật khẩu phải có ít nhất một chữ số!"
      },
      {
        rule: 'customRegexp',
        value: /[~!@#$%^&*]/,
        errorMessage: "Mật khẩu phải có ít nhất một ký tự đặc biệt! (~!@#$%^&*)"
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const role = event.target.role.value;
      const positionCompany = event.target.positionCompany.value;
      const status = event.target.status.value;
      const password = event.target.password.value;
      const avatar = filePond.avatar.getFile()?.file;

      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(role);
      console.log(positionCompany);
      console.log(status);
      console.log(password);
      console.log(avatar);
    })
}
// End Setting Account Admin Create Form

// Setting Role Create Form
const settingRoleCreateForm = document.querySelector("#setting-role-create-form");
if(settingRoleCreateForm) {
  const validator = new JustValidate('#setting-role-create-form');

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập tên nhóm quyền!"
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const description = event.target.description.value;
      const permissions = [];

      // permissions
      const listInputPermission = settingRoleCreateForm.querySelectorAll(`input[name="permissions"]`);
      listInputPermission.forEach(input => {
        if(input.checked) {
          permissions.push(input.value);
        }
      })
      // End permissions

      console.log(name);
      console.log(description);
      console.log(permissions);
    })
}
// End Setting Role Create Form

// Profile Edit Form
const profileEditForm = document.querySelector("#profile-edit-form");
if(profileEditForm) {
  const validator = new JustValidate('#profile-edit-form');

  validator
    .addField('#fullName', [
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
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập email!"
      },
      {
        rule: 'email',
        errorMessage: "Email không đúng định dạng!"
      },
    ])
    .addField('#phone', [
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
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const avatar = filePond.avatar.getFile()?.file;

      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(avatar);
    })
}
// End Profile Edit Form

// Profile Change Password Form
const profileChangePasswordForm = document.querySelector("#profile-change-password-form");
if(profileChangePasswordForm) {
  const validator = new JustValidate('#profile-change-password-form');

  validator
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập mật khẩu mới!"
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: "Mật khẩu phải có ít nhất 8 ký tự!"
      },
      {
        rule: 'customRegexp',
        value: /[A-Z]/,
        errorMessage: "Mật khẩu phải có ít nhất một chữ cái viết hoa!"
      },
      {
        rule: 'customRegexp',
        value: /[a-z]/,
        errorMessage: "Mật khẩu phải có ít nhất một chữ cái viết thường!"
      },
      {
        rule: 'customRegexp',
        value: /\d/,
        errorMessage: "Mật khẩu phải có ít nhất một chữ số!"
      },
      {
        rule: 'customRegexp',
        value: /[~!@#$%^&*]/,
        errorMessage: "Mật khẩu phải có ít nhất một ký tự đặc biệt! (~!@#$%^&*)"
      },
    ])
    .addField('#confirmPassword', [
      {
        validator: (value, fields) => {
          const password = fields["#password"].elem.value;
          return password == value;
        },
        errorMessage: "Mật khẩu xác nhận không khớp!"
      }
    ])
    .onSuccess((event) => {
      const password = event.target.password.value;
      console.log(password);
    })
}
// End Profile Change Password Form