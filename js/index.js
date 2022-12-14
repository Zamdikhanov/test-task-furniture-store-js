// ***** burger *****

const menuModal = new HystModal({
    linkAttributeName: "data-hystmodal-menu",
});

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
    slideRealIndex.innerText = `0${swiper.realIndex + 1}`;
});

// ***** CheckListDialog *****

let stepNumber = 0;
const progressPercent = [11.6, 50, 84.3, 100];

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: function() {
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
const step5 = document.querySelector("[data-name='step5']");

dialogNextButton.addEventListener("click", onClickNextStep);


function onClickNextStep() {
    stepNumber++;
    modalProgress.setAttribute("style", `transform: translateX(${ - 100 + progressPercent[stepNumber-1]}%)`)
    modalStep.innerText = `?????? ${stepNumber} ???? 4`;
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
const step2hiddenBlock = document.getElementById("step2hidden");
const rangeSlider = document.getElementById('range-slider');
const tipRange1 = document.getElementById('tipRange1')
const tipRange2 = document.getElementById('tipRange2');
const inputWithSlider1 = document.getElementById('inputWithSlider1');
const inputWithSlider2 = document.getElementById('inputWithSlider2');

inputWithSlider1.addEventListener("change", e => setRangeSlider(e, 1));
inputWithSlider2.addEventListener("change", e => setRangeSlider(e, 2));

noUiSlider.create(rangeSlider, {
    start: [2000, 25000],
    margin: 1000,
    connect: true,
    step: 500,
    range: {
        'min': [0],
        '25.8%': [2000, 1000],
        '71%': [25000, 1000],
        'max': [50000]
    },
});

rangeSlider.noUiSlider.on('update', function(values, handle) {
    tipRange1.innerText = Math.round(values[0]) + ' ??????.';
    tipRange2.innerText = Math.round(values[1]) + ' ??????.';
    handle === 0 && (inputWithSlider1.value = Math.round(values[0]));
    handle === 1 && (inputWithSlider2.value = Math.round(values[1]));
});

function setRangeSlider(e, index) {
    index === 1 && (rangeSlider.noUiSlider.set([e.target.value, null]));
    index === 2 && (rangeSlider.noUiSlider.set([null, e.target.value]));
}

function changeCheckboxStep2() {
    if (checkboxReady.checked) {
        dialogNextButton.removeAttribute("disabled");
        step2hiddenBlock.setAttribute("style", "display: ''");
    } else {
        dialogNextButton.setAttribute("disabled", "true");
        step2hiddenBlock.setAttribute("style", "display: none");
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

const formArr = Array.from(step4);
const validFormArr = [];

formArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
        el.setAttribute("data-is-valid", "0");
        validFormArr.push(el);
    }
});

step4.addEventListener("input", changeCheckboxStep4);

function changeCheckboxStep4(e) {
    if (e.target && e.target.hasAttribute("data-reg")) {
        inputCheck(e.target);
    }
    let hasDataInputsStep4 = formArr.reduce((acc, current, index) => {
        return !!(acc && (current.type === "checkbox" ? current.checked : current.value));
    }, true);
    const allValid = [];
    validFormArr.forEach((el) => {
        allValid.push(+el.getAttribute("data-is-valid"));
    });
    const isAllValid = allValid.reduce((acc, current) => {
        return acc && current;
    });
    if (hasDataInputsStep4 && isAllValid) {
        dialogNextButton.removeAttribute("disabled")
    } else {
        dialogNextButton.setAttribute("disabled", "true");
    };
};

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
        el.classList.remove("input__input_error");
        el.setAttribute("data-is-valid", "1");
    } else {
        el.classList.add("input__input_error");
        el.setAttribute("data-is-valid", "0");
    }
}