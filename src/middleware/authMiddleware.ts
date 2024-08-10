import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models'
import AuthService from '../services/auth.service';

const authAndRoleMiddleware = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }


        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret") as { id: number, role: string };
            const user = await User.findByPk(decoded.id);

            if (!user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ error: 'Forbidden' });
            }

            (req as any).user = user;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    };
};

export default authAndRoleMiddleware;
