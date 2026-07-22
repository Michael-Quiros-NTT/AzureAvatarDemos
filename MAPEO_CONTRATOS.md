# Mapeo de contratos DOM - nuevo-index.html <-> chat.js

Documento actualizado para migrar el frontend a otro repositorio sin romper el runtime.

## 1) Contratos obligatorios (deben existir)

Estos IDs son usados por chat.js en flujo normal (sesion, preview, chat y estado):

- startSession
- microphone
- stopSession
- stopSpeaking
- configuration
- chatHistory
- userMessageBox
- showTypeMessage
- showTypeMessageCheckbox
- uploadImgIcon
- remoteVideo
- localVideo
- subtitles
- sessionStatus
- sessionStatusLabel
- videoContainer
- overlayArea
- previewBanner

Campos de configuracion obligatorios (aunque esten hidden):

- region
- APIKey
- azureOpenAIEndpoint
- azureOpenAIApiKey
- azureOpenAIDeploymentName
- talkingAvatarCharacter
- talkingAvatarStyle
- enablePrivateEndpoint
- privateEndpoint
- prompt
- enableOyd
- azureCogSearchEndpoint
- azureCogSearchApiKey
- azureCogSearchIndexName
- sttLocales
- ttsVoice
- customVoiceEndpointId
- continuousConversation
- photoAvatar
- customizedAvatar
- useBuiltInVoice
- autoReconnectAvatar
- useLocalVideoForIdle
- showSubtitles

## 2) Contratos opcionales de compatibilidad recomendados

chat.js tambien referencia estos IDs en funciones auxiliares. No siempre se ejecutan, pero conviene mantener placeholders hidden para evitar errores futuros:

- cogSearchConfig
- showPrivateEndpointCheckBox

Si no los vas a usar en el nuevo repo, agregalos hidden:

```html
<div id="cogSearchConfig" hidden></div>
<div id="showPrivateEndpointCheckBox" hidden></div>
```

## 3) Elementos no contractuales (pueden cambiar)

Estos NO son requeridos por chat.js para funcionar:

- leftMenuClearChat
- leftMenuStopSession
- configToggle
- sessionStatusLabel2

Podes renombrarlos o eliminarlos si mantenes los IDs obligatorios.

## 4) Reglas de estructura que SI importan

- chatHistory debe existir como contenedor de mensajes (actualmente se usa con burbujas).
- userMessageBox debe ser contentEditable.
- remoteVideo debe existir porque ahi se inyecta video/audio WebRTC.
- configuration debe poder mostrarse/ocultarse y contener los inputs requeridos.

## 5) Dependencias de archivos desde index.html

Referencias actuales del HTML:

- css/styles.css
- css/chat-modern.css
- css/nueco-stilo.css
- js/chat.js
- <https://aka.ms/csspeech/jsbrowserpackageraw>

Assets referenciados:

- assets/attachment.jpg
- assets/video/lisa-casual-sitting-idle.mp4  ← archivo pendiente de agregar
- avatar-preview.png  ← archivo pendiente de agregar (va en la raíz)

## 6) Checklist de migracion minima

1. Copiar nuevo-index.html.
2. Copiar nueco-stilo.css.
3. Copiar chat-modern.css.
4. Copiar styles.css.
5. Copiar chat.js.
6. Copiar attachment.jpg.
7. Agregar placeholders hidden para cogSearchConfig y showPrivateEndpointCheckBox (recomendado).
8. Quitar secrets hardcodeados de APIKey y azureOpenAIApiKey antes de subir el repo.

## 7) Validacion rapida post-migracion

1. Abrir la pagina y verificar que no haya errores de getElementById(...)=null.
2. Probar Preview (togglePreviewMode) y verificar que cambie estado y chat.
3. Iniciar sesion (startSession) y validar que habilite microfono y stopSession.
4. Enviar un mensaje y confirmar burbujas user/assistant en chatHistory.
