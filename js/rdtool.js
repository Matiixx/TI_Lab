"use strict";

function min(a, b) {
  return Math.min(a, b)
}

function max(a, b) {
  return Math.max(a, b)
}

function abs(a) {
  return Math.abs(a)
}

function round(a) {
  return Math.round(a)
}

function floor(a) {
  return Math.floor(a)
}

function ceil(a) {
  return Math.ceil(a)
}

function sqrt(a) {
  return Math.sqrt(a)
}

function sign(a) {
  return Math.sign(a)
}

function clamp(x, b0, b1) {
  return min(max(x, b0), b1)
}

function interp(a, b, mix) {
  return a + (b - a) * mix
}

function round_to_multiple_of(a, b) {
  return round(a / b) * b
}

function round_up_to_multiple_of(a, b) {
  return ceil(a / b) * b
}

function floor_to_multiple_of(a, b) {
  return floor(a / b) * b
}

function distance_2d(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return sqrt(dx * dx + dy * dy)
}

function rescale(x, f0, f1, t0, t1) {
  var df = f1 - f0;
  return df == 0 ? t0 : (x - f0) * (t1 - t0) / df + t0
}
Module.onRuntimeInitialized = init;
var canvas;
var canvas_ui_column;
var render_xdim;
var render_ydim;
var render_aspect_ratio;
var canvas_aspect_icon;
var pattern_map;
var pattern_ring1;
var pattern_ring2;
var n_color_maps;

function init() {
  canvas = document.getElementById("canvas");
  canvas_ui_column = document.getElementById("canvas_ui_column");
  canvas_aspect_icon = document.getElementById("canvas_aspect_icon");
  pattern_map = document.getElementById("pattern_map");
  pattern_ring1 = document.getElementById("pattern_ring1");
  pattern_ring2 = document.getElementById("pattern_ring2");
  render_aspect_ratio = window.screen.height / window.screen.width;
  if (render_aspect_ratio > 1) {
    render_aspect_ratio = 1 / render_aspect_ratio
  }
  render_aspect_ratio = max(.5, render_aspect_ratio);
  resize_window();
  canvas_aspect_icon.style.visibility = "visible";
  _init();
  init_ui();
  set_checkbox("emboss", 1);
  set_checkbox("invert", 0);
  set_color_map(0);
  init_kf_params();
  maybe_set_params_from_url();
  render_frames()
}

function debug(string) {
  document.querySelector("debug").innerHTML = "<p>" + string
}
var frame_n = 0;
var mark_timestamp = 0;
var mark_frame = 0;
var prev_timestamp = 0;
var fps_ave = 60;
var fps_max = 30;

function maybe_update_fps(timestamp) {
  if (frame_n <= 3) {
    mark_timestamp = timestamp;
    mark_frame = frame_n
  }
  if (!dragging_canvas_aspect && timestamp - mark_timestamp >= 500) {
    var fps = (frame_n - mark_frame) / ((timestamp - mark_timestamp) * .001);
    document.querySelector("fps").innerHTML = "fps: " + fps.toFixed(0);
    if (!(document.fullscreenElement || document.webkitFullscreenElement)) {
      fps_ave += (max(fps, 30) - fps_ave) * .2
    }
    if (fps > fps_max + .5) {
      fps_max = round_up_to_multiple_of(fps, 5);
      _set_monitor_fps(min(120, fps_max))
    }
    mark_timestamp = timestamp;
    mark_frame = frame_n
  }
}

function render_frames(timestamp) {
  maybe_update_fps(timestamp);
  animate_kf_params();
  animate_sliders();
  _render_frame(timestamp - prev_timestamp);
  prev_timestamp = timestamp;
  frame_n++;
  requestAnimationFrame(render_frames)
}

