"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
// bạn có thê dùng để lưu trữ combo được chọn, mỗi khi khách chọn bạn lại đổi giá trị properties của nó
var gSelectedMenuStructure = {
  menuName: "...", // S, M, L
  duongKinhCM: 0,
  suongNuong: 0,
  saladGr: 0,
  drink: 0,
  priceVND: 0,
};
var gPizzaPrice = {
  discountedPriceVND: 0,
  phanTramGiamGia: 0,
};
var gCustomerObj = {
  menuName: "",
  loaiPizza: "",
  loaiNuocUong: "",
  hoVaTen: "",
  email: "",
  dienThoai: "",
  diaChi: "",
  loiNhan: "",
  voucher: -1,
};
var gPizzaType = "";

/*** REGION 2 - Vùng xử lý hàm cho các elements
 * **/

$(document).ready(function () {
  /** Change button color first method */
  // onBtnComboPizzaClick();
  // onBtnTypePizzaClick();

  getPizzaMenuStructure();

  /** Change button color second method */
  $(".btn-combo").toggleClass("btn-primary");
  $(".btn-type").toggleClass("btn-primary");

  getDrinkList();
  // Button gửi order
  $("#btn-send-order").on("click", function () {
    onBtnGuiClick();
  });
  // Button create order
  $("#btn-create-order").on("click", function () {
    onBtnCreateOrderClick();
  });
});

function getPizzaMenuStructure() {
  // Ghi ra console button đang được chọn
  $(document).on("click", "button", function () {
    getMenuStructureId(this.id);
    displayInConsoleLogPizzaCombo(gSelectedMenuStructure);
    getPizzaType(this.id);
    displayInConsoleLogPizzaType(gPizzaType);
  });
}

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

/** Change button color first method 
function onBtnComboPizzaClick() {
// Change button color combo pizza on click
$('#pizza-combo-select button').on("click", function(){
    $(this).removeClass("button-combo-color").addClass('btn-primary');
    $('#pizza-combo-select button').addClass("button-combo-color");
  });
}
 
function onBtnTypePizzaClick() {
    // Change button color type pizza on click
$('#pizza-type-select button').on("click", function(){
    $(this).removeClass("button-type-color").addClass('btn-primary');
    $('#pizza-type-select button').addClass("button-type-color");
    });
}
*/

// Even handler when click send order button get user input information
function onBtnGuiClick() {
  "use strict";
  //B0 : Khai bao biến
  var vCustomerObj = {
    menuName: "",
    loaiPizza: "",
    loaiNuocUong: "",
    hoVaTen: "",
    email: "",
    dienThoai: "",
    diaChi: "",
    loiNhan: "",
    voucher: -1,
  };
  // B1: Thu thập dữ liệu
  vCustomerObj.menuName = gSelectedMenuStructure.menuName;
  vCustomerObj.loaiPizza = gPizzaType.loaiPizza;
  // console.log(vCustomerObj);
  getCustomerInputData(vCustomerObj);
  gCustomerObj = vCustomerObj;
  console.log(vCustomerObj);

  // B2: validate
  var vValid = validateCustomerInput(vCustomerObj);
  if (vValid) {
    //B3 : Call api check voucher
    onCheckVoucherIdApi(vCustomerObj);
    //B4 : Hiển thị lên modal
    getCustomerInputDataInModal();
    $("#customer-order-modal").modal("show");
  }
}

