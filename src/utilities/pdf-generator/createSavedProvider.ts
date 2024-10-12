import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Providers } from "../../types/ProviderDetails";

async function createSavedProviderPdf(
    currentDateTime: string,
    savedProviderDetails: Providers[],
    logo: string,
    caretype: string
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();

    // Embed a font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Add a page
    const page = pdfDoc.addPage([600, 400]);
    page.drawText('Date of creation: ' + currentDateTime, {
        x: 50,
        y: 350,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    // Add Logo (For logo images, you need to load and embed it)
    // const logoImageBytes = fs.readFileSync(logo);
    // const logoImage = await pdfDoc.embedPng(logoImageBytes);
    // page.drawImage(logoImage, { x: 50, y: 300, width: 100, height: 50 });

    // Add Care Type
    page.drawText('Care Type: ' + caretype, {
        x: 50,
        y: 320,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 1),
    });

    // Render providers list (You can customize this layout further)
    let yPosition = 280;
    savedProviderDetails.forEach((provider, index) => {
        page.drawText(`${index + 1}. ${provider.name}`, {
            x: 50,
            y: yPosition,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        yPosition -= 20; // Adjust spacing for each provider
    });

    // Save the document to a file
    return await pdfDoc.save();
}

export default createSavedProviderPdf;
