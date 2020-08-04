function hasCollided(lbullet,lwall){
    bulletRightEdge = lbullet.x + lbullet.width;
    wallLeftEdge = lwall.x
    if (bulletRightEdge >= wallLeftEdge) {
          return true;
      }
      else{
          return false;
      }
    }

/*function hasCollided(object1,object2){
    if (object1.x - object2.x < object2.width/2 + object1.width/2
        && object2.x - object1.x < object2.width/2 + object1.width/2 
        && object1.y - object2.y < object2.height/2 + object1.height/2
        && object2.y - object1.y < object2.height/2 + object1.height/2) {
            object1.veloctityX = 0;
            object2.veloctityX = 0;
            return true;
    }
    else{
        return false;
    }
}*/
