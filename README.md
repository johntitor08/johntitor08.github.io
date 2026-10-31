# johntitor08.github.io

Kişisel sitem: oyunlarım, asset paketlerim ve GitHub projelerim → https://johntitor08.github.io

- `index.html` — sayfa
- `style/site.css` — tasarım (koyu tema, telefona uyumlu)
- `js/app.js` — oyun ve asset listesi (`GAMES`, `ASSETS`), GitHub projeleri (GitHub API'den canlı; olmazsa `data/projects.json`), filtre/arama, iletişim formu
- `images/games/` — oyun kapakları

Yeni oyun eklemek için `js/app.js`'deki `GAMES` listesine bir satır ekle, kapağını `images/games/`'e koy.
Değişiklikten sonra `index.html`'deki `?v=` numarasını artır ki ziyaretçiler eski dosyayı görmesin.
