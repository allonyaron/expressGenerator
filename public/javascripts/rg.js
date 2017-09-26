"use strict";
var nydn = nydn || {};
var nydnRequires = require.config({
    context: "nydn",
    baseUrl: "/nydn/js",
    waitSeconds: 10
});

var localIP = "http://172.24.62.83:3000";

nydn.domain = "assets.nydailynews.com";
    // window.location.href.split("/")[2] == "wwwqa.nydailynews.com"
    //     ? "wwwqa.nydailynews.com"
    //      : "assets.nydailynews.com";
nydn.domain =
    window.location.href.indexOf("mockups") > -1
        ? "js/"
        : "http://" + nydn.domain + "/nydn/js/";
nydn.urls = {};
nydn.urls.taboola =
    "http://cdn.taboola.com/libtrc/nydailynews-nydailynews/loader.js";
nydn.urls.newsroom =
    "http://c2.taboola.com/nr/nydailynews-nydailynews/newsroom.js";
nydn.urls.json = "http://www.nydailynews.com/json/cmlink/";
nydn.urls.jsonQA = "http://wwwqa.nydailynews.com/json/cmlink/";
nydn.urls.jsonLocal = "http://localhost:8080/json/cmlink/";
nydn.urls.jsonM = "http://m.nydailynews.com/json/cmlink/";
nydn.urls.comscore = "http://b.scorecardresearch.com/beacon.js";

nydn.urls.nydnQuery = nydn.domain + "jquery-2-1-4.js?r=" + nydn.revision;
nydn.urls.nydnQueryMW = nydn.domain + "jquery.mousewheel.js?r=" + nydn.revision;
nydn.urls.rShare = nydn.domain + "r-share.js?r=" + nydn.revision;

Array.prototype.contains = function(needle) {
    for (var i in this) {
        if (this[i] == needle) return true;
    }
    return false;
};
var cc_client_id = 4867;
var cc_extr_callback = "ccauds";
nydnRequires([nydn.urls.nydnQuery], function() {
    ////console.log("nydn function: jquery download âœ“");
    $(function() {
        rg.initialize();
        //$("#rg-body").css("border","1px solid red");
    });
});

var rg = {};
rg.json = {};
rg.slideIDs = [];
rg.id = nydn.contentID;
// if (window.location.href.indexOf("wwwqa") > -1)
//     rg.jsonUrl = nydn.urls.jsonQA + rg.id;
// else if (
//     window.location.href.indexOf("mockups") > -1 &&
//     window.location.href.indexOf("autos") > -1
// )
//     rg.jsonUrl = "j/rg-autos.json";
// else if (window.location.href.indexOf("mockups") > -1) rg.jsonUrl = "j/rg.json";
// else if (window.location.href.indexOf("localhost") > -1)
//     rg.jsonUrl = nydn.urls.jsonLocal + rg.id;
// else if (window.location.href.indexOf("m.nydailynews.com") > -1)
//     rg.jsonUrl = nydn.urls.jsonM + rg.id;
// else rg.jsonUrl = nydn.urls.json + rg.id;

// rg.jsonUrl = "http://10.0.1.20:3000/json/rg.json";
rg.jsonUrl = localIP + "/json/rg.json";

// var objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g;// look for object names
// var newQuotedKeysString = rg.jsonUrl.replace(objKeysRegex, "$1\"$2\":");// all object names should be double quoted
// var newObject = JSON.parse(newQuotedKeysString);


rg.url = "";
rg.length = -1;
rg.target = {};
rg.delay = 500;
rg.count = 0;
rg.countFlag = false;
rg.preloadCount = 0;
rg.preloadFlag = false;
rg.preloadNo = 2;

rg.platform = "";
rg.bps = {};
rg.bps.desktopLarge = "1100";
rg.bps.desktop = "990";
rg.bps.tablet = "728";
rg.bps.mobile = "320";
rg.rgrH = "257";
rg.isMobile = "";
rg.origin = "";
rg.closeLink = "";
rg.bps.src = "";
rg.adViewport = "";

var rgShareOptions = {
    downloadOnHover: true,
    shMedias: ["facebook", "twitter", "pinterest", "email"],
    shZodiac: "",
    shURL: "",
    shBitly: "",
    shTitle: "",
    shBlurb: "",
    shIMG: "",
    shBitlyStatus: "",
    shType: "gallery",
    shDefault: false
};
var rgShare = {};

rg.resize = function() {
    var resizeTimeout;
    $(window).resize(function() {
        if (!!resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function() {
            rg.slide.details.noExpand();
            rg.slide.jslide.w = rg.slide.jslide.width();
            rg.bps.initialize();
        }, 300);
    });
};
rg.bps.initialized = false;
rg.bps.initialize = function() {
    if (nydn.bidder.contains("jumpstart")) rg.bps.desktop = rg.bps.desktopLarge;
    if (window.innerWidth < rg.bps.tablet) rg.platform = "mobile";
    else if (window.innerWidth < rg.bps.desktop) rg.platform = "tablet";
    else rg.platform = "desktop";
    rg.bps.initialized = true;

    if (
        window.location.href.indexOf("wwwqa") > -1 ||
        window.location.href.indexOf("mockups") > -1
    ) {
        $("#rg-bp b").text(window.innerWidth + " x " + window.innerHeight);
        $("#rg-bp i").text(rg.platform);
    }

    //SET VARIABLE FOR SLIDE IMAGE DERIVATIVE
    if (window.innerWidth >= rg.bps.tablet) rg.bps.src = "gallery_1200";
    else if (window.innerWidth <= rg.bps.mobile) rg.bps.src = "gallery_320";
    else rg.bps.src = "gallery_728";

    if (window.innerWidth < 728) rg.adViewport = "mobile";
    else if (window.innerWidth < 990) rg.adViewport = "tablet";
    else rg.adViewport = "desktop";
};
rg.initialize = function() {
    rg.bps.initialize();
    rg.ads.initialize();
    rg.cover.initialize();
    rg.slide.initialize();
    rg.getJSON();
    rg.click();
    rg.resize();
    rg.isMobileTest();
    rg.browserButtons();
    rg.getOrigin();
    rg.recirc();
    rg.comscore.download();
    //rg.googleAnalytics();
    rg.gtm.download();
    rg.dtm.download();
    rg.parsley.download();
    rg.newsroom();
    rg.sourcepoint.download();
    if (rg.platform === "desktop") rg.rr();
    rg.nielsen.download();
    rg.quantcast.download();
    rg.shareStart();
};

rg.shareStart = function() {
    nydnRequires([nydn.urls.rShare], function() {
        ////console.log("nydn function: rShare dowloaded âœ“");
        var rgShare = new rShare(".rt-share", rgShareOptions);
    });
};

rg.isMobileTest = function() {
    navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
    )
        ? (rg.isMobile = true)
        : (rg.isMobile = false);
};
rg.getOrigin = function() {
    rg.origin = document.referrer;
    if ($("[data-section=autos]").length) {
        rg.origin.indexOf("nydailynews.com") >= 0
            ? (rg.closeLink = rg.origin)
            : (rg.closeLink = "http://www.nydailynews.com/autos");
    } else {
        rg.origin.indexOf("nydailynews.com") >= 0
            ? (rg.closeLink = rg.origin)
            : (rg.closeLink = "http://www.nydailynews.com");
    }
};
rg.click = function() {
    $("#rg").on("click", function(e) {
        if (e.target.id != "") {
            rg.target = e.target.id;
        } else if (
            $(e.target).attr("class") != "" &&
            $(e.target).attr("class") != undefined
        ) {
            var cList = $(e.target).attr("class").split(/\s+/);
            rg.target = cList[0];
        } else if (
            $(e.target).parent().attr("id") != "" &&
            $(e.target).parent().attr("id") != undefined
        ) {
            rg.target = $(e.target).parent().attr("id");
        }

        if (rg.target != "" && typeof rg.target !== "undefined") {
            ////console.log('theres a target!', rg.target)

            switch (rg.target) {
                case "rgc":
                case "rg-headers":
                case "rg-headline":
                case "rg-description":
                case "rgc-to-s-1":
                case "rgc-to-s-2":
                    rg.cover.hide(e);
                    setTimeout(function() {
                        rg.slide.show();
                        rg.slide.next(e);
                    }, rg.delay);
                    // rg.ads.oop.refresh();
                    if (nydn.adOut2 === "x108") {
                        rg.ads.oop2.refresh();
                    }
                    break;
                case "rgs-details":
                case "rgs-title":
                case "rgs-caption":
                    rg.slide.details.toggle();
                    break;
                case "rg-thumb-count":
                case "rgs-count":
                case "rgt-show":
                    rg.cover.hide(e);
                    rg.slide.hide();
                    if ($("#rge").is(":visible")) {
                        rg.endslate.hide(e);
                    }
                    if ($("#rgi").is(":visible")) {
                        rg.interstitial.hide(e);
                    }
                    setTimeout(function() {
                        rg.thumbs.show(e, rg.setMetaTags);
                    }, rg.delay);
                    break;
                case "rgt-to-cover":
                    rg.thumbs.hide(e);
                    setTimeout(function() {
                        rg.cover.show();
                    }, rg.delay);
                    break;
                case "rgt-to-slide":
                    e.preventDefault();
                    rg.thumbs.hide(e);
                    setTimeout(function() {
                        rg.slide.show(rg.setMetaTags);
                    }, rg.delay);
                    // rg.ads.oop.refresh();
                    if (nydn.adOut2 === "x108") rg.ads.oop2.refresh();
                    break;
                case "rg-close":
                    if ($("#rg.thumbs").length && rg.platform != "desktop") {
                        rg.thumbs.hide(e);
                        setTimeout(function() {
                            rg.slide.show(rg.setMetaTags);
                        }, rg.delay);
                    } else {
                        e.preventDefault();
                        window.location.href = rg.closeLink;
                    }
                    break;
                case "rgt-to-s":
                    e.preventDefault();
                    rg.thumbs.hide(e);
                    setTimeout(function() {
                        rg.slide.show();
                        rg.slide.pick($(e.target).attr("data-slide-no"));
                    }, rg.delay);
                    // rg.ads.oop.refresh();
                    if (nydn.adOut2 === "x108") rg.ads.oop2.refresh();
                    break;
                case "rge-previous":
                    rg.endslate.hide(e);
                    setTimeout(function() {
                        rg.slide.show();
                        rg.slide.previous(e);
                        rg.parsley.track("Gallery Click Prev");
                    }, rg.delay);
                    break;
                case "rge-to-cover":
                    rg.endslate.hide(e);
                    rg.slide.hide();
                    setTimeout(function() {
                        rg.cover.show();
                    }, rg.delay);
                    break;
                case "rgi-prev":
                    rg.interstitial.hide(e);
                    setTimeout(function() {
                        rg.slide.show();
                        // rg.slide.previous(e);
                    }, rg.delay);
                    break;
                case "rgi-next":
                case "rgi-to-slide":
                    rg.interstitial.hide(e);
                    setTimeout(function() {
                        rg.slide.show();
                    }, rg.delay);
                    break;
                case "rg-share-toggle":
                    rg.shareToggle();
                    break;
            }
        }
        rg.target = "";
    });

    var handled = false;

    $("#rgs-next").on("click touchstart", function(e) {
        ////console.log('rgs-next event: ', e)
        e.preventDefault();
        if (e.type == "touchstart") {
            // ////console.log("############### TOUCHSTART");
            // ////console.log(e.type);
            rg.slide.next(e);
            _satellite.track("Gallery Swipe Next");
            rg.parsley.track("Gallery Swipe Next");
            nydnDO.push({ event: "rgSwipe" });
            handled = true;
            // ////console.log("HANDLED = "+handled);
        } else if (e.type == "click" && !handled) {
            rg.slide.next(e);
            rg.parsley.track("Gallery Click Next");
            // ////console.log("HANDLED = "+handled);
        } else {
            handled = false;
        }
    });

    $("#rgs-previous").on("click touchstart", function(e) {
        e.preventDefault();
        if (e.type == "touchstart") {
            rg.slide.previous(e);
            _satellite.track("Gallery Swipe Prev");
            rg.parsley.track("Gallery Swipe Prev");
            nydnDO.push({ event: "rgSwipe" });
            handled = true;
        } else if (e.type == "click" && !handled) {
            rg.slide.previous(e);
            rg.parsley.track("Gallery Click Prev");
        } else {
            handled = false;
        }
    });

    $("#rg").on("keydown", function(e) {
        if (e.which == 39 || e.which == 37) {
            if ($("#rg.cover").length) {
                rg.cover.hide(e);
                setTimeout(function() {
                    rg.slide.show();
                    rg.slide.next(e);
                    rg.parsley.track("Gallery Keypress Next");
                }, rg.delay);
            } else if ($("#rg.endslate").length) {
                switch (e.which) {
                    case 39:
                        rg.endslate.hide(e);
                        setTimeout(function() {
                            rg.cover.show();
                        }, rg.delay);
                        break;
                    case 37:
                        rg.endslate.hide(e);
                        setTimeout(function() {
                            rg.slide.show();
                            rg.slide.previous(e);
                            rg.parsley.track("Gallery Keypress Prev");
                        }, rg.delay);
                        break;
                    default:
                        return true;
                }
            } else if ($("#rg.interstitial").length) {
                switch (e.which) {
                    case 39:
                        // console.trace();
                        $("#rg #rgi-next").trigger("click");
                        break;
                    case 37:
                        $("#rg #rgi-prev").trigger("click");
                        break;
                }
            } else {
                switch (e.which) {
                    case 39:
                        rg.slide.next(e);
                        break;
                    case 37:
                        rg.slide.previous(e);
                        rg.parsley.track("Gallery Keypress Prev");
                        break;
                    default:
                        return true;
                }
            }
        }
    });
};

