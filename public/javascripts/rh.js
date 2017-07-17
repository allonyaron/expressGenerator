

'use strict'
var JUNE2;
var nydnRequires = require.config({
    context: "nydn",
    baseUrl: "/nydn/js",
    waitSeconds: 10
});
console.log("nydn 🎯  downloading rh.js");
var 	rh= rh || {},
    nydn = nydn || {};
if (!!rh.downloaded)  throw new Error("nydn 🎯   downloading rh.js stopped because of NDN duplicating it");
rh.downloaded = true;
console.log("nydn 🎯  downloading rest of rh.js");
nydn.urls={};
nydn.gameChangers={};
nydn.domain = (window.location.href.split("/")[2] == "wwwqa.nydailynews.com") ? "wwwqa.nydailynews.com" :  "assets.nydailynews.com";
nydn.domain = (window.location.href.indexOf("mockups") > -1) ? "js/" : "http://"+nydn.domain+"/nydn/js/";
nydn.urls={
    rhp:						nydn.domain+"rhp.js?r="+nydn.revision,
    ra: 						nydn.domain+"ra.js?r="+nydn.revision,
    autos: 					nydn.domain+"r-autos.js?r="+nydn.revision,
    horoscopes: 		nydn.domain+"r-horoscopes.js?r="+nydn.revision,
    rss: 						nydn.domain+"rss.js?r="+nydn.revision,
    author: 				nydn.domain+"r-author.js?r="+nydn.revision,
    tag: 						nydn.domain+"r-tag.js?r="+nydn.revision,
    search: 				nydn.domain+"r-search.js?r="+nydn.revision,
    photos: 				nydn.domain+"r-photos.js?r="+nydn.revision,
    nydnQuery:			nydn.domain+"jquery-2-1-4.js?r="+nydn.revision,
    nydnQueryUI: 		nydn.domain+"jquery-ui.js?r="+nydn.revision,
    nydnQueryMW: 	nydn.domain+"jquery.mousewheel.js?r="+nydn.revision,
    searchResults: 	"http://www.nydailynews.com/search-results/search-results-7.113?q=",
    sonobi:					"http://mtrx.go.sonobi.com/morpheus.nydailynews.6654.js",
    openx: 					"http://ox-d.nydailynews.servedbyopenx.com/w/1.0/jstag?nc=4692832-NYDN",
    openxLite: 			nydn.domain+"openx-lite.js?r="+nydn.revision,
    indexExchange:	"http://js-sec.indexww.com/ht/nydn.js",
    nativo:					"http://s.ntv.io/serve/load.js",
    yieldbot: 				"http://cdn.yldbt.com/js/yieldbot.intent.js",
    optimera: 			""
};
rh.addons = function(){
    console.log("nydn 🎯  rh.addons");
    rh.lotame.global.download();
    if (nydn.section=="autos") 	{
        rh.lotame.autos.download();
        rh.download(nydn.urls.autos);
    }
    switch (nydn.template){
        case "article":
        case "ymm":			rh.download(nydn.urls.ra);
            break;
        case "homepage":
        case "index":			rh.download(nydn.urls.rhp);
            break;
        case "ss-hub":
        case "ss-category":	rh.download(nydn.urls.rss);
            break;
        case "author":			rh.download(nydn.urls.author);
            break;
        case "search":			rh.download(nydn.urls.search);
        case "tag":				rh.download(nydn.urls.tag);
            break;
        case "photos":			rh.download(nydn.urls.photos);
            break;
        default:						rh.initializeAfterAds();
    }
    if (nydn.section=="horoscopes") rh.download(nydn.urls.horoscopes);
};
rh.download = function(fileName){
    nydnRequires([fileName], function(util) {
        console.log(fileName+" download ✓");
    });
};
rh.initializedAfterAds = false;
rh.initializeAfterAds = function() {
    if (!rh.initializedAfterAds) {
        nydnRequires([nydn.urls.nydnQuery], function(util) {
            console.log("nydn 🎯  rh.initializeAfterAds");
            rh.initializedAfterAds = true;
            rh.newsroom.initialize();
            rh.gtm.download();
            rh.parsley.download();
            rh.dtm.download();
            rh.nielsen.download();
            rh.quantcast.download();
        });
    }
};
rh.todo = {};
rh.bp = {desktop : 990, tablet : 728, mobile : 320, initialized : false};
//BREAKPOINT
rh.bp.initialize = function() {
    console.log("nydn 🎯  rh.bp.initialize");
    rh.bp.size = window.innerWidth;
    if (rh.bp.size < rh.bp.tablet) rh.platform = "mobile";
    else if (rh.bp.size < rh.bp.desktop) rh.platform = "tablet";
    else rh.platform = "desktop";
    nydn.platform = rh.platform;
}
//GLOBAL VARS & PROTOTYPES
{
//LOTMAE VARS
    var cc_client_id = 4867;
    var cc_extr_callback = "ccauds";
//
    Array.prototype.contains = function(needle) {
        for (var i in this) 	if (this[i] == needle) return true;
        return false;
    };
    Array.prototype.replace = function(needle, needleReplacement) {
        var needlePosition = nydn.bidder.indexOf(needle);
        if(needlePosition > -1){
            this[needlePosition] = needleReplacement;
            return true;
        }
        else return false;
    };
    Array.prototype.remove = function(needle) {
        var needlePosition = nydn.bidder.indexOf(needle);
        if(needlePosition > -1){
            this.splice(needlePosition, 1);
            return true;
        }
        else return false;
    };
    Array.prototype.getThisObject = function(name, nameKey){
        for (var i=0; i < this.length; i++) {
            if (this[i][name] === nameKey) return this[i];
        }
        return false;
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    };
    var isTouchDevice = function() {
        return 'ontouchstart' in window;
    };
    var getQueryVariable = function(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;	i<vars.length	;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    };
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {return typeof fn === 'function' || toStr.call(fn) === '[object Function]';};
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) { return 0; }
                if (number === 0 || !isFinite(number)) { return number; }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };
            return function from(arrayLike/*, mapFn, thisArg */) {
                var C = this;
                var items = Object(arrayLike);
                if (arrayLike == null) throw new TypeError('Array.from requires an array-like object - not null or undefined');
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    if (!isCallable(mapFn)) 	throw new TypeError('Array.from: when provided, the second argument must be a function');
                    if (arguments.length > 2) T = arguments[2];
                }
                var len = toLength(items.length);
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                var k = 0;
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    else A[k] = kValue;
                    k += 1;
                }
                A.length = len;
                return A;
            };
        }());
    }
}
//PAGEFAIR
{
    rh.pagefair = {};
    rh.pagefair.observer = "http://wwwqa.nydailynews.com/nydn/js/pagefair-observer-1.js";
    rh.pagefair.wrapper = "http://wwwqa.nydailynews.com/nydn/js/pagefair-wrapper-2.js";
    rh.pagefair.loader = "http://wwwqa.nydailynews.com/nydn/js/pagefair-loader-3.js";
    rh.pagefair.measure = {};
    rh.pagefair.measure.url = "http://asset.pagefair.com/measure.min.js";
    rh.pagefair.measure.download = function(){
        console.log("nydn 🎯  rh.pagefair.measure.download");
        window.bm_website_code = "DEC9A44118F342DA";
        nydnRequires([nydn.urls.nydnQuery], function(util) {
            nydnRequires([rh.pagefair.measure.url], function(util) {
                console.log("nydn 🎯  rh.measure.download  ✓");
            });
        });
    };
    rh.pagefair.download1 = function(){
        nydnRequires([rh.pagefair.observer], function(util) {
            console.log("nydn 🎯  rh.pagefair.download1");
            rh.pagefair.download2();
        });
    };
    rh.pagefair.download2 = function(){
        nydnRequires([rh.pagefair.observer], function(util) {
            nydnRequires([rh.pagefair.wrapper], function(util) {
                console.log("nydn 🎯  rh.pagefair.download2");
                rh.pagefair.download3();
            });
        });
    };
    rh.pagefair.download3 = function(){
        nydnRequires([rh.pagefair.loader], function(util) {
            console.log("nydn 🎯  rh.pagefair.download3");
        });
    };
}
// SCRIPT
{
    rh.script = {};
    rh.script.download = function(scriptURL, scriptObj){
        (function(){
            var rhScript={};
            rhScript.downloaded = false;
            rhScript=document.createElement("script");
            rhScript.type="text/javascript";
            rhScript.src= scriptURL;
            if(scriptObj != undefined){
                rhScript.async =  (scriptObj.scriptAsync != null) ? scriptObj.scriptAsync : true;	//custom async defaults to true
                if (scriptObj.scriptID != null) rhScript.id = scriptObj.scriptID;									//custom script id
                if(scriptObj.scriptData != null){																					//custom script data attributes
                    if(scriptObj.scriptData != ""){
                        for (var oneDate in scriptObj.scriptData){
                            if (typeof scriptObj.scriptData[oneDate] == "string"){
                                rhScript.setAttribute("data-"+oneDate, scriptObj.scriptData[oneDate]);
                                console.log("nydn 🎯  rh.script.download data",oneDate, scriptObj.scriptData[oneDate]);
                            }
                        }
                        if (scriptObj.scriptData.scriptNode != null) {												//custom script parent node
                            rhScript.scriptNode = scriptObj.scriptData.scriptNode;
                            rhScript.downloaded = true;
                            console.log("nydn 🎯  rh.script.download "+scriptURL+" ✓ ");
                            rhScript.scriptNode.insertBefore(rhScript,rhScript.scriptNode.childNodes[0]);
                        }
                    }
                }
                if (scriptObj.scriptCallback !== null) {																		//custom callback
                    rhScript.onload = scriptObj.scriptCallback;
                }
            }
            if (!rhScript.downloaded){																							//if not appended to a custom parent node
                var node=document.getElementsByTagName("script")[0];									//prepend before first script node
                node.parentNode.insertBefore(rhScript,node);
            }
        })();
        console.log("nydn 🎯  rh.script.download "+scriptURL+" ✓ ");
    };
}
//CLICK
{
    rh.click = function(){
        $("#rh").on("click",function(e){
            if( e.target.id != "" )	rh.target = e.target.id;
            else if ($(e.target).attr("class") != ""  && $(e.target).attr("class") != undefined){
                var cList = $(e.target).attr("class").split(/\s+/);
                rh.target = cList[0];
            }
            console.log(rh.target);
            if (rh.target != "" && typeof rh.target !== "undefined") {
                switch (rh.target) {
                    case  "rh-ss":
                    case  "rhi-search":
                    case "ri-menu":
                    case "rh-search":
                    case  "rh-sections":
                        e.preventDefault();
                        rh.left.toggle();
                        rh.left.highlightSection();
                        break;
                    case "ri-plus":
                    case  "rh-accordion":
                        e.preventDefault();
                        rh.accordion(e);
                        break;
                    case "rho-sections-close":
                    case "rho-sections-bg":
                        rh.left.toggle();
                        rh.left.highlightSection();
                        break;
                    case "rh-center":
                    case "rh-logo":
                    case "rh-front":
                        if (rh.platform === "mobile")  {
                            e.preventDefault();
                            rh.left.toggle();
                            rh.left.highlightSection();
                        }
                        break;
                    case "ri-close":
                    case "rh-follow-btn":
                        rh.follow.toggle();
                        break;
                    case "rh-sports-toggle":
                        rh.sports.toggle(e);
                        break;
                    case "rho-subscribe-bg":
                    case "rh-subscribe":
                    case "rh-subscribe-text":
                    case "ri-more":
                    case "rho-subscribe-close":
                        rh.right.toggle();
                        rh.right.removeOnScroll();
                        break;
                }
            }
            rh.target = "";
        });
        $("#rg").on("touchstart",function(e){
            rh.target =  e.target.id != "" ? e.target.id : e.target.classList[0];
            if (rh.target != "" && rh.target !== undefined) {
                switch (rh.target) {
                    case "rgs-next":
                        break;
                    case "rgs-previous":
                        break;
                }
            }
            rh.target = "";
        });
        rh.follow.outsideClose();
        rh.sports.outsideClose();
    };
}
//SEARCH
{
    rh.search = {};
    rh.search.doSearch = function(){
        nydnRequires([nydn.urls.nydnQuery], function(util) {
            $(".rho-search-form").submit(function(event) {
                event.preventDefault();
                var searchTerm = $("#rho-search input[type=text]").val();
                if( !searchTerm == "null" || !searchTerm == "undefined" || !searchTerm == "" ){
                    document.searchForm.action = nydn.urls.searchResults+searchTerm;
                    document.searchForm.submit();
                }else{
                    return;
                }
            });
        });
    }
}
//LEFT
{
    rh.left = {};
    rh.left.toggle = function(e){
        //GET PLATFORM
        rh.bp.initialize();
        $(".rho-scroll-wrapper").css('height','auto');
        if($('#rh-follow.on').length)	$('#rh-follow-btn').trigger('click');
        if($('#rh-sports.on').length)	$('.rh-sports-toggle').eq(0).trigger('click');
        if (!$("body").hasClass("section-overlaid")){
            var resizeTimeout;
            var windowWidth = $(window).width();
            $(window).resize(function(){
                if(!!resizeTimeout){ clearTimeout(resizeTimeout); }
                resizeTimeout = setTimeout(function(){
                    if ($(window).width() != windowWidth){
                        rh.bp.initialize();
                        if(rh.platform==='tablet'){
                            $("#rh-left .rho-sections-bg").fadeIn(200, function(){
                                $("#rh-left").addClass("on");
                                $('.rho-scroll-wrapper').css('height', $(window).height() - ( $('#rh .rh-ad').height() + 48) ); //48 is the offset position for this element on tablet
                            });
                        }else if(rh.platform==='mobile'){
                            $("#rh-left .rho-sections-bg").fadeIn(200, function(){
                                $("#rh-left").addClass("on");
                                if($('body[data-section=autos]').length){
                                    $('.rho-scroll-wrapper').css('height', $(window).height() -  40); //the autos page does not have a sticky ad on the bottom. no need to offset
                                }else{
                                    $('.rho-scroll-wrapper').css('height', $(window).height() - ( $('#rh .rh-ad').height() + 40) ); //40 is the offset position for this element on mobile
                                }
                            });
                        }else{
                            $(".rho-scroll-wrapper").css('height','auto');
                        }
                    }
                },0);
            });
            $("body").addClass("section-overlaid");
            if(rh.platform==='tablet'){
                $("#rh-left .rho-sections-bg").fadeIn(200, function(){
                    $("#rh-left").addClass("on");
                    $('.rho-scroll-wrapper').css('height', $(window).height() - ( $('#rh .rh-ad').height() + 48) ); //48 is the offset position for this element on tablet
                });
            }else if(rh.platform==='mobile'){
                $("#rh-left .rho-sections-bg").fadeIn(200, function(){
                    $("#rh-left").addClass("on");
                    if($('body[data-section=autos]').length){
                        $('.rho-scroll-wrapper').css('height', $(window).height() -  40); //the autos page does not have a sticky ad on the bottom. no need to offset
                    }else{
                        $('.rho-scroll-wrapper').css('height', $(window).height() - ( $('#rh .rh-ad').height() + 40) ); //40 is the offset position for this element on mobile
                    }
                });
            }else{
                $("#rh-left .rho-sections-bg").fadeIn();
                $("#rh-left").addClass("on");
            }
        }
        else {
            $(window).off("resize");
            if(rh.platform==='tablet'|| rh.platform==='mobile'){
                $("#rh-left").removeClass("on");
                setTimeout(function(){
                    $("body.section-overlaid").removeClass("section-overlaid");
                    $("#rh-left .rho-sections-bg").fadeOut(0);
                },400);
            }else{
                $("body.section-overlaid").removeClass("section-overlaid");
                $("#rh-left .rho-sections-bg").fadeOut();
                $("#rh-left").removeClass("on");
            }
        }
    };
    rh.left.highlightSection = function(){
        var data = $('[data-section]').data();
        if(data.bp === 'desktop')return;
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        function filterSection(section){
            return $('.rh-section').filter(function(ind,val){
                return $(val).hasClass(capitalize(section).split(' ')[0])
            }).addClass('on');
        }
        function filterSubSection(section){
            return $('.rh-section dd a').filter(function(ind,val){
                var href = $(val).attr('href');
                var hrefArray = getSubSection(href);
                var lastItem = getSubSection(href)[getSubSection(href).length - 1] ;
                if (getSubSection(href)[getSubSection(href).length - 1].toLowerCase().replace(' ','-') === data.subsection.toLowerCase().replace(' ','-')){
                    //get the last pathname of href, make it lowercase, replace any space with dash and then compare. values are data-section and pathname values are inconsistent
                    // console.group()
                    // 	console.log(href)
                    // 	console.log(hrefArray)
                    // 	console.log(lastItem)
                    // console.groupEnd()
                    return $(val);
                }
            }).addClass('on');
        }
        function getSubSection(string){
            return string.split('/');
        }
        data.section ? filterSection(data.section) : '';
        data.subsection ? filterSubSection(data.subsection) : '';
    };
    rh.left.accordion = function(e){
        if(rh.platform != "desktop"){
            var thisTarget = e.target;
            $(".rh-section").not( $(thisTarget).parents(".rh-section") ).removeClass("open");
            $(".rh-section dd").not($(thisTarget).parents(".rh-section").find("dd")).slideUp();
            $(thisTarget).parents(".rh-section").toggleClass("open");
            $(thisTarget).parents(".rh-section").find("dd").slideToggle();
        }
    };
    rh.left.toSections = function(){
        $("#rh-ss").detach().prependTo($("#rh-subnav-wrap"));
    };
    rh.left.toMasthead = function(){
        $("#rh-ss").detach().prependTo($("#rh-masthead"));
    };
}
//FOLLOW
{
    rh.follow = {};
    rh.follow.toggle = function(){
        if (!$("#rh-follow").hasClass("on"))	$("#rh-follow").addClass("on");
        else	$("#rh-follow.on").removeClass("on");
    };
    rh.follow.outsideClose = function(){
        $(document).on('click',function(event){
            if(!$(event.target).closest('#rh-follow-btn').length && !$(event.target).is('#rh-follow-btn')) {
                if($('#rh-follow.on').length) {
                    rh.follow.toggle()
                }
            }
        })
    };
}
//RIGHT
{
    rh.right = {};
    rh.right.toggle = function(){
        //GET PLATFORM
        rh.bp.initialize();
        if($('#rh-follow.on').length)	$('#rh-follow-btn').trigger('click');
        if (!$("body").hasClass("subscribe-overlaid")){
            var resizeTimeout;
            var windowWidth = $(window).width();
            $(window).resize(function(){
                if(!!resizeTimeout){ clearTimeout(resizeTimeout); }
                resizeTimeout = setTimeout(function(){
                    if ($(window).width() != windowWidth){
                        var startPlatform = rh.platform;
                        rh.bp.initialize();
                        var endPlatform = rh.platform;
                        //DETECT CHANGE IN BREAKPOINT
                        var changeBP = false;
                        if( (startPlatform==='mobile'||startPlatform==='tablet') && (endPlatform==='mobile'||endPlatform==='tablet') )	changeBP = false;
                        else if ( startPlatform==='desktop' && endPlatform==='desktop' )	changeBP = false;
                        else	changeBP = true;
                        //RUN ANIMATION IF RESIZING BETWEEN BREAKPOINTS
                        if(changeBP){
                            //CURRENT - STAY OPEN FUNCTIONALITY
                            rh.utility.subscribeTransition();
                            if(rh.platform==='mobile'||rh.platform==='tablet'){
                                $("#rh-right  #rh-ssm").hide();
                                $("#rh-right .rho-subscribe-bg").fadeIn(100,function(){
                                    // $("#rh-right  #rh-ssm").hide();
                                    $("#rho-subscribe").addClass("on");
                                    $("#rh-right").addClass("on");
                                    //rh.utility.afterAnimation($("#rho-subscribe"), nydnQuery.fn.show, $("#rh-right #rh-ssm") );
                                    $("#rh-right  #rh-ssm").fadeIn();
                                });
                            }else{
                                $("#rh-right .rho-subscribe-bg").fadeIn();
                                $("#rho-subscribe-desk").addClass("on");
                                $("#rh-right").addClass("on");
                            }
                        }
                    }
                },0);
            });

            $("body").addClass("subscribe-overlaid");
            if(rh.platform==='mobile'||rh.platform==='tablet'){
                $("#rh-right  #rh-ssm").hide();
                $("#rh-right .rho-subscribe-bg").fadeIn(100,function(){
                    $("#rho-subscribe").addClass("on");
                    $("#rh-right").addClass("on");
                    rh.utility.afterAnimation($("#rho-subscribe"), $.fn.show, $("#rh-right #rh-ssm") );
                    // $("#rh-right  #rh-ssm").fadeIn();
                });
            }else{
                $("#rh-right .rho-subscribe-bg").fadeIn();
                $("#rho-subscribe-desk").addClass("on");
                $("#rh-right").addClass("on");
            }
        }
        else {
            //OFF RESIZE
            if(rh.platform==='mobile'||rh.platform==='tablet'){
                $("#rh-right  #rh-ssm").hide(0);
                $("#rho-subscribe").removeClass("on");
                setTimeout(function(){
                    $("#rh-right").removeClass("on");
                    $("body.subscribe-overlaid").removeClass("subscribe-overlaid");
                    $("#rh-right .rho-subscribe-bg").fadeOut(200);
                    $("#rh-right  #rh-ssm").show(0);
                },200);
            }else{
                $("body.subscribe-overlaid").removeClass("subscribe-overlaid");
                $("#rho-subscribe-desk").removeClass("on");
                $("#rh-right .rho-subscribe-bg").fadeOut();
                $("#rh-right").removeClass("on");
            }
            $(window).off("resize");
        }
    };
    rh.right.removeOnScroll = function(){
        if(rh.platform==='mobile'||rh.platform==='tablet'){
            $(window).scroll(function() {
                if ($(window).scrollTop() >= $(window).height() && $('#rho-subscribe.on').length ){
                    rh.right.toggle();
                }
            });
        }
    };
}
//UTILITY
{
    rh.utility={};
    rh.utility.afterAnimation = function(nydnQueryElement, callback, elementToAnimate){
        nydnQueryElement.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function(e) {
                // console.dir(e);
                // console.log('Im all done!');
                callback.call(elementToAnimate);
            });
    };
    rh.utility.subscribeTransition = function(){
        if( !$('body')[0].classList.contains('subscribe-overlaid')){
            return;
        }
        if($('#rho-subscribe-desk.on').length && (  $('body.bp-tablet').length || $('body.bp-mobile').length  )){
            $('#rho-subscribe-desk').removeClass('on');
            $('#rh-right').removeClass('on');
            $('.rho-subscribe-bg').hide();
            rh.right.toggle();
            setTimeout(function(){
                rh.right.toggle();
            },200)
        }else if($('#rho-subscribe.on').length && (  $('body.bp-desktop').length )){
            $('#rho-subscribe').removeClass('on');
            $('#rh-right').removeClass('on');
            $('.rho-subscribe-bg').hide();
            rh.right.toggle();
            setTimeout(function(){
                rh.right.toggle();
            },200)
        }
    };
}
//SPORTS
{
    rh.sports={};
    rh.sports.toggle = function(e){
        $("#rh-sports").toggleClass("on");
    };
    rh.sports.outsideClose = function(){
        $(document).on('click',function(event){
            if(!$(event.target).closest('.rh-sports-toggle').length && !$(event.target).is('.rh-sports-toggle')) {
                if($('#rh-sports.on').length) {
                    rh.sports.toggle()
                }
            }
        })
    };
}
//NEXT
{
    rh.next={}
    rh.next.populate = function(){
        if( $("#ra-next").length ){
            var next = $("#ra-next");
            var headerNext = $(".ra-next");
            var nextText = next.find("span").html();
            var nextLink = next.find("a").attr("href");
            if( next.find("img").length ){
                var raImg = next.find("img").clone();
                headerNext.prepend(raImg);
            }
            headerNext.attr("href", nextLink);
            headerNext.find("p").html(nextText);
        }else{
            $(".ra-next").hide();
        }
    }
}
//STICKY
{
    rh.stickyNav={};
    rh.stickyNav.top = 0;
    rh.stickyNav.bottom = 400;
    rh.stickyNav.node={};
    rh.stickyNav.subNavHeight;
    rh.stickyNav.initialize = function() {
        console.log("nydn 🎯  rh.stickyNav.initialize");
        if ( $(".rh-ad").length && $('#rh-subnav').is(':visible') ) rh.stickyNav.top = $("#rh-masthead").position().top + $("#rh-masthead").outerHeight(true) + $(".rh-ad").outerHeight(true);
        else if ($('#rh-subnav').is(':visible')) rh.stickyNav.top = $("#rh-subnav").position().top + $("#rh-subnav").outerHeight(true);
        else rh.stickyNav.top = $("#rh-masthead").position().top + $("#rh-masthead").outerHeight(true);
        rh.stickyNav.subNavHeight = $('#rh-subnav').outerHeight(true);
        $(window).scroll(function() {
            if ($(window).scrollTop() >= rh.stickyNav.top) {
                $('#rh').css('marginTop', rh.stickyNav.subNavHeight);
                $("body").not(".sectionScrolled").addClass("sectionScrolled");
                if (!$('#rh-subnav').is(':visible')) {
                    return;
                }
                rh.left.toSections();
            } else {
                $("body.sectionScrolled").removeClass("sectionScrolled");
                if (!$('#rh-subnav').is(':visible')) {
                    return;
                }
                rh.left.toMasthead();
                $("#rh-subnav").show();
                $('#rh').css('marginTop', 0);
            }
            if (nydn.template == "homepage" && rh.platform == "mobile" && nydn.adWide3 == "x107"){
                if ($(window).scrollTop() >= rh.stickyNav.bottom) {
                    $("#rh .rh-ad").animate({bottom: 0}, 500);
                }
            }
        });
    };
    rh.stickyNav.resize = function(){
        console.log("nydn 🎯  rh.stickyNav.resize");
        var originalHeight = $('#rh .rh-ad').height();
        var count = 0;
        var intervalID = setInterval(function(){
            count++;
            if ( originalHeight < $('#rh .rh-ad').height() ){
                rh.stickyAd.addOffset();
                if ($('#rh-subnav').is(':visible')) {
                    rh.stickyNav.top = $("#rh-subnav").position().top + $("#rh-subnav").outerHeight(true);
                } else {
                    rh.stickyNav.top = $("#rh-masthead").position().top + $("#rh-masthead").outerHeight(true);
                }
                clearInterval(intervalID);
            }
            if(count > 20) clearInterval(intervalID);
        },600);
    };
    rh.stickyAd = {};
    rh.stickyAd.offset;
    rh.stickyAd.delay = 10000;
    rh.stickyAd.initialized = false;
    rh.stickyAd.initialize = function(){
        nydnRequires([nydn.urls.nydnQuery], function(util) {
            console.log("nydn 🎯  rh.stickyAd.initialize");
            if(nydn.section != "autos")	rh.stickyNav.resize();
            if (rh.platform !='mobile' && nydn.section != "autos") {
                rh.stickyAd.stickAd();
                setTimeout(function(){
                    rh.stickyNav.initialize();
                    rh.stickyAd.unstickAd();
                },rh.stickyAd.delay);
            }
            else  rh.stickyNav.initialize();
            rh.stickyAd.initialized = true;
        });
    };
    rh.stickyAd.stickAd = function(){
        console.log("nydn 🎯  rh.stickyAd.stickAd");
        $('#rh .rh-ad').addClass("sticky");
        $(window).on( "scroll.adScroll", function(){
            if($(window).scrollTop() > 0)		$(".rh-ad").addClass("adScrolled");
            else	$(".rh-ad").removeClass("adScrolled");
        });
        rh.stickyAd.addOffset();
    };
    rh.stickyAd.unstickAd = function() {
        console.log("nydn 🎯  rh.stickyAd.unstickAd");
        if ($(window).scrollTop() >= rh.stickyNav.top) {
            $('#rh .rh-ad').slideUp(500, function() {
                $('#rh .rh-ad').removeClass("sticky");
                rh.stickyAd.removeOffset();
                $(window).trigger('scroll');
            }).show(0);
        } else {
            $('#rh .rh-ad').removeClass("sticky");
            rh.stickyAd.removeOffset();
            $(window).trigger('scroll');
        }
        $(window).off( "scroll.adScroll");
        $(".rh-ad").removeClass("adScrolled");
    };
    rh.stickyAd.addOffset = function(){
        console.log("nydn 🎯  rh.stickyAd.addOffset");
        rh.stickyAd.offset = $('#rh .rh-ad')[0].offsetHeight;
        $('#rh').css(  'marginTop', $('#rh .rh-ad')[0].offsetHeight  );
    };
    rh.stickyAd.removeOffset = function(){
        console.log("nydn 🎯  rh.stickyAd.removeOffset");
        $('#rh').css(  'marginTop', 0 );
    };
}
//DTM
{
    rh.dtm = {};
    rh.dtm.file = "http://assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/satelliteLib-";
    rh.dtm.url="";
    rh.dtm.urls={
        "homepage"	:"73f4744403840768957d49914cf08bed14fb4de9",
        "index"				:"fe2a57c6bf0995707ec026e53b4894c96159d1bb",
        "photos"			:"fe2a57c6bf0995707ec026e53b4894c96159d1bb",
        "article"	 		:"7ddbafd534880a3c430eef77308f95e6c56bf226",
        "ymm"				:"7ddbafd534880a3c430eef77308f95e6c56bf226",
        "ss-hub"			:"3ed281fee1fbf6f209d01fa5f23a50d559df8173",
        "ss-category"	:"3ed281fee1fbf6f209d01fa5f23a50d559df8173",
        "partner"			:"226c808614b548160969230c1dd83750112754cc",
        "default"			:"226c808614b548160969230c1dd83750112754cc"
    };
    rh.dtm.getURL = function(){
        var suf =  (window.location.href.indexOf("wwwqa") > -1 || window.location.href.indexOf("mockups") > -1 || window.location.href.indexOf("interactiveqa") > -1) ? "-staging.js" : ".js";
        if (nydn.template == undefined || nydn.template == "" || rh.dtm.urls[nydn.template] == undefined) nydn.template = "default";
        return rh.dtm.file+rh.dtm.urls[nydn.template]+suf;
    };
    rh.dtm.download = function(){
        rh.dtm.check();
        nydnRequires([rh.dtm.getURL()], function(util) {
            console.log("nydn 🎯  rh.dtm.download ✓");
            _satellite.pageBottom();
            console.log("nydn 🎯  rh.dtm.exe ✓");
        });
    };
    rh.dtm.check = function(){
        console.log("nydn 🎯  rh.dtm.check");
        window.addEventListener('beforeunload', function(event) {
            console.log("nydn 🎯  rh.dtm.check beforeunload");
            nydnDO.push({'event' : 'dtmChk'});
            if(!rh.dtm.OmniturePageViewHasFired()) 	{
                nydnDO.push({'dtmFailure' : 1,'event' : 'dtmFailure'});
                console.log("nydn 🎯  rh.dtm.check  ✗");
            }else console.log("nydn 🎯  rh.dtm.check ✓");
        });
    };
    rh.dtm.OmniturePageViewHasFired = function(){
        if(typeof _satellite === "object"){
            return _satellite.getVar('dtmFired');
        }
        return false;
    };
}
//PARSELY
{
    rh.parsley = {};
    rh.parsley.download = function(){
        if (!!document.getElementById("parsely-root")){
            (function(s, p, d) {
                var h=d.location.protocol, i=p+"-"+s,
                    e=d.getElementById(i), r=d.getElementById(p+"-root"),
                    u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net"
                        :"static."+p+".com";
                if (e) return;
                e = d.createElement(s); e.id = i; e.async = true;
                e.src = h+"//"+u+"/p.js"; r.appendChild(e);
            })("script", "parsely", document);
            console.log("nydn 🎯  rh.parsely.download ✓");
        }
    };
    rh.parsley.track = function(tagName) {
        PARSELY.beacon.trackPageView({
            url: location.href.split("?")[0]+rh.slide.url,
            urlref:  location.href,
            js: 1,
            action_name: tagName
        });
    };
}

