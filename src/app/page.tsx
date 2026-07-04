import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <main className="flex-1 py-8 sm:py-12">
      <Container>
        <Card className="flex flex-col gap-4 max-w-md mx-auto">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Serqle Behavioural Survey Platform
          </h1>
          <Progress value={40} />
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Card>
      </Container>
    </main>
  );
}