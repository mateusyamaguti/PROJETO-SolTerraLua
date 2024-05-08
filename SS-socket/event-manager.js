/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();

    this.boxGeometryEl = document.querySelector('#boxGeometry');
    this.sphereGeometryEl = document.querySelector('#sphereGeometry');
    this.torusGeometryEl = document.querySelector('#torusGeometry');

    //Novo
    this.solGeometryEl = document.querySelector('#solGeometry');

    this.boxButtonEl = document.querySelector('#boxButton');
    this.sphereButtonEl = document.querySelector('#sphereButton');
    this.torusButtonEl = document.querySelector('#torusButton');
    this.darkModeButtonEl = document.querySelector('#darkModeButton');

    //Novo
    this.solButtonEl = document.querySelector('#solButton');

    this.buttonToGeometry = {
      'boxButton': this.boxGeometryEl,
      'sphereButton': this.sphereGeometryEl,
      'torusButton': this.torusGeometryEl
    };

    this.boxButtonEl.addEventListener('click', this.onClick);
    this.sphereButtonEl.addEventListener('click', this.onClick);
    this.torusButtonEl.addEventListener('click', this.onClick);
    this.darkModeButtonEl.addEventListener('click', this.onClick);
    this.boxButtonEl.addState('pressed');

    //Novo
    this.solButtonEl.addEventListener('click', this.onClick);

    socket.on('chat message', (msg) => {          
      console.log(msg);
      this.darkModeButtonEl.click();
    });
    
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.boxButtonEl ||
        targetEl === this.sphereButtonEl ||
        targetEl === this.torusButtonEl) {
      this.boxButtonEl.removeState('pressed');
      this.sphereButtonEl.removeState('pressed');
      this.torusButtonEl.removeState('pressed');
      this.boxGeometryEl.object3D.visible = false;
      this.sphereGeometryEl.object3D.visible = false;
      this.torusGeometryEl.object3D.visible = false;
      this.buttonToGeometry[targetEl.id].object3D.visible = true;
      
      socket.emit('chat message', 'Blas');      
    }

    if (targetEl === this.darkModeButtonEl) {
      if (this.el.sceneEl.is('starry')) {
        targetEl.setAttribute('button', 'label', 'Dark Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'default'});
        this.el.sceneEl.removeState('starry');
      } else {
        targetEl.setAttribute('button', 'label', 'Light Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
        this.el.sceneEl.addState('starry');
      }
      if (targetEl.is('pressed')) console.log('Pressionado');
      else console.log('Solto');
    }

    //Novo
    if (targetEl === this.solButtonEl) {
      console.log('Clicou no Sol.');
      if (targetEl.is('pressed')) {
        console.log('Pressionado');
        this.solGeometryEl.setAttribute("animation", {property: "position", to: '1 8 -10', dur: 2000, easing: "linear"});
      }
      else {
        this.solGeometryEl.setAttribute("animation", {property: "position", to: '0 2.0 -1', dur: 2000, easing: "linear"});
      }
    }

  }
});
