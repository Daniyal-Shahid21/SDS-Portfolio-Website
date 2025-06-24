import projData from "./projData.json";

type Proj = typeof projData[number];

export function createProjName(proj: Proj): string {
  return `
    <button 
      title="${proj.type}"
      data-selected="false"
      class="project-button text-nowrap mb-3 flex w-full bg-zinc-900 border border-zinc-900 rounded-xl justify-center p-4
             transition-colors duration-100 ease-in-out
             hover:bg-zinc-700 hover:border-white
             data-[selected=true]:bg-zinc-700 data-[selected=true]:border-white">
      ${proj.title}
    </button>
  `;
}

