import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { recentReports } from "../../data/mock-recent-reports";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export function RecentReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios Recentes</CardTitle>
        <CardDescription>Relatórios gerados anteriormente</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReports.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <div>
                <h3 className="font-medium">{report.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(report.date).toLocaleDateString("pt-BR",{
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })} • {report.type} • {report.stores.join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}