function resize_canvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  render_xdim = canvas.width;
  render_ydim = round(render_xdim * render_aspect_ratio);
  if (render_ydim > canvas.height) {
    render_ydim = canvas.height;
    render_xdim = round(render_ydim / render_aspect_ratio)
  }
  _resize_canvas(canvas.width, canvas.height, render_xdim, render_ydim)
}
var params = {};
var param_targets = {};
const scale_param_names = ["scale_all", "scale_radial", "scale_random", "scale_ring"];
const flow_param_names = ["flow_radial", "flow_rotate", "flow_bubble", "flow_swirl", "flow_ring", "flow_vortex", "flow_vert"];
const orientation_param_names = ["orientation_radial", "orientation_circles", "orientation_bubble", "orientation_swirl", "orientation_vert"];
const color_slider_param_names = ["hue", "saturation", "brightness", "contrast", "color_freq", "color_phase"];
const other_slider_param_names = ["speed"];
const slider_param_names = scale_param_names.concat(flow_param_names).concat(orientation_param_names).concat(color_slider_param_names).concat(other_slider_param_names);
const ring_param_names = ["k1", "f1", "k2", "f2"];
const checkbox_param_names = ["emboss", "invert"];
const kf_map_param_names = ["kf_radial", "kf_random", "kf_ring", "kf_horiz", "kf_vert"];
const param_names_with_targets = slider_param_names.concat(ring_param_names);
const n_kf_maps = kf_map_param_names.length;
var params_index = {
  k1: 0,
  f1: 1,
  k2: 2,
  f2: 3,
  scale_all: 4,
  scale_radial: 5,
  scale_random: 6,
  scale_ring: 7,
  flow_radial: 8,
  flow_rotate: 9,
  flow_bubble: 10,
  flow_swirl: 11,
  flow_ring: 12,
  flow_vortex: 13,
  flow_vert: 14,
  orientation_vert: 15,
  orientation_radial: 16,
  orientation_circles: 17,
  orientation_bubble: 18,
  orientation_swirl: 19,
  kf_radial: 20,
  kf_random: 21,
  kf_ring: 22,
  kf_horiz: 23,
  kf_vert: 24,
  invert: 25,
  invert_color: 26,
  emboss: 27,
  color_map_n: 28,
  hue: 29,
  saturation: 30,
  brightness: 31,
  contrast: 32,
  color_freq: 33,
  color_phase: 34,
  speed: 35,
  pause: 36,
  restart: 37,
  clear: 38,
  draw_seed: 39,
  seed_x: 40,
  seed_y: 41,
  seed_color: 42
};

function set_param(name, value) {
  params[name] = value;
  var i = params_index[name];
  if (i == "undefined") {
    alert("set_param " + name + " not found in params_index")
  } else {
    _set_param(i, value)
  }
}

function snap_param(name, value) {
  set_param(name, value);
  param_targets[name] = value
}

function snap_all_c_params_to_targets() {
  for (var name of param_names_with_targets) {
    var i = params_index[name];
    var value = param_targets[name];
    _set_param(i, value)
  }
}

function add_or_remove_class(element, class_name, add) {
  if (add) {
    element.classList.add(class_name)
  } else {
    element.classList.remove(class_name)
  }
}

function set_checkbox(name, value) {
  set_param(name, value);
  add_or_remove_class(document.getElementById(name), "checkbox_checked", value)
}

function toggle_checkbox(name) {
  set_checkbox(name, params[name] ? 0 : 1)
}

function set_pause(value) {
  set_param("pause", value);
  add_or_remove_class(document.getElementById("pause"), "pause_paused", value)
}

function toggle_pause() {
  set_pause(params.pause ? 0 : 1)
}

function xy_to_kf(x, y) {
  const y1 = y * .5 + .5;
  const f = interp(.002, .12, y1);
  const s = sqrt(f) * .5 - f;
  const x1 = x * interp(1, (y - .32) * (y - .32), .6) * .5 + .5;
  const k0 = interp(-.003, .0115, x1);
  const k1 = interp(-.0048, -.0031, x1);
  const k = s + interp(k0, k1, y1);
  return [k, f]
}

function output_kf1() {
  var kf = xy_to_kf(param_targets.k1, param_targets.f1);
  document.querySelector("kf").innerHTML = " &nbsp; k=" + kf[0].toFixed(5) + " &nbsp; f=" + kf[1].toFixed(5)
}

function output_kf2() {
  var kf = xy_to_kf(param_targets.k2, param_targets.f2);
  document.querySelector("kf").innerHTML = "2&nbsp; k=" + kf[0].toFixed(5) + " &nbsp; f=" + kf[1].toFixed(5)
}
const ring_rad = (6.5 + 2) / 2;

function move_ring(ring, nx, ny) {
  ring.style.left = rescale(nx, -1, 1, 0, 100) - ring_rad + "%";
  ring.style.top = rescale(ny, 1, -1, 0, 100) - ring_rad + "%"
}

function move_ring1() {
  move_ring(pattern_ring1, params.k1, params.f1)
}

function move_ring2() {
  move_ring(pattern_ring2, params.k2, params.f2)
}

