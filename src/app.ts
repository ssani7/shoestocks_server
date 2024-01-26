import cors from 'cors';
import express, { Application, Request, Response, urlencoded } from 'express';

import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { ProductRouter } from './app/modules/products/products.routes';
import { SalesRouter } from './app/modules/sale/sale.route';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('ShoeStocks.com');
});

app.use(ProductRouter);
app.use(SalesRouter);

app.use(globalErrorHandler);

export default app;
