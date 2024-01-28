import cors from 'cors';
import express, { Application, Request, Response, urlencoded } from 'express';

import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { InfoRouter } from './app/modules/dashboardInfo/info.route';
import { ProductRouter } from './app/modules/products/products.routes';
import { SalesRouter } from './app/modules/sale/sale.route';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('ShoeStocks.com');
});

app.use('/info', InfoRouter);
app.use('/products', ProductRouter);
app.use('/sale', SalesRouter);

app.use(globalErrorHandler);

export default app;
