variable "tags" {
  type = map(string)
  description = "AWS resources tags"
  default = {}
}

variable "slack_hook" {
  type = string
  description = "Slack hook (https://hooks.slack.com/services/AAAAAAAAA/AAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAA)"
  default = ""

  validation {
    condition     = var.slack_hook == "" || can(regex("^http(s)?://[a-z.]+(:[0-9]+)?(/[a-zA-Z0-9]+)+", var.slack_hook))
    error_message = "Slack hook must be a valid URL."
  }
}

variable "kms_encrypted_slack_hook" {
  type = string
  description = "KMS-encrypted Slack hook."
  default = ""
}

variable "region" {
  type = string
  description = "AWS region where Ninshubur will be deployed to"

  validation {
    condition     = var.region == "eu-west-1"
    error_message = "Only eu-west-1 region is supported at the moment."
  }
}

variable "name" {
  default = ""
  type = string
  description = "Slack username to use in notifications"
}

variable "avatar_url" {
  type = string
  default = ""
  description = "Avatar URL to use in notifications"

  validation {
    condition     = var.avatar_url == "" || can(regex("^http(s)?://[a-z.]+(:[0-9]+)?(/[a-zA-Z0-9]+)*", var.avatar_url))
    error_message = "Avatar URL must be a valid URL."
  }
}