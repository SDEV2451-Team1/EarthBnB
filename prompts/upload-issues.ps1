<#
.SYNOPSIS
    Uploads issues from local issues.json to a GitHub repository via the REST API using native PowerShell.
    #>

    # 1. Prompt for authentication and repository details securely
    $tokenInput = Read-Host -Prompt "Enter your GitHub Personal Access Token (PAT)" -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($tokenInput)
    $plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
    
    $repo = Read-Host -Prompt "Enter GitHub Repository (e.g., owner/repo-name)"
    $uri = "https://api.github.com/repos/$repo/issues"
    
    $headers = @{
        "Authorization"        = "Bearer $plainToken"
            "Accept"               = "application/vnd.github+json"
                "X-GitHub-Api-Version" = "2022-11-28"
                }
    
                # 2. Verify that issues.json exists
                if (-not (Test-Path "issues.json")) {
                    Write-Error "issues.json not found in the current directory!"
                        exit
                        }
    
                        # 3. Read and parse the JSON file natively using ConvertFrom-Json
                        Write-Host "Reading issues.json..." -ForegroundColor Cyan
                        $issues = Get-Content -Path "issues.json" -Raw | ConvertFrom-Json
    
                        Write-Host "Found $($issues.Count) issues to upload to $repo. Starting upload..." -ForegroundColor Cyan
    
                        # 4. Loop through and post each issue
                        $successCount = 0
                        $failCount = 0
    
                        foreach ($issue in $issues) {
                            $payload = @{
                                    title  = $issue.title
                                            body   = $issue.body
                                                    labels = $issue.labels
                                                        } | ConvertTo-Json -Compress
    
                                                            try {
                                                                    $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $payload -ContentType "application/json"
                                                                            Write-Host "[SUCCESS] Created: $($issue.title)" -ForegroundColor Green
                                                                                    $successCount++
                                                                                        }
                                                                                            catch {
                                                                                                    Write-Host "[FAILED] Could not create: $($issue.title). Error: $_" -ForegroundColor Red
                                                                                                            $failCount++
                                                                                                                }
    
                                                                                                                    # Brief delay to respect GitHub secondary rate limits
                                                                                                                        Start-Sleep -Milliseconds 400
                                                                                                                        }
    
                                                                                                                        Write-Host "`n--- Upload Summary ---" -ForegroundColor Cyan
                                                                                                                        Write-Host "Successfully created: $successCount" -ForegroundColor Green
                                                                                                                        Write-Host "Failed: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
