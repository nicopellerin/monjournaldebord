package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jung-kurt/gofpdf/contrib/httpimg"

	"github.com/jung-kurt/gofpdf"
)

type singlePdf struct {
	Title string `json:"title"`
	Text  string `json:"text"`
	Image string `json:"image"`
}

type allPdf []singlePdf

// Handler - zeit now serverless
func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

	var content singlePdf

	err := json.NewDecoder(r.Body).Decode(&content)
	if err != nil {
		log.Println(err)
	}

	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.SetMargins(10, 10, 10)
	// pdf.SetAutoPageBreak(false, 0)

	// Title
	pdf.SetFont("Arial", "B", 42)
	// lines := pdf.SplitText(content.Title, 100)
	pdf.Write(14, content.Title)
	// pdf.SetXY(40, 40)
	pdf.Ln(20)
	// Image
	if content.Image != "" {
		httpimg.Register(pdf, content.Image, "")
		pdf.Image(content.Image, 15, 205, 267, 0, false, "", 0, "")
	}

	// Text
	pdf.SetFont("Arial", "", 12)
	pdf.WriteAligned(0, 6, content.Text, "L")

	stream := new(bytes.Buffer)

	error := pdf.Output(stream)
	if error != nil {
		fmt.Println(err)
	}

	_, err2 := stream.WriteTo(w)
	if err2 != nil {
		log.Println(err)
	}
}