function init_ui() {
  for (var name of slider_param_names) {
    init_slider(name)
  }
  init_button("emboss", function (e) {
    toggle_checkbox("emboss")
  });
  init_button("invert", function (e) {
    toggle_checkbox("invert")
  });
  init_button("regrow", function () {
    set_param("restart", 1);
    set_pause(0)
  }, false);
  init_button("reset", reset_all);
  init_button("example", set_example, false);
  init_button("fullscreen", request_full_screen, false);
  init_button("pause", toggle_pause, false);
  init_button("clear", function () {
    set_param("clear", 1)
  }, false);
  init_button("kf_radial", function () {
    toggle_kf_map_param(0)
  });
  init_button("kf_random", function () {
    toggle_kf_map_param(1)
  });
  init_button("kf_ring", function () {
    toggle_kf_map_param(2)
  });
  init_button("kf_horiz", function () {
    toggle_kf_map_param(3)
  });
  init_button("kf_vert", function () {
    toggle_kf_map_param(4)
  });
  init_button("cm0", function () {
    set_color_map(0)
  });
  init_button("cm1", function () {
    set_color_map(1)
  });
  init_button("cm2", function () {
    set_color_map(2)
  });
  init_button("cm3", function () {
    set_color_map(3)
  });
  init_button("cm4", function () {
    set_color_map(4)
  });
  init_button("cm5", function () {
    set_color_map(5)
  });
  init_button("cm6", function () {
    set_color_map(6)
  });
  init_button("cm7", function () {
    set_color_map(7)
  });
  init_button("cm8", function () {
    set_color_map(8)
  });
  init_button("cm9", function () {
    set_color_map(9)
  });
  init_button("cm10", function () {
    set_color_map(10)
  });
  init_button("cm11", function () {
    set_color_map(11)
  });
  n_color_maps = 12;
  make_draggable(pattern_map, pattern_map_down, pattern_map_drag, update_url_with_param_values);
  window.addEventListener("resize", resize_window);
  window.addEventListener("keydown", handle_keydown_event);
  document.addEventListener("fullscreenchange", handle_fullscreen_change);
  document.addEventListener("webkitfullscreenchange", handle_fullscreen_change);
  make_draggable(canvas_aspect_icon, start_drag_canvas_aspect, drag_canvas_aspect, end_drag_canvas_aspect);
  make_draggable(canvas, start_draw_canvas, handle_draw_canvas, end_draw_canvas);
  if (document.getElementById("test_cm_value")) {
    document.getElementById("test_cm_value_n").addEventListener("input", test_cm_value_n_update);
    document.getElementById("test_cm_value").addEventListener("input", test_cm_value_update);

    function test_cm_value_n_update() {
      var n = document.getElementById("test_cm_value_n").value;
      document.getElementById("test_cm_value").value = _get_color_map_value(n);
      test_cm_value_update()
    }

    function test_cm_value_update() {
      var n = document.getElementById("test_cm_value_n").value;
      var v = document.getElementById("test_cm_value").value;
      _set_color_map_value(n, v);
      var s = "N " + n + "<br>";
      for (var i = 0; i < 24; i++) {
        if (i > 0 && i % 4 == 0) {
          s += "<br>"
        }
        if (i == n) {
          s += "<u>"
        }
        s += round(_get_color_map_value(i) * 100) / 100;
        if (i == n) {
          s += "</u>"
        }
        s += ", "
      }
      debug(s)
    }
  }
}
var slider_drag_snap = false;
var slider_drag_offset = 0;

function slider_down(event) {
  slider_drag_offset = 0;
  var nx = get_slider_nx(event);
  var name = event.target.id;
  var v = params[name];
  slider_drag_snap = abs(nx - v) < .035;
  if (slider_drag_snap) {
    slider_drag_offset = nx - v
  } else {
    param_targets[name] = nx;
    slider_drag(event)
  }
}

function slider_drag(event) {
  var nx = get_slider_nx(event);
  var name = event.target.id;
  var v = params[name];
  if (!slider_drag_snap && abs(v - param_targets[name]) < .01) {
    slider_drag_snap = true
  }
  if (slider_drag_snap) {
    snap_param(name, nx);
    move_slider_thumb(event.target, nx)
  } else {
    param_targets[name] = nx
  }
}
const slider_thumb_width = 3;

function move_slider_thumb(slider, value) {
  slider.lastElementChild.style.left = rescale(value, -1, 1, 0, 100 - slider_thumb_width) + "%"
}

function get_slider_nx(event) {
  var rect = event.target.getBoundingClientRect();
  var nx = rescale(event.clientX, rect.left, rect.right, -1, 1) * (1 + slider_thumb_width * .01) - slider_drag_offset;
  nx = clamp(round(nx * 1e3) * .001, -1, 1);
  const zero_snap_dist = .025;
  if (!event.ctrlKey && !event.metaKey && abs(nx) < zero_snap_dist) {
    nx = 0
  }
  return nx
}

