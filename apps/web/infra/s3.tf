resource "aws_s3_bucket" "main-bucket" {
  force_destroy = true
}
output "main_bucket" {
  value = aws_s3_bucket.main-bucket.bucket
}

resource "aws_s3_bucket" "b" {
  force_destroy = true
}

resource "aws_s3_bucket_acl" "b_acl" {
  bucket = aws_s3_bucket.b.id
   acl    = "public-read"
#    depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]
}

locals {
  s3_origin_id = "myS3Origin"
}

#resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
#  bucket = aws_s3_bucket.b.id
#  rule {
#    object_ownership = "ObjectWriter"
#  }
#}


