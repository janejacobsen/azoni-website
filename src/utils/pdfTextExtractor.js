import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const extractTextFromPDFFile = async (file) => {
  const typedarray = new Uint8Array(await file.arrayBuffer());
  const loadingTask = getDocument({ data: typedarray });
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    fullText += text + "\n";
  }

  return fullText;
};
