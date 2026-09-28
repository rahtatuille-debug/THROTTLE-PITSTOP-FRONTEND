// Shop details shown across the site (footer, contact page). Change
// hours or phone numbers here, not in individual components.

export const SHOP_LOCATION = ["Anwar Center, Karen", "Nairobi, Kenya"];

export const SHOP_HOURS = [
  { days: "Monday – Saturday", time: "9:00 AM – 6:00 PM" },
  { days: "Sunday", time: "Closed" },
];

export const SHOP_PHONES = ["0712 496 142", "0715 109 107"];

// "0712 496 142" -> "tel:+254712496142"
export function phoneHref(phone) {
  return `tel:+254${phone.replace(/\s/g, "").replace(/^0/, "")}`;
}
