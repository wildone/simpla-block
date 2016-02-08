class SimplaBlock {
  beforeRegister() {
    this.is = 'simpla-block';

    this.properties = {
      /**
       * Value of self to decleratively pass to namespace
       * @type {HTMLElement}
       */
      self: {
        value: null
      }
    }
  }

  /**
   * Behaviors
   * @type {array}
   */
  get behaviors() {
    // Namespaces can be nested inside namespaces, thus should have SmNamespaceChild behavior
    return [ simpla.behaviors.blockNamespaceChild ]
  }

  ready() {
    this.self = this;
  }
}

Polymer(SimplaBlock);
