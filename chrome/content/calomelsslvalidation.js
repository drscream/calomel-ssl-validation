/**
*** Calomel SSL Validation
***    https://calomel.org
**/

var calomelsslvalidation = {

  startFirefox: function() {

    const cc = Components.classes;
    const ci = Components.interfaces;
    const prefs = cc["@mozilla.org/preferences-service;1"].getService(ci.nsIPrefBranch);

    // retrieve user preference
    var calomel_prefAnimMode     = prefs.getBoolPref("extensions.calomelsslvalidation.animations");
    var calomel_prefCipher256pfs = prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_256pfs");
    var calomel_prefCipher128pfs = prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_128pfs");
    var calomel_prefCipher128    = prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_128");
    var calomel_prefCipherAll    = prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_all");
    var calomel_prefOCSP         = prefs.getBoolPref("extensions.calomelsslvalidation.ocsp");
    var calomel_prefTLS          = prefs.getBoolPref("extensions.calomelsslvalidation.tls");
    var calomel_prefProxyDns     = prefs.getBoolPref("extensions.calomelsslvalidation.proxy_dns");
    var calomel_prefToolTips     = prefs.getBoolPref("extensions.calomelsslvalidation.tool_tips");
    var calomel_prefPaintDelay   = prefs.getBoolPref("extensions.calomelsslvalidation.paint_delay");
    var calomel_prefSafeBrowsing = prefs.getBoolPref("extensions.calomelsslvalidation.safe_browsing");
    var calomel_prefPrefetch     = prefs.getBoolPref("extensions.calomelsslvalidation.prefetch");
    var calomel_prefDnsPrefetch  = prefs.getBoolPref("extensions.calomelsslvalidation.dns_prefetch");
    var calomel_prefGeoLocate    = prefs.getBoolPref("extensions.calomelsslvalidation.geo_locate");
    var calomel_prefSpelling     = prefs.getBoolPref("extensions.calomelsslvalidation.spelling");
    var calomel_prefTabTitle     = prefs.getBoolPref("extensions.calomelsslvalidation.tab_title");
    var calomel_prefMemCache     = prefs.getBoolPref("extensions.calomelsslvalidation.mem_cache");
    var calomel_prefUrlGuess     = prefs.getBoolPref("extensions.calomelsslvalidation.url_guess");
    var calomel_prefDnsCache     = prefs.getBoolPref("extensions.calomelsslvalidation.dns_cache");
    var calomel_prefSendReferer  = prefs.getBoolPref("extensions.calomelsslvalidation.send_referer");
    var calomel_prefUserAgent    = prefs.getBoolPref("extensions.calomelsslvalidation.user_agent");

    // set cipher toggle on start of firefox
    prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_256pfs", calomel_prefCipher256pfs);
    prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_128pfs", calomel_prefCipher128pfs);
    prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_128", calomel_prefCipher128);
    prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_all", calomel_prefCipherAll);

    // call method setting all user prefs
    calomelsslvalidation.calomel_toggleAnimMode(calomel_prefAnimMode, prefs);
    calomelsslvalidation.calomel_toggleCipherUser();
    calomelsslvalidation.calomel_toggleOCSP(calomel_prefOCSP, prefs);
    calomelsslvalidation.calomel_toggleTLS(calomel_prefTLS, prefs);
    calomelsslvalidation.calomel_toggleProxyDns(calomel_prefProxyDns, prefs);
    calomelsslvalidation.calomel_toggleToolTips(calomel_prefToolTips, prefs);
    calomelsslvalidation.calomel_togglePaintDelay(calomel_prefPaintDelay, prefs);
    calomelsslvalidation.calomel_toggleSafeBrowsing(calomel_prefSafeBrowsing, prefs);
    calomelsslvalidation.calomel_togglePrefetch(calomel_prefPrefetch, prefs);
    calomelsslvalidation.calomel_toggleDnsPrefetch(calomel_prefDnsPrefetch, prefs);
    calomelsslvalidation.calomel_toggleGeoLocate(calomel_prefGeoLocate, prefs);
    calomelsslvalidation.calomel_toggleSpelling(calomel_prefSpelling, prefs);
    calomelsslvalidation.calomel_toggleMemCache(calomel_prefMemCache, prefs);
    calomelsslvalidation.calomel_toggleUrlGuess(calomel_prefUrlGuess, prefs);
    calomelsslvalidation.calomel_toggleDnsCache(calomel_prefDnsCache, prefs);
    calomelsslvalidation.calomel_toggleSendReferer(calomel_prefSendReferer, prefs);
    calomelsslvalidation.calomel_toggleUserAgent(calomel_prefUserAgent, prefs);
  },


   //enable or disable Online Certificate Status Protocol (OCSP)
   calomel_toggleOCSP: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.ocsp.state") == true)
                         { prefs.clearUserPref("security.OCSP.require");
                           prefs.clearUserPref("security.OCSP.enabled");
                           prefs.clearUserPref("extensions.calomelsslvalidation.ocsp.state", true); }
     if (param == true) {  prefs.setBoolPref("security.OCSP.require", false);
                           prefs.setIntPref("security.OCSP.enabled", "0");
                           prefs.setBoolPref("extensions.calomelsslvalidation.ocsp.state", true); }
   },

   //enable or disable TLSv1.2, disable anything lower
   calomel_toggleTLS: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.tls.state") == true)
                         { prefs.clearUserPref("security.tls.version.min");
                           prefs.clearUserPref("security.tls.version.max");
                           prefs.clearUserPref("extensions.calomelsslvalidation.tls.state", true); }
     if (param == true) {  prefs.setIntPref("security.tls.version.min", 3);
                           prefs.setIntPref("security.tls.version.max", 3); 
                           prefs.setBoolPref("extensions.calomelsslvalidation.tls.state", true); }
   },

   //enable or disable sending full referer info to server after a link is clicked
   calomel_toggleSendReferer: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.send_referer.state") == true)
                         { prefs.clearUserPref("network.http.sendRefererHeader");
                           prefs.clearUserPref("network.http.sendSecureXSiteReferrer");
                           prefs.clearUserPref("extensions.calomelsslvalidation.send_referer.state"); } 
     if (param == true) {  prefs.setIntPref("network.http.sendRefererHeader", 0); 
                           prefs.setBoolPref("network.http.sendSecureXSiteReferrer", false);
                           prefs.setBoolPref("extensions.calomelsslvalidation.send_referer.state", true); }
   },

   //send a more generic user agent string for privacy. No need for servers to know our OS or other info.
   calomel_toggleUserAgent: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.user_agent.state") == true)
                         { prefs.clearUserPref("general.useragent.override");
                           prefs.clearUserPref("extensions.calomelsslvalidation.user_agent.state"); } 
     if (param == true) {  prefs.setCharPref("general.useragent.override", "Mozilla/5.0 (compatible)");
                           prefs.setBoolPref("extensions.calomelsslvalidation.user_agent.state", true); }
   },

   //enable or disable internal firefox dns cache 
   calomel_toggleDnsCache: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.dns_cache.state") == true)
                         { prefs.clearUserPref("network.dnsCacheEntries"); 
                           prefs.clearUserPref("network.dnsCacheExpiration");
                           prefs.clearUserPref("extensions.calomelsslvalidation.dns_cache.state"); } 
     if (param == true) {  prefs.setIntPref("network.dnsCacheEntries", 0); 
                           prefs.setIntPref("network.dnsCacheExpiration", 0);
                           prefs.setBoolPref("extensions.calomelsslvalidation.dns_cache.state", true); }
   },

   //enable or disable caching to memory only, no disk and increase cache size to 128meg 
   calomel_toggleMemCache: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.mem_cache.state") == true )
                         { prefs.clearUserPref("browser.cache.disk.enable");
                           prefs.clearUserPref("browser.cache.disk.capacity"); 
                           prefs.clearUserPref("browser.cache.memory.enable");
                           prefs.clearUserPref("browser.sessionhistory.cache_subframes");
                           prefs.clearUserPref("browser.cache.check_doc_frequency"); 
                           prefs.clearUserPref("browser.cache.memory.capacity");
                           prefs.clearUserPref("extensions.calomelsslvalidation.mem_cache.state"); }
     if (param == true) { prefs.setBoolPref("browser.cache.disk.enable", false);
                          prefs.setIntPref("browser.cache.disk.capacity", 0); 
                          prefs.setBoolPref("browser.cache.memory.enable", true);
                          prefs.setBoolPref("browser.sessionhistory.cache_subframes", true);
                          prefs.setIntPref("browser.cache.check_doc_frequency", 3); 
                          prefs.setIntPref("browser.cache.memory.capacity",  131072);
                          prefs.setBoolPref("extensions.calomelsslvalidation.mem_cache.state",true); }
   },

   //enable or disable spell checking 
   calomel_toggleSpelling: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.spelling.state") == true)
                        { prefs.clearUserPref("layout.spellcheckDefault");
                          prefs.clearUserPref("extensions.calomelsslvalidation.spelling.state"); }
     if (param == true) { prefs.setIntPref("layout.spellcheckDefault", 2);
                          prefs.setBoolPref("extensions.calomelsslvalidation.spelling.state", true); }
   },

   //enable or disable geo location reporting to websites 
   calomel_toggleGeoLocate: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.geo_locate.state") == true)
                        { prefs.clearUserPref("geo.enabled");
                          prefs.clearUserPref("extensions.calomelsslvalidation.geo_locate.state"); }
     if (param == true) { prefs.setBoolPref("geo.enabled", false); 
                          prefs.setBoolPref("extensions.calomelsslvalidation.geo_locate.state", true); }
   },

   //enable or disable short URL keyword guessing 
   calomel_toggleUrlGuess: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.url_guess.state") == true)
                        { prefs.clearUserPref("browser.fixup.alternate.enabled");
                          prefs.clearUserPref("keyword.enabled");
                          prefs.clearUserPref("extensions.calomelsslvalidation.url_guess.state"); }
     if (param == true) { prefs.setBoolPref("browser.fixup.alternate.enabled", false);
                          prefs.setBoolPref("keyword.enabled", false);
                          prefs.setBoolPref("extensions.calomelsslvalidation.url_guess.state", true); }
   },

   //enable or disable prefetch of unvisted sites 
   calomel_toggleDnsPrefetch: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.dns_prefetch.state") == true )
                        { prefs.clearUserPref("network.dns.disablePrefetch");
                          prefs.clearUserPref("network.dns.disablePrefetchFromHTTPS");
                          prefs.clearUserPref("extensions.calomelsslvalidation.dns_prefetch.state") }
     if (param == true) { prefs.setBoolPref("network.dns.disablePrefetch", true);
                          prefs.setBoolPref("network.dns.disablePrefetchFromHTTPS", true);
                          prefs.setBoolPref("extensions.calomelsslvalidation.dns_prefetch.state", true); }
   },

   //enable or disable the prefetching of unvisited links
   calomel_togglePrefetch: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.prefetch.state") == true)
                        { prefs.clearUserPref("network.prefetch-next");
                          prefs.clearUserPref("extensions.calomelsslvalidation.prefetch.state"); }
     if (param == true) { prefs.setBoolPref("network.prefetch-next", false);
                          prefs.setBoolPref("extensions.calomelsslvalidation.prefetch.state", true); }
   },

   //enable or disable paint delay
   calomel_togglePaintDelay: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.paint_delay.state") == true)
                        { prefs.clearUserPref("nglayout.initialpaint.delay");
                           prefs.clearUserPref("content.notify.ontimer");
                           prefs.clearUserPref("content.notify.backoffcount"); 
                           prefs.clearUserPref("content.notify.interval");
                           prefs.clearUserPref("extensions.calomelsslvalidation.paint_delay.state"); }
     if (param == true) { prefs.setIntPref("nglayout.initialpaint.delay", "2000");
                          prefs.setBoolPref("content.notify.ontimer", "true");
                          prefs.setIntPref("content.notify.backoffcount", "5"); 
                          prefs.setIntPref("content.notify.interval", "1000000");
                          prefs.setBoolPref("extensions.calomelsslvalidation.paint_delay.state", true); }
   },

   //enable or disable animated images
   calomel_toggleAnimMode: function(param, prefs) {
     if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.animations.state") == true)
                        { prefs.clearUserPref("image.animation_mode");
                          prefs.clearUserPref("extensions.calomelsslvalidation.animations.state"); }
     if (param == true) { prefs.setCharPref("image.animation_mode", "none");
                          prefs.setBoolPref("extensions.calomelsslvalidation.animations.state", true); }
   },

   // enable or disable tool tips
   calomel_toggleToolTips: function (param, prefs) {
      if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.tool_tips.state") == true)
                         { prefs.clearUserPref("browser.chrome.toolbar_tips");
                           prefs.clearUserPref("extensions.calomelsslvalidation.tool_tips.state"); }
      if (param == true) { prefs.setBoolPref("browser.chrome.toolbar_tips", false);
                           prefs.setBoolPref("extensions.calomelsslvalidation.tool_tips.state", true); }
   },

   // enable or disable dns lookups over a proxy
   calomel_toggleProxyDns: function (param, prefs) {
      if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.proxy_dns.state") == true)
                         { prefs.clearUserPref("network.proxy.socks_remote_dns");
                           prefs.clearUserPref("extensions.calomelsslvalidation.proxy_dns.state"); }
      if (param == true) { prefs.setBoolPref("network.proxy.socks_remote_dns", true);
                           prefs.setBoolPref("extensions.calomelsslvalidation.proxy_dns.state", true); }
   },

   // enable or disable safe browsing
   calomel_toggleSafeBrowsing: function(param, prefs) {
      if (param == false && prefs.getBoolPref("extensions.calomelsslvalidation.safe_browsing.state") == true)
                         { prefs.clearUserPref("browser.safebrowsing.enabled");
                           prefs.clearUserPref("browser.safebrowsing.malware.enabled");
                           prefs.clearUserPref("extensions.calomelsslvalidation.safe_browsing.state"); }
      if (param == true) { prefs.setBoolPref("browser.safebrowsing.enabled", false);
                           prefs.setBoolPref("browser.safebrowsing.malware.enabled", false);
                           prefs.setBoolPref("extensions.calomelsslvalidation.safe_browsing.state", true); }
   },

   // enable or disable ciphers
   calomel_toggleCipherUser: function(param, prefs) {

   var cc = Components.classes;
   var ci = Components.interfaces;
   var prefs = cc["@mozilla.org/preferences-service;1"].getService(ci.nsIPrefBranch);

   // Ciphers 256 bit Perfect Forward Secrecy (PFS)
   const calomel_listCipher256pfs = ("security.ssl3.ecdhe_ecdsa_aes_256_sha;security.ssl3.ecdhe_ecdsa_chacha20_poly1305_sha256;security.ssl3.ecdhe_rsa_aes_256_sha;security.ssl3.ecdhe_rsa_chacha20_poly1305_sha256").split(';');

   // Ciphers 128 bit Perfect Forward Secrecy (PFS)
   const calomel_listCipher128pfs = ("security.ssl3.ecdhe_ecdsa_aes_128_gcm_sha256;security.ssl3.ecdhe_ecdsa_aes_128_sha;security.ssl3.ecdhe_ecdsa_aes_256_sha;security.ssl3.ecdhe_ecdsa_chacha20_poly1305_sha256;security.ssl3.ecdhe_ecdsa_rc4_128_sha;security.ssl3.ecdhe_rsa_aes_128_gcm_sha256;security.ssl3.ecdhe_rsa_aes_128_sha;security.ssl3.ecdhe_rsa_aes_256_sha;security.ssl3.ecdhe_rsa_chacha20_poly1305_sha256;security.ssl3.ecdhe_rsa_rc4_128_sha").split(';');

   // Ciphers 128 bit 
   const calomel_listCipher128 = ("security.ssl3.dhe_rsa_aes_128_sha;security.ssl3.dhe_rsa_aes_256_sha;security.ssl3.ecdhe_ecdsa_aes_128_gcm_sha256;security.ssl3.ecdhe_ecdsa_aes_128_sha;security.ssl3.ecdhe_ecdsa_aes_256_sha;security.ssl3.ecdhe_ecdsa_chacha20_poly1305_sha256;security.ssl3.ecdhe_ecdsa_rc4_128_sha;security.ssl3.ecdhe_rsa_aes_128_gcm_sha256;security.ssl3.ecdhe_rsa_aes_128_sha;security.ssl3.ecdhe_rsa_aes_256_sha;security.ssl3.ecdhe_rsa_chacha20_poly1305_sha256;security.ssl3.ecdhe_rsa_rc4_128_sha;security.ssl3.rsa_aes_128_sha;security.ssl3.rsa_aes_256_sha;security.ssl3.rsa_rc4_128_md5;security.ssl3.rsa_rc4_128_sha").split(';');

   // list of all ciphers 
   const calomel_listCipherAll = ("security.ssl3.dhe_rsa_aes_128_sha;security.ssl3.dhe_rsa_aes_256_sha;security.ssl3.ecdhe_ecdsa_aes_128_gcm_sha256;security.ssl3.ecdhe_ecdsa_aes_128_sha;security.ssl3.ecdhe_ecdsa_aes_256_sha;security.ssl3.ecdhe_ecdsa_chacha20_poly1305_sha256;security.ssl3.ecdhe_ecdsa_rc4_128_sha;security.ssl3.ecdhe_rsa_aes_128_gcm_sha256;security.ssl3.ecdhe_rsa_aes_128_sha;security.ssl3.ecdhe_rsa_aes_256_sha;security.ssl3.ecdhe_rsa_chacha20_poly1305_sha256;security.ssl3.ecdhe_rsa_rc4_128_sha;security.ssl3.rsa_aes_128_sha;security.ssl3.rsa_aes_256_sha;security.ssl3.rsa_des_ede3_sha;security.ssl3.rsa_rc4_128_md5;security.ssl3.rsa_rc4_128_sha").split(';');

     // enable Ciphers 256 bit Perfect Forward Secrecy (PFS)
     if (prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_256pfs")) {
         prefs.setBoolPref("security.enable_tls", true);
         prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_256pfs", true);
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_256pfs.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128pfs");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128pfs.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_all");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_all.state");
         for (var i=0; i<calomel_listCipherAll.length; i++) prefs.setBoolPref(calomel_listCipherAll[i], false);
         for (var i=0; i<calomel_listCipher256pfs.length; i++) prefs.setBoolPref(calomel_listCipher256pfs[i], true);
      }

     // enable Ciphers 128 bit Perfect Forward Secrecy (PFS)
     if (prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_128pfs")) {
         prefs.setBoolPref("security.enable_tls", true);
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_256pfs");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_256pfs.state");
         prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_128pfs", true);
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128pfs.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_all");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_all.state");
         for (var i=0; i<calomel_listCipherAll.length; i++) prefs.setBoolPref(calomel_listCipherAll[i], false);
         for (var i=0; i<calomel_listCipher128pfs.length; i++) prefs.setBoolPref(calomel_listCipher128pfs[i], true);
     }

     // enable Ciphers 128 bit
     if (prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_128")) {
         prefs.setBoolPref("security.enable_tls", true);
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_256pfs");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_256pfs.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128pfs");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128pfs.state");
         prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_128", true);
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_all");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_all.state");
         for (var i=0; i<calomel_listCipherAll.length; i++) prefs.setBoolPref(calomel_listCipherAll[i], false);
         for (var i=0; i<calomel_listCipher128.length; i++) prefs.setBoolPref(calomel_listCipher128[i], true);
     }

     // Enable ALL ciphers (firefox defaults)
     if (prefs.getBoolPref("extensions.calomelsslvalidation.ciphers_all")) {
         prefs.clearUserPref("security.enable_tls");
         for (var i=0; i<calomel_listCipherAll.length; i++) prefs.clearUserPref(calomel_listCipherAll[i]);
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_256pfs");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_256pfs.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128pfs");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128pfs.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128.state");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_128");
         prefs.clearUserPref("extensions.calomelsslvalidation.ciphers_all.state");
         prefs.setBoolPref("extensions.calomelsslvalidation.ciphers_all", true);
     }

  },

  // open the cache summary. May be helpful for diagnostics.
  calomel_summaryCacheUsage: function(event) {
    openUILink("about:cache", event, false, true);
  },

  // open the memory cache device. May be helpful for diagnostics.
  calomel_memoryCacheUsage: function(event) {
    openUILink("about:cache?device=memory", event, false, true);
  },

  // open the disk cache device. May be helpful for diagnostics.
  calomel_diskCacheUsage: function(event) {
    openUILink("about:cache?device=disk", event, false, true);
  },

  // open the memory cache device. May be helpful for diagnostics.
  calomel_offlineCacheUsage: function(event) {
    openUILink("about:cache?device=offline", event, false, true);
  },

  // open a link to our home page
  openHomePageLink: function(event) {
    openUILink("https://calomel.org/firefox_ssl_validation.html", event, false, true);
  },

  //
  // popup window section
  //

  // events for mouse button clicks on the toolbar button. 0=left , 1=middle and 2=right mouse button
  calomelButtonEvent: function(event) {
     if (event.type == "click" && event.button == 0) { this._calomelPopup.openPopup(this._calomelPopupContentUrlImage, 'after_start'); }
     if (event.type == "click" && event.button == 1) { window.openDialog('chrome://calomelsslvalidation/content/options.xul'); }
     if (event.type == "click" && event.button == 2) { calomelsslvalidation.startFirefox(); }
  },

  // collect the elements from xul 
  get _calomelPopup () { return document.getElementById("calomelsslvalidation-popup"); },
  get _calomelPopupContentUrlImage () { return document.getElementById("calomelsslvalidation-urlicon"); },
  get _calomelPopupContentHost () { return document.getElementById("calomelsslvalidation-popup-content-host"); },
  get _calomelPopupContentSecure () { return document.getElementById("calomelsslvalidation-popup-content-secure"); },
  get _calomelPopupContentCertificate () { return document.getElementById("calomelsslvalidation-popup-content-certificate"); },
  get _calomelPopupContentPfs () { return document.getElementById("calomelsslvalidation-popup-content-pfs"); },
  get _calomelPopupContentCiphersuite () { return document.getElementById("calomelsslvalidation-popup-content-ciphersuite"); },
  get _calomelPopupContentTlsVersion () { return document.getElementById("calomelsslvalidation-popup-content-tls_version"); },
  get _calomelPopupContentKeyExchange () { return document.getElementById("calomelsslvalidation-popup-content-key_exchange"); },
  get _calomelPopupContentSignature () { return document.getElementById("calomelsslvalidation-popup-content-signature"); },
  get _calomelPopupContentBulkCipher () { return document.getElementById("calomelsslvalidation-popup-content-bulk_cipher"); },
  get _calomelPopupContentMAC () { return document.getElementById("calomelsslvalidation-popup-content-mac"); },
  get _calomelPopupContentHomePage () { return document.getElementById("calomelsslvalidation-popup-content-homepage"); },
  get _calomelPopupContentCommonName () { return document.getElementById("calomelsslvalidation-popup-content-commonname"); },
  get _calomelPopupContentCertType () { return document.getElementById("calomelsslvalidation-popup-content-cert-type"); },
  get _calomelPopupContentOrganization () { return document.getElementById("calomelsslvalidation-popup-content-organization"); },
  get _calomelPopupContentOrganizationSubCert () { return document.getElementById("calomelsslvalidation-popup-content-organization-subcert"); },
  get _calomelPopupContentOrganizationCaCert () { return document.getElementById("calomelsslvalidation-popup-content-organization-cacert"); },
  get _calomelPopupContentOrganizationLocation () { return document.getElementById("calomelsslvalidation-popup-content-organization-location"); },
  get _calomelPopupContentIssuerOrganization () { return document.getElementById("calomelsslvalidation-popup-content-issuer"); },
  get _calomelPopupContentIssuerLocation () { return document.getElementById("calomelsslvalidation-popup-content-issuer-location"); },
  get _calomelPopupContentValidBeforeDate () { return document.getElementById("calomelsslvalidation-popup-content-before-date"); },
  get _calomelPopupContentValidAfterDate () { return document.getElementById("calomelsslvalidation-popup-content-after-date"); },
  get _calomelPopupContentCurrentDate () { return document.getElementById("calomelsslvalidation-popup-content-current-date"); },

  //
  // page load section
  //

   onPageLoad: function() {

     const ci = Components.interfaces;
     const cc = Components.classes;
     const gb = window.getBrowser();
     const prefs = cc["@mozilla.org/preferences-service;1"].getService(ci.nsIPrefBranch);

     // initilize the popup window
     const calomelsslvalidation_current_greeting = "version 0.82";
     calomelsslvalidation._calomelPopupContentSecure.textContent = calomelsslvalidation_current_greeting;
     calomelsslvalidation._calomelPopupContentCurrentDate.textContent = (new Date());

     // Install the toolbar button on first install ONLY (mozilla code)
     var calomel_prefFirstInstall = prefs.getBoolPref("extensions.calomelsslvalidation.first_install");
     if (calomel_prefFirstInstall) {
      prefs.setBoolPref("extensions.calomelsslvalidation.first_install", false); 
       try {
          var firefoxnav = document.getElementById("nav-bar");
          var curSet = firefoxnav.currentSet;
          if (curSet.indexOf("calomelsslvalidation-urlicon") == -1)
          {
            var set;
            // Place the button before the urlbar
            if (curSet.indexOf("urlbar-container") != -1)
              set = curSet.replace(/urlbar-container/, "calomelsslvalidation-urlicon,urlbar-container");
            else  // at the end
              set = curSet + ",calomelsslvalidation-urlicon";
            firefoxnav.setAttribute("currentset", set);
            firefoxnav.currentSet = set;
            document.persist("nav-bar", "currentset");
            // If you don't do the following call, funny things happen
            try {
              BrowserToolboxCustomizeDone(true);
            }
            catch (e) { }
          }
        }
        catch(e) { }
      } 

     var calomel_updateListener = {
       onStateChange:    function(aWebProgress, aRequest, aFlag, aStatus) { calomelsslvalidation.onPageUpdate(); },
       onLocationChange: function(aWebProgress, aRequest, aURI) { calomelsslvalidation.onPageUpdate(); },
       onSecurityChange: function(aWebProgress, aRequest, aState) { calomelsslvalidation.onPageUpdate(); },
       onStatusChange: function(aWebProgress) { return; },
       onProgressChange: function(aWebProgress) { return; }
     };

     //gb.addProgressListener(calomel_updateListener, ci.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
       gb.addProgressListener(calomel_updateListener);
    },

  //
  // page loads, tab changed
  //
   onPageUpdate: function() {

     // CURRENT VERSION
     const calomelsslvalidation_current_version = 82;
     const calomelsslvalidation_current_greeting = "version 0.82";

     // global constants
     const cc = Components.classes;
     const ci = Components.interfaces;
     const gb = window.getBrowser();
     const prefs = cc["@mozilla.org/preferences-service;1"].getService(ci.nsIPrefBranch);
     var currentBrowser = gb.selectedBrowser;
     var ui = currentBrowser.securityUI;
     var insecureSSL = (ui.state & ci.nsIWebProgressListener.STATE_IS_INSECURE);
     var calomel_url_protocol = window.content.location.protocol;
     var calomel_conn_score = 0;
     var calomel_prefTabTitle = prefs.getBoolPref("extensions.calomelsslvalidation.tab_title");

     // open the calomel help page on update or install
     var calomel_prefHomeOnUpdate = prefs.getBoolPref("extensions.calomelsslvalidation.home_on_update");
     var calomel_prefVersion = prefs.getIntPref("extensions.calomelsslvalidation.version");
     if (calomel_prefHomeOnUpdate && calomel_prefVersion < calomelsslvalidation_current_version) {
       gBrowser.addTab("https://calomel.org/firefox_ssl_validation.html");
       prefs.setIntPref("extensions.calomelsslvalidation.version", calomelsslvalidation_current_version);
     }

     // if the toolbar button is not used on any toolbar just return
     if (document.getElementById("calomelsslvalidation-urlicon") == null ) return;

     // reset strings
     calomelsslvalidation._calomelPopupContentHost.textContent = null;
     calomelsslvalidation._calomelPopupContentSecure.textContent = calomelsslvalidation_current_greeting;
//    calomelsslvalidation._calomelPopupContentSecure.textContent = calomel_url_protocol;
     calomelsslvalidation._calomelPopupContentCiphersuite.textContent = null;
     calomelsslvalidation._calomelPopupContentTlsVersion.textContent = null;  
     calomelsslvalidation._calomelPopupContentPfs.textContent         = null;  
     calomelsslvalidation._calomelPopupContentKeyExchange.textContent = null;
     calomelsslvalidation._calomelPopupContentSignature.textContent   = null;
     calomelsslvalidation._calomelPopupContentBulkCipher.textContent  = null;
     calomelsslvalidation._calomelPopupContentMAC.textContent         = null;
     calomelsslvalidation._calomelPopupContentCommonName.textContent = null;
     calomelsslvalidation._calomelPopupContentCertType.textContent = null;
     calomelsslvalidation._calomelPopupContentOrganization.textContent = null;
     calomelsslvalidation._calomelPopupContentOrganizationSubCert.textContent = null;
     calomelsslvalidation._calomelPopupContentOrganizationCaCert.textContent = null;
     calomelsslvalidation._calomelPopupContentOrganizationLocation.textContent = null;
     calomelsslvalidation._calomelPopupContentIssuerOrganization.textContent = null;
     calomelsslvalidation._calomelPopupContentIssuerLocation.textContent = null;
     calomelsslvalidation._calomelPopupContentValidBeforeDate.textContent = null;
     calomelsslvalidation._calomelPopupContentValidAfterDate.textContent = null;
     calomelsslvalidation._calomelPopupContentCurrentDate.textContent = (new Date());
     calomelsslvalidation._calomelPopupContentCertificate.textContent = null;
     document.getElementById("calomelsslvalidation-urlicon").image="chrome://calomelsslvalidation/skin/calomelsslvalidation_grey_button.png";


     // clear the title and icon from the tab if the user prefers it
       if (calomel_prefTabTitle) {
          var current_tab = window.document.getElementById("content").selectedTab;
          current_tab.label = "";
          current_tab.setAttribute("image", " ");
       }

     // https ssl connections
     if (calomel_url_protocol == "https:") {

      // collect the certificate information
      if (ui && !insecureSSL)  {
          ui.QueryInterface(ci.nsISSLStatusProvider);
          var calomel_url_hostname = window.content.location.hostname;
          var status = ui.SSLStatus;
          if (!status) return;
          var calomel_ssl_cert = status.serverCert;
          if (!(calomel_ssl_cert)) return;
          var calomel_date_validity = calomel_ssl_cert.validity.QueryInterface(ci.nsIX509CertValidity);
          var calomel_ssl_cert_verification;
          if (status && !insecureSSL) {
             status.QueryInterface(ci.nsISSLStatus);
          }
        
       // collect the TLS version. version is an integer, TLSv1.2=3 , TLS1.1=2, TLS1.0=1 and SSL3=0
        var version = status.protocolVersion;

      // Check ssl certificate security state flags
      if (Ci.nsIWebProgressListener.STATE_IS_SECURE) {
           calomel_ssl_cert_verification = "Verified";
      } else if (Ci.nsIWebProgressListener.STATE_IS_INSECURE) {
           calomel_ssl_cert_verification = "WARNING! not trusted";
           calomel_conn_score -= 100;
      } else {
           calomel_ssl_cert_verification = "WARNING! broken";
           calomel_conn_score -= 100;
      }

      // does the url hostname and certificate common name match?
      var calomel_hosts_match = " (DOMAIN MISMATCH!)";
            calomel_conn_score -= 100;
      if (! calomel_ssl_cert.isDomainMismatch) {
            calomel_hosts_match = " (matched)";
            calomel_conn_score += 100;
      }


         // print out the certificate info
         calomelsslvalidation._calomelPopupContentHost.textContent             = ("\nURL Host        : "+ calomel_url_hostname);
         calomelsslvalidation._calomelPopupContentCommonName.textContent         = ("Common Name (CN): " + calomel_ssl_cert.commonName + calomel_hosts_match);
         calomelsslvalidation._calomelPopupContentOrganization.textContent     = ("\nIssued to  : " + calomel_ssl_cert.organization);
         calomelsslvalidation._calomelPopupContentIssuerOrganization.textContent = ("Issued by  : " + calomel_ssl_cert.issuerOrganization);
         calomelsslvalidation._calomelPopupContentValidBeforeDate.textContent    = ("\n" + "Valid from : " + calomel_date_validity.notBeforeLocalTime);
         calomelsslvalidation._calomelPopupContentValidAfterDate.textContent     = ("Valid until: " + calomel_date_validity.notAfterLocalTime);
         calomelsslvalidation._calomelPopupContentCurrentDate.textContent        = ("\n" + new Date());
      } 

      // type of certificate validation EV or DV, OV seems unused
       if (ui.state & ci.nsIWebProgressListener.STATE_IDENTITY_EV_TOPLEVEL) {
            calomelsslvalidation._calomelPopupContentCertType.textContent = ("Class      : Extended Validation (EV)");
       } else if (ui.state & ci.nsIWebProgressListener.STATE_IS_SECURE) {
            calomelsslvalidation._calomelPopupContentCertType.textContent = ("Class      : Domain Validation (DV)");
       }

       // retrieve the ssl cipher and key length
       if (status instanceof ci.nsISSLStatus) {
          var symetricCipher = status.cipherName;
          var symetricKeyLength = status.secretKeyLength;
       }




       // popup the ssl information if the connection is properly encrypted
       if (symetricCipher && symetricKeyLength ) {
            var calomel_key_strength = null;
            var calomel_cipher_strength = null;

      // get extended certificate information
      var serverCert = status.serverCert;
      if (serverCert instanceof ci.nsIX509Cert) {
        var certificatesAll = cc["@mozilla.org/security/nsASN1Tree;1"].createInstance(ci.nsIASN1Tree);
        certificatesAll.loadASN1Structure(serverCert.ASN1Structure);
        var calomel_SubjectPublicKeyStrength = "";
        var calomel_CertificateSignatureStrength = "";
        var calomel_SubjectPublicKeyAlgorithm = certificatesAll.getDisplayData(4).replace(/PKCS #1/g,'').replace(/Encryption/g,'@');
        var calomel_SubjectsPublicKey = certificatesAll.getDisplayData(12).split(" ")[1].replace(/\(/g,'');
        var calomel_CertificateSignatureAlgrithm = certificatesAll.getDisplayData(certificatesAll.rowCount-2).replace(/PKCS #1/g,'').replace(/Encryption/g,'@');
        var calomel_CertificateSignatureValue = certificatesAll.getDisplayData(certificatesAll.rowCount-1).split(" ");

        var calomel_SubjectsPublicKeyLocationCity = "", calomel_SubjectsPublicKeyLocationState = "", calomel_SubjectsPublicKeyLocationCountry="";
        var calomel_SubjectsPublicKeyLocation = certificatesAll.getDisplayData(9).split("\n");
        for( i=0; i < calomel_SubjectsPublicKeyLocation.length; i++ ) {
           if (calomel_SubjectsPublicKeyLocation[i].substring(0,3) == "L =") {
               calomel_SubjectsPublicKeyLocationCity = calomel_SubjectsPublicKeyLocation[i].replace(/L =/g,'');  
           }
           if (calomel_SubjectsPublicKeyLocation[i].substring(0,4) == "ST =") {
               calomel_SubjectsPublicKeyLocationState = calomel_SubjectsPublicKeyLocation[i].replace(/ST =/g,'');  
           }
           if (calomel_SubjectsPublicKeyLocation[i].substring(0,3) == "C =") {
               calomel_SubjectsPublicKeyLocationCountry = calomel_SubjectsPublicKeyLocation[i].replace(/C =/g,'');  
           }
        }

        var calomel_SubjectsCertificateLocationCity = "", calomel_SubjectsCertificateLocationState = "", calomel_SubjectsCertificateLocationCountry="";
        var calomel_SubjectsCertificateLocation = certificatesAll.getDisplayData(5).split("\n");
        for( var i=0; i < calomel_SubjectsCertificateLocation.length; i++ ) {
           if (calomel_SubjectsCertificateLocation[i].substring(0,3) == "L =") {
               calomel_SubjectsCertificateLocationCity = calomel_SubjectsCertificateLocation[i].replace(/L =/g,'');  
           }
           if (calomel_SubjectsCertificateLocation[i].substring(0,4) == "ST =") {
               calomel_SubjectsCertificateLocationState = calomel_SubjectsCertificateLocation[i].replace(/ST =/g,'');  
           }
           if (calomel_SubjectsCertificateLocation[i].substring(0,3) == "C =") {
               calomel_SubjectsCertificateLocationCountry = calomel_SubjectsCertificateLocation[i].replace(/C =/g,'');  
           }
        }

        // grade the stength of the subject certificates hashes
  
         if  (calomel_SubjectPublicKeyAlgorithm.indexOf("SHA") && calomel_SubjectsPublicKey == "Curve" && ( calomel_SubjectPublicKeyAlgorithm.includes("SHA-256") || calomel_SubjectPublicKeyAlgorithm.includes("SHA-512") ) || calomel_SubjectPublicKeyAlgorithm.includes("1 2 840 10045") || calomel_SubjectPublicKeyAlgorithm.includes("ECDSA") ) {
               calomel_SubjectPublicKeyStrength = " (10/10)";
               calomel_conn_score += 10;
         } else if  (calomel_SubjectPublicKeyAlgorithm.indexOf("SHA") && parseInt(calomel_SubjectsPublicKey) > 2047 && ( calomel_SubjectPublicKeyAlgorithm.includes("SHA-256") || calomel_SubjectPublicKeyAlgorithm.includes("SHA-512") ) ) {
               calomel_SubjectPublicKeyStrength = " (10/10)";
               calomel_conn_score += 10;
         } else if  (calomel_SubjectPublicKeyAlgorithm.indexOf("SHA") && calomel_SubjectsPublicKey == "Curve" && calomel_SubjectPublicKeyAlgorithm.includes("SHA-1") ) {
               calomel_SubjectPublicKeyStrength = " (4/10)";
               calomel_conn_score += 4;
         } else if  (calomel_SubjectPublicKeyAlgorithm.indexOf("SHA") && parseInt(calomel_SubjectsPublicKey) > 2047 && calomel_SubjectPublicKeyAlgorithm.includes("SHA-1") ) {
               calomel_SubjectPublicKeyStrength = " (4/10)";
               calomel_conn_score += 4;
         } else {
             calomel_SubjectPublicKeyStrength = " (0/10)";
         }
  


        // grade the stength of the certificate authorities hashes
         if (calomel_CertificateSignatureAlgrithm.indexOf("SHA") && calomel_CertificateSignatureValue[4] == "Curve" && (calomel_CertificateSignatureAlgrithm.includes("SHA-256") || calomel_CertificateSignatureAlgrithm.includes("SHA-512") ) || calomel_CertificateSignatureAlgrithm.includes("1 2 840 10045") || calomel_CertificateSignatureAlgrithm.includes("ECDSA") ) {
               calomel_CertificateSignatureStrength = " (10/10)";
               calomel_conn_score += 10;
         } else if (calomel_CertificateSignatureAlgrithm.indexOf("SHA") && parseInt(calomel_CertificateSignatureValue[4]) > 2047 && (calomel_CertificateSignatureAlgrithm.includes("SHA-256") || calomel_CertificateSignatureAlgrithm.includes("SHA-512") ) ) {
               calomel_CertificateSignatureStrength = " (10/10)";
               calomel_conn_score += 10;
         } else if (calomel_CertificateSignatureAlgrithm.indexOf("SHA") && calomel_CertificateSignatureValue[4] == "Curve" && calomel_CertificateSignatureAlgrithm.includes("SHA-1") ) {
               calomel_CertificateSignatureStrength = " (4/10)";
               calomel_conn_score += 4;
         } else if (calomel_CertificateSignatureAlgrithm.indexOf("SHA") && parseInt(calomel_CertificateSignatureValue[4]) > 2047 && calomel_CertificateSignatureAlgrithm.includes("SHA-1") ) {
               calomel_CertificateSignatureStrength = " (4/10)";
               calomel_conn_score += 4;
         } else {
             calomel_CertificateSignatureStrength = " (0/10)";
         }



        // print the subject certificate info


        if (calomel_SubjectPublicKeyAlgorithm.includes("1 2 840 10045 4 3 3") || calomel_SubjectPublicKeyAlgorithm.includes("ECDSA Signature with SHA256")) {
            calomelsslvalidation._calomelPopupContentOrganizationSubCert.textContent = ("           :" + " ECDSA Prime 256 bit" + calomel_SubjectPublicKeyStrength);
        } else if (calomel_SubjectPublicKeyAlgorithm.includes("1 2 840 10045 4 3 2") || calomel_SubjectPublicKeyAlgorithm.includes("ECDSA Signature with SHA384")) {
            calomelsslvalidation._calomelPopupContentOrganizationSubCert.textContent = ("           :" + " ECDSA Prime 384 bit" + calomel_SubjectPublicKeyStrength);
        } else if (calomel_SubjectsPublicKey.includes("Curve")) {
            calomelsslvalidation._calomelPopupContentOrganizationSubCert.textContent = ("           :" + " ECDSA Prime 256 bit" + calomel_SubjectPublicKeyStrength);
        } else {
            calomelsslvalidation._calomelPopupContentOrganizationSubCert.textContent = ("           :" + calomel_SubjectPublicKeyAlgorithm + " " + calomel_SubjectsPublicKey + " bit" + calomel_SubjectPublicKeyStrength);
        }

        // print the CA certificate info


       if (calomel_CertificateSignatureAlgrithm.includes("1 2 840 10045 4 3 3") || calomel_CertificateSignatureAlgrithm.includes("ECDSA Signature with SHA256")) {
           calomelsslvalidation._calomelPopupContentOrganizationCaCert.textContent  = ("           :" + " ECDSA Prime 256 bit" + calomel_CertificateSignatureStrength);
        } else if (calomel_CertificateSignatureAlgrithm.includes("1 2 840 10045 4 3 2") || calomel_CertificateSignatureAlgrithm.includes("ECDSA Signature with SHA384")) {
           calomelsslvalidation._calomelPopupContentOrganizationCaCert.textContent  = ("           :" + " ECDSA Prime 384 bit" + calomel_CertificateSignatureStrength);
        } else if (calomel_CertificateSignatureAlgrithm.includes("Curve")) {
           calomelsslvalidation._calomelPopupContentOrganizationCaCert.textContent  = ("           :" + " ECDSA Prime 256 bit" + calomel_CertificateSignatureStrength);
        } else {
           calomelsslvalidation._calomelPopupContentOrganizationCaCert.textContent  = ("           :" + calomel_CertificateSignatureAlgrithm + " " + calomel_CertificateSignatureValue[4] + " bit" + calomel_CertificateSignatureStrength);
        }

        calomelsslvalidation._calomelPopupContentOrganizationLocation.textContent  = ("           :" + calomel_SubjectsPublicKeyLocationCity + calomel_SubjectsPublicKeyLocationState + calomel_SubjectsPublicKeyLocationCountry);
        calomelsslvalidation._calomelPopupContentIssuerLocation.textContent  = ("           :" + calomel_SubjectsCertificateLocationCity + calomel_SubjectsCertificateLocationState + calomel_SubjectsCertificateLocationCountry);

    }

          // setup the default strings for the drop down menu cipher suite values
          calomelsslvalidation._calomelPopupContentCertificate.textContent = ("Certificate: " + calomel_ssl_cert_verification ); 
          calomelsslvalidation._calomelPopupContentCiphersuite.textContent =  ("\nCiphersuite : " + symetricCipher );
          calomelsslvalidation._calomelPopupContentPfs.textContent         =  ("\nPerfect Forward Secrecy [PFS]:  NO  ( 0/20)");
          calomelsslvalidation._calomelPopupContentTlsVersion.textContent =   ("TLS Version : unknown");
          calomelsslvalidation._calomelPopupContentKeyExchange.textContent =  ("Key Exchange: unknown");
          calomelsslvalidation._calomelPopupContentSignature.textContent   =  ("Signature   : unknown");
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : unknown");
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : unknown");
  
          // grade the key exchange
          if ( symetricCipher.includes("TLS_ECDHE_") ) {
          calomelsslvalidation._calomelPopupContentPfs.textContent         =  ("\nPerfect Forward Secrecy [PFS]:  YES  (20/20)");
          calomelsslvalidation._calomelPopupContentKeyExchange.textContent =  ("Key Exchange: ECDHE [PFS]      (20/20)");
          calomel_conn_score += 40;
          } else if ( symetricCipher.includes("TLS_DHE_") ) {
          calomelsslvalidation._calomelPopupContentPfs.textContent         =  ("\nPerfect Forward Secrecy [PFS]:  YES  (20/20)");
          calomelsslvalidation._calomelPopupContentKeyExchange.textContent =  ("Key Exchange: DHE [PFS]        (15/20)");
          calomel_conn_score += 35; 
          } else if ( symetricCipher.includes("TLS_ECDH_") ) {
          calomelsslvalidation._calomelPopupContentKeyExchange.textContent =  ("Key Exchange: ECDH             (10/20)");
          calomel_conn_score += 10; 
          } else if ( symetricCipher.includes("TLS_DH_") ) {
          calomelsslvalidation._calomelPopupContentKeyExchange.textContent =  ("Key Exchange: DH               ( 7/20)");
          calomel_conn_score += 7; 
          } else if ( symetricCipher.includes("TLS_RSA_WITH_") ) {
          calomelsslvalidation._calomelPopupContentKeyExchange.textContent =  ("Key Exchange: RSA/server key   ( 3/20)");
          calomel_conn_score += 3; 
          } else if ( symetricCipher.includes("SSL_RSA_WITH_") ) {
          calomelsslvalidation._calomelPopupContentKeyExchange.textContent =  ("Key Exchange: RSA/server key   ( 1/20)");
          calomel_conn_score += 1; 
          }


          // grade the signature
          if ( symetricCipher.includes("_ECDSA_WITH_") ) {
          calomelsslvalidation._calomelPopupContentSignature.textContent   =  ("Signature   : ECDSA");
       // calomelsslvalidation._calomelPopupContentSignature.textContent   =  ("Signature   : ECDSA            (13/13)");
       // calomel_conn_score += 13;
          } else if ( symetricCipher.includes("_RSA_WITH_") ) {
          calomelsslvalidation._calomelPopupContentSignature.textContent   =  ("Signature   : RSA");
       // calomelsslvalidation._calomelPopupContentSignature.textContent   =  ("Signature   : RSA              (10/13)");
       // calomel_conn_score += 10;
          }
 
          // grade the bulk cipher and bit length
          if ( symetricCipher.includes("_CHACHA20_") ) {
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : ChaCha20 256 bit (15/15)");
          calomel_conn_score += 15;
          } else if ( symetricCipher.includes("_AES_256_") ) {
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : AES 256 bit      (15/15)");
          calomel_conn_score += 15;
          } else if ( symetricCipher.includes("_AES_128_") ) {
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : AES 128 bit      (15/15)");
          calomel_conn_score += 15;
          } else if ( symetricCipher.includes("_RC4_128_") ) {
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : RC4 128 bit      ( 4/15)");
          calomel_conn_score += 4;
          } else if ( symetricCipher.includes("_3DES_") ) {
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : 3DES 168 bit     ( 4/15)");
          calomel_conn_score += 4;
          } else if ( symetricCipher.includes("_CAMELLIA_256_") ) {
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : Camellia 256 bit (15/15)");
          calomel_conn_score += 15;
          } else if ( symetricCipher.includes("_CAMELLIA_128_") ) {
          calomelsslvalidation._calomelPopupContentBulkCipher.textContent  =  ("Bulk Cipher : Camellia 128 bit (15/15)");
          calomel_conn_score += 15;
          }

          // grade the a Message Authentication Code (MAC)
          if ( symetricCipher.includes("_POLY1305_") ) {
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : Poly1305 AEAD    (15/15)");
          calomel_conn_score += 15;
          } else if ( symetricCipher.includes("_GCM_SHA256") ) {
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : SHA-256 AEAD GCM (15/15)");
          calomel_conn_score += 15;
          } else if ( symetricCipher.includes("_GCM_SHA384") ) {
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : SHA-384 AEAD GCM (15/15)");
          calomel_conn_score += 20;
          } else if ( symetricCipher.includes("_SHA384") ) {
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : SHA-384          (10/15)");
          calomel_conn_score += 10;
          } else if ( symetricCipher.includes("_SHA256") ) {
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : SHA-256          (10/15)");
          calomel_conn_score += 10;
          } else if ( symetricCipher.includes("_MD5") ) {
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : MD5              ( 1/15)");
          calomel_conn_score += 1;
          } else if ( symetricCipher.includes("_SHA") ) {
          calomelsslvalidation._calomelPopupContentMAC.textContent         =  ("MAC         : SHA-1            ( 4/15)");
          calomel_conn_score += 4; }

       }
 
       // grade the TLS version, version is an integer, TLSv1.2=3 , TLS1.1=2, TLS1.0=1 and SSL3=0
        if ( version == "3" ) {
           calomelsslvalidation._calomelPopupContentTlsVersion.textContent =   ("TLS Version : TLS v1.2         (10/10)");
           calomel_conn_score += 10;
         } else if ( version == "2" ) {
           calomelsslvalidation._calomelPopupContentTlsVersion.textContent =   ("TLS Version : TLS v1.1         ( 5/10)");
           calomel_conn_score += 5;
         } else if ( version == "1" ) {
           calomelsslvalidation._calomelPopupContentTlsVersion.textContent =   ("TLS Version : TLS v1.0         ( 3/10)");
           calomel_conn_score += 3;
         } else if ( version == "0" ) {
           calomelsslvalidation._calomelPopupContentTlsVersion.textContent =   ("TLS Version : SSL v3           ( 0/10)");
           calomel_conn_score += 0;
         }


        // Is the connection secure? 
       if (calomel_conn_score >= 90 ) {
         calomelsslvalidation._calomelPopupContentSecure.textContent = ("Security   : " + "Strong (green " + calomel_conn_score + "%)");
         document.getElementById("calomelsslvalidation-urlicon").image="chrome://calomelsslvalidation/skin/calomelsslvalidation_green_button.png";
       } else if (calomel_conn_score >= 80 && calomel_conn_score <= 89 ) {
         calomelsslvalidation._calomelPopupContentSecure.textContent = ("Security   : " + "Moderate (blue " + calomel_conn_score + "%)");
         document.getElementById("calomelsslvalidation-urlicon").image="chrome://calomelsslvalidation/skin/calomelsslvalidation_blue_button.png";
       } else if (calomel_conn_score >= 70 && calomel_conn_score <= 79 ) {
         calomelsslvalidation._calomelPopupContentSecure.textContent = ("Security   : " + "Weak (yellow " + calomel_conn_score + "%)");
         document.getElementById("calomelsslvalidation-urlicon").image="chrome://calomelsslvalidation/skin/calomelsslvalidation_yellow_button.png";
       } else if (calomel_conn_score <= 69 ) {
         calomelsslvalidation._calomelPopupContentSecure.textContent = ("Security   : " + "Insecure (red " + calomel_conn_score + "%)");
         document.getElementById("calomelsslvalidation-urlicon").image="chrome://calomelsslvalidation/skin/calomelsslvalidation_red_button.png";
       }

       // if the ssl connection is just plain broke
       if (ui.state & ci.nsIWebProgressListener.STATE_IS_INSECURE || ui.state & ci.nsIWebProgressListener.STATE_IS_BROKEN) {
         calomel_conn_score = 0;
         calomelsslvalidation._calomelPopupContentSecure.textContent = ("Security   : " + "BROKEN, UNTRUSTED (red " + calomel_conn_score + "%)");
         document.getElementById("calomelsslvalidation-urlicon").image="chrome://calomelsslvalidation/skin/calomelsslvalidation_redbroke_button.png";
       }

     }

     // http clear connections
     if (calomel_url_protocol == "http:") {
       var calomel_url_hostname = window.content.location.hostname;
       calomelsslvalidation._calomelPopupContentHost.textContent   = ("URL Host   : " + calomel_url_hostname);
       calomelsslvalidation._calomelPopupContentSecure.textContent = ("Security   : " + "Unsafe - Unsecured");
       calomelsslvalidation._calomelPopupContentCurrentDate.textContent        = (new Date());
       document.getElementById("calomelsslvalidation-urlicon").image="chrome://calomelsslvalidation/skin/calomelsslvalidation_grey_button.png";
      }

   },

};
