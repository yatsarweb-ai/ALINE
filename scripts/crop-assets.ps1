Add-Type -AssemblyName System.Drawing
$root = 'C:\Users\Usuario\Desktop\ALINEE'
$out = Join-Path $root 'public\images'
New-Item -ItemType Directory -Force $out | Out-Null
function Crop($source, $name, $x, $y, $w, $h) {
  $img = [System.Drawing.Image]::FromFile($source)
  $bitmap = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$w,$h)), (New-Object System.Drawing.Rectangle($x,$y,$w,$h)), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $img.Dispose()
  $bitmap.Save((Join-Path $out "$name.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bitmap.Dispose()
}
$downloads = 'C:\Users\Usuario\Downloads'
$catalog = Join-Path $root 'source-renders'
Crop (Join-Path $catalog 'page-2.jpg') 'gift-four' 0 0 490 460
Crop (Join-Path $catalog 'page-2.jpg') 'gift-heart' 0 471 490 455
Crop (Join-Path $catalog 'page-2.jpg') 'gift-single' 0 940 490 467
Crop (Join-Path $catalog 'page-3.jpg') 'gift-boxes' 0 0 490 460
Crop (Join-Path $catalog 'page-3.jpg') 'chocolate-tablets' 0 471 490 460
Crop (Join-Path $catalog 'page-3.jpg') 'strawberry-heart' 0 942 490 465
Crop (Join-Path $catalog 'page-4.jpg') 'gift-roses' 0 0 490 460
Crop (Join-Path $catalog 'page-4.jpg') 'strawberry-boxes' 0 471 490 460
Crop (Join-Path $catalog 'page-4.jpg') 'gift-share' 0 942 490 465
Crop (Join-Path $catalog 'page-5.jpg') 'gift-details' 0 0 490 460
Crop (Join-Path $catalog 'page-5.jpg') 'gift-pyramid' 0 471 490 460
Crop (Join-Path $catalog 'page-5.jpg') 'cake-floral' 0 942 490 465
Crop (Join-Path $catalog 'page-6.jpg') 'dubai-chocolate' 0 448 486 510
$shots = Get-ChildItem $downloads -Filter 'Imagen de ChatGPT 11 nov 2026, 04*.jpg' | Sort-Object Name
Crop $shots[0].FullName 'macarons-event' 0 107 709 1260
Crop $shots[1].FullName 'bowling-chocolates' 0 107 709 1260
Crop $shots[2].FullName 'minnie-brigadeiros' 0 107 709 1260
Crop $shots[3].FullName 'citrus-brigadeiros' 0 107 709 1260
$logo = Join-Path $downloads 'Imagen de ChatGPT 11 nov 2026, 03_29_03 p.m.png'
Crop $logo 'aline-logo' 130 252 920 650
$brigadeiroCatalog = Join-Path $downloads 'Imagen de ChatGPT 11 nov 2026, 11_43_12 p.m.jpg'
$names = @('brigadeiro-tradicional','brigadeiro-crispy','brigadeiro-dark','brigadeiro-blanco','brigadeiro-milk','brigadeiro-caramel','brigadeiro-galak')
$ys = @(565,646,728,810,891,973,1054)
for ($i=0; $i -lt $names.Length; $i++) { Crop $brigadeiroCatalog $names[$i] 56 $ys[$i] 78 78 }
