$.fn.extend({
    animateCss: function(args, keep, onComplete) {
        animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + args).one(animationEnd, function() {
            if(keep == null || keep == undefined || keep == false) {
                $(this).removeClass('animated ' + args);
            }
            if(onComplete) {
                onComplete();
            }
        })
    },
    removeAnimation: function(animations) {
        $(this).removeClass("animated " + animations);
    }
})
    
function animate(elem, type) {
    $(elem).animateCss(type);
}

function inputErr() {
    TweenLite.to("#inputWrap", .2, {borderColor: "red", ease: Power4.easeIn, onComplete: function() {
        TweenLite.to("#inputWrap", .4, {borderColor: "white", ease: Power3.easeOut})
    }});
}

$(document).ready(function() {
    $("#home").animateCss('fadeInUp delay1p');
});