function pattern_map_nxy(event) {
  var rect = pattern_map.getBoundingClientRect();
  var nx = rescale(event.clientX, rect.left, rect.right, -1, 1);
  var ny = rescale(event.clientY, rect.bottom, rect.top, -1, 1);
  return [nx, ny]
}
var dragging_ring = 0;
var drag_offset_x = 0;
var drag_offset_y = 0;
var drag_ring_snap = true;

function pattern_map_down(event) {
  var nxy = pattern_map_nxy(event);
  var dist1 = distance_2d(nxy[0], nxy[1], params.k1, params.f1);
  dragging_ring = 1;
  if (kf_map_n >= 0) {
    var dist2 = distance_2d(nxy[0], nxy[1], params.k2, params.f2);
    dragging_ring = dist1 < dist2 ? 1 : 2
  }
  const ring_radius = .1;
  if (dragging_ring == 1 && dist1 < ring_radius) {
    drag_offset_x = nxy[0] - params.k1;
    drag_offset_y = nxy[1] - params.f1;
    drag_ring_snap = true
  } else if (dragging_ring == 2 && dist2 < ring_radius) {
    drag_offset_x = nxy[0] - params.k2;
    drag_offset_y = nxy[1] - params.f2;
    drag_ring_snap = true
  } else {
    drag_offset_x = 0;
    drag_offset_y = 0;
    drag_ring_snap = false;
    pattern_map_drag(event)
  }
}

function pattern_map_drag(event) {
  var nxy = pattern_map_nxy(event);
  var k = nxy[0] - drag_offset_x;
  var f = nxy[1] - drag_offset_y;
  k = clamp(round(k * 1e3) * .001, -1, 1);
  f = clamp(round(f * 1e3) * .001, -1, 1);
  if (dragging_ring == 1) {
    if (drag_ring_snap) {
      snap_param("k1", k);
      snap_param("f1", f);
      move_ring1()
    } else {
      param_targets.k1 = k;
      param_targets.f1 = f;
      if (distance_2d(k, f, params.k1, params.f1) < .015) {
        drag_ring_snap = true
      }
    }
    output_kf1()
  } else {
    if (drag_ring_snap) {
      snap_param("k2", k);
      snap_param("f2", f);
      move_ring2()
    } else {
      param_targets.k2 = k;
      param_targets.f2 = f;
      if (distance_2d(k, f, params.k2, params.f2) < .01) {
        drag_ring_snap = true
      }
    }
    output_kf2()
  }
}

function reset_kf_params() {
  param_targets.k1 = 0;
  param_targets.f1 = 0;
  param_targets.k2 = .6;
  param_targets.f2 = -.6;
  toggle_kf_map_param(-1);
  output_kf1()
}

function init_kf_params() {
  for (var name of kf_map_param_names) {
    snap_param(name, 0)
  }
  snap_param("k1", 0);
  snap_param("f1", 0);
  snap_param("k2", .6);
  snap_param("f2", -.6);
  move_ring1();
  move_ring2();
  output_kf1()
}

function reset_all() {
  reset_params()
}

function reset_params() {
  reset_kf_params();
  set_color_map(0);
  for (var name of slider_param_names) {
    param_targets[name] = 0
  }
  set_checkbox("emboss", 1);
  set_checkbox("invert", 0);
  set_pause(0)
}

function init_slider(name) {
  var slider = document.getElementById(name);
  if (!slider) {
    alert("init_slider: missing element with name '" + name + "'")
  }
  params[name] = 0;
  param_targets[name] = 0;
  make_draggable(slider, slider_down, slider_drag, update_url_with_param_values)
}

function init_button(name, update_fun, update_url_p = true) {
  var e = document.getElementById(name);
  if (!e) {
    alert("init_button: missing element with name '" + name + "'")
  }
  e.addEventListener("pointerdown", update_fun);
  if (update_url_p) {
    e.addEventListener("pointerdown", update_url_with_param_values)
  }
}

function timeless_slow_out(x, target_x, start_slow_out, speed) {
  var dx = x - target_x;
  var dist = abs(dx);
  if (dist < start_slow_out) {
    speed *= sqrt(dist / start_slow_out)
  }
  return x - min(speed, dist) * sign(dx)
}

