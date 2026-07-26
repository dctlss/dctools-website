/**
 * Copies plain text strictly to the clipboard without HTML markup or linebreaks.
 * Prevents Discord from converting pasted strings into a 'message.txt' attachment.
 */
async function copyToClipboard(text, customMessage = 'Copied to clipboard!') {
  try {
    // 1. Clean the text: remove line breaks, carriage returns, and extra spaces
    const cleanText = String(text).replace(/[\r\n]+/g, '').trim();

    // 2. Write strictly as plain text using the modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(cleanText);
    } else {
      // Fallback for non-HTTPS or legacy environments
      const textArea = document.createElement('textarea');
      textArea.value = cleanText;
      
      // Prevent screen scroll/zoom on mobile
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '-9999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    // 3. Trigger UI Toast
    showToast(customMessage);
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

/**
 * Shared Toast Notification Helper
 */
function showToast(message = 'Copied to clipboard!') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  
  if (toast && toastMsg) {
    toastMsg.innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    }, 2500);
  }
}