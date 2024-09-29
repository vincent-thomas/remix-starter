terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    neon = {
      source = "terraform-community-providers/neon"
      version = "~> 0.1"
    }
    upstash = {
      source = "upstash/upstash"
      version = "~> 1.5"
    }
    fly = {
      source = "fly-apps/fly"
      version = "0.0.23"
    }

#    aws = {
#      source  = "hashicorp/aws"
#      version = "~> 5.0"
#    }
  }
}

# provider "aws" {
#  region = "eu-central-1"
# }

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "neon" {
  token = var.neon_token
}

provider "upstash" {
  api_key = var.upstash_api_key
  email = var.upstash_email
}

provider "fly" {
  fly_api_token = var.fly_api_token
}

variable "cloudflare_api_token" {
  type = string
  sensitive = true
}

variable "upstash_api_key" {
  type = string
  sensitive = true
}

variable "upstash_email" {
  type = string
}

variable "neon_token" {
  type = string
  sensitive = true
}

variable "fly_api_token" {
  type = string
  sensitive = true
}
