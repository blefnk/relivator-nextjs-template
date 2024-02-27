# EOL from CRLF to LF recursively: this script will convert all files in the current directory and all subdirectories to unix line endings
# © https://gist.github.com/gsusI/b4a01901e33b8b09921fdbd976a613ec

# Set the parameters
$path = Get-Location
$numbOfThreads = 50
$exclude_patterns = "^.*(\.git|\.idea|node_modules|\.next|\.(jpeg|jpg|png|gif|mp4|mkv|mp3|wav)$).*$"

# Find filles to convert
$files = Get-ChildItem -Path $path -Recurse -Include * -File -Force | Where-Object {$_.FullName -notmatch $exclude_patterns}
Write-Host "Found $($files.Count) files"

$files | ForEach-Object -Parallel {
    if ((Get-Content $_.FullName -Raw) -match "\r") {
        Write-Host "Converting $($_.FullName)"
        dos2unix $_.FullName
    }
} -ThrottleLimit $numbOfThreads
