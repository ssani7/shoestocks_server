import { Server } from 'http';
import mongoose from 'mongoose';

import app from './app';
import config from './config';

const port = config.port;

async function main() {
  let server: Server;
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🙌 Database connected successfully');

    server = app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });

    process.on('unhandledRejection', err => {
      if (server) {
        server.close();
        console.log(err);
        process.exit(1);
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

main();
