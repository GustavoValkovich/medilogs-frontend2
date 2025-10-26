# Medilogs Frontend (Angular scaffold)

Este repositorio contiene un scaffold del frontend Angular (modular) con Angular Material y Angular Elements (registrados pero usados internamente).

**Notas rápidas:**
- API base configurada en `src/environments/environment.ts` -> `http://localhost:3000/api`
- Endpoints pacientes: `/api/patients`
- Endpoints consultas: `/api/consultations` (requieren JWT en backend). El frontend añade un header `Authorization: Bearer <token>` si existe `localStorage.getItem('medilogs_token')`.

Para ejecutar:

```bash
# instalar dependencias
npm install
# iniciar (requiere Angular CLI global: npm i -g @angular/cli)
ng serve
```

Ajustá versiones en package.json si necesitás.