function timeless_slow_out_2d(x, y, target_x, target_y, start_slow_out, speed) {
  var dx = x - target_x;
  var dy = y - target_y;
  var dist = sqrt(dx * dx + dy * dy);
  if (dist < start_slow_out) {
    speed *= sqrt(dist / start_slow_out)
  }
  speed = min(speed / dist, 1);
  return [x - dx * speed, y - dy * speed]
}

function animate_sliders() {
  const start_slow_out = .4;
  var interp_speed = .05 * 60 / fps_ave;
  var set_c_params = frame_n > example_frame_n + fps_ave / 2;
  for (var name of slider_param_names) {
    var value = params[name];
    var target = param_targets[name];
    if (value != target) {
      var value = timeless_slow_out(value, target, start_slow_out, interp_speed);
      params[name] = value;
      if (set_c_params) {
        _set_param(params_index[name], value)
      }
      move_slider_thumb(document.getElementById(name), value)
    }
  }
}

function animate_kf_params() {
  const start_slow_out = .4;
  var interp_speed = .05 * 60 / fps_ave;
  var set_c_params = frame_n > example_frame_n + fps_ave / 2;
  if (params.k1 != param_targets.k1 || params.f1 != param_targets.f1) {
    var kf = timeless_slow_out_2d(params.k1, params.f1, param_targets.k1, param_targets.f1, start_slow_out, interp_speed);
    params.k1 = kf[0];
    params.f1 = kf[1];
    if (set_c_params) {
      _set_param(params_index["k1"], kf[0]);
      _set_param(params_index["f1"], kf[1])
    }
    move_ring1()
  }
  if (params.k2 != param_targets.k2 || params.f2 != param_targets.f2) {
    var kf = timeless_slow_out_2d(params.k2, params.f2, param_targets.k2, param_targets.f2, start_slow_out, interp_speed);
    params.k2 = kf[0];
    params.f2 = kf[1];
    if (set_c_params) {
      _set_param(params_index["k2"], kf[0]);
      _set_param(params_index["f2"], kf[1])
    }
    move_ring2()
  }
}

function request_full_screen() {
  if (document.fullscreenEnabled) {
    canvas.requestFullscreen()
  } else if (document.webkitFullscreenEnabled) {
    canvas.webkitRequestFullscreen()
  } else {
    alert("Full screen is not enabled on this browser")
  }
}

function move_canvas_aspect_icon(w, h) {
  var w = canvas_aspect_icon.clientWidth;
  canvas_aspect_icon.style.left = -w * .7 + "px";
  canvas_aspect_icon.style.top = h - w * .4 + "px"
}
const content_min_width = 1200;

function resize_window() {
  var w = round_to_multiple_of(canvas_ui_column.clientWidth - 1, 4);
  var h = round(w * render_aspect_ratio);
  if (w != canvas.width || h != canvas.height) {
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    resize_canvas();
    move_canvas_aspect_icon(w, h)
  }
}
var dragging_canvas_aspect = false;

function start_drag_canvas_aspect(event) {
  dragging_canvas_aspect = true
}

function drag_canvas_aspect(event) {
  var w = canvas.clientWidth;
  var rect = canvas.getBoundingClientRect();
  var h_min = round(w / 2.39);
  var h_max = clamp(window.innerHeight - rect.top - 20, pattern_map.clientHeight, w);
  var h = round(clamp(event.clientY - rect.top - 6, h_min, h_max));
  render_aspect_ratio = h / w;
  var aspect_str = "<span style='font-size:85%'>" + w + "x" + h + "</span>";
  if (!event.ctrlKey && !event.metaKey) {
    const snap_dist = 8;
    const snap_aspects = [
      [2.39, 1],
      [2, 1],
      [1.85, 1],
      [16, 9],
      [16, 10],
      [16, 11],
      [4, 3],
      [5, 4],
      [8, 7],
      [1, 1]
    ];
    for (var xy of snap_aspects) {
      var a = xy[1] / xy[0];
      if (abs(h - w * a) < snap_dist) {
        render_aspect_ratio = a;
        h = round(w * a);
        aspect_str = xy[0] + " : " + xy[1];
        break
      }
    }
  }
  if (h != canvas.clientHeight) {
    canvas.style.height = h + "px";
    resize_canvas();
    move_canvas_aspect_icon(w, h);
    document.querySelector("fps").innerHTML = aspect_str
  }
}

function end_drag_canvas_aspect(event) {
  dragging_canvas_aspect = false;
  mark_timestamp = prev_timestamp;
  mark_frame = frame_n
}

