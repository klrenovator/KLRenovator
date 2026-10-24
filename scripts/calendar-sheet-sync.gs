/**
 * KL Renovator — Google Calendar → Google Sheet auto-sync
 * -------------------------------------------------------
 * Copies every Google Calendar event (WhatsApp Business bookings, staff
 * manual entries, website bookings — whatever lands on the calendar) into a
 * Google Sheet row automatically. Reschedules update the row; deleted events
 * are marked "Removed from calendar".
 *
 * Setup: see scripts/CALENDAR_SYNC_SETUP.md (5 minutes, free, no third party).
 *
 * Runs on Google Apps Script (time-driven trigger, every 5–15 minutes).
 */

var CONFIG = {
  // 'primary' = the Google Calendar of the account that runs the script.
  // If WhatsApp Business / the website write to a different calendar, put
  // that calendar's ID here (Calendar → Settings → Integrate calendar).
  CALENDAR_ID: 'primary',

  // Tracker spreadsheet ID. Already filled in — change only if the sheet
  // is recreated. Leave '' if this script is bound to the spreadsheet.
  SPREADSHEET_ID: '19qok6A6itJIgeSPzxtJZyYrjn74-fmQf7ZoIja3gku0',

  SHEET_NAME: 'Bookings Log',
  TIMEZONE: 'Asia/Kuala_Lumpur',

  // Scan window: reschedules inside this window are still picked up.
  PAST_DAYS: 7,
  FUTURE_DAYS: 180
};

var HEADERS = ['Sync Key (auto)', 'Booking Date', 'Start', 'End', 'Customer',
               'Phone', 'Address', 'Details', 'Status', 'Last Synced'];

/** One-time setup: creates the tab with headers and runs the first sync. */
function setup() {
  var sheet = getOrCreateSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  syncBookings();
}

/** Main entry point — point a time-driven trigger at this function. */
function syncBookings() {
  var sheet = getOrCreateSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  var tz = CONFIG.TIMEZONE;
  var now = new Date();
  var windowStart = new Date(now.getTime() - CONFIG.PAST_DAYS * 86400000);
  var windowEnd = new Date(now.getTime() + CONFIG.FUTURE_DAYS * 86400000);

  var calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!calendar) {
    throw new Error('Calendar not found or no access: ' + CONFIG.CALENDAR_ID);
  }
  var events = calendar.getEvents(windowStart, windowEnd);

  // Existing rows keyed by column A (Sync Key).
  var lastRow = sheet.getLastRow();
  var rowByKey = {};
  if (lastRow > 1) {
    var keys = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < keys.length; i++) {
      if (keys[i][0]) rowByKey[keys[i][0]] = i + 2; // +2 => sheet row number
    }
  }

  var seen = {};
  var stamp = Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');

  for (var e = 0; e < events.length; e++) {
    var ev = events[e];
    // Composite key so recurring-event instances never collide.
    var key = ev.getId() + '|' + ev.getStartTime().getTime();
    seen[key] = true;

    var title = ev.getTitle() || '';
    var desc = ev.getDescription() || '';
    var loc = ev.getLocation() || '';
    var status = /cancel/i.test(title) ? 'Cancelled' : 'Confirmed';

    var row = [
      key,
      Utilities.formatDate(ev.getStartTime(), tz, 'yyyy-MM-dd'),
      Utilities.formatDate(ev.getStartTime(), tz, 'HH:mm'),
      Utilities.formatDate(ev.getEndTime(), tz, 'HH:mm'),
      title,
      extractPhone_(title + ' ' + desc + ' ' + loc),
      loc,
      desc.replace(/\n/g, ' ').trim(),
      status,
      stamp
    ];

    if (rowByKey.hasOwnProperty(key)) {
      sheet.getRange(rowByKey[key], 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
  }

  // Mark rows whose event disappeared (deleted / cancelled & removed).
  if (lastRow > 1) {
    var all = sheet.getRange(2, 1, lastRow, 10).getValues();
    for (var r = 0; r < all.length; r++) {
      var k = all[r][0];
      if (!k || seen[k]) continue;
      if (all[r][8] !== 'Removed from calendar') {
        sheet.getRange(r + 2, 9).setValue('Removed from calendar');
        sheet.getRange(r + 2, 10).setValue(stamp);
      }
    }
  }

  // Keep the log sorted by booking date (data rows only).
  if (sheet.getLastRow() > 2) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length)
         .sort({ column: 2, ascending: true });
  }
}

/** Best-effort Malaysian phone extraction from title/description/location. */
function extractPhone_(text) {
  if (!text) return '';
  var m = text.match(/(\+?6?01[01456789][-\s]?\d{3,4}[-\s]?\d{4})/);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

function getOrCreateSheet_() {
  var ss = CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  return sheet;
}
