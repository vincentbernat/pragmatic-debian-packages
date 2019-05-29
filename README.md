# Pragmatic Debian packaging

Those are examples on how to build Debian packages using Debian tools
while being quite loose on the policy. Those packages are not fit for
the official Debian archive but may be OK for other usages. The
packaging practices presented here are compatible with Debian 9
(Stretch) and more recent, and Ubuntu Bionic and more recent. If you
wish to support older distributions, switch to the `2016` tag.

See the following articles for some background:
[Pragmatic Debian packaging](https://vincent.bernat.im/en/blog/2019-pragmatic-debian-packaging).

All those packages can be built with:

    dpkg-buildpackage -us -uc -b

Only binary packages can be safely built from those sources. Do not
attempt to build source packages as they are likely to be flawed.

If you don't wish to satisfy the build dependencies, you can build with:

    dpkg-buildpackage -us -uc -b -d

You can build them with `git-pbuilder` as well:

    GIT_PBUILDER_OPTIONS=--use-network=yes DIST=bionic git-pbuilder -us -uc -b

Most packages will download the source code from Internet (without any
check). This is more convenient for simple examples, but the `debian/`
directory could have been just integrated into the original source
tree to skip this test.

It is better to build the package on the target distribution. Some of
the generated packages may be installed on another distribution, but
there is no guarantee.

Note that those packages are received no real operational tests and
should not be used on production system. Their only purpose is to
illustrate how to build Debian packages.

## Dependencies

Ensure you have those packages installed:

 - `build-essential`
 - `debhelper`

You may also want the specified build dependencies.

## systemd support

When applicable, the examples come with systemd support. Support for
other inits are not illustrated here (have a look at the `2016` tag if
you want to support non-systemd init systems).

## Packages

### geoip-database-all

This package is built from the most recent Maxmind GeoIP databases. It
is intended to be built monthly and should replace `geoip-database`,
`geoip-database-extra` and `geoip-database-contrib` packages.

### nodejs

This is a all-in-one package for [nodejs](https://nodejs.org/en/). It
will download the version specified in `debian/rules` and build a
package from that. This package contains an embedded copy OpenSSL,
libuv, zlib and I suppose many other dependencies.

### memcached

This is an all-in-one package for
[memcached](http://www.memcached.org/). It will download the version
specified in `debian/rules` and build a package from that. Being
based on autoconf, debhelper knows how to handle this kind of
program. It will run `./configure` with the appropriate options,
`make`, `make check` and `make install`.

We add an upstart script and a systemd unit definition. This package
won't work with systems using neither systemd nor upstart.

### memcached-basic

This is a more basic version of the previous package. Notably, it's
easier to explain as an introduction to "pragmatic" packaging.

### memcached-intermediate

This is an intermediate version between `memcached-basic` and
`memcached`.

### golang

This package is just a conversion of the precompiled
tarball. Compiling Go from source is too deemed to complex (unless you
already have Go). The tarball is extracted in /usr/lib and a symbolic
link is done from `/usr/local/go` to `/usr/lib/go`. Debian packages are
not expected to install anything in `/usr/local`.

### flask

This is the popular Flask microframework as a Python module. This
example rely on dh_python, an helper tool to help packaging Python
modules. We just download and extract the tarball, override the
package version and let this helper do its work. The resulting package
is almost correct in respect to the Debian policy.

### etcd

This package ships etcd, a key-value store written in Go. It ships a
systemd service unit. It doesn't come with a `/etc/default/etcd` that
would have been handy to have for more customizations. It will make
the daemon run as `etcd`, relying on systemd to create it.

### riemann

This package ships riemann. The build dependencies are incomplete
since it is unlikely you'll find lein already packaged. We could fetch
and execute it in `debian/rules`, but we assume that something else is
doing that for us. It comes with an upstart and systemd job. It will
run as `_riemann`. The package makes use of an uberjar to bundle all
dependencies.

### puppetboard

This package makes use of `dh-virtualenv`, a nifty helper to ship a
whole virtualenv. Dependencies are therefore frozen and the package is
independant of other Python modules on the system (but relies
nonetheless on system Python). As usual, shipped with a user and some
upstart job/systemd unit.

### sentry

This package also uses `dh-virtualenv` but with a variation. It relies
on `pip` to download `sentry` through a provided `requirements.txt`
(where the version should be set even if it's not the case in this
example). It also ensure everything is built from source with the
exception of `symbolic` which is too "hard" to compile (it needs
`rust` and `cargo`). It also uses several systemd unit files. As a
dynamic user cannot be shared accross systemd unit files, we have to
create the user in postinst.

### kiwiirc

This is an IRC web client written in Node.JS. There is currently no
equivalent to `dh-virtualenv` for NodeJS but it's enough to do
yourself. Shipped with a systemd unit featuring a dynamic user.
