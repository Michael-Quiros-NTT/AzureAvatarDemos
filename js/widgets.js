const WIDGET_RE = /<!--WIDGET:([\s\S]*?)-->/

function parseWidget(text) {
    const match = text.match(WIDGET_RE)
    if (!match) return null
    try {
        return JSON.parse(match[1].trim())
    } catch (e) {
        console.warn('[widgets] parse error:', e)
        return null
    }
}

function stripWidgetBlock(text) {
    return text.replace(WIDGET_RE, '').trim()
}

function renderCard(data) {
    const btn = data.button
        ? `<button class="widget-btn" onclick="window.widgetAction('${data.action || ''}')">${data.button}</button>`
        : ''
    return `
        <div class="widget-card">
            <div class="widget-card__title">${data.title || ''}</div>
            <p class="widget-card__text">${data.text || ''}</p>
            ${btn}
        </div>`
}

function renderTable(data) {
    const ths = (data.columns || []).map(c => `<th>${c}</th>`).join('')
    const trs = (data.rows || []).map(r =>
        `<tr>${r.map(cell => `<td>${cell}</td>`).join('')}</tr>`
    ).join('')
    return `
        <div class="widget-table-wrap">
            ${data.title ? `<div class="widget-panel__title">${data.title}</div>` : ''}
            <table class="widget-table">
                <thead><tr>${ths}</tr></thead>
                <tbody>${trs}</tbody>
            </table>
        </div>`
}

function showWidget(html) {
    const panel = document.getElementById('widget-panel')
    if (!panel) return
    panel.innerHTML = `<button class="widget-close" onclick="window.hideWidget()" title="Cerrar">&times;</button>${html}`
    panel.classList.add('widget-panel--visible')
}

function hideWidget() {
    const panel = document.getElementById('widget-panel')
    if (panel) panel.classList.remove('widget-panel--visible')
}

function renderWidget(data) {
    if (!data || !data.type) return
    const renderers = { card: renderCard, table: renderTable }
    const fn = renderers[data.type]
    if (!fn) { console.warn('[widgets] unknown type:', data.type); return }
    showWidget(fn(data))
}

function widgetAction(action) {
    if (!action) return
    if (window.sendQuickMessage) window.sendQuickMessage(action)
    else console.log('[widgets] action:', action)
}

window.parseWidget = parseWidget
window.stripWidgetBlock = stripWidgetBlock
window.renderWidget = renderWidget
window.hideWidget = hideWidget
window.widgetAction = widgetAction
