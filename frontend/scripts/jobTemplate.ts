import jobData from "./jobData.json";

type Job = typeof jobData[number];

export function createJobHTML(job: Job): string {
  return `
    <div>
      <div class="flex justify-between items-center">
        <div><img src="${job.logo}" class="w-auto h-14 bg-white rounded-xl"></div>
        <div class="text-gray-300 italic text-sm">${job.dateRange}</div>
      </div>
      <div class="pb-6">
        <p class="font-bold pb-2">${job.company}</p>
        <p class="text-white italic pb-1">${job.title}</p>
        <ul data-timeline>
          <li class="relative">
            <span class="absolute top-1.5 left-2 w-2 h-2 bg-gray-400 rounded-full z-10" data-main-bullet></span>
            <div class="flex justify-between items-start pl-6 pr-2">
              <div class="flex flex-col flex-1">
                <p class="line-clamp-1 text-gray-300 italic transition-all duration-300 text-sm" data-main-text>
                  ${job.bullets[0].text}
                </p>
              </div>
              <div class="text-gray-300 italic text-xs whitespace-nowrap ml-2">${job.bullets[0].date}</div>
            </div>
          </li>

          <div class="transition-max-height duration-500 overflow-hidden max-h-0" data-extra-wrapper>
            ${job.bullets.slice(1).map(b => `
              <li class="relative hidden" data-extra-item>
                <span class="absolute top-1.5 left-2 w-2 h-2 bg-white rounded-full z-10"></span>
                <div class="flex justify-between items-start pl-6 pr-2">
                  <p class="text-white not-italic transition-all duration-300 flex-1 text-sm" data-extra-text>
                    ${b.text}
                  </p>
                  <div class="text-gray-300 italic text-xs pl-4">${b.date}</div>
                </div>
              </li>
            `).join("")}
            <div class="flex justify-end mt-2 hidden" data-see-less-wrapper>
              <button onclick="toggleTimeline(this)" class="text-blue-400 text-sm hover:underline flex items-center gap-1">
                See less <span>▲</span>
              </button>
            </div>
          </div>

          <div class="hidden flex justify-center" data-extra-img>
            <img src="${job.exImage}" class="max-w-full w-[100%] sm:w-[80%] md:w-[70%] rounded-lg shadow" />
          </div>

          <div class="flex justify-end mt-2" data-see-more-wrapper>
            <button onclick="toggleTimeline(this)" data-see-more class="text-blue-400 text-sm hover:underline flex items-center gap-1">
              ...see more <span>▼</span>
            </button>
          </div>
        </ul>
        <hr class="border-t-2 border-white my-4" />
      </div>
    </div>
  `;
}
