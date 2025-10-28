# 📝 Instrucciones para Desplegar Google Apps Script

## Paso 1: Crear el Script en Google Apps Script

1. Ve a [script.google.com](https://script.google.com)
2. Click en **"Nuevo proyecto"**
3. Borra todo el código por defecto
4. Copia y pega todo el contenido de `Code.gs`

## Paso 2: Configurar Google Sheets (Opcional)

Si quieres guardar las respuestas en Google Sheets:

1. Crea una nueva hoja de cálculo en Google Sheets
2. En la primera fila, pon estos encabezados:
   - Fecha | Nombre | Empresa | Teléfono | Email | Infraestructura | Recursos | Objetivo
3. Copia el ID de la hoja (está en la URL): `https://docs.google.com/spreadsheets/d/TU_ID_AQUI/edit`
4. En el código `Code.gs`, línea 15, reemplaza `'TU_SPREADSHEET_ID'` con tu ID real

**Si NO quieres usar Google Sheets**, comenta o elimina estas líneas (11-20):
```javascript
// var sheet = SpreadsheetApp.openById('TU_SPREADSHEET_ID').getActiveSheet();
// sheet.appendRow([...]);
```

## Paso 3: Desplegar como Web App

⚠️ **MUY IMPORTANTE PARA EVITAR ERROR 403:**

1. Click en el botón **"Implementar"** (Deploy) → **"Nueva implementación"** (New deployment)
2. Click en el ícono de engranaje ⛙️ al lado de "Select type"
3. Selecciona **"Aplicación web"** (Web app)
4. **CONFIGURACIÓN CRÍTICA:**
   - **Description**: "Zetterx Form Handler"
   - **Execute as**: **"Me"** (tu email) ✅
   - **Who has access**: **"Anyone"** (Cualquiera) ✅ ⚠️ ESTO ES CRUCIAL
5. Click en **"Deploy"** (Implementar)
6. **Autoriza TODOS los permisos** cuando aparezca el popup:
   - Click en tu cuenta de Google
   - Click en "Advanced" si aparece warning
   - Click en "Go to [tu proyecto]" 
   - Click en "Allow"
7. **COPIA LA URL COMPLETA** que termina en `/exec`

⚠️ **Si recibes error 403:**
- Borra el deployment anterior
- Crea uno NUEVO
- Asegúrate que "Who has access" esté en **"Anyone"**

## Paso 4: Actualizar script.js

1. Abre `script.js` en tu editor
2. En la línea 115, reemplaza `TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI` con la URL que copiaste:

```javascript
<form id="evalForm" class="eval-form" action="https://script.google.com/macros/s/TU_URL_AQUI/exec" method="POST" target="hidden_iframe">
```

## Paso 5: Probar

1. Abre `index.html` en tu navegador
2. Click en "Evaluación gratuita"
3. Llena el formulario
4. Click en "Enviar Evaluación"
5. Deberías ver una página de confirmación bonita con Tailwind CSS
6. El modal se cerrará automáticamente después de 5 segundos

## ✨ Características del Script

### Página de Éxito (con Tailwind CSS):
- ✅ Diseño moderno y limpio
- ✅ Icono de éxito animado
- ✅ Lista de próximos pasos
- ✅ Auto-cierre después de 5 segundos
- ✅ Botón manual para cerrar
- ✅ Responsive y mobile-friendly

### Notificación por Email:
- ✅ Se envía a `hola@zetterx.com`
- ✅ Formato HTML limpio con todos los datos
- ✅ Subject line descriptivo

### Almacenamiento (opcional):
- ✅ Guarda todas las respuestas en Google Sheets
- ✅ Con timestamp automático

## 🔧 Troubleshooting

### Error 404:
- Verifica que la URL esté correcta
- Asegúrate de haber desplegado como "Aplicación web"
- Verifica que "Quién tiene acceso" esté en "Cualquier usuario"

### No recibo emails:
- Verifica que el email `hola@zetterx.com` sea correcto en el código
- Revisa la carpeta de SPAM
- Verifica los permisos de Gmail en el script

### Error de permisos:
- Vuelve a autorizar el script
- Asegúrate de estar usando tu cuenta de Google

## 📧 Cambiar Email de Notificación

En `Code.gs`, línea 24, cambia:
```javascript
to: 'hola@zetterx.com',
```

Por tu email deseado.

---

**¡Listo!** Tu formulario ahora tiene un backend profesional con Google Apps Script y una página de confirmación hermosa con Tailwind CSS. 🎉
