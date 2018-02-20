// THIS FILE IS GOING TO BE OVERWRITTEN ON BUILD SERVER
// BA Admin Port
var port = 8081

// useful to test from real mobile device while running dev server
var apiRoot = window.location.protocol + '//'+window.location.hostname + ':' + port

if (process.env.API_ROOT) {
  apiRoot = process.env.API_ROOT
}

var config = {
  url: apiRoot
}

config.login_as_company_staff = config.url + '/login_as_company_staff/'
config.get_carrier_user = config.url + '/get_carrier_user/'

config.get_carrier_settings = config.url + '/get_carrier_settings/'
config.set_carrier_setting = config.url + '/set_carrier_setting/'

config.get_carrier_content = config.url + '/get_carrier_content/'
config.set_carrier_content = config.url + '/set_carrier_content/'

config.get_carrier_templates = config.url + '/get_carrier_templates/'
config.set_carrier_template = config.url + '/set_carrier_template/'

config.list_builds_per_company = config.url + '/builds/'
config.builds_details = config.url + '/build/'
config.build_mobile_app = config.url + '/build-mobile-app/'

config.android_promotes = config.url + '/promoted/android/'

export default config