rg.cover = {};
rg.cover.title = null;
rg.cover.description = null;
rg.cover.url = null;
rg.cover.bitly = null;
rg.cover.initialized = false;
rg.cover.adsInitialized = false;
rg.cover.initialize = function() {
    rg.slide.no = 0;
    rg.cover.title = $("#og_title").attr("content");
    rg.cover.description = $("#og_description").attr("content");
    rg.cover.urlFull = $("#og_url").attr("content");

    if (rg.cover.urlFull.indexOf("?") > -1) {
        rg.cover.url = rg.cover.urlFull.substring(0, rg.cover.urlFull.indexOf("?"));
    } else {
        rg.cover.url = rg.cover.urlFull;
    }
    nydn.bitly != undefined && nydn.bitly != ""
        ? (rg.cover.bitly = nydn.bitly)
        : (rg.cover.bitly = rg.cover.url);
    rg.cover.initialized = true;
    if ($("#rg.cover").length) {
        rg.cover.show();
    }
};
rg.cover.hide = function(e, callback) {
    e.preventDefault();
    $("#rgc").fadeOut(function() {
        $("#rg").removeClass("cover");
    });
};
rg.cover.show = function() {
    // ////console.log("##############  RG COVER SHOW");

    // if (rg.slide.is(":visible")) {
    // 	////console.log("##############  RG SLIDE IS VISIBLE");
    // 	rg.slide.hide();

    // }

    $("#rgc").fadeIn(function() {
        $("#rg").addClass("cover");
    });
    rg.share.show();
    rg.slide.no = -1;
    rg.slide.url = "";
    if (!rg.cover.adsInitialized) rg.ads.refresh("cover");
    // history.pushState(rg.cover.url, rg.cover.title, rg.cover.url);
};
rg.slide = {};
rg.slide.initialized = false;
rg.slide.no = 0;
rg.slide.title = "";
rg.slide.caption = "";
rg.slide.credit = "";
rg.slide.img = {};
rg.slide.img.src = "";
rg.slide.url = "";
rg.slide.jslide = {};
rg.slide.jdetails = {};
rg.slide.adsInitialized = false;
rg.slide.initialize = function() {
    rg.slide.initialized = true;
    rg.slide.jslide = $("#rgs");
    rg.slide.jdetails = $("#rgs-details");
    rg.slide.jcount = $("#rgs-count");
    if ($("#rg.slide").length) {
        rg.slide.adjust();
        rg.slide.details.getHeight();
    }
};
rg.slide.adjust = function() {
    rg.slide.no = rg.slide.jcount.find("span:first-child").text() - 1;
    rg.slide.show();
};
rg.slide.pick = function(slideNo) {
    rg.slide.no = slideNo;
    rg.setMetaTagsAfter(rg.slide.details);
    rg.slide.history();
};
rg.slide.show = function(callback) {
    rg.ads.template = "slide";
    $("#rgs").fadeIn(function() {
        $("#rg").addClass("slide");
        if (!(callback == null)) {
            callback();
        }
    });
    rg.share.show();
    rg.slide.details.noExpand();
    rg.slide.jslide.w = rg.slide.jslide.width();
    if (!rg.slide.adsInitialized) rg.ads.refresh("slide");
    rg.slide.taboola();
};

rg.slide.next = function(e) {
    ////console.log('rg.slide.next', e)
    e.preventDefault();
    e.stopPropagation();
    if (nydn.interstitial > 0) {
        rg.interstitial.check();
    }
    if (rg.slide.no === -1 || rg.slide.no == rg.length - 1) {
        rg.slide.no++;
    } else {
        if (rg.slide.no !== rg.length) {
            rg.slide.sliding("next");
        }
    }
    if (rg.slide.no === rg.length) {
        rg.slide.hide();
        rg.endslate.show();
    } else if (!$.isEmptyObject(rg.json)) {
        rg.setMetaTagsAfter(rg.slide.details);
    }
    rg.slide.history();

    // self.COMSCORE && COMSCORE.beacon({ c1: "2" , c2: "7190388" });
    // ////console.log('self.COMSCORE && COMSCORE.beacon({ c1: "2" , c2: "7190388" });');

    nydnRequires([nydn.urls.comscore], function() {
        self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "7190388" });
        ////console.log(
        //   'nydn rg COMSCORE TEST ðŸŽ¯ self.COMSCORE && COMSCORE.beacon({ c1: "2" , c2: "7190388" });'
        // );
    });
};

rg.slide.previous = function(e) {
    e.preventDefault();
    if (nydn.interstitial > 0) rg.interstitial.check("prev");
    if (rg.slide.no === 0 || rg.slide.no === rg.length) {
        rg.slide.no--;
    } else {
        rg.slide.sliding("prev");
    }
    if (rg.slide.no === -1) {
        rg.slide.hide();
        setTimeout(function() {
            rg.cover.show();
        }, 300);
    } else if (!$.isEmptyObject(rg.json)) {
        rg.setMetaTagsAfter(rg.slide.details);
    }
    rg.slide.history();

    // self.COMSCORE && COMSCORE.beacon({ c1: "2" , c2: "7190388" });
    // ////console.log('self.COMSCORE && COMSCORE.beacon({ c1: "2" , c2: "7190388" });');

    nydnRequires([nydn.urls.comscore], function() {
        self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "7190388" });
        ////console.log(
        //   'nydn rg COMSCORE TEST ðŸŽ¯ self.COMSCORE && COMSCORE.beacon({ c1: "2" , c2: "7190388" });'
        // );
    });
};
rg.slide.sliding = function(direction) {
    if (!$("#rgs img").is(":animated")) {
        var x = rg.slide.jslide.w;
        if (direction == "next") {
            x = -x;
        }
        var y = -x;
        var rgClone = $("#rgs-img").clone();
        rgClone
            .css("margin-left", y + "px")
            .hide()
            .insertBefore($("#rgs-nav"))
            .show();
        $("#rgs img").first().addClass("rg-clone").attr("id", "");
        $(".rg-clone").animate(
            {
                "margin-left": x + "px"
            },
            400,
            function() {
                $(this).remove();
            }
        );
        direction == "next" ? rg.slide.no++ : rg.slide.no--;
        $("#rgs-img").one("load", function() {
            //WAIT UNTIL IMAGE IS LOADED BEFORE ANIMATING
            $("#rgs-img").show().animate(
                {
                    "margin-left": 0
                },
                400
            );
        });
    }
    // rg.ads.oop.refresh();
    if (nydn.adOut2 === "x108") rg.ads.oop2.refresh();
};

rg.setMetaTagsAfter = function(fnA) {
    fnA.apply(this);
    rg.setMetaTags();
};
rg.setMetaTags = function() {
    if ($("#rg.thumbs").length > 0) {
        $("#og_url").attr("content", rg.cover.url);
        $('meta[property="twitter:url"]').attr("content", rg.cover.url);
        return;
    }

    $("#og_title").attr("content", rg.slide.title);
    $("#og_description").attr("content", rg.slide.caption);
    $("#og_url").attr("content", rg.cover.url + rg.slide.url);
    $("#og_image").attr("content", rg.slide.img.src);
    $('meta[name="twitter:image"]').attr("content", rg.slide.img.src);
    $('meta[property="twitter:title"]').attr("content", rg.slide.title);
    $('meta[property="twitter:url"]').attr(
        "content",
        rg.cover.url + rg.slide.url
    );
};
rg.slide.details = function() {
    if (rg.slide.no > -1) {
        var thisSlide = rg.json.images[rg.slide.no];
        if ($.isEmptyObject(rg.slide.jslide)) rg.slide.initialize();
        rg.slide.caption = thisSlide.caption;
        rg.slide.url = "?pmSlide=" + thisSlide.contentId;
        rg.slide.img.src = thisSlide.shareSrc
            .replace("gallery_1200", rg.bps.src)
            .replace("gallery_728", rg.bps.src)
            .replace("gallery_320", rg.bps.src);
        rg.slide.title = thisSlide.imagetitle;
        rg.slide.credit = thisSlide.credit;
        rg.slide.jslide.find("#rgs-img").attr("src", rg.slide.img.src);
        rg.slide.jslide.find("#rgs-img").attr("srcset", rg.slide.img.src);
        rg.slide.jdetails.find("#rgs-title").html(rg.slide.title);
        rg.slide.jdetails.find("#rgs-caption").html(rg.slide.caption);
        rg.slide.jdetails.find("#rgs-credit").html(rg.slide.credit);
        rg.slide.jcount.find("span:first-child").text(Number(rg.slide.no) + 1);
        rg.slide.counter();
        rg.preloadCounter();
        rg.slide.details.noExpand();

        // if(rg.platform === "desktop"){
        // 	rg.slide.details.collapseH = $("#rgs-title").outerHeight() + 97;
        // 	$("#rgs-details.collapsed").css("max-height", rg.slide.details.collapseH+"px");
        // 	}else if(rg.platform === "tablet"){
        // 		rg.slide.details.collapseH = 85;
        // 	}else{
        // 		rg.slide.details.collapseH = 56;
        // }

        rg.slide.details.getHeight();
    }
};

rg.slide.details.getHeight = function() {
    // ////console.log("######### get the height");
    if (rg.platform === "desktop") {
        rg.slide.details.collapseH = $("#rgs-title").outerHeight() + 97;
        $("#rgs-details.collapsed").css(
            "max-height",
            rg.slide.details.collapseH + "px"
        );
    } else if (rg.platform === "tablet") {
        rg.slide.details.collapseH = 85;
    } else {
        rg.slide.details.collapseH = 56;
    }
};

rg.slide.history = function() {
    history.pushState(rg.slide.url, rg.slide.title, rg.slide.url);
};

rg.browserButtons = function() {
    window.onpopstate = function(e) {
        if (e.state) {
            //////console.log('*********** EVENT STATE YES');
            var histState = history.state.replace("?pmSlide=", "");
            var histStateIndex = rg.slideIDs.indexOf(histState);
            ////console.log("********* HIST STATE INDEX = " + histStateIndex);
            ////console.log("********* HIST STATE = " + histState);
            if (histStateIndex < rg.slide.no) {
                // ////console.log("a");
                //////console.log("********** IF STATE");
                //////console.log("********* HIST STATE INDEX = " +histStateIndex);
                //////console.log("********** RG SLIDE NO = "+rg.slide.no);

                if (histStateIndex == rg.slide.no - 1) {
                    // ////console.log("b");
                    //////console.log("PREVIOUS BUTTON CLICKED");
                    rg.browserBack(e);
                } else if (histStateIndex == -1) {
                    // ////console.log("c");
                    //////console.log("********** HIST STATE INDEX = -1");
                    rg.slide.hide();
                    rg.cover.show();
                } else {
                    ////console.log("d");
                    rg.slide.no = histStateIndex; //HERE IS THE PROBLEM *****
                    //////console.log("********* PROBLEM AREA rg.slide.no :  browserButton : "+rg.slide.no);
                    //////console.log("********* HIST STATE INDEX = " +histStateIndex);
                    //////console.log("********* HIST STATE = "+histState);
                    if (!$.isEmptyObject(rg.json)) {
                        //////console.log("******* JSON EXISTS");
                        rg.setMetaTagsAfter(rg.slide.details);
                    }
                }
            } else if (histStateIndex > rg.slide.no) {
                // ////console.log("e");
                //////console.log("********** ELSE STATE");
                //////console.log("********** RG SLIDE NO = "+rg.slide.no);
                if (histStateIndex == rg.slide.no + 1) {
                    // ////console.log("f");
                    ////console.log(histStateIndex);
                    ////console.log(rg.slide.no);

                    //////console.log("NEXT BUTTON CLICKED");
                    rg.browserNext(e);
                } else {
                    rg.slide.no = histStateIndex;
                    //////console.log("********* line 510 rg.slide.no :  browserButton : "+rg.slide.no);
                    if (!$.isEmptyObject(rg.json)) {
                        rg.setMetaTagsAfter(rg.slide.details);
                    }
                }
            }
        } else if (rg.slide.no == 0) {
            rg.thumbs.hide(e);
            rg.slide.hide();
            rg.cover.show();
        }
    };
};
//BROWSER BACK
rg.browserBack = function(e) {
    //NEED SEPARATE LOGIC FOR WHEN THE USER HITS BROWSER BACK FROM THUMBS PAGE

    ////console.log("****  rg.browserBack called");
    ////console.log("rg.slide.no = " + rg.slide.no);

    if (rg.slide.no === 0) {
        ////console.log("****  rg.browserBack called A");
        rg.slide.no--;
    } else if (rg.slide.no == rg.length) {
        ////console.log("****  rg.browserBack called B");
        rg.slide.no--;
        rg.endslate.hide(e);
        rg.slide.show();
    } else {
        ////console.log("****  rg.browserBack called C");
        rg.thumbs.hide(e);
        rg.slide.show();
        rg.slide.sliding("prev");
    }
    if (rg.slide.no === -1) {
        ////console.log("****  rg.browserBack called D");
        rg.thumbs.hide(e);
        rg.slide.hide();
        setTimeout(function() {
            rg.cover.show();
        }, 300);
    } else if (!$.isEmptyObject(rg.json)) {
        rg.setMetaTagsAfter(rg.slide.details);
    }
};