function start_draw_canvas(event) {
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    canvas.style.cursor = "default"
  }
  handle_draw_canvas(event)
}

function handle_draw_canvas(event) {
  var rect = canvas.getBoundingClientRect();
  var scale = 2 / render_xdim;
  var x = (event.clientX - .5 * (rect.left + rect.right)) * scale;
  var y = (event.clientY - .5 * (rect.top + rect.bottom)) * -scale;
  var erase = event.ctrlKey || event.metaKey;
  var seed_color = erase ? 0 : .5;
  set_param("seed_x", x);
  set_param("seed_y", y);
  set_param("seed_color", seed_color);
  set_param("draw_seed", 1)
}

function end_draw_canvas(event) {
  set_param("draw_seed", 0)
}

function handle_fullscreen_change() {
  resize_canvas();
  canvas.style.cursor = document.fullscreenElement ? "none" : "default"
}

function get_gl_from_canvas(canvas) {
  var gl = canvas.getContext("webgl2", {
    alpha: false,
    depth: false,
    antialias: false
  });
  if (!gl) {
    alert("WebGL 2.0 is not supported by this browser.\n\nChrome or Firefox are recommended.\nFor details visit  http://webglreport.com/?v=2")
  }
  if (!gl.getExtension("EXT_color_buffer_float")) {
    alert("The required WebGL2 extension EXT_color_buffer_float is not supported by this browser.\nFor details visit  http://webglreport.com/?v=2");
    gl = null
  }
  if (!gl.getExtension("OES_texture_float_linear")) {
    alert("The required WebGL2 extension OES_texture_float_linear is not supported by this browser.\nFor details visit  http://webglreport.com/?v=2");
    gl = null
  }
  return gl
}

function make_draggable(element, down_callback, drag_callback, up_callback) {
  function drag_pointer_down(event) {
    event.preventDefault();
    element.setPointerCapture(event.pointerId);
    element.addEventListener("pointermove", drag_pointer_move);
    element.addEventListener("pointerup", drag_pointer_up);
    if (down_callback) {
      down_callback(event)
    }
  }

  function drag_pointer_move(event) {
    event.preventDefault();
    drag_callback(event)
  }

  function drag_pointer_up(event) {
    event.preventDefault();
    element.releasePointerCapture(event.pointerId);
    element.removeEventListener("pointermove", drag_pointer_move);
    element.removeEventListener("pointerup", drag_pointer_up);
    if (up_callback) {
      up_callback(event)
    }
  }
  element.addEventListener("pointerdown", drag_pointer_down)
}
var kf_map_n = -1;

function toggle_kf_map_param(n) {
  if (kf_map_n >= 0) {
    var name = kf_map_param_names[kf_map_n];
    set_param(name, 0);
    var element = document.getElementById(name);
    element.classList.remove("kf_button_selected")
  }
  kf_map_n = n == kf_map_n ? -1 : n;
  if (kf_map_n >= 0) {
    var name = kf_map_param_names[kf_map_n];
    set_param(name, 1);
    var element = document.getElementById(name);
    element.classList.add("kf_button_selected")
  }
  document.getElementById("pattern_ring2").style.visibility = kf_map_n >= 0 ? "visible" : "hidden"
}

function set_color_map(n) {
  var name = "cm" + params.color_map_n;
  var element = document.getElementById(name);
  if (element) {
    element.classList.remove("cm_button_selected")
  }
  set_param("color_map_n", n);
  name = "cm" + n.toString();
  element = document.getElementById(name);
  element.classList.add("cm_button_selected")
}

function handle_keydown_event(event) {
  if (event.repeat) {
    return
  }
  if (event.code == "KeyR") {
    if (!params.pause) {
      set_param("restart", 1)
    }
  } else if (!event.ctrlKey && !event.metaKey && (event.code == "KeyC" || event.code == "Backspace" || event.code == "Delete")) {
    set_param("clear", 1)
  } else if (event.code == "Space") {
    event.preventDefault();
    toggle_pause()
  } else if (event.code == "KeyE" || event.code == "KeyN") {
    set_example(event)
  } else if (event.code == "KeyP") {
    set_example(event, true)
  } else if (event.ctrlKey || event.metaKey) {
    if (event.shiftKey && event.code == "KeyZ" || event.code == "KeyY") {
      redo()
    } else if (event.code == "KeyZ") {
      undo()
    }
  }
}
const bits_per_encode_char = 6;
const encode_chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.!";
const charcode_indeces = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0];

function int_to_bits(i, nbits) {
  var s = "";
  for (var j = 0; j < nbits; j++) {
    s += i & 1;
    i >>= 1
  }
  return s
}

