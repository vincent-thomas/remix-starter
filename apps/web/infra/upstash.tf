resource "upstash_redis_database" "redisdb" {
  database_name = "remix_starter"
  region = "eu-central-1"
  tls = true
  eviction = true
}


output "redis_url" {
  value = "rediss://default:${upstash_redis_database.redisdb.password}@${upstash_redis_database.redisdb.endpoint}:${upstash_redis_database.redisdb.port}"
  sensitive = true
}
