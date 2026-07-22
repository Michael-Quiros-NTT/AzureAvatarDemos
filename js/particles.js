(function () {
    const canvas = document.getElementById('particles-canvas')
    const ctx = canvas.getContext('2d')

    const COUNT = 72
    const MAX_DIST = 160
    const DOT_COLOR = 'rgba(142, 207, 221, '
    const LINE_COLOR = 'rgba(142, 207, 221, '

    let particles = []

    function resize() {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
    }

    function makeParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 1.8 + 0.8
        }
    }

    function init() {
        resize()
        particles = Array.from({ length: COUNT }, makeParticle)
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x
                const dy = particles[i].y - particles[j].y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < MAX_DIST) {
                    ctx.beginPath()
                    ctx.strokeStyle = LINE_COLOR + (1 - dist / MAX_DIST) * 0.35 + ')'
                    ctx.lineWidth = 0.7
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.stroke()
                }
            }
        }

        particles.forEach(p => {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = DOT_COLOR + '0.75)'
            ctx.fill()
        })
    }

    function update() {
        particles.forEach(p => {
            p.x += p.vx
            p.y += p.vy
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        })
    }

    function loop() {
        update()
        draw()
        requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)

    init()
    loop()
})()
