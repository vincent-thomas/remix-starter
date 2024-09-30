# resource "fly_app" "starter_app" {
#  name = "remix-starter"
# }
# 
# resource "fly_ip" "starter_app_ip6" {
#  app = fly_app.starter_app.name
#  type = "v6"
# }
# 
# resource "fly_cert" "starter_app_cert" {
#  app = fly_app.starter_app.name
#  hostname = "remix-starter.v-thomas.com"
# }
