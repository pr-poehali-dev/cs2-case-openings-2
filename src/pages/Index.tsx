import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [balance, setBalance] = useState(1500);
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  const [openedItem, setOpenedItem] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [steamConnected, setSteamConnected] = useState(false);
  const [casesOpened, setCasesOpened] = useState(0);

  const cases = [
    {
      id: 1,
      name: "Weapon Case",
      price: 125,
      image: "/img/cdffbe3a-2c07-4c76-a519-d0f1eef3ac75.jpg",
      rarity: "Legendary",
      description: "Содержит редкие скины оружия",
    },
    {
      id: 2,
      name: "Knife Case",
      price: 250,
      image: "/img/cdffbe3a-2c07-4c76-a519-d0f1eef3ac75.jpg",
      rarity: "Mythical",
      description: "Шанс выпадения ножей",
    },
    {
      id: 3,
      name: "Glove Case",
      price: 180,
      image: "/img/cdffbe3a-2c07-4c76-a519-d0f1eef3ac75.jpg",
      rarity: "Rare",
      description: "Перчатки и аксессуары",
    },
    {
      id: 4,
      name: "Premium Case",
      price: 500,
      image: "/img/cdffbe3a-2c07-4c76-a519-d0f1eef3ac75.jpg",
      rarity: "Legendary",
      description: "Эксклюзивные скины",
    },
  ];

  const weapons = [
    {
      name: "AK-47 Redline",
      rarity: "Legendary",
      chance: 0.5,
      price: 2500,
      image: "/img/b1d22543-32df-42e7-a45f-523f76075968.jpg",
      float: 0.15,
      category: "Rifle",
    },
    {
      name: "AWP Dragon Lore",
      rarity: "Mythical",
      chance: 0.1,
      price: 15000,
      image: "/img/471dde1c-6454-4899-bb32-43127605dc1c.jpg",
      float: 0.08,
      category: "Sniper",
    },
    {
      name: "M4A4 Howl",
      rarity: "Legendary",
      chance: 0.3,
      price: 8000,
      image: "/img/b1d22543-32df-42e7-a45f-523f76075968.jpg",
      float: 0.12,
      category: "Rifle",
    },
    {
      name: "Karambit Fade",
      rarity: "Mythical",
      chance: 0.05,
      price: 25000,
      image: "/img/5490ebc6-81a6-42f3-a217-98020fb9a073.jpg",
      float: 0.01,
      category: "Knife",
    },
    {
      name: "Glock Water Elemental",
      rarity: "Rare",
      chance: 15,
      price: 180,
      image: "/img/b1d22543-32df-42e7-a45f-523f76075968.jpg",
      float: 0.25,
      category: "Pistol",
    },
    {
      name: "USP-S Kill Confirmed",
      rarity: "Legendary",
      chance: 0.8,
      price: 1200,
      image: "/img/b1d22543-32df-42e7-a45f-523f76075968.jpg",
      float: 0.18,
      category: "Pistol",
    },
  ];

  const playSound = (soundType: string) => {
    // Имитация звукового эффекта
    const audio = new Audio();
    if (soundType === "case-open") {
      // Здесь будет реальный звук открытия кейса
      console.log("🔊 Звук открытия кейса");
    } else if (soundType === "rare-item") {
      console.log("🔊 Звук редкого предмета");
    }
  };

  const openCase = (caseItem: any) => {
    if (balance < caseItem.price) return;

    setIsOpeningCase(true);
    setBalance(balance - caseItem.price);
    setCasesOpened(casesOpened + 1);

    playSound("case-open");

    setTimeout(() => {
      const random = Math.random() * 100;
      let selectedWeapon;

      // Система рарности с реальными шансами
      if (random < 0.05) {
        selectedWeapon = weapons.find((w) => w.name === "Karambit Fade");
      } else if (random < 0.1) {
        selectedWeapon = weapons.find((w) => w.name === "AWP Dragon Lore");
      } else if (random < 2) {
        selectedWeapon = weapons.find((w) => w.rarity === "Legendary");
      } else if (random < 15) {
        selectedWeapon = weapons.find((w) => w.rarity === "Rare");
      } else {
        selectedWeapon = weapons[Math.floor(Math.random() * weapons.length)];
      }

      if (selectedWeapon) {
        const newItem = {
          ...selectedWeapon,
          case: caseItem.name,
          id: Date.now(),
          openedAt: new Date(),
        };

        setOpenedItem(newItem);
        setInventory([...inventory, newItem]);

        if (selectedWeapon.rarity === "Mythical") {
          playSound("rare-item");
        }
      }

      setIsOpeningCase(false);
    }, 2000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case "Mythical":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      setBalance(balance + amount);
      setDepositAmount("");
      setShowDepositModal(false);
    }
  };

  const connectSteam = () => {
    // Заглушка для Steam API
    setSteamConnected(true);
    alert(
      "Steam API интеграция в разработке! Скоро будет доступна синхронизация с вашим инвентарем.",
    );
  };

  const sellItem = (item: any) => {
    const sellPrice = Math.floor(item.price * 0.8); // 80% от цены
    setBalance(balance + sellPrice);
    setInventory(inventory.filter((i) => i.id !== item.id));
    setOpenedItem(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-orbitron font-bold text-primary glow-orange">
                LUDIK
              </h1>
              <Badge variant="secondary" className="animate-pulse">
                🎰 CS2 CASES
              </Badge>
            </div>

            <nav className="hidden md:flex space-x-6">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
              >
                Главная
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
              >
                Апгрейд
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
              >
                Контракты
              </Button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-primary/20 px-3 py-2 rounded-lg">
                <Icon name="Coins" size={20} className="text-secondary" />
                <span className="font-orbitron font-bold text-secondary">
                  {balance.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-muted/20 px-3 py-2 rounded-lg">
                <Icon
                  name="Package"
                  size={16}
                  className="text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">
                  Открыто: {casesOpened}
                </span>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 glow-orange font-orbitron"
                onClick={() => setShowDepositModal(true)}
              >
                Пополнить
              </Button>
              <Button
                variant="outline"
                className="font-orbitron"
                onClick={connectSteam}
              >
                {steamConnected ? "✅ Steam" : "🔗 Steam"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="cases" className="font-orbitron">
              <Icon name="Package" size={20} className="mr-2" />
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="font-orbitron">
              <Icon name="ArrowUp" size={20} className="mr-2" />
              Апгрейд
            </TabsTrigger>
            <TabsTrigger value="contracts" className="font-orbitron">
              <Icon name="FileText" size={20} className="mr-2" />
              Контракты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-8">
            {/* Deposit Modal */}
            {showDepositModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <Card className="w-96">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-center">
                      Пополнить баланс
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Сумма пополнения
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Введите сумму..."
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDepositAmount("100")}
                      >
                        100
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDepositAmount("500")}
                      >
                        500
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDepositAmount("1000")}
                      >
                        1000
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowDepositModal(false)}
                      >
                        Отмена
                      </Button>
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={handleDeposit}
                      >
                        Пополнить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Opening Animation */}
            {isOpeningCase && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-case-open mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg glow-orange"></div>
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-primary animate-pulse">
                    Открываю кейс...
                  </h2>
                  <div className="mt-4 flex justify-center">
                    <div className="animate-slot-spin flex space-x-2">
                      {weapons.map((weapon, index) => (
                        <div
                          key={index}
                          className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex items-center justify-center"
                        >
                          <img
                            src={weapon.image}
                            alt={weapon.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Result Modal */}
            {openedItem && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <Card className="w-96 glow-gold">
                  <CardHeader className="text-center">
                    <CardTitle className="font-orbitron text-2xl text-primary">
                      Поздравляем!
                    </CardTitle>
                    <CardDescription>
                      Вы получили предмет из {openedItem.case}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div
                      className={`w-32 h-32 mx-auto rounded-lg ${getRarityColor(openedItem.rarity)} p-2 flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        src={openedItem.image}
                        alt={openedItem.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <h3 className="font-orbitron text-xl text-foreground">
                      {openedItem.name}
                    </h3>
                    <div className="flex justify-center space-x-2">
                      <Badge className={getRarityColor(openedItem.rarity)}>
                        {openedItem.rarity}
                      </Badge>
                      <Badge variant="outline">{openedItem.category}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Цена</p>
                        <p className="font-orbitron font-bold text-secondary">
                          {openedItem.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Float</p>
                        <p className="font-orbitron">{openedItem.float}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => setOpenedItem(null)}
                      >
                        Забрать
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => sellItem(openedItem)}
                      >
                        Продать за {Math.floor(openedItem.price * 0.8)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Cases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="case-hover bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={caseItem.image}
                        alt={caseItem.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getRarityColor(caseItem.rarity)}>
                          {caseItem.rarity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <CardTitle className="font-orbitron text-lg">
                        {caseItem.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {caseItem.description}
                      </CardDescription>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="Coins"
                          size={16}
                          className="text-secondary"
                        />
                        <span className="font-orbitron font-bold text-secondary">
                          {caseItem.price}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 glow-orange font-orbitron"
                        onClick={() => openCase(caseItem)}
                        disabled={balance < caseItem.price || isOpeningCase}
                      >
                        Открыть
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upgrade" className="space-y-8">
            <div className="text-center py-16">
              <Icon
                name="ArrowUp"
                size={64}
                className="mx-auto mb-4 text-primary animate-glow-pulse"
              />
              <h2 className="text-3xl font-orbitron font-bold mb-4">
                Апгрейд скинов
              </h2>
              <p className="text-muted-foreground mb-8">
                Улучшай свои скины с шансом получить предмет дороже
              </p>
              {inventory.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {inventory.slice(0, 3).map((item) => (
                    <Card key={item.id} className="bg-card/50">
                      <CardContent className="p-4 text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 mx-auto mb-2 rounded"
                        />
                        <p className="text-sm font-orbitron">{item.name}</p>
                        <Badge
                          className={getRarityColor(item.rarity)}
                          size="sm"
                        >
                          {item.rarity}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 glow-orange font-orbitron"
              >
                Скоро...
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-8">
            <div className="text-center py-16">
              <Icon
                name="FileText"
                size={64}
                className="mx-auto mb-4 text-primary animate-glow-pulse"
              />
              <h2 className="text-3xl font-orbitron font-bold mb-4">
                Контракты
              </h2>
              <p className="text-muted-foreground mb-8">
                Обменивай несколько скинов на один более редкий
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 glow-orange font-orbitron"
              >
                Скоро...
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
