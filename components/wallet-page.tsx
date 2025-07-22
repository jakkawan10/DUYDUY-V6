"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  History,
  Settings,
  Plus,
  TrendingUp,
  Shield,
} from "lucide-react"

export default function WalletPage() {
  const [duyCoins, setDuyCoins] = useState(500)
  const [earnings, setEarnings] = useState(12450)
  const [topupAmount, setTopupAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const transactions = [
    { id: 1, type: "topup", amount: 100, date: "2024-01-15", description: "เติม DUY Coin" },
    { id: 2, type: "like", amount: -1, date: "2024-01-15", description: "ให้ไลค์ @สมชาย_ครีเอเตอร์" },
    { id: 3, type: "earn", amount: 25, date: "2024-01-14", description: "รายได้จากวิดีโอ 'ทำอาหารไทย'" },
    { id: 4, type: "withdraw", amount: -1000, date: "2024-01-13", description: "ถอนเงินเข้าบัญชี xxx-xxx-1234" },
    { id: 5, type: "like", amount: -1, date: "2024-01-13", description: "ให้ไลค์ @มาลี_เที่ยวไทย" },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <Plus className="w-4 h-4 text-green-500" />
      case "like":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "earn":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "withdraw":
        return <ArrowDownLeft className="w-4 h-4 text-blue-500" />
      default:
        return <History className="w-4 h-4 text-gray-500" />
    }
  }

  const getTransactionColor = (type: string, amount: number) => {
    if (amount > 0) return "text-green-600"
    if (amount < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="min-h-screen bg-[#e5f7f6] pb-20">
      {/* Header */}
      <div className="bg-[#42d3d1] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">กระเป๋าเงิน DUY</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/20 border-0 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-white">{duyCoins.toLocaleString()}</div>
              <div className="text-sm text-white/80 mb-3">DUY Coin</div>
              <Button
                size="sm"
                className="bg-white text-[#42d3d1] hover:bg-white/90 w-full"
                onClick={() => document.getElementById("topup-tab")?.click()}
              >
                เติมเหรียญ
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/20 border-0 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-white">฿{earnings.toLocaleString()}</div>
              <div className="text-sm text-white/80 mb-3">รายได้สะสม</div>
              <Button
                size="sm"
                className="bg-green-500 text-white hover:bg-green-600 w-full"
                onClick={() => document.getElementById("withdraw-tab")?.click()}
              >
                ถอนเงิน
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 p-4 bg-white/10 rounded-xl">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>รายได้เดือนนี้: ฿2,450 (+15% จากเดือนที่แล้ว)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80">
            <TabsTrigger value="transactions">ประวัติ</TabsTrigger>
            <TabsTrigger value="topup" id="topup-tab">
              เติมเงิน
            </TabsTrigger>
            <TabsTrigger value="withdraw" id="withdraw-tab">
              ถอนเงิน
            </TabsTrigger>
            <TabsTrigger value="transfer">โอน</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-6">
            <Card className="bg-white/80 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  ประวัติธุรกรรม
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <div className="font-medium text-gray-800">{transaction.description}</div>
                          <div className="text-sm text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${getTransactionColor(transaction.type, transaction.amount)}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount.toLocaleString()}
                        {transaction.type === "like" ? " เหรียญ" : " บาท"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topup" className="mt-6">
            <Card className="bg-white/80 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  เติม DUY Coin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">จำนวนเงิน (บาท)</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    className="bg-white"
                  />
                  <div className="text-xs text-gray-500 mt-1">1 บาท = 1 DUY Coin</div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 500, 1000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setTopupAmount(amount.toString())}
                      className="bg-white hover:bg-[#42d3d1] hover:text-white"
                    >
                      ฿{amount}
                    </Button>
                  ))}
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <h3 className="font-medium">เลือกวิธีชำระเงิน</h3>

                  <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white">
                    <CreditCard className="w-5 h-5 mr-3" />
                    PromptPay / QR Code
                  </Button>

                  <Button variant="outline" className="w-full justify-start bg-white">
                    <CreditCard className="w-5 h-5 mr-3" />
                    บัตรเครดิต/เดบิต
                  </Button>

                  <Button variant="outline" className="w-full justify-start bg-white">
                    <CreditCard className="w-5 h-5 mr-3" />
                    TrueMoney Wallet
                  </Button>
                </div>

                <Button className="w-full bg-[#42d3d1] hover:bg-[#3bc4c2] text-white">
                  เติมเงิน {topupAmount ? `฿${topupAmount}` : ""}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw" className="mt-6">
            <Card className="bg-white/80 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownLeft className="w-5 h-5" />
                  ถอนรายได้
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>ต้องยืนยันตัวตน (KYC) ก่อนถอนเงิน</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">จำนวนเงิน (บาท)</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="bg-white"
                  />
                  <div className="text-xs text-gray-500 mt-1">ถอนขั้นต่ำ 100 บาท | ค่าธรรมเนียม 10 บาท</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">บัญชีธนาคาร</label>
                  <Button variant="outline" className="w-full justify-start bg-white">
                    <Plus className="w-4 h-4 mr-2" />
                    เพิ่มบัญชีธนาคาร
                  </Button>
                </div>

                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={!withdrawAmount || Number.parseInt(withdrawAmount) < 100}
                >
                  ถอนเงิน {withdrawAmount ? `฿${withdrawAmount}` : ""}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfer" className="mt-6">
            <Card className="bg-white/80 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  ส่งเหรียญให้เพื่อน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ชื่อผู้ใช้หรือ QR Code</label>
                  <Input placeholder="@username หรือสแกน QR" className="bg-white" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">จำนวนเหรียญ</label>
                  <Input type="number" placeholder="10" className="bg-white" />
                </div>

                <Button className="w-full bg-[#42d3d1] hover:bg-[#3bc4c2] text-white">ส่งเหรียญ</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
