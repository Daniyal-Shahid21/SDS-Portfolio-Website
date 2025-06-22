"use strict";
function toggleTimeline(button) {
    const container = button.closest('[data-timeline]');
    if (!container)
        return;
    const mainText = container.querySelector('[data-main-text]');
    const bullet = container.querySelector('[data-main-bullet]');
    const extraItems = container.querySelectorAll('[data-extra-item]');
    const extraTexts = container.querySelectorAll('[data-extra-text]');
    const seeMoreBtn = container.querySelector('[data-see-more]');
    const seeLessBtnWrapper = container.querySelector('[data-see-less-wrapper]');
    const extraWrapper = container.querySelector('[data-extra-wrapper]');
    if (!mainText || !bullet || !seeMoreBtn || !seeLessBtnWrapper || !extraWrapper)
        return;
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
        seeLessBtnWrapper.classList.remove('hidden');
        requestAnimationFrame(() => {
            extraWrapper.style.maxHeight = extraWrapper.scrollHeight + "px";
        });
    }
    else {
        // Main bullet styling
        bullet.classList.replace('bg-white', 'bg-gray-400');
        mainText.classList.add('line-clamp-1', 'text-gray-300', 'italic');
        mainText.classList.remove('text-white', 'not-italic', 'pb-4');
        // Immediately hide extra items
        extraItems.forEach(el => el.classList.add('hidden'));
        seeMoreBtn.classList.remove('hidden');
        seeLessBtnWrapper.classList.add('hidden');
        extraWrapper.style.maxHeight = extraWrapper.scrollHeight + "px";
        // Delay the collapse
        setTimeout(() => {
            requestAnimationFrame(() => {
                extraWrapper.style.maxHeight = "0px";
            });
        }, 100);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('[data-see-more], [data-see-less-wrapper] button');
    toggleButtons.forEach(btn => {
        if (btn instanceof HTMLButtonElement) {
            btn.addEventListener('click', () => toggleTimeline(btn));
        }
    });
});
