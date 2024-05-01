import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetItemsProps {
  params: {
    id: string;
  };
}

type Department = {
  name: string;
};

const departments: Department[] = [{ name: "Esquadria" }, { name: "Temperado" }]

type Employee = {
  name: string;
  percent: number;
  department: Department;
}

const employees: Employee[] = [
  { name: "Ademir Jorge", percent: 2, department: departments[0] },
  { name: "Emerson Macedo", percent: 2, department: departments[0] },
  { name: "Emanuel Henrique", percent: 1, department: departments[0] },
  { name: "Lucas Brandão", percent: 1.5, department: departments[0] },
  { name: "Jhonisson Rosa", percent: 5, department: departments[1] },
]

type ServiceType = {
  name: string;
}

const serviceTypes: ServiceType[] = [
  { name: "Corte" },
  { name: "Montagem" },
  { name: "Instalação" },
  { name: "Serviços" },
]

type Commission = {
  employee: Employee;
  description: string;
  percent: number;
  total: number;
}

type LooseItems = {
  code: string;
  internal_code: string;
  description: string;
  color: string;
  width: number,
  height: number,
  quantity: number,
  unit_amount: number,
  total_amount: number,
  measurement: string;
}

type BudgetItems = {
  order: number,
  budget_short_id: number,
  license: number,
  description: string,
  quantity: number,
  unit_amount: number,
  total_amount: number,
  total_modified_amount: number,
  modified: false,
  width: number,
  height: number,
  glass: string,
}

type Budget = {
  shortId: number;
  license: number;
  netAmount: number;
  customer: {
    name: string;
  };
  items: BudgetItems[];
  looseItems: LooseItems[];
  itemsCount: number;
  grossAmount: number;
  discountAmount: number;
  percentAmount: number;
}

