class Golden{
    constructor(x,y,width,height){
        var options={
            friction:0,
            density:0.001
        }
        this.body=Bodies.rectangle(x,y,width,height,options);
        this.width=width;
        this.height=height;
        this.image=loadImage("golden.png");
        World.add(world,this.body);

    }

    display(){
        push();
        translate(this.body.position.x,this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image,0,0,this.width,this.height);
        pop();


    }

    moveRight(){
        Matter.Body.setVelocity(this.body,{x:6.8,y:0});
    }

    moveLeft(){
        Matter.Body.setVelocity(this.body,{x:-6.8,y:0});
    }

    moveUp(){
        Matter.Body.setVelocity(this.body,{x:0,y:-6.8});
    }
}