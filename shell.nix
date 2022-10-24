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
in
  with pkgs;
  mkShell {
    buildInputs = [
      zsh
      appimage-run
      nodejs
      wget
      yarn
      rust
      pkgconfig
      openssl
      openssl.dev
      sass
      glib
      cairo
      pango
      atk
      gdk-pixbuf
      libsoup
      gtk3
      pkgs.webkitgtk
      librsvg
      patchelf
    ];
  shellHook = '' 
      yarn
  '';
}
