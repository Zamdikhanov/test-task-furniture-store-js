// ***** burger *****

const burgerButton = document.querySelector(".burger");
const mobileMenu = document.querySelector(".header__content");

burgerButton.addEventListener("click", onMenuClick);
mobileMenu.addEventListener("click", onMenuClick);

function onMenuClick() {
    burgerButton.classList.toggle("menu_button__active");
    mobileMenu.classList.toggle("header__content_showOnMobile");
}

// ***** subMenu *****

const subMenuItems = document.querySelectorAll(".submenu__link");

subMenuItems.forEach((item, index) => item.addEventListener("click", () => onSubmenuClick(index)));

function onSubmenuClick(indexSelected) {
    subMenuItems.forEach((item, idx) => indexSelected === idx ?
        item.classList.add("submenu__link_active") :
        item.classList.remove("submenu__link_active"));
}

// ***** Swiper *****

const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 50,
    slidesPerView: 1,
    speed: 1000,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        type: "bullets",
    },
});

const slideRealIndex = document.querySelector(".swiper__counterCurrent");

swiper.on('slideChange', function() {
    slideRealIndex.innerText = swiper.realIndex + 1;
});

// ***** CheckListDialog *****

let stepNumber = 0;
const progressPercent = [11.6, 50, 84.3, 100];

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: function() {
        console.log('start');
        stepNumber = 0;
        onClickNextStep();
        swiper.disable();
    },
    afterClose: function() {
        swiper.enable();
        step1.setAttribute("style", "display: none");
        step2.setAttribute("style", "display: none");
        step3.setAttribute("style", "display: none");
        step4.setAttribute("style", "display: none");
        step5.setAttribute("style", "display: none");
    },
});


const modalProgressWrap = document.querySelector(".modal__progressWrap");
const modalStep = document.querySelector(".modal__step");
const modalProgress = document.querySelector(".modal__progress");
const dialogNextButton = document.querySelector("#dialogNextButton");
const step1 = document.forms.step1;
const step2 = document.forms.step2;
const step3 = document.forms.step3;
const step4 = document.forms.step4;
const step5 = document.querySelector("[name='step5']");

dialogNextButton.addEventListener("click", onClickNextStep);


function onClickNextStep() {
    stepNumber++;
    modalProgress.setAttribute("style", `transform: translateX(${ - 100 + progressPercent[stepNumber-1]}%)`)
    modalStep.innerText = `Шаг ${stepNumber} из 4`;
    dialogNextButton.setAttribute("disabled", "true");
    if (stepNumber >= 5) {
        modalProgressWrap.classList.add("hide");
        dialogNextButton.classList.add("hide");
    } else {
        modalProgressWrap.classList.remove("hide");
        dialogNextButton.classList.remove("hide");
    };
    switch (stepNumber) {
        case 1:
            step1.setAttribute("style", "display: ''");
            changeCheckbox();
            break;
        case 2:
            step1.setAttribute("style", "display: none");
            step2.setAttribute("style", "display: ''");
            changeCheckboxStep2();
            break;
        case 3:
            step2.setAttribute("style", "display: none");
            step3.setAttribute("style", "display: ''");
            changeCheckboxStep3();
            break;
        case 4:
            step3.setAttribute("style", "display: none");
            step4.setAttribute("style", "display: ''");
            changeCheckboxStep4();
            break;
        case 5:
            step4.setAttribute("style", "display: none");
            step5.setAttribute("style", "display: ''");
            break;
        default:
            step5.setAttribute("style", "display: none");;
    }
}

// ***** Step1 *****

const checkboxSofa = step1.elements.sofa;
const checkboxBed = step1.elements.bed;
const checkboxCloset = step1.elements.closet;
const checkboxDresser = step1.elements.dresser;
const checkboxMattress = step1.elements.mattress;
checkboxSofa.addEventListener("change", changeCheckbox);
checkboxBed.addEventListener("change", changeCheckbox);
checkboxCloset.addEventListener("change", changeCheckbox);
checkboxDresser.addEventListener("change", changeCheckbox);
checkboxMattress.addEventListener("change", changeCheckbox);

function changeCheckbox() {
    if (checkboxSofa.checked || checkboxBed.checked || checkboxCloset.checked || checkboxDresser.checked || checkboxMattress.checked) {
        dialogNextButton.removeAttribute("disabled");
    } else {
        dialogNextButton.setAttribute("disabled", "true");
    };
}

// ***** Step2 *****

const checkboxReady = step2.elements.readyBuy;
const step2hidden = document.getElementById("step2hidden");

OmRangeSlider.init({
    min: 0,
    max: 50000,
    value: [2000, 25000],
    unit: ' руб.',
});
document.getElementById('inputPieces').addEventListener('rangechange', function(e) {
    document.getElementById('displaySelectedRange1').innerText = e.detail[0] + ' руб.';
    document.getElementById('displaySelectedRange2').innerText = e.detail[1] + ' руб.';
    document.getElementById('tipRange1').innerText = e.detail[0] + ' руб.';
    document.getElementById('tipRange2').innerText = e.detail[1] + ' руб.';
}, true);


function changeCheckboxStep2() {
    if (checkboxReady.checked) {
        dialogNextButton.removeAttribute("disabled");
        step2hidden.setAttribute("style", "display: ''");
    } else {
        dialogNextButton.setAttribute("disabled", "true");
        step2hidden.setAttribute("style", "display: none");
    };
}
checkboxReady.addEventListener("change", changeCheckboxStep2);

// ***** Step3 *****

const bedNumber1 = step3.elements.bedNumber1;
const bedNumber2 = step3.elements.bedNumber2;
const bedNumber3 = step3.elements.bedNumber3;
const bedNumber4 = step3.elements.bedNumber4;
const bedNumber5 = step3.elements.bedNumber5;
bedNumber1.addEventListener("change", changeCheckboxStep3);
bedNumber2.addEventListener("change", changeCheckboxStep3);
bedNumber3.addEventListener("change", changeCheckboxStep3);
bedNumber4.addEventListener("change", changeCheckboxStep3);
bedNumber5.addEventListener("change", changeCheckboxStep3);

function changeCheckboxStep3() {
    if (bedNumber1.checked || bedNumber2.checked || bedNumber3.checked || bedNumber4.checked || bedNumber5.checked) {
        dialogNextButton.removeAttribute("disabled")
    } else {
        dialogNextButton.setAttribute("disabled", "true");
    };
}

// ***** Step4 *****

const personName = step4.elements.name;
const tel = step4.elements.tel;
const email = step4.elements.email;
const date = step4.elements.date;
const timeFrom = step4.elements.timeFrom;
const timeTo = step4.elements.timeTo;
const agree = step4.elements.agree;
personName.addEventListener("change", changeCheckboxStep4);
tel.addEventListener("change", changeCheckboxStep4);
email.addEventListener("change", changeCheckboxStep4);
date.addEventListener("change", changeCheckboxStep4);
timeFrom.addEventListener("change", changeCheckboxStep4);
timeTo.addEventListener("change", changeCheckboxStep4);
agree.addEventListener("change", changeCheckboxStep4);

function changeCheckboxStep4() {
    if (personName.value && tel.value && email.value && date.value && timeFrom.value && timeTo.value && agree.checked) {
        dialogNextButton.removeAttribute("disabled")
    } else {
        dialogNextButton.setAttribute("disabled", "true");
    };
};