# This script fixes the images for the Ingrain System React project
# It copies the AI-generated assets into the public/images folder

$artifactDir = "C:\Users\kpras\.gemini\antigravity\brain\7638729a-6807-4da5-8172-0ca4d6c0c7a3"
$targetDir = ".\public\images"

if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force
}

Get-ChildItem -Path $artifactDir -Filter *.png | Copy-Item -Destination $targetDir -Force

Write-Host "✅ Images successfully copied to $targetDir" -ForegroundColor Green
Write-Host "Please refresh your browser to see the updates!" -ForegroundColor Cyan
