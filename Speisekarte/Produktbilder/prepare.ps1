$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$html = Get-Content -LiteralPath (Join-Path $root '../Speisekarte_neu_iOS.html') -Raw -Encoding utf8
$category = ''
$items = @()
foreach ($m in [regex]::Matches($html, '(?s)<h2 class="section-title">(.*?)</h2>|<article class="menu-item" data-number="([^"]+)">(.*?)</article>')) {
  if ($m.Groups[1].Success) { $category = [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value); continue }
  $nr = $m.Groups[2].Value
  if ([int]($nr -replace '\D','') -gt 72) { continue }
  $body = $m.Groups[3].Value
  $name = [System.Net.WebUtility]::HtmlDecode([regex]::Match($body, '(?s)class="item-title"><span class="number">.*?</span>\s*(.*?)</span>').Groups[1].Value).Trim()
  $description = [System.Net.WebUtility]::HtmlDecode([regex]::Match($body, '(?s)class="description">(.*?)</div>').Groups[1].Value).Trim()
  $slug = $name.ToLowerInvariant().Replace('ä','ae').Replace('ö','oe').Replace('ü','ue').Replace('ß','ss') -replace '[^a-z0-9]+','-'
  $slug = $slug.Trim('-')
  $prefix = if ($nr -match '^\d$') { '0' + $nr } else { $nr }
  $items += [pscustomobject]@{number=$nr;category=($category -replace ' \(.*','');name=$name;description=$description;file="$prefix-$slug.jpg";status='pending'}
}
$items | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $root 'gerichte.json') -Encoding utf8
Write-Output ($items | ConvertTo-Json -Compress)
