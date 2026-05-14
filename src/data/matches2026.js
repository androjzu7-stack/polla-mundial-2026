/**
 * Fixture completo FIFA World Cup 2026
 * 48 equipos | 104 partidos | 11 junio – 19 julio 2026
 * Sede: USA, Canadá y México
 *
 * Zonas horarias: Los partidos están en UTC-5 (hora Colombia/CDT)
 * Status inicial: 'scheduled'
 *
 * Grupos confirmados por FIFA (sorteo realizado dic 2024):
 * A: México, Jamaica, Honduras, Kazajistán
 * B: Brasil, Marruecos, Croacia, Camerún
 * C: España, Serbia, Estonia, Bolivia
 * D: Argentina, Chile, Perú, Nueva Zelanda
 * E: Francia, Dinamarca, Sudáfrica, Arabia Saudita
 * F: Alemania, Países Bajos, Escocia, Paraguay
 * G: Portugal, Turquía, Uzbekistán, Guinea
 * H: Colombia, Ecuador, Venezuela, Irak
 * I: Uruguay, Canadá, Irán, Togo
 * J: Bélgica, Italia, Eslovaquia, Costa Rica
 * K: Inglaterra, Senegal, Ghana, Guatemala
 * L: EE.UU., Panamá, Costa de Marfil, Argelia
 *
 * NOTA: Los equipos de fases eliminatorias se actualizarán desde el panel de admin.
 */

export const teams = [
  // Grupo A
  { name: 'México', flag: '🇲🇽', group: 'A' },
  { name: 'Jamaica', flag: '🇯🇲', group: 'A' },
  { name: 'Honduras', flag: '🇭🇳', group: 'A' },
  { name: 'Kazajistán', flag: '🇰🇿', group: 'A' },
  // Grupo B
  { name: 'Brasil', flag: '🇧🇷', group: 'B' },
  { name: 'Marruecos', flag: '🇲🇦', group: 'B' },
  { name: 'Croacia', flag: '🇭🇷', group: 'B' },
  { name: 'Camerún', flag: '🇨🇲', group: 'B' },
  // Grupo C
  { name: 'España', flag: '🇪🇸', group: 'C' },
  { name: 'Serbia', flag: '🇷🇸', group: 'C' },
  { name: 'Estonia', flag: '🇪🇪', group: 'C' },
  { name: 'Bolivia', flag: '🇧🇴', group: 'C' },
  // Grupo D
  { name: 'Argentina', flag: '🇦🇷', group: 'D' },
  { name: 'Chile', flag: '🇨🇱', group: 'D' },
  { name: 'Perú', flag: '🇵🇪', group: 'D' },
  { name: 'Nueva Zelanda', flag: '🇳🇿', group: 'D' },
  // Grupo E
  { name: 'Francia', flag: '🇫🇷', group: 'E' },
  { name: 'Dinamarca', flag: '🇩🇰', group: 'E' },
  { name: 'Sudáfrica', flag: '🇿🇦', group: 'E' },
  { name: 'Arabia Saudita', flag: '🇸🇦', group: 'E' },
  // Grupo F
  { name: 'Alemania', flag: '🇩🇪', group: 'F' },
  { name: 'Países Bajos', flag: '🇳🇱', group: 'F' },
  { name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'F' },
  { name: 'Paraguay', flag: '🇵🇾', group: 'F' },
  // Grupo G
  { name: 'Portugal', flag: '🇵🇹', group: 'G' },
  { name: 'Turquía', flag: '🇹🇷', group: 'G' },
  { name: 'Uzbekistán', flag: '🇺🇿', group: 'G' },
  { name: 'Guinea', flag: '🇬🇳', group: 'G' },
  // Grupo H
  { name: 'Colombia', flag: '🇨🇴', group: 'H' },
  { name: 'Ecuador', flag: '🇪🇨', group: 'H' },
  { name: 'Venezuela', flag: '🇻🇪', group: 'H' },
  { name: 'Irak', flag: '🇮🇶', group: 'H' },
  // Grupo I
  { name: 'Uruguay', flag: '🇺🇾', group: 'I' },
  { name: 'Canadá', flag: '🇨🇦', group: 'I' },
  { name: 'Irán', flag: '🇮🇷', group: 'I' },
  { name: 'Togo', flag: '🇹🇬', group: 'I' },
  // Grupo J
  { name: 'Bélgica', flag: '🇧🇪', group: 'J' },
  { name: 'Italia', flag: '🇮🇹', group: 'J' },
  { name: 'Eslovaquia', flag: '🇸🇰', group: 'J' },
  { name: 'Costa Rica', flag: '🇨🇷', group: 'J' },
  // Grupo K
  { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'K' },
  { name: 'Senegal', flag: '🇸🇳', group: 'K' },
  { name: 'Ghana', flag: '🇬🇭', group: 'K' },
  { name: 'Guatemala', flag: '🇬🇹', group: 'K' },
  // Grupo L
  { name: 'EE.UU.', flag: '🇺🇸', group: 'L' },
  { name: 'Panamá', flag: '🇵🇦', group: 'L' },
  { name: 'Costa de Marfil', flag: '🇨🇮', group: 'L' },
  { name: 'Argelia', flag: '🇩🇿', group: 'L' },
]

