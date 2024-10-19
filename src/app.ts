import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { matchedData, query, validationResult } from 'express-validator';

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('tiny'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.get(
    '/hello',
    query('person').notEmpty().escape(),
    (req: Request, res: Response) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });
            return;
        }

        const data = matchedData(req);
        res.send(`Hello, ${data.person}!`);
        return;
    }
);

app.use(limiter);

export default app;