//NEWSROOM
{
    rh.newsroom = {};
    rh.newsroom.url= "http://c2.taboola.com/nr/nydailynews-nydailynews/newsroom.js";
    rh.newsroom.initialize = function(){
        console.log("nydn 🎯  rh.newsroom.initialize");
        if (nydn.template == "homepage") {
            if(window.location.href === "http://www.nydailynews.com/"){
                window._newsroom = window._newsroom || [];
                if (rh.platform != "mobile"){
                    window._newsroom.push({pageTemplate: 'home-desktop+tablet'});
                    window._newsroom.push({pageDashboard: 'home-desktop+tablet'});
                } else {
                    window._newsroom = window._newsroom || [];
                    window._newsroom.push({pageTemplate: 'home-smartphone'});
                    window._newsroom.push({pageDashboard: 'home-smartphone'});
                }
                window._newsroom.push('auditClicks');
                window._newsroom.push('trackPage');
                console.log("nydn 🎯  rh.newsroom on homepage - set template");
            }else{
                console.log("nydn 🎯  rh.newsroom not running - not on homepage");
            }
        }
        rh.newsroom.download();
    };
    rh.newsroom.download = function(){
        nydnRequires([rh.newsroom.url], function(util) {
            console.log("nydn 🎯  rh.newsroom.download ✓");
        });
    };
}
//GTM
{
    rh.gtm = {};
    rh.gtm.getURL = function(){
        if (window.location.href.indexOf("wwwqa") > -1 || window.location.href.indexOf("interactiveqa") > -1) rh.gtm.url = 'GTM-MFQKX7';
        else	rh.gtm.url = 'GTM-M9G2T8';
        console.log("nydn 🎯  rh.gtm.getURL "+rh.gtm.url);
        return rh.gtm.url;
    }
    rh.gtm.download = function(){
        rh.gtm.getURL();
        (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({
                'gtm.start':new Date().getTime(),
                event:'gtm.js'
            });
            var 	f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','nydnDO',rh.gtm.url);
        console.log("nydn 🎯  rh.gtm.download ✓");
    };
}
//COMSCORE
var _comscore = _comscore || [];
_comscore.push({ c1: "2", c2: "7190388" });
{
    rh.comscore = {};
    rh.comscore.url = "http://b.scorecardresearch.com/beacon.js";
    rh.comscore.download = function(){
        nydnRequires([rh.comscore.url], function(util) {
            console.log("nydn 🎯  rh.comscore.download ✓");
        });
    };
}
//NIELSON
{
    rh.nielsen = {};
    rh.nielsen.param = {
        nol_sfcode: 'dcr',
        nol_ci: 'us-805104',
        nol_apid: 'P0569507D-B606-4161-ABFC-BEBEDE8AB15D',
        nol_assetname: '',
        nol_apn: 'us-805104',
        nol_vc: 'b01',
        nol_segA: 'NA',
        nol_segB: 'NA',
        nol_segC: 'NA',
        nol_syndication:'S'
    };
    rh.nielsen.download = function(){
        var ogURL =  $('meta[property="og:url"]').attr('content');
        var ogURLnoNYDN = ogURL.slice(ogURL.indexOf(".com") + 5);
        console.log("nydn 🎯  rh.nielsen.download "+ogURLnoNYDN);
        rh.nielsen.param["nol_assetname"] = $('body').attr('data-section');
        (function (params) {
            var url = 'http://cdn-gl.imrworldwide.com/novms/js/2/nlsDcrLite510.min.js#';
            var query = [];
            for (var param in params) {query.push(param + '=' + params[param]);}
            url += query.join('&');
            var script = window.document.createElement("script");
            script.async = true;
            script.src = url;
            window.document.getElementsByTagName('head')[0].appendChild(script);
        })(rh.nielsen.param);
        console.log("nydn 🎯  rh.nielsen.download ✓");
    };
}
//QUANCAST
var ezt = ezt ||[];
{
    ezt.push({ qacct: "p-af_gBGFZgopbs", uid: "" });
    rh.quantcast = {};
    rh.quantcast.url="http://pixel.quantserve.com/aquant.js?a=p-af_gBGFZgopbs";
    rh.quantcast.download = function(){
        nydnRequires([rh.quantcast.url], function(util) {
            console.log("nydn 🎯  rh.quantcast.download ✓");
        });
    };
}
//ACCORDION
{
    rh.accordion = function(e) {
        var state = 'on';
        var target = e.target;
        var $this = $(target).prop('tagName').toLowerCase() === 'dt' ? $(target) : $(target).parents('dt');
        if ($this.parent().hasClass('feat')) return;
        if ($this.hasClass(state)) {
            $this.removeClass(state);
            $this.siblings().slideUp();
        } else {
            $this.addClass(state);
            $this.siblings().slideDown();
        }
    }
}
//SLIDER
/* 	By default Slider can be called with 4 arguments that correspond to
 1. teaser
 2. container
 3. left click button
 4. right click button

 Passing a 5th argument of 'auto' will extend the basic functionality to
 include autoSliding functionality
 ============================*/
function Slider(teaser, container, left, right, type) {
    //defaults to false. if autoAdvance then this will be true;
    this.auto = false;
    /* DOM NODES */
    this.container = container;
    this.teasers = this.container.find(teaser);
    this.left = this.container.parent().find(left);
    this.right = this.container.parent().find(right);
    /*  Dimensions */
    this.containerWidth = this.container.width();
    this.teaserWidth = this.teasers.eq(0).outerWidth();
    this.scrollWidth = this.container[0].scrollWidth;
    this.offsetIt = (this.teaserWidth * (Math.floor(this.containerWidth / this.teaserWidth)));
    //sometimes images have a margin between them that needs to be accounted for
    this.margin = this.getOffset(this.teasers);
    /*  Values  lets us know when we are at the beginning and end of a container */
    this.start = true;
    this.end = false;
    //kick off basic Event Handlers
    this.init();
    //extra configuration for auto slider
    if (type === 'auto') {
        this.auto = true;
        this.delay = 5000;
        this.autoTimer;
        this.autoAdvance(this.delay);
        //kick off autoAdvance event handlers
        this.autoAdvanceInit();
    }
}
{
    Slider.prototype.init = function() {
        //basic slider event handlers
        this.left.on('click', this.prev.bind(this));
        this.right.on('click', this.next.call(this)).addClass('on');
        this.container.parent().on('hover', this.hoverOn.bind(this), this.hoverOff.bind(this));
        this.container.on('scroll', this.endCheck.bind(this));
        //resize events so we get updated scroll values on resize
        $(window).on('resize', this.getDimensions.bind(this));
    };
    Slider.prototype.getDimensions = function() {
        //update dimensions on resize
        this.margin = this.getOffset(this.teasers);
        this.containerWidth = this.container.width();
        this.teaserWidth = this.teasers.eq(0).outerWidth();
        this.scrollWidth = this.container[0].scrollWidth;
        this.offsetIt = (this.teaserWidth * (Math.floor(this.containerWidth / this.teaserWidth)));
        if (this.platform === 'mobile') this.container.parent().off('hover');
    };
    Slider.prototype.getOffset = function(teasers) {
        return teasers.eq(1).offset().left - (teasers.eq(0).offset().left + teasers.eq(0).width())
    };
    Slider.prototype.hoverOn = function(e) {
        if (this.start) this.right.addClass('on');
        else if (this.end)	this.left.addClass('on');
        else {
            this.right.addClass('on');
            this.left.addClass('on');
        }
    };
    Slider.prototype.hoverOff = function(e) {
        this.right.removeClass('on');
        this.left.removeClass('on');
    };
    Slider.prototype.next = function() {
        var that = this;
        var scrollPosition = this.container.scrollLeft();
        return function(e) {
            //check that a real click was fired and autoAdvance was turned on
            if (e.type === 'click' && that.auto) that.stopAdvance();
            //if we're not at the end
            if (!that.end) {
                that.getDimensions();
                scrollPosition += that.offsetIt;
                that.scrollingTo = (that.container.scrollLeft() + that.offsetIt) + that.margin;
                that.container.animate({	scrollLeft: that.scrollingTo	}, 300, function() {	that.endCheck();	});
            }
        }
    };
    Slider.prototype.prev = function(e) {
        var that = this;
        that.getDimensions();
        //turn off autoAdvance if we click and autoAdvance was called
        if (e.type === 'click' && that.auto) that.stopAdvance();
        this.container.stop().animate({
            scrollLeft: (this.container.scrollLeft() - this.offsetIt) - that.margin
        }, 300, function() {	that.endCheck();	});
    };
    Slider.prototype.endCheck = function() {
        //most common case. less work needed
        if (this.container.is(':animated')) {
            return;
        } else {
            //available space used to determine how far we've scrolled and if we need to apply left and right active states
            var availableSpace = this.scrollWidth - (this.containerWidth + this.container.scrollLeft());
            //Logic to detect the END. decided to test for less than 2 as some browsers throttle frequent requests to position.
            if (availableSpace <= 2) this.end = true;
            else this.end = false;
            //Logice to detect the BEGINNING.  Decided to test for less than or equal to 0 because safari also allows negative values. if tested only against 0 could cause problems
            if (this.container.scrollLeft() <= 0) this.start = true;
            else 	this.start = false;
            this.hoverOff();
            this.hoverOn();
        }
    };
    Slider.prototype.autoAdvance = function(duration) {
        var that = this;
        that.autoTimer = setInterval(function() {
            that.getDimensions();
            that.right.trigger('fakeClick');
            if (that.end) {
                that.left.removeClass('on');
                that.right.addClass('on');
                that.container.animate({	scrollLeft: 0	}, 1000, function() {	that.endCheck();	});
            }
        }, duration);
    };
    Slider.prototype.stopAdvance = function() {
        //stop any currently running animations on the container and go to end
        this.container.stop();
        //stop the interval which forms the basis of the autoAdvance functionality
        clearInterval(this.autoTimer);
        //de-register autoAdvance event handlers
        this.left.off('mousedown');
        this.right.off('mousedown');
        this.container.off('scroll.realScroll');
        this.outerWrapper.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup');
        this.auto = false;
    };
    Slider.prototype.autoAdvanceInit = function() {
        //access to '.rtw' which allows us to listen to user scrolls even when our animated scroll is running in the nested container .rtww
        this.outerWrapper = this.container.parent();
        // this.container.on('scroll.realScroll', this.realScroll.bind(this));
        //click events that will disable autoAdvance
        this.container.on('mousedown', this.stopAdvance.bind(this))
        this.left.on('mousedown', this.stopAdvance.bind(this))
        this.right.on('mousedown', this.stopAdvance.bind(this))
        //fake click event used by autoAdvance to trigger next call. This way we have no phantom click events for Andy.
        this.right.on('fakeClick', this.next.call(this));
        //allows us to interupt a scroll animation currently in progress
        this.outerWrapper.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup', this.interruptScroll.bind(this))
        //turns off autoAdvance when user resizes window
        $(window).on('resize', this.resizeIt.bind(this));
    };
    Slider.prototype.interruptScroll = function(e) {
        if (e.which > 0 || e.type == "mousedown" || e.type == "mousewheel") this.stopAdvance();
    }
    Slider.prototype.pageScroll = function() {
        console.log('scrolling:  ' + this.scrolling)
        this.scrolling = true;
    }
    Slider.prototype.resizeIt = function() {
        if (nydn.platform != 'desktop')  this.stopAdvance();
    }
}
//GLOBAL SHARE
var rShare = function(shNode, shOptions){
    var this_ = this;
    nydnRequires([nydn.urls.nydnQuery], function(util) {
        console.log("nydn 🎯  rShare");
        this_.initialized = false;
        this_.shNode = ($(shNode).length) ? $(shNode) : false;
        this_.shOptions = shOptions || false;
        this_.clickEvent = "click.rShare";
        this_.enterEvent = "mouseenter.rShare";
        this_.touchEvent = "touchstart.rShare";
        this_.scrollEvent = "scroll.rShare";
        this_.noClick();
        this_.initialize();
    });
};
{
    rShare.prototype.noClick = function(){
        console.log("nydn 🎯  rShare.noClick");
        var this_ = this;
        $(document).on(this_.clickEvent, ".rt-share", function(e){
            if (!this_.initialized) {
                console.log("nydn 🎯  rShare.noClicked");
                e.preventDefault();
                $(document).on(this_.clickEvent, ".rt-share");
                this_.initialized = true;
                this_.getBitly();
            }
        });
    }
    rShare.prototype.initialize = function(){
        console.log("nydn 🎯  rShare.initialize");
        if (!this.initialized){
            if (isTouchDevice())	this.touching();
            else	this.mousing();
        }
    }
    rShare.prototype.touching = function(){
        console.log("nydn 🎯  rShare.touching");
        var rtShareTop = $(".rt-share").position().top;
        var this_ = this;
        $(document).on(this_.touchEvent, "#r-main", function(e) {
            console.log("nydn 🎯  rShare.touching");
            $(document).off(this_.touchEvent, "#r-main");
            $(document).on(this_.scrollEvent, function(e) {
                console.log("nydn 🎯  rShare.scroll "+$(window).scrollTop());
                if ( ($(window).height() +  $(window).scrollTop() ) >= rtShareTop ){
                    console.log("nydn 🎯  rShare.scroll  DONE"+$(window).scrollTop());
                    $(document).off(this_.scrollEvent);
                    this_.initialized = true;
                    this_.getBitly();
                }
            });
        });
    };
    rShare.prototype.mousing = function(){
        console.log("nydn 🎯  rShare.mousing");
        var this_ = this;
        $(document).on(this_.enterEvent, ".rt-share", function(e) {
            console.log("nydn 🎯  rShare.entering");
            $(document).off(this_.enterEvent, ".rt-share");
            this_.initialized = true;
            this_.getBitly();
        });
    };
    rShare.prototype.getBitly = function(){
        console.log("nydn 🎯  rShare.getBitly");
        if ( nydn.horoscopes )	{
            this.getShDate();
            if(window.location.search.indexOf("c=") > -1){
                this.shOptions.shURL = window.location.href.split("?")[0]+"?c="+getQueryVariable("c")+this.shOptions.shDateStr;
            }else{
                if(window.location.search.indexOf("type=") > -1){
                    var typeString = window.location.href.split("?")[1];
                    this.shOptions.shURL = window.location.href.split("?")[0]+"?"+typeString+"&"+this.shOptions.shDateStr;
                }else{
                    this.shOptions.shURL = window.location.href.split("?")[0]+"?"+this.shOptions.shDateStr;
                }
            }
        }
        if (this.shOptions.shType == "cover")	this.shOptions.shURL =  document.querySelectorAll(".r-covers .rt-i")[0].getAttribute("href");
        var this_ = this;
        nydnRequires([nydn.urls.nydnQuery], function(util) {
            $.getJSON(	"http://api.bitly.com/v3/shorten?callback=?",
                { 		"format": "json",
                    "apiKey": "R_edd7caf2f95482c8e70d6b63f2ff9a14",
                    "login": "nydailynews",
                    "longUrl": this_.shOptions.shURL
                }
            )
                .success(function(response) {
                    console.log("nydn 🎯  getBitly success ");
                    this_.shBitlyStatus = true;
                    this_.shOptions.shBitly = response.data.url;
                })
                .error(function() {
                    console.log("nydn 🎯  getBitly error ");
                    this_.shBitlyStatus = false;
                })
                .complete(function() {
                    console.log("nydn 🎯  getBitly complete ");
                    this_.getInfo();
                    this_.getMedias();
                });;
        });
    };
    rShare.prototype.getInfo = function(){
        console.log("nydn 🎯  rShare.getInfo");
        var bdNode;
        if (this.shOptions.shType == "cover"){
            bdNode = document.querySelector(".r-covers");
            this.shOptions.shTitle 	=  	bdNode.querySelector(".rt-h").innerText;
            this.shOptions.shIMG	=  	bdNode.querySelector(".rt-src").getAttribute("src");
        }
        else
        if (document.querySelectorAll(".rc.bd").length) {
            bdNode = document.querySelector(".rc.bd");
            this.shOptions.shTitle 		=  bdNode.querySelector(".rt-h").innerText;
            this.shOptions.shBlurb 		=  bdNode.querySelector(".rt-b").innerText;
            this.shOptions.shZodiac 	=  this.shOptions.shTitle.replace("Happy Birthday ","").replace("!","").capitalize();
            this.shOptions.shIMG		=  nydn.domain.replace("/js","")+"img/static/ht/"+this.shOptions.shZodiac+".jpg";
        }
        else if (document.querySelectorAll(".rc.hr").length) {
            bdNode = document.querySelector(".rc.hr");
            this.shOptions.shTitle 		= bdNode.querySelector(".rt-h").innerText.toUpperCase()+" - "+ bdNode.querySelector(".rt-d").innerText;
            this.shOptions.shBlurb 		= bdNode.querySelector(".rt-b").innerText;
            this.shOptions.shZodiac 	= bdNode.querySelector(".rt-h").innerText.toLowerCase().capitalize();
            this.shOptions.shIMG		=  nydn.domain.replace("/js","")+"img/static/ht/"+this.shOptions.shZodiac+".jpg";
        }
    };
    rShare.prototype.getMedias = function(){
        console.log("nydn 🎯  rShare.getMedias");
        for (var m in this.shOptions.shMedias){
            if (typeof(this.shOptions.shMedias[m]) !=="function") {
                switch (this.shOptions.shMedias[m]){
                    case "facebook"	:	this.facebook();
                        break;
                    case "twitter"		:	this.twitter();
                        break;
                    case "pinterest"	:	this.pinterest();
                        break;
                    case "email"		:	this.email();
                }
            }
        }
    };
    rShare.prototype.facebook = function(){
        console.log("nydn 🎯  rShare.facebook");
        this.facebookDownload();
        this.facebookSetup();
        this.facebookClick();
    };
    rShare.prototype.facebookDownload = function(){
        (function(e, a, f) {
            var c, b = e.getElementsByTagName(a)[0];
            if (e.getElementById(f)) {
                return;
            }
            c = e.createElement(a);
            c.id = f;
            c.src = "//connect.facebook.net/en_US/sdk.js";
            b.parentNode.insertBefore(c, b);
        }(document, "script", "facebook-jssdk"));
        console.log("nydn 🎯  rShare.facebookDownload ✓");
    };
    rShare.prototype.facebookSetup = function(){
        console.log("nydn 🎯  rShare.facebookSet");
        window.fbAsyncInit = function() {
            FB.init({
                appId: "236665236693741",
                xfbml: true,
                version: 'v2.1',
                status: true
            });
        };
    };
    rShare.prototype.facebookClick = function(){
        var this_ = this;
        $(document).on( "click", ".rt-share-f", function(e){
            console.log("nydn 🎯  rShare.facebookClick ");
            e.preventDefault();
            FB.ui({
                method: 'share',
                href: 	this_.shOptions.shURL,
                title:		this_.shOptions.shTitle ,
                picture:	this_.shOptions.shIMG,
                description:	this_.shOptions.shBlurb
            });
        });
    };
    rShare.prototype.twitter = function(){
        console.log("nydn 🎯  rShare.twitterInitialize");
        var tweetableURL = (this.shBitlyStatus) ? this.shOptions.shBitly : this.shOptions.shURL;
        // console.log("##### tweetableURL = "+tweetableURL);
        this.shNode.find("li[class*='share-t'] a").attr("href","https://twitter.com/intent/tweet?text="+this.shOptions.shTitle+"&url="+tweetableURL);
        this.twitterDownload();
    };
    rShare.prototype.twitterDownload = function(){
        ! function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = "http://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, "script", "twitter-wjs");
        console.log("nydn 🎯  rShare.twitterDownload ✓");
    };
    rShare.prototype.email = function(){
        console.log("nydn 🎯  rShare.email");
        var emailableURL = (this.shBitlyStatus) ? this.shOptions.shBitly : this.shOptions.shURL;
        this.shNode.find("li[class*='share-e'] a").attr("href","mailto:?subject="+this.shOptions.shTitle+"&body="+this.shOptions.shBlurb+" %0A%0A "+emailableURL);
    };
    rShare.prototype.pinterest = function(){
        console.log("nydn 🎯  rShare.pinterest");
        this.shNode.find("li[class*='share-p'] a").attr("href","https://www.pinterest.com/pin/create/button/?url="+this.shOptions.shURL+"&amp;media="+this.shOptions.shIMG+"&amp;description="+this.shOptions.shTitle);
        this.pinterestDownload();
    };
    rShare.prototype.pinterestDownload = function(){
        rh.script.download("http://assets.pinterest.com/js/pinit.js", "r-pin");
        console.log("nydn 🎯  rShare.pinterestDownload ✓");
    };
    rShare.prototype.getShDate = function(){
        // console.log("##### nydn.section = "+nydn.section);
        var shDate = new Date();
        var shDay = ("0" + shDate.getDate()).slice(-2);
        var shMonth = ("0" + (shDate.getMonth()+1)).slice(-2);
        var shYear = shDate.getFullYear();
        this.shOptions.shDateStr = "d="+shYear+shMonth+shDay;
        return this.shOptions.shDateStr;
    };
}
//AOL
{
    rh.aol={};
    rh.aol.tags =[{
        "section"	:	"homepage",
        "bid" 		: 	"5877be20cc52c75124984393"
    },{
        "section"	:	"newyork",
        "bid" 		: 	"5876675e54dea32d7f122295"
    },{
        "section"	:	"nyccrime",
        "bid" 		: 	"587669cbcb65d37a9789fd0f"
    },{
        "section"	:	"bronx",
        "bid" 		: 	""
    },{
        "section"	:	"brooklyn",
        "bid" 		: 	""
    },{
        "section"	:	"manhattan",
        "bid" 		: 	""
    },{
        "section"	:	"queens",
        "bid" 		: 	""
    },{
        "section"	:	"education",
        "bid" 		: 	"5876971f54dea32d7f1238b0"
    },{
        "section"	:	"weather",
        "bid" 		: 	""
    },{
        "section"	:	"news",
        "bid" 		: 	"5876971f54dea32d7f1238b0"
    },{
        "section"	:	"crime",
        "bid" 		: 	"58769974cc52c752b411de88"
    },{
        "section"	:	"us",
        "bid" 		: 	"58769aa0e3bb56030d7d4093"
    },{
        "section"	:	"world",
        "bid" 		: 	"58769b4754dea32d7f123a3b"
    },{
        "section"	:	"politics",
        "bid" 		: 	"58769c3254dea32d7f123aa1"
    },{
        "section"	:	"entertainment",
        "bid" 		: 	"58769d30db4bc676e66c1074"
    },{
        "section"	:	"gossip",
        "bid" 		: 	"5877b29ae3bb567f469e9b1b"
    },{
        "section"	:	"tv",
        "bid" 		: 	"5877b35f8526313ad731b4a6"
    },{
        "section"	:	"movies",
        "bid" 		: 	"5877b3c8e3bb567f469e9bab"
    },{
        "section"	:	"music",
        "bid" 		: 	"5877b45054dea32dd5fd06b6"
    },{
        "section"	:	"theaterarts",
        "bid" 		: 	"5877b4abe3bb567f469e9c2a"
    },{
        "section"	:	"lifestyle",
        "bid" 		: 	"5877b51be3bb567f469e9cab"
    },{
        "section"	:	"health",
        "bid" 		: 	"5877b8c9e3bb567f469e9ec1"
    },{
        "section"	:	"food",
        "bid" 		: 	"5877b9e3e3bb567f469e9f96"
    },{
        "section"	:	"viva",
        "bid" 		: 	"5877bbbedb4bc66dbf383791"
    },{
        "section"	:	"autos",
        "bid" 		: 	"5877bd1054dea32dd5fd0d06"
    },{
        "section"	:	"buyersguide",
        "bid" 		: 	""
    },{
        "section"	:	"ratingsreviews",
        "bid" 		: 	""
    },{
        "section"	:	"newsviews",
        "bid" 		: 	""
    }];
    rh.getAolVars = function(){
        rh.aol.vars = {
            //Required by AOL
            BuyerCompanyID :	"56bb65bee4b08e34e4876362",
            playerID:					"playerIDVar",
            videoID: 					"videoIDVar",
            videoPlaylistID:		"videoPlaylistIDVar",
            //Required by AOL
            playback:		"playbackVar",									//autoplay or click
            sound:			"muted",
            //Required by DFP
            output:			"vast",												//Output format of ad.
            iu: 				(rh.platform != "mobile") ? nydn.targetPath.replace("NYDN","Video.NYDN") : nydn.targetPath.replace("NYDN","Video.M.NYDN"),
            // sz:				"640x480",
            sz:				"sizeVar",
            env:				"vp",													//Indicates that the request is from a video player
            gdfp_req:		"1",													//Indicates that the user is on the DFP schema and is not a legacy Google Ad Manager (GAM) publisher.
            impl:				"fif",													//Request mode: should always be sync (s). s=sync fif=async
            unviewed_position_start:"1",								//Setting this to 1 turns on delayed impressions for video.
            //Required by AdOps
            Content:		nydn.content,
            ContentID:	nydn.contentID,
            Package:		nydn.packageName,
            nsfa:				nydn.nsfa,
            qa:				nydn.qa,
            viewport:		rh.platform,
            testAd:			nydn.testAd,
            //Required by DEV
            section: 		(nydn.subsection == "") ? nydn.section : nydn.subsection,
            url: window.location.href,
            description_url: encodeURIComponent(window.location.href),
            timestamp: + new Date()
        };

    }
    rh.aol.params = function(){
        console.log("nydn 🎯  rh.aol.params");
        var vdb_params=
            // "m.playback="+rh.aol.vars.playback+
            // "&m.sound="+rh.aol.vars.sound+
            "m.output="+rh.aol.vars.output+
            "&m.iu="+rh.aol.vars.iu+
            "&m.sz="+rh.aol.vars.sz+
            "&m.env="+rh.aol.vars.env+
            "&m.gdfp_req="+rh.aol.vars.gdfp_req+
            "&m.impl="+rh.aol.vars.impl+
            "&m.unviewed_position_start="+rh.aol.vars.unviewed_position_start+
            "&m.Content="+rh.aol.vars.Content+
            "&m.ContentID="+rh.aol.vars.ContentID+
            "&m.Package="+rh.aol.vars.Package+
            "&m.nsfa="+rh.aol.vars.nsfa+
            "&m.qa="+rh.aol.vars.qa+
            "&m.testAd="+rh.aol.vars.testAd+
            "&m.viewport="+rh.aol.vars.viewport+
            "&m.videoID="+rh.aol.vars.videoID+
            "&m.playerID="+rh.aol.vars.playerID+
            "&m.videoPlaylistID="+rh.aol.vars.videoPlaylistID+
            "&m.url="+rh.aol.vars.url+
            "&m.description_url="+rh.aol.vars.description_url+
            "&m.correlator="+rh.aol.vars.timestamp;

        //m.playback=autoplay&m.sound=muted&m.output=vast&m.iu=4692832/Video.NYDN/Entertainment&m.sz=640x480&m.env=vp&m.gdfp_req=1&m.impl=fif&m.unviewed_position_start=1&m.Content=Article&m.ContentID=1.2823725&m.Package=Entertainment&m.nsfa=false&m.qa=false&m.testAd=undefined&m.viewport=desktop&m.videoID=587798aa869ea9185351492a&m.playerID=5852e8f9cc52c7184f640758&m.videoPlaylistID=587669cbcb65d37a9789fd0f
        return vdb_params;
    };
//old RR PlayerID "587fec378526314c71fa958d" size "300x225"
    rh.aol.getPlaylistID = function(){
        var 	videoPlaylistObj = rh.aol.tags.getThisObject("section", rh.aol.vars.section.toLowerCase()),			//get playlist obj  {"entertiament":"abcdefgID"}
            videoPlaylistID = (videoPlaylistObj.bid == "" || videoPlaylistObj.bid == undefined) ? "5877be20cc52c75124984393" : videoPlaylistObj.bid;		//get playlist ID - from Polopoly OR playlist obj
        return videoPlaylistID;
    };




    rh.aol.download = function(){
        rh.getAolVars();
        if (!!document.getElementById("r-aol-video")){
            var 	vNodes = document.getElementsByClassName("vdb_player"),					//get all AOL video divs
                vdb_params=	rh.aol.params();																		//get default vdb_params
            var  	thisPlayerID,
                thisVideoID,
                thisVideoPlaylistID,
                thisClassName,
                thisParams,
                thisPlayerSize = "640x480",
                thisNode;

            var player;

            for (var i = 0; i< vNodes.length; i++){
                thisNode = vNodes[i];
                //original
                // thisPlayerID = (nydn.template == "article") ? "5852e8f9cc52c7184f640758" : "58754228db4bc6302dd6f1c0";
                // Last version
                // thisPlayerID = (nydn.template == "article") ? "58c6efd0ba82aa03f6aedede" : "58754228db4bc6302dd6f1c0";

                if(nydn.template == "article"){
                    if (i || nydn.reskin)	thisPlayerID = "58d0493bf78ced6518eb88fa";
                    else	thisPlayerID = "5852e8f9cc52c7184f640758";
                }else{
                    thisPlayerID = "58754228db4bc6302dd6f1c0";
                }

                thisVideoID = thisNode.getAttribute("data-video-id");
                thisVideoPlaylistID = (thisNode.getAttribute("data-list-id") != "" &&  thisNode.getAttribute("data-list-id") != undefined ) ? thisNode.getAttribute("data-list-id") : rh.aol.getPlaylistID();		//Playlist ID
                thisClassName = " vdb_"+ thisPlayerID+ rh.aol.vars.BuyerCompanyID;								//setup div classname
                thisParams = vdb_params.replace("playerIDVar",thisPlayerID).replace("videoIDVar",thisVideoID).replace("videoPlaylistIDVar",thisVideoPlaylistID).replace("sizeVar",thisPlayerSize);

                // if (rh.platform === "mobile")
                // 	thisParams.replace("playbackVar","click");
                // else if (thisNode.getAttribute("data-playback") != undefined && thisNode.getAttribute("data-playback") !="") {
                // 	thisParams = thisParams.replace("playbackVar", thisNode.getAttribute("data-playback"));
                // }else{
                // 	thisParams = (!i)? thisParams.replace("playbackVar","autoplay") : thisParams.replace("playbackVar","click");		//1st video is autoplay, others are click
                // }

                if (rh.platform !== "mobile" && thisNode.getAttribute("data-playback") != undefined && thisNode.getAttribute("data-playback") !=""){
                    thisParams += "&m.playback=click";
                }


                thisNode.setAttribute("id","r-aol-video-"+thisVideoID);
                thisNode.setAttribute("vdb_params",thisParams);
                thisNode.className = thisNode.className+thisClassName;

                if(nydn.template == "article")
                    rh.aol.url = (thisVideoPlaylistID != "" &&  thisVideoPlaylistID != undefined) ?  "//delivery.vidible.tv/jsonp/bid="+thisVideoPlaylistID+"/pid="+ thisPlayerID+"/vid="+thisVideoID+"/"	+rh.aol.vars.BuyerCompanyID+".js?"+thisParams : "//delivery.vidible.tv/jsonp/pid="+thisPlayerID+"/vid="+thisVideoID+"/"	+rh.aol.vars.BuyerCompanyID+".js?"+thisParams
                else
                    rh.aol.url = (thisVideoPlaylistID != "" &&  thisVideoPlaylistID != undefined) ?  "//delivery.vidible.tv/jsonp/bid="+thisVideoPlaylistID+"/pid="+ thisPlayerID+"/"						+rh.aol.vars.BuyerCompanyID+".js?"+thisParams : "//delivery.vidible.tv/jsonp/pid="+thisPlayerID+"/"						+rh.aol.vars.BuyerCompanyID+".js?"+thisParams;
                rh.script.download(rh.aol.url);
                console.log("nydn 🎯  rh.aol.download: v db_params  "+thisParams);
                console.log("nydn 🎯  rh.aol.download ✓ ");
            }
        }

    };
}

//ORA
rh.aolOrOra = function(){
    if(  !(rh.platform === "mobile" && nydn.section === "homepage")  ){
        var oraWrap = document.querySelector(".r-video-hp-ora");
        if(!!oraWrap){
            oraWrap.parentNode.removeChild(oraWrap);
        }
        rh.aol.download();
    }
}

//LOTAME ANALYTICS
{
    rh.lotame = {};
    rh.lotame.global = {};
    rh.lotame.global.url = "http://tags.crwdcntrl.net/c/4866/cc.js?ns=_cc4866";
    rh.lotame.global.download = function(){
        rh.script.download(rh.lotame.global.url, {scriptID:"LOTCC_4866", scriptCallback:rh.lotame.global.exe, scriptAsync:true});
        console.log("nydn 🎯  rh.lotame.global.download ✓");
    };
    rh.lotame.global.exe = function(){
        if (document.readyState === "complete")	_cc4866.bcpf();
        else 	_cc4866.bcp();
        console.log("nydn 🎯  rh.lotame.global.exe ✓");
    };
    rh.lotame.autos = {};
    rh.lotame.autos.url = "http://tags.crwdcntrl.net/c/6968/cc.js?ns=_cc6968";
    rh.lotame.autos.download = function(){
        rh.script.download(rh.lotame.autos.url, {scriptID:"LOTCC_6968", scriptCallback:rh.lotame.autos.exe, scriptAsync:true});
        console.log("nydn 🎯  rh.lotame.autos.download ✓");
    };
    rh.lotame.autos.exe = function(){
        if (document.readyState === "complete")	_cc6968.bcpf();
        else 	_cc6968.bcp();
        console.log("nydn 🎯  rh.lotame.autos.exe ✓");
    };
}
//INTERACTIVE
rh.interactive = function(){
    if (window.location.href.indexOf("interactive.nydailynews") >-1 ) {
        nydn.targetPath = !nydn.targetPath ? "" : nydn.targetPath;
        nydn.section="interactive";
        nydn.subsection="";
        nydn.bidder=[];
    }
};
//ADS
var rhAdArr = [];
var rhAdArr2 = [];
{
    rh.adsOut1 = {};
    rh.adsOut2 = {};
    rh.adsWide1 = {};
    rh.adsWide2 = {};
    rh.adsWide3 = {};
    rh.adsBox1 = {};
    rh.adsBox2 = {};
    rh.adsBox3 = {};
    rh.adsShop = {};
    rh.adsBrandPov 	= 	{};
    rh.ads = {
        targetPath	:	!nydn.targetPath ? "" : nydn.targetPath,
        targetPathM:	!nydn.targetPath ? "" : nydn.targetPath.replace("NYDN", "M.NYDN"),
        log: {},
        dependencies:	{}
    };
    rh.adsData = {
        out1	: 		{	x: "div-gpt-ad-x100",
            xx: "x100",
            oneSize:						[[1, 1]]	},
        out2	: 		{	x: "div-gpt-ad-x108",
            xx: "x108",
            oneSize: 						[[1, 1]]	},
        wide1	: 	{	x: "div-gpt-ad-x101",
            xx: "x101",
            desktop: 	{oneSize:		[[728,90],[970,250],[990,90]]	},
            tablet: 		{oneSize:		[[728,90]]	},
            mobile:		{oneSize:		[[300,50],[320,50],[320,100]]	}	},
        wide2	: 	{	x: "div-gpt-ad-x105",
            xx: "x105",
            desktop: 	{oneSize:		[[728,90]]		},
            tablet: 		{oneSize:		[[728,90]]		}	},
        wide3	: 	{	x: "div-gpt-ad-x107",
            xx: "x107",
            mobile: 	{oneSize:		[[300,250],[300,50],[320,50],[320,100]]	}	},
        box1	: 	{	x: "div-gpt-ad-x102",
            xx: "x102",
            desktop: {
                homepage:				[[300,250],[300,600],[160,600],[300,1050]],
                index:						[[300,250],[300,600],[160,600],[300,1050]],
                article:						[[300,250],[300,600],[160,600]],
                tag:							[[300,250],[300,600],[160,600]],
                search:						[[300,250],[300,600],[160,600]],
                photos:					[[300, 250]],
                "ss-category" : 		[[300,250],[970,250]],
                "ct-ss-category":		[[300,250],[970,250],[728,90]],
                "ss-hub" : 				[[300, 250]]	},
            tablet: {
                homepage:				[[300,250]],
                index:						[[300,250]],
                article:						[[300,250],[750,250]],
                tag:							[[300,250],[750,250]],
                search:						[[300,250],[750,250]],
                photos:					[[300, 250]],
                "ss-category" : 		[[300,250],[970,250]],
                "ct-ss-category":		[[300,250],[970,250],[728,90]],
                "ss-hub" : 				[[300,250]]	},
            mobile: 	{oneSize : 	[[300,250]]}	},
        box2	: 	{	x: "div-gpt-ad-x103",
            xx: "x103",
            desktop: {
                homepage:				[[300,250],[300,600],[160,600]],
                index:						[[300,250],[300,600],[160,600]],
                article:						[[300,250],[300,600],[160,600]],
                photos:					[[300, 250]],
                "ss-category" : 		[[300,250],[970,250]],
                "ct-ss-category":		[[300,250],[970,250],[728,90]],
                "ss-hub" : 				[[300,250]]	},
            tablet: {
                homepage:				[[300,250]],
                index:						[[300,250]],
                article:						[[300,250],[750,250]],
                photos:					[[300, 250]],
                "ss-category" : 		[[300,250],[970,250]],
                "ct-ss-category":		[[300,250],[970,250],[728,90]]	}},
        box3	: 	{	x: "div-gpt-ad-x104",
            xx: "x104",
            desktop: {
                homepage:				[[300,250],[300,600],[160,600]],
                index:						[[300,250],[300,600],[160,600]],
                article:						[[300,250],[300,600],[160,600]],
                photos:					[[300, 250]],
                "ss-category" : 		[[300,250],[970,250]],
                "ct-ss-category":		[[300,250],[970,250],[728,90]],
                "ss-hub" : 				[[300,250]]	},
            tablet: {
                homepage:				[[300,250]],
                index:						[[300,250]],
                article:						[[300,250],[750,250]	],
                photos:					[[300, 250]],
                "ss-category" : 		[[300,250],[970,250]],
                "ct-ss-category":		[[300,250],[970,250],[728,90]],
                "ss-hub" : 				[[300,250]]	}							}
    };
    rh.ads.initialize = function() {
        console.log("nydn 🎯  rh.ads.initialize");
        //nydn.bidder.replace("openx","openxLite");
        nydn.section = nydn.section.toLowerCase();
        nydn.subsection = nydn.subsection.toLowerCase();
        nydn.qa = (nydn.domain.indexOf("wwwqa")>-1 || nydn.domain.indexOf("mockups")>-1) ? "true" : "false";
        switch(nydn.section){
            case "interactive":
            case "writers":
            case "sponsor":
                rh.initializeAfterAds();
                return;
            case "autos":
                nydnRequires([nydn.urls.autos], function(util) {
                    autos.jumpstart.initialize();
                });
                break;
            default:
                if (nydn.bidder.contains("dfp")) {
                    rh.ads.setBidders();
                switch (rh.platform) {
                    case "mobile":
                        rh.ads.dfp.removeUnusedAds();
                        rh.ads.dependencies.mobile();
                        if (nydn.bidder.contains("yieldbot")) {
                            rh.ads.yieldbot.download();
                            rh.ads.dependencies.download();
                        }
                        break;
                    case "tablet":
                        rh.ads.dfp.moveinContent();
                    case "desktop":
                        rh.ads.dependencies.notMobile();
                        rh.ads.dependencies.download();
                        break;
                };
            }
        }
    };
    rh.ads.setBidders = function(){
        // replace with filter
        nydn.bidder.remove("");		//safety net for empty elements.
        if (rh.platform!="mobile") {
            rh.todo.amazon =  				(nydn.bidder.contains("amazon"))  ? true : false;
            rh.todo.openx =  					(nydn.bidder.contains("openx"))  ? true : false;
            rh.todo.openxLite =  			(nydn.bidder.contains("openxLite"))  ? true : false;
            rh.todo.sonobi =  				(nydn.bidder.contains("sonobi"))  ? true : false;
            rh.todo.indexExchange =  	(nydn.bidder.contains("indexExchange"))  ? true : false;
            nydn.bidder.remove("yieldbot");
        };
        if (!rh.todo.amazon 				|| rh.platform=="mobile") 	nydn.bidder.remove("amazon");
        if (!rh.todo.openx 				|| rh.platform=="mobile") 	nydn.bidder.remove("openx");
        if (!rh.todo.openxLite 			|| rh.platform=="mobile") 	nydn.bidder.remove("openxLite");
        if (!rh.todo.sonobi 				|| rh.platform=="mobile") 	nydn.bidder.remove("sonobi");
        if (!rh.todo.indexExchange 	|| rh.platform=="mobile") 	nydn.bidder.remove("indexExchange");
        console.log("nydn 🎯  rh.ads.setBidders "+nydn.bidder);
    };
    rh.ads.dependencies.notMobile = function() {
        console.log("nydn 🎯  rh.ads.dependencies.notMobile");
        rh.ads.dfp.waitingList.push(rh.ads.dfp.url);
        if (nydn.bidder.contains("optimera")) {
            rh.ads.optimera.getURL();
        }
        if (nydn.bidder.contains("lotame")) {
            rh.ads.lotame.download();
        }
        //if (nydn.bidder.contains("amazon")) rh.ads.dfp.waitingList.push(rh.ads.amazon.url);
        if (nydn.bidder.contains("amazon")) {
            rh.ads.amazon.apstag.prep();
            rh.ads.dfp.waitingList.push(rh.ads.amazon.apstag.url);
        }
        if (nydn.bidder.contains("indexExchange")) {
            rh.ads.dfp.waitingList.push(rh.ads.indexExchange.url);
        }
        if (nydn.bidder.contains("sonobi")) {
            rh.ads.dfp.waitingList.push(rh.ads.sonobi.url);
            if (nydn.bidder.contains("openx")) {
                rh.ads.openx.waitingList.push(rh.ads.sonobi.url);
            }
// 		if (nydn.bidder.contains("openxLite")) rh.ads.openx.lite.waitingList.push(rh.ads.sonobi.url);
        }
        if (nydn.bidder.contains("openx"))		{
            rh.ads.dfp.waitingList.push(rh.ads.openx.url);
        }
        if (nydn.bidder.contains("openxLite"))	{
            rh.ads.openx.lite.waitingList.push(rh.ads.dfp.url);
        }

        //if (nydn.bidder.contains("amazon")) rh.ads.amazon.download();
        if (nydn.bidder.contains("sonobi")) 		{
            rh.ads.sonobi.download();
        }
        if (nydn.bidder.contains("indexExchange")) {
            rh.ads.indexExchange.download();
        }
        if (nydn.bidder.contains("openxLite")) {
            rh.ads.openx.lite.download();
        }
        if (nydn.bidder.contains("openx")) {
            rh.ads.openx.download();
        }
        else {
            var googletag = googletag || {};
            googletag.cmd = googletag.cmd || [];
        }
    };
    rh.ads.dependencies.mobile = function() {
        console.log("nydn 🎯  rh.ads.dependencies.mobile");
        rh.ads.dfp.waitingList.push(rh.ads.dfp.url);
        if (nydn.bidder.contains("optimera")) {
            rh.ads.optimera.getURL();
        }
        if (nydn.bidder.contains("lotame")) {
            rh.ads.lotame.download();
        }
        if (nydn.bidder.contains("yieldbot")) {
            rh.ads.dfp.waitingList.push(rh.ads.yieldbot.url);
            rh.ads.yieldbot.waitingList.push(rh.ads.yieldbot.url);
        }
    };
    rh.ads.dependencies.downloaded = false;
    rh.ads.dependencies.download = function() {
        console.log("nydn 🎯  rh.ads.dependencies.download dfp.waitingList"+rh.ads.dfp.waitingList);
        if (!rh.ads.dependencies.downloaded)
            nydnRequires(rh.ads.dfp.waitingList, function(util) {
                rh.ads.dependencies.downloaded = true;
                rh.ads.dfp.videos();
                switch (rh.platform) {
                    case "desktop":
                    case "tablet":
                        rh.ads.dfp.notMobile();
                        break;
                    case "mobile":
                        if (nydn.bidder.contains("yieldbot")) rh.ads.yieldbot.exe();	//will run rh.ads.dfp.mobile() inside
                    else rh.ads.dfp.mobile();
                        break;
                }
            });
    };
    rh.ads.afterRefresh = function(){
        console.log("nydn 🎯  rh.ads.afterRefresh");
        switch (nydn.template){
            case "article":
            case "ymm":
                nydnRequires([nydn.urls.ra], function(util) {
                    ra.initializeAfterAds();
                });
                break;
            case "homepage":
            case "index":
                nydnRequires([nydn.urls.rhp], function(util) {
                    rhp.initializeAfterAds();
                });
                break;
            case "photos":
                rh.initializeAfterAds();
                break;
            case "ss-hub":
            case "ss-category":
                nydnRequires([nydn.urls.rss], function(util) {
                    rss.initializeAfterAds();
                });
                break;
            case "search":
            case "tag":
                nydnRequires([nydn.urls.tag], function(util) {
                    rtag.initializeAfterAds();
                });
                break;
            default:
                rh.initializeAfterAds();
        }
    };
}
//DFP
{
    rh.ads.dfp = {};
    rh.ads.dfp.url = "http://www.googletagservices.com/tag/js/gpt.js";
    rh.ads.dfp.video = false;
    rh.ads.dfp.waitingList = [];
    rh.ads.dfp.checkList = {trials:0, done: 0, bidder : {}};
    rh.ads.dfp.defineSlotStr = "4692832/";
    rh.ads.dfp.defineAd = function(rhpAdTag, rhpAdX, rhpAdSizeArray) {
        var refreshOnScroll = false; //not used
        rhpAdSizeArray = rh.ads.dfp.contentstudio(rhpAdX, rhpAdSizeArray);
        if (!!document.getElementById(rhpAdX) && !!rhpAdSizeArray)	{
            switch(rhpAdX){
                case		"adBrandPov":
                    rhpAdTag = googletag
                        .defineSlot(rh.ads.dfp.defineSlotStr, rhpAdSizeArray,  rhpAdX)
                        .addService(googletag.pubads())
                        .setTargeting("ntve", 		"bpov")
                        .setTargeting("position", "adBrandPov")
                        .setTargeting("Conpos",	nydn.content + "-" + "adBrandPov");
                    break;
                case 	"div-gpt-ad-x100":
                    rhpAdTag = googletag
                        .defineOutOfPageSlot(rh.ads.dfp.defineSlotStr,  rhpAdX)
                        .addService(googletag.pubads())
                        .setTargeting("Conpos", nydn.content + "-" + rhpAdX.slice(11))
                        .setTargeting("position", rhpAdX.slice(11))
                    break;
                default	:
                    if (rhpAdX=="div-gpt-ad-x107" && (nydn.adWide3 != "x107" || nydn.template!="homepage"))	return rhpAdTag;
                    if (rhpAdX=="div-gpt-ad-x108"&&nydn.adOut2 != "x108") 	return rhpAdTag;
                    rhpAdTag = googletag.defineSlot(rh.ads.dfp.defineSlotStr, rhpAdSizeArray,  rhpAdX)
                        .addService(googletag.pubads())
                        .setTargeting("Conpos", nydn.content + "-" + rhpAdX.slice(11))
                        .setTargeting("position", rhpAdX.slice(11));
            }
            rhpAdTag.nydnDivID = rhpAdX;
            rh.ads.log[rhpAdX] = {};
            rh.ads.log[rhpAdX].sizes = rhpAdSizeArray;
            rh.ads.log[rhpAdX].Conpos = nydn.content + "-" + rhpAdX.slice(11);
            rhAdArr.push(rhpAdTag);
            rhAdArr2.push(rhpAdX);
            console.log("nydn 🎯  rh.ads.defineAd "+rhpAdX+" ✓");
        }
        return rhpAdTag;
    };
    rh.ads.dfp.videos = function(){
        rh.ads.dfp.video =  (!!document.querySelectorAll("#ra-main .r-video").length)  ? "true" : "false";
    };
    rh.ads.dfp.contentstudio = function(rhpAdX,	rhpAdSizeArray){
        if ( nydn.section == "contentstudio" && nydn.template=="ss-category" && rh.platform!="mobile" &&	(rhpAdX=="div-gpt-ad-x102"||rhpAdX=="div-gpt-ad-x103"||rhpAdX=="div-gpt-ad-x104"))
            rhpAdSizeArray = rh.adsData.box1	[rh.platform]["ct-ss-category"];
        return rhpAdSizeArray;
    };
    rh.ads.dfp.notMobile = function() {
        console.log("nydn 🎯  rh.ads.dfp.notMobile");
        rh.ads.log.defineSlot = rh.ads.dfp.defineSlotStr = rh.ads.targetPath;
        googletag.cmd.push(function() {
            rh.adsOut1 		= 	rh.ads.dfp.defineAd(	rh.adsOut1,	 	rh.adsData.out1.x,		rh.adsData.out1.oneSize);
            rh.adsWide1	=	rh.ads.dfp.defineAd(	rh.adsWide1,	rh.adsData.wide1.x,	rh.adsData.wide1[rh.platform].oneSize);
            rh.adsBox1		= 	rh.ads.dfp.defineAd(	rh.adsBox1, 	rh.adsData.box1.x,		rh.adsData.box1	[rh.platform][nydn.template]);
            rh.adsBox2		= 	rh.ads.dfp.defineAd(	rh.adsBox2, 	rh.adsData.box2.x,		rh.adsData.box2	[rh.platform][nydn.template]);
            rh.adsBox3		= 	rh.ads.dfp.defineAd(	rh.adsBox3, 	rh.adsData.box3.x,		rh.adsData.box3	[rh.platform][nydn.template]);
            rh.adsWide2	=	rh.ads.dfp.defineAd(	rh.adsWide2,	rh.adsData.wide2.x,	rh.adsData.wide2[rh.platform].oneSize);
            rh.adsOut2 		= 	rh.ads.dfp.defineAd(	rh.adsOut2,	 	rh.adsData.out2.x,		rh.adsData.out2.oneSize);

            rh.ads.dfp.afterDefine1();
            rh.ads.dfp.afterDefine2();
            rh.ads.dfp.refreshNotMobile();
        });
    };
    rh.ads.dfp.mobile = function() {
        console.log("nydn 🎯  rh.ads.dfp.mobile");
        rh.ads.dfp.defineSlotStr = rh.ads.targetPathM;
        googletag.cmd.push(function() {
            rh.adsOut1 		= 	rh.ads.dfp.defineAd(	rh.adsOut1,	 	rh.adsData.out1.x,		rh.adsData.out1.oneSize);
            rh.adsWide3	=	rh.ads.dfp.defineAd(	rh.adsWide3,	rh.adsData.wide3.x,	rh.adsData.wide3[rh.platform].oneSize);
            rh.adsWide1	=	rh.ads.dfp.defineAd(	rh.adsWide1,	rh.adsData.wide1.x,	rh.adsData.wide1[rh.platform].oneSize);
            if(nydn.template=="ss-category" || nydn.template=="ss-hub")
                rh.adsBox1		= 	rh.ads.dfp.defineAd(	rh.adsBox1, 	rh.adsData.box1.x,		rh.adsData.box1	[rh.platform].oneSize);
            rh.adsOut2 		= 	rh.ads.dfp.defineAd(	rh.adsOut2,	 	rh.adsData.out2.x,		rh.adsData.out2.oneSize);

            rh.ads.dfp.afterDefine1();
            rh.ads.dfp.yieldbot();
            rh.ads.dfp.afterDefine2();
            rh.ads.dfp.refreshMobile();
            rh.ads.dfp.refreshMobile2();
            rh.ads.dfp.scroll();
        });
    };
    rh.ads.dfp.afterDefine1 = function(){
        console.log("nydn 🎯  rh.ads.dfp.afterDefine1");
        if (nydn.bidder.contains("optimera")) {
            rh.ads.dfp.waitingList.push(nydn.urls.optimera);
            rh.ads.optimera.setup();
            rh.ads.optimera.download();
        }
        if (rh.platform!=="mobile"){
            //if (nydn.bidder.contains("amazon")) rh.ads.amazon.exe();
            if (nydn.bidder.contains("amazon")) rh.ads.amazon.apstag.download();
            if (nydn.bidder.contains("sonobi"))  rh.ads.sonobi.setup();
            if (nydn.bidder.contains("openxLite")) rh.ads.openx.lite.initialize();
            if (nydn.bidder.contains("indexExchange")) rh.ads.indexExchange.exe();
        }
    };
    rh.ads.dfp.yieldbot = function(){
        console.log("nydn 🎯  rh.ads.dfp.yieldbot");
        if (nydn.bidder.contains("yieldbot")) {
            googletag.pubads().setTargeting("ybot", yieldbot.getPageCriteria());
            rh.ads.dfp.checkList.bidder["yieldbot"] = true;
            rh.ads.dfp.checkList.done +=1;
            console.log("nydn 🎯  rh.ads.dfp.yieldbot DONE");
            console.log("nydn 🎯  rh.ads.dfp.yieldbot ✓");
            rh.ads.log.yieldbot = true;
        }
    };
    rh.ads.dfp.afterDefine2 = function(){
        console.log("nydn 🎯  rh.ads.dfp.afterDefine2");
        rh.ads.dfp.targeting();
        rh.ads.dfp.referring();
        rh.ads.dfp.enabling();
    };
    rh.ads.dfp.targeting = function() {
        console.log("nydn 🎯  rh.ads.dfp.targeting");
        var currentLocation = location.protocol + location.host + location.pathname;
        googletag.pubads()
            .setTargeting("Content", nydn.content)
            .setTargeting("Package", nydn.packageName)
            .setTargeting("ContentID", nydn.contentID)
            .setTargeting("video", rh.ads.dfp.video)
            .setTargeting("nsfa", nydn.nsfa)
            .setTargeting("testAd", nydn.testAd)
            .setTargeting("flexKey", nydn.flexKey)
            .setTargeting("viewport", rh.platform)
            .setTargeting("page_url", currentLocation);

        if (nydn.qa=="true") googletag.pubads().setTargeting("qa", nydn.qa);
        if (nydn.bidder.contains("optimera"))  rh.ads.optimera.targeting();
        if (nydn.bidder.contains("lotame")) rh.ads.lotame.setTargeting();
        if (nydn.bidder.contains("openxLite")) rh.ads.openx.lite.setTargeting();
        if (nydn.hasOwnProperty("flexName") && nydn.hasOwnProperty("flexValue"))
            googletag.pubads().setTargeting(nydn.flexName, nydn.flexValue);
        if (nydn.hasOwnProperty("newswire") && nydn.newswire !== "") googletag.pubads().setTargeting("newswire", nydn.newswire);
        rh.ads.log.Bidders = nydn.bidder;
        rh.ads.log.Content = nydn.content;
        rh.ads.log.Package = nydn.packageName;
        rh.ads.log.ContentID = nydn.contentID;
        rh.ads.log.video = rh.ads.dfp.video;
        rh.ads.log.nsfa = nydn.nsfa;
        rh.ads.log.testAd = nydn.testAd;
        rh.ads.log.ccaud = cc_client_id;
        rh.ads.log.viewport =  rh.platform;
        rh.ads.log.qa = nydn.qa;
        if (nydn.hasOwnProperty("flexName") && nydn.hasOwnProperty("flexValue"))	rh.ads.log[nydn.flexName] = nydn.flexValue;

    };


    rh.ads.dfp.referring = function() {
        console.log("nydn 🎯  rh.ads.dfp.referring");
        if (document.referrer) {
            var vm_referer_url = document.referrer;
            var vm_referer = vm_referer_url.match(/(google|yahoo|bing|live|msn|twitter|facebook)\./);
            if (vm_referer && vm_referer[1]) {
                googletag.pubads().setTargeting("referrer", vm_referer[1]);
                rh.ads.log.referrer = vm_referer[1];
            }
        }
    };
    rh.ads.dfp.enabling = function() {
        console.log("nydn 🎯  rh.ads.dfp.enabling");
        googletag.pubads().enableAsyncRendering();
        googletag.pubads().enableSingleRequest();
        googletag.pubads().disableInitialLoad();
        googletag.enableServices();
    };
    rh.ads.dfp.moveinContent = function(){
        console.log("nydn 🎯  rh.ads.dfp.moveinContent");
        switch (nydn.template){
            case "homepage": 			rh.ads.dfp.moveinContentHP();			break;
            case "index": 				rh.ads.dfp.moveinContentIndex();		break;
            case "tag":
            case "search":
            case "ymm":
            case "article":				rh.ads.dfp.moveinContentArticle();		break;
            case "ss-hub":				rh.ads.dfp.moveinContentHub();			break;
        }
    };


    rh.ads.dfp.moveinContentHP = function(){


        // console.log("****************");
        // console.log("****************");
        // console.log("****************");
        // console.log("****************");
        console.log("nydn 🎯  rh.ads.dfp.moveinContentHP");

        var hpMain = document.querySelector('.hp-main'); //MAIN
        var hpMainAd = hpMain.querySelector('.r-ad'); //THE AD TO BE MOVED



        // HP-TOP MODULE
        if ( !!document.querySelector(".hp-top") ){
            var hpTop = document.querySelector(".hp-top"); //TOP
            var hpAd = hpTop.querySelector('.hp-ad');  //TOP SECTION AD CONTAINER
            hpAd.insertAdjacentHTML("beforeend", hpMainAd.outerHTML);
            hpMainAd.parentNode.removeChild(hpMainAd);
        }


        // DOOMSDAY MODULE
        if ( !!document.querySelector(".hp-doom") ){
            var hpDoom = document.querySelector(".hp-doom"); //DOOM
            var hpDoomAd = hpDoom.querySelector('.hp-ad');  //DOOMSDAY SECTION AD CONTAINER

            hpDoomAd.insertAdjacentHTML("beforeend", hpMainAd.outerHTML);
            hpMainAd.parentNode.removeChild(hpMainAd);
        }

        var rcAds = [];
        var rcs = document.querySelectorAll(".rc.c1, .rc.c1-c2-c2");
        for (var i=0; 		i<rcs.length		&&	!!rcs[i].parentNode.parentNode.querySelector(".r-ad") && !!rcs[i].querySelectorAll(".rt")[1];		i++){
            rcAds.push(rcs[i].parentNode.parentNode.querySelector(".r-ad"));
            rcs[i].querySelectorAll(".rt")[1].insertAdjacentHTML("afterend",rcAds[i].outerHTML);
            rcAds[i].parentNode.removeChild(rcAds[i]);
        }




    };


    rh.ads.dfp.moveinContentIndex = function(){
        var rcAds = [];
        var rcs = document.querySelectorAll(".rc.c1, .rc.c1-c2-c2");
        for (var i=0; 		i<rcs.length		&&	!!rcs[i].parentNode.parentNode.querySelector(".r-ad") && !!rcs[i].querySelectorAll(".rt")[1];		i++){
            rcAds.push(rcs[i].parentNode.parentNode.querySelector(".r-ad"));
            rcs[i].querySelectorAll(".rt")[1].insertAdjacentHTML("afterend",rcAds[i].outerHTML);
            rcAds[i].parentNode.removeChild(rcAds[i]);
        }
    };


    rh.ads.dfp.moveinContentArticle = function(){
        var	jAd1x =	document.getElementById(rh.adsData.box1.x).parentNode,
            jAd2x = 	document.getElementById(rh.adsData.box2.x).parentNode,
            jAd3x =	document.getElementById(rh.adsData.box3.x).parentNode;
        var raParagraphs = document.querySelectorAll('#ra-body>p, #ra-body>ul');
        if (!!raParagraphs.length && !!jAd1x && !!jAd2x){
            if (raParagraphs.length >= nydn.inContentPositionAd1){
                raParagraphs[nydn.inContentPositionAd1-1].insertAdjacentHTML('afterend', jAd1x.outerHTML);
                console.log("nydn 🎯   rh.ads.dfp.moveinContent moved"+rh.adsData.box1.x);
            }
            jAd1x.parentNode.parentNode.removeChild(jAd1x.parentNode);
            if (raParagraphs.length >= nydn.inContentPositionAd2){
                raParagraphs[nydn.inContentPositionAd2-1].insertAdjacentHTML('afterend', jAd2x.outerHTML);
                console.log("nydn 🎯   rh.ads.dfp.moveinContent moved"+rh.adsData.box2.x);
            }
            jAd2x.parentNode.parentNode.removeChild(jAd2x.parentNode);
            jAd3x.parentNode.parentNode.removeChild(jAd3x.parentNode);
            console.log("nydn 🎯   rh.ads.dfp.moveinContent hid "+rh.adsData.box3.x);
        }
    };
    rh.ads.dfp.moveinContentHub = function(){
        var	jAd2x =document.getElementById(rh.adsData.box2.x).parentNode;
        jAd2x.parentNode.parentNode.removeChild(jAd2x.parentNode);
        console.log("nydn 🎯   rh.ads.dfp.moveinContent hid "+rh.adsData.box2.x);
    };
    rh.ads.dfp.removeUnusedAds = function(){
        console.log("nydn 🎯   rh.ads.dfp.removeUnusedAds");
        switch (nydn.template){
            case "article":
            case "ymm":
                var adDivs = document.querySelectorAll("#ra-right .ra-ad");
                adDivs.forEach(function(adDiv){
                    adDiv.parentNode.parentNode.removeChild(adDiv.parentNode);
                });
                break;
            case "photos":
                var	jAd2x = 	document.getElementById(rh.adsData.box1.x).parentNode.parentNode.parentNode,
                jAd3x =	document.getElementById(rh.adsData.box2.x).parentNode.parentNode.parentNode,
                jAd4x =	document.getElementById(rh.adsData.box3.x).parentNode.parentNode.parentNode;
                jAd2x.parentNode.removeChild(jAd2x);
                jAd3x.parentNode.removeChild(jAd3x);
                jAd4x.parentNode.removeChild(jAd4x);
                console.log("nydn 🎯   rh.ads.dfp.removeUnusedAds hid "+rh.adsData.box1.x);
                console.log("nydn 🎯   rh.ads.dfp.removeUnusedAds hid "+rh.adsData.box2.x);
                console.log("nydn 🎯   rh.ads.dfp.removeUnusedAds hid "+rh.adsData.box3.x);
                break;
            case "ss-category":
            case "ss-hub":
                var	jAd2x = 	document.getElementById(rh.adsData.box2.x).parentNode,
                jAd3x =	document.getElementById(rh.adsData.box3.x).parentNode,
                jAd5x =	document.getElementById(rh.adsData.wide2.x).parentNode;
                jAd2x.parentNode.parentNode.removeChild(jAd2x.parentNode);
                jAd3x.parentNode.parentNode.removeChild(jAd3x.parentNode);
                jAd5x.parentNode.parentNode.removeChild(jAd5x.parentNode);
                console.log("nydn 🎯   rh.ads.dfp.removeUnusedAds hid "+rh.adsData.box2.x);
                console.log("nydn 🎯   rh.ads.dfp.removeUnusedAds hid "+rh.adsData.box3.x);
                console.log("nydn 🎯   rh.ads.dfp.removeUnusedAds hid "+rh.adsData.wide2.x);
                break;
        }
    };
    rh.ads.dfp.refreshNotMobile = function() {
        console.log("nydn 🎯  rh.ads.dfp.refreshNotMobile");
        rh.ads.dfp.display();
        rh.ads.dfp.refresh();
        rh.stickyAd.initialize();
    };
    rh.ads.dfp.refreshMobile = function() {
        console.log("nydn 🎯  rh.ads.dfp.refreshMobile");
        nydnRequires([rh.ads.yieldbot.url], function(util) {
            try {	googletag.pubads().setTargeting("ybot", yieldbot.getPageCriteria());	}
            catch (e) {  }
            ybotq.push(function() {
                rh.ads.dfp.display();
                rh.ads.dfp.refresh();
            });
            rh.stickyAd.initialize();
        });
    };
    rh.ads.dfp.refreshMobile2 = function() {
        if (nydn.refreshMobile > 0) {
            setInterval(function() {
                console.log("nydn 🎯  rh.ads.dfp.refreshMobile2");
                rhAdArr[1].setTargeting("refreshed", true);
                try {
                    googletag.pubads().setTargeting("ybot", yieldbot.getPageCriteria());
                } catch (a) {}
                nydnRequires(rh.ads.yieldbot.waitingList, function(b) {
                    console.log("nydn 🎯  rh.ads.dfp.refresh " + rhAdArr2[1]);
                    googletag.pubads().refresh([rhAdArr[1]]);
                });
            }, nydn.refreshMobile);
        }
    };
    rh.ads.dfp.display = function(){
        googletag.cmd.push(function() {
            rhAdArr2.forEach(function(rhAdx){
                googletag.display(rhAdx);
                console.log("nydn 🎯  rh.ads.dfp.display " + rhAdx);
            });
        });
    };
    rh.ads.dfp.refreshed = false;
    rh.ads.dfp.refresh = function(){
        if (!rh.ads.dfp.refreshed)
            nydnRequires(rh.ads.dfp.waitingList, function(util) {
                console.log("nydn 🎯  rh.ads.dfp.refresh waitingList "+rh.ads.dfp.waitingList);
                var noOfBidders = Object.keys(rh.ads.dfp.checkList.bidder).length;
                var checkBidders = setInterval(function(){
                    ++rh.ads.dfp.checkList.trials;
                    console.log("nydn 🎯  rh.ads.dfp.refresh trial: "+rh.ads.dfp.checkList.trials+" done: "+rh.ads.dfp.checkList.done+" out of: "+(rh.ads.dfp.waitingList.length)+" "+JSON.stringify(rh.ads.dfp.checkList.bidder));
                    if(rh.ads.dfp.checkList.done >= (rh.ads.dfp.waitingList.length))  {
                        clearInterval(checkBidders);
                        googletag.cmd.push(function() {
                            if (nydn.bidder.contains("amazon") && rh.platform!=="mobile") rh.ads.amazon.apstag.setDisplayBids();
                            googletag.pubads().refresh(rhAdArr);
                        });
                        rhAdArr2.forEach(function(rhAdx){
                            console.log("nydn 🎯  rh.ads.dfp.refresh 💰💰💰 " +rhAdx);
                        });
                        rh.ads.afterRefresh();
                        rh.ads.dfp.refreshed = true;
                    }
                    else if (rh.ads.dfp.checkList.trials > 6){
                        console.log("nydn 🎯  rh.ads.dfp.refresh FAIL after trial: "+rh.ads.dfp.checkList.trials+" done: "+rh.ads.dfp.checkList.done+" out of: "+(rh.ads.dfp.waitingList.length)+" "+JSON.stringify(rh.ads.dfp.checkList.bidder));
                        clearInterval(checkBidders);
                        googletag.cmd.push(function() {
                            if (nydn.bidder.contains("amazon")) rh.ads.amazon.apstag.setDisplayBids();
                            googletag.pubads().refresh(rhAdArr);
                        });
                        rhAdArr2.forEach(function(rhAdx){
                            console.log("nydn 🎯  rh.ads.dfp.refresh 💰💰💰 " +rhAdx);
                        });
                        rh.ads.afterRefresh();
                        rh.ads.dfp.refreshed = true;
                    }
                    else {
                        console.log("nydn 🎯  rh.ads.dfp.refresh trial: "+rh.ads.dfp.checkList.trials+" done: "+rh.ads.dfp.checkList.done+" out of: "+(rh.ads.dfp.waitingList.length)+" "+JSON.stringify(rh.ads.dfp.checkList.bidder));
                    }
                }, 10);
            });
    };
    rh.ads.dfp.scrolled = false;
    rh.ads.dfp.scroll = function(){
        console.log("nydn 🎯  rh.ads.dfp.scroll");
        if (rh.platform=="mobile" && nydn.adWide3=="x107" && nydn.template=="homepage") {
            nydnRequires([nydn.urls.nydnQuery], function(util) {
                $(window).scroll(function() {
                    if (!rh.ads.dfp.scrolled && $(window).scrollTop()  > 400) {
                        rh.ads.dfp.scrolled = true;
                        $("#rh .rh-ad").stop().animate({ bottom:'+=100px' },300);
                        console.log("nydn 🎯  rh.ads.dfp.scroll display x107");
                    }
                });
            });
        }
    };
}
//YIELDBOT
function ybWidth() {
    var w = window,
        d = document,
        e = d.documentElement,
        x = Math.max(e.scrollWidth, e.offsetWidth, e.clientWidth);
    return x;
}
{
    var ybotq = ybotq || [];
    rh.ads.yieldbot = {};
    rh.ads.yieldbot.url = "http://cdn.yldbt.com/js/yieldbot.intent.js";
    rh.ads.yieldbot.waitingList = [];
    rh.ads.yieldbot.download = function() {
        nydnRequires([rh.ads.yieldbot.url], function(util) {
            console.log("nydn 🎯  rh.ads.yieldbot.download ✓");
            ybotq = ybotq || [];
            ybotq.push(function() {
                if (ybWidth() <= 481) {
                    yieldbot.pub("72cd"); //mobile
                    yieldbot.defineSlot("MLB");
                }
                yieldbot.enableAsync();
                yieldbot.go();
            });
        });
    };
    rh.ads.yieldbot.exe = function() {
        console.log("nydn function: rh.ads.yieldbot.exe ");
        ybotq.push(function() {
            rh.ads.dfp.mobile();
        });
    };
}
//AMAZON OLD
{
    rh.ads.amazon = {};
    rh.ads.amazon.url = "http://c.amazon-adsystem.com/aax2/amzn_ads.js";
    rh.ads.amazon.download = function() {
        nydnRequires([rh.ads.amazon.url], function(util) {
            console.log("nydn 🎯  rh.ads.amazon.download ✓");
            try {
                amznads.getAdsCallback('3088', function ()
                    { amznads.setTargetingForGPTAsync('amznslots'); }
                );
                rh.ads.dfp.checkList.bidder["amazon"] = true;
                rh.ads.dfp.checkList.done +=1;
                console.log("nydn 🎯  rh.ads.amazon.getAdsCallback DONE");
                console.log("nydn 🎯  rh.ads.amazon.getAdsCallback ✓");
            } catch (e) {
                rh.ads.dfp.checkList.bidder["amazon"] = false;
                rh.ads.dfp.checkList.done +=1;
                console.log("nydn 🎯  rh.ads.amazon.getAdsCallback DONE");
                console.log("nydn 🎯  rh.ads.amazon.getAdsCallback FAIL");
            }
        });
    };
    rh.ads.amazon.exe = function() {
        nydnRequires([rh.ads.dfp.url, rh.ads.amazon.url], function(util) {
            console.log("nydn 🎯  rh.ads.amazon.exe");
            try {
                amznads.setTargetingForGPTAsync('amznslots');
                console.log("nydn 🎯  rh.ads.amazon.exe ✓");
            } catch (e) {
                console.log("nydn 🎯  rh.ads.amazon.exe FAIL");
            }
        });
    };
}
{
    rh.ads.amazon.apstag = {};
    rh.ads.amazon.apstag.url = "http://c.amazon-adsystem.com/aax2/apstag.js"
    rh.ads.amazon.apstag.prep = function() {
        !function(a9,a,p,s,t,A,g){
            console.log("nydn 🎯  rh.ads.amazon.apstag.prep",a9,a,p,s,t,A,g);
            if(a[a9])		return;
            function q(c,r){
                a[a9]._Q.push([c,r])
            }
            a[a9]={
                init:function(){	q("i",arguments)},
                fetchBids:function(){	q("f",arguments)},
                setDisplayBids:function(){},
                _Q:[]
            };
        }("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");
        console.log("nydn 🎯  rh.ads.amazon.apstag.prep");
    };
    rh.ads.amazon.apstag.download = function() {
        nydnRequires([rh.ads.amazon.apstag.url], function(util) {
            console.log("nydn 🎯  rh.ads.amazon.apstag.download ✓");
            rh.ads.amazon.apstag.initialize();
        });
    };
    rh.ads.amazon.apstag.initialize = function() {
        nydnRequires([rh.ads.amazon.apstag.url], function(util) {
            console.log("nydn 🎯  rh.ads.amazon.apstag.initialize");
            apstag.init({
                pubID: '3088',
                adServer: 'googletag',
                bidTimeout: 2e3
            });
            rh.ads.amazon.apstag.fetchBids();
        });
    };
    var nydnSlots;
    rh.ads.amazon.apstag.fetchBids = function() {
        console.log("nydn 🎯  rh.ads.amazon.apstag.fetchBids");
        nydnSlots = [];
        var nydnSlot = {};
        rhAdArr2.forEach(function(rhAdx){
            console.log("nydn 🎯  rh.ads.amazon.apstag.fetchBids slotID "+rhAdx);
            console.log("nydn 🎯  rh.ads.amazon.apstag.fetchBids sizes "+rh.ads.log[rhAdx].sizes);
            nydnSlot = {
                slotID:rhAdx,
                sizes: rh.ads.log[rhAdx].sizes
            }
            nydnSlots.push(nydnSlot);
        });
        nydnSlots = nydnSlots;
        console.log("nydn 🎯  rh.ads.amazon.apstag.fetchBids slots "+JSON.stringify(nydnSlots));
        apstag.fetchBids(
            {
                slots		: 	nydnSlots
            },
            function(bids) {
                rh.ads.amazon.apstag.bids = bids;
                rh.ads.dfp.checkList.bidder["amazon"] = true;
                rh.ads.dfp.checkList.done +=1;
                console.log("nydn 🎯  rh.ads.amazon.apstag.fetchBids DONE");
                console.log("nydn 🎯  rh.ads.amazon.apstag.fetchBids bids "+JSON.stringify(bids));
            });
    };
    rh.ads.amazon.apstag.setDisplayBids = function() {
        var bid = rh.ads.amazon.apstag.bids;
        console.log("nydn 🎯  rh.ads.amazon.apstag.setDisplayBids bid= "+JSON.stringify(bid));
        apstag.setDisplayBids();
    };
}
//SONOBI
{
    rh.ads.sonobi = {};
    rh.ads.sonobi.url = "http://mtrx.go.sonobi.com/morpheus.nydailynews.6654.js";
    rh.ads.sonobi.waitingList = [];
    rh.ads.sonobi.download = function() {
        nydnRequires([rh.ads.sonobi.url], function(util) {
            console.log("nydn 🎯  rh.ads.sonobi.download ✓");
        });
    };
    rh.ads.sonobi.setup = function() {
        console.log("nydn 🎯  rh.ads.sonobi.setup");
        nydnRequires([rh.ads.dfp.url, rh.ads.sonobi.url], function(util) {
            console.log("nydn 🎯  rh.ads.sonobi.setup");
            var sonobiID;
            sbi_morpheus.enableReactiveSizes();
            rhAdArr2.forEach(function(rhAdx){
                if (rhAdx !=="div-gpt-ad-x100" && rhAdx!="div-gpt-ad-x108"){
                    switch(rhAdx){
                        case "div-gpt-ad-x107":
                        case "div-gpt-ad-x101": 	sonobiID = "b2d486d7815142a5d9b3";		break;
                        case "div-gpt-ad-x102": 	sonobiID = "ebfb261c83ba67a16a8e";		break;
                        case "div-gpt-ad-x103": 	sonobiID = "2f6922a90e5df1d3a720";		break;
                        case "div-gpt-ad-x104": 	sonobiID = "549ce0805e7b05cad523";		break;
                        case "div-gpt-ad-x105": 	sonobiID = "3372e220441848388d87";		break;
                    }
                    console.log("nydn 🎯  rh.ads.sonobi.register "+rhAdx+" "+sonobiID);
                    sbi_morpheus.register(rhAdx, sonobiID);
                }
            });
            rh.ads.dfp.checkList.bidder["sonobi"] = true;
            rh.ads.dfp.checkList.done +=1;
            console.log("nydn 🎯  rh.ads.sonobi.setup DONE");
            console.log("nydn 🎯  rh.ads.sonobi.setup ✓");
        });
    };
}
//OPENX
var timerStart = Date.now();
var oxhbjs;
var oxBidRequestPromise;
var bidderConfig = {};
{
    rh.ads.openx = {};
    rh.ads.openx.url = "http://ox-d.nydailynews.servedbyopenx.com/w/1.0/jstag?nc=4692832-NYDN";
    rh.ads.openx.waitingList = [];
    rh.ads.openx.download = function() {
        nydnRequires(rh.ads.openx.waitingList, function(util) {
            nydnRequires([rh.ads.openx.url], function(util) {
                rh.ads.dfp.checkList.bidder["openx"] = true;
                rh.ads.dfp.checkList.done +=1;
                console.log("nydn 🎯  rh.ads.openx.download DONE");
                console.log("nydn 🎯  rh.ads.openx.download ✓");
            });
        });
    };
}
//OPENX LITE
{
    rh.ads.openx.lite={};
    rh.ads.openx.lite.url = nydn.urls.openxLite;
    rh.ads.openx.lite.waitingList = [];
    rh.ads.openx.lite.adUnitIDs={
        "div-gpt-ad-x100":	"",
        "div-gpt-ad-x101":	538890646,
        "div-gpt-ad-x102":	538890647,
        "div-gpt-ad-x103":	538890648,
        "div-gpt-ad-x104":	538890649,
        "div-gpt-ad-x105":	538890650,
        "div-gpt-ad-x106":	"",
        "div-gpt-ad-x107":	"",
        "div-gpt-ad-x108":	""};
    rh.ads.openx.lite.bids;
    rh.ads.openx.lite.download = function() {
        nydnRequires(rh.ads.openx.lite.waitingList, function(util) {
            nydnRequires([rh.ads.openx.lite.url], function(util) {
                console.log("nydn 🎯  rh.ads.openx.lite.download ✓");
            });
        });
    };
    rh.ads.openx.lite.initialize = function() {
        nydnRequires([rh.ads.openx.lite.url], function(util) {
            console.log("nydn 🎯  rh.ads.openx.lite.initialize");
            var oxAdMappings = [];
            rhAdArr2.forEach(function(rhAdx){
                if (rh.ads.openx.lite.adUnitIDs[rhAdx] != "")
                    oxAdMappings.push({
                        type: 	'display',
                        divId: 	rhAdx,
                        adUnit:	rh.ads.dfp.defineSlotStr,
                        sizes: 	rh.ads.log[rhAdx].sizes,
                        oxAdUnitId: rh.ads.openx.lite.adUnitIDs[rhAdx]
                    });
            });
            bidderConfig={
                timeLimit: 			675,
                // 		deliveryDomain:	'nydailynews-d.openx.net',
// 			deliveryDomain: "oxdemo-d.openx.net",
                deliveryDomain: "nydailynews-d.openx.net",
                singleRequest:		false,
                adMappings:		oxAdMappings
            };
            oxhbjs = new HeaderBidder(bidderConfig);
            // Setup request based on adMappings in bidderConfig
            oxBidRequestPromise = oxhbjs.getBids();
            rh.ads.openx.lite.getBids();
        });
    };
    rh.ads.openx.lite.bids;
    rh.ads.openx.lite.gotBids = false;
    rh.ads.openx.lite.getBids = function() {
        oxBidRequestPromise.then(function (bids) {
            console.log("nydn 🎯  rh.ads.openx.lite.getBids bids "+JSON.stringify(bids));
            rh.ads.openx.lite.bids = bids;
            rh.ads.openx.lite.gotBids = true;
        });
    };
    rh.ads.openx.lite.setTargeting = function() {
        var checkOpenxBids = setInterval(function(){
            console.log("nydn 🎯  rh.ads.openx.lite.setTargeting bids "+JSON.stringify(rh.ads.openx.lite.bids));
            if (!!rh.ads.openx.lite.gotBids){
                clearInterval(checkOpenxBids);
                rhAdArr.forEach(function (rhAdx) {
                    if (rh.ads.openx.lite.adUnitIDs[rhAdx.nydnDivID] != ""){
                        console.log("nydn 🎯  rh.ads.openx.lite.setTargeting rhAdx: "+rhAdx.nydnDivID);
                        oxhbjs.setOxTargetingForGoogletagSlot(rhAdx, rh.ads.openx.lite.bids);
                    }
                });
                rh.ads.dfp.checkList.bidder["openx"] = true;
                rh.ads.dfp.checkList.done +=1;
                console.log("nydn 🎯  rh.ads.openx.lite.setTargeting DONE");
            }
            else{
            }
        }, 10);
    };

}
//INDEXEXCHANGE
{
    rh.ads.indexExchange = {};
    rh.ads.indexExchange.url = "http://js-sec.indexww.com/ht/nydn.js";
    rh.ads.indexExchange.download = function() {
        nydnRequires([rh.ads.indexExchange.url], function(a) {
            console.log("nydn 🎯  rh.ads.indexExchange.download ✓");
        });
    };
    rh.ads.indexExchange.exe = function() {
        nydnRequires([rh.ads.dfp.url, rh.ads.indexExchange.url], function(util) {
            console.log("nydn 🎯  rh.ads.indexExchange.exe");
            if (typeof indexapi !== 'undefined' && typeof indexapi.cygnus_args !== 'undefined' && typeof indexapi.cygnus_args.slots !== 'undefined') 	{
                rh.ads.dfp.checkList.bidder["indexExchange"] = true;
                console.log("nydn 🎯  rh.ads.indexExchange.exe ✓");
            }
            else {
                rh.ads.dfp.checkList.bidder["indexExchange"] = false;
                console.log("nydn 🎯  rh.ads.indexExchange.exe FAIL");
            }
            rh.ads.dfp.checkList.done +=1;
        });
    };
}
//LOTAME
var lotameData;
var dartCCKey = "ccaud";
var dartCC = "";
function ccauds(data) {
    console.log("nydn 🎯  rh.ads.lotame.ccauds");
    if (typeof(data) != 'undefined') {
        lotameData = data;
        for (var cci = 0; cci < data.Profile.Audiences.Audience.length; cci++) {
            if (cci > 0 && data.Profile.Audiences.Audience[cci].abbr != "") dartCC += ",";
            dartCC += data.Profile.Audiences.Audience[cci].abbr;
        }
    }
};
{
    rh.ads.lotame = {};
    rh.ads.lotame.waitingList = [];
    rh.ads.lotame.download = function() {
        rh.ads.lotame.getURL();
        nydnRequires([rh.ads.lotame.url], function(util) {
            console.log("nydn 🎯  rh.ads.lotame.download ✓" + rh.ads.lotame.url);
        });
    };
    rh.ads.lotame.getURL = function() {
        console.log("nydn 🎯  rh.ads.lotame.getURL");
        var domain = ".crwdcntrl.net";
        var noDomainCookie = true;
        var start = document.cookie.indexOf("_cc_domain");
        if (start > -1) {
            var valStartDc = document.cookie.indexOf("=", start);
            if (valStartDc > 0) {
                noDomainCookie = false;
                valStartDc++;
                var valEndDc = document.cookie.indexOf(";", valStartDc);
                valEndDc = valEndDc > 0 ? valEndDc : document.cookie.length;
                domain = document.cookie.slice(valStartDc, valEndDc)
            }
        }
        var idCookie = false;
        if (noDomainCookie) {
            var id;
            start = document.cookie.indexOf("_cc_id");
            if (start > -1) {
                var valStartId = document.cookie.indexOf("=", start);
                if (valStartId > 0) {
                    idCookie = true;
                    valStartId++;
                    var valEndId = document.cookie.indexOf(";", valStartId);
                    valEndId = valEndId > 0 ? valEndId : document.cookie.length;
                    id = document.cookie.slice(valStartId, valEndId)
                }
            }
        }
        var cc_url = "http://ad" + domain;
        if (typeof portNumber != "undefined" && portNumber != null) cc_url = cc_url + ":" + portNumber;
        cc_url = cc_url + "/5/c=" + cc_client_id + "/pe=y/callback=ccauds";
        if (idCookie) cc_url = cc_url + "/pid=" + id;
        rh.ads.lotame.url  = cc_url
        console.log("nydn 🎯  rh.ads.lotame.getURL "+cc_url);
    };
    rh.ads.lotame.setTargeting = function() {
        console.log("nydn 🎯  rh.ads.lotame.setTargeting");
        nydnRequires([rh.ads.dfp.url, rh.ads.lotame.url], function(util) {
            if (typeof(lotameData) != 'undefined') {
                googletag.cmd.push(function() {
                    googletag.pubads().setTargeting(dartCCKey, [dartCC]);
                    console.log("nydn 🎯  rh.ads.lotame.setTargeting ✓  "+[dartCC]);
                });
                rh.ads.log.dartCCKey = [dartCC];
            }
        });
    };
}
//OPTIMERA
var oDv = oDv || [];
var oVa = oVa || {};
{
    rh.ads.optimera = {};
    rh.ads.optimera.src = "";
    rh.ads.optimera.url = "https://s3.amazonaws.com/elasticbeanstalk-us-east-1-397719490216/external_json/oPS.js";
    rh.ads.optimera.getURL = function() {		//the JSON URL that contains the oVa values. It doesn't exist for new articles.
        var optimeraHost = window.location.host;
        var optimeraPathName = window.location.pathname;
        var rand = Math.random();
        rh.ads.optimera.src = "https://s3.amazonaws.com/elasticbeanstalk-us-east-1-397719490216/json/client/" + oDv[0] + "/" +  optimeraHost + optimeraPathName + ".js?t=" + rand;
        nydn.urls.optimera = rh.ads.optimera.src;
        console.log("nydn 🎯 rh.ads.optimera.getURL  "+nydn.urls.optimera);
        console.log("nydn 🎯 rh.ads.optimera.getURL oVa = "+JSON.stringify(oVa));
    };
    rh.ads.optimera.setup = function() {		//set up defauly valuse for oDv and oVa BEFORE downloading JSON
        console.log("nydn 🎯 rh.ads.optimera.setup ");
        oDv.push("1");
        rhAdArr2.forEach(function(rhAdx){
            if (rhAdx !=="div-gpt-ad-x100" && rhAdx!="div-gpt-ad-x108"){
                oDv.push(rhAdx);
                oVa[rhAdx] = ["NULL"];
            }
        });
        console.log("nydn 🎯 rh.ads.optimera.setup oDv = "+oDv);
        console.log("nydn 🎯 rh.ads.optimera.setup oVa = "+JSON.stringify(oVa));
        //rh.ads.optimera.download();
    };
    rh.ads.optimera.download = function() {		//download JSON with final oVa
        nydnRequires([nydn.urls.optimera], function(util) {
            console.log("nydn 🎯  rh.ads.optimera.download ✓ "+nydn.urls.optimera);
            console.log("nydn 🎯 rh.ads.optimera.download oVa = "+JSON.stringify(oVa));
        });
        rh.ads.optimera.download2();
    };
    rh.ads.optimera.download2 = function() {	//download oPs that reports ad units loading
        nydnRequires([rh.ads.optimera.url], function(util) {
            console.log("nydn 🎯  rh.ads.optimera.download 2 ✓");
        });
    };
    rh.ads.optimera.targeting = function() {		//loops thourgh defined ad nits, and setTargeting
        var rhAdx;
        nydnRequires([nydn.urls.optimera], function(util) {		//must wait for JSON if it exists.
            console.log("nydn 🎯 rh.ads.optimera.targeting");
            rhAdArr.forEach(function(rhAd){
                //alert("!!rhAdArr[0].u "+!!rhAdArr[0].u);
                //if (!!rhAdArr[0].u) {
                rhAdx = rhAd.nydnDivID;
                if (rhAdx !=="div-gpt-ad-x100" && rhAdx !="div-gpt-ad-x108"){
                    rhAd.setTargeting("oView", oVa[rhAdx]);
                    rh.ads.log[rhAdx].oView = oVa[rhAdx];
                    console.log("nydn 🎯 rh.ads.optimera.targeting oVa["+rhAdx+"] = "+JSON.stringify( oVa[rhAdx]));
                }
            });
            rh.ads.dfp.checkList.bidder["optimera"] = true;
            rh.ads.dfp.checkList.done +=1;
            console.log("nydn 🎯 rh.ads.optimera.targeting DONE");
        });
    };
    rh.ads.optimera.refresh = function() {
        nydnRequires([rh.ads.optimera.url], function(util) {
            console.log("nydn 🎯  rh.ads.optimera.refresh");
            oPageUnload('1');
        });
    };
}
//NATIVO
{
    rh.ads.nativo = {};
    rh.ads.nativo.url = "http://s.ntv.io/serve/load.js";
    rh.ads.nativo.initialize = function(){
        console.log("nydn 🎯  rh.nativo.initialize");
        rh.ads.nativo.build();
    };
    rh.ads.nativo.build = function(){
        console.log("nydn 🎯  rh.nativo.build");
        rh.ads.nativo.download();
    };
    rh.ads.nativo.download = function() {
        nydnRequires([rh.ads.nativo.url], function(util) {
            console.log("nydn 🎯  rh.nativo.download ✓");
        });
    };
}
//YIELDMO
{
    rh.ads.yieldmo = {};
    rh.ads.yieldmo.initialize = function(){
        console.log("nydn 🎯  rh.ads.yieldmo.initialize");
        if ( rh.platform === "mobile" && !nydn.bidder.contains("jumpstart")) {
            var yieldmoSection = nydn.section;
            if ( nydn.section == "nydailynews" || nydn.section == "homepage"  || nydn.section == "home" ) 	yieldmoSection = "homepage";
            else if ( nydn.subsection == "horoscopes")  yieldmoSection = nydn.subsection;
            else if ( nydn.section == "news" || nydn.section == "new york" ) 	yieldmoSection = nydn.section+" subsection";
            yieldmoSection = yieldmoSection.toLowerCase();
            var yieldmoTag = [{
                "ymS"	:	"homepage",
                "ymID1" 	: 	"ym_662209094606330888",
                "ymID2" 	: 	"ym_825209316101005155",
                "ymID3" 	: 	"ym_825210096711311205",
                "ymID4" 	: 	"ym_825210378400767846",
                "ymIDf" 	: 	"ym_662209962961476628"
            },{
                "ymS"	:	"entertainment",
                "ymID1" 	: 	"ym_2001400",
                "ymID2" 	: 	"ym_2001401",
                "ymID3" 	: 	"ym_2001402",
                "ymID4" 	: 	"ym_2001403",
                "ymIDf" 	: 	"ym_2001404"
            },{
                "ymS"	:	"lifestyle",
                "ymID1" 	: 	"ym_2001405",
                "ymID2" 	: 	"ym_2001406",
                "ymID3" 	: 	"ym_2001407",
                "ymID4" 	: 	"ym_2001408",
                "ymIDf" 	: 	"ym_2001409"
            },{
                "ymS"	:	"sports",
                "ymID1" 	: 	"ym_2001410",
                "ymID2" 	: 	"ym_2001411",
                "ymID3" 	: 	"ym_2001412",
                "ymID4" 	: 	"ym_2001413",
                "ymIDf" 	: 	"ym_2001414"
            },{
                "ymS"	:	"horoscopes",
                "ymID1" 	: 	"ym_2001415",
                "ymID2" 	: 	"ym_2001416",
                "ymID3" 	: 	"ym_2001417",
                "ymID4" 	: 	"ym_2001418",
                "ymIDf" 	: 	"ym_2001419"
            },{
                "ymS"	:	"newyork",
                "ymID1" 	: 	"ym_2001420",
                "ymID2" 	: 	"ym_2001421",
                "ymID3" 	: 	"ym_2001422",
                "ymID4" 	: 	"ym_2001423",
                "ymIDf" 	: 	"ym_2001424"
            },{
                "ymS"	:	"newyork subsection",
                "ymID1" 	: 	"ym_2001425",
                "ymID2" 	: 	"ym_2001426",
                "ymID3" 	: 	"ym_2001427",
                "ymID4" 	: 	"ym_2001428",
                "ymIDf" 	: 	"ym_2001429"
            },{
                "ymS"	:	"news",
                "ymID1" 	: 	"ym_2001430",
                "ymID2" 	: 	"ym_2001431",
                "ymID3" 	: 	"ym_2001432",
                "ymID4" 	: 	"ym_2001433",
                "ymIDf" 	: 	"ym_2001434"
            },{
                "ymS"	:	"news subsection",
                "ymID1" 	: 	"ym_2001435",
                "ymID2" 	: 	"ym_2001436",
                "ymID3" 	: 	"ym_2001437",
                "ymID4" 	: 	"ym_2001438",
                "ymIDf" 	: 	"ym_2001439"
            },{
                "ymS"	:	"opinion",
                "ymID1" 	: 	"ym_1534815027014777154",
                "ymID2" 	: 	"ym_1534815906820372803",
                "ymID3" 	: 	"ym_1534816581381896516",
                "ymID4" 	: 	"ym_1534817257243654469",
                "ymIDf" 	: 	"ym_1534817599557581126"
            }];
            if (yieldmoTag.getThisObject("ymS", yieldmoSection))	rh.ads.yieldmo.exe(yieldmoTag.getThisObject("ymS", yieldmoSection));
            else	rh.ads.yieldmo.exe(yieldmoTag.getThisObject("ymS", "homepage"));
            rh.ads.yieldmo.download();
        }
        else  $("#ra-yieldmo").parents(".ra-module").remove();
    };
    rh.ads.yieldmo.exe = function(inContentID){
        console.log("nydn 🎯  rh.ads.yieldmo.exe "+inContentID);
        var 	ymDivs = $(".r-yieldmo .ym"),
            ymDivsL = ymDivs.length,
            ymC;
        ymDivs.each(function(i){
            ymC = i +1;
            if (ymDivsL == ymC) 	$(this).attr("id",inContentID["ymIDf"]);
            else if (i < ymDivsL) 		$(this).attr("id",inContentID["ymID"+ymC]);
        });
    };
    rh.ads.yieldmo.bottom = function(footerID){
        console.log("nydn 🎯  rh.ads.yieldmo.bottom ✓");
        if ($("#ra-bottom  #ra-yieldmo").length) $("#ra-bottom  #ra-yieldmo").append("<div id='"+footerID+"' class='ym'></div>");
    };
    rh.ads.yieldmo.download = function() {
        (function(e, t) {
            if (t._ym === void 0) {
                t._ym = "";
                var m = e.createElement("script");
                m.type = "text/javascript",
                    m.async = !0,
                    m.src = "//static.yieldmo.com/ym.m1.js", (e.getElementsByTagName("head")[0] || e.getElementsByTagName("body")[0]).appendChild(m)
            }
            else t._ym instanceof String || void 0 === t._ym.chkPls || t._ym.chkPls()
        })(document, window);
        console.log("nydn 🎯  rh.yieldmo.download ✓");
    };
}
//ERROR
var nydnError=[];
rh.adBlockErrorHandled = false;
requirejs.onError = function (err) {
    nydnError.push(err);
    console.log("nydn 🎯  rh.onerror type:"+err.requireType+"  url:"+err.requireModules);
    if (rh.ads.dfp.waitingList.contains(err.requireModules)) {
        var bidderURL = err.requireModules.toString();
        var bidderPosition = rh.ads.dfp.waitingList.indexOf(bidderURL);
        rh.ads.dfp.waitingList.splice(bidderPosition, 1);
        console.log("nydn 🎯  rh.onerror Removed "+err.requireModules);
        if (!rh.ads.dependencies.downloaded)  	rh.ads.dependencies.download();
        else if (!rh.ads.dfp.refreshed)					rh.ads.dfp.refresh();
    }
    if (!rh.adBlockErrorHandled  && !nydn.bidder.contains("jumpstart") &&  (err.requireModules == nydn.urls.sonobi || err.requireModules == nydn.urls.openx || err.requireModules == nydn.urls.nativo ||  err.requireModules == nydn.urls.yieldbot || err.requireModules == nydn.urls.indexExchange)) {
        console.log("nydn 🎯  rh.onerror adBlockErrorHandled DONE "+err.requireType+"  "+err.requireModules);
        if (nydn.template =="article" || nydn.template =="ymm")	{
            nydnRequires([nydn.urls.ra], function(util) {		ra.initializeAfterAds();	});
        }
        else if (nydn.template=="homepage" || nydn.template=="index" ) {
            nydnRequires([nydn.urls.rhp], function(util) {	rhp.initializeAfterAds();	});
        }
        else rh.initializeAfterAds();
        rh.adBlockErrorHandled = true;
    }
};
rh.initialize = function(){
    console.log("nydn 🎯  rh.initialize");
    rh.comscore.download();
    rh.bp.initialize();
    rh.interactive();
    rh.aol.download();
    // rh.aolOrOra();
    rh.ads.initialize();
    rh.addons();
    rh.pagefair.measure.download();
    nydnRequires([nydn.urls.nydnQuery], function(util) {
        console.log("nydn 🎯  rh.nydnQuery.download ✓");
        rh.click();
        rh.search.doSearch();
    });
};
rh.initialize();


var stickyElements = document.getElementsByClassName('stickyfill');

for (var i = stickyElements.length - 1; i >= 0; i--) {
    Stickyfill.add(stickyElements[i]);
}