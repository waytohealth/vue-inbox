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
      case 'sent':
      case 'received':
        return 'success';
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
  formatDate: function(date) {
    return dayjs(date).tz(this.tz).format('~ dddd, D MMMM YYYY ~');
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
  messageClasses: function(msg) {
    let classes = [];
    classes.push(msg.direction === 'inbound' ? 'inbound' : 'outbound');
    classes.push(msg.sender ? 'manual' : 'automated');
    return classes;
  },
  messageStatus: function(msg) {
    switch (msg.status) {
      case 'queued':
      case 'accepted':
        return 'Text message queued for delivery';
      case 'delivered':
      case 'sent':
        return 'Text message delivered to carrier';
      case 'failed':
      case 'undelivered':
        return "Text message was not delivered. Error " + msg.error_code + ": " +msg.error_message;
      default:
        return msg.status;
    }
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
        }
      case "failure":
        return {
          icon: 'exclamation-triangle-fill',
          variant: 'danger',
        }
      case "unknown":
        return {
          icon: 'info-circle-fill',
          variant: 'info',
        }
    }
  }

}

export default helper;