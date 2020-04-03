package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jung-kurt/gofpdf"
	"github.com/jung-kurt/gofpdf/contrib/httpimg"
)

type singlePdf struct {
	Title string `json:"title"`
	Text  string `json:"text"`
	Image string `json:"image"`
}

type allPdfs []singlePdf

// Handler - Zeit now serverless
func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

	var content allPdfs

	err := json.NewDecoder(r.Body).Decode(&content)
	if err != nil {
		log.Println(err)
	}
	pdf := gofpdf.New("P", "point", "Letter", "")

	for _, singlePdf := range content {

		width, _ := pdf.GetPageSize()

		pdf.AddPage()

		pdf.SetMargins(70, 50, 70)

		// Translate
		tr := pdf.UnicodeTranslatorFromDescriptor("")

		// Title
		pdf.MoveTo(70, 70)
		pdf.SetFont("Arial", "B", 42)
		_, lineHt := pdf.GetFontSize()
		pdf.MultiCell(0, lineHt*1.2, tr(singlePdf.Title), "", "L", false)

		// Image
		if singlePdf.Image != "" {
			pdf.Ln(20)
			httpimg.Register(pdf, singlePdf.Image, "")
			pdf.Image(singlePdf.Image, 70, 0, (width - 140), 0, true, "", 0, "")
		}
		pdf.Ln(30)

		// Text
		pdf.SetFont("Arial", "", 12)
		_, lineHt = pdf.GetFontSize()
		pdf.MultiCell(0, lineHt*1.4, tr(singlePdf.Text), "", "", false)

		stream := new(bytes.Buffer)

		error := pdf.Output(stream)
		if error != nil {
			fmt.Println(error)
		}

		_, err2 := stream.WriteTo(w)
		if err2 != nil {
			log.Println(err2)
		}
	}

}
