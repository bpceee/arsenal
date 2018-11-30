let styleEl;
let keyframeID = 0;

/**
 * Observe DOM Node Insertion.
 *
 * @param {numsber} selector CSS selector string.
 * @param {function(event)} listener Callback called whenever the DOM Node selected inserted.
 * @returns {function()} Returns a unobserve function for this observer.
 * @example
 *
 * let unobserve = insertionObserver('div .btn', () => {});
 * unobserve(); // 
 */

const insertionObserver = (selector, callback) => {
  if (!styleEl) {
    styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
  }
  const curKeyframeName = `insertionObserver${keyframeID++}`;
  const keyframesRule = `@keyframes ${curKeyframeName} { from { opacity: 0.99; } to { opacity: 1; } }`;
  const styleRule = `${selector} { animation-duration: 0.001s; animation-name: ${curKeyframeName}; }`;

  const rulesIdx = styleEl.sheet.length;
  styleEl.sheet.insertRule(keyframesRule);
  styleEl.sheet.insertRule(styleRule);

  const listener = (event) => {
    if (event.animationName === curKeyframeName) {
      callback(event);
    }
  }
  document.addEventListener('animationstart', listener, false);

  return () => {
    styleEl.sheet.deleteRule(rulesIdx);
    styleEl.sheet.deleteRule(rulesIdx + 1);
    document.removeEventListener('animationstart', listener, false);
  }  
}

export default insertionObserver;