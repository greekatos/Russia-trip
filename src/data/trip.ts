export type CrewMember = {
  id: string;
  name: string;
  shortName: string;
  role?: string;
};

export type FlightInfo = {
  bookingRef: string;
  airline: string;
  flightNumber: string;
  aircraft?: string;
  fare: string;
  from: { city: string; code: string; time: string; airport?: string };
  to: { city: string; code: string; airport: string; time: string };
  date: string;
  baggage: string;
  passengers: string[];
  customerRef?: string;
  pin?: string;
  duration?: string;
  pdfUrl?: string;
  pdfLabel?: string;
  notes?: string[];
};

export type StationPin = {
  name: string;
  address: string;
  mapsUrl: string;
  metroTip?: string;
};

export type TrainSeat = {
  name: string;
  car: string;
  seat: string;
  berth?: string;
};

export type TrainInfo = {
  label: string;
  trainNumber: string;
  orderRef: string;
  departDate: string;
  arriveDate: string;
  travelTime: string;
  carType: string;
  from: StationPin & { time: string; city: string };
  to: StationPin & { time: string; city: string };
  seats: TrainSeat[];
  notes: string[];
  pdfUrl: string;
  pdfLabel: string;
};

export type StayInfo = {
  name: string;
  address: string;
  mapsUrl: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  rooms: number;
  roomType: string;
  bookingNo: string;
  accessCode: string;
  guestName: string;
  phone: string[];
  email: string;
  included: string[];
  total: string;
  payment: string;
  notes: string[];
  pdfUrl: string;
  pdfLabel: string;
};

export type Quest = {
  id: string;
  title: string;
  detail: string;
  owner?: string;
  icon: "house" | "ticket";
  status: "open" | "cooking" | "done";
};

export type DayStop = {
  id: string;
  date: string;
  label: string;
  city: string;
  country: string;
  title: string;
  summary: string;
  whereWeAre: string;
  notes: string[];
  todos: string[];
  flight?: FlightInfo;
  train?: TrainInfo;
  stay?: StayInfo;
  crewIds?: string[];
  status: "confirmed" | "planned" | "tbd";
};

export type Trip = {
  name: string;
  tagline: string;
  startDate: string;
  endDate: string;
  crew: CrewMember[];
  quests: Quest[];
  days: DayStop[];
};

const YAROSLAVSKY: StationPin = {
  name: "Yaroslavsky train station",
  address: "5 Komsomolskaya Sq., Moscow",
  mapsUrl: "https://yandex.com/maps/org/yaroslavskiy_vokzal/1085018813/",
  metroTip:
    "Metro Komsomolskaya (brown circle line) → exit through the wooden door, turn left — Russian-style towers / black roof. Long-distance entrance is to the right of the main doors.",
};

const YEK_PASS: StationPin = {
  name: "Ekaterinburg-Passajirs",
  address: "Vokzalnaya st, 22, Ekaterinburg",
  mapsUrl: "https://yandex.com/maps/org/yekaterinburg_passazhirskiy/1025007463/",
  metroTip: "Metro Uralskaya is the closest stop.",
};

const IRKUTSK_PASS: StationPin = {
  name: "Irkutsk Passazhirsky",
  address: "Chelnokova st, 1, Irkutsk",
  mapsUrl: "https://yandex.com/maps/?text=Irkutsk-Passazhirsky%2C%20Chelnokova%201",
};

const ULAANBAATAR: StationPin = {
  name: "Ulaanbaatar railway station",
  address: "Ulaanbaatar, Mongolia",
  mapsUrl: "https://yandex.com/maps/?text=Ulaanbaatar%20railway%20station",
};

