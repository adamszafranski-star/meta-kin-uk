# Go live — step by step

**Part 1 is already done and verified.** Jump to Part 2.

Remaining time: about 10 minutes.

---

# PART 1 — The lead sheet ✅ DONE

Verified 2026-09-15. A live test enquiry was posted to your deployment and the script
answered `{"ok":true}`.

| | |
|---|---|
| Endpoint | `…/AKfycbxReBPKjt7NEjHhvdF-5PE…/exec` — already pasted into `enquire.html` |
| Access | Public. `doGet` answers, `doPost` writes |
| Email alerts | On, to `adam.szafranski@gmail.com` |

**One thing to do:** delete the row named **“CONNECTION TEST - please delete”** from the
Leads tab. That was the verification.

### If you ever edit the script

**Manage deployments ▸ pencil icon ▸ Version: New version ▸ Deploy.** That keeps the same
URL. Creating a *new* deployment issues a new URL and the form goes quiet without telling
you — that is the single most common way this breaks.

---

# PART 2 — Put the site on GitHub ← START HERE

No custom domain needed. You will get
`https://<your-username>.github.io/<repo-name>/`

## 2.1 Create the repository

1. Sign in at **github.com** ▸ **New repository** (green button, or the **+** top right)
2. Repository name: **`bangkok-reset`** (this becomes part of the URL — keep it short
   and not embarrassing, people will see it)
3. **Public** — Pages does not work on private repos on a free account
4. Do **not** tick "Add a README"
5. **Create repository**

## 2.2 Upload the files

1. On the empty repo page click **uploading an existing file**
2. Open this folder (`sites/meta-x-kin-uk`) in Finder
3. Drag in these **four items**:
   - `index.html`
   - `enquire.html`
   - `style.css`
   - the whole **`assets`** folder
4. **Do not upload** `apps-script.gs`, `README.md` or `GO-LIVE.md` — they are for you,
   not the public, and `apps-script.gs` is nobody's business
5. Commit message: `first version` ▸ **Commit changes**

## 2.3 Turn Pages on

1. **Settings** (top of the repo) ▸ **Pages** (left sidebar)
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)** ▸ **Save**
4. Wait about a minute, refresh. The URL appears at the top of that page.

Your site is live at `https://<username>.github.io/bangkok-reset/`

## 2.4 Check it properly

On your **phone**, not your laptop:

- [ ] Both pages load and the photographs appear
- [ ] "Request details" goes to the enquiry page
- [ ] The film thumbnail shows, and plays when tapped
- [ ] **Fill the form in for real and press send**
- [ ] The row appears in your Google Sheet within about ten seconds
- [ ] The phone number in the Sheet is a blue link
- [ ] You got the email alert (if you set `NOTIFY`)

## 2.5 Making changes later

Edit the file on your computer, then in the repo: click the file ▸ pencil icon ▸
paste the new contents ▸ **Commit changes**. Live in under a minute.

Or replace a whole file: **Add file ▸ Upload files**, drag the new version in, commit.
Same filename overwrites.

---

# PART 3 — Working the leads with your team

## 3.1 What the sheet looks like

| Column | Who fills it |
|---|---|
| Received (UK) | Automatic — London time |
| **Status** | **Your team** — dropdown: New · Attempted — no answer · Spoken to · Quote sent · Booked · Not suitable · Not interested |
| **Called by** | **Your team** — who took it |
| **Called on** | **Your team** |
| **Outcome / notes** | **Your team** |
| First name · Surname | Automatic |
| **Call this number** | Automatic — **a tap-to-dial link** |
| Email · Timeframe · Travelling · Hotel help | Automatic |
| Page · Source | Automatic — tells you which ad or page sent them |

New rows go **cream**. Booked rows go **green**. Nobody has to remember anything.

## 3.2 Give it to your staff

**Share** (top right of the Sheet) ▸ add their email ▸ **Editor** ▸ Send.

Tell them to install the **Google Sheets app** on their phone. Tapping the number in
"Call this number" opens the dialler. That is the whole workflow: open the sheet, work
down the cream rows, set the Status, type what happened.

**Do not give Editor access to the Apps Script.** Sharing the Sheet does not share the
deployment, so this is already safe — just don't hand out your Google password.

## 3.3 One person per lead, no double-calling

If more than one person is calling, add a rule: **before you dial, put your name in
"Called by" and set Status to "Attempted".** Google Sheets shows other people's cursors
live, so two staff will see each other working.

For a bigger team, use a **filter view** per person (Data ▸ Create a filter view) so each
one sees only their own rows without changing what anyone else sees.

## 3.4 Getting leads out as a document

- **One lead as a PDF:** File ▸ Print ▸ set Print to *Selected cells* ▸ Export as PDF
- **The day's leads:** highlight the rows ▸ same route
- **A weekly report:** File ▸ Download ▸ PDF, or share the Sheet link read-only
  (Share ▸ General access ▸ Anyone with the link ▸ **Viewer**)

Honest advice: **don't move leads into PDFs to work them.** A PDF is a dead end — nobody
can update it, two people end up with different versions, and a lead ages badly. Keep the
Sheet as the single live list and export a PDF only when someone outside the team needs a
snapshot.

## 3.5 Speed matters more than anything else in this section

Bangkok is six hours ahead of the UK. A lead that arrives at 9pm UK time is 3am in
Bangkok. Decide now who calls the overnight ones and when — **and call in the lead's
morning, not yours.** The page promises exactly that, in writing, twice.

---

# Before you spend money on ads

- [ ] `ENDPOINT` filled in and **a real test lead landed in the Sheet from your phone**
- [ ] Which price list is public — the PDF's 100,000 or the uplift 120,000?
      Both pages currently say **120,000**
- [ ] Address on the page: it says Kin Origin, Sukhumvit 107, with the Ratchadaphisek
      office as registered contact. **Confirm that is where a UK buyer actually goes**
- [ ] Written OK from Joker to use KIN's photographs and their YouTube film
- [ ] Meta Pixel on both pages, with two events: `ViewContent` on `index.html`,
      `Lead` on the thank-you state of `enquire.html`
- [ ] Meta domain verification for `<username>.github.io`
- [ ] The Ads Library audit — six pre-built URLs in `reference/competitors.md`

**On the github.io address:** it is fine for a pilot and for testing whether the offer
converts at all. It will cost you some conversion with this audience, who read a URL.
Buy a real domain before you scale spend — Settings ▸ Pages ▸ Custom domain, then one
CNAME record at the registrar. Ten minutes, about £10 a year.
