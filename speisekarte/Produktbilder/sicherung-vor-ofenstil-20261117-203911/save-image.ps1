param([Parameter(Mandatory=$true)][string]$Source, [Parameter(Mandatory=$true)][string]$Filename)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$originals = Join-Path $PSScriptRoot 'originale'
$small = Join-Path $PSScriptRoot '512'
New-Item -ItemType Directory -Path $originals,$small -Force | Out-Null
$stem = [System.IO.Path]::GetFileNameWithoutExtension($Filename)
$copy = Join-Path $originals ($stem + '.png')
Copy-Item -LiteralPath $Source -Destination $copy
$img = [System.Drawing.Image]::FromFile($copy)
$bmp = New-Object System.Drawing.Bitmap 512,512
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::White)
$scale = [Math]::Min(512.0/$img.Width,512.0/$img.Height)
$w = [int]($img.Width*$scale); $h = [int]($img.Height*$scale)
$g.DrawImage($img,[int]((512-$w)/2),[int]((512-$h)/2),$w,$h)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
$parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality),([long]88)
$dest = Join-Path $small $Filename
$bmp.Save($dest,$codec,$parameters)
$g.Dispose(); $bmp.Dispose(); $img.Dispose(); $parameters.Dispose()
Write-Output $dest
