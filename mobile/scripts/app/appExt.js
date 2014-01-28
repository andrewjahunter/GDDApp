﻿window.gdd = window.gdd || {};

gdd.init = {

    // Wait for Cordova to load
    indexPageLoaded:  function () {
        gdd.init.deviceIsReady = false;

        document.addEventListener("deviceready", gdd.init.onDeviceReady, false);

        gdd.init.runIndexPageLoadingProcess();
    },

    isNativeApp : function () {

        if ((document.URL.indexOf('http://') === -1) && (document.URL.indexOf('https://') === -1)) {      
            return true
        } else {        
            return false
        }
    },

    indexPagePath : function () {

        if (gdd.init.indexPageIsActive()) {
            return location.href.substring(0, location.href.indexOf('index')) + "index.html";
        } else {
            return location.origin + location.pathname.replace(location.pathname.substring(location.pathname.indexOf("mobile")), 'index.html');
        }

    },

    indexPageIsActive : function () {
        if (location.href.indexOf('index') !== -1) {
            return true;
        } else {
            return false;

        }
    },

    onDeviceReady:function () {
        navigator.splashscreen.hide();  
        gdd.init.deviceIsReady = true;

        try {

            document.addEventListener("resume", gdd.init.onAppResume, false);

            document.addEventListener("menubutton", gdd.init.onMenuKeyDown, false);

            document.addEventListener("offline", gdd.init.wentOffline, false);

            document.addEventListener("online", gdd.init.wentOnline, false);

        }
        catch (err) {
            gdd.init.showPageIndexError("The following error occured during the onDeviceReady event: " + err + ". Please check you are connected to the Internet and try again.")
        }

    },

    isReady : function () {
        // return false;

        if (gdd.init.requireJsComplete) {
            if (gdd.views) {

                if ($.mobile) {
                    if (gdd.init.isNativeApp()) {

                        if (window.gdd.init.deviceIsReady) {
                            //alert("ir deviceIsReady=true")
                            return true
                        } else {
                            // alert("ir deviceIsReady=false")
                            return false
                        }

                    } else {
                        // alert("ir isNativeApp=false")
                        return true;
                    }
                } else {
                    return false;
                }
           

            } else {
                //alert("ir views is false")
                return false;
            }
        } else {
            //  alert("ir requirejs is false")
            return false;
        }
    },

    onLine : function () {

        if (window.navigator.onLine) {
            // alert("navigator ONLINE")
            return true
        } else {
            // alert("navigator OFFLINE")
            return false
        }

    },

    onAppResume:  function () {
        try {
            //alert("You must chage this code")
            //if ((gdd.init.isReady()) && (gdd.init.onLine())) {
           
            //    gdd.views.utils.processAppStart();
            //} else {
           
            //    if (gdd.init.indexPageIsActive()) {
            //        runProgressState()
            //    } else {
            //        window.location.href = gdd.init.indexPagePath();
            //    }
            //}
        }
        catch (err) {
            gdd.init.showPageIndexError("The following error occurred when the application came online: " + err)
        }
    },

    wentOnline:function () {
        try {
            //alert("Work on this")

            //if ((gdd.init.isReady()) && (gdd.init.onLine())) {

            //    if (window.gdd.appWentOffline) {
            //        $.mobile.changePage(gdd.views.pageinfo.home.path)
            //        window.gdd.appWentOffline = false;
            //    }

            //} else {
            //    // alert("Online fired not ready not online")
            //    if (gdd.init.indexPageIsActive()) {
            //        runProgressState()
            //    } else {
            //        window.location.href = gdd.init.indexPagePath();
            //    }
            //}
        }
        catch (err) {
            gdd.init.showPageIndexError("The following error occured in the application as it came online: " + err)
        }

    },

    wentOffline:function() {
        try {
            //// alert("offline fired")
            //window.gdd.appWentOffline = true;

            //if (gdd.init.indexPageIsActive()) {
            //    //alert("offline fires we are on index page")
            //    gdd.init.showPageIndexError("Please check you are connected to the internet. Once you are reconnected please click try again")
            //} else {
            //    // alert("offline go to index page")
            //    window.location.href = gdd.init.indexPagePath();
            //}

        }
        catch (err) {
        
            gdd.init.showPageIndexError("The following occurred when app went offline: " + err);
        }

    },

    onMenuKeyDown:function() {
        try {
            //alert("Go Home")
            //$.mobile.changePage(gdd.views.pageinfo.home.path)
        }
        catch (err) {

        }

    },

    showPageIndexError : function (err) {
        window.clearInterval(gdd.init.progressStateInterval);

        document.getElementById("indexErrMsg").innerHTML = err

        var e = document.getElementById("errConnection");
        e.style.display = 'block'

        var z = document.getElementById("progressDiv");
        z.style.display = 'none'

    },

    progressStateInterval: {},

    runIndexPageLoadingProcess : function () {

    

        var attemptCount = 0;
       

        var errorElem = document.getElementById("errConnection");
        errorElem.style.display = 'none';

        var progElem = document.getElementById("progressDiv");
        progElem.style.display = 'block';

        var progMsg = document.getElementById("progressState");

    

        var progressState = function () {

            if ((gdd.init.onLine()) && (gdd.init.isReady())) {
                window.clearInterval(gdd.init.progressStateInterval);
                gdd.app.activePage = null //sets it to index page
                gdd.app.initializeApplication()
            


            } else {
                attemptCount += 1;
                if (attemptCount === 9) {
                    window.clearInterval(gdd.init.progressStateInterval);

                    gdd.init.showPageIndexError("Your device is either not connected to the internet or the connection is very slow. Please connect to the internet and try again.")
                } else {
                    try {
                        progMsg.innerHTML = stateArr[attemptCount]
                    }
                    catch (err) {
                        progMsg.innerHTML = "Error: " + err
                    }
                }
            }

        }

        var stateArr = new Array()
        stateArr[0] = "initializing..."
        stateArr[1] = "loading api..."
        stateArr[2] = "loading required files..."
        stateArr[3] = "checking required files..."
        stateArr[4] = "loading mobile framework..."
        stateArr[5] = "loading google maps..."
        stateArr[6] = "loading ref data..."
        stateArr[7] = "applying style sheets..."
        stateArr[8] = "securing..."
        stateArr[9] = "finalizing..."


        if (gdd.init.onLine()) {
       
            gdd.init.progressStateInterval = self.setInterval(function () {

                progressState()

            }, 1000);
        } else {
            gdd.init.showPageIndexError("Your device is not connected to the internet, please establish a connection and try again.")
        }


    },

    appInfo:""
}






















