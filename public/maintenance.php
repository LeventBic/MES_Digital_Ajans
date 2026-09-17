<?php
// Bakım modu yanıtı. .htaccess, .maintenance bayrağı varken her isteği buraya
// yönlendirir (dahili rewrite, adres değişmez). LiteSpeed rewrite kaynaklı
// 503'lerde ErrorDocument'ı yok saydığı için gerçek 503 + özel gövde bu
// dosyayla veriliyor. Gövde: maintenance.html (tek kaynak, burayı düzenleme).
http_response_code(503);
header('Retry-After: 3600');
header('Cache-Control: no-store, no-cache, max-age=0');
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/maintenance.html');
