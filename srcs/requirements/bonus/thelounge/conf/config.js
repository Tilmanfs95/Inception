"use strict";

module.exports = {
	//
	// Set the server mode.
	// Public servers does not require authentication.
	//
	// Set to 'false' to enable users.
	//
	// @type     boolean
	// @default  true
	//
	public: true,

	//
	// IP address or hostname for the web server to listen on.
	// Setting this to undefined will listen on all interfaces.
	//
	// @type     string
	// @default  undefined
	//
	host: undefined,

	//
	// Set the port to listen on.
	//
	// @type     int
	// @default  9000
	//
	port: 9000,

	//
	// Set the local IP to bind to for outgoing connections. Leave to undefined
	// to let the operating system pick its preferred one.
	//
	// @type     string
	// @default  undefined
	//
	bind: undefined,

	//
	// Sets whether the server is behind a reverse proxy and should honor the
	// X-Forwarded-For header or not.
	//
	// @type     boolean
	// @default  false
	//
	reverseProxy: true,

	//
	// Set the default theme.
	//
	// @type     string
	// @default  "themes/example.css"
	// "themes/crypto.css"
	// "themes/example.css"
	// "themes/morning.css"
	// "themes/zenburn.css"
	//
	theme: "themes/zenburn.css",

	//
	// Prefetch URLs
	//
	// If enabled, The Lounge will try to load thumbnails and site descriptions from
	// URLs posted in channels.
	//
	// @type     boolean
	// @default  false
	//
	prefetch: false,

	//
	// Prefetch URLs Image Preview size limit
	//
	// If prefetch is enabled, The Lounge will only display content under the maximum size.
	// Default value is 512 (in kB)
	//
	// @type     int
	// @default  512
	//
	prefetchMaxImageSize: 512,

	//
	// Display network
	//
	// If set to false network settings will not be shown in the login form.
	//
	// @type     boolean
	// @default  true
	//
	displayNetwork: false,

	//
	// Lock network
	//
	// If set to true, users will not be able to modify host, port and tls
	// settings and will be limited to the configured network.
	//
	// @type     boolean
	// @default  false
	//
	lockNetwork: true,

	//
	// Hex IP
	//
	// If enabled, clients' username will be set to their IP encoded has hex.
	// This is done to share the real user IP address with the server for host masking purposes.
	//
	// @type     boolean
	// @default  false
	//
	useHexIp: false,

	//
	// WEBIRC support
	//
	// If enabled, The Lounge will pass the connecting user's host and IP to the
	// IRC server. Note that this requires to obtain a password from the IRC network
	// The Lounge will be connecting to and generally involves a lot of trust from the
	// network you are connecting to.
	//
	// Format (standard): {"irc.example.net": "hunter1", "irc.example.org": "passw0rd"}
	// Format (function):
	//   {"irc.example.net": function(client, args, trusted) {
	//       // here, we return a webirc object fed directly to `irc-framework`
	//       return {username: "thelounge", password: "hunter1", address: args.ip, hostname: "webirc/"+args.hostname};
	//   }}
	//
	// @type     string | function(client, args):object(webirc)
	// @default  null
	webirc: null,

	//
	// Log settings
	//
	// Logging has to be enabled per user. If enabled, logs will be stored in
	// the 'logs/<user>/<network>/' folder.
	//
	// @type     object
	// @default  {}
	//
	logs: {
		//
		// Timestamp format
		//
		// @type     string
		// @default  "YYYY-MM-DD HH:mm:ss"
		//
		format: "YYYY-MM-DD HH:mm:ss",

		//
		// Timezone
		//
		// @type     string
		// @default  "UTC+00:00"
		//
		timezone: "UTC+00:00"
	},

	//
	// Maximum number of history lines per channel
	//
	// Defines the maximum number of history lines that will be kept in
	// memory per channel/query, in order to reduce the memory usage of
	// the server. Negative means unlimited.
	//
	// @type     integer
	// @default  -1
	maxHistory: -1,

	//
	// Default values for the 'Connect' form.
	//
	// @type     object
	// @default  {}
	//
	defaults: {
		//
		// Name
		//
		// @type     string
		// @default  "Freenode"
		//
		name: "ft_irc",

		//
		// Host
		//
		// @type     string
		// @default  "chat.freenode.net"
		//
		host: "ft_irc",

		//
		// Port
		//
		// @type     int
		// @default  6697
		//
		port: 6667,

		//
		// Password
		//
		// @type     string
		// @default  ""
		//
		password: "",

		//
		// Enable TLS/SSL
		//
		// @type     boolean
		// @default  true
		//
		tls: false,

		//
		// Nick
		//
		// @type     string
		// @default  "lounge-user"
		//
		nick: "",

		//
		// Username
		//
		// @type     string
		// @default  "lounge-user"
		//
		username: "",

		//
		// Real Name
		//
		// @type     string
		// @default  "The Lounge User"
		//
		realname: "",

		//
		// Channels
		// This is a comma-separated list.
		//
		// @type     string
		// @default  "#thelounge"
		//
		join: "#Inception, #ft_irc, #42"
	},

	//
	// Set socket.io transports
	//
	// @type     array
	// @default  ["polling", "websocket"]
	//
	transports: ["polling", "websocket"],

	//
	// Run The Lounge using encrypted HTTP/2.
	// This will fallback to regular HTTPS if HTTP/2 is not supported.
	//
	// @type     object
	// @default  {}
	//
	https: {
		//
		// Enable HTTP/2 / HTTPS support.
		//
		// @type     boolean
		// @default  false
		//
		enable: false,

		//
		// Path to the key.
		//
		// @type     string
		// @example  "sslcert/key.pem"
		// @default  ""
		//
		key: "",

		//
		// Path to the certificate.
		//
		// @type     string
		// @example  "sslcert/key-cert.pem"
		// @default  ""
		//
		certificate: ""
	},

	//
	// Run The Lounge with identd support.
	//
	// @type     object
	// @default  {}
	//
	identd: {
		//
		// Run the identd daemon on server start.
		//
		// @type     boolean
		// @default  false
		//
		enable: false,

		//
		// Port to listen for ident requests.
		//
		// @type     int
		// @default  113
		//
		port: 113
	},

	//
	// Enable oidentd support using the specified file
	//
	// Example: oidentd: "~/.oidentd.conf",
	//
	// @type     string
	// @default  null
	//
	oidentd: null,

	//
	// LDAP authentication settings (only available if public=false)
	// @type    object
	// @default {}
	//
	ldap: {
		//
		// Enable LDAP user authentication
		//
		// @type     boolean
		// @default  false
		//
		enable: false,

		//
		// LDAP server URL
		//
		// @type     string
		//
		url: "ldaps://example.com",

		//
		// LDAP base dn
		//
		// @type     string
		//
		baseDN: "ou=accounts,dc=example,dc=com",

		//
		// LDAP primary key
		//
		// @type     string
		// @default  "uid"
		//
		primaryKey: "uid"
	},

	// Extra debugging
	//
	// @type     object
	// @default  {}
	//
	debug: {
		// Enables extra debugging output provided by irc-framework.
		//
		// @type     boolean
		// @default  false
		//
		ircFramework: false,

		// Enables logging raw IRC messages into each server window.
		//
		// @type     boolean
		// @default  false
		//
		raw: false,
	},
};
