# Produktbilder – Pizzeria am Medienhafen

73 Gerichte aus `Speisekarte_neu_iOS.html`, einschließlich Pizza Pute, Penne Pute, Familienpizza und Pizzabrötchen. Getränke sind keine Gerichte und nicht Bestandteil dieser Serie.

- `index.html`: lokale Übersicht mit Suche und Downloadlinks.
- `512/`: kleine quadratische JPG-Dateien, jeweils 512 × 512 Pixel.
- `originale/`: größere generierte PNG-Originale.
- `prompts.json`: vollständige Bildanweisungen und verwendete Referenzen für jedes Gericht.
- `gerichte.json`: Zuordnung der Kartennummern zu Dateinamen und Erstellungsstatus.
- `pruefung.json`: Ergebnis der Prüfung auf Vollständigkeit, Bildabmessungen und identische Dateien.
- `uebersicht-*.jpg`: Kontaktabzüge zur Sichtprüfung.

Erzeugung: integriertes Bildwerkzeug, Skill imagegen. Die Original-Assets und die Speisekarten werden nicht überschrieben. Die Bilder sind KI-generierte Produktdarstellungen und keine Aufnahmen tatsächlich servierter Teller.

Bildsprache: dunkle Keramik, gesprenkelter Granit aus den Restaurantfotos, weiches Tageslicht, gewöhnliche Restaurantportionen, natürliche Schnittformen und Backspuren. Die Zutaten folgen der neueren Speisekarte. Das Foto mit dem Dateinamen „spaghetti-basilikum“ dient nur als Referenz für Pasta, Teller und Arbeitsfläche; seine Zutaten werden nicht pauschal auf andere Gerichte übertragen.

Darstellungsannahmen bei offenen Varianten: Pizza Pute und Penne Pute mit Zucchini und roter Paprika; Penne Ortolana mit Zucchini, Paprika und Aubergine; Familienpizza ohne Zusatzbelag; vier Käsesorten als typische Mischung einschließlich eines kleinen Blauschimmelkäseanteils. Anzahl der Pizzabrötchen und Bruschettascheiben ist eine Bildannahme, keine bestätigte Portionsangabe. Bei Salmone und Boscaiola sind in der neueren Karte genaue Zutaten vorhanden; diese werden verwendet.

Die Skripte `save-image.ps1` und `build-gallery.ps1` sichern Originale, erzeugen die kleinen JPGs und bauen die Übersicht. Sie generieren selbst keine Bilder.
