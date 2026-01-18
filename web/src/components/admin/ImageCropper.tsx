'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { X, ZoomIn, ZoomOut, Move, Crop } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageCropperProps {
    file: File
    onCrop: (croppedBlob: Blob) => void
    onCancel: () => void
}

export default function ImageCropper({ file, onCrop, onCancel }: ImageCropperProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const imageRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const reader = new FileReader()
        reader.onload = (e) => {
            setImageSrc(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }, [file])

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY * -0.001
        const newScale = Math.min(Math.max(0.5, scale + delta), 3)
        setScale(newScale)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleCrop = () => {
        if (!imageRef.current) return

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set desired output size (e.g., 800x800)
        const outputSize = 800
        canvas.width = outputSize
        canvas.height = outputSize

        // Calculate source rectangle
        // The container is 400x400 (visual), so scale factor is outputSize / 400 = 2
        // But we need to map the visual transform (scale, position) back to the original image

        const img = imageRef.current
        const naturalWidth = img.naturalWidth
        const naturalHeight = img.naturalHeight

        // Visual container size
        const containerSize = 400

        // Calculate the rendered size of the image within the container
        // object-fit: contain behavior logic if we were using it, but here we are doing manual transform
        // Let's assume the image is centered and scaled.

        // Actually, simpler approach:
        // Draw the image onto the canvas using the current transform

        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, outputSize, outputSize)

        // Center of canvas
        ctx.translate(outputSize / 2, outputSize / 2)

        // Apply scale and position
        // Position needs to be scaled up to output resolution
        const ratio = outputSize / containerSize
        ctx.translate(position.x * ratio, position.y * ratio)
        ctx.scale(scale, scale)

        // Draw image centered
        // We need to figure out the scale of the image relative to the container first
        // If we fit the image into the container (contain), what is the scale?
        const scaleX = containerSize / naturalWidth
        const scaleY = containerSize / naturalHeight
        const baseScale = Math.min(scaleX, scaleY)

        const drawWidth = naturalWidth * baseScale * ratio
        const drawHeight = naturalHeight * baseScale * ratio

        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)

        canvas.toBlob((blob) => {
            if (blob) {
                onCrop(blob)
            }
        }, 'image/jpeg', 0.9)
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            >
                <div className="bg-white rounded-xl overflow-hidden max-w-lg w-full shadow-2xl">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Cắt ảnh (Tỉ lệ 1:1)</h3>
                        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 flex flex-col items-center">
                        <div
                            ref={containerRef}
                            className="w-[400px] h-[400px] bg-slate-100 relative overflow-hidden cursor-move border-2 border-dashed border-slate-300 rounded-lg"
                            onWheel={handleWheel}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            {imageSrc && (
                                <img
                                    ref={imageRef}
                                    src={imageSrc}
                                    alt="Crop target"
                                    className="max-w-none absolute top-1/2 left-1/2 origin-center select-none pointer-events-none"
                                    style={{
                                        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        // Initial fit
                                    }}
                                    draggable={false}
                                />
                            )}

                            {/* Grid Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-30">
                                <div className="w-full h-1/3 border-b border-white/50 absolute top-0"></div>
                                <div className="w-full h-1/3 border-b border-white/50 absolute top-1/3"></div>
                                <div className="h-full w-1/3 border-r border-white/50 absolute left-0"></div>
                                <div className="h-full w-1/3 border-r border-white/50 absolute left-1/3"></div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 w-full justify-center">
                            <Button variant="secondary" size="icon" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>
                                <ZoomOut className="w-4 h-4" />
                            </Button>
                            <input
                                type="range"
                                min="0.5"
                                max="3"
                                step="0.1"
                                value={scale}
                                onChange={(e) => setScale(parseFloat(e.target.value))}
                                className="w-32"
                            />
                            <Button variant="secondary" size="icon" onClick={() => setScale(s => Math.min(3, s + 0.1))}>
                                <ZoomIn className="w-4 h-4" />
                            </Button>
                        </div>

                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                            <Move className="w-3 h-3" /> Kéo để di chuyển • Cuộn để phóng to/nhỏ
                        </p>
                    </div>

                    <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
                        <Button variant="ghost" onClick={onCancel}>Hủy</Button>
                        <Button onClick={handleCrop}>
                            <Crop className="w-4 h-4 mr-2" />
                            Cắt & Sử dụng
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
