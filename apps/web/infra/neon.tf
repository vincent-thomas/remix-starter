resource "neon_project" "remix_starter_project" {
  name = "remix-starter"
  region_id = "aws-eu-central-1"
  pg_version = 16
}

resource "neon_role" "vt_role" {
  name       = "main-role"
  branch_id  = neon_project.remix_starter_project.branch.id
  project_id = neon_project.remix_starter_project.id
}

resource "neon_database" "main-db" {
  name       = "main-db"
  owner_name = neon_role.vt_role.name
  branch_id  = neon_project.remix_starter_project.branch.id
  project_id = neon_project.remix_starter_project.id
}

output "database_url" {
  value = "postgresql://${neon_role.vt_role.name}:${neon_role.vt_role.password}@${neon_project.remix_starter_project.branch.endpoint.host}/${neon_database.main-db.name}"
  sensitive = true
}

