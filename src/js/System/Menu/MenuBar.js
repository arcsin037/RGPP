(function(global) {
    /* global RGPP */
    "use strict";
        var objName = "MenuBar";

    var constructor = function(spec) {
        var that = {};
        var scriptUtil = RGPP.System.ScriptUtil.getInstance();
        var mBoxDiv = null;

        that.setClickFunction = setClickFunction;
        that.div = div;

        function initialize() {
            var menulistString = spec.menulistString;
            var subsubMenuTitle = spec.subsubMenuTitle;
            var subsubMenuList = spec.subsubMenuList;
            var subsubClassList = spec.subsubClassList;

            var cssStyle = RGPP.System.CssStyle.getInstance();
            mBoxDiv = document.createElement("div");
            $(mBoxDiv).addClass("box");
            // Parent menu ul
            var menuListUl = document.createElement("ul");
            menuListUl.setAttribute("id", "ldd_menu");
            $(menuListUl).addClass("ldd_menu");
            cssStyle.setBreaking(menuListUl);

            // menu list
            var menuListLi = [];
            for (var i = 0; i < menulistString.length; ++i) {
                menuListLi[i] = document.createElement("li");
                var spanElement = document.createElement("span");
                spanElement.innerHTML = menulistString[i];
                $(menuListLi[i]).append(spanElement);
                $(menuListUl).append(menuListLi[i]);
            }
            // sub menu div
            var subMenuDiv = [];

            for (var menuNo = 0; menuNo < menulistString.length; ++menuNo) {
                subMenuDiv[menuNo] = $("<div>");
                $(subMenuDiv[menuNo]).addClass("ldd_submenu");
                for (var subsubMenuTitleNo = 0; subsubMenuTitleNo < subsubMenuTitle[menuNo].length; ++subsubMenuTitleNo) {
                    var ul = document.createElement("ul");
                    var liTitle = document.createElement("li");
                    liTitle.innerHTML = subsubMenuTitle[menuNo][subsubMenuTitleNo];
                    $(liTitle).addClass("ldd_heading");
                    $(ul).append(liTitle);
                    for (var subsubMenuElementNo = 0; subsubMenuElementNo < subsubClassList[menuNo][subsubMenuTitleNo].length; ++subsubMenuElementNo) {
                        var liElement = document.createElement("li");
                        var anchor = document.createElement("a");
                        $(anchor).attr("href", "#");
                        $(anchor).attr("class", subsubClassList[menuNo][subsubMenuTitleNo][subsubMenuElementNo]);
                        $(anchor).append(subsubMenuList[menuNo][subsubMenuTitleNo][subsubMenuElementNo]);
                        $(liElement).append(anchor);
                        $(ul).append(liElement);
                    }
                    $(subMenuDiv[menuNo]).append(ul);
                }
                $(menuListLi[menuNo]).append(subMenuDiv[menuNo]);
            }

            $(mBoxDiv).append(menuListUl);
        }

        function setClickFunction() {
            scriptUtil.outputMsgToConsole("Menu setClickFunction...");
            // the menu
            var $menu = $('#ldd_menu');

            /*
             * for each list element,
             * we show the submenu when hovering and
             * expand the span element (title) to 510px
             */
            $menu.children('li').each(function() {
                var $this = $(this);
                var $span = $this.children('span');
                $span.data('width', $span.outerWidth(true));
                $span.data('height', $span.outerHeight(true));
                var submenu = $this.find('.ldd_submenu');
                $(submenu).css("top", $span.data('height'));
                $(mBoxDiv).css("height", $span.data('height'));

                scriptUtil.outputMsgToConsole("$span.data('height') = " + $span.data('height'));

                $this.bind('mouseenter', function() {
                    $menu.find('.ldd_submenu').stop(true, true).hide();
                    $span.stop().animate({
                        'width': '510px'
                    }, 300, function() {
                        $this.find('.ldd_submenu').slideDown(300);
                    });
                }).bind('mouseleave', function() {
                    $this.find('.ldd_submenu').stop(true, true).hide();
                    $span.stop().animate({
                        'width': $span.data('width') + 'px'
                    }, 300);
                });
            });
        }

        function div() {
            return mBoxDiv;
        }

        initialize();
        return that;
    };
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);