let link = function(name, x, y) {
    this.size = 1.5;
    this.name = name;
    this.div;


    this.posX = x;
    this.posY = y;
    this.direction = 'down';


    this.badGuy = document.querySelector('.badguy');
    this.posXbadguy = 200;
    this.posYbadguy = 200;
    this.direction = 'down';


    this.bombs = new Object();
    this.bombs.quantity = 0;
    this.bombs.list = new Array();


    this.arrows = new Object();
    this.arrows.quantity = 0;
    this.arrows.list = new Array();


    this.cross = new Array();
    this.affichername = () => {
        console.log(this.name);
    };

    this.bougerBadGuy = () => {
        this.posXbadguy += 30 * (Math.round(Math.random()) * 2 -1);
        this.posYbadguy += 30 * (Math.round(Math.random()) * 2 -1);

        if(this.posXbadguy < 0){
          this.posXbadguy = 0;
        }
        if(this.posXbadguy > 600){
          this.posXbadguy = 600;
        }

        if(this.posYbadguy < 0){
          this.posYbadguy = 0;
        }
        if(this.posYbadguy > 600){
          this.posYbadguy = 600;
        }

        document.querySelector('.badguy').style.top = this.posXbadguy + 'px';
        document.querySelector('.badguy').style.left = this.posYbadguy + 'px';
        setTimeout(badguy.bougerBadGuy, 105);
    }
    this.bougerPersonnage = () => {
        let _this = this;
        window.addEventListener('keypress', function(e) {

            // UP
            if (e.keyCode === _this.cross[0]) {
                _this.posY -= 20;
                movements(_this.div, 'up');
                _this.direction = 'up';
            }

            // RIGHT
            if (e.keyCode === _this.cross[1]) {
                _this.posX += 20;
                movements(_this.div, 'right');
                _this.direction = 'right';
            }

            // LEFT
            if (e.keyCode === _this.cross[2]) {
                _this.posX -= 20;
                movements(_this.div, 'left');
                _this.direction = 'left';
            }

            // DOWN
            if (e.keyCode === _this.cross[3]) {
                _this.posY += 20;
                movements(_this.div, 'down');
                _this.direction = 'down';
            }
            _this.div.style.top = _this.posY + 'px';
            _this.div.style.left = _this.posX + 'px';
        }, false)
    }


    this.afficherpersonnage = () => {
        this.div = document.createElement('div');
        addClasses(['zelda', 'down_second'], this.div);
        this.div.setAttribute('data-name', this.name);
        this.div.style.top = this.posY + 'px';
        this.div.style.left = this.posX + 'px';
        document.querySelector('body').appendChild(this.div);
    }
    this.afficherbadguy = () => {
      this.div = document.createElement('div');
      addClasses(['badguy', 'down_second'], this.div);
      this.div.setAttribute('data-name', this.name);
      this.div.style.top = this.posYbadguy + 'px';
      this.div.style.left = this.posXbadguy + 'px';
      document.querySelector('body').appendChild(this.div);
    }


    this.poserBombe = () => {
        let _this = this;
        window.addEventListener('keypress', function(e) {
            if (e.keyCode === 98) {
                _this.bombs.quantity++;
                _this.bombs.list[_this.bombs.quantity] = new bomb(_this.posX, _this.posY);
                _this.bombs.list[_this.bombs.quantity].poser();
            }
        }, false);
    }


    this.tirerFleche = () => {
        let _this = this;
        window.addEventListener('keypress', function(e) {
            if (e.keyCode === 102) {
                _this.arrows.quantity++;
                _this.arrows.list[_this.arrows.quantity] = new arrow(_this.posX, _this.posY, _this.direction);
                _this.arrows.list[_this.arrows.quantity].spawn();
            }
        }, false);
    }
}

let bomb = function(x, y) {
    this.div;
    this.poser = () => {
        this.div = document.createElement('div');
        this.div.setAttribute('class', 'bomb');
        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';
        document.querySelector('body').appendChild(this.div);
        setTimeout(() => {
            this.div.removeAttribute('class');
            this.div.setAttribute('class', 'explosion');
            setTimeout(() => {
                this.div.remove();
            }, 500)
        }, 1000);
    }
}

let arrow = function(x, y, direction) {
    this.div;
    this.spawn = () => {
        console.log(direction);
        this.div = document.createElement('div');
        addClasses(['arrow'], this.div);
        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';
        document.querySelector('body').appendChild(this.div);
        if (direction === 'left') {
            this.div.style.transform = 'rotate(180deg)';
            this.interval = setInterval(() => {
                x = x - 500;
                this.div.style.left = x + 'px';
            }, 25);
            setTimeout(() => {
                clearInterval(this.interval);
                this.div.remove();
            }, 750);
        }
        if (direction === 'up') {
            this.div.style.transform = 'rotate(270deg)';
            this.interval = setInterval(() => {
                y = y - 500;
                this.div.style.top = y + 'px';
            }, 25);
            setTimeout(() => {
                clearInterval(this.interval);
                this.div.remove();
            }, 750);
        }
        if (direction === 'right') {
            this.interval = setInterval(() => {
                x = x + 500;
                this.div.style.left = x + 'px';
            }, 25);
            setTimeout(() => {
                clearInterval(this.interval);
                this.div.remove();
            }, 750);
        }
        if (direction === 'down') {
            this.div.style.transform = 'rotate(90deg)';
            this.interval = setInterval(() => {
                y = y + 500;
                this.div.style.top = y + 'px';
            }, 25);
            setTimeout(() => {
                clearInterval(this.interval);
                this.div.remove();
            }, 750);
        }
    }
    this
}

let personnage1 = new link('Link', 700, 350);

personnage1.cross = [122, 100, 113, 115];
personnage1.bougerPersonnage();
personnage1.afficherpersonnage();
personnage1.poserBombe();
personnage1.tirerFleche();

function addClasses(array, element) {
    for (i in array) {
        element.classList.add(array[i]);
    }
}

let badguy = new link('Link', 700, 350);


badguy.cross = [100, 100, 100, 100];
badguy.afficherbadguy();

badguy.bougerBadGuy();


function addClasses(array, element) {
    for (i in array) {
        element.classList.add(array[i]);
    }
}

function movements(element, direction) {
    element.removeAttribute('class');
    addClasses(['zelda', direction + '_first'], element);
    animation(element, direction, '_second');
    animation(element, direction, '_third');
}

function animation(element, direction, classe) {
    setTimeout(() => {
        element.removeAttribute('class');
        addClasses(['zelda', direction + classe], element);
    }, 250);
}