function bits_to_int(s, index, nbits) {
  var i = 0;
  var limit = min(nbits, s.length - index);
  for (var j = 0; j < limit; j++) {
    i |= Number(s[index + j]) << j
  }
  return i
}

function float_to_bits(f) {
  return int_to_bits(round(f * 1e3), 11)
}

function bits_to_float(s, index) {
  var i = bits_to_int(s, index, 11);
  if (i & 1 << 10) {
    i |= -1 << 10
  }
  return clamp(i * .001, -1, 1)
}

function bits_to_chars(s) {
  var nchars = ceil(s.length / bits_per_encode_char);
  var chars = "";
  for (var j = 0; j < nchars; j++) {
    chars += encode_chars[bits_to_int(s, j * bits_per_encode_char, bits_per_encode_char)]
  }
  return chars
}

function chars_to_bits(chars) {
  var s = "";
  var max_code = charcode_indeces.length - 1;
  for (var j = 0; j < chars.length; j++) {
    s += int_to_bits(charcode_indeces[clamp(chars.charCodeAt(j), 0, max_code)], bits_per_encode_char)
  }
  return s
}

function encode_param_values() {
  var s = "";
  s += int_to_bits(params.color_map_n, 4);
  s += params.emboss > 0 ? "0" : "1";
  s += params.invert > 0 ? "1" : "0";
  var flag;
  flag = param_targets.k1 != 0 || param_targets.f1 != 0;
  s += flag ? "1" : "0";
  if (flag) {
    s += float_to_bits(param_targets.k1);
    s += float_to_bits(param_targets.f1)
  }
  flag = kf_map_n >= 0;
  s += flag ? "1" : "0";
  if (flag) {
    s += float_to_bits(param_targets.k2);
    s += float_to_bits(param_targets.f2);
    s += int_to_bits(kf_map_n, 3)
  }
  for (var key of slider_param_names) {
    flag = param_targets[key] != 0;
    s += flag ? "1" : "0";
    if (flag) {
      s += float_to_bits(param_targets[key])
    }
  }
  return bits_to_chars(s).replace(new RegExp("[0]+$"), "")
}

function decode_param_values(string) {
  var s = chars_to_bits(string);
  var i = 0;
  set_color_map(bits_to_int(s, i, 4) % n_color_maps);
  i += 4;
  set_checkbox("emboss", 1 - bits_to_int(s, i, 1));
  i += 1;
  set_checkbox("invert", bits_to_int(s, i, 1));
  i += 1;
  var flag;
  flag = bits_to_int(s, i, 1);
  i += 1;
  if (flag) {
    snap_param("k1", bits_to_float(s, i));
    i += 11;
    snap_param("f1", bits_to_float(s, i));
    i += 11;
    move_ring1();
    output_kf1()
  }
  flag = bits_to_int(s, i, 1);
  i += 1;
  if (flag) {
    snap_param("k2", bits_to_float(s, i));
    i += 11;
    snap_param("f2", bits_to_float(s, i));
    i += 11;
    move_ring2();
    var n = bits_to_int(s, i, 3);
    i += 3;
    if (n >= 0 && n < n_kf_maps) {
      toggle_kf_map_param(n)
    }
  }
  for (var name of slider_param_names) {
    flag = bits_to_int(s, i, 1);
    i += 1;
    if (flag) {
      var value = bits_to_float(s, i);
      i += 11;
      snap_param(name, value);
      move_slider_thumb(document.getElementById(name), value)
    }
  }
  open_details_if_nonzero_params()
}

function decode_param_values_to_targets(string) {
  var prev_kf_map_n = kf_map_n;
  reset_params();
  if (string.length == 0) {
    return
  }
  var s = chars_to_bits(string);
  var i = 0;
  set_color_map(bits_to_int(s, i, 4) % n_color_maps);
  i += 4;
  set_checkbox("emboss", 1 - bits_to_int(s, i, 1));
  i += 1;
  set_checkbox("invert", bits_to_int(s, i, 1));
  i += 1;
  var flag;
  flag = bits_to_int(s, i, 1);
  i += 1;
  if (flag) {
    param_targets.k1 = bits_to_float(s, i);
    i += 11;
    param_targets.f1 = bits_to_float(s, i);
    i += 11;
    output_kf1()
  }
  flag = bits_to_int(s, i, 1);
  i += 1;
  if (flag) {
    param_targets.k2 = bits_to_float(s, i);
    i += 11;
    param_targets.f2 = bits_to_float(s, i);
    i += 11;
    var n = bits_to_int(s, i, 3);
    i += 3;
    if (prev_kf_map_n < 0) {
      set_param("k2", param_targets.k2);
      set_param("f2", param_targets.f2);
      move_ring2()
    }
    if (n >= 0 && n < kf_map_param_names.length) {
      toggle_kf_map_param(n)
    }
  }
  for (var name of slider_param_names) {
    flag = bits_to_int(s, i, 1);
    i += 1;
    if (flag) {
      param_targets[name] = bits_to_float(s, i);
      i += 11
    }
  }
  open_details_if_nonzero_params()
}

