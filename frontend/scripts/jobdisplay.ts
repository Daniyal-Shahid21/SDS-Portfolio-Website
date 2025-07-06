import { createJobHTML } from './jobTemplate.js';

function toggleTimeline(button: HTMLButtonElement): void {
    const container = button.closest('[data-timeline]') as HTMLElement | null;
    if (!container) return;

    const mainText = container.querySelector('[data-main-text]') as HTMLElement | null;
    const bullet = container.querySelector('[data-main-bullet]') as HTMLElement | null;
    const extraItems = container.querySelectorAll<HTMLElement>('[data-extra-item]');
    const extraTexts = container.querySelectorAll<HTMLElement>('[data-extra-text]');
    const seeMoreBtn = container.querySelector('[data-see-more]') as HTMLElement | null;
    const extraImage = container.querySelector('[data-extra-img]') as HTMLElement | null;
    const seeLessBtnWrapper = container.querySelector('[data-see-less-wrapper]') as HTMLElement | null;
    const extraWrapper = container.querySelector('[data-extra-wrapper]') as HTMLElement | null;

    if (!mainText || !bullet || !seeMoreBtn || !seeLessBtnWrapper || !extraWrapper || !extraImage) return;

    const expanded = container.classList.toggle('expanded');

    if (expanded) {
        bullet.classList.replace('bg-gray-400', 'bg-white');
        mainText.classList.remove('line-clamp-1', 'text-gray-300', 'italic');
        mainText.classList.add('text-white', 'not-italic', 'pb-4');
        extraItems.forEach(el => el.classList.remove('hidden'));
        extraTexts.forEach(el => {
            el.classList.remove('text-gray-300', 'italic');
            el.classList.add('text-white', 'not-italic', 'pb-4');
        });
        seeMoreBtn.classList.add('hidden');
        extraImage.classList.remove('hidden');
        seeLessBtnWrapper.classList.remove('hidden');

        requestAnimationFrame(() => {
            extraWrapper.style.maxHeight = extraWrapper.scrollHeight + "px";
        });
    } else {
        bullet.classList.replace('bg-white', 'bg-gray-400');
        mainText.classList.add('line-clamp-1', 'text-gray-300', 'italic');
        mainText.classList.remove('text-white', 'not-italic', 'pb-4');
        extraItems.forEach(el => el.classList.add('hidden'));
        seeMoreBtn.classList.remove('hidden');
        extraImage.classList.add('hidden');
        seeLessBtnWrapper.classList.add('hidden');
        extraWrapper.style.maxHeight = extraWrapper.scrollHeight + "px";

        setTimeout(() => {
            requestAnimationFrame(() => {
                extraWrapper.style.maxHeight = "0px";
            });
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("jobs");
    if (!container) return;

    fetch('./scripts/jobData.json')
        .then(res => {
            if (!res.ok) {
                console.error(`Failed to load job data: HTTP ${res.status}`);
                return null;
            }
            return res.json();
        })
        .then(jobData => {
            if (!jobData) return;
            container.innerHTML = jobData.map(createJobHTML).join("");

            const buttons = container.querySelectorAll('[data-see-more], [data-see-less-wrapper] button');
            buttons.forEach(btn => {
                if (btn instanceof HTMLButtonElement) {
                    btn.addEventListener("click", () => toggleTimeline(btn));
                }
            });
        });
});
