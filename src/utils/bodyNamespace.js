function setup() {
  let body,
      admin,
      namespace;

  body = document.body;

  // Namespace
  namespace = document.createElement('sm-block-namespace');
  namespace.block = body;

  // Define getters / setters for sid and gid
  Object.defineProperty(body, 'sid', {
    get() {
      return this._smNamespace.gid;
    },
    set(value) {
      this._smNamespace.gid = value;
    },
    enumerable: true
  });

  Object.defineProperty(body, 'gid', {
    get() {
      return this._smNamespace.gid;
    },
    set(value) {
      this._smNamespace.gid = value;
    },
    enumerable: true
  });

  // Set initial value from attribute
  body.gid = body.getAttribute('gid') || body.getAttribute('sid') || '';
};

function listener() {
  if (document.body) {
    setup();
    document.removeEventListener('readystatechange', listener);
  }
}

export default function makeBodyNamespace() {
  if (!document.body) {
    document.addEventListener('readystatechange', listener);
  } else {
    setup();
  }
}
