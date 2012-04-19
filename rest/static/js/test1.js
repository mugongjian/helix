
     KISSY.ready(function(S) {
         var DOM = S.DOM, Event = S.Event, timers = [];

         S.NodeList.prototype.icanfly = function() {
             var targetX = 500, targetY = 100,
                 maxX = 650, maxY = 250;

             S.each(this, function(item, i) {
                 var x = 0, y = 0, speed = Math.random() * 80;
                 timers[i] = S.later(function() {
                     x += Math.random() * speed * (x > maxX ? -1 : 1);
                     y += Math.random() * speed * (y > maxY ? -1 : 1);
                     DOM.css(item, { left: x, top: y });
                     if(x > targetX && y > targetY && x < maxX && y < maxY) {
                         timers[i].cancel();
                     }
                 }, 10, true);
             });
         };

         S.one('#go').on('click', function() {
             S.each(timers, function(timer) { timer.cancel() });
             S.all('.good-student').appendTo('#taobao').icanfly();
         });
     })