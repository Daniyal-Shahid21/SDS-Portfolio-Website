export interface BlogPost {
  date: string;
  content: string;
  opVid?: string;
  opImg?: string;
}

export function createBlogPostHTML(post: BlogPost): string {
    return `
    <div class="bg-zinc-900 rounded-lg p-6 my-4 shadow text-white">
        <p class="text-sm text-gray-400 italic">${post.date}</p>
        <p class="py-2">${post.content}</p>

        ${post.opVid ? `
        <div class="my-4">
            <iframe src="${post.opVid}" class="w-full aspect-video rounded-lg" allowfullscreen></iframe>
        </div>` : ''}

        ${post.opImg ? `
        <div class="my-4">
            <img src="${post.opImg}" class="max-w-full rounded-lg shadow" />
        </div>` : ''}
    </div>
    `;
}
