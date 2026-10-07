export interface GAEvent {
  category: string;
  action: string;
  label?: string;
}

function sendEvent(payload: GAEvent, value?: string): void {
  let action = payload.action;

  if (value) {
    action = `${payload.action}[${value}]`;
  }

  (window as any).gtag('event', action, {
    event_category: payload.category,
    event_label: payload.label,
  });
}

export default {
  sendEvent,
};
