//data
import { sliderContents } from "./slider-data.js";

//variables
const sliderData = sliderContents;
const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderBg = document.querySelector('.slider');
const sliderNextBtn = document.querySelector('.nextSlider');
const sliderPrevBtn = document.querySelector('.prevSlider');
let activeSlider = sliderData[0].id;
let thinkBetter = 1;

//events
document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider();
    slider.renderSliderContents(sliderData[0].id);
});

sliderNextBtn.addEventListener("click", () => {
    const slider = new Slider();
    slider.changeWithButtons("n");
})
sliderPrevBtn.addEventListener("click", () => {
    const slider = new Slider();
    slider.changeWithButtons("p");
})
//functions
class Slider {
    renderSliderContents(id) {
        this.clearDom();
        const slide = sliderData[id - 1];
        const sliderContentTag = document.createElement("div");
        sliderContentTag.classList.add('slider-content');
        sliderContentTag.classList.add(slide.class_id)
        const content = `
            <h2>
                ${slide.heading}
             </h2>
             <p>
                ${slide.content}
             </p>`;

        sliderContentTag.innerHTML = content;
        sliderWrapper.appendChild(sliderContentTag);
    }
    sliderBackground() {
        sliderBg.style.backgroundImage = `url(${sliderData[activeSlider - 1].imageUrl})`;
        if (thinkBetter % 2 === 0) {
            sliderBg.style.transform = "rotateY(0deg) scale(0.9)";
            setTimeout(() => {
                sliderBg.style.transform = "rotateY(0deg) scale(1)";
            }, 1000)
            thinkBetter++;
        }
        else {
            sliderBg.style.transform = "rotateY(-360deg) scale(0.9)";
            setTimeout(() => {
                sliderBg.style.transform = "rotateY(-360deg) scale(1)";
            }, 1000)
            thinkBetter--;
        }
    }
    changeSliderAuto() {
        setInterval();
    }
    changeWithButtons(nOp) {
        if (nOp === "n") {
            if (activeSlider === sliderData.length) {
                activeSlider = 1;
            }
            else {
                activeSlider++;
            }
        }
        else if (nOp === "p") {
            if (activeSlider === 1) {
                activeSlider = sliderData.length;
            }
            else {
                activeSlider--;
            }
        }
        this.renderSliderContents(activeSlider);
        this.sliderBackground();
    }
    clearDom() {
        sliderWrapper.innerHTML = "";
        // sliderBg.style.transform = "rotateY(0deg)";
    }
}

