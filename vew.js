var win                   = window,
    doc                   = win.document,
    watcher               = doc.querySelector('#vew-watcher');
    media_properties_elts = null,
    webm                  = null,
    tables = ''+
             '<table><caption>Events</caption><tbody id="events"></tbody></table>'+
             '<table><caption>Properties</caption><tbody id="properties"></tbody></table>'+
             '<table id="canPlayType"><caption>canPlayType</caption><tbody id="m_video"></tbody></table>'+
             '';

doc.body.appendChild('<div id="vew-watcher"><ul></ul></div>');
  watcher.style.position   = 'fixed';
  watcher.style.width      = '100%';
  watcher.style.height     = '400px';
  watcher.style.top        = '10px';
  watcher.style.left       = '10px';
  watcher.style.background = '#f1f1f1';
  watcher.style.border     = '1px solid #ccc';
  watcher.style.color      = '#000';

doc.querySelector('#vew-watcher').appendChild(tables);

/*
 * Seting all events known
 *
 */
var media_events = [];
    media_events["loadstart"]      = 0;
    media_events["progress"]       = 0;
    media_events["suspend"]        = 0;
    media_events["abort"]          = 0;
    media_events["error"]          = 0;
    media_events["emptied"]        = 0;
    media_events["stalled"]        = 0;
    media_events["loadedmetadata"] = 0;
    media_events["loadeddata"]     = 0;
    media_events["canplay"]        = 0;
    media_events["canplaythrough"] = 0;
    media_events["playing"]        = 0;
    media_events["waiting"]        = 0;
    media_events["seeking"]        = 0;
    media_events["seeked"]         = 0;
    media_events["ended"]          = 0;
    media_events["durationchange"] = 0;
    media_events["timeupdate"]     = 0;
    media_events["play"]           = 0;
    media_events["pause"]          = 0;
    media_events["ratechange"]     = 0;
    media_events["volumechange"]   = 0;

/*
 * Seting all controler events known
 *
 */
var media_controller_events = [];
    media_controller_events["emptied"]        = 0;
    media_controller_events["loadedmetadata"] = 0;
    media_controller_events["loadeddata"]     = 0;
    media_controller_events["canplay"]        = 0;
    media_controller_events["canplaythrough"] = 0;
    media_controller_events["playing"]        = 0;
    media_controller_events["ended"]          = 0;
    media_controller_events["waiting"]        = 0;
    media_controller_events["durationchange"] = 0;
    media_controller_events["timeupdate"]     = 0;
    media_controller_events["play"]           = 0;
    media_controller_events["pause"]          = 0;
    media_controller_events["ratechange"]     = 0;
    media_controller_events["volumechange"]   = 0;

/*
 * Seting all media properties known
 *
 */
var media_properties = [
      "error",
      "src",
      "currentSrc",
      "crossOrigin",
      "networkState",
      "preload",
      "buffered",
      "readyState",
      "seeking",
      "currentTime",
      "initialTime",
      "duration",
      "startOffsetTime",
      "paused",
      "defaultPlaybackRate",
      "playbackRate",
      "played",
      "seekable",
      "ended",
      "autoplay",
      "loop",
      "mediaGroup",
      "controller",
      "controls",
      "volume",
      "muted",
      "defaultMuted",
      "audioTracks",
      "videoTracks",
      "textTracks",
      "width",
      "height",
      "videoWidth",
      "videoHeight",
      "poster"
    ];

function init() {
    document._video = document.querySelector(".vew");
    webm = document.getElementById("webm");

    init_events();
    init_properties();
    init_mediatypes();

    // properties are updated even if no event was triggered
    setInterval(update_properties, 500);
}
document.addEventListener("DOMContentLoaded", init, false);

function init_events() {
  for (key in media_events) {
    document._video.addEventListener(key, capture, false);
  }

  var tbody = document.getElementById("events"),
      i = 1,
      tr = null;

  for (key in media_events) {
    if (tr == null) tr = document.createElement("tr");
    var th = document.createElement("th");
    th.textContent = key;
    var td = document.createElement("td");
    td.setAttribute("id", "e_" + key);
    td.innerHTML = "0";
    td.className = "false";
    tr.appendChild(th);
    tr.appendChild(td);

    if ((i++ % 5) === 0) {
        tbody.appendChild(tr);
        tr = null;
    }
  }

  if (tr !== null) tbody.appendChild(tr);

}

function init_properties() {
  var tbody = document.getElementById("properties"),
      i     = 0,
      tr    = null;

  media_properties_elts = new Array(media_properties.length);

  do {
    if (tr === null) tr = document.createElement("tr");
    var th = document.createElement("th"),
        td = document.createElement("td"),
        r  = eval("document._video." + media_properties[i]);
    th.textContent = media_properties[i];
    td.setAttribute("id", "p_" + media_properties[i]);
    td.innerHTML = r;

    if (typeof(r) != "undefined") {
        td.className = "true";
    } else {
        td.className = "false";
    }
    tr.appendChild(th);
    tr.appendChild(td);
    media_properties_elts[i] = td;

    if ((++i % 3) === 0) {
        tbody.appendChild(tr);
        tr = null;
    }

  } while (i < media_properties.length);
    if (tr !== null) tbody.appendChild(tr);
}

function init_mediatypes() {
  var tbody = document.getElementById("m_video"),
      i     = 0,
      tr    = document.createElement("tr"),
      videoTypes = [ "video/ogg", "video/mp4", "video/webm" ];
  i = 0;
  tr = document.createElement("tr");
  do {
    var td = document.createElement("th");
    td.innerHTML = videoTypes[i];
    tr.appendChild(td);
      } while (++i < videoTypes.length);
      tbody.appendChild(tr);

      i = 0;
      tr = document.createElement("tr");

      if (!!document._video.canPlayType) {
        do {
    var td = document.createElement("td"),
        support = document._video.canPlayType(videoTypes[i]);
    td.innerHTML = '"' + support + '"';

    if (support === "maybe") {
        td.className = "true";
    } else if (support === "") {
        td.className = "false";
    }

    tr.appendChild(td);
  } while (++i < videoTypes.length);
    tbody.appendChild(tr);
  }

}


function capture(event) {
    media_events[event.type] = media_events[event.type] + 1;
    for (key in media_events) {
  var e = document.getElementById("e_" + key);
  if (e) {
      e.innerHTML = media_events[key];
      if (media_events[key] > 0) e.className = "true";
  }
    }
    update_properties();
}

function update_properties() {
    var i = 0;
    for (key in media_properties) {
  var val = eval("document._video." + media_properties[key]);
  media_properties_elts[i++].innerHTML = val;
    }
    if (!!document._video.audioTracks) {
  var td = document.getElementById("m_audiotracks");
  td.innerHTML = document._video.audioTracks.length;
  td.className = "true";
    }
    if (!!document._video.videoTracks) {
  var td = document.getElementById("m_videotracks");
  td.innerHTML = document._video.videoTracks.length;
  td.className = "true";
    }
    if (!!document._video.textTracks) {
  var td = document.getElementById("m_texttracks");
  td.innerHTML = document._video.textTracks.length;
  td.className = "true";
    }
}
