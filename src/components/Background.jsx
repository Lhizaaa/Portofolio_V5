import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])
	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	]

	useEffect(() => {
		let currentScroll = 0
		let requestId

		const handleScroll = () => {
			const newScroll = window.pageYOffset
			const scrollDelta = newScroll - currentScroll
			currentScroll = newScroll

			blobRefs.current.forEach((blob, index) => {
				if (!blob) return
				const initialPos = initialPositions[index]

				// Gentle parallax drift for the decorative blocks.
				const xOffset = Math.sin(newScroll / 120 + index * 0.5) * 60
				const yOffset = Math.cos(newScroll / 120 + index * 0.5) * 30
				const rotate = Math.sin(newScroll / 200 + index) * 6

				const x = initialPos.x + xOffset
				const y = initialPos.y + yOffset

				blob.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`
				blob.style.transition = "transform 1.2s ease-out"
			})

			requestId = requestAnimationFrame(handleScroll)
		}

		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
			cancelAnimationFrame(requestId)
		}
	}, [])

	return (
		<div className="fixed inset-0 -z-10 bg-base overflow-hidden">
			{/* Flat brutalist color blocks with hard black borders */}
			<div className="absolute inset-0">
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-24 -left-6 w-28 h-28 md:w-40 md:h-40 bg-nb-yellow border-2 border-fg rotate-6 opacity-80"></div>
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-16 right-8 w-24 h-24 md:w-32 md:h-32 bg-nb-blue border-2 border-fg -rotate-6 opacity-80 hidden sm:block"></div>
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute bottom-16 left-10 w-24 h-24 md:w-36 md:h-36 bg-nb-red border-2 border-fg rotate-3 opacity-80"></div>
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-4 right-16 w-28 h-28 md:w-36 md:h-36 bg-nb-lime border-2 border-fg -rotate-3 opacity-80 hidden sm:block"></div>
			</div>
			{/* Bold grid overlay */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--c-line)/0.14)_2px,transparent_2px),linear-gradient(to_bottom,rgb(var(--c-line)/0.14)_2px,transparent_2px)] bg-[size:48px_48px]"></div>
		</div>
	)
}

export default AnimatedBackground

