# Mac mini ↔ telefoon koppelen (Claude Code Remote Control)

Doel: Claude Code draait op de **Mac mini** (alle code + project staan daar),
en je bestuurt het vanaf je **telefoon-app**. Zit je achter de Mac zelf? Dan
werk je gewoon in dezelfde sessie.

> Eén keer Terminal nodig. Daarna alles via de app.

---

## 1. Op de Mac mini — eenmalig instellen

Open **Terminal** (Cmd + Spatie → typ `Terminal` → Enter).

**a. Claude Code installeren** (alleen de allereerste keer):

```
curl -fsSL https://claude.ai/install.sh | bash
```

**b. Project ophalen** (alleen als het er nog niet staat):

```
cd ~/Desktop
git clone https://github.com/bvde26/werkenbij-kaap-noord.git
cd werkenbij-kaap-noord
```

Staat het project er al? Dan alleen:

```
cd ~/Desktop/werkenbij-kaap-noord
```

---

## 2. Verbinding starten

In dezelfde Terminal:

```
claude remote-control --name "Kaap Noord"
```

Er verschijnt een **QR-code** + een link. Laat dit Terminal-venster openstaan.

---

## 3. Op de telefoon

1. Download de **Claude-app** (App Store) en log in met **hetzelfde account**.
2. Open het tabblad **Code**.
3. **Scan de QR-code** uit Terminal (of plak de link).

Klaar. Telefoon en Mac tonen nu dezelfde live sessie.

---

## Belangrijk

- **Mac mini moet aan blijven** + internet hebben. Slaapt hij of valt internet
  >10 min weg → sessie stopt. Opnieuw `claude remote-control` draaien.
  - Zet sluimerstand uit: Systeeminstellingen → Energiebesparing.
- **Chats syncen niet automatisch** tussen apparaten. De koppeling werkt alleen
  zolang Remote Control draait.
- Dit is **anders** dan Claude Code op het web (claude.ai/code): dat draait in
  de cloud op de GitHub-repo, niet op jouw Mac. Remote Control = jouw Mac,
  jouw bestanden.
- Vereist Pro / Max / Team / Enterprise (Remote Control = research preview).

---

## Spiekbriefje (de 3 regels die je echt nodig hebt)

```
cd ~/Desktop/werkenbij-kaap-noord
claude remote-control --name "Kaap Noord"
# → QR-code scannen met telefoon-app, tabblad Code
```
