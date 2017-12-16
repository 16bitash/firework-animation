let fireworks=[];
let gravity;
function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    colorMode(HSB);
    gravity = createVector(0, 0.2);
    stroke(255);
    strokeWeight(4);

}
function draw() {
    colorMode(RGB);
    background(0,0,0,25);
    if(random(1)<0.03)
        fireworks.push(new Firework());

    for(let i=fireworks.length-1;i>=0;i--)
    {
        fireworks[i].update();
        fireworks[i].show();
        if(fireworks[i].done())
        {
            fireworks.splice(i,1);
        }
    }

}
function Particle(x,y,hu,firework) {
    this.hu=hu;
    this.pos=createVector(x,y);
    this.firework=firework;
    this.lifespan=255;
    if(this.firework)
        this.vel=createVector(0,random(-12,-5));
    else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2,10));
    }
    this.acc=createVector(0,0);
    this.applyforce=function (force) {
        this.acc.add(force);
    }
    this.update=function () {
        if(!this.firework)
        {
            this.vel.mult(.9)
            this.lifespan-=4;
        }
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
    this.done=function () {
        if(this.lifespan<0)
        {
            return true;
        }
        else
            return false;
    }
    this.show=function () {
        colorMode(HSB);
        if(!this.firework)
        {   strokeWeight(2);
            stroke(hu,255,255,this.lifespan);
        }else
        {
            strokeWeight(4);
            stroke(hu,255,255);
        }

        point(this.pos.x,this.pos.y);
    }
}
function Firework() {
    this.hu=random(225);
    this.firework=new Particle(random(width),height,this.hu,true);
    this.exploded=false;
    this.particles=[];
    this.done = function() {
        if (this.exploded && this.particles.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    this.update=function () {
        if(!this.exploded) {
            this.firework.applyforce(gravity);
            this.firework.update();
            if(this.firework.vel.y>=0)
            {
                this.exploded=true;
                this.explode();
            }
        }
        for(let i=this.particles.length-1;i>=0;i--)
        {   this.particles[i].applyforce(gravity);
            this.particles[i].update();
            if(this.particles[i].done())
            {
                this.particles.splice(i,1);
            }
        }
    }

    this.explode=function () {
        for(let i=0;i<100;i++)
        {
            let p=new Particle(this.firework.pos.x,this.firework.pos.y,this.hu,false);
            this.particles.push(p);
        }
    }
    this.show=function () {
        if(!this.exploded) {
            this.firework.show();
        }
        for(let i=0;i<this.particles.length;i++)
        {
            this.particles[i].show();
        }
    }
}