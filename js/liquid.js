(function () {
    const TEAM = [
        {
            id: 'michael-quiros',
            triggers: ['michael', 'quiros', 'michael quiros'],
            name: 'Michael Quiros',
            role: 'Desarrollador',
            initials: 'MQ'
        },
        {
            id: 'jorge-castillo',
            triggers: ['jorge', 'castillo', 'jorge castillo', 'líder', 'lider'],
            name: 'Jorge Castillo',
            role: 'Líder',
            initials: 'JC'
        }
    ]

    let hideTimer = null

    function showCard(person) {
        const card = document.getElementById('liquid-card')
        document.getElementById('liquid-card-initials').textContent = person.initials
        document.getElementById('liquid-card-name').textContent = person.name
        document.getElementById('liquid-card-role').textContent = person.role

        card.classList.remove('liquid-card--hidden')
        card.classList.add('liquid-card--visible')

        clearTimeout(hideTimer)
        hideTimer = setTimeout(hideCard, 7000)
    }

    function hideCard() {
        const card = document.getElementById('liquid-card')
        card.classList.add('liquid-card--hidden')
        card.classList.remove('liquid-card--visible')
    }

    function detectPerson(text) {
        const lower = text.toLowerCase()
        return TEAM.find(p => p.triggers.some(t => lower.includes(t))) || null
    }

    document.addEventListener('DOMContentLoaded', () => {
        const chatHistory = document.getElementById('chatHistory')
        if (!chatHistory) return

        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== 1) continue
                    const bubbles = node.classList?.contains('chat-bubble--assistant')
                        ? [node]
                        : [...(node.querySelectorAll?.('.chat-bubble--assistant') ?? [])]
                    for (const bubble of bubbles) {
                        const person = detectPerson(bubble.textContent || '')
                        if (person) showCard(person)
                    }
                }
            }
        })

        observer.observe(chatHistory, { childList: true, subtree: true })

        document.getElementById('liquid-card')?.addEventListener('click', hideCard)
    })
})()
