
// if visible 

$.fn.isInViewport = function() {


    var offset = $(this).offset();
    if(!offset) return;
    var elementTop = offset.top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// particle ===================================

function init() {

 var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");




  ptcls = [];
  pause = false;


  colors = ['#f0b500','#ffd196','#f9a28a', '#b9dbfe0', '#f2d6d2'];

  
  Math.srandom = function() { return Math.random()*2 - 1 };

  Ptcl = function() {
    this.x  = 0;
    this.y  = 0;
    this.xv = 0;
    this.yv = 0;
    this.r  = 0;
    this.dt = 0.1;
  };
  
  Ptcl.pt = Ptcl.prototype;
    
  Ptcl.pt.init = function() {
    this.x  = Math.random()*canvas.width;
    this.y  = Math.random()*canvas.height;
    this.xv = Math.srandom()*15;
    this.yv = Math.srandom()*15;
    this.r  = Math.random()*15 + 0;
    this.c  = colors[Math.floor(Math.random()*colors.length)];
  }
  
  Ptcl.pt.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fillStyle = this.c;
    ctx.fill();
  }
  
  Ptcl.pt.update = function() {
    this.interact();
    this.x += this.xv * this.dt;
    this.y += this.yv * this.dt;
    this.bound();
  }
  
  Ptcl.pt.bound = function() {
    if(this.x < 0 + this.r) {this.x = 0 + this.r; this.xv *= -1;};
    if(this.y < 0 + this.r) {this.y = 0 + this.r; this.yv *= -1;};
    if(this.x > canvas.width - this.r) {this.x = canvas.width - this.r; this.xv *= -1;};
    if(this.y > canvas.height - this.r) {this.y = canvas.height - this.r; this.yv *= -1;};
    this.y += this.yv * this.dt;
  }
  
  Ptcl.pt.interact = function() {
    for (var i = 0; i < ptcls.length; i++) {
      var other = ptcls[i];
      if (this != other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        var d  = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
        if (d > 0) {
          var R = this.r + other.r;
          if(d < R) {
            var dR = R - d;
            var ux = dx / d;
            var uy = dy / d;
            this.xv += ux * dR * 0.1;
            this.yv += uy * dR * 0.1;
            other.xv += -ux * dR * 0.1;
            other.yv += -uy * dR * 0.1;
          }
        }
      }
    }
  }
  
  function addPtcls(n) {
    for (var i = 0; i < n; i++) {
      p = new Ptcl();
      p.init();
      ptcls.push(p);
    }
    
  }
  
  function clearPtcls() {
    for (var i = 0; i < ptcls.length; i++) ptcls.pop();
  }
  
  function loop() {
    if(pause) return;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(var i = 0; i < ptcls.length; i++) {
      ptcls[i].update();
      ptcls[i].draw();
    }
  }
  
  var timer = setInterval(loop, 1000/40);
  
  addPtcls(15);
}

init();

// END particle 
 var swiper = new Swiper('.swiper-container', {
  centeredSlides: true,
      grabCursor: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });