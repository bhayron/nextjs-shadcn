'use client'

import React, { useEffect, useRef } from 'react'

interface Snowflake {
    x: number
    y: number
    radius: number
    speed: number
    wind: number
    opacity: number
    angle: number
    rotationSpeed: number
}

export default function SnowEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number

        const snowflakes: Snowflake[] = []
        const numberOfSnowflakes = 300

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            canvas.style.position = 'absolute'
            canvas.style.top = '0'
            canvas.style.left = '0'
            canvas.style.zIndex = '-1'
        }

        const createSnowflakes = () => {
            for (let i = 0; i < numberOfSnowflakes; i++) {
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    speed: Math.random() * 1.5 + 0.5,
                    wind: Math.random() * 0.5 - 0.25,
                    opacity: Math.random() * 0.6 + 0.4,
                    angle: Math.random() * Math.PI * 2,
                    rotationSpeed: Math.random() * 0.02 - 0.01,
                })
            }
        }

        const drawSnowflakes = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < snowflakes.length; i++) {
                const sf = snowflakes[i]
                ctx.fillStyle = `rgba(255, 255, 255, ${sf.opacity})`
                ctx.beginPath()
                ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2, true)
                ctx.fill()
            }
        }

        const moveSnowflakes = () => {
            for (let i = 0; i < snowflakes.length; i++) {
                const sf = snowflakes[i]
                sf.y += sf.speed
                sf.x += Math.sin(sf.angle) + sf.wind
                sf.angle += sf.rotationSpeed

                if (sf.y > canvas.height) {
                    sf.y = -sf.radius
                    sf.x = Math.random() * canvas.width
                }

                if (sf.x > canvas.width) {
                    sf.x = 0
                } else if (sf.x < 0) {
                    sf.x = canvas.width
                }
            }
        }

        const animate = () => {
            drawSnowflakes()
            moveSnowflakes()
            animationFrameId = requestAnimationFrame(animate)
        }

        resizeCanvas()
        createSnowflakes()
        animate()

        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%)' }}
            aria-hidden="true"
        />
    )
}
