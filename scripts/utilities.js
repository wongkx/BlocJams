var points = document.getElementsByClassName('point');

var animatePoints = function(pointsArray, callback){
    for (var i = 0; i < points.length; i++){
        callback(pointsArray[i]);
    }
}

function forEach(point){
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
};


window.onload = function(){
    if (window.innerHeight > 950) {
        animatePoints(points, forEach);
    }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight +200;
    window.addEventListener('scroll',function(event){
        console.log("Window innerheight: "+window.innerHeight);
        console.log("Current offset from the top is: "+sellingPoints.getBoundingClientRect().top+ " pixels");
        console.log("scrollDistance = "+ (sellingPoints.getBoundingClientRect().top - window.innerHeight +200) );
        console.log("scrollTop: "+ document.documentElement.scrollTop);
        if (document.documentElement.scrollTop || document.body.scrollTop > scrollDistance) {
            animatePoints(points, forEach);
        }
    });
}