export const moscowYekTrain: TrainInfo = {
  label: "Big eastbound #1",
  trainNumber: "070ЯА",
  orderRef: "30156109 · RussianTrain",
  departDate: "Sun 09.08.2026",
  arriveDate: "Mon 10.08.2026",
  travelTime: "1 day · 6h 14m · 1 night",
  carType: "4-people compartment · car 02",
  from: {
    ...YAROSLAVSKY,
    city: "Moscow",
    time: "13:20",
  },
  to: {
    ...YEK_PASS,
    city: "Yekaterinburg",
    time: "21:34",
  },
  seats: [
    { name: "Dimosthenis Minas", car: "02", seat: "001", berth: "Lower" },
    { name: "Antonios Lymperis", car: "02", seat: "002", berth: "—" },
    { name: "Panagiota Chnari", car: "02", seat: "003", berth: "—" },
    { name: "Nantia Baimpa", car: "02", seat: "004", berth: "—" },
  ],
  notes: [
    "Be at Yaroslavsky early — boarding usually opens 30–40 min before departure.",
    "Show passport used at booking to the train crew.",
    "E-ticket PDF is enough on your phone if you can’t print.",
  ],
  pdfUrl: "/tickets/moscow-yekaterinburg-070.pdf",
  pdfLabel: "Download Moscow → Yek ticket PDF",
};

export const yekIrkutskTrain: TrainInfo = {
  label: "Big eastbound #2",
  trainNumber: "082ИА",
  orderRef: "RussianTrain e-tickets",
  departDate: "Tue 11.08.2026",
  arriveDate: "Fri 14.08.2026",
  travelTime: "2 days · 5h 22m · 3 nights",
  carType: "4-people compartment · car 10",
  from: {
    ...YEK_PASS,
    city: "Yekaterinburg",
    time: "21:58",
  },
  to: {
    ...IRKUTSK_PASS,
    city: "Irkutsk",
    time: "06:20",
  },
  seats: [
    { name: "Panagiota Chnari", car: "10", seat: "014", berth: "Upper" },
    { name: "Nantia Baimpa", car: "10", seat: "016", berth: "Upper" },
    { name: "Dimosthenis Minas", car: "10", seat: "018", berth: "Upper" },
    { name: "Antonios Lymperis", car: "10", seat: "020", berth: "Upper" },
  ],
  notes: [
    "Local time UTC+5 out of Yek, UTC+8 into Irkutsk.",
    "Pets not allowed on this wagon.",
    "Wagon numbering is from the tail of the train.",
  ],
  pdfUrl: "/tickets/yekaterinburg-irkutsk.pdf",
  pdfLabel: "Download Yek → Irkutsk ticket PDF",
};

export const yekaterinburgHotel: StayInfo = {
  name: 'Hotel "Sverdlova 27"',
  address: "ul. Sverdlova, 27, Zheleznodorozhny, Ekaterinburg",
  mapsUrl: "https://yandex.com/maps/?pt=60.603778,56.854082&z=17&l=map",
  checkIn: "10 Aug 2026 · after 14:00",
  checkOut: "11 Aug 2026 · till 12:00",
  nights: 1,
  guests: 4,
  rooms: 1,
  roomType: 'Room "Studio"',
  bookingNo: "20260810-3652-452541120",
  accessCode: "R69JWDN",
  guestName: "Dimosthenis Minas",
  phone: ["+7 (343) 354-05-10", "+7 (343) 370-33-32", "+7 (902) 500-22-32"],
  email: "hotelsverdlova27@mail.ru",
  included: ["Continental breakfast ×4", "Main line-rate"],
  total: "13,600 RUB",
  payment: "NOT PAID YET — pay at the hotel on check-in (13,600 RUB)",
  notes: [
    "We have not paid this accommodation yet. Pay 13,600 RUB there at check-in.",
    "GPS: 56.854082, 60.603778 — close to the railway area.",
    "We arrive by train 21:34 on 10 Aug — check-in window starts 14:00, so late arrival is fine.",
    "Checkout 12:00 on 11 Aug · night train to Irkutsk leaves 21:58 same day.",
    "Booked on the official Hotel Sverdlova 27 site via TravelLine.",
  ],
  pdfUrl: "/tickets/yekaterinburg-hotel.pdf",
  pdfLabel: "Download Yekaterinburg hotel confirmation PDF",
};