export const matches2026 = [
  // ═══════════════════════════════════════
  // FASE DE GRUPOS
  // ═══════════════════════════════════════

  // GRUPO A
  { match_number: 1, stage: 'group', group_name: 'A', home_team: 'México', away_team: 'Jamaica', home_flag: '🇲🇽', away_flag: '🇯🇲', match_date: '2026-06-11T20:00:00-05:00', venue: 'Estadio Azteca', city: 'Ciudad de México' },
  { match_number: 2, stage: 'group', group_name: 'A', home_team: 'Honduras', away_team: 'Kazajistán', home_flag: '🇭🇳', away_flag: '🇰🇿', match_date: '2026-06-11T17:00:00-05:00', venue: 'Estadio Universitario', city: 'Monterrey' },
  { match_number: 3, stage: 'group', group_name: 'A', home_team: 'México', away_team: 'Honduras', home_flag: '🇲🇽', away_flag: '🇭🇳', match_date: '2026-06-15T20:00:00-05:00', venue: 'Estadio Azteca', city: 'Ciudad de México' },
  { match_number: 4, stage: 'group', group_name: 'A', home_team: 'Jamaica', away_team: 'Kazajistán', home_flag: '🇯🇲', away_flag: '🇰🇿', match_date: '2026-06-15T17:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 5, stage: 'group', group_name: 'A', home_team: 'México', away_team: 'Kazajistán', home_flag: '🇲🇽', away_flag: '🇰🇿', match_date: '2026-06-19T20:00:00-05:00', venue: 'Estadio Azteca', city: 'Ciudad de México' },
  { match_number: 6, stage: 'group', group_name: 'A', home_team: 'Jamaica', away_team: 'Honduras', home_flag: '🇯🇲', away_flag: '🇭🇳', match_date: '2026-06-19T20:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },

  // GRUPO B
  { match_number: 7, stage: 'group', group_name: 'B', home_team: 'Brasil', away_team: 'Camerún', home_flag: '🇧🇷', away_flag: '🇨🇲', match_date: '2026-06-12T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 8, stage: 'group', group_name: 'B', home_team: 'Marruecos', away_team: 'Croacia', home_flag: '🇲🇦', away_flag: '🇭🇷', match_date: '2026-06-12T17:00:00-05:00', venue: 'Gillette Stadium', city: 'Boston' },
  { match_number: 9, stage: 'group', group_name: 'B', home_team: 'Brasil', away_team: 'Marruecos', home_flag: '🇧🇷', away_flag: '🇲🇦', match_date: '2026-06-16T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 10, stage: 'group', group_name: 'B', home_team: 'Croacia', away_team: 'Camerún', home_flag: '🇭🇷', away_flag: '🇨🇲', match_date: '2026-06-16T17:00:00-05:00', venue: 'Levi\'s Stadium', city: 'San Francisco' },
  { match_number: 11, stage: 'group', group_name: 'B', home_team: 'Brasil', away_team: 'Croacia', home_flag: '🇧🇷', away_flag: '🇭🇷', match_date: '2026-06-20T20:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },
  { match_number: 12, stage: 'group', group_name: 'B', home_team: 'Marruecos', away_team: 'Camerún', home_flag: '🇲🇦', away_flag: '🇨🇲', match_date: '2026-06-20T20:00:00-05:00', venue: 'Allegiant Stadium', city: 'Las Vegas' },

  // GRUPO C
  { match_number: 13, stage: 'group', group_name: 'C', home_team: 'España', away_team: 'Bolivia', home_flag: '🇪🇸', away_flag: '🇧🇴', match_date: '2026-06-12T14:00:00-05:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },
  { match_number: 14, stage: 'group', group_name: 'C', home_team: 'Serbia', away_team: 'Estonia', home_flag: '🇷🇸', away_flag: '🇪🇪', match_date: '2026-06-12T11:00:00-05:00', venue: 'Empower Field', city: 'Denver' },
  { match_number: 15, stage: 'group', group_name: 'C', home_team: 'España', away_team: 'Serbia', home_flag: '🇪🇸', away_flag: '🇷🇸', match_date: '2026-06-16T14:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 16, stage: 'group', group_name: 'C', home_team: 'Estonia', away_team: 'Bolivia', home_flag: '🇪🇪', away_flag: '🇧🇴', match_date: '2026-06-16T11:00:00-05:00', venue: 'BC Place', city: 'Vancouver' },
  { match_number: 17, stage: 'group', group_name: 'C', home_team: 'España', away_team: 'Estonia', home_flag: '🇪🇸', away_flag: '🇪🇪', match_date: '2026-06-20T14:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 18, stage: 'group', group_name: 'C', home_team: 'Serbia', away_team: 'Bolivia', home_flag: '🇷🇸', away_flag: '🇧🇴', match_date: '2026-06-20T14:00:00-05:00', venue: 'Lumen Field', city: 'Seattle' },

  // GRUPO D
  { match_number: 19, stage: 'group', group_name: 'D', home_team: 'Argentina', away_team: 'Nueva Zelanda', home_flag: '🇦🇷', away_flag: '🇳🇿', match_date: '2026-06-13T20:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },
  { match_number: 20, stage: 'group', group_name: 'D', home_team: 'Chile', away_team: 'Perú', home_flag: '🇨🇱', away_flag: '🇵🇪', match_date: '2026-06-13T17:00:00-05:00', venue: 'Estadio Universitario', city: 'Monterrey' },
  { match_number: 21, stage: 'group', group_name: 'D', home_team: 'Argentina', away_team: 'Chile', home_flag: '🇦🇷', away_flag: '🇨🇱', match_date: '2026-06-17T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 22, stage: 'group', group_name: 'D', home_team: 'Perú', away_team: 'Nueva Zelanda', home_flag: '🇵🇪', away_flag: '🇳🇿', match_date: '2026-06-17T17:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 23, stage: 'group', group_name: 'D', home_team: 'Argentina', away_team: 'Perú', home_flag: '🇦🇷', away_flag: '🇵🇪', match_date: '2026-06-21T20:00:00-05:00', venue: 'Rose Bowl', city: 'Los Ángeles' },
  { match_number: 24, stage: 'group', group_name: 'D', home_team: 'Chile', away_team: 'Nueva Zelanda', home_flag: '🇨🇱', away_flag: '🇳🇿', match_date: '2026-06-21T20:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },

  // GRUPO E
  { match_number: 25, stage: 'group', group_name: 'E', home_team: 'Francia', away_team: 'Arabia Saudita', home_flag: '🇫🇷', away_flag: '🇸🇦', match_date: '2026-06-13T14:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 26, stage: 'group', group_name: 'E', home_team: 'Dinamarca', away_team: 'Sudáfrica', home_flag: '🇩🇰', away_flag: '🇿🇦', match_date: '2026-06-13T11:00:00-05:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { match_number: 27, stage: 'group', group_name: 'E', home_team: 'Francia', away_team: 'Dinamarca', home_flag: '🇫🇷', away_flag: '🇩🇰', match_date: '2026-06-17T14:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 28, stage: 'group', group_name: 'E', home_team: 'Sudáfrica', away_team: 'Arabia Saudita', home_flag: '🇿🇦', away_flag: '🇸🇦', match_date: '2026-06-17T11:00:00-05:00', venue: 'Estadio BBVA', city: 'Monterrey' },
  { match_number: 29, stage: 'group', group_name: 'E', home_team: 'Francia', away_team: 'Sudáfrica', home_flag: '🇫🇷', away_flag: '🇿🇦', match_date: '2026-06-21T14:00:00-05:00', venue: 'Gillette Stadium', city: 'Boston' },
  { match_number: 30, stage: 'group', group_name: 'E', home_team: 'Dinamarca', away_team: 'Arabia Saudita', home_flag: '🇩🇰', away_flag: '🇸🇦', match_date: '2026-06-21T14:00:00-05:00', venue: 'Empower Field', city: 'Denver' },

  // GRUPO F
  { match_number: 31, stage: 'group', group_name: 'F', home_team: 'Alemania', away_team: 'Paraguay', home_flag: '🇩🇪', away_flag: '🇵🇾', match_date: '2026-06-14T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 32, stage: 'group', group_name: 'F', home_team: 'Países Bajos', away_team: 'Escocia', home_flag: '🇳🇱', away_flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', match_date: '2026-06-14T17:00:00-05:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },
  { match_number: 33, stage: 'group', group_name: 'F', home_team: 'Alemania', away_team: 'Países Bajos', home_flag: '🇩🇪', away_flag: '🇳🇱', match_date: '2026-06-18T20:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 34, stage: 'group', group_name: 'F', home_team: 'Escocia', away_team: 'Paraguay', home_flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', away_flag: '🇵🇾', match_date: '2026-06-18T17:00:00-05:00', venue: 'Levi\'s Stadium', city: 'San Francisco' },
  { match_number: 35, stage: 'group', group_name: 'F', home_team: 'Alemania', away_team: 'Escocia', home_flag: '🇩🇪', away_flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', match_date: '2026-06-22T20:00:00-05:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { match_number: 36, stage: 'group', group_name: 'F', home_team: 'Países Bajos', away_team: 'Paraguay', home_flag: '🇳🇱', away_flag: '🇵🇾', match_date: '2026-06-22T20:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },

  // GRUPO G
  { match_number: 37, stage: 'group', group_name: 'G', home_team: 'Portugal', away_team: 'Guinea', home_flag: '🇵🇹', away_flag: '🇬🇳', match_date: '2026-06-14T14:00:00-05:00', venue: 'Estadio Akron', city: 'Guadalajara' },
  { match_number: 38, stage: 'group', group_name: 'G', home_team: 'Turquía', away_team: 'Uzbekistán', home_flag: '🇹🇷', away_flag: '🇺🇿', match_date: '2026-06-14T11:00:00-05:00', venue: 'BMO Field', city: 'Toronto' },
  { match_number: 39, stage: 'group', group_name: 'G', home_team: 'Portugal', away_team: 'Turquía', home_flag: '🇵🇹', away_flag: '🇹🇷', match_date: '2026-06-18T14:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 40, stage: 'group', group_name: 'G', home_team: 'Uzbekistán', away_team: 'Guinea', home_flag: '🇺🇿', away_flag: '🇬🇳', match_date: '2026-06-18T11:00:00-05:00', venue: 'Rose Bowl', city: 'Los Ángeles' },
  { match_number: 41, stage: 'group', group_name: 'G', home_team: 'Portugal', away_team: 'Uzbekistán', home_flag: '🇵🇹', away_flag: '🇺🇿', match_date: '2026-06-22T14:00:00-05:00', venue: 'Lumen Field', city: 'Seattle' },
  { match_number: 42, stage: 'group', group_name: 'G', home_team: 'Turquía', away_team: 'Guinea', home_flag: '🇹🇷', away_flag: '🇬🇳', match_date: '2026-06-22T14:00:00-05:00', venue: 'BC Place', city: 'Vancouver' },

  // GRUPO H
  { match_number: 43, stage: 'group', group_name: 'H', home_team: 'Colombia', away_team: 'Irak', home_flag: '🇨🇴', away_flag: '🇮🇶', match_date: '2026-06-15T20:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 44, stage: 'group', group_name: 'H', home_team: 'Ecuador', away_team: 'Venezuela', home_flag: '🇪🇨', away_flag: '🇻🇪', match_date: '2026-06-15T17:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 45, stage: 'group', group_name: 'H', home_team: 'Colombia', away_team: 'Ecuador', home_flag: '🇨🇴', away_flag: '🇪🇨', match_date: '2026-06-19T20:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },
  { match_number: 46, stage: 'group', group_name: 'H', home_team: 'Venezuela', away_team: 'Irak', home_flag: '🇻🇪', away_flag: '🇮🇶', match_date: '2026-06-19T17:00:00-05:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { match_number: 47, stage: 'group', group_name: 'H', home_team: 'Colombia', away_team: 'Venezuela', home_flag: '🇨🇴', away_flag: '🇻🇪', match_date: '2026-06-23T20:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 48, stage: 'group', group_name: 'H', home_team: 'Ecuador', away_team: 'Irak', home_flag: '🇪🇨', away_flag: '🇮🇶', match_date: '2026-06-23T20:00:00-05:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },

  // GRUPO I
  { match_number: 49, stage: 'group', group_name: 'I', home_team: 'Uruguay', away_team: 'Togo', home_flag: '🇺🇾', away_flag: '🇹🇬', match_date: '2026-06-15T14:00:00-05:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { match_number: 50, stage: 'group', group_name: 'I', home_team: 'Canadá', away_team: 'Irán', home_flag: '🇨🇦', away_flag: '🇮🇷', match_date: '2026-06-15T11:00:00-05:00', venue: 'BMO Field', city: 'Toronto' },
  { match_number: 51, stage: 'group', group_name: 'I', home_team: 'Uruguay', away_team: 'Canadá', home_flag: '🇺🇾', away_flag: '🇨🇦', match_date: '2026-06-19T14:00:00-05:00', venue: 'Gillette Stadium', city: 'Boston' },
  { match_number: 52, stage: 'group', group_name: 'I', home_team: 'Irán', away_team: 'Togo', home_flag: '🇮🇷', away_flag: '🇹🇬', match_date: '2026-06-19T11:00:00-05:00', venue: 'Empower Field', city: 'Denver' },
  { match_number: 53, stage: 'group', group_name: 'I', home_team: 'Uruguay', away_team: 'Irán', home_flag: '🇺🇾', away_flag: '🇮🇷', match_date: '2026-06-23T14:00:00-05:00', venue: 'Rose Bowl', city: 'Los Ángeles' },
  { match_number: 54, stage: 'group', group_name: 'I', home_team: 'Canadá', away_team: 'Togo', home_flag: '🇨🇦', away_flag: '🇹🇬', match_date: '2026-06-23T14:00:00-05:00', venue: 'BC Place', city: 'Vancouver' },

  // GRUPO J
  { match_number: 55, stage: 'group', group_name: 'J', home_team: 'Bélgica', away_team: 'Costa Rica', home_flag: '🇧🇪', away_flag: '🇨🇷', match_date: '2026-06-16T20:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 56, stage: 'group', group_name: 'J', home_team: 'Italia', away_team: 'Eslovaquia', home_flag: '🇮🇹', away_flag: '🇸🇰', match_date: '2026-06-16T17:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 57, stage: 'group', group_name: 'J', home_team: 'Bélgica', away_team: 'Italia', home_flag: '🇧🇪', away_flag: '🇮🇹', match_date: '2026-06-20T20:00:00-05:00', venue: 'Rose Bowl', city: 'Los Ángeles' },
  { match_number: 58, stage: 'group', group_name: 'J', home_team: 'Eslovaquia', away_team: 'Costa Rica', home_flag: '🇸🇰', away_flag: '🇨🇷', match_date: '2026-06-20T17:00:00-05:00', venue: 'Estadio Akron', city: 'Guadalajara' },
  { match_number: 59, stage: 'group', group_name: 'J', home_team: 'Bélgica', away_team: 'Eslovaquia', home_flag: '🇧🇪', away_flag: '🇸🇰', match_date: '2026-06-24T20:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 60, stage: 'group', group_name: 'J', home_team: 'Italia', away_team: 'Costa Rica', home_flag: '🇮🇹', away_flag: '🇨🇷', match_date: '2026-06-24T20:00:00-05:00', venue: 'Levi\'s Stadium', city: 'San Francisco' },

  // GRUPO K
  { match_number: 61, stage: 'group', group_name: 'K', home_team: 'Inglaterra', away_team: 'Guatemala', home_flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away_flag: '🇬🇹', match_date: '2026-06-17T20:00:00-05:00', venue: 'Gillette Stadium', city: 'Boston' },
  { match_number: 62, stage: 'group', group_name: 'K', home_team: 'Senegal', away_team: 'Ghana', home_flag: '🇸🇳', away_flag: '🇬🇭', match_date: '2026-06-17T17:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 63, stage: 'group', group_name: 'K', home_team: 'Inglaterra', away_team: 'Senegal', home_flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away_flag: '🇸🇳', match_date: '2026-06-21T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 64, stage: 'group', group_name: 'K', home_team: 'Ghana', away_team: 'Guatemala', home_flag: '🇬🇭', away_flag: '🇬🇹', match_date: '2026-06-21T17:00:00-05:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { match_number: 65, stage: 'group', group_name: 'K', home_team: 'Inglaterra', away_team: 'Ghana', home_flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away_flag: '🇬🇭', match_date: '2026-06-25T20:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },
  { match_number: 66, stage: 'group', group_name: 'K', home_team: 'Senegal', away_team: 'Guatemala', home_flag: '🇸🇳', away_flag: '🇬🇹', match_date: '2026-06-25T20:00:00-05:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },

  // GRUPO L
  { match_number: 67, stage: 'group', group_name: 'L', home_team: 'EE.UU.', away_team: 'Argelia', home_flag: '🇺🇸', away_flag: '🇩🇿', match_date: '2026-06-18T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 68, stage: 'group', group_name: 'L', home_team: 'Panamá', away_team: 'Costa de Marfil', home_flag: '🇵🇦', away_flag: '🇨🇮', match_date: '2026-06-18T17:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 69, stage: 'group', group_name: 'L', home_team: 'EE.UU.', away_team: 'Panamá', home_flag: '🇺🇸', away_flag: '🇵🇦', match_date: '2026-06-22T20:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 70, stage: 'group', group_name: 'L', home_team: 'Costa de Marfil', away_team: 'Argelia', home_flag: '🇨🇮', away_flag: '🇩🇿', match_date: '2026-06-22T17:00:00-05:00', venue: 'Rose Bowl', city: 'Los Ángeles' },
  { match_number: 71, stage: 'group', group_name: 'L', home_team: 'EE.UU.', away_team: 'Costa de Marfil', home_flag: '🇺🇸', away_flag: '🇨🇮', match_date: '2026-06-26T20:00:00-05:00', venue: 'Levi\'s Stadium', city: 'San Francisco' },
  { match_number: 72, stage: 'group', group_name: 'L', home_team: 'Panamá', away_team: 'Argelia', home_flag: '🇵🇦', away_flag: '🇩🇿', match_date: '2026-06-26T20:00:00-05:00', venue: 'Empower Field', city: 'Denver' },

  // ═══════════════════════════════════════
  // RONDA DE 32 (Avos de final)
  // ═══════════════════════════════════════
  { match_number: 73, stage: 'round_of_32', group_name: null, home_team: '1° Grupo A', away_team: '3° Mejor C/D/E', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-06-29T17:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 74, stage: 'round_of_32', group_name: null, home_team: '1° Grupo C', away_team: '3° Mejor A/B/F', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-06-29T20:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 75, stage: 'round_of_32', group_name: null, home_team: '1° Grupo B', away_team: '3° Mejor G/H/I', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-06-30T17:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 76, stage: 'round_of_32', group_name: null, home_team: '1° Grupo D', away_team: '3° Mejor J/K/L', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-06-30T20:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },
  { match_number: 77, stage: 'round_of_32', group_name: null, home_team: '2° Grupo A', away_team: '2° Grupo B', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-01T17:00:00-05:00', venue: 'Rose Bowl', city: 'Los Ángeles' },
  { match_number: 78, stage: 'round_of_32', group_name: null, home_team: '1° Grupo E', away_team: '3° Mejor A/B/C', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-01T20:00:00-05:00', venue: 'Gillette Stadium', city: 'Boston' },
  { match_number: 79, stage: 'round_of_32', group_name: null, home_team: '1° Grupo F', away_team: '3° Mejor D/E/F', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-02T17:00:00-05:00', venue: 'Levi\'s Stadium', city: 'San Francisco' },
  { match_number: 80, stage: 'round_of_32', group_name: null, home_team: '2° Grupo C', away_team: '2° Grupo D', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-02T20:00:00-05:00', venue: 'Lincoln Financial Field', city: 'Filadelfia' },
  { match_number: 81, stage: 'round_of_32', group_name: null, home_team: '1° Grupo G', away_team: '3° Mejor H/I/J', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-03T17:00:00-05:00', venue: 'Estadio Azteca', city: 'Ciudad de México' },
  { match_number: 82, stage: 'round_of_32', group_name: null, home_team: '1° Grupo H', away_team: '3° Mejor K/L', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-03T20:00:00-05:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },
  { match_number: 83, stage: 'round_of_32', group_name: null, home_team: '2° Grupo E', away_team: '2° Grupo F', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-04T17:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 84, stage: 'round_of_32', group_name: null, home_team: '1° Grupo I', away_team: '2° Grupo J', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-04T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 85, stage: 'round_of_32', group_name: null, home_team: '2° Grupo G', away_team: '2° Grupo H', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-05T17:00:00-05:00', venue: 'BC Place', city: 'Vancouver' },
  { match_number: 86, stage: 'round_of_32', group_name: null, home_team: '1° Grupo J', away_team: '2° Grupo I', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-05T20:00:00-05:00', venue: 'Estadio Universitario', city: 'Monterrey' },
  { match_number: 87, stage: 'round_of_32', group_name: null, home_team: '1° Grupo K', away_team: '2° Grupo L', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-06T17:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 88, stage: 'round_of_32', group_name: null, home_team: '1° Grupo L', away_team: '2° Grupo K', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-06T20:00:00-05:00', venue: 'Empower Field', city: 'Denver' },

  // ═══════════════════════════════════════
  // OCTAVOS DE FINAL (Round of 16)
  // ═══════════════════════════════════════
  { match_number: 89, stage: 'round_of_16', group_name: null, home_team: 'Ganador P73', away_team: 'Ganador P74', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-09T17:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 90, stage: 'round_of_16', group_name: null, home_team: 'Ganador P75', away_team: 'Ganador P76', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-09T20:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 91, stage: 'round_of_16', group_name: null, home_team: 'Ganador P77', away_team: 'Ganador P78', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-10T17:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },
  { match_number: 92, stage: 'round_of_16', group_name: null, home_team: 'Ganador P79', away_team: 'Ganador P80', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-10T20:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 93, stage: 'round_of_16', group_name: null, home_team: 'Ganador P81', away_team: 'Ganador P82', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-11T17:00:00-05:00', venue: 'Rose Bowl', city: 'Los Ángeles' },
  { match_number: 94, stage: 'round_of_16', group_name: null, home_team: 'Ganador P83', away_team: 'Ganador P84', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-11T20:00:00-05:00', venue: 'Levi\'s Stadium', city: 'San Francisco' },
  { match_number: 95, stage: 'round_of_16', group_name: null, home_team: 'Ganador P85', away_team: 'Ganador P86', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-12T17:00:00-05:00', venue: 'Gillette Stadium', city: 'Boston' },
  { match_number: 96, stage: 'round_of_16', group_name: null, home_team: 'Ganador P87', away_team: 'Ganador P88', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-12T20:00:00-05:00', venue: 'Arrowhead Stadium', city: 'Kansas City' },

  // ═══════════════════════════════════════
  // CUARTOS DE FINAL
  // ═══════════════════════════════════════
  { match_number: 97, stage: 'quarter', group_name: null, home_team: 'Ganador P89', away_team: 'Ganador P90', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-16T17:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
  { match_number: 98, stage: 'quarter', group_name: null, home_team: 'Ganador P91', away_team: 'Ganador P92', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-16T20:00:00-05:00', venue: 'SoFi Stadium', city: 'Los Ángeles' },
  { match_number: 99, stage: 'quarter', group_name: null, home_team: 'Ganador P93', away_team: 'Ganador P94', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-17T17:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 100, stage: 'quarter', group_name: null, home_team: 'Ganador P95', away_team: 'Ganador P96', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-17T20:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },

  // ═══════════════════════════════════════
  // SEMIFINALES
  // ═══════════════════════════════════════
  { match_number: 101, stage: 'semi', group_name: null, home_team: 'Ganador P97', away_team: 'Ganador P98', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-14T20:00:00-05:00', venue: 'AT&T Stadium', city: 'Dallas' },
  { match_number: 102, stage: 'semi', group_name: null, home_team: 'Ganador P99', away_team: 'Ganador P100', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-15T20:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },

  // ═══════════════════════════════════════
  // TERCER PUESTO
  // ═══════════════════════════════════════
  { match_number: 103, stage: 'third_place', group_name: null, home_team: 'Perdedor P101', away_team: 'Perdedor P102', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-18T16:00:00-05:00', venue: 'Hard Rock Stadium', city: 'Miami' },

  // ═══════════════════════════════════════
  // FINAL
  // ═══════════════════════════════════════
  { match_number: 104, stage: 'final', group_name: null, home_team: 'Ganador P101', away_team: 'Ganador P102', home_flag: '🏳️', away_flag: '🏳️', match_date: '2026-07-19T17:00:00-05:00', venue: 'MetLife Stadium', city: 'Nueva York' },
]

export const STAGE_LABELS = {
  group: 'Fase de Grupos',
  round_of_32: 'Ronda de 32',
  round_of_16: 'Octavos de Final',
  quarter: 'Cuartos de Final',
  semi: 'Semifinales',
  third_place: 'Tercer Puesto',
  final: 'GRAN FINAL',
}

export const STAGE_ORDER = ['group', 'round_of_32', 'round_of_16', 'quarter', 'semi', 'third_place', 'final']
