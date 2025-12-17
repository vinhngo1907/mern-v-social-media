<!-- # Caution: the following line "- job_name" begins with 2 spaces!
  - job_name: "stackhero"
    scheme: "https"
    basic_auth:
      username: "org-i57vcd"
      password: "618642b9f6fd44df7d87ac2b3ee49bad"
    tls_config:
      insecure_skip_verify: true
    http_sd_configs:
    - url: "https://api.stackhero.io/v1/prometheus/targets"
      refresh_interval: "15s" # Do not set it to less than 15 seconds!
      basic_auth:
        username: "org-i57vcd"
        password: "618642b9f6fd44df7d87ac2b3ee49bad" -->