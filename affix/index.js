'use strict';

document.addEventListener('DOMContentLoaded', function() {

  // AFFIX CLASS DEFINITION
  // ======================
  var Affix = function (element, affixTarget, options) {
    this.options = Object.assign({}, options);
    // Target is assumened to be window as of now. Todo - Need to target a scrollable container
    const target = window;

    // By default target will be window
    target.addEventListener('scroll', this.checkPosition.bind(this));

    this.target = target;
    this.element = element;
    this.affixTarget = affixTarget;
    this.affixed = null;
    this.scrollableInfo = [];

    // initialize the above values - $element, affixed, unpin, pinnedoffset etc
    this.checkPosition()
  }

  Affix.RESET              = 'affix affix-top affix-bottom'

  window.affix             = Plugin
  window.affix.Constructor = Affix

  Affix.prototype.getState = function (height, offsetTop, offsetBottom) {
    const targetScrollHeight = this.target.pageYOffset || 0;
    if (offsetTop != null && targetScrollHeight <= offsetTop) return 'top';
    if (offsetTop != null && targetScrollHeight + height > offsetBottom) return 'bottom';
    return false;
  }

  Affix.prototype.checkPosition = function () {

    const height = this.element.clientHeight;
    const offset = this.options;
    const offsetTop = offset.top;
    const offsetBottom = this.affixTarget.offsetTop + this.affixTarget.clientHeight;
    const scrollHeight = Math.max($(document).height(), $(document.body).height())
    const affixState = this.getState(height, offsetTop, offsetBottom);

    if (this.affixed !== affixState) {
      const affixType = 'affix' + (affixState ? '-' + affixState : '');
      this.affixed = affixState;
  
      this.element.classList.remove('affix', 'affix-top', 'affix-bottom');
      this.element.classList.add(affixType);
  
      this.element.style.top = affixState === 'bottom' ? ( this.affixTarget.clientHeight - height) + 'px' : '';
    }
  }


  function Plugin(option) {
    var options = typeof option == 'object' && option
    new Affix(options.affix, options.affixTarget, options)
  }
});
