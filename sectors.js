/* ============================================================
   Sector registry — fixed brand configuration.
   Colour, logo and route are structural (not admin-editable);
   all *content* for these entities lives in data/defaults.js
   and is fully editable from /admin.
   ============================================================ */

import { LOGO } from './assets';

export const ENTITY_IDS = ['iit', 'soi', 'cafe', 'ics'];
export const ALL_ENTITY_IDS = [...ENTITY_IDS, 'software'];

export const sectors = {
  iit: {
    id: 'iit',
    slug: 'information-technology',
    logo: LOGO.iit,
    order: 1,
    code: 'IIT',
    theme: {
      // deep navy / steel / signal blue — engineering precision
      bg: '#08182C',
      bgSoft: '#0D2440',
      surface: '#102B4C',
      fg: '#EAF1F8',
      muted: '#9FB6CC',
      accent: '#3FA0FF',
      accentSoft: 'rgba(63,160,255,0.14)',
      rule: 'rgba(234,241,248,0.14)',
      onLight: '#0B2545',
      mode: 'dark',
    },
  },
  soi: {
    id: 'soi',
    slug: 'school-of-intelligence',
    logo: LOGO.soi,
    order: 2,
    code: 'SOI',
    theme: {
      // midnight + gold — academic, ceremonial
      bg: '#050D1F',
      bgSoft: '#0A162E',
      surface: '#0F1D3A',
      fg: '#F3EEE1',
      muted: '#B4A87F',
      accent: '#D8A93A',
      accentSoft: 'rgba(216,169,58,0.15)',
      rule: 'rgba(243,238,225,0.14)',
      onLight: '#0A162E',
      mode: 'dark',
    },
  },
  cafe: {
    id: 'cafe',
    slug: 'cafe',
    logo: LOGO.cafe,
    order: 3,
    code: 'CAFÉ',
    theme: {
      // cream paper, espresso ink, leaf green — hospitality warmth
      bg: '#F7F2E8',
      bgSoft: '#F0E9DB',
      surface: '#FFFFFF',
      fg: '#2E1C12',
      muted: '#7A6350',
      accent: '#2F5D3A',
      accentSoft: 'rgba(47,93,58,0.10)',
      rule: 'rgba(46,28,18,0.14)',
      onLight: '#3A2318',
      mode: 'light',
    },
  },
  ics: {
    id: 'ics',
    slug: 'consultancy-services',
    logo: LOGO.ics,
    order: 4,
    code: 'ICS',
    theme: {
      // ivory, navy, restrained gold — professional services
      bg: '#F4F2ED',
      bgSoft: '#EBE7DE',
      surface: '#FFFFFF',
      fg: '#10233D',
      muted: '#5C6C80',
      accent: '#B08D3C',
      accentSoft: 'rgba(176,141,60,0.12)',
      rule: 'rgba(16,35,61,0.14)',
      onLight: '#10233D',
      mode: 'light',
    },
  },
  software: {
    id: 'software',
    slug: 'inera-software',
    logo: LOGO.software,
    order: 5,
    code: 'ISPL',
    theme: {
      bg: '#0A0A0C',
      bgSoft: '#121216',
      surface: '#191920',
      fg: '#F3F0E9',
      muted: '#A29C90',
      accent: '#C09B3A',
      accentSoft: 'rgba(192,155,58,0.14)',
      rule: 'rgba(243,240,233,0.13)',
      onLight: '#0A0A0C',
      mode: 'dark',
    },
  },
};

export const sectorList = ENTITY_IDS.map((id) => sectors[id]);

export const routeToEntity = Object.fromEntries(
  ALL_ENTITY_IDS.map((id) => [sectors[id].slug, id])
);

export function entityPath(id) {
  return `/${sectors[id].slug}`;
}
