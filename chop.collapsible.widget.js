;(function($){
    window.Chopchop = window.Chopchop || {};
    window.Chopchop.Collapsible = {};

    var Static = window.Chopchop.Collapsible;
    Static.WIDGET_ID = "chopchop.collapsible";
    Static.INSTANCE_NAME = "chopchop-collapsible";
    Static.MODE_COLLAPSE_ALL = "all";
    Static.MODE_ONE_REMAIN = "one-remain";


    Static.init = function(){
        $('.js-cc-collapsible').collapsible();
    }

    $(document).on('ready.' + Static.WIDGET_ID, function(){
        Static.init();
    });

    $.widget(Static.WIDGET_ID, $.chopchop.base, {
        options: {
            dataPrepend: 'ccCollapsible',

            dataMode: 'mode',
            dataHeaderSelector: 'headerSelector',
            dataBodySelector: 'bodySelector',


            headerSelector: '[class*="__header"]',
            bodySelector: '[class*="__body"]',
            mode: Static.MODE_COLLAPSE_ALL
        },

        $headers: null,
        $bodies: null,

        _create: function(){
            this._super();
            this._setup();
        },

        _getToggleInstance: function($el, options){
            if(!$el.data(Static.INSTANCE_NAME)){
                $el.toggle(options);
            }

            return $el.data(Static.INSTANCE_NAME);
        },

        _setup: function(){
            var $header,
                $body,
                $toggle,
                mode = this._getLocalOption(this.options.dataMode);

            this.$headers = $(this.options.headerSelector, this.element);
            this.$bodies = $(this.options.bodySelector, this.element);


            if(this.$headers.size() !== this.$bodies.size()){
                throw "Collapsible Headers do not match bodies";
            }

            var headerValues = {
                action: Static.MODE_COLLAPSE_ALL ? window.Chopchop.Toggle.ACTION_TOGGLE : window.Chopchop.Toggle.ACTION_ACTIVATE
            };

            for(var i = 0; i < this.$headers.size(); i++){
                $header = $(this.$headers.get(i));
                $toggle = this._getToggleInstance($header, headerValues);
            }


        }
    });
}(jQuery));