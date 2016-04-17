var conf = require('/usr/share/doc/kiwiirc/examples/config.example.js').production;

conf.servers = [];
conf.servers.push({
    port:   7778,
    address: "0.0.0.0"
});

conf.public_http = "/usr/lib/kiwiirc/client";

module.exports.production = conf;
