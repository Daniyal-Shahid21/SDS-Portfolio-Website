const resumes: string[] = [
  "images/sampleDocument.pdf",
  "images/sampleDocument2.pdf",
  "images/sampleDocument3.pdf"
];

let currentIndex = 0;

const mainResume = document.getElementById("mainResume") as HTMLIFrameElement | null;
const leftResume = document.getElementById("leftResume") as HTMLIFrameElement | null;
const rightResume = document.getElementById("rightResume") as HTMLIFrameElement | null;
const titleEl = document.getElementById("resumeTitle") as HTMLDivElement | null;
const leftBtn = document.getElementById("leftBtn") as HTMLButtonElement | null;
const rightBtn = document.getElementById("rightBtn") as HTMLButtonElement | null;

function updateCarousel(index: number): void {
    if (!mainResume || !leftResume || !rightResume || !titleEl) return;

    mainResume.src = resumes[index];

    titleEl.textContent = getFileTitle(resumes[index]);

    leftResume.src = resumes[(index - 1 + resumes.length) % resumes.length];
    rightResume.src = resumes[(index + 1) % resumes.length];
}

function getFileTitle(path: string): string {
    const file = path.split("/").pop() || "";
    return file.replace(/\.pdf$/i, "");
}

leftBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + resumes.length) % resumes.length;
    updateCarousel(currentIndex);
});

rightBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % resumes.length;
    updateCarousel(currentIndex);
});

updateCarousel(currentIndex);
