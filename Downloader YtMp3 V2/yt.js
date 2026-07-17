/*
 * [ Yt Mp3 ]
 * creator : H1Dz
 * base    : -
 * channel : https://whatsapp.com/channel/0029Vb82nkLEwEjtLSQ49I44
 * support : follow my channel for more updates
 */
async function convertYoutubeToMp3(youtubeUrl) {
    try {
        const inputEl = document.querySelector('input[name="url"]') || document.getElementById('url') || document.querySelector('input[type="text"]');
        const buttonEl = document.querySelector('button[type="submit"]') || document.getElementById('search-btn') || document.querySelector('.btn-search');

        if (!inputEl || !buttonEl) return;

        inputEl.value = youtubeUrl;
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
        buttonEl.click();

        let targetBtn = null;
        for (let i = 0; i < 30; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            targetBtn = document.getElementById('proceed_320') || document.getElementById('proceed_128');
            if (targetBtn) break;
        }

        if (!targetBtn) return;
        targetBtn.click();

        const linkContainerId = targetBtn.id === 'proceed_320' ? 'mp3link_320' : 'mp3link_128';
        const linkContainer = document.getElementById(linkContainerId);
        if (!linkContainer) return;

        let attempts = 0;
        while (attempts < 45) {
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 2000));

            const anchor = linkContainer.querySelector('a.download-anchor');
            if (anchor && anchor.href) {
                window.location.href = anchor.href;
                return anchor.href;
            }
        }
    } catch (error) {
        console.error(error);
    }
}
