/*!
 * jQuery Loader Plugin
 * https://github.com/SupplyFrame/jquery.loader
 *
 * Copyright 2014, Branko Sekulic
 * Released under the MIT license
 */
(function($) {

    var interval = null,
        width = 0,
        $holder = $('<div class="jquery-loader-holder"></div>'),
        $progress = $('<div class="jquery-loader-progress"></div>'); 

    function setProgress(width){
        $progress.css('width', width + '%');        
    }

    $.loader = {

        start: function(){

            this.stop();
            this.reset();

            $holder.fadeIn();

            interval = setInterval(function(){

                var step = Math.min(1, (100 - width) / 50);

                width += step;
                setProgress(width);

                if(width >= 100){
                    this.stop();
                }
            }.bind(this), 50);
        },
        stop: function(){
            if(interval !== null){
                clearInterval(interval);
            }
            interval = null;
            $holder.fadeOut();
        },
        end: function(){

            this.stop();

            interval = setInterval(function(){

                width += 1;
                setProgress(width);

                if(width >= 100){
                    this.stop();
                }
            }.bind(this), 5);
        },
        reset: function(){
            width = 0;
            setProgress(width);
        },
        settings: function(options){

            options = options || {};

            if(options.holder){
                $holder.css(options.holder);
            }
            if(options.progress){
                $progress.css(options.progress);
            }
        }
    };

    $.loader.settings({
        holder: {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '4px',
            'z-index': '1080',
            'display': 'none',
            'background': '#ffffff'
        },
        progress: {
            'width': '0%',
            'height': '3px',
            'background': '#C30D0D'
        }
    });

    $progress.appendTo($holder);
    $holder.appendTo('body');

})(jQuery);