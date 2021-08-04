terraform {
  required_version = ">= 1.0"

  required_providers {
    tsuru = {
      source  = "tsuru-terraform-registry.backstage.globoi.com/devops/tfprovider-tsuru"
      version = ">= 1.2, < 2"
    }
  }
}