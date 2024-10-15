$version = "2.9"
$sourceFolder = "."
$releaseFolder = "releases"
$zipFile = "$releaseFolder/hide-youtube-statistics-$version.zip"

if (-not (Test-Path $releaseFolder)) {
    New-Item -ItemType Directory -Path $releaseFolder | Out-Null
}

$filesToInclude = @(
"images/",
"content.css",
"contentScript.js",
"manifest.json",
"popup.html",
"popup.css",
"popup.js"
)

Compress-Archive -Force -Path ($filesToInclude | ForEach-Object {Join-Path -Path $sourceFolder -ChildPath $_}) -DestinationPath $zipFile
