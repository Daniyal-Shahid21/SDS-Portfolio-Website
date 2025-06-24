import { createProjName } from './projName.js';
import { createProjTemplate } from './projTemplate.js';
import projData from './projData.json' assert { type: "json" };

type Proj = typeof projData[number];

let currentProject: Proj | null = null;
let currentButton: HTMLButtonElement | null = null;

function renderProject(proj: Proj, button: HTMLButtonElement): void {
  const displayArea = document.getElementById("projectDisplay");
  if (!displayArea) return;

  currentProject = proj;
  currentButton = button;

  // Inject the template
  displayArea.innerHTML = createProjTemplate(proj);
  displayArea.classList.remove("animate-collapse");
  void displayArea.offsetWidth;
  displayArea.classList.add("animate-expand");

  // Preview button logic
  const previewButton = document.getElementById("preview");
  if (previewButton && proj.preview) {
    previewButton.addEventListener("click", () => {
      fetch(proj.preview)
        .then(res => res.ok ? res.text() : Promise.reject("Failed to fetch preview"))
        .then(data => {
          const container = document.getElementById("githubPreviewContainer");
          if (container) container.textContent = data;
        })
        .catch(err => {
          console.error(err);
          alert("Could not load preview content.");
        });
    });
  }

  // Minimize logic
  const minimizeButton = document.getElementById("minimize");
  if (minimizeButton) {
    minimizeButton.addEventListener("click", () => {
      displayArea.classList.remove("animate-expand");
      displayArea.classList.add("animate-collapse");

      if (currentButton) {
        currentButton.setAttribute("data-selected", "false");
      }

      currentProject = null;
      currentButton = null;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectNames");
  if (!container) return;

  fetch('./scripts/projData.json')
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to load project data: HTTP ${res.status}`);
        return null;
      }
      return res.json();
    })
    .then((projects: Proj[]) => {
      if (!projects) return;
      container.innerHTML = projects.map(createProjName).join("");

      const buttons = container.querySelectorAll<HTMLButtonElement>("button.project-button");

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {

          // Clear other selections
          buttons.forEach(btn => btn.setAttribute("data-selected", "false"));

          // Mark this one as selected
          button.setAttribute("data-selected", "true");

          // Load project
          renderProject(projects[index], button);
        });
      });
    });
});