function onBtnCreateOrderClick() {
  "use strict";
  callApiCreateOrder(gCustomerObj);
  $("#customer-order-modal").modal("hide");
  $("#div-container-order-id").css("display", "block");
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// Scroll after pick one combo
function scrollToNextSectionAfterPickCombo() {
  document.getElementById("pizza-type").scrollIntoView({ behavior: "smooth" });
}
function scrollToNextSectionAfterPickType() {
  document
    .getElementById("drink-select")
    .scrollIntoView({ behavior: "smooth" });
}
// lấy dữ liệu pizza combo được chọn
function getMenuStructureId(paramId) {
  if (paramId == "btn-chon-size-s") {
    var vSelectedMenuStructure = {
      menuName: "Size S", // S, M, L
      duongKinhCM: 20,
      suongNuong: 2,
      saladGr: "200g",
      drink: 2,
      priceVND: 150000,
    };
    gSelectedMenuStructure = vSelectedMenuStructure;
    scrollToNextSectionAfterPickCombo();
  } else if (paramId == "btn-chon-size-m") {
    var vSelectedMenuStructure = {
      menuName: "Size M", // S, M, L
      duongKinhCM: 25,
      suongNuong: 4,
      saladGr: "300g",
      drink: 3,
      priceVND: 200000,
    };
    gSelectedMenuStructure = vSelectedMenuStructure;
    scrollToNextSectionAfterPickCombo();
  } else if (paramId == "btn-chon-size-l") {
    var vSelectedMenuStructure = {
      menuName: "Size L", // S, M, L
      duongKinhCM: 30,
      suongNuong: 8,
      saladGr: "500g",
      drink: 4,
      priceVND: 250000,
    };
    gSelectedMenuStructure = vSelectedMenuStructure;
    scrollToNextSectionAfterPickCombo();
  }
}

// lấy dữ liệu pizza type được chọn
function getPizzaType(paramId) {
  if (paramId == "btn-chon-loai-ocean") {
    var vSelectedPizzaType = {
      loaiPizza: "Ocean",
    };
    scrollToNextSectionAfterPickType();
    gPizzaType = vSelectedPizzaType;
  } else if (paramId == "btn-chon-loai-haiwaii") {
    var vSelectedPizzaType = {
      loaiPizza: "Haiwaiian",
    };
    scrollToNextSectionAfterPickType();
    gPizzaType = vSelectedPizzaType;
  } else if (paramId == "btn-chon-loai-chessy-chicken") {
    var vSelectedPizzaType = {
      loaiPizza: "Chessy Chicken Bacon",
    };
    scrollToNextSectionAfterPickType();
    gPizzaType = vSelectedPizzaType;
  }
}

// Hiển thị pizza combo lên console log
function displayInConsoleLogPizzaCombo(paramPizzaComboObj) {
  console.log("%c Pizza Combo đã chọn", "color: orange");
  console.log("Cỡ Pizza: " + paramPizzaComboObj.menuName);
  console.log("Đường Kính: " + paramPizzaComboObj.duongKinhCM);
  console.log("Sườn nướng: " + paramPizzaComboObj.suongNuong);
  console.log("Salad: " + paramPizzaComboObj.saladGr);
  console.log("Nước ngọt: " + paramPizzaComboObj.drink);
  console.log("Giá (VND): " + paramPizzaComboObj.priceVND);
}

// Hiển thị pizza type lên console log
function displayInConsoleLogPizzaType(paramPizzaTypeObj) {
  console.log("%c Pizza Type đã chọn", "color: lightblue");
  console.log("Loại Pizza: " + paramPizzaTypeObj.loaiPizza);
}

// Add data to drink list
function addDrinkListData(paramDrinkListObj) {
  "use strict";
  for (let bI in paramDrinkListObj) {
    $("#select-drink-list").append(`
        <option value="${paramDrinkListObj[bI].maNuocUong}">
        ${paramDrinkListObj[bI].tenNuocUong}
        </option>`);
  }
}

//mã nguồn để load data drink list (danh sách loại nước uống) về
function getDrinkList() {
  "use strict";
  $.ajax({
    url: "http://42.115.221.44:8080/devcamp-pizza365/drinks",
    method: "GET",
    contentType: "json",
    success: function (res) {
      // console.log(res);
      addDrinkListData(res);
    },
    error: function (resAjax) {
      console.log(resAjax.responseText);
    },
  });
}

// get customer input data
function getCustomerInputData(paramCustomerObj) {
  "use strict";
  paramCustomerObj.hoVaTen = $("#inp-fullname").val().trim();
  paramCustomerObj.email = $("#inp-email").val().trim();
  paramCustomerObj.dienThoai = $("#inp-phone-number").val().trim();
  paramCustomerObj.diaChi = $("#inp-address").val().trim();
  paramCustomerObj.voucher = $("#inp-voucher").val().trim();
  paramCustomerObj.loiNhan = $("#inp-message").val().trim();
  paramCustomerObj.loaiNuocUong = $("#select-drink-list").val();
}

// truyền dữ liệu vào modal
function getCustomerInputDataInModal() {
  "use strict";
  $("#inp-fullname-modal").val(gCustomerObj.hoVaTen);
  $("#inp-phone-number-modal").val(gCustomerObj.dienThoai);
  $("#inp-address-modal").val(gCustomerObj.diaChi);
  $("#inp-voucher-modal").val(gCustomerObj.voucher);
  $("#inp-message-modal").val(gCustomerObj.loiNhan);
  $("#inp-details-modal").val(
    "Xác nhận: " +
      gCustomerObj.hoVaTen +
      ", " +
      gCustomerObj.dienThoai +
      ", " +
      gCustomerObj.diaChi +
      "\nMenu: " +
      gCustomerObj.menuName +
      "\nLoại pizza: " +
      gCustomerObj.loaiPizza +
      ", Giá: " +
      gSelectedMenuStructure.priceVND +
      ", Mã gỉam gía: " +
      gCustomerObj.voucher +
      "\nPhải thanh toán: " +
      gPizzaPrice.discountedPriceVND +
      " (Giảm giá " +
      gPizzaPrice.phanTramGiamGia +
      "%)"
  );
}

// hàm validate dữ liệu nhập
function validateCustomerInput(paramCustomerObj) {
  if (paramCustomerObj.menuName == "") {
    alert("Hãy chọn combo pizza");
    return false;
  }
  if (paramCustomerObj.loaiPizza == undefined) {
    alert("Hãy chọn loại pizza");
    return false;
  }
  if (paramCustomerObj.loaiNuocUong == 0) {
    alert("Hãy chọn loại nước uống");
    return false;
  }
  if (paramCustomerObj.hoVaTen == "") {
    $("#inp-fullname").addClass("is-invalid");
    alert("Hãy nhập họ và tên");
    return false;
  }
  $("#inp-fullname").removeClass("is-invalid").addClass("is-valid");

  if (validateEmail(paramCustomerObj.email) === false) {
    $("#inp-email").addClass("is-invalid");
    alert("Hãy nhập email hợp lệ");
    return false;
  }
  $("#inp-email").removeClass("is-invalid").addClass("is-valid");

  if (
    isNaN(paramCustomerObj.dienThoai) === true ||
    paramCustomerObj.dienThoai == ""
  ) {
    $("#inp-phone-number").addClass("is-invalid");
    alert("Hãy nhập số điện thoại đúng");
    return false;
  }
  $("#inp-phone-number").removeClass("is-invalid").addClass("is-valid");
  if (paramCustomerObj.diaChi == "") {
    $("#inp-address").addClass("is-invalid");
    alert("Hãy nhập địa chỉ");
    return false;
  }
  $("#inp-address").removeClass("is-invalid").addClass("is-valid");
  return true;
}

// function kiểm tra email hợp lệ
function validateEmail(paramEmailObj) {
  var vValidRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (paramEmailObj.match(vValidRegex)) {
    return true;
  } else {
    return false;
  }
}

// call api to check voucher
function onCheckVoucherIdApi(paramCustomerObj) {
  "use strict";
  const vBASE_URL =
    "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/";
  //một số mã đúng để test: 95531, 81432,...lưu ý test cả mã sai
  $.ajax({
    url: vBASE_URL + paramCustomerObj.voucher,
    method: "GET",
    contentType: "json",
    async: false,
    success: function (res) {
      console.log(res);
      gPizzaPrice.discountedPriceVND =
        gSelectedMenuStructure.priceVND -
        gSelectedMenuStructure.priceVND * 0.01 * parseInt(res.phanTramGiamGia);
      gPizzaPrice.phanTramGiamGia = res.phanTramGiamGia;
      // return gPizzaPrice.discountedPriceVND;
    },
    error: function (resAjax) {
      console.log("Không tìm thấy voucher " + resAjax.responseText);
      gPizzaPrice.phanTramGiamGia = 0;
      gPizzaPrice.discountedPriceVND = gSelectedMenuStructure.priceVND;
      // return gPizzaPrice.discountedPriceVND;
    },
  });
}

// call api create order
function callApiCreateOrder(paramCustomerObj) {
  "use strict";
  var vJSONData = JSON.stringify(paramCustomerObj);
  //base url
  const vBASE_URL = "http://42.115.221.44:8080/devcamp-pizza365/orders";
  $.ajax({
    url: vBASE_URL,
    method: "POST",
    contentType: "application/json; charset: utf-8",
    data: vJSONData,
    success: function (res) {
      console.log(res);
      $("#inp-order-id").val(res.orderId);
    },
    error: function (resAjax) {
      console.log(resAjax.responseText);
    },
  });
}

//gọi tạo một order mới
function onCreateOrderClick() {
  "use strict";
  //base url
  const vBASE_URL = "http://42.115.221.44:8080/devcamp-pizza365/orders";
  var vObjectRequest = {
    kichCo: "M",
    duongKinh: "25",
    suon: "4",
    salad: "300",
    loaiPizza: "HAWAII",
    idVourcher: "16512",
    idLoaiNuocUong: "PEPSI",
    soLuongNuoc: "3",
    hoTen: "Phạm Thanh Bình",
    thanhTien: "200000",
    email: "binhpt001@devcamp.edu.vn",
    soDienThoai: "0865241654",
    diaChi: "Hà Nội",
    loiNhan: "Pizza đế dày",
  };
  var vXmlHttpCreateOrder = new XMLHttpRequest();
  vXmlHttpCreateOrder.open("POST", vBASE_URL, true);
  vXmlHttpCreateOrder.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  vXmlHttpCreateOrder.send(JSON.stringify(vObjectRequest));
  vXmlHttpCreateOrder.onreadystatechange = function () {
    if (
      this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK &&
      this.status == gREQUEST_CREATE_OK
    ) {
      var vCreatedOrder = vXmlHttpCreateOrder.responseText;
      console.log(vCreatedOrder);
    }
  };
}
