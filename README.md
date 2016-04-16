# Pragmatic Debian packaging

Those are examples on how to build Debian packages using Debian tools
while being quite loose on the policy. Those packages are not fit for
the official Debian archive but may be OK for other usages.

All those packages can be built with:

    dpkg-buildpackage -us -uc -b

Only binary packages can be safely built from those sources. Do not
attempt to build source packages as they are likely to be flawed.

If you don't wish to satisfy the build dependencies, you can build with:

    dpkg-buildpackage -us -uc -b -d

Most packages will download the source code from Internet (without any
check). This is more convenient for simple examples, but the `debian/`
directory could have been just integrated into the original source
tree to skip this test.

## Dependencies

Ensure you have those packages installed:

 - `build-essential`
 - `debhelper`
 - `pkg-create-dbgsym` (optional, only for Ubuntu systems)

You may also want the specified build dependencies.

## Packages

### nodejs

This is a all-in-one package for [nodejs](https://nodejs.org/en/). It
will download the version specified in `debian/rules` and build a
package from that. This package contains an embedded copy OpenSSL,
libuv, zlib and I suppose many other dependencies.