export const irkutskUlaanbaatarTrain: TrainInfo = {
  label: "Border run → Mongolia",
  trainNumber: "306ЫА",
  orderRef: "75714920094675 · Invoice #30157305",
  departDate: "Sun 16.08.2026",
  arriveDate: "Mon 17.08.2026",
  travelTime: "~24 hours · overnight border",
  carType: "2К compartment · coach 02",
  from: {
    ...IRKUTSK_PASS,
    city: "Irkutsk",
    time: "06:58",
  },
  to: {
    ...ULAANBAATAR,
    city: "Ulaanbaatar",
    time: "06:38",
  },
  seats: [
    { name: "Dimosthenis Minas", car: "02", seat: "001", berth: "Lower" },
    { name: "Panagiota Chnari", car: "02", seat: "002", berth: "Upper" },
    { name: "Nantia Baimpa", car: "02", seat: "003", berth: "Lower" },
    { name: "Antonios Lymperis", car: "02", seat: "004", berth: "Upper" },
  ],
  notes: [
    "Foreign passport is mandatory for boarding.",
    "E-registration already completed (06.07.2026).",
    "Arrive Irkutsk station early — departure is 06:58 local.",
  ],
  pdfUrl: "/tickets/irkutsk-ulaanbaatar.pdf",
  pdfLabel: "Download Irkutsk → Ulaanbaatar ticket PDF",
};

export const ulaanbaatarBeijingFlight: FlightInfo = {
  bookingRef: "PV3MJ5",
  customerRef: "40-1043941374",
  pin: "6209",
  airline: "Air China",
  flightNumber: "CA956",
  fare: "Economy",
  duration: "Direct · 2h",
  from: { city: "Ulaanbaatar", code: "UBN", time: "13:30" },
  to: { city: "Beijing", code: "PEK", airport: "Capital / PEK", time: "15:30" },
  date: "Thu 20.08.2026",
  baggage:
    "2 personal items · 2 carry-on (max 5 kg, 20×40×55) · 2 checked bags (23 kg)",
  passengers: ["Dimosthenis Minas", "Antonios Lymperis"],
  pdfUrl: "/tickets/ulaanbaatar-beijing.pdf",
  pdfLabel: "Download Ulaanbaatar → Beijing booking PDF",
  notes: [
    "Only Dimos + Antonios on this flight.",
    "Nadia + Giota: return to Greece still unknown — no date yet.",
  ],
};

export const beijingAthensFlight: FlightInfo = {
  bookingRef: "ADWBGQ",
  customerRef: "40-1044640247",
  pin: "7977",
  airline: "Saudi Arabian Airlines",
  flightNumber: "SV887 / SV191",
  fare: "Economy · Flexible ticket",
  duration: "1 stop · 21h 15m",
  from: {
    city: "Beijing",
    code: "PKX",
    airport: "Daxing (PKX)",
    time: "21:30",
  },
  to: { city: "Athens", code: "ATH", airport: "Eleftherios Venizelos", time: "13:45" },
  date: "Mon 24.08.2026 → Tue 25.08.2026",
  baggage: "1 personal item · 1 carry-on (max 7 kg, 25×45×56) · 1 checked bag (23 kg)",
  passengers: ["Dimosthenis Minas"],
  pdfUrl: "/tickets/beijing-athens.pdf",
  pdfLabel: "Download Beijing → Athens booking PDF (Dimos)",
  notes: [
    "Dimos only — booked.",
    "Depart Beijing Daxing (PKX) 21:30 on 24 Aug · arrive Athens 13:45 on 25 Aug.",
    "Flexible ticket: changes allowed up to 24h before departure (fare difference may apply).",
    "Antonios also booked his China → Athens return.",
  ],
};