function update_url_with_param_values() {
  var s = encode_param_values();
  update_url_with_encoded_string(s);
  hide_example_n();
  params_history_push(s)
}

function update_url_with_encoded_string(s) {
  var old_url = window.location.href;
  var new_url = old_url.split("?")[0] + (s.length > 0 ? "?s=" + s : "");
  var state_obj = {};
  var title = "";
  window.history.replaceState(state_obj, title, new_url)
}

function any_params_nonzero(param_names) {
  var any = false;
  for (var key of param_names) {
    if (param_targets[key] != 0) {
      any = true;
      break
    }
  }
  return any
}

function open_details_if_nonzero_params() {
  if (any_params_nonzero(color_slider_param_names)) {
    document.getElementById("adjust_colors").open = true
  }
  if (any_params_nonzero(orientation_param_names)) {
    document.getElementById("orientation").open = true
  }
}

function maybe_set_params_from_url() {
  var url = window.location.href;
  var a = url.split("?s=");
  if (a.length > 1 && a[1].length > 0) {
    var s = decodeURIComponent(a[1]);
    decode_param_values(s);
    params_history_push(s)
  } else {
    params_history_push("")
  }
}
var params_history = [];
var params_undone = [];

function params_history_push(s) {
  var n = params_history.length;
  if (n == 0 || s != params_history[n - 1]) {
    const undo_limit = 100;
    if (params_history.push(s) > undo_limit) {
      params_history.shift()
    }
    params_undone = []
  }
}

function undo() {
  if (params_history.length > 1) {
    params_undone.push(params_history.pop());
    var s = params_history[params_history.length - 1];
    var paused = params.pause;
    decode_param_values_to_targets(s);
    if (paused) {
      set_pause(1)
    }
    update_url_with_encoded_string(s);
    hide_example_n()
  }
}

function redo() {
  var s = params_undone.pop();
  if (s) {
    params_history.push(s);
    var paused = params.pause;
    decode_param_values_to_targets(s);
    if (paused) {
      set_pause(1)
    }
    update_url_with_encoded_string(s);
    hide_example_n()
  }
}
var example_n = -1;
var example_n_visible = false;
var example_frame_n = -100;

function set_example(event, back = false) {
  var n = examples.length;
  example_n = (event.ctrlKey || event.metaKey || back ? max(example_n, 0) - 1 + n : example_n + 1) % n;
  var s = examples[example_n];
  decode_param_values_to_targets(s);
  snap_all_c_params_to_targets();
  set_pause(0);
  set_param("restart", 1);
  update_url_with_encoded_string(s);
  params_history_push(s);
  document.querySelector("example_n").innerHTML = example_n + 1;
  document.querySelector("example_n").style.visibility = "visible";
  example_n_visible = true;
  example_frame_n = frame_n
}

function hide_example_n() {
  if (example_n_visible) {
    document.querySelector("example_n").style.visibility = "hidden";
    example_n_visible = false
  }
}
const examples = ["2Ljzn1Z5eh7K9", "mF.xsvGRlsIzom", "x3.Kh5Z9PsJ300y9", "8jc3x7hY0anzCW7c93Z1", "4JcBVogs1vxlD8ahdOm4", "2fts0P6oNDP000.i", "6zYoMNPJxyotqsQ0j9B6", "FtCimnJJ5J5Ui", "5ZxJqlPNak7w1u00Nk", "MJpLhzQVVz30kbNP1wn2", "bJCHQsi.ieCldzezm7", "3m9BL8fK.wLzT1gRkR2", "gRsK4tO.6QGgQ7", "aBHvCyVr9vxzcGS56", "GJHvyas2Suhjd.cssgQ7", "DPnNTj8Ncelqr964C5", "afzMsLMh6lXUXoa0kR7Z1", "pBMx3!LE8xE", "lFzcsNwJ7pfgQ7", "btQ1OBPfJ.Jjc4C3P4R2"];