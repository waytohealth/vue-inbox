import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

let helper = {
  tz: "America/New_York",
  setTimezone(tz) {
    this.tz = tz;
  },
  getFriendlyTimezoneName() {
    return dayjs().tz(this.tz).format("zzz");
  },
  statusType: function(msg) {
    switch (msg.status) {
      case 'delivered':
      case 'completed':
      case 'received':
        return 'success';
      case 'sent':
        return 'sent';
      case 'failed':
      case 'undelivered':
        return 'failure';
      case 'queued':
      case 'pending':
      case 'unknown':
      case 'accepted':
      case 'in-progress':
      default:
        return 'unknown';
    }
  },
  messageTime: function(msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('h:mm A');
  },
  messageDate: function(msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('M/D/YY');
  },
  tooltipTime: function(msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('h:mm:ss A z');
  },
  messageDetailTime: function(msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('M/D/YY h:mm:ss A z');
  },
  imageDetailTime: function(msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('dddd, D MMMM YYYY – h:mm:ss A');
  },
  formatDate: function(date, applyTz = true) {
    if (applyTz) {
      return dayjs(date).tz(this.tz).format('~ dddd, D MMMM YYYY ~');
    }

    return dayjs(date).format('~ dddd, D MMMM YYYY ~');
  },
  formatNumber: function(number) {
    // +12345678901 -> 234-567-8901
    var cleaned = ('' + number).replace(/\D/g, '');
    var match = cleaned.match(/^\d{1}(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    } else {
      return number;
    }
  },
  messageClasses: function(msg, aiSuggestionsEnabled) {
    let classes = [];
    classes.push(msg.direction === 'inbound' ? 'inbound' : 'outbound');
    classes.push(msg.sender ? 'manual' : 'automated');
    if (aiSuggestionsEnabled) {
      classes.push('ai-suggestion-selectable');
    }
    return classes;
  },
  messageStatus: function(msg) {
    switch (msg.status) {
      case 'queued':
      case 'accepted':
        return 'Text message queued for delivery';
      case 'delivered':
        return 'Text message delivered to carrier';
      case 'sent':
        return 'Text message sent to carrier';
      case 'failed':
      case 'undelivered':
        return "Text message was not delivered. Error " + msg.error_code + ": " +msg.error_message;
      default:
        return msg.status;
    }
  },
  messageMetadata: function(msg) {
      return msg.metadata.map(function(m) {
        return m.message;
      }).join('; ');
  },
  sortMessages(messages) {
    return messages.sort(function(a,b) {
      if ((a.sent_at || a.created_at) > (b.sent_at || b.created_at)) {
        return 1;
      } else if ((a.sent_at || a.created_at) < (b.sent_at || b.created_at)) {
        return -1;
      }

      return a.id > b.id ? 1:-1;
    });
  },
  getIconForStatus(status) {
    switch (status) {
      case "success":
        return {
          icon: 'check-lg',
          variant: 'success',
          scale: "1",
        }
      case "sent":
        return {
          icon: 'arrow-bar-right',
          variant: 'success',
          scale: "1.3",
        }
      case "failure":
        return {
          icon: 'exclamation-triangle-fill',
          variant: 'danger',
          scale: "1",
        }
      case "unknown":
        return {
          icon: 'info-circle-fill',
          variant: 'info',
          scale: "1",
        }
    }
  }

}

export default helper;