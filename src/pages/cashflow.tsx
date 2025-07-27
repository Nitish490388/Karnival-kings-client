import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { useRecoilValue } from "recoil";
import { availableFundAtom } from "@/state/availableFundAtom";
import { useGetAvailableFund } from "@/hook/useGetAvailable";

export default function CashFlowPage() {
  useGetAvailableFund(); // fetch data
  const availableFund = useRecoilValue(availableFundAtom);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
        💰 Total Available Funds
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Matchday Fund Card */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="bg-secondary shadow-xl text-secondary-foreground rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Matchday Fund</h2>
                <p className="text-3xl font-bold mt-2">
                  ₹ {availableFund?.matchdayBalance ?? 0}
                </p>
              </div>
              <Sparkle className="h-10 w-10 opacity-80" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Equipment Fund Card */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="bg-primary shadow-xl text-secondary-foreground rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Equipment Fund</h2>
                <p className="text-3xl font-bold mt-2">
                  ₹ {availableFund?.equipmentBalance ?? 0}
                </p>
              </div>
              <Sparkle className="h-10 w-10 opacity-80" />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
