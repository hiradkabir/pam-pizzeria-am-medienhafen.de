$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$items = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'prompts.json') -Raw -Encoding utf8 | ConvertFrom-Json
$cards = @()
$missing = @()
$hashes = @()
foreach ($item in $items) {
  $path = Join-Path $PSScriptRoot ('512/' + $item.file)
  $present = Test-Path -LiteralPath $path
  $item.status = if ($present) { 'generated' } else { 'pending' }
  if (-not $present) { $missing += $item.number; continue }
  $im = [System.Drawing.Image]::FromFile($path)
  if ($im.Width -ne 512 -or $im.Height -ne 512) { throw "Wrong image dimensions: $path" }
  $im.Dispose()
  $hashes += (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
  $name = [System.Net.WebUtility]::HtmlEncode($item.name)
  $cat = [System.Net.WebUtility]::HtmlEncode($item.category)
  $desc = [System.Net.WebUtility]::HtmlEncode(($item.description -replace '\([\d,]+\)\s*',''))
  $stem = [System.IO.Path]::GetFileNameWithoutExtension($item.file)
  $cards += "<article data-search='$cat $name $desc'><a href='512/$($item.file)'><img src='512/$($item.file)' width='512' height='512' loading='lazy' alt='$name'></a><div class='info'><small>$cat · Nr. $($item.number)</small><h2>$name</h2><p>$desc</p><a href='512/$($item.file)' download>JPG · 512 px</a> <a href='originale/$stem.png' download>Original PNG</a></div></article>"
}
$items | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'gerichte.json') -Encoding utf8
$page = @"
<!doctype html><html lang='de'><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Produktbilder · Pizzeria am Medienhafen</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f1e9;color:#242922;font:16px/1.5 system-ui,sans-serif}header{padding:48px 5vw 24px;max-width:1200px}h1{font:600 clamp(28px,5vw,52px)/1.1 Georgia,serif;margin:12px 0}header p{max-width:760px;color:#586050}input{padding:14px 18px;font:inherit;border:1px solid #c2c5ba;border-radius:6px;width:min(100%,600px);background:#fff}main{padding:20px 5vw 64px;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:24px}article{background:#fff;overflow:hidden;border-radius:8px}article img{width:100%;height:auto;display:block}.info{padding:18px}small{color:#69715e}h2{font-size:19px;margin:8px 0}p{font-size:14px}a{color:#345834}.info a{display:inline-block;font-size:13px;margin:8px 12px 0 0}article[hidden]{display:none}</style>
<header><small>PIZZERIA AM MEDIENHAFEN</small><h1>Die Gerichte im Bild.</h1><p>$($cards.Count) Produktbilder · 512 × 512 Pixel. KI-generierte Bildentwürfe auf Basis der Restaurant-Assets und der neueren Speisekarte. Größere Originale sind jeweils verlinkt.</p><input type='search' aria-label='Gerichte suchen' placeholder='Nach Gericht, Kategorie oder Zutat suchen …'></header><main>$($cards -join "`n")</main><script>document.querySelector('input').addEventListener('input',e=>{const q=e.target.value.toLocaleLowerCase('de');document.querySelectorAll('article').forEach(a=>a.hidden=!a.dataset.search.toLocaleLowerCase('de').includes(q));});</script></html>
"@
$page | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'index.html') -Encoding utf8
$ready = @($items | Where-Object status -eq 'generated')
for ($start=0; $start -lt $ready.Count; $start+=20) {
  $batch = @($ready | Select-Object -Skip $start -First 20)
  $rows = [int][Math]::Ceiling($batch.Count / 5.0)
  $sheet = New-Object System.Drawing.Bitmap 1200,($rows*275)
  $g = [System.Drawing.Graphics]::FromImage($sheet)
  $g.Clear([System.Drawing.Color]::White)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $font = New-Object System.Drawing.Font 'Arial',10
  for ($i=0; $i -lt $batch.Count; $i++) {
    $item=$batch[$i]; $x=($i%5)*240; $y=[int][Math]::Floor($i/5)*275
    $im=[System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot ('512/'+$item.file)))
    $g.DrawImage($im,$x,$y,240,240); $im.Dispose()
    $rect = New-Object System.Drawing.RectangleF ($x+5),($y+243),230,32
    $g.DrawString(($item.number+'. '+$item.name),$font,[System.Drawing.Brushes]::Black,$rect)
  }
  $sheet.Save((Join-Path $PSScriptRoot ('uebersicht-'+(1+[int]($start/20))+'.jpg')),[System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose();$font.Dispose();$sheet.Dispose()
}
[pscustomobject]@{expected=$items.Count;generated=$cards.Count;missing=$missing;uniqueHashes=@($hashes|Select-Object -Unique).Count} | ConvertTo-Json | Tee-Object -FilePath (Join-Path $PSScriptRoot 'pruefung.json')
