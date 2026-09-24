"use client";

import "leaflet/dist/leaflet.css";
import type { LatLngTuple, Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";

import { examCoords, fits, hotelCoords, places, type Fit, type Place } from "@/lib/raleigh";

// Tailwind picks these class names up from this file; Leaflet renders them as marker HTML.
const fitOrder: readonly Fit[] = ["break", "half-day", "evening"];
const dotClass: Readonly<Record<Fit, string>> = {
  break: "bg-pine",
  "half-day": "bg-sky-bright",
  evening: "bg-ochre-bright",
};

const osmAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const cartoKey = process.env.NEXT_PUBLIC_CARTO_KEY ?? "";

/**
 * CARTO's Voyager basemap reads clearly for trip planning but needs a (free) key. Without
 * one, fall back to OpenStreetMap's standard tiles, which need none.
 */
const tiles =
  cartoKey === ""
    ? {
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: osmAttribution,
        carto: false,
      }
    : {
        url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(cartoKey)}`,
        attribution: `${osmAttribution} &copy; <a href="https://carto.com/attributions">CARTO</a>`,
        carto: true,
      };

function toLatLng(coords: readonly [number, number]): LatLngTuple {
  return [coords[0], coords[1]];
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function placeMarkerHtml(place: Place) {
  const ring = place.planned === undefined ? "" : "ring-2 ring-ink ring-offset-2";
  return `<span class="block size-4 rounded-full border-2 border-white shadow-card ${dotClass[place.fit]} ${ring}"></span>`;
}

function popupHtml(place: Place) {
  const planned =
    place.planned === undefined
      ? ""
      : `<span class="mt-1 block text-xs font-semibold text-pine-deep">In your plan · ${escapeHtml(place.planned.label)}</span>`;
  return `<span class="block font-sans">
    <strong class="block font-display text-base font-normal leading-snug text-ink">${escapeHtml(place.name)}</strong>
    <span class="block text-xs text-muted">${escapeHtml(place.fromHotel)} · ${escapeHtml(fits[place.fit])}</span>
    ${planned}
    <a class="mt-2 inline-block text-xs font-medium text-pine" href="#${place.id}">See details ↓</a>
  </span>`;
}

/** A real street map of every place in the guide, with the hotel and exam center marked. */
export function RaleighMap() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    let map: LeafletMap | undefined;
    let cancelled = false;

    // Leaflet touches `window` when it loads, so it is imported only in the browser.
    async function mount() {
      if (container === null) {
        return;
      }
      const { default: L } = await import("leaflet");
      if (cancelled) {
        return;
      }
      {
        map = new L.Map(container, {
          scrollWheelZoom: false,
          zoomControl: true,
          attributionControl: true,
        });
        L.tileLayer(tiles.url, {
          attribution: tiles.attribution,
          maxZoom: 19,
        }).addTo(map);

        // About a five-minute walk.
        L.circle(toLatLng(hotelCoords), {
          radius: 400,
          color: "#2d5a4a",
          weight: 1,
          fillColor: "#2d5a4a",
          fillOpacity: 0.08,
          interactive: false,
        }).addTo(map);

        L.marker(toLatLng(examCoords), {
          icon: L.divIcon({
            className: "",
            html: '<span class="flex items-center gap-1.5 whitespace-nowrap"><span class="block size-3 rounded-full border-2 border-white bg-cardinal shadow-card"></span><span class="rounded-full bg-cardinal px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-white">EXAM</span></span>',
            iconSize: [70, 16],
            iconAnchor: [6, 8],
          }),
          keyboard: false,
          interactive: false,
          zIndexOffset: 900,
        }).addTo(map);

        L.marker(toLatLng(hotelCoords), {
          icon: L.divIcon({
            className: "",
            html: '<span class="grid size-8 place-items-center rounded-full border-2 border-white bg-ink text-white shadow-lift"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21H3z"/></svg></span>',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          }),
          title: "Hyatt House North Hills (your hotel)",
          alt: "Your hotel",
          zIndexOffset: 1000,
        })
          .bindPopup(
            '<strong class="block font-display text-base font-normal">Hyatt House North Hills</strong><span class="text-xs text-muted">Home base · the exam is a 5-minute walk</span>',
          )
          .addTo(map);

        for (const place of places) {
          L.marker(toLatLng(place.coords), {
            icon: L.divIcon({
              className: "",
              html: placeMarkerHtml(place),
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            }),
            title: place.name,
            alt: place.name,
            riseOnHover: true,
          })
            .bindPopup(popupHtml(place), { closeButton: false, offset: [0, -4] })
            .addTo(map);
        }

        map.fitBounds(
          L.latLngBounds([toLatLng(hotelCoords), ...places.map((place) => toLatLng(place.coords))]),
          { padding: [28, 28] },
        );
      }
    }
    mount().catch(() => {
      if (container !== null) {
        container.dataset.failed = "true";
      }
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <figure className="relative">
      <section
        ref={containerRef}
        className={`group/map relative z-0 aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-sunk shadow-card data-[failed=true]:after:absolute data-[failed=true]:after:inset-0 data-[failed=true]:after:grid data-[failed=true]:after:place-items-center data-[failed=true]:after:p-6 data-[failed=true]:after:text-center data-[failed=true]:after:text-sm data-[failed=true]:after:text-muted data-[failed=true]:after:content-['The_map_could_not_load._Every_place_is_listed_below_with_directions.'] ${tiles.carto ? "" : "[&_.leaflet-tile-pane]:[filter:grayscale(1)_sepia(0.25)_hue-rotate(95deg)_saturate(0.6)_brightness(1.04)_contrast(0.9)]"} [&_.leaflet-popup-content-wrapper]:rounded-lg [&_.leaflet-popup-content-wrapper]:shadow-lift`}
        aria-label="Map of places in this guide around Raleigh"
      />
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-ink" aria-hidden="true" /> Hotel
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-cardinal" aria-hidden="true" /> Exam
        </span>
        {fitOrder.map((fit) => (
          <span className="inline-flex items-center gap-2" key={fit}>
            <span className={`size-3 rounded-full ${dotClass[fit]}`} aria-hidden="true" />
            {fits[fit]}
          </span>
        ))}
        <span className="inline-flex items-center gap-2">
          <span
            className="size-3 rounded-full bg-surface ring-2 ring-ink ring-offset-1"
            aria-hidden="true"
          />
          In your plan
        </span>
      </figcaption>
    </figure>
  );
}
