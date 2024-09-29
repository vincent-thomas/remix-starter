variable "cloudflare_zone_id" {
  type = string
}

variable "cloudflare_account_id" {
  type = string
}

# resource "cloudflare_record" "fly-io-a-record" {
#  zone_id = var.cloudflare_zone_id
#  name    = "remix-starter"
#  content   = "66.241.124.51" # Flys ip address
#  type    = "A"
#  proxied = true
# }
# 
# 
# resource "cloudflare_record" "fly-io-aaaa-record" {
#  zone_id = var.cloudflare_zone_id
#  name    = "remix-starter"
#  content   = fly_ip.starter_app_ip6.address
#  type    = "AAAA"
#  proxied = true
# }
# 
# 
# resource "cloudflare_record" "acme-challenge-record" {
#  zone_id = var.cloudflare_zone_id
#  name    = "_acme-challenge.remix-starter"
#  content   = fly_cert.starter_app_cert.dnsvalidationtarget
#  type    = "CNAME"
# }
