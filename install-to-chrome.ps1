# PowerShell helper script to install / load Movie Buff's Rabbit Hole in Chrome
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "    Movie Buff's Rabbit Hole - Chrome Extension Install    " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$distPath = (Resolve-Path "$PSScriptRoot\dist").Path
Write-Host "Unpacked Extension Path: $distPath" -ForegroundColor Green

Write-Host "`nTo install in your current Chrome:" -ForegroundColor White
Write-Host "1. Open Chrome and go to: chrome://extensions" -ForegroundColor Yellow
Write-Host "2. Turn ON 'Developer mode' (top-right toggle)" -ForegroundColor Yellow
Write-Host "3. Click 'Load unpacked' (top-left button)" -ForegroundColor Yellow
Write-Host "4. Select the directory: $distPath" -ForegroundColor Cyan
Write-Host "`nExtension is ready for watching on YouTube, Netflix, or searching any movie!" -ForegroundColor Green

# Optional: Launch Chrome directly with the extension loaded
$launch = Read-Host "`nWould you like to launch Chrome now with the extension preloaded? (Y/N)"
if ($launch -match '^[Yy]') {
    $chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
    if (Test-Path $chromePath) {
        Start-Process $chromePath -ArgumentList "--load-extension=`"$distPath`"", "https://www.youtube.com"
        Write-Host "Launched Chrome with Movie Buff's Rabbit Hole loaded!" -ForegroundColor Green
    } else {
        Write-Warning "Chrome executable not found at default path."
    }
}
