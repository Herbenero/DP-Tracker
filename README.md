# Hellcastle Defensive Points Logger

Webapp + Google Sheets backend to track defensive points by player, month, and day.

## Setup

1. Create a Google Sheet with one tab per month:
   - Tab names: `January`, `February`, etc.
   - Row 1: `Player` in A1, then `1`, `2`, `3`, … `31` across columns B:AF.
   - Rows 2+ in column A: player names (or leave empty; rows will be added automatically).

2. Open **Extensions → Apps Script** on that Sheet.

3. Create two files in Apps Script:
   - `Code.gs`
   - `index.html`

4. Paste the contents from this repo into the matching files.

5. In Apps Script, go to **Deploy → Test deployments → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone with the link** (or your choice)
   - Copy the Web App URL.

6. Open the Web App URL in a browser and start logging defensive points.
