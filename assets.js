/* ============================================================
   Every image used by the site, imported so the build bundles
   them. Because this project is deliberately kept as one flat
   folder (no sub-folders at all), there is no /public directory
   and images are ordinary modules.
   ============================================================ */

import groupLogo from './logo-group.png';
import iitLogo from './logo-iit.png';
import soiLogo from './logo-soi.png';
import cafeLogo from './logo-cafe.png';
import icsLogo from './logo-ics.png';
import softwareLogo from './logo-software.png';
import favicon from './favicon.png';

import chandan from './team-chandan.jpg';
import kumar from './team-kumar.jpg';
import shivani from './team-shivani.png';
import sarvesh from './team-sarvesh.jpg';

export const LOGO = {
  group: groupLogo,
  iit: iitLogo,
  soi: soiLogo,
  cafe: cafeLogo,
  ics: icsLogo,
  software: softwareLogo,
  favicon,
};

export const TEAM = { chandan, kumar, shivani, sarvesh };

export default { LOGO, TEAM };
