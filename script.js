document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.js-input');
  const prettifyButton = document.querySelector('.js-prettify');
  const output = document.querySelector('.js-output');
  const copyButton = document.querySelector('.js-copy');
  const downloadButton = document.querySelector('.js-download');
  const backToTopButton = document.querySelector('.js-back-to-top');
  const toast = document.querySelector('.js-toast');

  const prettifyJSON = () => {
      try {
          const obj = JSON.parse(input.value);
          const pretty = JSON.stringify(obj, null, 2);
          output.textContent = pretty;
          output.className = 'output js-output language-json';
          hljs.highlightElement(output);
      } catch (error) {
          output.textContent = `Error: Invalid JSON\n${error.message}`;
          output.className = 'output js-output language-plaintext';
          hljs.highlightElement(output);
      }
  };

  const copyToClipboard = () => {
    const range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    showToast('Copied to clipboard!');
};

const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

  const downloadJSON = () => {
      const blob = new Blob([output.textContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prettified-json.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  const toggleBackToTopButton = () => {
      if (window.scrollY > 300) {
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }
  };

  const scrollToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  };

  prettifyButton.addEventListener('click', prettifyJSON);
  copyButton.addEventListener('click', copyToClipboard);
  downloadButton.addEventListener('click', downloadJSON);
  backToTopButton.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', toggleBackToTopButton);

  // Initial check for back to top button
  toggleBackToTopButton();
});
