window.gdd = window.gdd || {};

gdd.init = {

    // Wait for Cordova to load
    indexPageLoaded: function () {
        //alert("Index Page Loaded")
        gdd.init.deviceIsReady = false;

        document.addEventListener("deviceready", gdd.init.onDeviceReady, false);

        //alert("Function: " + gdd.init.runIndexPageLoadingProcess)
        gdd.init.runIndexPageLoadingProcess();
    },

    isNativeApp : function () {

        if ((document.URL.indexOf('http://') === -1) && (document.URL.indexOf('https://') === -1)) {      
            return true
        } else {        
            return false
        }
    },

    pathToIndexPage:"",

    indexPagePath : function () {

        return gdd.init.pathToIndexPage;
        //if (gdd.init.indexPageIsActive()) {
        //    return location.href.substring(0, location.href.indexOf('index')) + "index.html";
        //} else {
        //    return location.origin + location.pathname.replace(location.pathname.substring(location.pathname.indexOf("mobile")), 'index.html');
        //}

    },

    indexPageIsActive : function () {
        if (location.href.indexOf('index') !== -1) {
            return true;
        } else {
            return false;

        }
    },

    onDeviceReady: function () {
        //alert("Device Is Ready")
        try {
            gdd.init.deviceIsReady = true;


            setTimeout(function () {
                navigator.splashscreen.hide();
            }, 3000)

         

        //alert("Device Is Ready is set")

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
        //alert("gdd.init.requireJsComplete=" + gdd.init.requireJsComplete)
        if (gdd.init.requireJsComplete) {
            if (gdd.views) {

                if ($.mobile) {
                    //alert("$.mobile is ready")
                    if (gdd.init.isNativeApp()) {
                        //alert("is native app")
                        //alert("window.gdd.init.deviceIsReady" + gdd.init.deviceIsReady)
                        if (gdd.init.deviceIsReady) {
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
                    //alert("$.mobile is NOT ready")
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
            //alert("App resume")
            //if ((gdd.init.isReady()) && (gdd.init.onLine())) {
           
            //    gdd.views.utils.processAppStart();
            //} else {
           
            //    if (gdd.init.indexPageIsActive()) {
            //        runProgressState()
            //    } else {
            //        window.location.href = gdd.init.indexPagePath();
            //    }
            //}
            //try {
            //    alert("pathToIndexPage:" + gdd.init.pathToIndexPage)

            //}
            //catch (err) {
            //    alert("index path error:" + err)

            //}
            //try {
            //    alert("views:" + JSON.stringify( gdd.views.pageinfo))
            //}
            //catch (err) {
            //    alert("views error:" + err)
            //}
            //try {
            //    alert("location:" + JSON.stringify(location))
            //    alert("Final Big Boy:" + location.origin + location.pathname.replace(location.pathname.substring(location.pathname.indexOf("mobile")), 'index.html'))

            //} catch (e) {
            //    alert("big boy error:" + err)

            //}

            //try {
            //    alert("href: " + location.href)
            //} catch (e) {
            //    alert("href err:" + err)

            //}

            //location.reload()

                //if (gdd.init.indexPageIsActive()) {
                //    gdd.init.runIndexPageLoadingProcess();
                //} else {
                //    window.location.href = gdd.init.indexPagePath();
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

    showPageIndexError: function (err) {
       // alert("page index error" + JSON.stringify(err))
        window.clearInterval(gdd.init.progressStateInterval);

        document.getElementById("indexErrMsg").innerHTML = err

        var e = document.getElementById("errConnection");
        e.style.display = 'block'

        var z = document.getElementById("progressDiv");
        z.style.display = 'none'

    },

    progressStateInterval: {},

    runIndexPageLoadingProcess : function () {

        //alert("Loading process")
    

        var attemptCount = 0;
       

        var errorElem = document.getElementById("errConnection");
        errorElem.style.display = 'none';

        var progElem = document.getElementById("progressDiv");
        progElem.style.display = 'block';

        var progMsg = document.getElementById("progressState");

    

        var progressState = function () {
           // alert("Progress State")
            //alert("ONlien State: " + gdd.init.onLine())
            //alert("ReadyState: " + gdd.init.isReady())
            if ((gdd.init.onLine()) && (gdd.init.isReady())) {
                window.clearInterval(gdd.init.progressStateInterval);
                 //sets it to index page
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
      // alert("About to call progress state")
            gdd.init.progressStateInterval = self.setInterval(function () {

                progressState()

            }, 1000);
        } else {
            gdd.init.showPageIndexError("Your device is not connected to the internet, please establish a connection and try again.")
        }


    },

    appInfo:""
}























