/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();
    
    //Novo
    this.solGeometryEl = document.querySelector('#solGeometry');

    this.button1El = document.querySelector('#button1');
    this.button2El = document.querySelector('#button2');
    this.button3El = document.querySelector('#button3');
    this.button4El = document.querySelector('#button4');
    this.solButtonEl = document.querySelector('#solButton');
    this.merButtonEl = document.querySelector('#merButton');
    this.venButtonEl = document.querySelector('#venButton');
    this.terButtonEl = document.querySelector('#terButton');
    this.marButtonEl = document.querySelector('#marButton');
    this.jupButtonEl = document.querySelector('#jupButton');
    this.satButtonEl = document.querySelector('#satButton');
    this.uraButtonEl = document.querySelector('#uraButton');    
    this.netButtonEl = document.querySelector('#netButton');
    this.todosButtonEl = document.querySelector('#todosButton');    
    
    /* this.buttonNumberToGeometry = {
      'button1El': this.button1El,
      'button2El': this.button2El,
      'button3El': this.button3El,
      'button4El': this.button4El
    };

    this.buttonPlanetToGeometry = {
      'solButtonEl': this.solButtonEl,
      'merButtonEl': this.merButtonEl,
      'venButtonEl': this.venButtonEl,
      'terButtonEl': this.terButtonEl,
      'marButtonEl': this.marButtonEl,
      'jupButtonEl': this.jupButtonEl,
      'satButtonEl': this.satButtonEl,
      'uraButtonEl': this.uraButtonEl,
      'netButtonEl': this.netButtonEl,
      'todosButtonEl': this.todosButtonEl
    }; */

    this.button1El.addEventListener('click', this.onClick);
    this.button2El.addEventListener('click', this.onClick);
    this.button3El.addEventListener('click', this.onClick);
    this.button4El.addEventListener('click', this.onClick);
    this.solButtonEl.addEventListener('click', this.onClick);
    this.merButtonEl.addEventListener('click', this.onClick);
    this.venButtonEl.addEventListener('click', this.onClick);
    this.terButtonEl.addEventListener('click', this.onClick);
    this.marButtonEl.addEventListener('click', this.onClick);
    this.jupButtonEl.addEventListener('click', this.onClick);
    this.satButtonEl.addEventListener('click', this.onClick);
    this.uraButtonEl.addEventListener('click', this.onClick);
    this.netButtonEl.addEventListener('click', this.onClick);
    this.todosButtonEl.addEventListener('click', this.onClick);    
    
    //this.solButtonEl.addState('pressed');
    
    const planets = ['sol', 'mer', 'ven', 'ter', 'mar', 'jup', 'sat', 'ura', 'net'];
    socket.on('stagePressed', (msg) => {                
      let p = '';
      let d;
      for (let planet of planets) if (document.querySelector(`#${planet}Button`).is("pressed")) p = planet;

      let a = `a${msg.slice(-1)}`;

      if (a == 'a4') {
        const Dpla = escalas.a3.diametroPlanetario.max/diametroPlanetario.net**escalas.a3.diametroPlanetario.potencia;          
        d = Dpla*diametroPlanetario['sol']**escalas.a3.diametroPlanetario.potencia;
        document.querySelector(`#solGeometry4`).setAttribute("animation__1", {property: "scale", to: `${d} ${d} ${d}`, dur: 10000});
        document.querySelector(`#solGeometry2`).setAttribute("animation__1", {property: "position", to: `0 ${escalas[a].altura} 0`, dur: 3000});      
      }
      else {
        const Dpla = escalas[a].diametroPlanetario.max/diametroPlanetario.net**escalas[a].diametroPlanetario.potencia;          
        const Rorb = escalas[a].raioOrbital.max/raioOrbital.net**escalas[a].raioOrbital.potencia;
                  
        if (p == 'sol') d = escalas[a].diametroSolar*Dpla*diametroPlanetario['jup']**escalas[a].diametroPlanetario.potencia;
        else d = Dpla*diametroPlanetario[p]**escalas[a].diametroPlanetario.potencia;
        console.log(msg);
        console.log(p);
        document.querySelector(`#${p}Geometry4`).setAttribute("animation__1", {property: "scale", to: `${d} ${d} ${d}`, dur: 2000});
        document.querySelector(`#${p}Geometry2`).setAttribute("animation__1", {property: "position", to: `0 ${escalas[a].altura} ${-Rorb*raioOrbital[p]**escalas[a].raioOrbital.potencia}`, dur: 2000});      
      }

      //this.darkModeButtonEl.click();
    });    
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.button1El ||
        targetEl === this.button2El ||
        targetEl === this.button3El ||
        targetEl === this.button4El) {
      this.button1El.removeState('pressed');
      this.button2El.removeState('pressed');
      this.button3El.removeState('pressed');
      this.button4El.removeState('pressed');
      targetEl.addState('pressed');
      //this.boxGeometryEl.object3D.visible = false;
      //this.sphereGeometryEl.object3D.visible = false;
      //this.torusGeometryEl.object3D.visible = false;
      //this.buttonNumberToGeometry[targetEl.id].object3D.visible = true;

      socket.emit('stagePressed', targetEl.id);   
    }

    if (targetEl === this.solButtonEl ||
        targetEl === this.merButtonEl ||
        targetEl === this.venButtonEl ||
        targetEl === this.terButtonEl ||
        targetEl === this.marButtonEl ||
        targetEl === this.jupButtonEl ||
        targetEl === this.satButtonEl ||
        targetEl === this.uraButtonEl ||
        targetEl === this.netButtonEl ||
        targetEl === this.todosButtonEl) {
      this.solButtonEl.removeState('pressed');
      this.merButtonEl.removeState('pressed');
      this.venButtonEl.removeState('pressed');
      this.terButtonEl.removeState('pressed');
      this.marButtonEl.removeState('pressed');
      this.jupButtonEl.removeState('pressed');
      this.satButtonEl.removeState('pressed');
      this.uraButtonEl.removeState('pressed');
      this.netButtonEl.removeState('pressed');
      this.todosButtonEl.removeState('pressed');
      targetEl.addState('pressed');
      //this.buttonPlanetToGeometry[targetEl.id].object3D.visible = true;
    }
  }
});
