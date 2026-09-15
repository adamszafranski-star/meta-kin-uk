# META x KIN — UK landing page

One-pager for **P2 · Active Prevention & Discovery**, 5 days, **120,000 THB**, room **not** included.
Static HTML. No build step, no dependencies.

```
index.html        the landing page (the comparison + the story)
enquire.html      the lead-collection page — the form lives here now
style.css         shared stylesheet for both pages
apps-script.gs    Google Sheet backend
assets/           logos + real KIN photography
```

**`ENDPOINT` now lives in `enquire.html`, not `index.html`.** One line, near the bottom.

**Drop-in slot:** save a generated UK-hospital-corridor image as **`assets/uk-corridor.jpg`**
and it appears automatically behind the left panel of the hero comparison. Until then the
panel shows a designed waiting-list notice, which works on its own. Prompt for generating it
is in the chat log — do **not** use a photograph of a real, identifiable NHS building.

---

## 1. Connect the Google Sheet (10 minutes)

1. Create a Google Sheet. Name it anything.
2. **Extensions ▸ Apps Script.** Delete the placeholder, paste all of `apps-script.gs`, save.
3. *(Optional)* put your email in the `NOTIFY` line to get an alert per lead.
4. **Deploy ▸ New deployment ▸ Web app.**
   - Execute as: **Me**
   - Who has access: **Anyone**  ← must be "Anyone", not "Anyone with Google account"
5. Approve the permission prompt. Copy the `…/exec` URL.
6. In `index.html`, find this line near the bottom and paste it in:

   ```js
   var ENDPOINT = "";
   ```

The `Leads` tab and its headers are created automatically on the first submission.

> Until `ENDPOINT` is filled in the form still works — it validates, shows the thank-you,
> and logs the lead to the browser console. Nothing is saved. Fill it in before you send traffic.

**If you redeploy the script later**, use *Manage deployments ▸ edit ▸ New version*, which keeps
the same URL. A brand-new deployment gives you a new URL and the form will silently stop working.

---

## 2. Publish on GitHub Pages

No `gh` CLI on this machine, so do it in the browser once:

1. Create a new **public** repo on github.com — e.g. `meta-kin-uk`.
2. Upload the contents of this folder (`index.html`, `assets/`) to the repo root —
   drag and drop works: **Add file ▸ Upload files**.
3. **Settings ▸ Pages ▸ Source: Deploy from a branch ▸ `main` / `(root)` ▸ Save.**
4. Live in about a minute at `https://<username>.github.io/meta-kin-uk/`.

Or from this machine once `gh` is installed:

```bash
brew install gh && gh auth login
cd "sites/meta-x-kin-uk"
git init && git add . && git commit -m "META x KIN UK landing page"
gh repo create meta-kin-uk --public --source=. --push
gh api -X POST repos/:owner/meta-kin-uk/pages -f source[branch]=main -f source[path]=/
```

**Custom domain:** Settings ▸ Pages ▸ Custom domain, then a `CNAME` record at your registrar
pointing to `<username>.github.io`. Use a real domain before you spend on ads — a
`github.io` URL depresses form conversion with this audience.

---

## 3. Before you send paid traffic

- [ ] `ENDPOINT` filled in and **one test lead landed in the Sheet**
- [ ] Which price list is public — PDF (100k) or VR-uplift (120k)? This page says **120,000**
- [ ] The footer address is Ratchadaphisek Rd (from the packages PDF), but the building photo
      on p.29 reads "KIN Origin Rehab Center **Sukhumvit 107**". **Confirm which address is right.**
- [ ] Meta Ads Library audit — worksheet in `reference/competitors.md`
- [ ] Meta domain verification for the final domain
- [ ] Two Meta events now, not one: `ViewContent` on index.html, `Lead` on enquire.html
- [ ] Written OK from Joker to use KIN's own photographs commercially in the UK
- [ ] A real privacy policy page if you scale spend; the footer notice covers a pilot

## Compliance — do not undo these

Full reasoning in `reference/medical-tourism/uk-market-2026-09-15.md` §0 and §6, and the
compliance table in `projects/creative/meta-x-kin/2026-09-15-offer-brief.md`.

Deliberately **absent** from this page, and each one must stay absent:

| Removed | Why |
|---|---|
| **Exosomes** | Unlicensed medicinal product. Advertising one is an offence under Human Medicines Regulations 2012, reg. 279 |
| **EECP** | NICE says "do not offer" |
| Any HBOT outcome claim | CAP ruled against exactly this (Nimaya Mindstation, Nov 2023); Cochrane found no good evidence for stroke |
| Stroke / cancer / rehab language | CAP 12.2 — serious conditions, never in cold consumer advertising |
| Testimonials, before/afters | None exist, and none are consented |
| Superlatives ("top hospital", "best") | Unsubstantiated — CAP 12 |
| **The KIN YouTube facility video** | Titled *"Stroke rehabilitation centre — post-surgical rehab and elderly care"*; the thumbnail lists stroke, paralysis, bedridden patients and elderly care, in Thai. CAP 12.2 bars serious conditions from cold consumer advertising, and it reframes the offer as a nursing home. Belongs in the **P4 referral funnel**, not here |
| "Over 500 stroke patients" · "150 patients a year" · "95.9% home within three months" | Bookimed profile only — **not on KIN's own site, no source cited.** The 95.9% is also an outcome claim about a serious condition. Replaced on the page by **58 beds**, which is primary-sourced and makes the personalisation argument better |

**Present on purpose:** the price, the comparison table *with its basis published*, the
"not included" list, the not-a-substitute-for-your-GP notice, and the consent checkbox.
CAP requires the basis of a comparison to be stated — deleting that table makes the price
claim non-compliant, not shorter.
