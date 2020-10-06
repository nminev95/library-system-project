import passport from 'passport';
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// extract the filename from the import object
const __filename = fileURLToPath(import.meta.url);

// retrieve the directory
const __dirname = dirname(__filename);

// depending on the OS, "join" will create a valid filepath string to the specific file location
const LOG_FILE_PATH = join(__dirname, './token-blacklist.json');

const authMiddleware = passport.authenticate('jwt', { session: false });

const roleMiddleware = roleName => {
    return (req, res, next) => {
        if (req.user && req.user.role === roleName) {
            const auth = (req.headers.authorization).split(' ');
            const token = auth[1];
            const rawData = fs.readFileSync(LOG_FILE_PATH);
            const parsedDataArray = Array.from(JSON.parse(rawData));
            const set = new Set(parsedDataArray);

            if (set.has(token)) {
                return res.status(400).send({ message: 'You must be logged in to see this content!'});
            }

            next();
        } else {
            res.status(403).send({
                message: 'Resource is forbidden.',
            });
        }
    };
};

const blacklistTokenMiddleware = () => {
    return async (req, res, next) => {
        const auth = (req.headers.authorization).split(' ');
        const token = auth[1];
        const rawData = fs.readFileSync(LOG_FILE_PATH);
        const parsedDataArray = Array.from(JSON.parse(rawData));
        const set = new Set(parsedDataArray);

        if (!set.has(token)) {
            set.add(token);
        }

        const newArray = Array.from(set);
        fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(newArray));

        next();
    };
};

export {
    authMiddleware,
    roleMiddleware,
    blacklistTokenMiddleware,
};
