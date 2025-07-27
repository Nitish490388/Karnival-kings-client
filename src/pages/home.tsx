import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      {/* <header className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary"></h1>
        <Button>Get Started</Button>
      </header> */}

      <main className="flex flex-col items-center text-center mt-16 sm:mt-20">
        <motion.h2
          className="text-3xl sm:text-5xl font-extrabold leading-tight text-primary mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Simplify Karnival Kings's <span className="text-secondary-foreground">Expenses</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-xl mb-8 px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          CrickExpense helps cricket teams manage match fees, gear costs, travel expenses,
          and much more — with transparency and ease.
        </motion.p>

        

        <motion.div
          className="mt-16 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-xl border-2 border-primary/10">
            <CardContent className="p-6">
              <Sparkles className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg">Real-Time Tracking</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Track contributions and expenses as they happen for full clarity.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-2 border-primary/10">
            <CardContent className="p-6">
              <Sparkles className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg">Split & Share</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Automatically split bills among team members and share summaries.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-2 border-primary/10">
            <CardContent className="p-6">
              <Sparkles className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg">Match Reports</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Export expense reports match-wise or monthly for complete records.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
