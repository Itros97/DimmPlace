console.log('Hello from renderer process!');

const addButton = document.getElementById('add-wood-button');
let revertTimeout;

function changeBackgroundColor(startColor, endColor, duration) {
  let step = 0;
  const steps = 100;
  const interval = duration / steps;
  const colorStep = {
    r: (endColor.r - startColor.r) / steps,
    g: (endColor.g - startColor.g) / steps,
    b: (endColor.b - startColor.b) / steps,
  };

  const intervalId = setInterval(() => {
    if (step >= steps) {
      clearInterval(intervalId);
      return;
    }

    const newColor = {
      r: Math.round(startColor.r + colorStep.r * step),
      g: Math.round(startColor.g + colorStep.g * step),
      b: Math.round(startColor.b + colorStep.b * step),
    };

    document.body.style.backgroundColor = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    step++;
  }, interval);
}

function resetBackgroundColor() {
  clearTimeout(revertTimeout);
  changeBackgroundColor({ r: 211, g: 211, b: 211 }, { r: 26, g: 26, b: 26 }, 5000);
}

if (addButton) {
  addButton.addEventListener('click', () => {
    clearTimeout(revertTimeout);
    changeBackgroundColor({ r: 26, g: 26, b: 26 }, { r: 211, g: 211, b: 211 }, 5000);

    revertTimeout = setTimeout(() => {
      resetBackgroundColor();
    }, 10000);
  });
}
