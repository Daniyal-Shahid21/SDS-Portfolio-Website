import projData from "./projData.json";

type Proj = typeof projData[number];

export function createProjTemplate(proj: Proj): string {
  return `
    <!-- Top Row: Title & Minimize -->
    <div class="flex justify-between items-start pb-2">
      <div class="w-2/3 p-4 font-bold text-xl">${proj.title}</div>
      <button id="minimize" class="h-fit px-4 bg-zinc-900 border border-zinc-900 rounded-sm hover:bg-zinc-700 hover:border-white transition-colors duration-100 ease-in-out text-sm">
        ━
      </button>
    </div>

    <!-- Description -->
    <div class="p-4 text-sm">
      <p>${proj.description || "No description available."}</p>
    </div>

    <!-- Skills, Links, and Image -->
    <div class="p-4 flex justify-between">
      <!-- Left Column -->
      <div>
        <div class="pb-3 flex flex-wrap gap-1">
          ${proj.skills.map(skill => `
            <span class="bg-zinc-700 text-white px-2 py-1 rounded text-xs">${skill}</span>
          `).join("")}
        </div>

        ${proj.weblink ? `
          <div class="pb-1">Link to: <a href="${proj.weblink}" target="_blank" class="text-blue-400 underline hover:text-blue-300">Website</a></div>` : ""}

        ${proj.github ? `
          <div class="pb-1">Link to: <a href="${proj.github}" target="_blank" class="text-blue-400 underline hover:text-blue-300">GitHub</a></div>` : ""}

        ${proj.preview ? `
          <button id="preview" class="text-blue-400 underline hover:text-blue-300">Preview GitHub Code</button>` : ""}
      </div>

      <!-- Right Column: Image -->
      <div>
        ${proj.img ? `<img src="${proj.img}" class="max-w-xs rounded">` : ""}
      </div>
    </div>

    <!-- GitHub Preview Output -->
    <div id="githubPreviewContainer" class="p-4 text-sm text-white whitespace-pre-wrap bg-zinc-900 rounded-lg max-h-96 overflow-auto"></div>
  `;
}
