// why <d.ts> not <.ts> = because I don't want to corrupt the folder when the building process is finished
// I only want to use this as type definition so, d.ts is prefferable
// Normally, d.ts is used to define the js files which typescript doesn't understand

import { Document } from 'mongoose';

export interface UserDocType {
    name: string;
    email: string;
    password: string;
    role?: number;
    favoritList?: [];
}

export interface D_UserDocType extends Document, UserDocType {}
