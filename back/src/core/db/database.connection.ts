import { connect } from 'mongoose';
import colors from 'colors';

export const connectToDB = async (connectionString: string) => {
  const db = await connect(connectionString, {
    poolSize: 5,
    useNewUrlParser: true,
    promiseLibrary: Promise,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log(colors.green('Connected to DB'));

  return db;
};
