let
  moz_overlay = import (builtins.fetchTarball https://github.com/mozilla/nixpkgs-mozilla/archive/master.tar.gz);
  pkgs = import <nixpkgs> { overlays = [ moz_overlay ]; };
  rustChannel = pkgs.rustChannelOf {
     channel = "nightly";
  };
  rust = (rustChannel.rust.override {
    targets = [
      "wasm32-unknown-unknown"
    ];
  });
  libraries = with pkgs;[
    webkitgtk
    gtk3
    cairo
    gdk-pixbuf
    glib.out
    dbus.lib
    openssl_3.out
  ];

  packages = with pkgs; [
    yarn
    rust
    nodejs
    pkg-config
    dbus
    openssl_3
    glib
    gtk3
    libsoup
    webkitgtk
    appimagekit
  ];
in
pkgs.mkShell {
  buildInputs = packages;

  shellHook =
    let
      joinLibs = libs: builtins.concatStringsSep ":" (builtins.map (x: "${x}/lib") libs);
      libs = joinLibs libraries;
    in
    ''
      export LD_LIBRARY_PATH=${libs}:$LD_LIBRARY_PATH
    '';
}