export default async function BudgetItems({ params }: BudgetItemsProps) {
  const response = (await fetch('http://localhost:3333/budgets'));
  const budgets = await response.json() as Budget[];
  const budget = budgets.find((budget) => budget.shortId === Number(params.id));
  const looseItemsCount = budget?.looseItems.reduce((acc, item) => acc + item.quantity, 0);  

  return (
    <>

      <main className="flex min-h-screen flex-col p-24">

        <Card className="w-full mb-5">
          <div className=" flex text-2xl font-bold justify-center justify-between p-5">
            <h1>{`${budget?.customer.name}`}</h1>
            <h1>{budget?.shortId}</h1>
          </div>
        </Card>

        <div className="flex mb-10 space-x-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Quantidade de itens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">{(budget!.itemsCount + looseItemsCount!).toFixed(2).replace(".", ",")}</div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Valor total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget!.grossAmount)}</div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Valor de desconto</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="text-2xl font-bold">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget!.discountAmount)}</div>
              <p className="text-xs text-muted-foreground text-right self-center ml-2 clo">{`(${budget?.percentAmount.toLocaleString("pt-BR")}%)`}</p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Valor liquido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget!.netAmount)}</div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="account">
          <TabsList className="w-full justify-between mb-5">
            <TabsTrigger value="account" className="w-full">Tipologias</TabsTrigger>
            <TabsTrigger value="password" className="w-full">Itens Avulsos</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Table>
              <TableCaption>Lista de tipologias</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>L/H</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Vlr. Unitario</TableHead>
                  <TableHead className="text-right">Vlr. Total</TableHead>
                  <TableHead className="text-right">Vlr. Desconto</TableHead>
                  <TableHead className="text-right">Vlr. Liquido</TableHead>
                  <TableHead>Vidro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budget?.items.map((items) => (
                  <TableRow key={items.order}>
                    <TableCell>{items.order}</TableCell>
                    <TableCell>{items.description}</TableCell>
                    <TableCell>{`${items.width}/${items.height}`}</TableCell>
                    <TableCell className="text-right">{items.quantity}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.unit_amount)}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount)}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount * (budget.percentAmount / 100))}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount - items.total_amount * (budget.percentAmount / 100))}</TableCell>
                    <TableCell>{items.glass}</TableCell>
                    <TableCell>
                      <Drawer>
                        <DrawerTrigger>
                          <Button variant="default">Comissão</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>{items.description}</DrawerTitle>
                            <DrawerDescription>Lançamento de comissão</DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4">
                            <div className="mb-10">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Ordem</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>L/H</TableHead>
                                    <TableHead className="text-right">Quantidade</TableHead>
                                    <TableHead className="text-right">Vlr. Unitario</TableHead>
                                    <TableHead className="text-right">Vlr. Total</TableHead>
                                    <TableHead className="text-right">Vlr. Desconto</TableHead>
                                    <TableHead className="text-right">Vlr. Liquido</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow key={items.order}>
                                    <TableCell>{items.order}</TableCell>
                                    <TableCell>{items.description}</TableCell>
                                    <TableCell>{`${items.width}/${items.height}`}</TableCell>
                                    <TableCell className="text-right">{items.quantity}</TableCell>
                                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.unit_amount)}</TableCell>
                                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount)}</TableCell>
                                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount * (budget.percentAmount / 100))}</TableCell>
                                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount - items.total_amount * (budget.percentAmount / 100))}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                            <div className="flex w-full mt-2 mb-2 space-x-2">   
                            <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Serviço" />
                                </SelectTrigger>
                                <SelectContent>
                                  {serviceTypes.map((service) => (
                                    <SelectItem 
                                      value={service.name} 
                                      key={service.name}
                                    >
                                      {service.name}
                                    </SelectItem>
                                  ))}                                  
                                </SelectContent>
                              </Select>       
                            <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Colaborador" />
                                </SelectTrigger>
                                <SelectContent>
                                  {employees.filter((employee) => employee.department.name === "Esquadria").map((employeeFilter) => (
                                    <SelectItem 
                                      value={employeeFilter.name} 
                                      key={employeeFilter.name}
                                    >
                                      {employeeFilter.name}
                                    </SelectItem>
                                  ))}                                  
                                </SelectContent>
                              </Select>                                                   
                              <Input 
                                type="text" 
                                placeholder="Vlr. Liquido" 
                                readOnly={true} 
                                value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount - items.total_amount * (budget.percentAmount / 100))}
                              />                             
                              <Input type="number" placeholder="Porcentagem"/>
                              <Input type="number" placeholder="Divido por"/>
                             
                              <Input type="text" readOnly={true} value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(((items.total_amount - (items.total_amount * (budget.percentAmount / 100)))*(1.5/100)))}/>
                              <Button>
                                Adicionar comissão
                              </Button>
                            </div>
                          </div>
                          <DrawerFooter className="flex row-span-1">
                            <Button>Confirmar</Button>
                            <DrawerClose>
                              <Button variant="outline">Cancelar</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </TableCell>
                  </TableRow>))
                }
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="password">
            <Table>
              <TableCaption>Lista de itens avulsos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Unidade medida</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Vlr. Unitario</TableHead>
                  <TableHead className="text-right">Vlr. Total</TableHead>
                  <TableHead className="text-right">Vlr. Desconto</TableHead>
                  <TableHead className="text-right">Vlr. Liquido</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budget?.looseItems.map((items) => (
                  <TableRow key={items.code}>
                    <TableCell>{items.code}</TableCell>
                    <TableCell>{items.description}</TableCell>
                    <TableCell>{items.measurement}</TableCell>
                    <TableCell className="text-right">{items.quantity}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.unit_amount)}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount)}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount * (budget.percentAmount / 100))}</TableCell>
                    <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.total_amount - (items.total_amount * (budget.percentAmount / 100)))}</TableCell>
                    <TableCell>
                      <Drawer>
                        <DrawerTrigger>
                          <Button variant="default">Comissão</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>{items.description}</DrawerTitle>
                            <DrawerDescription>Lançamento de comissão</DrawerDescription>
                          </DrawerHeader>
                          <div>
                            <label htmlFor="commission">Comissão</label>
                            <input type="text" id="commission" />
                          </div>
                          <DrawerFooter className="flex">
                            <Button>Submit</Button>
                            <DrawerClose>
                              <Button variant="outline">Cancelar</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </TableCell>
                  </TableRow>))
                }
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>




        {/* <pre>
          {JSON.stringify(budget, null, 2)}
        </pre> */}
      </main>
    </>
  );
}