//BROWSER FORWARD
rg.browserNext = function(e) {
    // ////console.log("#########  BROWSER NEXT CALLED" + rg.slide.no);
    rg.slide.sliding("next");
    if (rg.slide.no == rg.length) {
        rg.slide.hide();
        rg.endslate.show();
    } else if (!$.isEmptyObject(rg.json)) {
        rg.setMetaTagsAfter(rg.slide.details);
    }

    if (rg.slide.no == 0) {
        rg.cover.hide(e);
        setTimeout(function() {
            rg.slide.show();
        }, rg.delay);
    }
};
rg.slide.counter = function() {
    rg.count++;
    if (!rg.countFlag && rg.platform !== "desktop") {
        if (rg.count > 2) {
            $("#rg-logo").addClass("icon-logo");
            $("#rgs-previous, #rgs-next").addClass("no-arrows");
            rg.countFlag = true;
        }
    }
    if (rg.count === rg.ads.refreshCounter) {
        rg.count = 0;
        if (rg.ads.template === "slide") rg.ads.refresh("slide");
    }
};
rg.slide.details.toggle = function() {
    if ($("#rgs-details").hasClass("collapsed")) {
        rg.slide.details.expand();
    } else {
        rg.slide.details.collapse();
    }
};

rg.slide.details.expand = function() {
    $("#rgs-details").stop().addClass("on").animate({
        "max-height": "700px"
    }, 200, function() {
        rg.slide.jdetails.removeClass("collapsed");
        $("#rg-share").removeClass("collapsed");
    });
};
rg.slide.details.collapse = function() {
    $("#rgs-details").stop().removeClass("on").animate({
        "max-height": rg.slide.details.collapseH + "px"
    }, 200, function() {
        rg.slide.jdetails.addClass("collapsed");
        $("#rg-share").addClass("collapsed");
    });
};

rg.slide.details.noExpand = function() {
    $("#rgs-details").removeClass("no-expand");
    rg.slide.jdetails.h = rg.slide.jdetails.height();
    if (rg.slide.jdetails.h < rg.slide.details.collapseH) {
        $("#rgs-details").addClass("no-expand");
    } else {
        $("#rgs-details").removeClass("no-expand");
    }
};
rg.slide.hide = function() {
    $("#rgs").fadeOut(function() {
        $("#rg").removeClass("slide");
    });
};
rg.taboola = {};
rg.slide.taboolaed = false;
rg.slide.taboola = function() {
    rg.taboola = $(".rga-taboola");
    if (!rg.slide.taboolaed) {
        nydnRequires([nydn.urls.taboola], function() {
            window._taboola = window._taboola || [];
            _taboola.push({
                photo: "auto"
            });
            _taboola.push({
                mode: "thumbnails-f",
                container: "taboola-right-rail-gallery-thumbnails",
                placement: "Right Rail Gallery Thumbnails",
                target_type: "mix"
            });

            if (!nydn.bidder.contains("jumpstart")) {
                _taboola.push({
                    mode: "organic-thumbnails-l",
                    container: "taboola-right-rail-next-gallery-stream-thumbnails",
                    placement: "Right Rail Next Gallery Stream Thumbnails",
                    target_type: "photo"
                });
            }
            rg.slide.taboolaed = true;
            _taboola.push({
                flush: true
            });
        });
    }
};
rg.recirc = function() {
    if (!rg.isMobile) {
        if (!rg.recirc.taboolaed) rg.recirc.taboola();
        $("#rg-close").on("mouseover", function() {
            if (!$("#rg.thumbs").length && !$("#rg.cover").length) {
                if (!$("#rgr").is(":visible")) {
                    $("#rgr").show().stop().animate({
                        top: "0"
                    }, 400, function() {});
                    $("#rg-header").addClass("recirc");
                    if (!$("#rg.cover").length)
                        $("#rg-share-icons, #rg-share-toggle, #rgs-count").fadeOut("fast");
                    $("#rgt-to-slide").fadeOut("fast");
                    if (!$("#rg.thumbs").length) $("#rgt-show").fadeOut("fast");
                }
            }
            $("#rgr").on("mouseleave", function(e) {
                if (
                    $("#rgr").is(":visible") &&
                    !$(e.relatedTarget).is($("#rg-share")) &&
                    !$(e.relatedTarget).is($("#rg-share *")) &&
                    !$(e.relatedTarget).is($("#rg-header")) &&
                    !$(e.relatedTarget).is($("#rg-close"))
                ) {
                    rg.recirc.slideup();
                    $("#rg-header").on("mouseleave", function(e) {
                        if (
                            $("#rgr").is(":visible") &&
                            !$(e.relatedTarget).is($("#rgr")) &&
                            !$(e.relatedTarget).is($("#rgr *")) &&
                            !$(e.relatedTarget).is($("#rg-close"))
                        ) {
                            rg.recirc.slideup();
                        }
                    });
                }
            });
        });
    } else {
        //TURN OFF EVENT LISTENER
        $("#rg-close").off("mouseover");
        return;
    }
};
rg.recirc.slideup = function() {
    $("#rgr").stop().animate({
        top: -rg.rgrH + "px"
    }, 400, function() {
        $(this).hide();
        $("#rg-header").removeClass("recirc");
        // $("#rg-share dl").fadeIn();

        $("#rg-share-toggle, #rgs-count").fadeIn();
        if ($("#rg.thumbs").length) {
            $("#rgt-to-slide").fadeIn();
        } else {
            $("#rgt-show").fadeIn();
        }
    });
};
rg.recirc.taboolaed = false;
rg.recirc.taboola = function() {
    ////console.log("nydn function: rg.recirc.taboola");
    if (!rg.recirc.taboolaed) {
        nydnRequires([nydn.urls.taboola], function() {
            ////console.log("nydn function: rg.recirc.taboola download âœ“");
            window._taboola = window._taboola || [];
            if (nydn.bidder.contains("jumpstart"))
                _taboola.push({
                    photo: "auto"
                });
            _taboola.push({
                mode: "organic-thumbnails-n",
                container: "taboola-above-gallery-thumbnails",
                placement: "Above Gallery Thumbnails",
                target_type: "mix"
            });
            rg.recirc.taboolaed = true;
            if (nydn.bidder.contains("jumpstart"))
                _taboola.push({
                    flush: true
                });
            ////console.log("nydn function: rg.recirc.taboola exe âœ“");
        });
    }
};

rg.share = {};

rg.share.show = function() {
    $("#rg-share").fadeIn(function() {});
};
rg.share.hide = function() {
    $("#rg-share").fadeOut(function() {});
};

/*===THUMBNAILS==*/
rg.thumbs = {};
rg.thumbs.hide = function(e) {
    e.preventDefault();
    rg.slide.jdetails.fadeIn();
    if (rg.taboola.length) {
        rg.taboola.fadeIn();
    }
    $("#rgt").fadeOut(function() {
        $("#rg").removeClass("thumbs");
    });
};
rg.thumbs.base = "";
rg.thumbs.show = function(e, callback) {
    rg.ads.template = "thumbs";
    rg.ads.refresh("thumbs");
    rg.thumbs.populate();
    rg.slide.jdetails.fadeOut();
    if (
        rg.platform === "desktop" &&
        !$("#div-gpt-ad-" + rg.ads.xBox1).find("iframe").length
    )
        rg.ads.refresh("slide");
    if (rg.taboola.length) {
        rg.taboola.fadeOut();
    }
    $("#rgt").fadeIn(function() {
        $("#rg").addClass("thumbs");
        if (!(callback == null)) {
            callback.apply(this);
        }
    });
    $("#rgt-show").attr("style", "");
    ////console.log("nydn analytics: Thumbnail View");
};
rg.thumbs.populate = function() {
    var thumbsLength = $("#rgt li").length;
    if (thumbsLength == 2) {
        $(rg.json.images).each(function(index) {
            var thumbDeriv = this.mobileSrc.replace("index_100_100", "gallery_250");
            $(
                '<li><a href="#"  itemprop="thumbnailUrl"><img class="rgt-to-s" data-slide-no="' +
                index +
                '" src="' +
                thumbDeriv +
                '" /></a></li>'
            ).insertBefore("#rgt li:last-child");
        });
    }
};
rg.endslate = {};
rg.endslate.show = function() {
    // ////console.log("########## ENDSLATE SHOW");
    rg.ads.template = "endslate";
    $("#rge").fadeIn(function() {
        $("#rg").removeClass("slide");
        $("#rg").addClass("endslate");
        // rg.ads.optimera.refresh();
    });
    nydn.bidder.contains("jumpstart")
        ? rg.endslate.taboolaJumpStart()
        : rg.endslate.taboola();
    // rg.endslate.taboola();

    // if(rg.platform === "mobile"){
    // 	rg.slide.details.collapse();
    // }
    rg.slide.details.collapse();
    if ($("#rg-share-toggle").hasClass("on")) {
        rg.shareToggle();
    }
};
rg.endslate.hide = function(e) {
    e.preventDefault();
    $("#rge").fadeOut(function() {
        $("#rg").removeClass("endslate");
        //$("#rg").addClass("slide");
    });
};
rg.endslate.taboolaed = false;
rg.endslate.taboola = function() {
    ////console.log("nydn function: rg.endlsate.taboola");
    if (!rg.endslate.taboolaed) {
        nydnRequires([nydn.urls.taboola], function() {
            ////console.log("nydn function: rg.endlsate.taboola DOWNLOADED");
            window._taboola = window._taboola || [];

            // if (nydn.bidder.contains("jumpstart")) _taboola.push({
            //     photo: 'auto'
            // });

            _taboola.push({
                mode: "thumbnails-g",
                container: "taboola-end-gallery-thumbnails",
                placement: "End Gallery Thumbnails",
                target_type: "mix"
            });

            _taboola.push({
                mode: "organic-thumbnails-k",
                container: "taboola-next-gallery-thumbnails",
                placement: "Organic Next gallery Thumbnails",
                target_type: "photo"
            });

            _taboola.push({
                mode: "thumbnails-n",
                container: "taboola-next-gallery-thumbnails-2",
                placement: "Sponsored Next Gallery Thumbnails",
                target_type: "mix"
            });
            rg.endslate.taboolaed = true;
            _taboola.push({ flush: true });
        });
    }
};

rg.endslate.taboolaJumpStart = function() {
    ////console.log("nydn function: rg.endlsate.taboolaJumpStart");
    if (!rg.endslate.taboolaed) {
        nydnRequires([nydn.urls.taboola], function() {
            ////console.log("nydn function: rg.endlsate.taboola DOWNLOADED JUMPSTART");
            window._taboola = window._taboola || [];
            _taboola.push({
                mode: "organic-thumbnails-k",
                container: "taboola-next-gallery-thumbnails",
                placement: "Organic Next gallery Thumbnails",
                target_type: "photo"
            });

            _taboola.push({
                mode: "thumbnails-n",
                container: "taboola-next-gallery-thumbnails-2",
                placement: "Sponsored Next Gallery Thumbnails",
                target_type: "mix"
            });
            rg.endslate.taboolaed = true;
            _taboola.push({ flush: true });
        });
    }
};

rg.getJSON = function() {
    ////console.log("nydn function: rg.getJSON");
    $(function() {
        if ($.isEmptyObject(rg.json)) {
            $.getJSON(rg.jsonUrl)
                .done(function(data) {
                    rg.json = data;
                    rg.length = $(rg.json.images).size();
                    rg.url = rg.json.url;
                    rg.slide.jdetails
                        .find("#rgs-count span:nth-child(3)")
                        .text(rg.length);
                    $(rg.json.images).each(function(index) {
                        rg.slideIDs.push(this.contentId); //PUSH SLIDE CONTENT IDS TO ARRAY
                    });
                    rg.preload();
                    ////console.log("nydn function: rg.getJSON âœ“");
                })
                .fail(function(jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    ////console.log("nydn function: rg.getJSON FAIL - " + err);
                });
        }
    });
};

rg.preload = function() {
    if (rg.slide.no == -1 || rg.slide.no < rg.preloadNo) {
        //GET FIRST X SLIDES
        if (!rg.preloadFlag) {
            for (var i = 0; i < rg.preloadNo * 2; i++) {
                new Image().src = rg.json.images[i].shareSrc
                    .replace("gallery_1200", rg.bps.src)
                    .replace("gallery_728", rg.bps.src)
                    .replace("gallery_320", rg.bps.src);
            }
        }
    } else {
        for (
            var i = rg.slide.no - rg.preloadNo + 1;
            i < rg.slide.no + rg.preloadNo + 1 && i <= rg.length - rg.preloadNo + 1;
            i++
        ) {
            new Image().src = rg.json.images[i].shareSrc
                .replace("gallery_1200", rg.bps.src)
                .replace("gallery_728", rg.bps.src)
                .replace("gallery_320", rg.bps.src);
        }
    }
};
rg.preloadCounter = function() {
    rg.preloadCount++;
    if (rg.preloadCount % rg.preloadNo === 0) {
        rg.preload();
    }
};
rg.interstitial = {};
rg.interstitial.adsInitialized = false;
rg.interstitial.counter = 0;

