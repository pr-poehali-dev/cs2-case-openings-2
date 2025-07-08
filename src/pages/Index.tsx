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
    { name: "AK-47 Redline", rarity: "Legendary", chance: 0.5 },
    { name: "AWP Dragon Lore", rarity: "Mythical", chance: 0.1 },
    { name: "M4A4 Howl", rarity: "Legendary", chance: 0.3 },
    { name: "Karambit Fade", rarity: "Mythical", chance: 0.05 },
    { name: "Glock Water Elemental", rarity: "Rare", chance: 15 },
  ];

  const openCase = (caseItem: any) => {
    if (balance < caseItem.price) return;

    setIsOpeningCase(true);
    setBalance(balance - caseItem.price);

    setTimeout(() => {
      const random = Math.random();
      const selectedWeapon = weapons[Math.floor(random * weapons.length)];
      setOpenedItem({
        ...selectedWeapon,
        case: caseItem.name,
      });
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
              <Button className="bg-primary hover:bg-primary/90 glow-orange font-orbitron">
                Пополнить
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
                          className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center"
                        >
                          <Icon name="Zap" size={24} className="text-primary" />
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
                      className={`w-32 h-32 mx-auto rounded-lg ${getRarityColor(openedItem.rarity)} flex items-center justify-center`}
                    >
                      <Icon name="Zap" size={48} className="text-white" />
                    </div>
                    <h3 className="font-orbitron text-xl text-foreground">
                      {openedItem.name}
                    </h3>
                    <Badge className={getRarityColor(openedItem.rarity)}>
                      {openedItem.rarity}
                    </Badge>
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
                        onClick={() => setOpenedItem(null)}
                      >
                        Продать
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
