window.gdd = window.gdd || {}



gdd.cordova = function () {


    return {

        media: function () {

            var my_media = null;
            var mediaTimer = null;

            return {

                play: function (src, success_clb, fail_clb, reportposition_clb) {
                    alert("let play " + src)
                    if (my_media == null) {
                        // Create Media object from src
                        my_media = new Media(src, success_clb, fail_clb);
                    } // else play current audio
                    // Play audio
                    my_media.play();

                    // Update my_media position every second
                    if (mediaTimer == null) {
                        mediaTimer = setInterval(function () {
                            // get my_media position
                            my_media.getCurrentPosition(
                                // success callback
                                function (position) {
                                    if (position > -1) {
                                        reportposition_clb((position) + " sec");
                                    }
                                },
                                // error callback
                                function (e) {
                                    fail_clb("Error getting pos=" + e);
                                    reportposition_clb("Error: " + e);
                                }
                            );
                        }, 1000);
                    }
                },

                pause: function () {
                    alert("lets pasuse")
                    if (my_media) {
                        my_media.pause();
                    }
                },

                stop: function () {
                    alert("let stop")
                    if (my_media) {
                        my_media.stop();
                    }
                    clearInterval(mediaTimer);
                    mediaTimer = null;
                }

            }


        }()



    }
}()