// DEFAULT INTERSTITIAL TIMER VALUE IF NONE EXISTS IN THE NYDN OBJECT
if (nydn.interstitialTimer === undefined) {
    nydn.interstitialTimer = "5";
}

rg.interstitial.check = function(dir) {
    if ($("#rg.slide").length) {
        rg.interstitial.counter++;
        if (rg.interstitial.counter + rg.slide.no > rg.length) {
            rg.interstitial.counter--;
            return;
        }
        if (rg.interstitial.counter == rg.ads.interstitialCounter - 2)
            rg.interstitial.refresh();
        if (rg.interstitial.counter == rg.ads.interstitialCounter) {
            if (rg.slide.no < 1) {
                rg.interstitial.counter = 0;
                return;
            }
            setTimeout(function() {
                rg.interstitial.show();
                rg.interstitial.initPreview(dir);
            }, 100);
        }
    }
};
rg.interstitial.round = 0;
rg.interstitial.refresh = function() {
    rg.ads.template = "interstitial";
    if (
        (rg.platform === "mobile" || rg.platform === "tablet") &&
        !nydn.bidder.contains("jumpstart")
    ) {
        $("#rgi").find(".rg-ad").hide();
        $("#rgi-taboola-1").hide();
        $("#rgi-taboola-2").hide();
        rg.interstitial.round++;
        switch (rg.interstitial.round) {
            case 1:
                $("#rgi").find(".rg-ad").show();
                rg.ads.refresh("interstitial");
                break;
            case 2:
                $("#rgi-taboola-1").show();
                rg.interstitial.taboola1();
                break;
            case 3:
                $("#rgi").find(".rg-ad").show();
                rg.ads.refresh("interstitial");
                break;
            case 4:
                $("#rgi-taboola-2").show();
                rg.interstitial.taboola2();
                break;
            default:
                $("#rgi").find(".rg-ad").show();
                rg.ads.refresh("interstitial");
        }
    } else {
        rg.ads.refresh("interstitial");
    }
};
rg.interstitial.show = function() {
    rg.ads.template = "interstitial";
    rg.interstitial.counter = 0;
    rg.slide.jdetails.fadeOut();
    $("#rg-thumb-count").fadeOut(function() {
        $("#rg-share-toggle").removeClass("on");
        if ($("#rg-share-icons").is(":visible")) {
            $("#rg-share-icons").fadeOut();
        }
        if ($("#rg-share-toggle").is(":visible")) {
            $("#rg-share-toggle").fadeOut();
        }
    });

    if (!nydn.bidder.contains("jumpstart")) rg.taboola.fadeOut();
    $("#rgi").fadeIn(function() {
        $("#rg").addClass("interstitial");
        if (rg.platform != "desktop" || nydn.bidder.contains("jumpstart")) {
            $("#rg-ad-sticky-bottom").fadeOut();
        }
    });
};
rg.interstitial.hide = function(e) {
    e.preventDefault();
    rg.slide.jdetails.fadeIn();
    $("#rg-thumb-count").fadeIn();
    if (rg.platform === "mobile") {
        $("#rg-share-icons").fadeIn();
    } else {
        $("#rg-share-toggle").fadeIn();
    }
    if (!nydn.bidder.contains("jumpstart")) rg.taboola.fadeIn();
    $("#rgi").fadeOut(function() {
        // if (nydn.bidder.contains("optimera")) rg.ads.optimera.refresh();
        $("#rg").removeClass("interstitial");
        if (rg.platform != "desktop" || nydn.bidder.contains("jumpstart")) {
            $("#rg-ad-sticky-bottom").fadeIn();
        }
    });
};
rg.interstitial.taboolaed1 = false;
rg.interstitial.taboola1 = function() {
    if (!rg.interstitial.taboolaed1) {
        window._taboola = window._taboola || [];
        _taboola.push({
            photo: "auto"
        });
        nydnRequires([nydn.urls.taboola], function() {
            window._taboola = window._taboola || [];
            _taboola.push({
                mode: "thumbnails-i",
                container: "taboola-interstitial-mid-gallery",
                placement: "Interstitial Mid Gallery - iphone 4",
                target_type: "mix"
            });
            rg.interstitial.taboolaed1 = true;
            _taboola.push({
                flush: true
            });
        });
    }
};
rg.interstitial.taboolaed2 = false;
rg.interstitial.taboola2 = function() {
    if (!rg.interstitial.taboolaed2) {
        window._taboola = window._taboola || [];
        _taboola.push({
            photo: "auto"
        });
        nydnRequires([nydn.urls.taboola], function() {
            window._taboola = window._taboola || [];
            _taboola.push({
                mode: "thumbnails-i",
                container: "taboola-interstitial-mid-gallery-2",
                placement: "Interstitial Gallery Thumbnails - iphone 4 - 2",
                target_type: "mix"
            });
            rg.interstitial.taboolaed2 = true;
            _taboola.push({
                flush: true
            });
        });
    }
};

/*====REFACTORED====*/

