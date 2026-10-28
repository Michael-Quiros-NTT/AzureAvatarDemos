(function () {
    const avatarStyles = {
        lisa: ['casual-standing', 'casual-sitting', 'graceful-standing', 'graceful-sitting', 'technical-standing', 'technical-sitting'],
        meg: ['business', 'casual', 'formal'],
        harry: ['business', 'casual', 'youthful'],
        jeff: ['business', 'formal']
    }

    function syncSpotlightStyles() {
        const avatar = document.getElementById('spotlight-avatar').value
        const styleSelect = document.getElementById('spotlight-style')
        const current = styleSelect.value
        const styles = avatarStyles[avatar] || []
        styleSelect.innerHTML = styles.map(s => `<option value="${s}"${s === current ? ' selected' : ''}>${s}</option>`).join('')
    }

    function closeSpotlight() {
        const overlay = document.getElementById('spotlight-overlay')
        overlay.classList.add('spotlight-overlay--exit')
        setTimeout(() => {
            overlay.style.display = 'none'
            overlay.classList.remove('spotlight-overlay--exit')
        }, 280)
    }

    function confirm() {
        const nameInput = document.getElementById('spotlight-name')
        const name = nameInput.value.trim() || 'Camila'
        const avatar = document.getElementById('spotlight-avatar').value
        const style = document.getElementById('spotlight-style').value

        document.querySelector('#startSession .join-label').textContent = `Llamar a ${name}`
        document.querySelector('.brand-logo').textContent = `${name} avatar`

        const promptEl = document.getElementById('prompt')
        promptEl.value = promptEl.value.replace(/\{NOMBRE\}/g, name)

        document.getElementById('talkingAvatarCharacter').value = avatar
        document.getElementById('talkingAvatarStyle').value = style
        if (window.syncAvatarStyles) window.syncAvatarStyles()

        closeSpotlight()
    }

    window.openSpotlight = function () {
        const overlay = document.getElementById('spotlight-overlay')
        const spotlight = document.getElementById('spotlight')

        document.getElementById('spotlight-name').value = ''
        document.getElementById('spotlight-modelo-panel').hidden = true
        document.querySelector('.spotlight-modelo-arrow').classList.remove('open')

        // reset prompt placeholder para que {NOMBRE} funcione de nuevo al renombrar
        const promptEl = document.getElementById('prompt')
        promptEl.value = promptEl.value.replace(/(?<!{)(NOMBRE)(?!})/g, '{NOMBRE}')

        // reiniciar animación del card
        spotlight.style.animation = 'none'
        overlay.style.display = 'flex'
        spotlight.offsetHeight // fuerza reflow
        spotlight.style.animation = ''

        setTimeout(() => document.getElementById('spotlight-name').focus(), 30)
    }

    window.renombrar = function () {
        if (document.body.classList.contains('session-started')) {
            window.stopSession()
        }
        window.openSpotlight()
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('spotlight-name').focus()

        document.getElementById('spotlight-avatar').addEventListener('change', syncSpotlightStyles)

        document.getElementById('spotlight-name').addEventListener('keydown', e => {
            if (e.key === 'Enter') confirm()
        })

        document.getElementById('spotlight-confirm').addEventListener('click', confirm)

        document.getElementById('spotlight-modelo-toggle').addEventListener('click', () => {
            const panel = document.getElementById('spotlight-modelo-panel')
            const arrow = document.querySelector('.spotlight-modelo-arrow')
            const opening = panel.hidden
            panel.hidden = !opening
            arrow.classList.toggle('open', opening)
        })
    })
})()
