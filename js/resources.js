/* globals createjs */

/* Resources.js
 *
 * Resource loading utility that takes images and audio resources and pre-loads
 * them for the application. Once the application resources are loaded a call
 * back for the "complete" event.
 */
(function() {
    var queue = new createjs.LoadQueue();
    var progressBar;
    var onReadyFunc;

    // Install the plugin to use sound
    queue.installPlugin(createjs.Sound);

    // Progress event handler
    queue.addEventListener('progress', function(e) {
        var noSupportSpan = document.getElementById('no-support-progress');
        var progress = parseInt(e.loaded * 100);
        progressBar = document.getElementById('progress-bar');

        if (progressBar) {
            progressBar.value = progress;
            noSupportSpan.innerHTML = progress + '%';
        }
    });

    // Register the complete event
    queue.addEventListener('complete', function() {
        //remove the progress bar
        document.getElementById('progress-container').style.display='none';
        onReadyFunc();
    });

    function load(manifest) {
        queue.loadManifest(manifest);
    }

    function get(id) {
        return queue.getResult(id);
    }

    function play(id) {
        createjs.Sound.play(id);
    }

    function stopAll() {
        createjs.Sound.stop();
    }

    function onReady(func) {
        onReadyFunc = func;
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        get: get,
        load: load,
        onReady: onReady,
        play: play,
        stopAll: stopAll
    };
})();