//omniture flag for andy to know if auto advance was enabled
rg.interstitial.omtr = false;
rg.interstitial.initPreview = function(dir) {
    if (dir === "prev") {
        rg.interstitial.addDefaultStyle();
        return;
    }
    $("#rg #rgi-next, .rgi-to-slide")
        .on("click", rg.interstitial.disableNav)
        .addClass("disabled");
    rg.interstitial.countDown(nydn.interstitialTimer, false);
};
rg.interstitial.disableNav = function(e) {
    if (e.which === 37) {
        $("#rg #rgi-prev").trigger("click");
        return;
    }
    e.preventDefault();
    e.stopPropagation();
};
rg.interstitial.enableNav = function() {
    $("#rg #rgi-next, .rgi-to-slide")
        .off("click", rg.interstitial.disableNav)
        .removeClass("disabled");
};
rg.interstitial.countDownText = function(num) {
    if (rg.platform === "mobile" || window.innerWidth < 1160) {
        $(".rgi-to-slide span").text(num);
    } else {
        $("#rgi-next span").text(num);
    }
};
rg.interstitial.countDown = function(num, autoAdv) {
    ////console.log("###### INTERSTITIAL COUNTDOWN");
    rg.interstitial.addPreviewStyle(num);
    var count = setInterval(function() {
        rg.interstitial.countDownText(--num);
        if (num < 1) {
            clearInterval(count);
            rg.interstitial.enableNav();

            if (autoAdv) {
                rg.interstitial.omtr = true;

                if (!$("#rg.cover").is(":visible")) {
                    $("#rg #rgi-next").trigger("click");
                }

                // rg.interstitial.hide()
            } else {
                // Auto Advance = false.  Set auto advance for 3 seconds.
                setTimeout(function() {
                    rg.interstitial.omtr = true;

                    if (!$("#rg.cover").is(":visible")) {
                        $("#rg #rgi-next").trigger("click");
                    }
                }, 3000);
            }

            // ////console.log("###### AUTO ADVANCE");
        }

        // if(  $("#rg.cover").is(":visible")  ){
        // 	////console.log("###### COVER IS VISIBLE");
        // }else{
        // 	////console.log("###### COVER IS NOTTT VISIBLE");
        // };
    }, 1000);
};
rg.interstitial.addDefaultStyle = function() {
    if (rg.platform === "mobile" || window.innerWidth < 1160) {
        $("#rgi-next, #rgi-prev").hide();
        $(".rgi-to-slide")
            .empty()
            .text("Continue to Gallery")
            .addClass("default")
            .removeClass("preview");
        return;
    }
    $("#rgi-next").find("img").hide().end().addClass("default");
    rg.interstitial.enableNav();
};
rg.interstitial.addPreviewStyle = function(num) {
    var $next = $("#rgi-next");
    var $nextMobile = $(".rgi-to-slide");

    var imgNo = rg.slide.no;
    if (rg.platform === "mobile" || window.innerWidth < 1160) {
        $nextMobile.html(
            '<img src=""/>Next photo in <span>' + num + "</span></a> "
        );
        $("#rgi-next, #rgi-prev").hide();
        $nextMobile.find("img").attr("src", "");
        $nextMobile.find("img").attr("src", rg.json.images[imgNo].mobileSrc);
        $nextMobile.removeClass("default").addClass("preview").show();
        return;
    }

    $next.html('<img src=""/>Next photo in <span>' + num + "</span></a> ");
    $next.find("img").attr("src", "");
    $next.find("img").attr("src", rg.json.images[imgNo].mobileSrc);
    $next.removeClass("default");
};
rg.ads = {};
rg.wideUnit = {};
rg.boxUnit = {};
rg.ATFinterstitial = {};
rg.ads.refreshCounter = nydn.refresh;
rg.ads.interstitialCounter = nydn.interstitial;
rg.ads.xWide1 = nydn.adWide1 || "x101";
// rg.ads.xWide2 = nydn.adWide2 || "x104";
rg.ads.xBox1 = nydn.adBox1 || "x102";
rg.ads.xBox2 = nydn.adBox2 || "x103";
rg.ads.interstitial = nydn.adInterstitial || "x106";
rg.ads.out = nydn.adOut || "x100";
rg.ads.out2 = nydn.adOut2 || "x108";
rg.ads.targetPath = nydn.targetPath;
rg.ads.targetPathM = rg.ads.targetPath.replace("NYDN", "M.NYDN");
rg.ads.log = {};
rg.ads.log[rg.ads.out] = {};
rg.ads.log[rg.ads.out2] = {};
rg.ads.log[rg.ads.xWide1] = {};
rg.ads.log[rg.ads.xBox1] = {};
rg.ads.log[rg.ads.xBox2] = {};
rg.ads.log[rg.ads.xBox3] = {};
// rg.ads.log[rg.ads.xWide2] = {};
rg.ads.log[rg.ads.interstitial] = {};
rg.ads.lists = {};
rg.ads.lists.setup = function() {
    if (nydn.bidder.contains("amazon")) {
        rg.ads.amazon.apstag.prep();
        rg.ads.dfp.waitingList.push(rg.ads.amazon.apstag.url);
    }
    if (nydn.bidder.contains("indexExchange") && rg.platform !== "mobile") {
        rg.ads.dfp.waitingList.push(rg.ads.indexExchange.url);
    }
    if (nydn.bidder.contains("sonobi") && rg.platform !== "mobile") {
        rg.ads.openx.waitingList.push(rg.ads.sonobi.url);
        rg.ads.dfp.waitingList.push(rg.ads.sonobi.url);
        rg.ads.lotame.waitingList.push(rg.ads.sonobi.url);
    }
    if (nydn.bidder.contains("openx") && rg.platform !== "mobile") {
        rg.ads.dfp.waitingList.push(rg.ads.openx.url);
        rg.ads.lotame.waitingList.push(rg.ads.openx.url);
    }
    if (nydn.bidder.contains("dfp")) {
        rg.ads.dfp.waitingList.push(rg.ads.dfp.url);
        rg.ads.lotame.waitingList.push(rg.ads.dfp.url);
    }
    if (nydn.bidder.contains("lotame") && rg.platform !== "mobile") {
        rg.ads.lotame.getURL();
    }
    if (nydn.bidder.contains("yieldbot") && rg.platform == "mobile") {
        rg.ads.dfp.waitingList.push(rg.ads.yieldbot.url);
        rg.ads.yieldbot.waitingList.push(rg.ads.yieldbot.url);
    }
    if (nydn.bidder.contains("optimera")) {
        //rg.ads.optimera.getURL();
        // rg.ads.optimera.setup();
        //rg.ads.dfp.waitingList.push(rg.ads.optimera.src);
    }
};
rg.ads.initialize = function() {
    nydn.qa =
        window.location.href.indexOf("wwwqa") > -1 ||
        window.location.href.indexOf("mockups") > -1
            ? "true"
            : "false";
    if (nydn.bidder.contains("openxLite")) {
        nydn.bidder[nydn.bidder.indexOf("openxLite")] = "openx";
    }
    if (nydn.bidder.contains("dfp")) {
        rg.ads.lists.setup();
        // if (nydn.bidder.contains("amazon") && (rg.platform !== "mobile")) rg.ads.amazon.download();
        if (nydn.bidder.contains("sonobi") && rg.platform !== "mobile")
            rg.ads.sonobi.download();
        if (nydn.bidder.contains("indexExchange") && rg.platform !== "mobile")
            rg.ads.indexExchange.download();
        if (nydn.bidder.contains("openx") && rg.platform !== "mobile") {
            rg.ads.openx.download();
        } else {
            var googletag = googletag || {};
            googletag.cmd = googletag.cmd || [];
        }
        //if (nydn.bidder.contains("optimera")) rg.ads.optimera.setup();
        if (
            rg.platform === "mobile" &&
            nydn.bidder.contains("yieldbot") &&
            nydn.bidder.contains("dfp")
        )
            rg.ads.yieldbot.download();
        else if (nydn.bidder.contains("dfp")) rg.ads.dfp.download();
    }
};
//DFP
rg.ads.section = nydn.section;
rg.ads.dfp = {};
rg.ads.dfp.url = "http://www.googletagservices.com/tag/js/gpt.js";
rg.ads.dfp.waitingList = [];
rg.ads.dfp.checkList = { trials: 0, done: 0, bidder: {} };
rg.ads.dfp.defineSlotStr = "4692832/";
rg.ads.dfp.download = function() {
    nydnRequires(rg.ads.dfp.waitingList, function() {
        rg.ads.dfp.setup();
    });
};
rg.ads.dfp.setup = function() {
    ////console.log("nydn ðŸŽ¯  rg.ads.setup");
    nydnRequires([rg.ads.dfp.url], function() {
        ////console.log("nydn function: rg.ads.dfp.download âœ“ " + rg.platform);
        if (nydn.bidder.contains("jumpstart"))
            rg.ads.dfp.defineSlotStr =
                rg.platform === "mobile"
                    ? rg.ads.jumpstart.adunitM
                    : rg.ads.jumpstart.adunit;
        else
            rg.ads.dfp.defineSlotStr =
                rg.platform === "mobile" ? rg.ads.targetPathM : rg.ads.targetPath;
        rg.ads.dfp.cmdPush();
    });
};
rg.ads.dfp.cmdPush = function() {
    ////console.log("nydn ðŸŽ¯  rg.ads.cmdPush");
    googletag.cmd.push(function() {
        //JUMPSTART
        if (nydn.bidder.contains("jumpstart")) {
            rg.boxUnit = googletag
                .defineSlot(
                    rg.ads.dfp.defineSlotStr,
                    [[300, 250], [300, 600]],
                    "div-gpt-ad-" + rg.ads.xBox1
                )
                .addService(googletag.pubads())
                .setTargeting("position", rg.ads.xBox1);
            rg.boxUnit2 = googletag
                .defineSlot(
                    rg.ads.dfp.defineSlotStr,
                    [[300, 251]],
                    "div-gpt-ad-" + rg.ads.xBox2
                )
                .addService(googletag.pubads())
                .setTargeting("position", rg.ads.xBox2);

            if (rg.platform === "mobile") {
                rg.ATFinterstitial = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[300, 250]],
                        "div-gpt-ad-" + rg.ads.interstitial
                    )
                    .addService(googletag.pubads())
                    .setTargeting("position", rg.ads.interstitial);
                rg.wideUnit = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[300, 250], [320, 50]],
                        "div-gpt-ad-" + rg.ads.xWide1
                    )
                    .addService(googletag.pubads())
                    .setTargeting("template", rg.ads.template)
                    .setTargeting("oView", oVa["div-gpt-ad-" + rg.ads.xWide1])
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.xWide1)
                    .setTargeting("position", rg.ads.xWide1);
                rg.ads.log[rg.ads.xWide1].sizes = ["[300, 250]", "[320, 50]"];
                rg.ads.log[rg.ads.xWide1].oView = oVa["div-gpt-ad-" + rg.ads.xWide1];
                rg.ads.log[rg.ads.xWide1].Conpos = nydn.content + "-" + rg.ads.xWide1;
            } else {
                rg.ATFinterstitial = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[300, 250], [300, 600]],
                        "div-gpt-ad-" + rg.ads.interstitial
                    )
                    .addService(googletag.pubads())
                    .setTargeting("position", rg.ads.interstitial);

                rg.wideUnit = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[728, 90]],
                        "div-gpt-ad-" + rg.ads.xWide1
                    )
                    .addService(googletag.pubads())
                    .setTargeting("template", rg.ads.template)
                    .setTargeting("oView", oVa["div-gpt-ad-" + rg.ads.xWide1])
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.xWide1)
                    .setTargeting("position", rg.ads.xWide1);
                rg.ads.log[rg.ads.xWide1].sizes = ["[320, 50]"];
                rg.ads.log[rg.ads.xWide1].oView = oVa["div-gpt-ad-" + rg.ads.xWide1];
                rg.ads.log[rg.ads.xWide1].Conpos = nydn.content + "-" + rg.ads.xWide1;
            }
            rg.ads.jumpstart.exe();
        } else {
            // NON JUMPSTART
            rg.boxUnit = googletag
                .defineSlot(
                    rg.ads.dfp.defineSlotStr,
                    [[300, 250]],
                    "div-gpt-ad-" + rg.ads.xBox1
                )
                .addService(googletag.pubads())
                .setTargeting("oView", oVa["div-gpt-ad-" + rg.ads.xBox1])
                .setTargeting("Conpos", nydn.content + "-" + rg.ads.xBox1)
                .setTargeting("position", rg.ads.xBox1);
            rg.ads.log[rg.ads.xBox1].sizes = ["[300,250]"];
            rg.ads.log[rg.ads.xBox1].oView = oVa["div-gpt-ad-" + rg.ads.xBox1];
            rg.ads.log[rg.ads.xBox1].Conpos = nydn.content + "-" + rg.ads.xBox1;

            // DEFINE INTERSTITIAL SLOTS
            if (rg.platform === "mobile") {
                rg.ATFinterstitial = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[300, 250], [320, 100], [320, 50]],
                        "div-gpt-ad-" + rg.ads.interstitial
                    )
                    .addService(googletag.pubads())
                    .setTargeting("oView", oVa["div-gpt-ad-" + rg.ads.interstitial])
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.interstitial)
                    .setTargeting("position", rg.ads.interstitial);
                rg.ads.log[rg.ads.interstitial].sizes = [
                    "[300,250], [320, 100], [320, 50]"
                ];

                rg.wideUnit = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[320, 50]],
                        "div-gpt-ad-" + rg.ads.xWide1
                    )
                    .addService(googletag.pubads())
                    .setTargeting("template", rg.ads.template)
                    .setTargeting("oView", oVa["div-gpt-ad-" + rg.ads.xWide1])
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.xWide1)
                    .setTargeting("position", rg.ads.xWide1);
                rg.ads.log[rg.ads.xWide1].oView = oVa["div-gpt-ad-" + rg.ads.xWide1];
                rg.ads.log[rg.ads.xWide1].Conpos = nydn.content + "-" + rg.ads.xWide1;
                rg.ads.log[rg.ads.xWide1].sizes = ["[320,50]"];
            } else {
                rg.ATFinterstitial = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[300, 250], [300, 600], [160, 600]],
                        "div-gpt-ad-" + rg.ads.interstitial
                    )
                    .addService(googletag.pubads())
                    .setTargeting("oView", oVa["div-gpt-ad-" + rg.ads.interstitial])
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.interstitial)
                    .setTargeting("position", rg.ads.interstitial);
                rg.ads.log[rg.ads.interstitial].sizes = [
                    "[300,250], [300, 600], [160, 600]"
                ];

                rg.wideUnit = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[728, 90]],
                        "div-gpt-ad-" + rg.ads.xWide1
                    )
                    .addService(googletag.pubads())
                    .setTargeting("template", rg.ads.template)
                    .setTargeting("oView", oVa["div-gpt-ad-" + rg.ads.xWide1])
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.xWide1)
                    .setTargeting("position", rg.ads.xWide1);
                rg.ads.log[rg.ads.xWide1].sizes = ["[728,90]"];
            }

            rg.ads.log[rg.ads.interstitial].oView =
                oVa["div-gpt-ad-" + rg.ads.interstitial];
            rg.ads.log[rg.ads.interstitial].Conpos =
                nydn.content + "-" + rg.ads.interstitial;
            rg.ads.log[rg.ads.xWide1].oView = oVa["div-gpt-ad-" + rg.ads.xWide1];
            rg.ads.log[rg.ads.xWide1].Conpos = nydn.content + "-" + rg.ads.xWide1;

            if (nydn.outOfPage == "true") {
                rg.outUnit = googletag
                    .defineOutOfPageSlot(
                        rg.ads.dfp.defineSlotStr,
                        "div-gpt-ad-" + rg.ads.out
                    )
                    .addService(googletag.pubads())
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.out)
                    .setTargeting("position", rg.ads.out)
                    .setCollapseEmptyDiv(true, true);
                rg.ads.log[rg.ads.out].sizes = ["[1,1]"];
                rg.ads.log[rg.ads.out].oView = oVa["div-gpt-ad-" + rg.ads.out];
                rg.ads.log[rg.ads.out].Conpos = nydn.content + "-" + rg.ads.out;
            }
            if (nydn.adOut2 === "x108") {
                rg.outUnit2 = googletag
                    .defineSlot(
                        rg.ads.dfp.defineSlotStr,
                        [[1, 1]],
                        "div-gpt-ad-" + rg.ads.out2
                    )
                    .addService(googletag.pubads())
                    .setTargeting("Conpos", nydn.content + "-" + rg.ads.out2)
                    .setTargeting("position", rg.ads.out)
                    .setCollapseEmptyDiv(true, true);
                rg.ads.log[rg.ads.out2].sizes = ["[1,1]"];
                rg.ads.log[rg.ads.out2].oView = oVa["div-gpt-ad-" + rg.ads.out2];
                rg.ads.log[rg.ads.ou2t].Conpos = nydn.content + "-" + rg.ads.out2;
            }
        }

        ////console.log("nydn function: rg.ads.dfp.setup");
        //if (nydn.bidder.contains("amazon") && (rg.platform !== "mobile")) rg.ads.amazon.exe();
        if (nydn.bidder.contains("amazon") && rg.platform !== "mobile")
            rg.ads.amazon.apstag.download();
        if (nydn.bidder.contains("indexExchange") && rg.platform !== "mobile")
            rg.ads.indexExchange.exe();
        googletag
            .pubads()
            .setTargeting("Content", nydn.content)
            .setTargeting("Package", nydn.packageName)
            .setTargeting("ContentID", nydn.contentID)
            .setTargeting("nsfa", nydn.nsfa)
            .setTargeting("qa", nydn.qa)
            .setTargeting("testAd", nydn.testAd)
            .setTargeting("flexKey", nydn.flexKey)
            .setTargeting("viewport", rg.platform)
            .setTargeting("adViewport", rg.adViewport);

        rg.ads.log.Bidders = nydn.bidder;
        rg.ads.log.Content = nydn.content;
        rg.ads.log.Package = nydn.packageName;
        rg.ads.log.ContentID = nydn.contentID;
        rg.ads.log.nsfa = nydn.nsfa;
        rg.ads.log.qa = nydn.qa;
        rg.ads.log.testAd = nydn.testAd;
        rg.ads.log.viewport = rg.platform;
        rg.ads.log.adViewport = rg.adViewport;
        rg.ads.log.ccaud = cc_client_id;

        if (rg.platform === "mobile" && nydn.bidder.contains("yieldbot")) {
            googletag.pubads().setTargeting("ybot", yieldbot.getPageCriteria());
        }

        if (document.referrer) {
            var vm_referer_url = document.referrer;
            var vm_referer = vm_referer_url.match(
                /(google|yahoo|bing|live|msn|twitter|facebook)\./
            );
            if (vm_referer && vm_referer[1])
                googletag.pubads().setTargeting("referrer", vm_referer[1]);
        }

        googletag.pubads().enableAsyncRendering();
        googletag.pubads().enableSingleRequest();
        googletag.pubads().disableInitialLoad();
        googletag.enableServices();

        if (nydn.bidder.contains("jumpstart")) rg.ads.jumpstart.download();
        if (nydn.bidder.contains("lotame") && rg.platform !== "mobile")
            rg.ads.lotame.download();
        if (nydn.bidder.contains("optimera")) rg.ads.optimera.download2();

        ////console.log("nydn function: rg.ads.dfp.exe âœ“");

        if (!nydn.bidder.contains("jumpstart") && nydn.outOfPage == "true")
            rg.ads.oop.push();
        if (!nydn.bidder.contains("jumpstart") && nydn.adOut2 === "x108")
            rg.ads.oop2.push();
    });
};
//OUT OF PAGE
rg.ads.oop = {};
rg.ads.oop.push = function() {
    googletag.cmd.push(function() {
        googletag.display("div-gpt-ad-" + rg.ads.out);
    });
    // rg.ads.oop.refresh();
};
rg.ads.oop.refresh = function() {
    if (!nydn.bidder.contains("jumpstart") && nydn.outOfPage == "true") {
        googletag.pubads().refresh([rg.outUnit]);
        ////console.log("nydn function: rg.ads.refreshing adUnitx: " + rg.ads.out);
    }
};
rg.ads.oop2 = {};
rg.ads.oop2.push = function() {
    googletag.cmd.push(function() {
        googletag.display("div-gpt-ad-" + rg.ads.out2);
    });
    rg.ads.oop2.refresh();
};
rg.ads.oop2.refresh = function() {
    if (!nydn.bidder.contains("jumpstart") && nydn.adOut2 === "x108") {
        googletag.pubads().refresh([rg.outUnit2]);
        ////console.log("nydn function: rg.ads.refreshing adUnity: " + rg.ads.out2);
    }
};

