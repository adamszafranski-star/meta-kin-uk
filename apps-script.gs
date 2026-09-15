/**
 * META x KIN — UK landing page → Google Sheet
 *
 * Writes each enquiry as a row your team can work from: the phone number is a
 * tappable tel: link, and the Status column is a dropdown.
 *
 * Install: Extensions ▸ Apps Script inside your Sheet, delete the placeholder,
 * paste all of this, save. Then Deploy ▸ New deployment ▸ Web app,
 * Execute as: Me, Who has access: Anyone. Copy the /exec URL into
 * ENDPOINT in enquire.html. Full walkthrough in GO-LIVE.md.
 */

var SHEET_NAME = 'Leads';

// Comma-separate for several: 'you@x.com, sales@x.com'
var NOTIFY = 'adam.szafranski@gmail.com';

var HEADERS = [
  'Received (UK)', 'Status', 'Called by', 'Called on', 'Outcome / notes',
  'First name', 'Surname', 'Call this number', 'Email',
  'Timeframe', 'Travelling', 'Hotel help', 'Page', 'Source'
];

var STATUSES = ['New', 'Attempted — no answer', 'Spoken to', 'Quote sent',
                'Booked', 'Not suitable', 'Not interested'];

// Columns the team fills in. Left blank on write so nothing gets overwritten.
var TEAM_COLS = 5;   // Status, Called by, Called on, Outcome — cols 2..5

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    var row = sheet.getLastRow() + 1;

    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Europe/London', 'yyyy-MM-dd HH:mm'),
      'New',                    // Status
      '',                       // Called by
      '',                       // Called on
      '',                       // Outcome / notes
      d.first || '',
      d.last  || '',
      '',                       // phone — written as a link below
      d.email || '',
      d.when  || '',
      d.party || '',
      d.room  || '',
      d.page  || '',
      d.ref   || ''
    ]);

    // Tappable phone number: opens the dialler in the Google Sheets mobile app.
    var phone = String(d.phone || '');
    if (phone) {
      var intl = phone.replace(/^0(?=7)/, '+44').replace(/^0044/, '+44');
      var pretty = phone.replace(/^(\+?44|0)(\d{4})(\d{6})$/, '$1$2 $3');
      sheet.getRange(row, 8).setFormula(
        '=HYPERLINK("tel:' + intl + '","' + (pretty || phone) + '")'
      );
    }

    if (NOTIFY) {
      MailApp.sendEmail({
        to: NOTIFY,
        subject: 'New enquiry — ' + (d.first || '') + ' ' + (d.last || ''),
        htmlBody:
          '<p><b>' + esc_(d.first) + ' ' + esc_(d.last) + '</b></p>' +
          '<p>Phone: <a href="tel:' + esc_(phone) + '">' + esc_(phone) + '</a><br>' +
          'Email: <a href="mailto:' + esc_(d.email) + '">' + esc_(d.email) + '</a></p>' +
          '<p>Timeframe: ' + esc_(d.when) + '<br>' +
          'Travelling: ' + esc_(d.party) + '<br>' +
          'Hotel help: ' + esc_(d.room) + '</p>' +
          '<p><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">Open the lead sheet</a></p>'
      });
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, note: 'POST enquiries here.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var head = sheet.getRange(1, 1, 1, HEADERS.length);
    head.setFontWeight('bold').setBackground('#08414c').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setFrozenColumns(1);

    // Widths that make the sheet readable on a phone.
    var widths = [130, 150, 110, 110, 300, 110, 120, 150, 230, 130, 240, 210, 200, 150];
    widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });

    // Status dropdown, 2000 rows deep.
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(STATUSES, true).setAllowInvalid(false).build();
    sheet.getRange(2, 2, 2000, 1).setDataValidation(rule);

    // Colour the rows that still need a call.
    var range = sheet.getRange(2, 1, 2000, HEADERS.length);
    var newRule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$B2="New"')
      .setBackground('#fdf3e3').setRanges([range]).build();
    var doneRule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$B2="Booked"')
      .setBackground('#e6f4ea').setRanges([range]).build();
    sheet.setConditionalFormatRules([newRule, doneRule]);
  }
  return sheet;
}

function esc_(s) {
  return String(s == null ? '' : s).replace(/[<>&"]/g, function (c) {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: run once from the editor to send yourself a test row without
 * touching the website. Extensions ▸ Apps Script ▸ pick sendTestLead ▸ Run.
 */
function sendTestLead() {
  doPost({ postData: { contents: JSON.stringify({
    first: 'Test', last: 'Lead', phone: '07700900123',
    email: 'test@example.co.uk', when: 'Within 3 months',
    party: 'On my own', room: 'Tell me the options first',
    page: 'manual test', ref: 'apps script'
  })}});
}
