"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell, FileText } from "lucide-react";

const reports = [
  {
    id: 1,
    name: "NextJS Security Scan - July",
    date: "2024-07-15",
    status: "Completed",
    issues: 3,
    severity: "High",
    details: [
      { id: 1, type: "SQL Injection", file: "db.js", severity: "High" },
      { id: 2, type: "XSS Attack", file: "components/input.js", severity: "Medium" },
      { id: 3, type: "Insecure Dependencies", file: "package.json", severity: "High" },
    ],
  },
  {
    id: 2,
    name: "API Vulnerability Test",
    date: "2024-07-10",
    status: "Completed",
    issues: 1,
    severity: "Low",
    details: [{ id: 4, type: "Outdated Package", file: "package.json", severity: "Low" }],
  },
];

const notifications = [
  { id: 1, message: "🚨 Critical issue found in db.js", type: "error" },
  { id: 2, message: "✅ Scan completed successfully", type: "success" },
];

export default function DashboardPage() {
  const [expandedReport, setExpandedReport] = useState<number | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Security Dashboard</h1>

      {/* Notifications */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Bell className="w-5 h-5 mr-2" /> Notifications
        </h2>
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <Alert key={note.id} className="mb-2">
              <AlertTitle>{note.type === "error" ? "⚠️ Warning" : "✅ Success"}</AlertTitle>
              <AlertDescription>{note.message}</AlertDescription>
            </Alert>
          ))
        ) : (
          <p>No new notifications</p>
        )}
      </div>

      {/* Reports Section */}
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <FileText className="w-5 h-5 mr-2" /> Scan Reports
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="cursor-pointer">
            <CardHeader onClick={() => setExpandedReport(report.id === expandedReport ? null : report.id)}>
              <CardTitle>{report.name}</CardTitle>
              <p className="text-sm text-gray-500">{report.date} - <strong>{report.status}</strong></p>
              <p className={`text-sm ${report.severity === "High" ? "text-red-500" : "text-green-500"}`}>
                {report.issues} Issues - {report.severity} Risk
              </p>
            </CardHeader>
            {expandedReport === report.id && (
              <CardContent>
                <h3 className="text-md font-semibold">Vulnerabilities</h3>
                <ul className="list-disc pl-4">
                  {report.details.map((issue) => (
                    <li key={issue.id} className={`text-sm ${issue.severity === "High" ? "text-red-500" : "text-yellow-500"}`}>
                      {issue.type} in <code>{issue.file}</code> ({issue.severity})
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
