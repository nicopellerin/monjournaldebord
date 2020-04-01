import PDFDocument from 'pdfkit'
import fetch from 'node-fetch'

export default async (req, res) => {
  const doc = new PDFDocument()

  const { title, text, mood, image, createdAt } = req.body

  async function readStream() {
    const resp = await fetch(image)
    const stream = await resp.body

    stream.setEncoding('base64')

    return new Promise((resolve, reject) => {
      let data = 'data:image/png;base64,'

      stream.on('data', chunk => (data += chunk))
      stream.on('end', () => resolve(data))
      stream.on('error', err => reject(err))
    })
  }

  const image64 = image ? await readStream() : null

  doc.pipe(res)

  doc
    .fontSize(42)
    .font('Helvetica-Bold')
    .lineGap(1)
    .text(title, 100, 100, { lineGap: 1 })
    .moveDown(0.1)

  // doc
  //   .fontSize(11)
  //   .font('Helvetica')
  //   .text(format(createdAt, 'iiii dd MMMM HH:mm', { locale: fr }), {
  //     align: 'right',
  //   })
  //   .moveDown(0.1)

  if (image64) {
    doc
      .image(image64, {
        align: 'center',
        valign: 'center',
        width: 430,
      })
      .moveDown(0.1)
  }

  doc
    .fontSize(12)
    .font('Times-Roman')
    .lineGap(1.6)
    .translate(0, 20)
    .text(text, { lineGap: 1.6 })

  doc.end()
}
