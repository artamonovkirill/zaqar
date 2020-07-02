terraform {
  experiments = [
    variable_validation
  ]
}

locals {
  name = "ninshubur"
  filename = "${local.name}.zip"
  log_group = "/aws/lambda/${local.name}"
}

resource "aws_iam_role" "_" {
  name = local.name
  tags = var.tags

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_cloudwatch_log_group" "_" {
  name = local.log_group
  tags = var.tags
}

resource "aws_iam_role_policy" "_" {
  role = aws_iam_role._.id
  name = "CloudWatch"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:${var.region}:*:log-group:${local.log_group}:*"
      ],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_lambda_function" "_" {
  function_name = local.name
  description = "Slack notifications with a twist"
  handler = "index.handler"

  s3_bucket = "ninshubur-${var.region}"
  s3_key = "lambda.zip"
  s3_object_version = var.s3_object_versions[var.region]

  role = aws_iam_role._.arn

  runtime = "nodejs12.x"

  environment {
    variables = {
      SLACK_HOOK = var.slack_hook
      KMS_ENCRYPTED_SLACK_HOOK = var.kms_encrypted_slack_hook
      NAME = var.name
      AVATAR_URL = var.avatar_url
      AWS_REGION = var.region
      AWS_KMS_ENDPOINT = var.aws_kms_endpoint
    }
  }

  tags = var.tags
}

variable "s3_object_versions" {
  type = map(string)
  description = "This variable is for tests only, it should not be set to anything but default"
  default = {
    eu-west-1: "srIypFDvF_clxSGSCi9Q87xYRYRdd9eC"
  }
}

variable "aws_kms_endpoint" {
  type = string
  description = "This variable is for tests only, it should not be set to anything but default"
  default = ""
}