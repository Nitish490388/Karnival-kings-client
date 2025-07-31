import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ExpenseSession } from "@/types/session";


export const generatePDFReport = (session: ExpenseSession | null): void => {
  if (!session) {
    console.error("Session is null or undefined");
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Session Report", 14, 20);

  // Session Info
  const sessionInfo = [
    ["Title", session.title],
    ["Type", session.type],
    ["Created At", new Date(session.createdAt).toLocaleString()],
    ["Settled", session.settles ? "Yes" : "No"],
  ];

  autoTable(doc, {
    head: [["Session Info", "Value"]],
    body: sessionInfo,
    startY: 30,
  });

  // Calculate where to start the next section
  let startY = (doc as any).lastAutoTable?.finalY ?? 40;
  startY += 10;

  // Section Heading for Expenses
  doc.setFontSize(14);
  doc.text("All Expenses", 14, startY);

  startY += 6; // Small gap before the table

  // Expenses Table
  autoTable(doc, {
    head: [["Description", "Amount", "Paid By"]],
    body: session.expenses.length
      ? session.expenses.map((e) => [
          e.description,
          `₹${e.amount}`,
          e.paidBy?.name ?? "Unknown",
        ])
      : [["No expenses recorded", "", ""]],
    startY,
    theme: "striped",
    headStyles: { fillColor: [63, 81, 181] },
  });

  startY = (doc as any).lastAutoTable?.finalY ?? startY;
  startY += 10;

  // Section Heading for Contributions
  doc.setFontSize(14);
  doc.text("All Collections", 14, startY);

  startY += 6;

  // Contributions Table
  autoTable(doc, {
    head: [["Player", "Amount", "Type", "Status"]],
    body: session.contributions.length
      ? session.contributions.map((c) => [
          c.player?.name ?? "Unknown",
          `₹${c.amount}`,
          c.type,
          c.status,
        ])
      : [["No contributions recorded", "", "", ""]],
    startY,
    theme: "striped",
    headStyles: { fillColor: [76, 175, 80] },
  });

  startY = (doc as any).lastAutoTable?.finalY ?? startY;
  startY += 10;

  // Section Heading for Refunds
  doc.setFontSize(14);
  doc.text("All Refunds", 14, startY);

  startY += 6;

  // Refunds Table
 startY = (doc as any).lastAutoTable?.finalY ?? startY;
startY += 10;

// Section Heading for Refunds
doc.setFontSize(14);
doc.text("All Refunds", 14, startY);

startY += 6;

autoTable(doc, {
  head: [["Player", "Amount", "Type", "Status", "Date"]],
  body: session.refunds && session.refunds.length > 0
    ? session.refunds.map((r) => [
        r.player?.name ?? "Unknown",
        `₹${r.amount}`,
        r.type,
        r.status,
        new Date(r.date).toLocaleDateString(),
      ])
    : [["No refunds recorded", "", "", "", ""]],
  startY,
  theme: "striped",
  headStyles: { fillColor: [255, 87, 34] }, // Orange color for refund table
});


  // Save the PDF
  doc.save(`${session.title || "session"}_report.pdf`);
};
