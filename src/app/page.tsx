"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getActiveDay,
  trip,
  type DayStop,
  type Quest,
  type StayInfo,
  type TrainInfo,
} from "@/data/trip";
import styles from "./page.module.css";

function StayCard({ stay }: { stay: StayInfo }) {
  return (
    <div className={styles.stay}>
      <div className={styles.flightTop}>
        <span>Hotel</span>
        <strong>{stay.name}</strong>
        <span className={styles.flightRef}>No. {stay.bookingNo}</span>
      </div>

      <div className={styles.stayGrid}>
        <div>
          <h4 className={styles.blockTitle}>Check-in</h4>
          <p className={styles.stayValue}>{stay.checkIn}</p>
        </div>
        <div>
          <h4 className={styles.blockTitle}>Check-out</h4>
          <p className={styles.stayValue}>{stay.checkOut}</p>
        </div>
        <div>
          <h4 className={styles.blockTitle}>Room</h4>
          <p className={styles.stayValue}>
            {stay.roomType} · {stay.rooms} room · {stay.guests} guests ·{" "}
            {stay.nights} night
          </p>
        </div>
        <div>
          <h4 className={styles.blockTitle}>Access code</h4>
          <p className={styles.stayValue}>{stay.accessCode}</p>
        </div>
      </div>

      <div className={styles.stationBlock}>
        <div>
          <h4 className={styles.blockTitle}>Address</h4>
          <p className={styles.stationName}>{stay.name}</p>
          <p className={styles.stationAddr}>{stay.address}</p>
          <a
            className={styles.mapLink}
            href={stay.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Yandex Maps
          </a>
        </div>
        <div>
          <h4 className={styles.blockTitle}>Contact</h4>
          <ul className={styles.flightMeta}>
            {stay.phone.map((p) => (
              <li key={p}>{p}</li>
            ))}
            <li>{stay.email}</li>
            <li>Guest on booking: {stay.guestName}</li>
          </ul>
        </div>
      </div>

      <ul className={styles.flightMeta}>
        <li>{stay.included.join(" · ")}</li>
        <li>Total {stay.total}</li>
        <li>{stay.payment}</li>
      </ul>

      {stay.notes.length > 0 && (
        <ul className={styles.list}>
          {stay.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}

      <a className={styles.pdfBtn} href={stay.pdfUrl} download>
        {stay.pdfLabel}
      </a>
    </div>
  );
}

function TrainCard({ train }: { train: TrainInfo }) {
  return (
    <div className={styles.train}>
      <div className={styles.flightTop}>
        <span>{train.label}</span>
        <strong>{train.trainNumber}</strong>
        <span className={styles.flightRef}>{train.orderRef}</span>
      </div>

      <div className={styles.flightRoute}>
        <div>
          <span className={styles.flightTime}>{train.from.time}</span>
          <span className={styles.flightCity}>{train.from.city}</span>
          <span className={styles.flightCode}>{train.departDate}</span>
        </div>
        <div className={styles.flightLine} aria-hidden>
          <span />
        </div>
        <div>
          <span className={styles.flightTime}>{train.to.time}</span>
          <span className={styles.flightCity}>{train.to.city}</span>
          <span className={styles.flightCode}>{train.arriveDate}</span>
        </div>
      </div>

      <ul className={styles.flightMeta}>
        <li>{train.travelTime}</li>
        <li>{train.carType}</li>
      </ul>

      <div className={styles.stationBlock}>
        <div>
          <h4 className={styles.blockTitle}>Depart</h4>
          <p className={styles.stationName}>{train.from.name}</p>
          <p className={styles.stationAddr}>{train.from.address}</p>
          {train.from.metroTip && (
            <p className={styles.stationTip}>{train.from.metroTip}</p>
          )}
          <a
            className={styles.mapLink}
            href={train.from.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Yandex Maps
          </a>
        </div>
        <div>
          <h4 className={styles.blockTitle}>Arrive</h4>
          <p className={styles.stationName}>{train.to.name}</p>
          <p className={styles.stationAddr}>{train.to.address}</p>
          {train.to.metroTip && (
            <p className={styles.stationTip}>{train.to.metroTip}</p>
          )}
          <a
            className={styles.mapLink}
            href={train.to.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Yandex Maps
          </a>
        </div>
      </div>

      <div className={styles.seatsBlock}>
        <h4 className={styles.blockTitle}>Seats</h4>
        <ul className={styles.seatList}>
          {train.seats.map((s) => (
            <li key={`${s.name}-${s.seat}`}>
              <span>{s.name}</span>
              <span>
                Car {s.car} · Seat {s.seat}
                {s.berth && s.berth !== "—" ? ` · ${s.berth}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {train.notes.length > 0 && (
        <ul className={styles.list}>
          {train.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}

      <a className={styles.pdfBtn} href={train.pdfUrl} download>
        {train.pdfLabel}
      </a>
    </div>
  );
}

function statusLabel(status: DayStop["status"]) {
  if (status === "confirmed") return "Locked in";
  if (status === "planned") return "Planned";
  return "To fill in";
}

function dayParts(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return {
    weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
    day: String(d.getDate()),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
  };
}

function questLabel(status: Quest["status"]) {
  if (status === "done") return "Done";
  if (status === "cooking") return "In progress";
  return "Not yet";
}

function QuestIcon({ type }: { type: Quest["icon"] }) {
  if (type === "ticket") {
    return (
      <svg className={styles.questIcon} viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M20 6H4a2 2 0 0 0-2 2v2.5a1.5 1.5 0 1 1 0 3V16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1.5 1.5 0 1 1 0-3V8a2 2 0 0 0-2-2Zm-1 4.2-1.2 1.2L19 12.6l1.2-1.2L19 10.2ZM9 9h6v1.5H9V9Zm0 4.5h6V15H9v-1.5Z"
        />
      </svg>
    );
  }
  return (
    <svg className={styles.questIcon} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 3.2 3.5 10.2V21h6.2v-6.1h4.6V21h6.2V10.2L12 3.2Zm0 2.4 6.5 5.3V19h-2.8v-6.1H8.3V19H5.5v-8.1L12 5.6Z"
      />
    </svg>
  );
}

export default function Home() {
  const defaultDay = useMemo(() => getActiveDay(trip.days), []);
  const [selectedId, setSelectedId] = useState(defaultDay.id);
  const selected = trip.days.find((d) => d.id === selectedId) ?? trip.days[0];
  const crewOnDay =
    selected.crewIds?.map((id) => trip.crew.find((c) => c.id === id)!).filter(Boolean) ??
    trip.crew;
  const activeChipRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeChipRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedId]);

  return (
    <div className={styles.shell}>
      <div className={styles.atmosphere} aria-hidden />

      <header className={styles.topbar}>
        <a className={styles.brand} href="#top">
          <img src="/logo.svg" alt="" width={28} height={28} className={styles.brandMark} />
          <span className={styles.brandText}>Northbound</span>
        </a>
        <nav className={styles.nav}>
          <a href="#board">Board</a>
          <a href="#quests">Needed</a>
          <a href="#crew">Crew</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroBrand}>
            <img
              src="/logo.svg"
              alt=""
              width={56}
              height={56}
              className={styles.heroMark}
            />
            <p className={`${styles.kicker} ${styles.kickerShort}`}>
              August 2026 · Tallinn → Beijing
            </p>
            <p className={`${styles.kicker} ${styles.kickerFull}`}>
              August 2026 · Tallinn → SPb → Moscow → Yek → Irkutsk → UB → Beijing
            </p>
          </div>
          <h1 className={styles.title}>Northbound</h1>
          <p className={styles.tagline}>{trip.tagline}</p>
          <div className={styles.heroActions}>
            <a className={styles.btnPrimary} href="#board">
              Open the board
            </a>
            <a className={styles.btnGhost} href="#quests">
              Still needed
            </a>
          </div>
        </section>

        <section className={styles.nowStrip} aria-label="Where we are">
          <div className={styles.nowInner}>
            <span className={styles.nowLabel}>Where we are</span>
            <p className={styles.nowText}>{defaultDay.whereWeAre}</p>
            <span className={styles.nowMeta}>
              {defaultDay.label} · {defaultDay.city}
              {defaultDay.country !== "—" ? `, ${defaultDay.country}` : ""}
            </span>
          </div>
        </section>

        <section id="board" className={styles.board}>
          <div className={styles.sectionHead}>
            <h2>Day board</h2>
            <p>Tap a day. Everyone sees the same plan.</p>
          </div>

          <div className={styles.boardGrid}>
            <div className={styles.dayRail} role="tablist" aria-label="Trip days">
              {trip.days.map((day) => {
                const active = day.id === selected.id;
                const parts = dayParts(day.date);
                return (
                  <button
                    key={day.id}
                    ref={active ? activeChipRef : null}
                    role="tab"
                    aria-selected={active}
                    aria-label={day.label}
                    className={`${styles.dayChip} ${active ? styles.dayChipActive : ""}`}
                    onClick={() => setSelectedId(day.id)}
                  >
                    <span className={styles.dayWeekday}>{parts.weekday}</span>
                    <span className={styles.dayNum}>{parts.day}</span>
                    <span className={styles.dayMonth}>{parts.month}</span>
                  </button>
                );
              })}
            </div>

            <article className={styles.dayPanel} role="tabpanel">
              <header className={styles.panelHead}>
                <div>
                  <p className={styles.panelKicker}>
                    {selected.label}
                    <span className={styles.dot}>·</span>
                    <span className={styles[`badge_${selected.status}`]}>
                      {statusLabel(selected.status)}
                    </span>
                  </p>
                  <h3 className={styles.panelTitle}>{selected.title}</h3>
                  <p className={styles.panelPlace}>
                    {selected.city}
                    {selected.country !== "—" ? ` · ${selected.country}` : ""}
                  </p>
                </div>
                <p className={styles.wherePill}>{selected.whereWeAre}</p>
              </header>

              <p className={styles.panelSummary}>{selected.summary}</p>

              {selected.flight && (
                <div className={styles.flight}>
                  <div className={styles.flightTop}>
                    <span>Flight</span>
                    <strong>{selected.flight.flightNumber}</strong>
                    <span className={styles.flightRef}>
                      Ref {selected.flight.bookingRef}
                    </span>
                  </div>
                  <div className={styles.flightRoute}>
                    <div>
                      <span className={styles.flightTime}>{selected.flight.from.time}</span>
                      <span className={styles.flightCity}>
                        {selected.flight.from.city}
                      </span>
                      <span className={styles.flightCode}>
                        {selected.flight.from.code}
                        {selected.flight.from.airport
                          ? ` · ${selected.flight.from.airport}`
                          : ""}
                      </span>
                    </div>
                    <div className={styles.flightLine} aria-hidden>
                      <span />
                    </div>
                    <div>
                      <span className={styles.flightTime}>{selected.flight.to.time}</span>
                      <span className={styles.flightCity}>{selected.flight.to.city}</span>
                      <span className={styles.flightCode}>
                        {selected.flight.to.code}
                        {selected.flight.to.airport
                          ? ` · ${selected.flight.to.airport}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <ul className={styles.flightMeta}>
                    <li>
                      {selected.flight.airline}
                      {selected.flight.aircraft ? ` · ${selected.flight.aircraft}` : ""}
                    </li>
                    {selected.flight.duration && <li>{selected.flight.duration}</li>}
                    <li>{selected.flight.fare}</li>
                    <li>{selected.flight.baggage}</li>
                    <li>{selected.flight.date}</li>
                    {selected.flight.customerRef && (
                      <li>Customer {selected.flight.customerRef}</li>
                    )}
                    {selected.flight.pin && <li>PIN {selected.flight.pin}</li>}
                  </ul>
                  {selected.flight.passengers.length > 0 && (
                    <div className={styles.seatsBlock}>
                      <h4 className={styles.blockTitle}>Travelers</h4>
                      <ul className={styles.seatList}>
                        {selected.flight.passengers.map((p) => (
                          <li key={p}>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selected.flight.notes && selected.flight.notes.length > 0 && (
                    <ul className={styles.list}>
                      {selected.flight.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  )}
                  {selected.flight.pdfUrl && (
                    <a className={styles.pdfBtn} href={selected.flight.pdfUrl} download>
                      {selected.flight.pdfLabel ?? "Download booking PDF"}
                    </a>
                  )}
                </div>
              )}

              {selected.train && <TrainCard train={selected.train} />}

              {selected.stay && <StayCard stay={selected.stay} />}

              <div className={styles.twoCol}>
                <div>
                  <h4 className={styles.blockTitle}>Notes</h4>
                  {selected.notes.length ? (
                    <ul className={styles.list}>
                      {selected.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.empty}>No notes yet — add them in the trip data file.</p>
                  )}
                </div>
                <div>
                  <h4 className={styles.blockTitle}>To do</h4>
                  {selected.todos.length ? (
                    <ul className={styles.list}>
                      {selected.todos.map((t) => (
                        <li
                          key={t}
                          className={t.startsWith("PENDING") ? styles.pendingItem : undefined}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.empty}>Nothing listed for this day.</p>
                  )}
                </div>
              </div>

              <div className={styles.crewOnDay}>
                <h4 className={styles.blockTitle}>On this day</h4>
                <ul className={styles.crewPills}>
                  {crewOnDay.map((c) => (
                    <li key={c.id}>{c.shortName}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="quests" className={styles.quests}>
          <div className={styles.sectionHead}>
            <h2>Still needed</h2>
            <p>Housing and tickets we have not sorted yet.</p>
          </div>
          <ul className={styles.questGrid}>
            {trip.quests.map((quest) => (
              <li
                key={quest.id}
                className={`${styles.questCard} ${styles[`quest_${quest.status}`]}`}
              >
                <div className={styles.questTop}>
                  <span className={styles.questIconWrap}>
                    <QuestIcon type={quest.icon} />
                    <span className={styles.questStatus}>{questLabel(quest.status)}</span>
                  </span>
                  {quest.owner && (
                    <span className={styles.questOwner}>{quest.owner}</span>
                  )}
                </div>
                <h3 className={styles.questTitle}>{quest.title}</h3>
                <p className={styles.questDetail}>{quest.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="crew" className={styles.crew}>
          <div className={styles.sectionHead}>
            <h2>The crew</h2>
            <p>Four of us. Same chaos. Same board.</p>
          </div>
          <ul className={styles.crewGrid}>
            {trip.crew.map((member) => (
              <li key={member.id} className={styles.crewCard}>
                <span className={styles.crewInitial}>
                  {member.shortName.slice(0, 1)}
                </span>
                <div>
                  <p className={styles.crewName}>{member.name}</p>
                  <p className={styles.crewShort}>{member.shortName}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Northbound</span>
        <span>
          {trip.startDate.replace(/-/g, ".")} → {trip.endDate.replace(/-/g, ".")}
        </span>
      </footer>
    </div>
  );
}
