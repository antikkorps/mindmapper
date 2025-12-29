import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { useToast } from '@/composables/useToast'

const toast = useToast()

export const EXPORT_FORMATS = {
  PNG: 'png',
  PDF: 'pdf',
  JSON: 'json',
}

export const exportAsPng = async (element, filename = 'mindmap.png') => {
  try {
    const dataUrl = await toPng(element, {
      width: element.offsetWidth * 2,
      height: element.offsetHeight * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
      },
      quality: 1,
    })

    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    link.click()

    toast.success('Mindmap exported as PNG')
  } catch (error) {
    toast.error('Failed to export PNG')
    console.error('PNG export error:', error)
    throw error
  }
}

export const exportAsPdf = async (element, filename = 'mindmap.pdf') => {
  try {
    const dataUrl = await toPng(element, {
      width: element.offsetWidth * 2,
      height: element.offsetHeight * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
      },
      quality: 1,
    })

    const img = new Image()
    img.src = dataUrl

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })

    const pdf = new jsPDF({
      orientation: img.width > img.height ? 'l' : 'p',
      unit: 'px',
      format: [img.width, img.height],
    })

    pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height)
    pdf.save(filename)

    toast.success('Mindmap exported as PDF')
  } catch (error) {
    toast.error('Failed to export PDF')
    console.error('PDF export error:', error)
    throw error
  }
}

export const exportAsJson = (mapData, filename = 'mindmap.json') => {
  try {
    const jsonData = JSON.stringify(mapData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.download = filename
    link.href = url
    link.click()

    URL.revokeObjectURL(url)

    toast.success('Mindmap exported as JSON')
  } catch (error) {
    toast.error('Failed to export JSON')
    console.error('JSON export error:', error)
    throw error
  }
}
