# Polla Mundial FIFA 2026

Aplicación web para el pronóstico de resultados del Mundial FIFA 2026. Los participantes predicen marcadores de los 104 partidos y compiten por el mejor puntaje en un ranking en tiempo real.

**URL producción:** https://polla-mundial-2026-phi.vercel.app

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Estilos | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL + Auth + Realtime) |
| Deploy | Vercel |
| Sync automático | GitHub Actions + football-data.org API |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── admin/          # Panel de administración
│   ├── champion/       # Selector de campeón
│   ├── matches/        # Tarjetas de partidos
│   ├── ranking/        # Tabla de posiciones
│   └── shared/         # Navbar, Footer, ProtectedRoute
├── hooks/
│   ├── useAuth.js              # Autenticación con Supabase
│   ├── useMatches.js           # Partidos + Realtime
│   ├── usePredictions.js       # CRUD predicciones
│   └── useChampionPrediction.js
├── pages/
│   ├── Home.jsx        # Landing + selector campeón
│   ├── Matches.jsx     # Lista de partidos + progreso
│   ├── Leaderboard.jsx # Ranking
│   ├── Profile.jsx     # Perfil de usuario
│   └── Admin.jsx       # Panel admin
├── data/
│   └── matches2026.js  # Fixture completo 104 partidos
└── lib/
    ├── supabase.js     # Cliente Supabase
    └── scoring.js      # Lógica de puntos
api/
└── sync-scores.js      # Serverless function sincronización
.github/workflows/
└── sync-scores.yml     # Cron cada 5 min durante el Mundial
```

---

## Variables de entorno

### Vercel (frontend + API)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
FOOTBALL_DATA_API_KEY=
SYNC_SECRET=
```

### GitHub Secrets (Actions)
```
SYNC_URL=https://polla-mundial-2026-phi.vercel.app/api/sync-scores
SYNC_SECRET=
```

---

## Base de datos (Supabase)

### Tablas
| Tabla | Descripción |
|-------|-------------|
| `profiles` | Datos de usuario (username, is_admin, total_points) |
| `matches` | 104 partidos con estado y marcadores |
| `predictions` | Predicciones por usuario/partido |
| `champion_predictions` | Elección de campeón por usuario |

### Función RPC
- `recalculate_points_for_match(p_match_id)` — recalcula puntos de todos los usuarios para un partido dado

---

## Sistema de puntos

| Acierto | Puntos |
|---------|--------|
| Marcador exacto | 3 pts |
| Resultado correcto (ganador/empate) | 1 pt |
| Campeón del mundo | +10 pts |

---

## Sincronización automática de marcadores

GitHub Actions ejecuta un cron cada 5 minutos que llama `/api/sync-scores`. Esta función:
1. Consulta football-data.org por partidos EN VIVO o FINALIZADOS
2. Actualiza `matches` en Supabase
3. Llama `recalculate_points_for_match` para cada partido finalizado
4. Supabase Realtime propaga los cambios a todos los clientes conectados

---

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar variables
npm run dev
```

---

## Despliegue

Cada push a `main` dispara un deploy automático en Vercel.

---

Hecho con ❤️ por androjzu
