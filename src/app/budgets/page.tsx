import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Budget = {
  shortId: number;
  license: number;
  netAmount: number;
  customer: {
    name: string;
  };
}

export default async function Budget() {
  const response = (await fetch('http://localhost:3333/budgets'));
  const budgets = await response.json() as Budget[];

  return (
    <>
      <main className="flex min-h-screen flex-col justify-between p-24">
        <Table>
          <TableCaption>Lista de orçamentos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Orçamento</TableHead>
              <TableHead>Licença</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-right">Vlr. Liq</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.shortId}>
                <TableCell>{budget.shortId}</TableCell>
                <TableCell>{budget.license}</TableCell>
                <TableCell>{budget.customer.name}</TableCell>
                <TableCell className="text-right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget.netAmount)}</TableCell>    
              </TableRow>))
              }
          </TableBody>
        </Table>

        {/* <pre>
          {JSON.stringify(budgets, null, 2)}
        </pre> */}
      </main>
    </>
  );
}
