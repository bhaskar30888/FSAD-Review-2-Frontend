import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Download, FileText, Calendar } from "lucide-react";

export default function AdminReports() {
    const handleExportCSV = () => {
        // Mock CSV Generation
        const headers = ["User ID,Name,Email,Role,Status,Join Date"];
        const rows = [
            "1,Alex Johnson,student@gmail.com,student,active,2023-09-01",
            "2,System Admin,admin@gmail.com,admin,active,2023-01-15",
            "3,Emily Rogers,emily.r@uni.edu,student,active,2023-09-10"
        ];
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);

        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "campuscare_users_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                System Reports
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Data Export & Reporting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-500">Generate and download comprehensive system reports securely.</p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-4">
                        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm"><FileText className="h-5 w-5 text-primary-500" /></div>
                                <div className="font-semibold dark:text-white">User Roster</div>
                            </div>
                            <p className="text-sm text-gray-500">Complete list of all registered users with status.</p>
                            <Button onClick={handleExportCSV} className="w-full gap-2 mt-auto">
                                <Download className="h-4 w-4" /> Export CSV
                            </Button>
                        </div>

                        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm"><Calendar className="h-5 w-5 text-primary-500" /></div>
                                <div className="font-semibold dark:text-white">Monthly Analytics</div>
                            </div>
                            <p className="text-sm text-gray-500">Aggregated usage statistics for the previous month.</p>
                            <Button variant="outline" className="w-full gap-2 mt-auto" onClick={() => alert("Report generation scheduled.")}>
                                <Download className="h-4 w-4" /> Generate Report
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
