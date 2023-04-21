var _abortController, _onPointerLeave, onPointerLeave_fn, _onPointerMove, onPointerMove_fn;
var CustomCursor = class extends HTMLElement {
  constructor() {
    super(...arguments);
    __privateAdd(this, _onPointerLeave);
    __privateAdd(this, _onPointerMove);
    __privateAdd(this, _abortController, void 0);
  }
  connectedCallback() {
    __privateSet(this, _abortController, new AbortController());
    this.parentElement.addEventListener("pointermove", __privateMethod(this, _onPointerMove, onPointerMove_fn).bind(this), { passive: true, signal: __privateGet(this, _abortController).signal });
    this.parentElement.addEventListener("pointerleave", __privateMethod(this, _onPointerLeave, onPointerLeave_fn).bind(this), { signal: __privateGet(this, _abortController).signal });
  }
  disconnectedCallback() {
    __privateGet(this, _abortController).abort();
  }
};
_abortController = new WeakMap();
_onPointerLeave = new WeakSet();
onPointerLeave_fn = function() {
  this.classList.remove("is-visible", "is-half-start", "is-half-end");
};
_onPointerMove = new WeakSet();
onPointerMove_fn = function(event) {
  if (event.target.matches("button, a[href], button :scope, a[href] :scope")) {
    return this.classList.remove("is-visible");
  }
  const parentBoundingRect = this.parentElement.getBoundingClientRect(), parentXCenter = (parentBoundingRect.left + parentBoundingRect.right) / 2, isOnStartHalfPart = event.pageX < parentXCenter;
  this.classList.toggle("is-half-start", isOnStartHalfPart);
  this.classList.toggle("is-half-end", !isOnStartHalfPart);
  this.classList.add("is-visible");
  const mouseY = event.clientY - parentBoundingRect.y - this.clientHeight / 2, mouseX = event.clientX - parentBoundingRect.x - this.clientWidth / 2;
  this.style.translate = `${mouseX.toFixed(3)}px ${mouseY.toFixed(3)}px`;
  this.style.transform = `${mouseX.toFixed(3)}px ${mouseY.toFixed(3)}px`;
};
if (!window.customElements.get("custom-cursor")) {
  window.customElements.define("custom-cursor", CustomCursor);
}