rg.ads.wait = {};
rg.ads.wait.pubads = function() {
    ////console.log("nydn ðŸŽ¯  rg.ads.wait.pubads");
    if (!$.isFunction(googletag.pubads)) {
        setTimeout(rg.ads.wait.pubads, 100);
        return;
    }
    rg.ads.wait.refresh();
};
rg.ads.wait.refresh = function() {
    ////console.log("nydn ðŸŽ¯  rg.ads.wait.refresh");
    if (nydn.bidder.contains("jumpstart") || rg.platform == "mobile")
        rg.ads.dfp.checkList.done = 1;
    if (
        !$.isFunction(googletag.pubads().refresh) ||
        rg.ads.dfp.checkList.done < 1
    ) {
        //rg.ads.dfp.checkList.done!=1 is only applied to new amazon so far
        setTimeout(rg.ads.wait.refresh, 100);
        return;
    }
    rg.ads.refreshCheck(rg.ads.template);
};
rg.ads.template = rg.ads.template || "cover";
rg.ads.refreshed = false;
rg.ads.refresh = function(templateName) {
    ////console.log("nydn ðŸŽ¯  rg.ads.refresh");
    if (nydn.bidder.contains("dfp")) {
        nydnRequires(rg.ads.dfp.waitingList, function() {
            ////console.log("nydn ads: DFP waiting list âœ“âœ“âœ“ " + templateName);
            rg.ads.wait.pubads();
        });
    }
};
rg.ads.refreshCheck = function(templateName) {
    ////console.log("nydn ðŸŽ¯  rg.ads.refreshCheck");
    if (nydn.bidder.contains("indexExchange") && rg.platform !== "mobile")
        rg.ads.indexExchange.prep(templateName);
    if (
        rg.ads.refreshed &&
        nydn.bidder.contains("amazon") &&
        rg.platform !== "mobile"
    ) {
        //   amznads.getAdsCallback('3088', function() {
        //             amznads.setTargetingForGPTAsync('amznslots');
        // amznKeysToTarget.forEach(function(key) {
        // 				slot.setTargeting(key, '');
        // 			});
        rg.ads.amazon.apstag.slotRenderEnded();
        rg.ads.amazon.apstag.fetchBids();
        if (nydn.bidder.contains("indexExchange") && rg.platform !== "mobile")
            rg.ads.indexExchange.hook();
        else rg.ads.refreshTemplate(templateName);
        // });
        //googletag.pubads().clearTargeting('amznslots');
        //rg.ads.refreshTemplate(templateName);
    } else {
        rg.ads.refreshed = true;
        if (nydn.bidder.contains("indexExchange") && rg.platform !== "mobile")
            rg.ads.indexExchange.hook();
        else rg.ads.refreshTemplate(templateName);
    }
};
rg.ads.refreshTemplate = function(templateName) {
    ////console.log("nydn ðŸŽ¯  rg.ads.refreshTemplate " + templateName);
    if (nydn.bidder.contains("optimera") && !nydn.bidder.contains("jumpstart"))
        rg.ads.optimera.refresh();
    if (rg.platform === "mobile" && nydn.bidder.contains("yieldbot")) {
        nydnRequires(rg.ads.yieldbot.waitingList, function() {
            try {
                googletag.pubads().setTargeting("ybot", yieldbot.getPageCriteria());
            } catch (e) {
                /*ignore*/
            }
            rg.ads.refreshSwitch(templateName);
        });
    } else {
        nydnRequires(rg.ads.dfp.waitingList, function() {
            rg.ads.refreshSwitch(templateName);
        });
    }
};
rg.ads.refreshSwitch = function(templateName) {
    ////console.log("nydn ðŸŽ¯  rg.ads.refreshSwitch " + templateName);
    if (nydn.bidder.contains("amazon") && rg.platform != "mobile")
        rg.ads.amazon.apstag.setDisplayBids();
    switch (templateName) {
        case "cover":
            if (nydn.bidder.contains("jumpstart") && rg.platform === "mobile") {
                ////console.log(
                //   "nydn function: rg.ads.refreshingTemplate: " +
                //     templateName +
                //     " adUnit: " +
                //     rg.ads.xWide1 +
                //     " NOT refreshed - Jumpstart Mobile"
                // );
            } else {
                if (!rg.cover.adsInitialized) {
                    if (rg.platform === "mobile" && nydn.bidder.contains("yieldbot"))
                        ybotq.push(function() {
                            googletag.cmd.push(function() {
                                googletag.display("div-gpt-ad-" + rg.ads.xWide1);
                            });
                        });
                    else
                        googletag.cmd.push(function() {
                            googletag.display("div-gpt-ad-" + rg.ads.xWide1);
                        });
                    rg.cover.adsInitialized = true;
                }
                rg.wideUnit.setTargeting("template", "cover");
                googletag.pubads().refresh([rg.wideUnit]);
                ////console.log(
                //   "nydn function: rg.ads.refreshingTemplate: " +
                //     templateName +
                //     " adUnit: " +
                //     rg.ads.xWide1
                // );
            }
            break;
        case "slide":
            if (!rg.slide.adsInitialized) {
                if (nydn.bidder.contains("jumpstart")) {
                    googletag.cmd.push(function() {
                        googletag.display("div-gpt-ad-" + rg.ads.xWide1);
                    });
                    if (rg.platform === "desktop") {
                        googletag.cmd.push(function() {
                            googletag.display("div-gpt-ad-" + rg.ads.xBox1);
                        });
                        googletag.cmd.push(function() {
                            googletag.display("div-gpt-ad-" + rg.ads.xBox2);
                        });
                    }
                } else if (rg.platform === "mobile" && nydn.bidder.contains("yieldbot"))
                    ybotq.push(function() {
                        googletag.cmd.push(function() {
                            googletag.display("div-gpt-ad-" + rg.ads.xWide1);
                        });
                    });
                else if (rg.platform != "desktop")
                    googletag.cmd.push(function() {
                        googletag.display("div-gpt-ad-" + rg.ads.xWide1);
                    });
                else
                    googletag.cmd.push(function() {
                        googletag.display("div-gpt-ad-" + rg.ads.xBox1);
                    });
                rg.slide.adsInitialized = true;
            }

            if (nydn.bidder.contains("jumpstart")) {
                googletag.pubads().refresh([rg.wideUnit]);
                ////console.log(
                //   "nydn function: rg.ads.refreshingTemplate: " +
                //     templateName +
                //     " adUnit: " +
                //     rg.ads.xWide1
                // );
                if (rg.platform === "desktop") {
                    googletag.pubads().refresh([rg.boxUnit]);
                    ////console.log(
                    //   "nydn function: rg.ads.refreshingTemplate: " +
                    //     templateName +
                    //     " adUnit: " +
                    //     rg.ads.xBox1
                    // );
                    googletag.pubads().refresh([rg.boxUnit2]);
                    ////console.log(
                    //   "nydn function: rg.ads.refreshingTemplate: " +
                    //     templateName +
                    //     " adUnit: " +
                    //     rg.ads.xBox2
                    // );
                }
            } else if (rg.platform != "desktop") {
                rg.wideUnit.setTargeting("template", "slide");
                googletag.pubads().refresh([rg.wideUnit]);
                ////console.log(
                //   "nydn function: rg.ads.refreshingTemplate: " +
                //     templateName +
                //     " adUnit: " +
                //     rg.ads.xWide1
                // );
            } else {
                googletag.pubads().refresh([rg.boxUnit]);
                ////console.log(
                //   "nydn function: rg.ads.refreshingTemplate: " +
                //     templateName +
                //     " adUnit: " +
                //     rg.ads.xBox1
                // );
            }
            break;
        case "interstitial":
            if (!rg.interstitial.adsInitialized) {
                if (rg.platform === "mobile" && nydn.bidder.contains("yieldbot"))
                    ybotq.push(function() {
                        googletag.cmd.push(function() {
                            googletag.display("div-gpt-ad-" + rg.ads.interstitial);
                        });
                    });
                else
                    googletag.cmd.push(function() {
                        googletag.display("div-gpt-ad-" + rg.ads.interstitial);
                    });
                rg.interstitial.adsInitialized = true;
            }
            googletag.pubads().refresh([rg.ATFinterstitial]);
            ////console.log(
            //   "nydn function: rg.ads.refreshingTemplate: " +
            //     templateName +
            //     " adUnit: " +
            //     rg.ads.interstitial
            // );
            break;
    }
};
//AMAZON
rg.ads.amazon = {};
rg.ads.amazon.url = "http://c.amazon-adsystem.com/aax2/amzn_ads.js";
rg.ads.amazon.download = function() {
    nydnRequires([rg.ads.amazon.url], function() {
        ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.download âœ“");
        try {
            amznads.getAdsCallback("3088", function() {
                amznads.setTargetingForGPTAsync("amznslots");
            });
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.getAdsCallback âœ“");
        } catch (e) {
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.getAdsCallback FAIL");
        }
    });
};
rg.ads.amazon.exe = function() {
    nydnRequires(rg.ads.dfp.waitingList, function() {
        ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.exe");
        try {
            amznads.setTargetingForGPTAsync("amznslots");
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.exe âœ“");
        } catch (e) {
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.exe FAIL");
        }
    });
};
var raScript;
rg.ads.amazon.downloadTest = function() {
    raScript = document.createElement("script");
    raScript.async = true;
    raScript.type = "text/javascript";
    raScript.src = rg.ads.amazon.url;
    document.getElementById("rg-scripts").appendChild(raScript);
    rg.ads.amazon.setup();
};
//OLD AMAZON
{
    rg.ads.amazon = {};
    rg.ads.amazon.url = "http://c.amazon-adsystem.com/aax2/amzn_ads.js";
    rg.ads.amazon.download = function() {
        nydnRequires([rg.ads.amazon.url], function() {
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.download âœ“");
            try {
                amznads.getAdsCallback("3088", function() {
                    amznads.setTargetingForGPTAsync("amznslots");
                });
                ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.getAdsCallback âœ“");
            } catch (e) {
                ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.getAdsCallback FAIL");
            }
        });
    };
    rg.ads.amazon.exe = function() {
        nydnRequires(rg.ads.dfp.waitingList, function() {
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.exe");
            try {
                amznads.setTargetingForGPTAsync("amznslots");
                ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.exe âœ“");
            } catch (e) {
                ////console.log("nydn ra  ðŸŽ¯   rg.ads.amazon.exe FAIL");
            }
        });
    };
}
//NEW AMAZON
{
    rg.ads.amazon.apstag = {};
    rg.ads.amazon.apstag.url = "http://c.amazon-adsystem.com/aax2/apstag.js";
    rg.ads.amazon.apstag.slotRenderEnded = function() {
        ////console.log("nydn ðŸŽ¯  rg.ads.amazon.apstag.slotRenderEnded âœ“");
        var amznKeysToTarget = ["amznbid", "amzniid"];
        googletag.cmd.push(function() {
            googletag.pubads().addEventListener("slotRenderEnded", function(e) {
                var googletagSlots = rg.ads.amazon.apstag.keyGoogletagSlots(
                    googletag.pubads().getSlots()
                );
                var slot = googletagSlots[e.slot.getSlotElementId()];
                // loop over keys and clear targeting for each key
                amznKeysToTarget.forEach(function(key) {
                    // NOTE: there isn't a googletag API to clear one key from a googletag slot // without clearing all of the other keys, so setting to a blank string
                    slot.setTargeting(key, "");
                });
            });
        });
    };
    rg.ads.amazon.apstag.keyGoogletagSlots = function(slots) {
        return slots.reduce(function(o, slot) {
            var slotID = slot.getSlotElementId();
            o[slotID] = slot;
            return o;
        }, {});
    };

    rg.ads.amazon.apstag.prep = function() {
        !(function(a9, a, p, s, t, A, g) {
            if (a[a9]) return;
            function q(c, r) {
                a[a9]._Q.push([c, r]);
            }
            a[a9] = {
                init: function() {
                    q("i", arguments);
                },
                fetchBids: function() {
                    q("f", arguments);
                },
                setDisplayBids: function() {},
                _Q: []
            };
        })(
            "apstag",
            window,
            document,
            "script",
            "//c.amazon-adsystem.com/aax2/apstag.js"
        );
        ////console.log("nydn ðŸŽ¯  rg.ads.amazon.apstag.prep");
    };
    rg.ads.amazon.apstag.download = function() {
        nydnRequires([rg.ads.amazon.apstag.url], function() {
            ////console.log("nydn ðŸŽ¯  rg.ads.amazon.apstag.download âœ“");
            rg.ads.amazon.apstag.initialize();
        });
    };
    rg.ads.amazon.apstag.initialize = function() {
        nydnRequires([rg.ads.amazon.apstag.url], function() {
            ////console.log("nydn ðŸŽ¯  rg.ads.amazon.apstag.initialize");
            apstag.init({
                pubID: "3088",
                adServer: "googletag",
                bidTimeout: 2e3
            });
            rg.ads.amazon.apstag.fetchBids();
        });
    };
    rg.ads.amazon.apstag.fetchBids = function() {
        ////console.log("nydn ðŸŽ¯  rg.ads.amazon.apstag.fetchBids");
        var nydnSlots = [],
            nydnSlot = {};
        nydnSlots = [
            { slotID: "div-gpt-ad-x100", sizes: [[1, 1]] },
            { slotID: "div-gpt-ad-x101", sizes: [[728, 90]] },
            { slotID: "div-gpt-ad-x102", sizes: [[300, 250]] },
            { slotID: "div-gpt-ad-x106", sizes: [[300, 250], [300, 600], [160, 600]] }
        ];
        ////console.log(
        //   "nydn ðŸŽ¯  rg.ads.amazon.apstag.fetchBids slots " +
        //     JSON.stringify(nydnSlots)
        // );
        apstag.fetchBids({ slots: nydnSlots }, function(bids) {
            rg.ads.amazon.apstag.bids = bids;
            rg.ads.dfp.checkList.bidder["amazon"] = true;
            rg.ads.dfp.checkList.done += 1;
            ////console.log(
            //   "nydn ðŸŽ¯  rg.ads.amazon.apstag.fetchBids bids " + JSON.stringify(bids)
            // );
        });
    };
    rg.ads.amazon.apstag.setDisplayBids = function() {
        var bid = rg.ads.amazon.apstag.bids;
        ////console.log(
        //   "nydn ðŸŽ¯  rg.ads.amazon.apstag.setDisplayBids bid= " + JSON.stringify(bid)
        // );
        apstag.setDisplayBids();
        //rg.ads.amazon.apstag.slotRenderEnded();
    };
}
//SONOBI
rg.ads.sonobi = {};
rg.ads.sonobi.url = "http://mtrx.go.sonobi.com/morpheus.nydailynews.6654.js";
rg.ads.sonobi.waitingList = [];
rg.ads.sonobi.download = function() {
    nydnRequires(rg.ads.sonobi.waitingList, function() {
        rg.ads.sonobi.setup();
    });
};
rg.ads.sonobi.setup = function() {
    nydnRequires([rg.ads.sonobi.url], function() {
        ////console.log("nydn function: rg.ads.sonobi.download âœ“");
        sbi_morpheus.enableReactiveSizes();
        sbi_morpheus.register(
            "div-gpt-ad-" + rg.ads.xWide1,
            "b2d486d7815142a5d9b3"
        );
        sbi_morpheus.register("div-gpt-ad-" + rg.ads.xBox1, "ebfb261c83ba67a16a8e");
        sbi_morpheus.register(
            "div-gpt-ad-" + rg.ads.interstitial,
            "ebfb261c83ba67a16a8e"
        );
        ////console.log("nydn function: rg.ads.sonobi.setup");
    });
};
rg.ads.sonobi.exe = function() {
    nydnRequires(rg.ads.dfp.waitingList, function() {
        ////console.log("nydn function: rg.ads.sonobi.exe âœ“");
    });
};
//OPENX
rg.ads.openx = {};
rg.ads.openx.url =
    "http://ox-d.nydailynews.servedbyopenx.com/w/1.0/jstag?nc=4692832-NYDN";
