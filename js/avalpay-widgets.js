(function () {
    const DATA = {
        facturas: [
            { nombre: 'Codensa', tipo: 'Electricidad', monto: '$45.200', vence: '25 ago' },
            { nombre: 'Gas Natural Fenosa', tipo: 'Gas', monto: '$28.500', vence: '28 ago' },
            { nombre: 'Claro', tipo: 'Internet', monto: '$62.000', vence: '30 ago' }
        ],
        pagos: [
            { nombre: 'Arriendo Apto 301', monto: '$950.000', fecha: 'mié 22 ago' },
            { nombre: 'Seguro de Vida Bolívar', monto: '$85.000', fecha: 'vie 24 ago' }
        ],
        saldo: { valor: '$1.245.800', cuenta: 'Cuenta de ahorros · Banco de Bogotá' },
        convenios: ['ETB', 'Acueducto', 'EPM', 'DIAN', 'Telmex', 'Claro']
    }

    const DEFAULT_HTML = `
        <h1 class="hero-title">
            Hoy todo puede estar<br>
            <span class="hero-title__accent">bajo control</span>
        </h1>
        <div class="hero-divider"></div>
        <p class="hero-description">Soy tu asistente de pagos. Estoy aquí para ayudarte a pagar, recordar lo que te falta y que tengas el control de tus finanzas.</p>`

    const widgets = {
        facturas() {
            const items = DATA.facturas.map(f => `
                <div class="hw__item">
                    <div class="hw__item-left">
                        <span class="hw__item-name">${f.nombre}</span>
                        <span class="hw__item-sub">${f.tipo} · vence ${f.vence}</span>
                    </div>
                    <span class="hw__item-amount">${f.monto}</span>
                </div>`).join('')
            const total = '$135.700'
            return `
                <div class="hw hw--facturas">
                    <p class="hw__label">Facturas pendientes</p>
                    <div class="hw__list">${items}</div>
                    <div class="hw__footer">
                        <span class="hw__total">Total: <strong>${total}</strong></span>
                        <button class="hw__cta" onclick="alert('Demo: redirigiendo a pago...')">Pagar todo</button>
                    </div>
                </div>`
        },
        pagos() {
            const items = DATA.pagos.map(p => `
                <div class="hw__item">
                    <div class="hw__item-left">
                        <span class="hw__item-name">${p.nombre}</span>
                        <span class="hw__item-sub">${p.fecha}</span>
                    </div>
                    <span class="hw__item-amount">${p.monto}</span>
                </div>`).join('')
            return `
                <div class="hw hw--pagos">
                    <p class="hw__label">Esta semana</p>
                    <div class="hw__list">${items}</div>
                </div>`
        },
        saldo() {
            return `
                <div class="hw hw--saldo">
                    <p class="hw__label">Saldo disponible</p>
                    <p class="hw__saldo-valor">${DATA.saldo.valor}</p>
                    <p class="hw__saldo-cuenta">${DATA.saldo.cuenta}</p>
                    <button class="hw__cta hw__cta--ghost" onclick="alert('Demo: abriendo detalle de cuenta...')">Ver movimientos</button>
                </div>`
        },
        convenios() {
            const chips = DATA.convenios.map(c => `<span class="hw__chip">${c}</span>`).join('')
            return `
                <div class="hw hw--convenios">
                    <p class="hw__label">Convenios disponibles</p>
                    <div class="hw__chips">${chips}</div>
                    <button class="hw__cta" onclick="alert('Demo: abriendo catálogo de convenios...')">Ver todos</button>
                </div>`
        },
        default() { return DEFAULT_HTML }
    }

    const RULES = [
        { widget: 'facturas',  pattern: /factura|codensa|gas natural|claro internet|electricidad|pagar.*servicio|servicio.*públic|vence|vencimiento/i },
        { widget: 'pagos',     pattern: /esta semana|semana|programado|debo pagar|me toca pagar|pago.*pendiente|arriendo|seguro.*bolívar/i },
        { widget: 'saldo',     pattern: /saldo|cuánto tengo|disponible|plata|dinero.*cuenta|mi cuenta/i },
        { widget: 'convenios', pattern: /convenio|recaudo|etb|acueducto|epm|dian|telmex/i }
    ]

    let currentWidget = 'default'

    function detect(text) {
        for (const rule of RULES) {
            if (rule.pattern.test(text)) return rule.widget
        }
        return null
    }

    function render(widgetName) {
        if (widgetName === currentWidget) return
        const zone = document.querySelector('.hero-dynamic')
        if (!zone) return

        currentWidget = widgetName
        zone.classList.add('hero-dynamic--exit')

        setTimeout(() => {
            zone.innerHTML = widgets[widgetName] ? widgets[widgetName]() : DEFAULT_HTML
            zone.classList.remove('hero-dynamic--exit')
        }, 180)
    }

    window.avalPayWidgets = {
        onAssistantReply(text) {
            const widget = detect(text)
            if (widget) render(widget)
        },
        reset() {
            currentWidget = null
            render('default')
        }
    }
})()
