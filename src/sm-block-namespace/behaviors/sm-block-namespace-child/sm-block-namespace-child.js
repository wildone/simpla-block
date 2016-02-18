// Don't override
window.simpla = window.simpla || {};
window.simpla.behaviors = window.simpla.behaviors || {};

/**
 * A behavior for elements that can live in namespaces.
 *
 * It expects you to already have a property named UID:
 *
 *  This is the unique id, and is scoped to the project. It will be based on
 *  	on the namespace ancestry, and the current sid. It's is merely the path from
 *    this element all the way back to the root ns, passing through each namespace.
 *
 * 	In the example below, the base url and therefore root ns is http://foobar.com,
 *   the second and third namespaces are bar and baz respectively. This pid is qux
 *   Example: 'http://foobar\.com.bar.baz.qux'
 *
 * 	More simply, it is `${namespace.uid}.${this.sid}`
 *
 * 	Note: It is updated via observers and event handlers, as it needs to be
 *  	manually mutated by internal methods, it's not computed
 *
 *
 * @type {Object}
 */
const blockNamespaceChild = {
  properties: {
    /**
     * This is the simpla id of the element. This is scoped to the namespace and
     *  should be created by the user. It must be unique to the namespace.
     * @type {String}
     */
    sid: {
      type: String,
      value: ''
    },

    /**
     * The current namespace it's attached to
     * @type {HTMLElement}
     */
    namespace: {
      value: null,
      observer: 'joinNamespace'
    }
  },

  observers: [
    '_updateUid(namespace, sid)'
  ],

  attached() {
    this.updateNamespace();
  },

  /**
   * Observer for namespace. Adds itself onto the given namespace, i.e. add itself as an element to that
   * 	namespace, and removes itself from the previous namespace
   * @param {HTMLElement} namespace           Namespace to join
   * @param {HTMLElement} previousNamespace   Previous namespace to remove itself from
   * @return {undefined}
   */
  joinNamespace(namespace, previousNamespace) {

    // Store a bound listener, otherwise we wouldn't be able to remove the listener
    //  and / or give it a contextual listener
    if (!this._namespaceListener) {
      this._namespaceListener = (event) => {
        let uid = event.detail.value;
        this._changeUid(this._computeUid(uid, this.sid));
      }
    }

    if (namespace) {
      namespace.addElement(this);
      namespace.addEventListener('uid-changed', this._namespaceListener);
    }

    if (previousNamespace) {
      previousNamespace.removeElement(this);
      previousNamespace.removeEventListener('uid-changed', this._namespaceListener);
    }
  },

  /**
   * Helper function to set a uid, whether it's read only or not
   * @param  {String} uid UID to set this.uid to
   * @return {undefined}
   */
  _changeUid(uid) {
    if (this._setUid) {
      this._setUid(uid);
    } else {
      this.uid = uid;
    }
  },

  /**
   * Computed function for uid. Returns / sets it to a string of the form:
   * 	`${namespace.uid}.${this.sid}`
   * @param {String} base      Base portion of UID, usually namespaces uid
   * @param {String} sid       Current sid to append to base
   * @return {String}          Returns UID string
   */
  _computeUid(base, sid) {
    let escaped = sid.replace('.', '\\.');
    return base ? `${base}.${escaped}` : escaped;
  },

  _updateUid(namespace, sid) {
    let base = namespace ? namespace.uid : '',
        uid = this._computeUid(base, sid);

    this._changeUid(uid);
  },

  /**
   * Find the nearest parent namespace / block and attach itself to it
   * @return {HTMLElement} Closest parent namespace
   */
  updateNamespace() {
    let element = this,
        found = false;

    while (!found && (element = element.parentElement)) {
      found = !!element._smNamespace;
    }

    this.namespace = element && found ? element._smNamespace : null;
  }
};

window.simpla.behaviors.blockNamespaceChild = blockNamespaceChild;