rg.ads.openx.waitingList = [];
rg.ads.openx.download = function() {
    nydnRequires(rg.ads.openx.waitingList, function() {
        rg.ads.openx.setup();
    });
};
rg.ads.openx.setup = function() {
    nydnRequires([rg.ads.openx.url], function() {
        ////console.log("nydn function: rg.ads.openx.download âœ“");
    });
};
//JUMPSTART
rg.ads.jumpstart = {};
rg.ads.jumpstart.adunit = "/2909/dna.gallery.new.dfp";
rg.ads.jumpstart.adunitM = "/2909/dna.gallery.new.mob";
rg.ads.jumpstart.url =
    "http://nexus.ensighten.com/hearst/jumpstartauto/Bootstrap.js";
rg.ads.jumpstart.exe = function() {
    rg.wideUnit.setTargeting("prod", "gallery");
    rg.boxUnit.setTargeting("prod", "gallery");
    rg.ATFinterstitial.setTargeting("prod", "gallery");
    rg.boxUnit2.setTargeting("prod", "gallery");
    // rg.wideUnit2.setTargeting('prod', 'gallery');
    if (jagvars.type !== "null") {
        rg.wideUnit.setTargeting("type", jagvars.type);
        rg.boxUnit.setTargeting("type", jagvars.type);
        rg.ATFinterstitial.setTargeting("type", jagvars.type);
        rg.boxUnit2.setTargeting("type", jagvars.type);
        // rg.wideUnit2.setTargeting("type", jagvars.type);
    }
    if (jagvars.year !== "null") {
        rg.wideUnit.setTargeting("yr", jagvars.year);
        rg.boxUnit.setTargeting("yr", jagvars.year);
        rg.ATFinterstitial.setTargeting("yr", jagvars.year);
        rg.boxUnit2.setTargeting("yr", jagvars.year);
        // rg.wideUnit2.setTargeting("yr", jagvars.year);
    }
    if (jagvars.make !== "null") {
        rg.wideUnit.setTargeting("mak", jagvars.make);
        rg.boxUnit.setTargeting("mak", jagvars.make);
        rg.ATFinterstitial.setTargeting("mak", jagvars.make);
        rg.boxUnit2.setTargeting("mak", jagvars.make);
        // rg.wideUnit2.setTargeting("mak", jagvars.make);
    }
    if (jagvars.model !== "null") {
        rg.wideUnit.setTargeting("mod", jagvars.model);
        rg.boxUnit.setTargeting("mod", jagvars.model);
        rg.ATFinterstitial.setTargeting("mod", jagvars.model);
        rg.boxUnit2.setTargeting("mod", jagvars.model);
        // rg.wideUnit2.setTargeting("mod", jagvars.model);
    }
    if (jagvars.style !== "null") {
        rg.wideUnit.setTargeting("style", jagvars.style);
        rg.boxUnit.setTargeting("style", jagvars.style);
        rg.ATFinterstitial.setTargeting("style", jagvars.style);
        rg.boxUnit2.setTargeting("style", jagvars.style);
        // rg.wideUnit2.setTargeting("style", jagvars.style);
    }
    if (jagvars.fuel !== "null") {
        rg.wideUnit.setTargeting("fuel", jagvars.fuel);
        rg.boxUnit.setTargeting("fuel", jagvars.fuel);
        rg.ATFinterstitial.setTargeting("fuel", jagvars.fuel);
        rg.boxUnit2.setTargeting("fuel", jagvars.fuel);
        // rg.wideUnit2.setTargeting("fuel", jagvars.fuel);
    }
    ////console.log("nydn function: rg.ads.jumpstart.exe âœ“");
};
rg.ads.jumpstart.download = function() {
    nydnRequires([rg.ads.jumpstart.url], function() {
        ////console.log("nydn function: rg.ads.jumpstart.download âœ“");
    });
};
//LOTAME
rg.ads.lotame = {};
rg.ads.lotame.waitingList = [];
rg.ads.lotame.getURL = function() {
    rg.ads.lotame.url = get_cc_extr_url();
};
rg.ads.lotame.download = function() {
    nydnRequires(rg.ads.lotame.waitingList, function() {
        rg.ads.lotame.setup();
    });
};
rg.ads.lotame.setup = function() {
    nydnRequires([rg.ads.lotame.url], function() {
        ////console.log("nydn function: rg.ads.lotame.download âœ“");
    });
};
rg.ads.lotame.exe = function() {
    ////console.log("nydn function: rg.ads.lotame.exe");
};

function get_cc_extr_url() {
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
            domain = document.cookie.slice(valStartDc, valEndDc);
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
                id = document.cookie.slice(valStartId, valEndId);
            }
        }
    }
    var cc_url = "http://ad" + domain;
    if (typeof portNumber != "undefined" && portNumber != null)
        cc_url = cc_url + ":" + portNumber;
    cc_url =
        cc_url + "/5/c=" + cc_client_id + "/pe=y/callback=" + cc_extr_callback;
    if (idCookie) cc_url = cc_url + "/pid=" + id;
    return cc_url;
}
function ccauds(data) {
    var dartCCKey = "ccaud";
    var dartCC = "";
    if (typeof data != "undefined") {
        for (var cci = 0; cci < data.Profile.Audiences.Audience.length; cci++) {
            if (cci > 0 && data.Profile.Audiences.Audience[cci].abbr != "")
                dartCC += ",";
            dartCC += data.Profile.Audiences.Audience[cci].abbr;
        }
        nydnRequires([rg.ads.dfp.url], function() {
            googletag.cmd.push(function() {
                googletag.pubads().setTargeting(dartCCKey, [dartCC]);
                ////console.log("nydn function: rg.ads.lotame.exe âœ“");
            });
        });
    }
}
rg.ads.optimera = {};
rg.ads.optimera.src = "";
// rg.ads.optimera.url="http://optimera.elasticbeanstalk.com/test/oPS_Expanded_20160308_1924_NYDNGallery.js";
// rg.ads.optimera.url = "http://optimera.elasticbeanstalk.com/oPS.js";
rg.ads.optimera.url =
    "https://s3.amazonaws.com/elasticbeanstalk-us-east-1-397719490216/external_json/oPS.js";
var oDv = [];
var oVa = {};
rg.ads.optimera.setup = function() {
    if (rg.platform === "desktop") {
        oDv = ["1", "div-gpt-ad-x101", "div-gpt-ad-x102", "div-gpt-ad-x106"];
        oVa = {
            "div-gpt-ad-x101": ["NULL"],
            "div-gpt-ad-x102": ["NULL"],
            "div-gpt-ad-x106": ["NULL"]
        };
    } else {
        oDv = ["1", "div-gpt-ad-x101", "div-gpt-ad-x106"];
        oVa = {
            "div-gpt-ad-x101": ["NULL"],
            "div-gpt-ad-x106": ["NULL"]
        };
    }
    rg.ads.optimera.download();
};
rg.ads.optimera.getURL = function() {
    var optimeraHost = window.location.host;
    var optimeraPathName = window.location.pathname;
    var rand = Math.random();
    rg.ads.optimera.src =
        "https://s3.amazonaws.com/elasticbeanstalk-us-east-1-397719490216/json/" +
        optimeraHost +
        optimeraPathName +
        ".js?t=" +
        rand;
};
rg.ads.optimera.download = function() {
    (function() {
        var optimeraHost = window.location.host;
        var optimeraPathName = window.location.pathname;
        var optimeraScript = document.createElement("script");
        optimeraScript.async = true;
        optimeraScript.type = "text/javascript";
        var rand = Math.random();
        optimeraScript.src =
            "https://s3.amazonaws.com/elasticbeanstalk-us-east-1-397719490216/json/client/" +
            oDv[0] +
            "/" +
            optimeraHost +
            optimeraPathName +
            ".js?t=" +
            rand;
        rg.ads.optimera.src = optimeraScript.src;
        var node = document.getElementsByTagName("script")[0];
        node.parentNode.insertBefore(optimeraScript, node);
        // try {
        // 			node.parentNode.insertBefore(optimeraScript,node);
        // 			alert("TRIED ASSHOLE..."+rg.ads.optimera.src);
        // 		}
        // 		catch(err){
        // 			alert("ERORR BITCH..."+err);
        // 			anyError = true;
        // 		}
        // 		finally{
        // 			alert("FINALLY CUNT");
        // 			if (!anyError) rg.ads.optimera.src = optimeraScript.src;
        // 			alert("rg.ads.optimera.src "+rg.ads.optimera.src);
        // 		}
    })();
};
rg.ads.optimera.exe = function() {
    ////console.log("nydn function: rg.ads.optimera.exe");
    nydnRequires([rg.ads.optimera.src, rg.ads.dfp.url], function() {
        ////console.log("nydn function: rg.ads.optimera.src âœ“");
        if (rg.platform === "desktop") {
            googletag
                .pubads()
                .setTargeting("oView", oVa["div-gpt-ad-x101"])
                .setTargeting("oView", oVa["div-gpt-ad-x102"])
                .setTargeting("oView", oVa["div-gpt-ad-x106"]);
        } else {
            googletag
                .pubads()
                .setTargeting("oView", oVa["div-gpt-ad-x101"])
                .setTargeting("oView", oVa["div-gpt-ad-x106"]);
        }
    });
};
rg.ads.optimera.download2 = function() {
    nydnRequires([rg.ads.optimera.url], function() {
        ////console.log("nydn function: rg.ads.optimera.url âœ“");
    });
};
rg.ads.optimera.refresh = function() {
    nydnRequires([rg.ads.optimera.url], function() {
        ////console.log("nydn function: rg.ads.optimera.refresh");
        oPageUnload("1");
    });
};
//INDEXEXCHANGE
var cygnus_callback_timeout;
var cygnus_callback_refresh = {};
rg.ads.indexExchange = {};
rg.ads.indexExchange.url = "http://js-sec.indexww.com/ht/nydn.js";
rg.ads.indexExchange.download = function() {
    window.indexapi = window.indexapi || {};
    window.indexapi.disableInitialLoad = true;
    ////console.log("nydn ra  ðŸŽ¯   rg.ads.indexExchange.download âœ“");
};
rg.ads.indexExchange.exe = function() {
    nydnRequires(rg.ads.dfp.waitingList, function(a) {
        ////console.log("nydn ra  ðŸŽ¯   rg.ads.indexExchange.exe");
        if (
            typeof indexapi !== "undefined" &&
            typeof indexapi.cygnus_args !== "undefined" &&
            typeof indexapi.cygnus_args.slots !== "undefined"
        ) {
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.indexExchange.exe âœ“");
        } else {
            ////console.log("nydn ra  ðŸŽ¯   rg.ads.indexExchange.exe FAIL");
        }
    });
};
rg.ads.indexExchange.prep = function(templateName) {
    ////console.log("nydn ra  ðŸŽ¯   rg.ads.indexExchange.prep");
    cygnus_callback_timeout = 1000;
    cygnus_callback_refresh = function() {
        rg.ads.refreshTemplate(rg.ads.template);
    };
    if (templateName === "cover") {
        indexapi.cygnus_args.slots = [
            { id: "1", width: 728, height: 90, siteID: 179832 }
        ];
    } else if (templateName === "slide") {
        indexapi.cygnus_args.slots = [
            { id: "6", width: 300, height: 250, siteID: 182949 }
        ];
    } else if (templateName === "interstitial") {
        indexapi.cygnus_args.slots = [
            { id: "4", width: 300, height: 250, siteID: 179835 }
        ];
    } else indexapi.cygnus_args.slots = [];
};
rg.ads.indexExchange.hook = function() {
    cygnus_callback_refresh = function() {
        rg.ads.refreshTemplate(rg.ads.template);
    };
    ////console.log("nydn ra  ðŸŽ¯   rg.ads.indexExchange.hook");
    if (
        typeof indexapi !== "undefined" &&
        typeof indexapi.refresh_hook === "function"
    ) {
        indexapi.refresh_hook(cygnus_callback_refresh, cygnus_callback_timeout);
    } else {
        cygnus_callback_refresh();
    }
};
//YIELDBOT
function ybWidth() {
    var w = window,
        d = document,
        e = d.documentElement,
        x = Math.max(e.scrollWidth, e.offsetWidth, e.clientWidth);
    return x;
}
rg.ads.yieldbot = {};
rg.ads.yieldbot.url = "http://cdn.yldbt.com/js/yieldbot.intent.js";
rg.ads.yieldbot.waitingList = [];
rg.ads.yieldbot.download = function() {
    var ybotq = ybotq || [];
    nydnRequires([rg.ads.yieldbot.url], function() {
        ////console.log("nydn function: rg.ads.yieldbot.url âœ“");
        rg.ads.yieldbot.exe();
    });
};
rg.ads.yieldbot.exe = function() {
    ybotq.push(function() {
        if (ybWidth() <= 481) {
            yieldbot.pub("72cd"); //mobile
            yieldbot.defineSlot("MLB");
            yieldbot.defineSlot("mobrec");
        }
        yieldbot.enableAsync();
        yieldbot.go();
    });
    nydnRequires(rg.ads.dfp.waitingList, function() {
        ////console.log("nydn function: rg.ads.yieldbot.exe wairing for dfp list âœ“");
        if (nydn.bidder.contains("jumpstart"))
            rg.ads.dfp.defineSlotStr =
                rg.platform === "mobile"
                    ? rg.ads.jumpstart.adunitM
                    : rg.ads.jumpstart.adunit;
        else
            rg.ads.dfp.defineSlotStr =
                rg.platform === "mobile" ? rg.ads.targetPathM : rg.ads.targetPath;
        ybotq.push(function() {
            rg.ads.dfp.cmdPush();
        });
    });
    ////console.log("nydn function: rg.ads.yieldbot.exe âœ“");
};
/*==FACEBOOK ==*/
(function(e, a, f) {
    var c,
        b = e.getElementsByTagName(a)[0];
    if (e.getElementById(f)) {
        return;
    }
    c = e.createElement(a);
    c.id = f;
    c.src = "//connect.facebook.net/en_US/sdk.js";
    b.parentNode.insertBefore(c, b);
})(document, "script", "facebook-jssdk");

