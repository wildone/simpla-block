# simpla-block

Note: `simpla-block` is a placeholder element, the logic will go into `sm-block-ns` which namespaces child elements. This is so that _right away_ the body will be a namespace, and in future, more elements may do the same. In other words, `simpla-block` implements a namespace. Other elements can then also implement a namespace

## sm-block-ns:

```javascript
{

  /**
   * Namespaces can be nested inside namespaces, thus should have SmNsChild behavior
   * @type {Array}
   */
  behaviors: [ SmNsChild ]

  /**
   * The element that physically contains all of the elements
   * @type {HTMLElement}
   */
  block: null

  /**
   * Collection of children in the block, each consists of an element and the
   *  path to that element
   * @type {Array}
   */
  children: [],

  /**
   * Add child element to ns
   * @param {HTMLElement} element
   * @return {undefined}
   */
  addChild(element),

  /**
   * Remove child element from ns
   * @param  {HTMLElement} element
   * @return {undefined}
   */
  removeChild(element),

  /**
   * Observer for block property. This will release all the current children and
   *  then tell every globally orphaned child to find their closest parent, thus
   * reassigning children to the appropriate ns on every block change.
   * @param  {HTMLElement} block
   * @return {undefined}
   */
  _blockObserver(block)
}
```

## SmNsChild Behavior

A behavior for elements that can live in namespaces.

```javascript
{

  /**
   * This is the simpla id of the element. This is scoped to the namespace and
   *  should be created by the user. It must be unique to the namespace.
   * @type {String}
   */
  sid: '',

  /**
   * This is the unique id, and is scoped to the project. It is computed based
   * 	on the namespace ancestry, and the current sid. It's is merely the path from
   *  this element all the way back to the root ns, passing through each ns.
   *
   * In the example below, the base url and therefore root ns is http://foobar.com,
   *  the second and third namespaces are bar and baz respectively. This pid is qux
   * Example: 'http://foobar\.com.bar.baz.qux'
   *
   * More simply, it is `${namespace.uid}.${this.sid}`
   *
   * @type {String}
   */
  uid: '',

  /**
   * The current namespace it's attached to
   * @type {HTMLElement}
   */
  namespace: null,

  /**
   * Join itself onto the given namespace, i.e. add itself as an element to that
   * 	namespace
   */
  joinNamespace(namespace),

  /**
   * Should update it's own current uid, this is: `${namespace.uid}.${this.sid}`
   */
  updateUid(namespace, pid),

  /**
   * Find the nearest parent namespace / block
   */
  findNamespace()
}
```
