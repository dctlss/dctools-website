/**
 * DCTools.org - Main Application Logic
 */

const TOOLS_REGISTRY = [
  {
    id: 'webhook-builder',
    title: 'Webhook Builder',
    description: 'Create, edit, and send custom Discord webhooks with live chat previews and JSON payload export.',
    icon: 'fa-solid fa-layer-group',
    path: './tools/webhook-builder.html'
  },
  {
    id: 'chat-mockup-generator',
    title: 'Chat Mockup Generator',
    description: 'Create realistic Discord chat screenshots for memes, guides, or server announcements with PNG export.',
    icon: 'fa-solid fa-message',
    path: './tools/chat-mockup-generator.html'
  },
  {
    id: 'pfp-downloader',
    title: 'PFP Downloader',
    description: 'Download full-resolution Discord user profile avatars instantly in high-definition formats.',
    icon: 'fa-solid fa-user-circle',
    path: './tools/pfp-downloader.html'
  },
  {
    id: 'server-icon-downloader',
    title: 'Server Icon Downloader',
    description: 'Extract high-resolution server icons, banners, and splash screens.',
    icon: 'fa-solid fa-image',
    path: './tools/server-icon-downloader.html'
  },
  {
    id: 'timestamp-generator',
    title: 'Timestamp Generator',
    description: 'Generate dynamic Discord Unix timestamps (<t:123456789:F>) for markdown messages.',
    icon: 'fa-solid fa-clock',
    path: './tools/timestamp-generator.html'
  },
  {
    id: 'advanced-text-editor',
    title: 'Pro Text Editor',
    description: 'Format text with Discord markdown, blockquotes, spoiler tags, codeblocks, and smallcaps.',
    icon: 'fa-solid fa-font',
    path: './tools/advanced-text-editor.html'
  },
  {
    id: 'user-inspector',
    title: 'User Inspector',
    description: 'Analyze Discord user profiles to inspect creation dates, custom banners, avatar types, and accent colors.',
    icon: 'fa-solid fa-id-card',
    path: './tools/user-inspector.html'
  },
  {
    id: 'server-inspector',
    title: 'Server Inspector',
    description: 'Inspect Discord server metadata like snowflake IDs, verification levels, boost tiers, invite links, etc.',
    icon: 'fa-solid fa-server',
    path: './tools/server-inspector.html'
  },
  {
    id: 'server-name-generator',
    title: 'Server Name Generator',
    description: 'Generate aesthetic, gaming, roleplay, and community server names with stylish symbols.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    path: './tools/server-name-generator.html'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const toolsGrid = document.getElementById('tools-grid');
  if (toolsGrid) {
    renderToolsGrid();
    setupSearch();
  }
});

/**
 * Renders tool cards into #tools-grid based on search query
 */
function renderToolsGrid(query = '') {
  const container = document.getElementById('tools-grid');
  if (!container) return;

  const cleanQuery = query.toLowerCase().trim();

  const filteredTools = TOOLS_REGISTRY.filter(tool => {
    return tool.title.toLowerCase().includes(cleanQuery) || 
           tool.description.toLowerCase().includes(cleanQuery);
  });

  if (filteredTools.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-discord-card/50 rounded-2xl border border-white/5 space-y-3">
        <i class="fa-solid fa-magnifying-glass text-3xl text-discord-textMuted"></i>
        <p class="text-discord-textMuted text-base font-semibold">No tools found matching your search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredTools.map(tool => `
    <a href="${tool.path}" class="tool-card group bg-discord-card hover:bg-discord-cardHover border border-white/5 hover:border-discord-blurple/50 rounded-2xl p-6 shadow-xl transition duration-200 flex flex-col justify-between space-y-5">
      <div class="space-y-4">
        <div class="w-12 h-12 bg-discord-sidebar group-hover:bg-discord-blurple text-discord-blurple group-hover:text-white rounded-xl flex items-center justify-center text-xl transition duration-200 shadow-inner">
          <i class="${tool.icon}"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold text-white group-hover:text-discord-blurple transition flex items-center gap-2">
            ${tool.title}
          </h2>
          <p class="text-discord-textMuted text-sm mt-2 leading-relaxed">
            ${tool.description}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end pt-4 border-t border-white/5 text-sm font-bold text-discord-blurple">
        <span class="flex items-center gap-2 group-hover:translate-x-1 transition duration-200">
          Open Tool <i class="fa-solid fa-arrow-right text-xs"></i>
        </span>
      </div>
    </a>
  `).join('');
}

/**
 * Setup search listeners
 */
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const mobileSearchInput = document.getElementById('mobile-search-input');

  const handleSearch = (e) => {
    const val = e.target.value;
    if (searchInput && e.target !== searchInput) searchInput.value = val;
    if (mobileSearchInput && e.target !== mobileSearchInput) mobileSearchInput.value = val;
    renderToolsGrid(val);
  };

  if (searchInput) searchInput.addEventListener('input', handleSearch);
  if (mobileSearchInput) mobileSearchInput.addEventListener('input', handleSearch);
}