export const trip: Trip = {
  name: "Northbound",
  tagline:
    "Four Greeks, one board, zero spreadsheets — where we sleep, what we buy, what’s still chaos.",
  startDate: "2026-08-02",
  endDate: "2026-08-25",
  crew: [
    { id: "dimo", name: "Dimosthenis Minas", shortName: "Dimos" },
    { id: "antonios", name: "Antonios Lymperis", shortName: "Antonios" },
    { id: "nantia", name: "Nantia Baimpa", shortName: "Nadia" },
    { id: "panagiota", name: "Panagiota Chnari", shortName: "Giota" },
  ],
  quests: [
    {
      id: "spb-housing",
      title: "Housing — Saint Petersburg",
      detail: "No housing yet for the whole crew in Saint Petersburg.",
      icon: "house",
      status: "open",
    },
    {
      id: "msk-housing",
      title: "Housing — Moscow (Dimos + Antonios)",
      detail:
        "Nadia and Giota stay at Shen’s. Dimos and Antonios still have no housing in Moscow.",
      icon: "house",
      status: "open",
    },
    {
      id: "yek-housing",
      title: "Housing — Yekaterinburg",
      detail:
        'Booked. Hotel "Sverdlova 27" · not paid yet — pay 13,600 RUB at check-in · 10 Aug after 14:00 → 11 Aug 12:00 · booking 20260810-3652-452541120.',
      icon: "house",
      status: "done",
    },
    {
      id: "irk-housing",
      title: "Housing — Irkutsk",
      detail: "No housing yet for the whole crew in Irkutsk.",
      icon: "house",
      status: "open",
    },
    {
      id: "ub-housing",
      title: "Housing — Ulaanbaatar",
      detail: "No housing yet for the whole crew in Ulaanbaatar.",
      icon: "house",
      status: "open",
    },
    {
      id: "after-ub",
      title: "After Ulaanbaatar — split",
      detail:
        "Nadia and Giota return to Greece (date not set yet). Dimos and Antonios go to Beijing.",
      icon: "ticket",
      status: "open",
    },
    {
      id: "pek-housing",
      title: "Housing — Beijing (Dimos + Antonios)",
      detail: "No housing yet for Dimos and Antonios in Beijing.",
      icon: "house",
      status: "open",
    },
    {
      id: "return-dimos",
      title: "Return ticket — Dimos Beijing → Athens",
      detail:
        "Booked. Saudia SV887 / SV191 · PKX 24 Aug 21:30 → ATH 25 Aug 13:45 · ref ADWBGQ.",
      icon: "ticket",
      status: "done",
    },
    {
      id: "return-antonios",
      title: "Return ticket — Antonios China → Athens",
      detail:
        "Booked. Drop the PDF when you have it and we’ll add times + download on the board.",
      icon: "ticket",
      status: "done",
    },
  ],
  days: [
    {
      id: "day-01",
      date: "2026-08-02",
      label: "Sun 2 Aug",
      city: "Tallinn → SPb",
      country: "Estonia → Russia",
      title: "Fly in. Bus out. No chill.",
      summary:
        "Dawn flight into Tallinn, then immediately hunt the bus south to Saint Petersburg. Welcome to speedrun tourism.",
      whereWeAre: "ATH → TLL → (pending) bus → Saint Petersburg",
      status: "planned",
      notes: [
        "Flight is locked: BT818, land TLL 08:25.",
        "Same-day bus Tallinn → Saint Petersburg — still need to find & buy tickets.",
        "Border day energy: docs ready, snacks ready, patience optional.",
      ],
      todos: [
        "PENDING: find + buy Tallinn → SPb bus (same day)",
        "Boarding passes ready before the 04:40 ATH departure",
        "Pack like the bus is unforgiving (cabin bag only on the flight)",
      ],
      flight: {
        bookingRef: "8K2Z4C",
        airline: "airBaltic",
        flightNumber: "BT818",
        aircraft: "Airbus A220-300",
        fare: "Economy BASIC",
        from: { city: "Athens", code: "ATH", time: "04:40" },
        to: {
          city: "Tallinn",
          code: "TLL",
          airport: "Lennart Meri",
          time: "08:25",
        },
        date: "Sun 02.08.2026",
        baggage: "1× cabin bag 8 kg + 1 personal item each",
        passengers: [
          "Dimosthenis Minas",
          "Antonios Lymperis",
          "Nantia Baimpa",
          "Panagiota Chnari",
        ],
      },
    },
    {
      id: "day-02",
      date: "2026-08-03",
      label: "Mon 3 Aug",
      city: "Saint Petersburg",
      country: "Russia",
      title: "SPb day 1 — couch TBD",
      summary:
        "First full day in Saint Petersburg. Sleeping arrangements still a mystery novel Nadia is writing in real time.",
      whereWeAre: "Saint Petersburg · beds: TBD (Nadia on it)",
      status: "planned",
      notes: [
        "Stay window: ~3–4 days in SPb total.",
        "Living status: none yet — Nadia checking free hosting options.",
      ],
      todos: [
        "PENDING: confirm free living / host in SPb (Nadia)",
        "Drop a meetup pin once we know the neighborhood",
      ],
    },
    {
      id: "day-03",
      date: "2026-08-04",
      label: "Tue 4 Aug",
      city: "Saint Petersburg",
      country: "Russia",
      title: "SPb day 2 — still floating",
      summary:
        "Walk the city, eat something loud, pretend we always knew where we were sleeping.",
      whereWeAre: "Saint Petersburg",
      status: "planned",
      notes: ["Fill in must-sees once the crew votes."],
      todos: ["Pick a big daytime mission (museum / canals / chaos)"],
    },
    {
      id: "day-04",
      date: "2026-08-05",
      label: "Wed 5 Aug",
      city: "Saint Petersburg",
      country: "Russia",
      title: "SPb day 3 — plot thickening",
      summary:
        "Deep in Peterburg mode. Start eyeing the Moscow train before it becomes a ‘we forgot’ meme.",
      whereWeAre: "Saint Petersburg",
      status: "planned",
      notes: ["Aiming for 3–4 nights here — midpoint of the SPb arc."],
      todos: [
        "PENDING: research SPb → Moscow train options",
        "Decide exact departure day (day 3 vs day 4)",
      ],
    },
    {
      id: "day-05",
      date: "2026-08-06",
      label: "Thu 6 Aug",
      city: "Saint Petersburg",
      country: "Russia",
      title: "SPb day 4 · maybe exit",
      summary:
        "Buffer / leave day. If the train’s tonight, we roll. If not, one more Peterburg sunrise.",
      whereWeAre: "Saint Petersburg → (maybe) Moscow train",
      status: "tbd",
      notes: ["Flexible day — stay or ride depending on tickets + housing news."],
      todos: [
        "PENDING: buy SPb → Moscow train tickets",
        "Confirm Moscow arrival night plan",
      ],
    },
    {
      id: "day-06",
      date: "2026-08-07",
      label: "Fri 7 Aug",
      city: "Moscow",
      country: "Russia",
      title: "Moscow landing",
      summary:
        "Capital arc begins. Nadia & Giota crash at Shen’s. Boys: pending host magic (Nadia already asked).",
      whereWeAre: "Moscow · Nadia & Giota @ Shen · boys TBD",
      status: "planned",
      notes: [
        "Nadia + Giota: staying with Shen.",
        "Dimos + Antonios: Nadia asked if someone can host us too — waiting on the answer.",
      ],
      todos: [
        "PENDING: confirm host for Dimos + Antonios in Moscow",
        "Share Shen meetup details with the crew",
      ],
    },
    {
      id: "day-07",
      date: "2026-08-08",
      label: "Sat 8 Aug",
      city: "Moscow",
      country: "Russia",
      title: "Moscow day — roam mode",
      summary:
        "City day. Tomorrow we leave from Yaroslavsky at 13:20 — know how to get there.",
      whereWeAre: "Moscow",
      status: "planned",
      notes: [
        "Tomorrow: train 070ЯА Moscow → Yekaterinburg.",
        "Yaroslavsky station · Komsomolskaya metro.",
      ],
      todos: ["Scout route to Yaroslavsky / metro Komsomolskaya"],
    },
    {
      id: "day-08",
      date: "2026-08-09",
      label: "Sun 9 Aug",
      city: "Moscow → Yek",
      country: "Russia",
      title: "First big train — Trans-Sib ignition",
      summary:
        "We leave Moscow Yaroslavsky at 13:20 on train 070ЯА. Next stop: Yekaterinburg tomorrow night.",
      whereWeAre: "On train 070ЯА · Moscow → Yekaterinburg",
      status: "confirmed",
      notes: [
        "Depart Yaroslavsky 13:20 · arrive Ekaterinburg-Passajirs 21:34 next day.",
        "Car 02, four of us in one compartment.",
      ],
      todos: [
        "Be at the station ~12:40",
        "PDF / phone tickets ready + passports",
      ],
      train: moscowYekTrain,
    },
    {
      id: "day-09",
      date: "2026-08-10",
      label: "Mon 10 Aug",
      city: "Yekaterinburg",
      country: "Russia",
      title: "Roll into Yek — hotel locked",
      summary:
        "Arrive Ekaterinburg-Passajirs 21:34, then walk/taxi to Hotel Sverdlova 27. One night for all four.",
      whereWeAre: "Yekaterinburg · Hotel Sverdlova 27",
      status: "confirmed",
      notes: [
        "Train in 21:34 · hotel check-in from 14:00 (late arrival OK).",
        "Hotel: ul. Sverdlova 27 · booking 20260810-3652-452541120 · access code R69JWDN.",
        "NOT PAID YET — pay 13,600 RUB at the hotel on check-in. Breakfast included.",
        "Next train out tomorrow 21:58 to Irkutsk — checkout by 12:00.",
      ],
      todos: [
        "Pay 13,600 RUB at hotel check-in (not paid online)",
        "Go hotel → drop bags",
        "Keep booking number + access code handy",
      ],
      train: moscowYekTrain,
      stay: yekaterinburgHotel,
    },
    {
      id: "day-10",
      date: "2026-08-11",
      label: "Tue 11 Aug",
      city: "Yek → Irkutsk",
      country: "Russia",
      title: "Checkout · night train #2",
      summary:
        "Hotel checkout by 12:00. Evening train 082ИА at 21:58 toward Irkutsk.",
      whereWeAre: "Yekaterinburg → boarding 082ИА",
      status: "confirmed",
      notes: [
        "Hotel Sverdlova 27 checkout till 12:00.",
        "Depart Ekaterinburg-Passajirs 21:58 · arrive Irkutsk Pass 06:20 on 14 Aug.",
        "Car 10 · seats 014 / 016 / 018 / 020 (all upper).",
      ],
      todos: [
        "Checkout by 12:00",
        "Be at the station early evening",
        "Snacks + water for the long haul",
      ],
      train: yekIrkutskTrain,
      stay: yekaterinburgHotel,
    },
    {
      id: "day-11",
      date: "2026-08-12",
      label: "Wed 12 Aug",
      city: "On the train",
      country: "Russia",
      title: "Rails day — still rolling",
      summary: "Somewhere between the Urals and Baikal. Compartment life.",
      whereWeAre: "On train 082ИА · Yek → Irkutsk",
      status: "confirmed",
      notes: ["Travel day — no city stop."],
      todos: [],
      train: yekIrkutskTrain,
    },
    {
      id: "day-12",
      date: "2026-08-13",
      label: "Thu 13 Aug",
      city: "On the train",
      country: "Russia",
      title: "Rails day — almost Baikal",
      summary: "Last full day onboard before Irkutsk sunrise.",
      whereWeAre: "On train 082ИА · Yek → Irkutsk",
      status: "confirmed",
      notes: ["Arrive tomorrow 06:20 local."],
      todos: ["PENDING: lock housing for Irkutsk arrival"],
      train: yekIrkutskTrain,
    },
    {
      id: "day-13",
      date: "2026-08-14",
      label: "Fri 14 Aug",
      city: "Irkutsk",
      country: "Russia",
      title: "Irkutsk sunrise — couch still missing",
      summary:
        "Arrive Irkutsk Passazhirsky 06:20. We have not found a place to stay in Irkutsk yet.",
      whereWeAre: "Irkutsk · housing PENDING",
      status: "planned",
      notes: [
        "Station: Chelnokova 1.",
        "PENDING: find a place to stay when we arrive.",
        "We leave again 16 Aug 06:58 toward Ulaanbaatar.",
      ],
      todos: [
        "PENDING: find a place to stay in Irkutsk",
        "Coffee + first walk after 3 nights on a train",
      ],
      train: yekIrkutskTrain,
    },
    {
      id: "day-14",
      date: "2026-08-15",
      label: "Sat 15 Aug",
      city: "Irkutsk",
      country: "Russia",
      title: "Irkutsk day — Baikal orbit",
      summary: "One proper day on the ground. Tomorrow we leave early for Mongolia.",
      whereWeAre: "Irkutsk",
      status: "planned",
      notes: [
        "Next: train 306ЫА Irkutsk → Ulaanbaatar, depart 06:58 on 16 Aug.",
        "Passports required for the border train.",
      ],
      todos: [
        "Early night — 06:58 departure tomorrow",
        "Pack for border / Mongolia",
      ],
    },
    {
      id: "day-15",
      date: "2026-08-16",
      label: "Sun 16 Aug",
      city: "Irkutsk → UB",
      country: "Russia → Mongolia",
      title: "Leave Irkutsk → Ulaanbaatar",
      summary:
        "Train 306ЫА rolls out of Irkutsk Pass at 06:58. Border night. Ulaanbaatar tomorrow morning.",
      whereWeAre: "On train 306ЫА · Irkutsk → Ulaanbaatar",
      status: "confirmed",
      notes: [
        "Depart Irkutsk 06:58 · arrive Ulaanbaatar 06:38 on 17 Aug.",
        "Coach 02 · seats 001–004.",
        "Foreign passport mandatory.",
      ],
      todos: [
        "Be at Irkutsk Pass before 06:30",
        "PDF tickets + passports ready",
      ],
      train: irkutskUlaanbaatarTrain,
    },
    {
      id: "day-16",
      date: "2026-08-17",
      label: "Mon 17 Aug",
      city: "Ulaanbaatar",
      country: "Mongolia",
      title: "Ulaanbaatar — we made it",
      summary:
        "Arrive Ulaanbaatar railway station at 06:38. End of the Russian rail arc — Mongolia begins. Beds still not booked.",
      whereWeAre: "Ulaanbaatar · housing PENDING",
      status: "planned",
      notes: [
        "Arrival local time 06:38 on 17.08.2026.",
        "PENDING: book a place to stay in Ulaanbaatar.",
        "Nadia + Giota: return-to-Greece date still unknown.",
      ],
      todos: [
        "PENDING: book stay in Ulaanbaatar",
        "Figure out first hours in UB (sim / cash / beds)",
      ],
      train: irkutskUlaanbaatarTrain,
    },
    {
      id: "day-17",
      date: "2026-08-18",
      label: "Tue 18 Aug",
      city: "Ulaanbaatar",
      country: "Mongolia",
      title: "UB day — city mode",
      summary: "Full day in Ulaanbaatar. Fill in spots once the crew decides.",
      whereWeAre: "Ulaanbaatar · housing PENDING",
      status: "planned",
      notes: ["PENDING: still need a place to stay in UB."],
      todos: ["PENDING: book stay in Ulaanbaatar"],
    },
    {
      id: "day-18",
      date: "2026-08-19",
      label: "Wed 19 Aug",
      city: "Ulaanbaatar",
      country: "Mongolia",
      title: "UB day — last full crew night?",
      summary:
        "Tomorrow Dimos + Antonios fly to Beijing. Nadia + Giota still figuring their Greece exit.",
      whereWeAre: "Ulaanbaatar",
      status: "planned",
      notes: [
        "Tomorrow: CA956 UBN → PEK at 13:30 (Dimos + Antonios only).",
        "Nadia + Giota: leave-back-to-Greece date TBD.",
      ],
      todos: [
        "PENDING: book stay in Ulaanbaatar (if still open)",
        "Boys: pack for Beijing flight",
      ],
    },
    {
      id: "day-19",
      date: "2026-08-20",
      label: "Thu 20 Aug",
      city: "UB → Beijing",
      country: "Mongolia → China",
      title: "Split day — boys to Beijing",
      summary:
        "Dimos + Antonios: Air China CA956, Ulaanbaatar 13:30 → Beijing 15:30 same day. Nadia + Giota: still no locked return to Greece.",
      whereWeAre: "Dimos + Antonios → Beijing · Nadia + Giota TBD",
      status: "confirmed",
      crewIds: ["dimo", "antonios"],
      notes: [
        "Flight locked for Dimos + Antonios only.",
        "Booking PV3MJ5 · customer ref 40-1043941374 · PIN 6209.",
        "PENDING: place to stay in Beijing.",
        "Both Dimos and Antonios have China → Athens return tickets booked.",
        "Nadia + Giota: departure back to Greece still unknown.",
      ],
      todos: [
        "PENDING: book Beijing stay",
        "Be at UBN with time to spare before 13:30",
      ],
      flight: ulaanbaatarBeijingFlight,
    },
    {
      id: "day-20",
      date: "2026-08-21",
      label: "Fri 21 Aug",
      city: "Beijing",
      country: "China",
      title: "Beijing day",
      summary:
        "Boys on the ground in Beijing. Housing not booked. Both returns to Athens are booked.",
      whereWeAre: "Beijing · Dimos + Antonios · housing PENDING",
      status: "planned",
      crewIds: ["dimo", "antonios"],
      notes: [
        "PENDING: where to stay in Beijing.",
        "Dimos: return locked — PKX 24 Aug 21:30 → ATH 25 Aug 13:45.",
        "Antonios: China → Athens return booked (add PDF for full details).",
      ],
      todos: ["PENDING: book Beijing stay"],
    },
    {
      id: "day-21",
      date: "2026-08-22",
      label: "Sat 22 Aug",
      city: "Beijing",
      country: "China",
      title: "Beijing day",
      summary: "City day in Beijing. Housing still pending.",
      whereWeAre: "Beijing · housing PENDING",
      status: "planned",
      crewIds: ["dimo", "antonios"],
      notes: ["PENDING: housing in Beijing."],
      todos: ["PENDING: book Beijing stay"],
    },
    {
      id: "day-22",
      date: "2026-08-23",
      label: "Sun 23 Aug",
      city: "Beijing",
      country: "China",
      title: "Beijing — day before Dimos flies",
      summary:
        "Dimos leaves tomorrow night from Beijing Daxing (PKX). Get to the right airport.",
      whereWeAre: "Beijing",
      status: "planned",
      crewIds: ["dimo", "antonios"],
      notes: [
        "Tomorrow: Dimos SV887 / SV191 from PKX at 21:30.",
        "Airport is Daxing (PKX), not Capital (PEK).",
      ],
      todos: [
        "PENDING: book Beijing stay (if still open)",
        "Route to PKX for tomorrow evening",
      ],
    },
    {
      id: "day-23",
      date: "2026-08-24",
      label: "Mon 24 Aug",
      city: "Beijing → Athens",
      country: "China → Greece",
      title: "Dimos flies home",
      summary:
        "Dimos: Saudia from Beijing Daxing 21:30, arrives Athens next day 13:45. Antonios also has his China → Athens ticket booked.",
      whereWeAre: "Dimos → ATH overnight · Antonios return booked",
      status: "confirmed",
      crewIds: ["dimo"],
      notes: [
        "Booking ADWBGQ · customer ref 40-1044640247 · PIN 7977.",
        "Flights SV887 + SV191 · 1 stop · 21h 15m.",
        "Flexible ticket included.",
        "Antonios return: booked (PDF/details to add).",
      ],
      todos: [
        "Be at PKX early for 21:30 departure",
        "PDF + passport ready",
      ],
      flight: beijingAthensFlight,
    },
    {
      id: "day-24",
      date: "2026-08-25",
      label: "Tue 25 Aug",
      city: "Athens",
      country: "Greece",
      title: "Dimos lands ATH",
      summary: "Arrive Athens 13:45. Trip closed for Dimos.",
      whereWeAre: "Athens · Dimos home",
      status: "confirmed",
      crewIds: ["dimo"],
      notes: ["Arrival ATH 13:45 local on 25.08.2026."],
      todos: [],
      flight: beijingAthensFlight,
    },
  ],
};

/** Pick the day that matches “today”, else the first day of the trip. */
export function getActiveDay(days: DayStop[], now = new Date()): DayStop {
  const iso = now.toISOString().slice(0, 10);
  const match = days.find((d) => d.date === iso);
  if (match) return match;
  if (iso < days[0].date) return days[0];
  const last = days[days.length - 1];
  if (iso > last.date) return last;
  return days.find((d) => d.date >= iso) ?? days[0];
}