/*==FB UI EVENTS==*/
//tried to move this function call into rg.share.init method but does not work consistently. sometimes rg.share.init fires before the FB object is returned. since the
//gallery and the fb object are being called asynchronously, there's no guarantee when this method will be fired. leaving it global for now
window.fbAsyncInit = function() {
    FB.init({
        appId: 107464888913,
        xfbml: true,
        version: "v2.1",
        status: true
    });
};
//INITIALIZATION
////WHEN DO WE WANT TO INITIALIZE TWITTER via require.js
!(function(d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "http://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    }
})(document, "script", "twitter-wjs");
//DTM
rg.dtm = {};
rg.dtm.urlPROD =
    "http://assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/satelliteLib-90d4adb97eb8839c112f57195f09703d1eb2f6c4.js";
rg.dtm.urlQA =
    "http://assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/satelliteLib-90d4adb97eb8839c112f57195f09703d1eb2f6c4-staging.js";
rg.dtm.url =
    window.location.href.indexOf("wwwqa") > -1 ? rg.dtm.urlQA : rg.dtm.urlPROD;
rg.dtm.download = function() {
    nydnRequires([rg.dtm.url], function() {
        ////console.log("nydn function: rg.dtm.download âœ“");
        _satellite.pageBottom();
    });
};
//PARSLEY
var PARSELY = {
    autotrack: false,
    onload: function() {
        // do conditional check described above
        //doConditionalCheckAndFirePageView();
        rg.parsley.trackPageView();
    }
};
rg.parsley = {};
rg.parsley.download = function() {
    (function(s, p, d) {
        var h = d.location.protocol,
            i = p + "-" + s,
            e = d.getElementById(i),
            r = d.getElementById(p + "-root"),
            u =
                h === "https:"
                    ? "d1z2jf7jlzjs58.cloudfront.net"
                    : "static." + p + ".com";
        if (e) return;
        e = d.createElement(s);
        e.id = i;
        e.async = true;
        e.src = h + "//" + u + "/p.js";
        r.appendChild(e);
    })("script", "parsely", document);
    ////console.log("nydn function: rg.parsely.download âœ“");
};
rg.parsley.track = function(tagName) {
    PARSELY.beacon.trackPageView({
        url: location.href.split("?")[0] + rg.slide.url,
        urlref: location.href,
        js: 1,
        action_name: tagName
    });
    ////console.log("nydn function: rg.parsely.track");
};
rg.parsley.trackPageView = function() {
    if (PARSELY.lastRequest == undefined) {
        PARSELY.beacon.trackPageView({
            url: location.href.split("?")[0] + rg.slide.url,
            urlref: document.referrer,
            js: 1,
            action_name: "pageview"
        });
    }
    ////console.log("nydn function: rg.parsely.trackPageView");
};
//NEWSROOM
rg.newsroom = function() {
    nydnRequires([nydn.urls.newsroom], function() {
        ////console.log("nydn function: rg.newsroom.download âœ“");
    });
};
//GTM
rg.gtm = {};
rg.gtm.getURL = function() {
    if (window.location.href.indexOf("wwwqa") > -1) rg.gtm.url = "GTM-MFQKX7";
    else rg.gtm.url = "GTM-M9G2T8";
    ////console.log("nydn rg  ðŸŽ¯   rg.gtm.getURL " + rg.gtm.url);
    return rg.gtm.url;
};
rg.gtm.download = function() {
    rg.gtm.getURL();
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "//www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, "script", "nydnDO", rg.gtm.url);
    ////console.log("nydn rg  ðŸŽ¯   rg.gtm.download âœ“");
};
//QUANCAST
var ezt = ezt || [];
{
    ezt.push({ qacct: "p-af_gBGFZgopbs", uid: "" });
    rg.quantcast = {};
    rg.quantcast.url = "http://pixel.quantserve.com/aquant.js?a=p-af_gBGFZgopbs";
    rg.quantcast.download = function() {
        nydnRequires([rg.quantcast.url], function() {
            ////console.log("nydn rg  ðŸŽ¯   rg.quantcast.download âœ“");
        });
    };
}

Array.prototype.contains = function(needle) {
    for (var i in this) {
        if (this[i] == needle) return true;
    }
    return false;
};

rg.rr = function() {
    nydnRequires([nydn.urls.nydnQueryMW], function() {
        var mouseOverAside = false;
        $("#rgs").on("mouseenter", function() {
            slideScroll();
        });

        $("#rga").on("mouseenter", function() {
            mouseOverAside = true;
            $("#rgs").off("mousewheel");
        });

        var isScrolling = false;

        $("#rga > div").scroll(function() {
            isScrolling = true;
            //////console.log(isScrolling);
            clearTimeout($.data(this, "scrollTimer"));
            $.data(
                this,
                "scrollTimer",
                setTimeout(function() {
                    isScrolling = false;
                    slideScroll();
                }, 1000)
            );
        });

        function slideScroll() {
            var asideH = $("#rga > div").height();
            mouseOverAside = false;
            if (!isScrolling) {
                $("#rgs").on("mousewheel", function(event, delta) {
                    if ($("#rga > div").is(":animated")) {
                        return false;
                    }
                    if (delta > 0) {
                        $("#rga > div").stop().animate(
                            {
                                scrollTop: "0"
                            },
                            500
                        );
                        return false;
                    } else {
                        $("#rga > div").stop().animate(
                            {
                                scrollTop: asideH + "px"
                            },
                            500
                        );
                        return false;
                    }
                });
            }
        }
    });
};

rg.sourcepoint = {};
rg.sourcepoint.src = "//d2lv4zbk7v5f93.cloudfront.net/esf.js";
rg.sourcepoint.download = function() {
    var spScript = document.createElement("script");
    spScript.src = rg.sourcepoint.src;
    $(spScript).attr("data-client-id", "lGIHlwxHRFxIdXp");
    $("body").append(spScript);
    rg.sourcepoint.listen();
};

rg.sourcepoint.listen = function() {
    ////console.log("pageBottom nydn rg  ðŸŽ¯   rg.sourcepoint.listen");
    document.addEventListener("sp.blocking", function(e) {
        $("#rg-scripts").append("<div id='rg-blocking'></div>");
        ////console.log("pageBottom nydn rg  ðŸŽ¯   rg.sourcepoint.listen - BLOCKING");
    });
    document.addEventListener("sp.not_blocking", function(e) {
        $("#rg-scripts").append("<div id='rg-not-blocking'></div>");
        ////console.log(
        //   "pageBottom nydn rg  ðŸŽ¯   rg.sourcepoint.listen - NOT BLOCKING"
        // );
    });
};

rg.comscore = {};
rg.comscore.download = function() {
    nydnRequires([nydn.urls.comscore], function() {
        ////console.log("nydn rg  ðŸŽ¯   rg.comscore.download âœ“");
        var _comscore = _comscore || [];
        _comscore.push({ c1: "2", c2: "7190388" });
    });
};
//NIELSON
rg.nielsen = {};
rg.nielsen.param = {
    nol_sfcode: "dcr-cert",
    nol_ci: "us-805104",
    nol_apid: "T0569507D-B606-4161-ABFC-BEBEDE8AB15D",
    nol_assetname: "",
    nol_apn: "us-805104",
    nol_vc: "b01",
    nol_segA: "NA",
    nol_segB: "NA",
    nol_segC: "NA",
    nol_syndication: "S"
};
rg.nielsen.download = function() {
    var ogURL = $('meta[property="og:url"]').attr("content");
    var ogURLnoNYDN = ogURL.slice(ogURL.indexOf(".com") + 5);
    ////console.log("nydn ra  ðŸŽ¯   rg.nielsen.download " + ogURLnoNYDN);
    // rg.nielsen.param["nol_assetname"] =  $('meta[property="og:url"]').attr('content');
    rg.nielsen.param["nol_assetname"] = $("body").attr("data-section");
    (function(params) {
        var url = "http://cdn-gl.imrworldwide.com/novms/js/2/nlsDcrLite510.min.js#";
        var query = [];
        for (var param in params) {
            query.push(param + "=" + params[param]);
        }
        url += query.join("&");
        var script = window.document.createElement("script");
        script.async = true;
        script.src = url;
        window.document.getElementsByTagName("head")[0].appendChild(script);
    })(rg.nielsen.param);
    ////console.log("nydn ra  ðŸŽ¯   rg.nielsen.download âœ“");
};

rg.shareToggle = function() {
    $("#rg-share-icons").toggle("slide");
    $("#rg-share-toggle").toggleClass("on");
};

{
    rg.script = {};
    rg.script.download = function(scriptURL, scriptObj) {
        (function() {
            var rhScript = {};
            rhScript.downloaded = false;
            rhScript = document.createElement("script");
            rhScript.type = "text/javascript";
            rhScript.src = scriptURL;
            if (scriptObj != undefined) {
                rhScript.async =
                    scriptObj.scriptAsync != null ? scriptObj.scriptAsync : true;
                if (scriptObj.scriptID != null) rhScript.id = scriptObj.scriptID;
                if (scriptObj.scriptData != null) {
                    if (scriptObj.scriptData != "") {
                        for (var oneDate in scriptObj.scriptData) {
                            if (typeof scriptObj.scriptData[oneDate] == "string") {
                                rhScript.setAttribute(
                                    "data-" + oneDate,
                                    scriptObj.scriptData[oneDate]
                                );
                                ////console.log(
                                //   "nydn ðŸŽ¯  rg.script.download data",
                                //   oneDate,
                                //   scriptObj.scriptData[oneDate]
                                // );
                            }
                        }
                        if (scriptObj.scriptData.scriptNode != null) {
                            rhScript.scriptNode = scriptObj.scriptData.scriptNode;
                            rhScript.downloaded = true;
                            ////console.log("nydn ðŸŽ¯  rg.script.download " + scriptURL + " âœ“ ");
                            rhScript.scriptNode.insertBefore(
                                rhScript,
                                rhScript.scriptNode.childNodes[0]
                            );
                        }
                    }
                }
                if (scriptObj.scriptCallback !== null) {
                    rhScript.onload = scriptObj.scriptCallback;
                }
            }
            if (!rhScript.downloaded) {
                var node = document.getElementsByTagName("script")[0];
                node.parentNode.insertBefore(rhScript, node);
            }
        })();
        ////console.log("nydn ðŸŽ¯  rg.script.download " + scriptURL + " âœ“ ");
    };
}