import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import axiosClient from "@/utils/axiosClient";
import { useRecoilValue } from "recoil";
import { availableFundAtom } from "@/state/availableFundAtom";

export default function CashFlowPage() {
  // const [funds, setFunds] = useState<{
  //   MATCHDAY: number;
  //   EQUIPMENT: number;
  // } | null>(null);
  const availableFund = useRecoilValue(availableFundAtom);

  console.log(availableFund);

  // useEffect(() => {
  //   const getdata = async () => {
  //     const response = await axiosClient.get("/api/v1/app/availableFund");
  //     const {equipmentBalance, matchdayBalance} = response.data.result;
  //     // console.log(equipmentBalance, matchdayBalance);
  //     setFunds({
  //       MATCHDAY: matchdayBalance,
  //       EQUIPMENT: equipmentBalance,
  //     });
  //   }
  //   getdata();
  // }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const fundTypes = [
    {
      label: "Equipment Fund",
      key: "EQUIPMENT",
      bg: "bg-secondary",
      fund: availableFund.equipmentBalance,
    },
    {
      label: "Matchday Fund",
      key: "MATCHDAY",
      bg: "bg-primary",
      fund: availableFund.matchdayBalance,
    },
  ];

  console.log(availableFund.equipmentBalance);
  console.log(availableFund.matchdayBalance);
  
  
  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
        💰 Total Avilable Funds
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {fundTypes.map((fund, i) => (
          <motion.div
            key={fund.key}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              className={`bg-gradient-to-r ${fund.bg} shadow-xl text-secondary-foreground rounded-2xl overflow-hidden`}
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{fund.label}</h2>
                 
                     <p className="text-3xl font-bold mt-2">
                       ₹{fund.key === "EQUIPMENT" ? availableFund.equipmentBalance : availableFund.matchdayBalance}
                     </p>
                 
                </div>
                <Sparkle className="h-10 w-10 opacity-80" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
